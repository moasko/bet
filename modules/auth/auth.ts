import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import db from "@/lib/db";
import authConfig from "./auth.config";
import userRepository from "./data/user";

type UserRols = {
  ADMIN: "ADMIN";
  USER: "USER";
};

export const nextAuth = NextAuth({
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
    error: "/auth-error",
    signOut: "/signout",
  },
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider;
      if (provider !== "credentials" && provider !== "http-email") return true;

      if (!user || !user.id) return false;
      const existingUser = await userRepository.getUserById(Number(user.id));

      if (
        !existingUser ||
        (provider === "credentials" && !existingUser.emailVerified)
      ) {
        if (provider === "http-email") return "/auth/signup";
        return false;
      }
      return true;
    },

    //  jwt is called when the JWT is created

    async jwt(jwt) {
      const { token, user } = jwt;

      if (!token.sub) return token;
      const existingUser = await userRepository.getUserById(Number(token.sub));
      if (!existingUser) return token;
      token.email = existingUser.email;
      token.name = existingUser.name;

      token.role = existingUser.role;
      return token;
    },
    // session uses the JWT token to create and generate the session object
    async session({ session, user, token }) {
      if (session.user) {
        if (token.role) session.user.role = token.role as UserRols;
        if (token.sub) session.user.id = token.sub;
        if (token.email) session.user.email = token.email;
        if (token.name) session.user.name = token.name;
        if (token.picture) session.user.image = token.picture;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),

  session: { strategy: "jwt" },
  trustHost: authConfig.trustHost,

  providers: [...authConfig.providers],
});
