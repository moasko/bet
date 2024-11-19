"use client";

import UserBet from "@/components/custom/actionsButtons/UserBet";
import LoadingPage from "@/components/custom/pages/LoadingPage";
import Ticket from "@/components/custom/Tiket";
import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import MatchCountdown from "@/components/MatchCountdown";
import { formatResult } from "@/lib/utils";
import { getMatch } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

const MatchScreen = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, isLoading } = useQuery({
    queryKey: ["matche", id],
    queryFn: () => getMatch(Number(id)),
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <SimpleLayout goBackLabel="EVENEMENT">
      <div className="relative min-h-[150px] bg-cover bg-[url('/card.jpg')] ">
        <div className="absolute inset-0 py-9 bg-red-900/60 flex flex-col justify-center px-3">
          <p className="text-white text-xs uppercase tracking-wide mb-5 text-center">
            {data?.league.name} - {data?.homeTeam.shortName} vs{" "}
            {data?.awayTeam.shortName}
          </p>

          <div className="flex justify-between items-center">
            {/* Home Team */}
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

            {/* Match Result */}
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

            {/* Away Team */}
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

      {/* Tab navigation améliorée */}
      <div className="flex flex-col">
        <div className="flex justify-between font-medium px-3 border-t text-xs text-gray-600 ">
          <div className="w-1/2 border-r py-3 ">pourcentage de gains</div>
          <div className="w-1/2 text-right py-3 ">{data?.percentage}</div>
        </div>

        <div className="flex justify-between font-medium px-3 border-t text-xs text-gray-600 ">
          <div className="w-1/2 border-r py-3 ">Fin des paries</div>
          <div className="w-1/2 text-right py-3 ">
            <MatchCountdown betStartTime={data?.betEndTime} />
          </div>
        </div>

        <div className="flex justify-between font-medium px-3 border-t text-xs text-gray-600 ">
          <div className="w-1/2 border-r py-3 ">Equipe a domicile</div>
          <div className="w-1/2 text-right py-3 ">{data?.homeTeam.name}</div>
        </div>

        <div className="flex justify-between font-medium px-3 border-t text-xs text-gray-600 ">
          <div className="w-1/2 border-r py-3 ">Equipe deplacee</div>
          <div className="w-1/2 text-right py-3 ">{data?.awayTeam.name}</div>
        </div>

        <div className="flex justify-between font-medium px-3 border-t text-xs text-gray-600 ">
          <div className="w-1/2 border-r py-3 ">pourcentage de gains</div>
          <div className="w-1/2 text-right py-3 ">{data?.percentage}</div>
        </div>
      </div>

      <div className="bg-gray-100 p-2 flex justify-around text-xs font-medium">
        <UserBet />

        {/* <MatchCountdown
          betStartTime={data?.betEndTime}
          handleTimePasse={() => {
            return (
              <Button className="w-full text-xs hover:bg-gray-300 transition py-1">
                Parier
              </Button>
            );
          }}
        /> */}
      </div>
      <Ticket
        amount={1000}
        potentialWin={50}
        percentageGain={20}
        team1={"moaso"}
        team2={"dev"}
        onClose={() => {}}
      />
    </SimpleLayout>
  );
};

export default MatchScreen;
