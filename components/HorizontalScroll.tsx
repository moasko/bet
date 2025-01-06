"use client";

import { getAllLeagues } from "@/services/leagues";
import { useQuery } from "@tanstack/react-query";

const HorizontalScroll = () => {
  const {
    data: leagues,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["leaguesList"],
    queryFn: getAllLeagues,
  });

  if (isLoading) {
    return (
      <div className="overflow-x-auto p-2">
        <div className="flex space-x-1 items-center w-max">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 animate-pulse rounded p-1 w-[80px] flex flex-col items-center"
            >
              <div className="h-16 w-full bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">
        Une erreur est survenue : {String(error)}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-2 items-center w-max p-3">
        {leagues?.map((league) => (
          <div
            key={league.id}
            className="bg-white rounded p-1 w-[80px] shadow-sm transition-transform transform hover:scale-105 flex flex-col items-center"
            aria-label={`League: ${league.name}`}
          >
            <img
              src={league.flag}
              alt={league.name}
              className="h-16 w-full object-cover rounded "
            />
            <p className="text-[10px] text-center font-semibold mt-2 text-gray-500">
              {league.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
