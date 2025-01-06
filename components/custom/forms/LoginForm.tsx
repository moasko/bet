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

  // Mutation pour la connexion
  const mutation = useMutation({
    mutationFn: signInAction,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Connexion réussie !");
        // Logique post-connexion (redirection, etc.)
      } else {
        toast.error(data.message || "Identifiants incorrects.");
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
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
        {/* Champ Email ou Téléphone */}
        <div>
          <input
            type="text"
            {...register("emailOrPhone", {
              required: "L'email ou le numéro de téléphone est requis.",
              minLength: {
                value: 5,
                message: "Doit contenir au moins 5 caractères.",
              },
            })}
            placeholder="Email ou Téléphone"
            aria-label="Email ou Téléphone"
            aria-invalid={!!errors.emailOrPhone}
            className={`mt-1 text-sm block w-full p-4 bg-white rounded ${
              errors.emailOrPhone ? "border-red-500 border" : ""
            }`}
            disabled={mutation.isPending}
          />
          {/* {errors.emailOrPhone && (
            <p className="text-red-500 text-xs mt-1" aria-live="assertive">
              {errors.emailOrPhone.message}
            </p>
          )} */}
        </div>

        {/* Champ Mot de passe */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Le mot de passe est requis.",
              minLength: {
                value: 6,
                message: "Le mot de passe doit contenir au moins 6 caractères.",
              },
            })}
            placeholder="Mot de passe"
            aria-label="Mot de passe"
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
            aria-label="Afficher/masquer le mot de passe"
          >
            {showPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
          </button>
          {/* {errors.password && (
            <p className="text-red-500 text-xs mt-1" aria-live="assertive">
              {errors.password.message}
            </p>
          )} */}
        </div>

        {/* Bouton Soumettre */}
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
            {mutation.isPending ? "Connexion en cours..." : "SE CONNECTER"}
          </button>
        </div>

        {/* Liens Mot de passe oublié et Inscription */}
        <div className="flex items-center justify-between text-sm mt-4">
          <Link
            href="/auth/forgot-password"
            className="text-gray-600 hover:underline"
          >
            Mot de passe oublié ?
          </Link>
          <Link href="/auth/signup" className="text-red-600 hover:underline">
            Inscription
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
