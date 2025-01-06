import * as z from "zod";

const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" });

const phoneValidation = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, { 
    message: "Please enter a valid phone number in international format (e.g., +33612345678)" 
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const ResetPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  rememberMe: z.boolean().optional(),
});

export const SignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: phoneValidation,
  password: passwordValidation,
  parainCode: z.string().length(8, { 
    message: "Parrain code must be exactly 8 characters long" 
  }),
});

export const MagicSignInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export type MagicSignInType = z.infer<typeof MagicSignInSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type SignupSchemaType = z.infer<typeof SignupSchema>;
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
