"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllLeagues } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

interface League {
  id: number;
  name: string;
}

interface LeaguSelectListProps {
  leagueId: number;
  setLeagueId: (leagueId: number) => void;
}

function LeaguSelectList({ leagueId, setLeagueId }: LeaguSelectListProps) {
  const { data, isLoading, isError } = useQuery<League[]>({
    queryKey: ["leagues"],
    queryFn: getAllLeagues,
  });

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors du chargement des ligues.</div>;

  return (
    <Select
      value={leagueId ? leagueId.toString() : ""}
      onValueChange={(value) => setLeagueId(parseInt(value, 10))}
    >
      <SelectTrigger>
        <SelectValue placeholder="Sélectionnez une ligue" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((league) => (
          <SelectItem key={league.id} value={league.id.toString()}>
            {league.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LeaguSelectList;
