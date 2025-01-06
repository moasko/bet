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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNewMatch, getAllLeagues, getLeaguTeams } from "@/services/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Schéma de validation avec Zod
const gameSchema = z
  .object({
    leagueId: z.number({ required_error: "La ligue est obligatoire." }),
    teamOne: z.number({ required_error: "L'équipe une est obligatoire." }),
    teamTwo: z.number({ required_error: "L'équipe deux est obligatoire." }),
    matchStartTime: z
      .string()
      .min(1, "La date de début du jeu est obligatoire.")
      .refine((value) => new Date(value) > new Date(), {
        message: "La date doit être dans le futur.",
      }),
    percentage: z.number().min(0, "Le pourcentage ne peut pas être négatif."),
    teamOneGoals: z.number().min(0, "Les buts doivent être positifs."),
    teamTwoGoals: z.number().min(0, "Les buts doivent être positifs."),
  })
  .refine((data) => data.teamOne !== data.teamTwo, {
    message: "Les deux équipes doivent être différentes.",
    path: ["teamTwo"],
  });

type GameFormData = z.infer<typeof gameSchema>;

function AddNewGame() {
  const queryClient = useQueryClient();
  const [leagueId, setLeagueId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
  });

  const mutateGame = useMutation({
    mutationFn: createNewMatch,
    onSuccess: () => {
      toast.success("Jeu créé avec succès.");
      queryClient.invalidateQueries({ queryKey: ["gamesList"] });
      reset();
    },
    onError: () => {
      toast.error("Erreur lors de la création du jeu.");
    },
  });

  // Requête pour obtenir les ligues
  const { data: leagueData } = useQuery({
    queryKey: ["leagues"],
    queryFn: getAllLeagues,
  });

  // Requête pour obtenir les équipes d'une ligue
  const {
    data: teamData,
    isLoading: isTeamsLoading,
    isError: isTeamsError,
  } = useQuery({
    queryKey: ["teams", leagueId],
    queryFn: () => getLeaguTeams(leagueId!),
    enabled: !!leagueId,
  });

  const onSubmit = (data: GameFormData) => {
    mutateGame.mutate({
      leagueId: data.leagueId,
      homeTeamId: data.teamOne,
      awayTeamId: data.teamTwo,
      percentage: data.percentage,
      matchStartTime: new Date(data.matchStartTime).toISOString(),
      result: `${data.teamOneGoals}-${data.teamTwoGoals}`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Ajouter Un Nouveau Jeu</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Ajouter Un Nouveau Jeu</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 grid-cols-1 sm:grid-cols-2"
        >
          {/* Ligue */}
          <div className="col-span-2">
            <Label>Ligue</Label>
            <Select
              onValueChange={(value) => {
                setLeagueId(Number(value));
                setValue("leagueId", Number(value));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une ligue" />
              </SelectTrigger>
              <SelectContent>
                {leagueData?.map((league: any) => (
                  <SelectItem key={league.id} value={league.id.toString()}>
                    {league.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.leagueId && (
              <p className="text-red-500 text-sm">{errors.leagueId.message}</p>
            )}
          </div>

          {/* Équipe Une */}
          <div>
            <Label>Équipe Une</Label>
            <Select
              onValueChange={(value) => setValue("teamOne", Number(value))}
              disabled={!teamData || isTeamsLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une équipe" />
              </SelectTrigger>
              <SelectContent>
                {teamData?.map((team: any) => (
                  <SelectItem key={team.id} value={team.id.toString()}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.teamOne && (
              <p className="text-red-500 text-sm">{errors.teamOne.message}</p>
            )}
          </div>

          {/* Équipe Deux */}
          <div>
            <Label>Équipe Deux</Label>
            <Select
              onValueChange={(value) => setValue("teamTwo", Number(value))}
              disabled={!teamData || isTeamsLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une équipe" />
              </SelectTrigger>
              <SelectContent>
                {teamData?.map((team: any) => (
                  <SelectItem key={team.id} value={team.id.toString()}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.teamTwo && (
              <p className="text-red-500 text-sm">{errors.teamTwo.message}</p>
            )}
          </div>

          {/* Date de début du jeu */}
          <div>
            <Label>Début du Jeu</Label>
            <Input type="datetime-local" {...register("matchStartTime")} />
            {errors.matchStartTime && (
              <p className="text-red-500 text-sm">
                {errors.matchStartTime.message}
              </p>
            )}
          </div>

          {/* Buts de l'équipe Une */}
          <div>
            <Label>{"Buts de l'équipe Une"}</Label>
            <Input
              type="number"
              {...register("teamOneGoals", { valueAsNumber: true })}
            />
            {errors.teamOneGoals && (
              <p className="text-red-500 text-sm">
                {errors.teamOneGoals.message}
              </p>
            )}
          </div>

          {/* Buts de l'équipe Deux */}
          <div>
            <Label>{"Buts de l'équipe Deux"}</Label>
            <Input
              type="number"
              {...register("teamTwoGoals", { valueAsNumber: true })}
            />
            {errors.teamTwoGoals && (
              <p className="text-red-500 text-sm">
                {errors.teamTwoGoals.message}
              </p>
            )}
          </div>

          {/* Pourcentage */}
          <div>
            <Label>Pourcentage</Label>
            <Input
              type="number"
              step="0.01"
              {...register("percentage", { valueAsNumber: true })}
            />
            {errors.percentage && (
              <p className="text-red-500 text-sm">
                {errors.percentage.message}
              </p>
            )}
          </div>

          <DialogFooter className="col-span-2">
            <Button type="submit" disabled={mutateGame.isPending}>
              {mutateGame.isPending ? "En cours..." : "Soumettre"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewGame;
