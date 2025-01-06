"use client";

import { getActiveMatche } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card } from "../ui/card";
import MatchCardLoadingSkeleton from "./MatchCardLoadingSkeleton";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString("fr-FR"),
    time: date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

function formatTimeRemaining(ms: number) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
}

function ActiveMatchCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["activematches"],
    queryFn: () => getActiveMatche(),
  });

  const [timeRemainingBetStart, setTimeRemainingBetStart] = useState<number>(0);
  const [timeRemainingBetEnd, setTimeRemainingBetEnd] = useState<number>(0);

  if (isLoading) {
    return <MatchCardLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Erreur lors du chargement des données
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const isBettingClosed = timeRemainingBetStart <= 120000;

  return (
    <Link href={`/match/${data.id}`}>
      {isBettingClosed?.toString()}
      <Card className="bg-white  overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-300">
        {/* En-tête avec info ligue et date */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={data.league.flag}
                alt={data.league.name}
                className="w-6 h-6 rounded-full border-2 border-white/20"
              />
              <span className="text-sm font-semibold">{data.league.name}</span>
            </div>
            {/* <Badge
              variant="outline"
              className="bg-white/10 border-white/20 text-white text-[10px] font-medium"
            >
              <Clock size={12} className="mr-1" />
              {startDate}
            </Badge> */}
          </div>
        </div>

        {/* Informations sur les horaires */}

        {/* Contenu principal */}
        <div className="p-4">
          <div className="flex items-center justify-between w-full rounded">
            {/* Équipe domicile */}
            <TeamInfo team={data.homeTeam} />

            {/* Score/VS */}
            <div className="flex flex-col items-center justify-center px-4">
              <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center shadow-sm">
                <span className=" text-gray-700">VS</span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <Trophy size={16} className="text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  {data.percentage}x
                </span>
              </div>
            </div>

            {/* Équipe extérieur */}
            <TeamInfo team={data.awayTeam} />
          </div>
        </div>
      </Card>
    </Link>
  );
}

function TeamInfo({
  team,
}: {
  team: {
    name: string;
    shortName: string;
    flag: string;
  };
}) {
  return (
    <div className="flex flex-col items-center gap-3 ">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gray-100 shadow-inner overflow-hidden">
          <img
            src={team.flag}
            alt={team.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <p className="text-sm font-bold text-gray-800 text-center">
        {team.shortName}
      </p>
    </div>
  );
}

export default ActiveMatchCard;
