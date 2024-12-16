"use client";

import { signInAction } from "@/actions/signin-action";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  // Mutation for signing in
  const mutation = useMutation({
    mutationFn: signInAction,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Login successful!");
        // Handle post-login logic (e.g., redirect)
      } else {
        toast.error(data.message || "Invalid credentials.");
      }
    },
    onError: (error) => {
      console.error("Error during login:", error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  const onSubmit = (formData: any) => {
    mutation.mutate({
      email: formData.emailOrPhone,
      password: formData.password,
    });
  };

  return (
    <div className="w-full min-h-[500px] bg-[#e9f2ee] flex flex-col justify-center p-5">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Connexion
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email or Phone Field */}
        <div>
          <input
            type="text"
            {...register("emailOrPhone", {
              required: "Email or phone is required.",
              minLength: {
                value: 5,
                message: "Must be at least 5 characters long.",
              },
            })}
            placeholder="Email or Phone"
            aria-label="Email or Phone"
            aria-invalid={!!errors.emailOrPhone}
            className={`mt-1 text-sm block w-full p-4 bg-white rounded ${
              errors.emailOrPhone ? "border-red-500 border" : ""
            }`}
            disabled={mutation.isPending}
          />
          {errors.emailOrPhone && (
            <p className="text-red-500 text-xs mt-1" aria-live="assertive">
              {errors.root?.message || "Invalid email or phone."}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long.",
              },
            })}
            placeholder="Password"
            aria-label="Password"
            aria-invalid={!!errors.password}
            className={`mt-1 text-sm block w-full p-4 bg-white rounded ${
              errors.password ? "border-red-500 border" : ""
            }`}
            autoComplete="off"
            disabled={mutation.isPending}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1" aria-live="assertive">
              {errors.root?.message || "Invalid password."}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`w-full p-[10px] bg-[#ffcd05] rounded ${
              mutation.isPending
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#e6b804]"
            }`}
          >
            {mutation.isPending ? "Logging in..." : "LOGIN"}
          </button>
        </div>

        {/* Links for Forgot Password and Signup */}
        <div className="flex items-center justify-between text-sm mt-4">
          <Link
            href="/auth/forgot-password"
            className="text-gray-600 hover:underline"
          >
            Forgot password?
          </Link>
          <Link href="/auth/signup" className="text-red-600 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
