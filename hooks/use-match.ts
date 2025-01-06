import { matchService } from "@/services/match";
import { useQuery } from "@tanstack/react-query";

export const useMatches = () =>
  useQuery({
    queryKey: ["matches"],
    queryFn: () => matchService.getAllMatches(),
  });

export const useMatch = (id: number) =>
  useQuery({
    queryKey: ["match", id],
    queryFn: () => matchService.getMatch(id),
  });

export const useActiveMatches = () =>
  useQuery({
    queryKey: ["activeMatches"],
    queryFn: () => matchService.getActiveMatches(),
  });
