"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createNewTeam } from "@/services/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import LeaguSelectList from "./LeaguSelectList";

interface Team {
  name: string;
  leagueId: number;
  shortName: string;
  flag: string;
  slug: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Le nom est obligatoire"),
  leagueId: z.number().min(1, "La ligue est obligatoire"),
  shortName: z.string().min(2, "Le nom court est obligatoire"),
  slug: z
    .string()
    .min(1, "Le slug est obligatoire")
    .regex(
      /^[a-z0-9-]+$/,
      "Le slug ne doit contenir que des lettres minuscules, chiffres et tirets"
    ),
  flag: z
    .string()
    .url("Veuillez entrer une URL valide pour l'image")
    .min(1, "L'URL de l'image est obligatoire"),
});

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

function AddNewTeam() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Team>({
    resolver: zodResolver(formSchema),
  });

  const queryClient = useQueryClient();

  const leagueId = useWatch({
    name: "leagueId",
  });

  const mutation = useMutation({
    mutationFn: (data: Team) => createNewTeam(data),
    onSuccess: () => {
      toast.success("L'équipe a été ajoutée avec succès");
      queryClient.invalidateQueries({ queryKey: ["teamsList"] });
      reset();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Erreur lors de l'ajout de l'équipe";
      toast.error(message);
      console.error("Erreur lors de l'ajout de l'équipe :", error);
    },
  });

  const nameValue = watch("name");

  useEffect(() => {
    if (nameValue) {
      setValue("slug", generateSlug(nameValue));
    }
  }, [nameValue, setValue]);

  const onSubmit = (data: Team) => {
    mutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-3">+ Ajouter Une Équipe</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter Une Équipe</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <LeaguSelectList
              leagueId={1}
              setLeagueId={(id) => register("leagueId")}
            />
            <div className="flex flex-col items-center">
              <Label htmlFor="flag" className="text-right">
                URL de l image (drapeau)
              </Label>
              <Input
                type="url"
                id="flag"
                {...register("flag")}
                placeholder="Entrez l'URL de l'image"
              />
              {errors.flag && (
                <p className="text-red-500">{errors.flag.message}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Fichiers supportés : jpeg, jpg, png. L image sera redimensionnée
                en 150x150 px
              </p>
            </div>
            <div>
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input type="text" id="name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="shortName" className="text-right">
                Nom Court
              </Label>
              <Input type="text" id="shortName" {...register("shortName")} />
              {errors.shortName && (
                <p className="text-red-500">{errors.shortName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="slug" className="text-right">
                Slug (automatique)
              </Label>
              <Input
                type="text"
                id="slug"
                {...register("slug")}
                disabled // Désactiver la saisie manuelle
              />
              {errors.slug && (
                <p className="text-red-500">{errors.slug.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "En cours..." : "Soumettre"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewTeam;
