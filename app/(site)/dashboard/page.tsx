import MatchCard from "@/components/custom/MatchCard";
import Image from "next/image";

const UserDashboardPage = () => {
  return (
    <>
      <header className="flex justify-between items-center w-full bg-slate-800 border-b p-3 border-zinc-800 text-white">
        <div className="h-[45px] w-[45px] border border-red-500 bg-white flex justify-center items-center rounded-full">
          <Image src="/brands/logo_user.png" alt="alt" width={35} height={35} />
        </div>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div>
          <button className="border border-gray-200 px-3 py-1">Filter</button>
          <button className="border border-gray-200 px-3 py-1">Add</button>
        </div>
      </header>
      <MatchCard
        team1={{ name: "Real De madrid", image: "/teams/real.png" }}
        team2={{ name: "fc barcelone", image: "/teams/real.png" }}
        score="2-1"
        percentage="80%"
        league="Ligue 1"
        day="Aujourd'hui"
      />
      <p>jj</p>
    </>
  );
};

export default UserDashboardPage;
