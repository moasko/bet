import { db } from "@/lib/db";
import { useAuthStore } from "@/store/useAuthStore";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRols, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  getUserByEmail,
  getUserById,
  updateUserLoginInfo,
} from "./actions/user";
import { LoginSchema } from "./auth.schema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      role: UserRols;
      status: UserStatus;
      permissions: string[];
    };
  }
}

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          throw new Error("User not found or password not set");
        }

        // Vérifier si l'utilisateur est verrouillé
        if (user.lockoutUntil && user.lockoutUntil > new Date()) {
          throw new Error(
            "Account is temporarily locked. Please try again later."
          );
        }

        // Vérifier le statut de l'utilisateur
        if (user.statuts !== "ACTIVE") {
          switch (user.statuts) {
            case "BLOKED":
              throw new Error("Account is blocked. Please contact support.");
            case "SUSPENDED":
              throw new Error("Account is suspended. Please contact support.");
            case "PENDING_VERIFICATION":
              throw new Error("Please verify your email and phone number.");
            case "DELETED":
              throw new Error("Account has been deleted.");
            default:
              throw new Error("Account status is invalid.");
          }
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          // Incrémenter le compteur de tentatives échouées
          const failedAttempts = (user.failedAttempts || 0) + 1;
          const updates: any = { failedAttempts };

          if (failedAttempts >= MAX_LOGIN_ATTEMPTS) {
            updates.lockoutUntil = new Date(Date.now() + LOCKOUT_DURATION);
          }

          await updateUserLoginInfo(user.id, updates);
          throw new Error("Invalid password");
        }

        // Réinitialiser les tentatives de connexion en cas de succès
        await updateUserLoginInfo(user.id, {
          failedAttempts: 0,
          lockoutUntil: null,
          lastLogin: new Date(),
        });

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(Number(user.id));

      if (!existingUser) {
        throw new Error("User not found");
      }

      if (!existingUser.emailVerified) {
        throw new Error("Email not verified");
      }

      if (!existingUser.mobileVerified) {
        throw new Error("Phone number not verified");
      }

      return true;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.sub;
        session.user.name = token.name || "";
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.status = token.status;
        session.user.permissions = token.permissions;

        // Update Zustand store
        useAuthStore.getState().setUser({
          id: Number(token.sub),
          name: token.name || "",
          email: token.email as string,
          role: token.role as UserRols,
          status: token.status as UserStatus,
          permissions: token.permissions as string[],
        });
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(Number(token.sub));

      if (!existingUser) {
        return token;
      }

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.status = existingUser.statuts;
      token.permissions = existingUser.permissions.map((p) => p.name);

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 heures
  },
  debug: process.env.NODE_ENV === "development",
});
