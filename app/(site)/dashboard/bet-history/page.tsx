import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import { MoreHorizontal, DollarSign } from "lucide-react"; // Import des icônes lucide-react
import Image from "next/image";
import React from "react";

const bets = [
  {
    date: "11/07/2024 (11:46)",
    betNumber: "51864579091",
    events: [
      {
        team1: {
          name: "Real de madrid",
          image: "/teams/real.png"
        },
        team2: {
          name: "PSG",
          image: "/teams/psg.png"
        }
      }
    ],
    finished: "0 of 2",
    odds: 2.008,
    bet: "1500 XOF",
    potentialWinnings: "3012 XOF"
  },
  {
    date: "10/07/2024 (09:30)",
    betNumber: "618545721091",
    events: [
      {
        team1: {
          name: "Real de madrid",
          image: "/teams/real.png"
        },
        team2: {
          name: "PSG",
          image: "/teams/psg.png"
        }
      }
    ],
    finished: "1 of 1",
    odds: 1.905,
    bet: "1000 XOF",
    potentialWinnings: "1905 XOF"
  }
  // Ajoutez d'autres paris ici...
];

const Page = () => {
  return (
    <SimpleLayout goBackLabel="Historique des paris" showFooter={false}>
      <div className="flex flex-col items-center gap-2 p-2">
        {bets.map((bet, index) => (
          <div key={index} className="rounded p-4 w-full bg-white shadow">
            {/* Date and Bet Number */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">{bet.date}</span>
              <span className="text-xs text-gray-500">
                № {bet.betNumber}
              </span>
              <button className="text-gray-500">
                <MoreHorizontal />
              </button>
            </div>

            {/* Display Events */}
            {bet.events.map((event, eventIndex) => (
              <div key={eventIndex} className="flex justify-between items-center py-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <Image src={event.team1.image} alt={event.team1.name} width={25} height={25} />
                    <p className="text-sm font-bold">{event.team1.name}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image src={event.team2.image} alt={event.team2.name} width={25} height={25} />
                    <p className="text-sm font-bold">{event.team2.name}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">Finished: {bet.finished}</p>
              </div>
            ))}

            {/* Odds and Bet */}
            <div className="flex justify-between items-center py-2">
              <p className="text-sm text-gray-600">Odds</p>
              <p className="text-sm font-bold">{bet.odds} %</p>
            </div>
            <div className="flex justify-between items-center py-2">
              <p className="text-sm text-gray-600">Bet</p>
              <p className="text-sm font-bold">{bet.bet}</p>
            </div>

            {/* Potential Winnings */}
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-gray-700" />
                <p className="text-sm font-bold text-gray-700">
                  <span className="text-black">Potential winnings</span>
                </p>
              </div>
              <p className="text-sm font-bold">{bet.potentialWinnings}</p>
            </div>

            {/* Repeat Button */}
          </div>
        ))}
        <div className="mt-4 sticky bottom-2 w-full">
          <button className="w-full bg-yellow-400 text-black font-bold py-2 rounded">
            Repeat
          </button>
        </div>
      </div>
    </SimpleLayout>
  );
};

export default Page;
