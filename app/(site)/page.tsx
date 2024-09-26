import Navigation from "@/components/custom/Navigation";
import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import { Search, Bell } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between items-center relative p-4">
      <div className="space-x-1 flex flex-row items-center">
        <div className="bg-white p-1 rounded-full border-red-300  border-2">
          <Image
            src="/brands/logo_user.png"
            alt="Warta"
            width={25}
            height={25}
          />
        </div>
        <div className="text-[12px] font-bold text-white">STORE BET</div>
      </div>

      <div className="flex space-x-4">
        <button className="bg-red-200/25 p-2 rounded-full">
          <Search size={18} color="white" />
        </button>
        <button className="bg-red-200/25 p-2 rounded-full">
          <Bell size={18} color="white" />
        </button>
      </div>
    </header>
  );
};

const LiveMatchCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 border-2 border-red-500 ">
      {/* En-tête : Live et titre du match */}
      <div className="grid grid-cols-3 items-center">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs">Ec-R</span>
        </div>
        <div className="text-center">
          <div className="text-center">
            <span className="text-xs text-gray-500">Al Bayt Stadium</span>
          </div>
        </div>
      </div>

      {/* Bloc principal avec les équipes et le score */}
      <div className="flex justify-between items-center mt-4">
        {/* Équipe 1 (Argentina) */}
        <div className="flex flex-col items-center">
          <Image src="/teams/real.png" alt="Argentina" width={48} height={48} />
          <span className="mt-2 text-sm font-medium">Argentina</span>
        </div>

        {/* Score */}
        <div>
          <div className="text-4xl font-bold text-center">
            <span>0</span>
            <span className="mx-2">:</span>
            <span>3</span>
          </div>
          <div className="text-xs text-center text-red-500 bg-red-100 border border-red-500 rounded-full">
            <span>{"45'"}</span>
          </div>
        </div>

        {/* Équipe 2 (France) */}
        <div className="flex flex-col items-center">
          <Image src="/teams/real.png" alt="France" width={48} height={48} />
          <span className="mt-2 text-sm font-medium">France</span>
        </div>
      </div>
    </div>
  );
};

const SportSelection = () => {
  return (
    <div className="flex w-full justify-between items-center py-3">
      <h2 className="font-bold">Matchs</h2>
      <p className="text-gray-500 text-sm">voir plus</p>
    </div>
  );
};

const MatchHistory = () => {
  const matches = [
    {
      team1: { name: "France", flag: "/teams/real.png" },
      team2: { name: "Morocco", flag: "/teams/real.png" },
      league: "Ligue 1",
      score: "2 : 0",
      date: "15 Dec",
    },
    {
      team1: { name: "Croatia", flag: "/teams/real.png" },
      team2: { name: "Argentina", flag: "/teams/real.png" },
      league: "Ligue 1",
      score: "0 : 3",
      date: "14 Dec",
    },
    {
      team1: { name: "Croatia", flag: "/teams/real.png" },
      team2: { name: "Argentina", flag: "/teams/real.png" },
      league: "Ligue 1",
      score: "0 : 3",
      date: "14 Dec",
    },
    {
      team1: { name: "Croatia", flag: "/teams/real.png" },
      team2: { name: "Argentina", flag: "/teams/real.png" },
      league: "Ligue 1",
      score: "0 : 3",
      date: "14 Dec",
    },
  ];

  return (
    <div className="space-y-2">
      {matches.map((match, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg flex items-center justify-between border-[2px] border-b-blue-500"
        >
          {/* Équipe 1 */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{match.team1.name}</span>
            <Image
              src={match.team1.flag}
              alt={match.team1.name}
              width={32}
              height={32}
            />
          </div>

          {/* Score */}
          <div className="flex flex-col justify-center items-center">
            <div className="text-xl font-bold text-center">{match.score}</div>
            <div className="text-[10px] text-gray-500">{match.date}</div>
          </div>

          {/* Équipe 2 */}
          <div className="flex items-center space-x-2">
            <Image
              src={match.team2.flag}
              alt={match.team2.name}
              width={32}
              height={32}
            />
            <span className="text-sm font-medium">{match.team2.name}</span>
          </div>

          {/* Date */}
        </div>
      ))}
    </div>
  );
};
const HomePage = () => {
  return (
    <SimpleLayout showSecondHeader={false}>
      <div className="bg-gray-100 min-h-screen relative">
        {/* <div>
          <div className=" bg-red-500 h-[210px] w-full relative mb-12 rounded-b-3xl">
            <Header />
            <div className="px-3 absolute w-full top-20">
              <LiveMatchCard />
            </div>
          </div>
        </div> */}

        <main className="p-4">
          <SportSelection />
          <MatchHistory />
          <Navigation />
        </main>
      </div>
    </SimpleLayout>
  );
};

export default HomePage;
