"use client";

import ActiveMatchCard from "@/components/custom/ActiveMatchCard";
import MatchCardLoadingSkeleton from "@/components/custom/MatchCardLoadingSkeleton";
import Navigation from "@/components/custom/Navigation";
import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import MatchCountdown from "@/components/MatchCountdown";
import { getMatches } from "@/services/user";

import { BallIcon } from "@/constants/icons";
import { formatResult } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["matches"],
    queryFn: () => getMatches(),
  });

  return (
    <SimpleLayout showSecondHeader={false}>
      {/* <ScrollArea className="w-full p-2">
        <div className="flex space-x-4 overflow-x-auto">
          <div className="w-full h-[130px]">
            <img
              src="https://utfs.io/f/tRIyBWu5YI2bheN64RAdrnei874cINCb1MlzDXWsx6Y2gQ5f"
              alt="Image of a football"
              className="h-full w-full object-cover rounded"
            />
          </div>
        </div>
      </ScrollArea> */}

      <div className="w-full">
        <div className="w-full h-[150px] p-2">
          <img
            src="https://utfs.io/f/tRIyBWu5YI2bheN64RAdrnei874cINCb1MlzDXWsx6Y2gQ5f"
            alt="Image of a football"
            className="h-full w-full object-cover rounded"
          />
        </div>
        <div className="overflow-x-auto">
          <div className="flex space-x-2 items-center w-max p-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded p-1 w-[80px] shadow-sm transition-transform transform hover:scale-105 flex flex-col items-center"
              >
                <img
                  src="https://play-lh.googleusercontent.com/ZCnB9zUrKiyUX_wT7XPJgQ0-I6brQUlQLZ1cnV8afy3pjwWFToTYzZJlDVttUyWBfA"
                  alt="Image of a football"
                  className="h-16 w-full object-cover rounded"
                />
                <p className="text-[10px] text-center font-semibold mt-2 text-gray-500">
                  UEFA
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#e9f2ee] p-2 space-y-2 shadow">
        <div className="pt-2">
          <p className="text-sm uppercase font-bold">Match du jour</p>
        </div>
        <ActiveMatchCard />
        <div className="pt-2">
          <p className="text-sm uppercase font-bold">Cette semaine</p>
        </div>

        {isLoading &&
          [...Array(7)].map((_, i) => <MatchCardLoadingSkeleton key={i} />)}
        {data?.map((match, i) => (
          <Link
            href={`/match/${match.id}`}
            key={i}
            className="bg-white w-full block p-2 rounded shadow"
          >
            <div className="mb-2 space-y-1 rounded">
              <div className="flex gap-1 items-center">
                <BallIcon size={18} />
                <p className="text-xs font-semibold">Match à venir</p>
              </div>
              <p className="text-xs">{match.league.name}</p>
              <div className="flex items-center space-x-1">
                <img
                  src={match.homeTeam.flag}
                  width={20}
                  height={20}
                  alt="ff"
                  className="rounded-full"
                />
                <div className="w-full flex justify-between items-center">
                  <p className="text-xs font-bold">
                    {match.homeTeam.shortName}
                    <span className="text-[9px] text-gray-500 ml-1 font-normal">
                      ({match.homeTeam.name})
                    </span>
                  </p>
                  <p className="text-xs font-bold">
                    {formatResult(match?.result as string)?.homeTeamResult}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <img
                  src={match.awayTeam.flag}
                  width={20}
                  height={20}
                  alt="ff"
                  className="rounded-full"
                />
                <div className="w-full flex justify-between items-center">
                  <p className="text-xs font-bold">
                    {match.awayTeam.shortName}
                    <span className="text-[9px] text-gray-500 ml-1 font-normal">
                      {" "}
                      ({match.awayTeam.name})
                    </span>
                  </p>
                  <p className="text-xs font-bold">
                    {formatResult(match?.result as string)?.awayTeamResult}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 text-xs justify-between items-center">
              <p>
                Gains :{" "}
                <span className="text-red-600 font-bold">
                  {match.percentage}%
                </span>
              </p>
              <p className="text-[10px] text-slate-500">
                <MatchCountdown betStartTime={match.betStartTime} />
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Navigation />
    </SimpleLayout>
  );
};

export default HomePage;
