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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

function AddNewGame() {
  const [leagueId, setLeagueId] = useState<number | null>(null);
  const [teamOne, setTeamOne] = useState<number | null>(null);
  const [teamTwo, setTeamTwo] = useState<number | null>(null);
  const [gameStarts, setGameStarts] = useState<string>("");
  const [betStarts, setBetStarts] = useState<string>("");
  const [betEnds, setBetEnds] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0.2);
  const [teamOneGoals, setTeamOneGoals] = useState<number | null>(null);
  const [teamTwoGoals, setTeamTwoGoals] = useState<number | null>(null);

  const queryClient = useQueryClient();

  // Mutation for creating a new game
  const mutateGame = useMutation({
    mutationFn: createNewMatch,
    onSuccess: () => {
      toast("Jeu créé avec succès.");
      queryClient.invalidateQueries({
        queryKey: ["gamesList"],
      });
      setLeagueId(null);
      setTeamOne(null);
      setTeamTwo(null);
      setGameStarts("");
      setBetStarts("");
      setBetEnds("");
      setPercentage(0.2);
      setTeamOneGoals(null);
      setTeamTwoGoals(null);
    },
  });

  // Fetch leagues
  const { data: leagueData, isLoading: leagueLoading } = useQuery({
    queryKey: ["leagues"],
    queryFn: () => getAllLeagues(),
  });

  // Fetch teams for a selected league
  const { data: teamData, isLoading: teamLoading } = useQuery({
    queryKey: ["teams", leagueId],
    queryFn: () => getLeaguTeams(leagueId!),
    enabled: !!leagueId,
  });

  const handleSubmit = () => {
    if (
      !leagueId ||
      !teamOne ||
      !teamTwo ||
      !gameStarts ||
      !betStarts ||
      !betEnds ||
      !percentage ||
      teamOneGoals === null ||
      teamTwoGoals === null
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Mutate (create new match)
    mutateGame.mutate({
      leagueId,
      homeTeamId: teamOne,
      awayTeamId: teamTwo,
      percentage,
      matchStartTime: new Date(gameStarts).toISOString(),
      betStartTime: new Date(betStarts).toISOString(),
      betEndTime: new Date(betEnds).toISOString(),
      result: `${teamOneGoals}-${teamTwoGoals}`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-3">+ Ajouter Un Nouveau Jeu</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Ajouter Un Nouveau Jeu</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2">
          {/* League Selection */}
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="league">Ligue</Label>
            <Select onValueChange={(value) => setLeagueId(Number(value))}>
              <SelectTrigger id="league">
                <SelectValue placeholder="Sélectionnez une ligue" />
              </SelectTrigger>
              <SelectContent>
                {leagueData?.map((league: any) => (
                  <SelectItem key={league.id} value={league.id}>
                    {league.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Team Selection */}
          <div>
            <Label htmlFor="teamOne">Équipe Une</Label>
            <Select
              onValueChange={(value) => setTeamOne(Number(value))}
              disabled={!teamData}
            >
              <SelectTrigger id="teamOne">
                <SelectValue placeholder="Sélectionnez une équipe" />
              </SelectTrigger>
              <SelectContent>
                {teamData?.map((team: any) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="teamTwo">Équipe Deux</Label>
            <Select
              onValueChange={(value) => setTeamTwo(Number(value))}
              disabled={!teamData}
            >
              <SelectTrigger id="teamTwo">
                <SelectValue placeholder="Sélectionnez une équipe" />
              </SelectTrigger>
              <SelectContent>
                {teamData?.map((team: any) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time Inputs */}
          <div>
            <Label htmlFor="gameStarts">Début du Jeu</Label>
            <Input
              type="datetime-local"
              id="gameStarts"
              value={gameStarts}
              onChange={(e) => setGameStarts(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="betStarts">Début des Paris</Label>
            <Input
              type="datetime-local"
              id="betStarts"
              value={betStarts}
              onChange={(e) => setBetStarts(e.target.value)}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="betEnds">Fin des Paris</Label>
            <Input
              type="datetime-local"
              id="betEnds"
              value={betEnds}
              onChange={(e) => setBetEnds(e.target.value)}
            />
          </div>

          {/* Goals Input */}
          <div>
            <Label htmlFor="teamOneGoals">Buts de l équipe Une</Label>
            <Input
              type="number"
              id="teamOneGoals"
              value={teamOneGoals ?? ""}
              onChange={(e) => setTeamOneGoals(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="teamTwoGoals">Buts de l équipe Deux</Label>
            <Input
              type="number"
              id="teamTwoGoals"
              value={teamTwoGoals ?? ""}
              onChange={(e) => setTeamTwoGoals(Number(e.target.value))}
              min="0"
            />
          </div>

          {/* Percentage Input */}
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="percentage">Pourcentage de gains</Label>
            <Input
              type="number"
              id="percentage"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              step="0.01"
              min="0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={mutateGame.isPending}
          >
            Soumettre
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewGame;
