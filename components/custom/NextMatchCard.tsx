import React from "react";
import Image from "next/image";

interface Team {
  name: string;
  flag: string;
}

interface MatchProps {
  team1: Team;
  team2: Team;
  date: string;
  time: string;
}

const NextMatchCard: React.FC<MatchProps> = ({ team1, team2, date, time }) => {
  return (
    <div className="bg-[#0f1a45] border-2 border-[#10304e] p-4 rounded-xl shadow-md flex justify-between items-center space-x-4 max-w-md mx-auto">
      {/* Équipe 1 */}
      <div className="flex items-center space-x-2">
        <Image 
          src={team1.flag} 
          alt={`Flag of ${team1.name}`} 
          width={32} 
          height={32} 
          className="rounded-full"
        />
        <p className="text-white text-sm font-semibold">{team1.name}</p>
      </div>

      {/* Date et heure */}
      <div className="text-center text-gray-300">
        <p className="text-xs">{date}</p>
        <p className="text-sm font-semibold">{time}</p>
      </div>

      {/* Équipe 2 */}
      <div className="flex items-center space-x-2">
        <p className="text-white text-sm font-semibold">{team2.name}</p>
        <Image 
          src={team2.flag} 
          alt={`Flag of ${team2.name}`} 
          width={32} 
          height={32} 
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default NextMatchCard;
