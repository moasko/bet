import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "./use-current-user";
import { toast } from "sonner";

interface PlaceBetParams {
  matchId: number;
  amount: number;
}

export const useBet = () => {
  const user = useCurrentUser();
  const queryClient = useQueryClient();

  // Récupérer les paris de l'utilisateur
  const { data: bets, isLoading: isLoadingBets } = useQuery({
    queryKey: ["bets", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await fetch(`/api/users/${user.id}/bets`);
      if (!response.ok) throw new Error("Failed to fetch bets");
      return response.json();
    },
    enabled: !!user?.id,
  });

  // Mutation pour placer un pari
  const { mutate: placeBet, isLoading: isPlacingBet } = useMutation({
    mutationFn: async ({ matchId, amount }: PlaceBetParams) => {
      const response = await fetch("/api/bets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId,
          amount,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to place bet");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalider les requêtes pour forcer le rechargement
      queryClient.invalidateQueries({ queryKey: ["bets"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      toast.success("Pari placé avec succès !");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erreur lors du placement du pari");
    },
  });

  return {
    bets,
    placeBet,
    isLoadingBets,
    isPlacingBet,
  };
};
