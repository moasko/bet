"use client";

import UserBet from "@/components/custom/actionsButtons/UserBet";
import LoadingPage from "@/components/custom/pages/LoadingPage";
import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import { formatResult } from "@/lib/utils";
import { getMatch } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MatchScreen = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setId] = React.useState<string | null>(null);

  React.useEffect(() => {
    params
      .then((resolvedParams) => setId(resolvedParams.id))
      .catch((error) =>
        console.error("Erreur lors de la résolution des paramètres :", error)
      );
  }, [params]);

  const { data, isLoading } = useQuery({
    queryKey: ["matche", id],
    queryFn: () => (id ? getMatch(Number(id)) : null),
    enabled: !!id,
  });

  if (!id || isLoading) {
    return <LoadingPage />;
  }

  return (
    <SimpleLayout goBackLabel="EVENEMENT">
      <div className="relative min-h-[150px] bg-cover bg-[url('/card.jpg')]">
        <div className="absolute inset-0 py-9 bg-red-900/60 flex flex-col justify-center px-3">
          <p className="text-white text-xs uppercase tracking-wide mb-5 text-center">
            {data?.league.name} - {data?.homeTeam.shortName} vs{" "}
            {data?.awayTeam.shortName}
          </p>

          <div className="flex justify-between items-center">
            {/* Équipe à domicile */}
            <div className="text-center w-1/3">
              <img
                src={data?.homeTeam.flag}
                alt="Home Team Flag"
                className="rounded-full w-[40px] h-[40px] mx-auto mb-1"
              />
              <p className="text-white text-sm font-semibold">
                {data?.homeTeam.shortName}
              </p>
              <p className="text-white text-[9px] opacity-75">
                {data?.homeTeam.name}
              </p>
            </div>

            {/* Résultat */}
            <div className="text-center w-1/3 flex justify-center items-center flex-col">
              <div className="text-[10px] text-white">MATCH EN COURS</div>
              <div className="bg-green-500 text-[9px] px-3 text-white mb-1 font-semibold">
                LIVE
              </div>
              <p className="text-white text font-bold w-[70%] px-2 bg-white/20 py-[2px] text-lg border border-white">
                {formatResult(data?.result as string)?.homeTeamResult} :{" "}
                {formatResult(data?.result as string)?.awayTeamResult}
              </p>
              <p>
                <span className="text-white text-[9px] opacity-75">
                  gains : {data?.percentage}%
                </span>
              </p>
            </div>

            {/* Équipe en déplacement */}
            <div className="text-center w-1/3">
              <img
                src={data?.awayTeam.flag}
                alt="Away Team Flag"
                className="rounded-full w-[40px] h-[40px] mx-auto mb-1"
              />
              <p className="text-white text-sm font-semibold">
                {data?.awayTeam.shortName}
              </p>
              <p className="text-white text-[9px] opacity-75">
                {data?.awayTeam.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="flex flex-col">
        <div className="flex justify-between font-medium px-3 border-t text-xs text-gray-600">
          <div className="w-1/2 border-r py-3">pourcentage de gains</div>
          <div className="w-1/2 text-right py-3">{data?.percentage}</div>
        </div>

        <div className="flex justify-between font-medium px-3 border-t text-xs text-gray-600">
          <div className="w-1/2 border-r py-3">Équipe à domicile</div>
          <div className="w-1/2 text-right py-3">{data?.homeTeam.name}</div>
        </div>

        <div className="flex justify-between font-medium px-3 border-t text-xs text-gray-600">
          <div className="w-1/2 border-r py-3">Équipe en déplacement</div>
          <div className="w-1/2 text-right py-3">{data?.awayTeam.name}</div>
        </div>
      </div>

      <div className="bg-gray-100 p-2 flex justify-around text-xs font-medium">
        <UserBet />
      </div>
    </SimpleLayout>
  );
};

export default MatchScreen;
