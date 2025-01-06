"use client";

import ActiveMatchCard from "@/components/custom/ActiveMatchCard";
import Navigation from "@/components/custom/Navigation";
import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import { getMatches } from "@/services/user";

import HorizontalScroll from "@/components/HorizontalScroll";
import MatchList from "@/components/MatchList";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQuery } from "@tanstack/react-query";

type HeaderImageProps = {
  src: string;
  alt: string;
};

const HeaderImage = ({ src, alt }: HeaderImageProps) => (
  <div className="w-full h-[100px] p-1">
    <img src={src} alt={alt} className="h-full w-full object-cover rounded" />
  </div>
);

const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  });
  const currentUser = useCurrentUser();

  console.log(currentUser);
  return (
    <SimpleLayout showSecondHeader={false}>
      <HeaderImage
        src="https://utfs.io/f/tRIyBWu5YI2bheN64RAdrnei874cINCb1MlzDXWsx6Y2gQ5f"
        alt="Image of a football"
      />

      <HorizontalScroll />

      <div className="bg-[#e9f2ee] p-2 space-y-2 shadow">
        <div className="pt-2">
          <p className="text-sm uppercase font-bold">Match du jour</p>
        </div>
        <ActiveMatchCard
          match={{
            startTime: new Date(),
            endTime: new Date(),
            odds: 1.5,
            hasPlacedBet: true,
            betAmount: 10,
          }}
        />
        <div className="pt-2">
          <p className="text-sm uppercase font-bold">Cette semaine</p>
        </div>
        <MatchList matches={data} isLoading={isLoading} />
      </div>

      <Navigation />
    </SimpleLayout>
  );
};

export default HomePage;
