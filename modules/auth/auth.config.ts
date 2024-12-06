import bcryptjs from "bcryptjs";

import type { NextAuthConfig } from "next-auth";

import { getUserByEmail } from "@/actions/user";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./auth.schema";
export default {
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validate = await LoginSchema.parseAsync(credentials);
        if (!validate) return null;
        const { email, password } = validate;
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;
        const matched = await bcryptjs.compare(password, user.password);
        if (matched) return user;
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

const providersUsed = ["credentials"] as const;
export type availableProviders = (typeof providersUsed)[number];
