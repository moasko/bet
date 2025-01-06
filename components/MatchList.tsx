import { BallIcon } from "@/constants/icons";
import { formatResult } from "@/lib/utils";
import { MatchListProps } from "@/types";
import Link from "next/link";
import MatchCardLoadingSkeleton from "./custom/MatchCardLoadingSkeleton";
import MatchCountdown from "./MatchCountdown";

const MatchList = ({ matches, isLoading }: MatchListProps) => {
  const currentDate = new Date(); // Date actuelle

  // Filtrer les matchs pour ne garder que ceux dont la date de début est supérieure ou égale à la date actuelle
  const upcomingMatches = matches?.filter(
    (match) => new Date(match.matchStartTime) >= currentDate
  );

  return (
    <>
      {isLoading &&
        [...Array(7)].map((_, i) => <MatchCardLoadingSkeleton key={i} />)}

      {upcomingMatches?.map((match, i) => (
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
            {[match.homeTeam, match.awayTeam].map((team, idx) => (
              <div className="flex items-center space-x-1" key={idx}>
                <img
                  src={team.flag}
                  width={20}
                  height={20}
                  alt="flag"
                  className="rounded-full"
                />
                <div className="w-full flex justify-between items-center">
                  <p className="text-xs font-bold">
                    {team.shortName}
                    <span className="text-[9px] text-gray-500 ml-1 font-normal">
                      ({team.name})
                    </span>
                  </p>
                  <p className="text-xs font-bold">
                    {formatResult(match?.result)?.[`${team.type}Result`]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 text-xs justify-between items-center">
            <p>
              Gains :
              <span className="text-red-600 font-bold">
                {" "}
                {match.percentage}%
              </span>
            </p>
            <MatchCountdown betStartTime={match.matchStartTime as any} />
          </div>
        </Link>
      ))}
    </>
  );
};

export default MatchList;
