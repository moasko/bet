"use client";

import { registerUser } from "@/actions/user";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmationPassword: string;
  referralCode: string;
};

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmationPassword: "",
      referralCode: ref,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) =>
      registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        parainCode: data.referralCode,
      }),
    onSuccess: () => {
      toast.success("Inscription réussie ! 🎉");
      reset();
      setTimeout(() => {
        router.push("/auth/signin");
      }, 1000);
    },
    onError: (error: any) => {
      toast.info(
        error?.message || "Une erreur s'est produite. Veuillez réessayer.",
        {
          position: "top-center",
          richColors: true,
        }
      );
    },
  });

  const onSubmit = (data: FormData) => {
    if (data.password !== data.confirmationPassword) {
      toast.error("Les mots de passe ne correspondent pas.", {
        position: "top-center",
        richColors: true,
      });
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className="w-full bg-[#e9f2ee] flex flex-col justify-center p-5">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Inscription
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        method="POST"
      >
        {/* Nom complet */}
        <div>
          <input
            {...register("name", { required: "Nom complet requis" })}
            type="text"
            placeholder="Nom Complet"
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <input
            {...register("phone", { required: "Téléphone requis" })}
            type="text"
            placeholder="Téléphone"
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            {...register("email", {
              required: "Email requis",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Email invalide",
              },
            })}
            type="email"
            placeholder="Email"
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Mot de passe */}
        <div className="relative">
          <input
            {...register("password", {
              required: "Mot de passe requis",
              minLength: {
                value: 8,
                message: "Le mot de passe doit contenir au moins 8 caractères.",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Mot de Passe"
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirmation du mot de passe */}
        <div className="relative">
          <input
            {...register("confirmationPassword", {
              required: "Confirmation du mot de passe requise",
            })}
            type={showConfirmationPassword ? "text" : "password"}
            placeholder="Confirmer le Mot de Passe"
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
          <button
            type="button"
            onClick={() => setShowConfirmationPassword((prev) => !prev)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
          >
            {showConfirmationPassword ? (
              <EyeIcon size={16} />
            ) : (
              <EyeOffIcon size={16} />
            )}
          </button>
          {errors.confirmationPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmationPassword.message}
            </p>
          )}
        </div>

        {/* Code de parrainage */}
        <div>
          <Controller
            control={control}
            name="referralCode"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Code de Parrainage"
                disabled
                className="mt-1 text-sm block w-full p-4 bg-gray-100 rounded"
              />
            )}
          />
        </div>

        {/* Bouton de soumission */}
        <div>
          <button
            type="submit"
            className="w-full p-[10px] bg-[#ffcd05] text-black rounded hover:bg-[#e6b804] focus:ring focus:ring-yellow-400"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Chargement..." : "S'INSCRIRE"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
