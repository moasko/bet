"use server";

import { db } from "@/lib/db";
import { LeagueStatus, UserStatus } from "@prisma/client";

export const counters = async () => {
  // Comptes pour les différents types de statistiques
  const bettors = await db.user.count();
  const activeBettors = await db.user.count({
    where: { statuts: UserStatus.ACTIVE },
  });

  const unverifiedEmailBettors = await db.user.count({
    where: { emailVerified: false },
  });

  const unverifiedMobileBettors = await db.user.count({
    where: { mobileVerified: false },
  });

  const pendingBets = await db.bet.count({
    where: { status: "PENDING" },
  });

  const pendingDeposits = await db.payment.count({
    where: { status: "PENDING", type: "DEPOSIT" },
  });

  const pendingWithdrawals = await db.payment.count({
    where: { status: "PENDING", type: "WITHDRAWAL" },
  });

  const totalDeposits = await db.payment.aggregate({
    where: { type: "DEPOSIT", status: "COMPLETED" },
    _sum: { amount: true },
  });

  const totalWithdrawals = await db.payment.aggregate({
    where: { type: "WITHDRAWAL", status: "COMPLETED" },
    _sum: { amount: true },
  });

  const depositFees = await db.payment.aggregate({
    where: { type: "DEPOSIT", status: "COMPLETED" },
    _sum: { fee: true },
  });

  const withdrawalFees = await db.payment.aggregate({
    where: { type: "WITHDRAWAL", status: "COMPLETED" },
    _sum: { fee: true },
  });

  const totalWallet = await db.wallet.aggregate({
    _sum: { balance: true },
  });

  return [
    {
      title: "Total des parieurs",
      value: bettors,
      description: "Nombre total de parieurs enregistrés.",
      route: "/admin/bettors",
    },
    {
      title: "Parieurs actifs",
      value: activeBettors,
      description: "Parieurs ayant déjà fait un dépôt.",
      route: "/parieurs-actifs",
    },
    {
      title: "Parieurs non vérifiés par email",
      value: unverifiedEmailBettors,
      description: "Parieurs qui n'ont pas vérifié leur email.",
      route: "/parieurs-non-verifies-email",
    },
    {
      title: "Parieurs non vérifiés par mobile",
      value: unverifiedMobileBettors,
      description: "Parieurs qui n'ont pas vérifié leur mobile.",
      route: "/parieurs-non-verifies-mobile",
    },
    {
      title: "Paris en attente",
      value: pendingBets,
      description: "Nombre total de paris en attente de validation.",
      route: "/paris-en-attente",
    },
    {
      title: "Dépôts en attente",
      value: pendingDeposits,
      description: "Dépôts en attente de traitement.",
      route: "/depots-en-attente",
    },
    {
      title: "Retraits en attente",
      value: pendingWithdrawals,
      description: "Retraits en attente de traitement.",
      route: "/retraits-en-attente",
    },
    {
      title: "Solde total",
      value: totalWallet._sum.balance
        ? `${totalWallet._sum.balance} XOF`
        : "0 XOF",
      description: "Solde total des portefeuilles des parieurs.",
      route: "/solde-total",
    },
    {
      title: "Total des dépôts",
      value: totalDeposits._sum.amount
        ? `${totalDeposits._sum.amount} XOF`
        : "0 XOF",
      description: "Montant total des dépôts effectués.",
      route: "/total-depots",
    },
    {
      title: "Frais de dépôt",
      value: depositFees._sum.fee ? `${depositFees._sum.fee} XOF` : "0 XOF",
      description: "Frais totaux associés aux dépôts.",
      route: "/frais-de-depot",
    },
    {
      title: "Total des retraits",
      value: totalWithdrawals._sum.amount
        ? `${totalWithdrawals._sum.amount} XOF`
        : "0 XOF",
      description: "Montant total des retraits effectués.",
      route: "/total-retraits",
    },
    {
      title: "Frais de retrait",
      value: withdrawalFees._sum.fee
        ? `${withdrawalFees._sum.fee} XOF`
        : "0 XOF",
      description: "Frais totaux associés aux retraits.",
      route: "/frais-de-retrait",
    },
  ];
};

// teams
interface Team {
  leagueId: number;
  name: string;
  shortName: string;
  flag: string;
  slug: string;
}
export const createNewTeam = async (data: Team) => {
  const newTeam = await db.team.create({
    data,
  });
  return newTeam;
};

export const getAllTeams = async () => {
  const teams = await db.team.findMany();
  return teams;
};

export const getLeaguTeams = async (leagueId: number) => {
  const teams = await db.team.findMany({
    where: { leagueId },
  });
  return teams;
};

// leagues
interface League {
  name: string;
  flag: string;
  slug: string;
  status: LeagueStatus;
}
export const createNewLeague = async (data: League) => {
  const newLeague = await db.league.create({
    data,
  });
  return newLeague;
};

export const getAllLeagues = async () => {
  const leagues = await db.league.findMany();
  return leagues;
};

// matches

export interface Match {
  leagueId: number;
  homeTeamId: number;
  awayTeamId: number;
  percentage: number;
  matchStartTime: string;
  betStartTime: string;
  betEndTime: string;
  result?: string;
}

export const createNewMatch = async (data: Match) => {
  const newMatch = await db.match.create({
    data,
  });
  return newMatch;
};

export const getAllMatches = async () => {
  const matches = await db.match.findMany({
    orderBy: { id: "desc" },
    include: {
      homeTeam: true,
      awayTeam: true,
      league: true,
      _count: {
        select: { bets: true },
      },
    },
  });
  return matches;
};

const activateNextMatch = async () => {
  // Récupérer le prochain match "PENDING"
  const nextMatch = await db.match.findFirst({
    where: {
      status: "PENDING",
      matchStartTime: {
        gte: new Date(), // Le match doit avoir lieu dans le futur
      },
    },
    orderBy: {
      matchStartTime: "asc", // Trier par date de début la plus proche
    },
  });

  // Si un prochain match existe, le mettre à "ACTIVE"
  if (nextMatch) {
    await db.match.update({
      where: { id: nextMatch.id },
      data: {
        status: "ACTIVE",
      },
    });
  }
};

export const endMatch = async (id: number) => {
  const match = await db.match.update({
    where: { id },
    data: {
      status: "FINISHED",
    },
  });

  // Appeler la fonction pour activer le prochain match
  await activateNextMatch();

  return match;
};
