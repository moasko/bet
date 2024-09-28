"use client";

import { counters } from "@/back/admin";
import { Charter } from "@/components/custom/ChartData";
import StateGrid from "@/components/custom/StateGrid";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["counters"],
    queryFn: () => counters(),
  });
  return (
    <div>
      <StateGrid loadPlaceholderCount={12} loading={isLoading} data={data} />
      <Charter />
    </div>
  );
};

export default Page;
