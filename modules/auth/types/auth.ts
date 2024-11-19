export interface MessageResponse {
  message: string;
  success: boolean;
}
import { UserRols } from "@prisma/client";
import { DefaultSession } from "next-auth";

/**
 * Here you can extend your session and auth types
 */

type SessionUser = DefaultSession["user"] & {
  role: UserRols;
};
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: SessionUser;
  }
}
