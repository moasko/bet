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

function LeaguSelectList({
  leagueId,
  setLeagueId,
}: {
  leagueId: number;
  setLeagueId: (leagueId: number) => void;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["leagues"],
    queryFn: getAllLeagues,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Select
      value={leagueId.toString()}
      onValueChange={(value) => setLeagueId(parseInt(value))}
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
