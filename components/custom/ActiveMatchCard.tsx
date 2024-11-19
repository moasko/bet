"use client";

import { BallIcon } from "@/constants/icons"; // Assure-toi d'importer l'icône appropriée
import { formatResult } from "@/lib/utils";
import { getActiveMatche } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "../ui/button";
import MatchCardLoadingSkeleton from "./MatchCardLoadingSkeleton";

function ActiveMatchCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["activematches"],
    queryFn: () => getActiveMatche(),
  });

  return (
    <>
      {isLoading ? (
        <MatchCardLoadingSkeleton />
      ) : (
        <Link
          href={`/match/${data?.id}`}
          className="bg-white p-2 rounded block border border-red-500"
        >
          <div className="mb-2 space-y-1 rounded">
            <div className="flex gap-1 items-center">
              <BallIcon size={18} />
              <p className="text-xs font-semibold">Match du jour</p>
            </div>
            <p className="text-xs">{data?.league.name}</p>

            {/* First team */}
            <div className="flex items-center space-x-1">
              <img
                src={data?.homeTeam.flag}
                width={20}
                height={20}
                alt="team1"
                className="rounded-full"
              />
              <div className="w-full flex justify-between items-center">
                <p className="text-xs font-bold">
                  {data?.homeTeam.shortName}
                  <span className="text-[9px] text-gray-500 ml-1 font-normal">
                    ({data?.homeTeam.name})
                  </span>
                </p>
                <p className="text-xs font-bold">
                  {formatResult(data?.result as string)?.homeTeamResult}
                </p>
              </div>
            </div>

            {/* Second team */}
            <div className="flex items-center space-x-1">
              <img
                src={data?.awayTeam.flag}
                width={20}
                height={20}
                alt="team2"
                className="rounded-full"
              />
              <div className="w-full flex justify-between items-center">
                <p className="text-xs font-bold">
                  {data?.awayTeam.shortName}
                  <span className="text-[9px] text-gray-500 ml-1 font-normal">
                    ({data?.awayTeam.name})
                  </span>
                </p>
                <p className="text-xs font-bold">
                  {" "}
                  {formatResult(data?.result as string)?.awayTeamResult}
                </p>
              </div>
            </div>
          </div>

          {/* Betting buttons */}
          <div className="flex gap-2">
            <Button
              className="min-w-12 text-xs bg-[#e9f2ee]/70 text-[#636363] rounded"
              size="sm"
            >
              {data?.percentage}%
            </Button>
          </div>
        </Link>
      )}
    </>
  );
}
export default ActiveMatchCard;
