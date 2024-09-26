import React from "react";
import Image from "next/image";

interface Team {
  name: string;
  image: string;
}

interface MatchProps {
  team1: Team;
  team2: Team;
  score: string;
  percentage: string;
  league: string;
  day: string;
}

const MatchCard: React.FC<MatchProps> = ({
  team1,
  team2,
  score,
  percentage,
  league,
  day,
}) => {
  return (
    <div className="bg-[url('/bgs/match_bg.png')] bg-contain bg-center bg-no-repeat h-[320px] -mt-8 flex justify-center items-center">
      <div className="w-[95%] h-[52%] flex flex-col">
        <div className="w-full text-center">
          <h1 className="font-bold text-white">{league}</h1>
          <p className="text-gray-400 text-xs">{day}</p>
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="flex justify-between items-center h-full w-full px-5">
            {/* Équipe 1 */}
            <div className="flex flex-col items-center justify-center">
              <Image
                src={team1.image}
                alt={team1.name}
                width={50}
                height={50}
                className="object-contain"
              />
              <p className="text-white text-xs mt-2 text-center w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                {team1.name}
              </p>
            </div>

            {/* Score et pourcentage */}
            <div className="pt-7 h-[120px] flex flex-col justify-between items-center px-4 py-2 rounded-md text-white">
              <h1 className=" text-[2.2rem] font-bold">{score}</h1>
              <p className="text-lg pt-5 text-red-400 font-bold">{percentage}</p>
            </div>

            {/* Équipe 2 */}
            <div className="flex flex-col items-center justify-center">
              <Image
                src={team2.image}
                alt={team2.name}
                width={50}
                height={50}
                className="object-contain"
              />
              <p className="text-white text-xs mt-2 text-center w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                {team2.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
