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
import { createNewLeague } from "@/services/admin"; // Assurez-vous d'avoir la bonne fonction pour soumettre une nouvelle ligue
import { zodResolver } from "@hookform/resolvers/zod";
import { LeagueStatus } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Définition du type League
interface League {
  name: string;
  slug: string;
  flag: string;
  status: LeagueStatus;
}

// Schéma de validation avec Zod
const formSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  slug: z
    .string()
    .min(1, "Le slug est requis")
    .regex(
      /^[a-z0-9-]+$/,
      "Le slug ne doit contenir que des lettres minuscules, chiffres et tirets"
    ),
  flag: z
    .string()
    .url("Veuillez entrer une URL valide pour le drapeau")
    .min(1, "L'URL du drapeau est obligatoire"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

// Fonction pour générer le slug
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

function AddNewLeague() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<League>({
    resolver: zodResolver(formSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: League) => createNewLeague(data),
    onSuccess: () => {
      toast.success("La ligue a été ajoutée avec succès");
      queryClient.invalidateQueries({ queryKey: ["leaguesList"] });
      reset();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Erreur lors de l'ajout de la ligue";
      toast.error(message);
      console.error("Erreur lors de l'ajout de la ligue :", error);
    },
  });

  // Obtenir la valeur du nom
  const nameValue = watch("name");

  // Mettre à jour le slug lorsqu'il y a un changement dans le nom
  useEffect(() => {
    if (nameValue) {
      setValue("slug", generateSlug(nameValue));
    }
  }, [nameValue, setValue]);

  const onSubmit = (data: League) => {
    mutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-3">+ Ajouter Une Nouvelle Ligue</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Ajouter Une Nouvelle Ligue</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input type="text" id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="slug">Slug (automatique)</Label>
            <Input
              type="text"
              id="slug"
              {...register("slug")}
              disabled // Désactive la saisie manuelle
            />
            {errors.slug && (
              <p className="text-red-600">{errors.slug.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="flag">URL du Drapeau</Label>
            <Input
              type="url"
              id="flag"
              {...register("flag")}
              placeholder="Entrez l'URL du drapeau"
            />
            {errors.flag && (
              <p className="text-red-600">{errors.flag.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="status">Statut</Label>
            <select id="status" {...register("status")}>
              <option value="">Sélectionnez un statut</option>
              <option value="ACTIVE">Actif</option>
              <option value="INACTIVE">Inactif</option>
            </select>
            {errors.status && (
              <p className="text-red-600">{errors.status.message}</p>
            )}
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

export default AddNewLeague;
