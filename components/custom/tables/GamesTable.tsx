"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllMatches } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Edit, Trash2 } from "lucide-react";
import { useEffect } from "react";

const GamesTable = () => {
  const { data: games, isLoading } = useQuery({
    queryKey: ["gamesList"],
    queryFn: () => getAllMatches(),
  });

  useEffect(() => {
    console.log(games);
  }, [games]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold">Chargement des données...</p>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold">Aucun match disponible.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Table className="table-auto min-w-full border-separate border-spacing-y-3">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-left">Match</TableHead>
            <TableHead className="text-left">Pourcentage de gains</TableHead>
            <TableHead className="text-left">Début du Match</TableHead>
            <TableHead className="text-left">Début des Paris</TableHead>
            <TableHead className="text-left">Fin des Paris</TableHead>
            <TableHead className="text-left">Total Paris</TableHead>
            <TableHead className="text-left">Statut</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game, index) => (
            <TableRow key={index} className="hover:bg-gray-50 bg-slate-200">
              {/* Équipes opposées avec logos */}
              <TableCell className="py-3 bg-slate-100 rounded">
                <div className="flex items-center justify-between space-x-2 p-2 bg-slate-50 rounded">
                  <div className="flex items-center bg-blue-100 rounded-full px-2 py-1 space-x-1">
                    <img
                      src={game.homeTeam.flag}
                      alt={game.homeTeam.name}
                      className="w-8 h-8 rounded-full shadow"
                    />
                    <span className="font-semibold text-xs">
                      {game.homeTeam.shortName}
                    </span>
                  </div>
                  <span className="text-gray-500">vs</span>
                  <div className="flex items-center bg-blue-100 rounded-full px-2 py-1 space-x-1">
                    <span className="font-semibold text-xs">
                      {game.awayTeam.shortName}
                    </span>
                    <img
                      src={game.awayTeam.flag}
                      alt={game.awayTeam.name}
                      className="w-8 h-8 rounded-full shadow"
                    />
                  </div>
                </div>
                <p className="text-center">
                  <span className="text-gray-700 text-lg">{game.result}</span>
                </p>
                <p className="text-center">
                  <span className="text-xs text-gray-500">
                    {game.league.name}
                  </span>
                </p>
              </TableCell>
              <TableCell className="py-3 text-center text-lg font-bold text-gray-700">
                {game.percentage} %
              </TableCell>

              {/* Début du match */}
              <TableCell className="py-3 text-gray-700">
                {format(new Date(game.matchStartTime), "dd MMM yyyy, HH:mm", {
                  locale: fr,
                })}
              </TableCell>

              {/* Début des paris */}
              <TableCell className="py-3 text-gray-700">
                {format(new Date(game.betStartTime), "dd MMM yyyy, HH:mm", {
                  locale: fr,
                })}
              </TableCell>

              {/* Fin des paris */}
              <TableCell className="py-3 text-gray-700">
                {format(new Date(game.betEndTime), "dd MMM yyyy, HH:mm", {
                  locale: fr,
                })}
              </TableCell>

              {/* Total des paris */}
              <TableCell className="py-3 text-gray-700 text-center">
                <span className="font-bold text-blue-600">
                  {game._count.bets}
                </span>
              </TableCell>

              {/* Statut du match */}
              <TableCell className="py-3">
                <Badge
                  variant={game.status === "ACTIVE" ? "outline" : "destructive"}
                  className={`px-3 py-1 rounded-full ${
                    game.status === "FINISHED"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {game.status === "ACTIVE" ? "Actif" : "Terminé"}
                </Badge>
              </TableCell>

              {/* Actions */}
              <TableCell className="py-3">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1 text-blue-500"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1 text-red-500"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GamesTable;
