"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlaceBetForm } from "./PlaceBetForm";
import { Badge } from "@/components/ui/badge";
import { Clock, Trophy } from "lucide-react";

interface MatchCardProps {
  match: {
    id: number;
    homeTeam: {
      name: string;
      flag: string;
    };
    awayTeam: {
      name: string;
      flag: string;
    };
    league: {
      name: string;
      flag: string;
    };
    percentage: number;
    matchStartTime: Date;
    matchEndTime: Date;
    betEndTime: Date;
    status: "PENDING" | "ACTIVE" | "IN_PROGRESS" | "FINISHED";
  };
}

export function MatchCard({ match }: MatchCardProps) {
  const [showBetForm, setShowBetForm] = useState(false);

  const isBettingClosed = new Date() < new Date(match.matchStartTime) || new Date() > new Date(match.matchEndTime);
  const isFinished = match.status === "FINISHED";

  const getStatusBadge = () => {
    switch (match.status) {
      case "ACTIVE":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Actif
          </Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            En cours
          </Badge>
        );
      case "FINISHED":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Terminé
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            En attente
          </Badge>
        );
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* En-tête avec info ligue */}
        <div className="bg-gray-50 p-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
              <img
                src={match.league.flag}
                alt={match.league.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-semibold text-gray-700">{match.league.name}</span>
          </div>
          {getStatusBadge()}
        </div>

        <div className="p-4">
          {/* Équipes */}
          <div className="grid grid-cols-7 items-center gap-2 mb-4">
            <div className="col-span-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                <img
                  src={match.homeTeam.flag}
                  alt={match.homeTeam.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-bold text-gray-800">{match.homeTeam.name}</span>
            </div>
            
            <div className="col-span-1 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-gray-400">VS</span>
            </div>

            <div className="col-span-3 flex items-center gap-3 justify-end">
              <span className="text-sm font-bold text-gray-800">{match.awayTeam.name}</span>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                <img
                  src={match.awayTeam.flag}
                  alt={match.awayTeam.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Infos du match */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span className="text-sm">
                {new Date(match.matchStartTime).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {!isFinished && !isBettingClosed && (
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <Clock size={14} />
                <span>
                  Paris ouverts jusqu'à{" "}
                  {new Date(match.betEndTime).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-green-600">
              <Trophy size={16} />
              <span className="font-semibold">Cote: {match.percentage}x</span>
            </div>
          </div>

          {/* Bouton de pari */}
          <Button
            className={`w-full mt-4 ${
              isFinished || isBettingClosed
                ? "bg-gray-100 text-gray-500 hover:bg-gray-100"
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={isBettingClosed || isFinished}
            onClick={() => setShowBetForm(true)}
          >
            {isFinished
              ? "Match terminé"
              : isBettingClosed
              ? "Paris fermés"
              : "Parier maintenant"}
          </Button>
        </div>
      </Card>

      <PlaceBetForm
        matchId={match.id}
        matchDetails={{
          homeTeam: match.homeTeam.name,
          awayTeam: match.awayTeam.name,
          percentage: match.percentage,
          league: match.league.name,
          startTime: match.matchStartTime,
        }}
        isOpen={showBetForm}
        onClose={() => setShowBetForm(false)}
      />
    </>
  );
}
