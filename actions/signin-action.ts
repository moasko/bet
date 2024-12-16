"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function signInAction(data: LoginSchemaType) {
  const validate = await LoginSchema.safeParseAsync(data);
  if (!validate.success) {
    return {
      message: validate.error.errors[0].message,
      success: false,
    };
  }

  const { email, password } = validate.data;
  const user = await db.user.findUnique({
    where: { email },
  });
  const ERROR_INVALID_CREDENTIALS = "Invalid credentials";
  if (!user || !user.email || !user.password) {
    return {
      message: ERROR_INVALID_CREDENTIALS,
      success: false,
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });

    return {
      message: "Sign In Sucessfully",
      success: true,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: ERROR_INVALID_CREDENTIALS, success: false };
        default:
          return { message: "Something went wrong!", success: false };
      }
    }
    throw error;
  }
}

import { signOut } from "@/auth";
import { db } from "@/lib/db";
import { LoginSchema, LoginSchemaType } from "../auth.schema";

export { signOut };
