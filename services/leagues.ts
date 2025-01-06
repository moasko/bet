"use server";

import { db } from "@/lib/db";

export const getAllLeagues = async () => {
  const leagues = await db.league.findMany({
    where: {
      status: "ACTIVE",
    },
  });
  return leagues;
};
