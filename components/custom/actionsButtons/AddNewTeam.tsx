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

// Validation du formulaire avec Zod
const formSchema = z.object({
  name: z.string().min(2, "Le nom est obligatoire"),
  leagueId: z.number().min(1, "La ligue est obligatoire"),
  shortName: z.string().min(2, "Le nom court est obligatoire"),
  slug: z
    .string()
    .min(1, "Le slug est obligatoire")
    .regex(
      /^[a-z0-9-]+$/,
      "Le slug doit contenir uniquement lettres, chiffres et tirets"
    ),
  flag: z
    .string()
    .url("Veuillez entrer une URL valide")
    .min(1, "L'URL est obligatoire"),
});

type Team = z.infer<typeof formSchema>;

// Fonction pour générer le slug automatiquement
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Remplace les espaces par des tirets
    .replace(/[^\w-]+/g, ""); // Supprime les caractères spéciaux
};

function AddNewTeam() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<Team>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const nameValue = useWatch({ control, name: "name" });

  // Mettre à jour automatiquement le slug quand le nom change
  useEffect(() => {
    if (nameValue) {
      setValue("slug", generateSlug(nameValue), { shouldValidate: true });
    }
  }, [nameValue, setValue]);

  const mutation = useMutation({
    mutationFn: createNewTeam,
    onSuccess: () => {
      toast.success("L'équipe a été ajoutée avec succès");
      queryClient.invalidateQueries({ queryKey: ["teamsList"] });
      reset();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Erreur lors de l'ajout de l'équipe";
      toast.error(message);
    },
  });

  const onSubmit = (data: Team) => {
    mutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Ajouter Une Équipe</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter Une Équipe</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Sélection de la ligue */}
            <LeaguSelectList
              leagueId={0} // Par défaut, aucune ligue sélectionnée
              setLeagueId={(id) =>
                setValue("leagueId", id, { shouldValidate: true })
              }
            />

            {/* URL de l'image */}
            <div>
              <Label htmlFor="flag">URL de l'image (drapeau)</Label>
              <Input
                type="url"
                id="flag"
                placeholder="https://example.com/image.png"
                {...register("flag")}
                aria-invalid={!!errors.flag}
              />
              {errors.flag && (
                <p className="text-red-500">{errors.flag.message}</p>
              )}
            </div>

            {/* Nom de l'équipe */}
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input
                type="text"
                id="name"
                placeholder="Entrez le nom de l'équipe"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Nom court */}
            <div>
              <Label htmlFor="shortName">Nom Court</Label>
              <Input
                type="text"
                id="shortName"
                placeholder="Ex: PSG"
                {...register("shortName")}
                aria-invalid={!!errors.shortName}
              />
              {errors.shortName && (
                <p className="text-red-500">{errors.shortName.message}</p>
              )}
            </div>

            {/* Slug (automatique) */}
            <div>
              <Label htmlFor="slug">Slug (automatique)</Label>
              <Input
                type="text"
                id="slug"
                {...register("slug")}
                readOnly // Rend le champ slug non modifiable
              />
              {errors.slug && (
                <p className="text-red-500">{errors.slug.message}</p>
              )}
            </div>
          </div>

          {/* Bouton de soumission */}
          <DialogFooter>
            <Button type="submit" disabled={!isValid || mutation.isPending}>
              {mutation.isPending ? "En cours..." : "Soumettre"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewTeam;
