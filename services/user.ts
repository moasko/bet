"use server";

import db from "@/lib/db";
import { currencyToXOF } from "@/lib/utils";
import { BonusType, PaymentType } from "@prisma/client";
import { endOfWeek, startOfWeek } from "date-fns";

export const getAllBettors = async () => {
  const bettors = await db.user.findMany({
    include: {
      bets: true,
      payments: true,
      bonuses: true,
      wallet: true,
      referredUsers: true,
    },
  });

  const formattedBettors = bettors.map((bettor) => ({
    id: bettor.id,
    name: bettor.name,
    email: bettor.email,
    phone: bettor.phone,
    joinDate: bettor.createdAt.toISOString(),
    balance: currencyToXOF(bettor.wallet.balance),
    status: bettor.statuts,
  }));

  return formattedBettors;
};

export const getUserInfo = async (id: number) => {
  const userStata = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      bets: true,
      payments: true,
      bonuses: true,
      wallet: true,
      referredUsers: true,
    },
  });

  if (!userStata) {
    throw new Error("User not found");
  }

  const walletBalance = userStata.wallet?.balance || 0;

  const totalDeposits = userStata.payments
    .filter((payment) => payment.type === PaymentType.DEPOSIT)
    .reduce((sum, payment) => sum + payment.amount, 0);

  const totalWithdrawals = userStata.payments
    .filter((payment) => payment.type === PaymentType.WITHDRAWAL)
    .reduce((sum, payment) => sum + payment.amount, 0);

  const totalTransactions = userStata.payments.length;

  const totalBets = userStata.bets.length;

  const totalRefunds = userStata.bonuses
    .filter((bonus) => bonus.type === BonusType.REFOUND)
    .reduce((sum, bonus) => sum + bonus.amount, 0);

  const totalReferrals = userStata.referredUsers?.length || 0;

  const totalCommissions = userStata.bonuses
    .filter((bonus) => bonus.type === BonusType.COMMISSION)
    .reduce((sum, bonus) => sum + bonus.amount, 0);

  const data = {
    user: {
      id: userStata.id,
      name: userStata.name,
      email: userStata.email,
      phone: userStata.phone,
      joinDate: userStata.createdAt.toISOString(),
      balance: currencyToXOF(walletBalance),
      status: userStata.statuts,
    },
    infos: [
      {
        title: "Solde",
        value: `${walletBalance} XOF`,
        description: "Solde disponible du parieur.",
        route: "/admin/bettors",
      },
      {
        title: "Dépôts",
        value: `${totalDeposits} XOF`,
        description: "Montant total déposé par le parieur.",
        route: "/parieurs-actifs",
      },
      {
        title: "Retraits",
        value: `${totalWithdrawals} XOF`,
        description: "Montant total retiré par le parieur.",
        route: "/parieurs-non-verifies-email",
      },
      {
        title: "Transactions",
        value: totalTransactions.toString(),
        description: "Nombre total de transactions effectuées.",
        route: "/parieurs-non-verifies-mobile",
      },
      {
        title: "Paris Placés",
        value: totalBets.toString(),
        description: "Nombre total de paris placés par le parieur.",
        route: "/paris-en-attente",
      },
      {
        title: "Remboursement",
        value: `${totalRefunds} XOF`,
        description: "Montant total remboursé au parieur.",
        route: "/depots-en-attente",
      },
      {
        title: "Filleuls",
        value: totalReferrals.toString(),
        description: "Nombre total de filleuls référés par le parieur.",
        route: "/retraits-en-attente",
      },
      {
        title: "Commissions",
        value: `${totalCommissions} XOF`,
        description: "Montant total de commissions reçues par le parieur.",
        route: "/tickets-en-attente",
      },
    ],
  };

  return data;
};

export const editUser = async (id: number, data: any) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await db.user.update({
    where: {
      id,
    },
    data,
  });

  return true;
};

export const addSolde = async (userId: number, amount: number) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      wallet: true,
      Notification: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await db.wallet.update({
    where: {
      id: user.wallet.id,
    },
    data: {
      balance: user.wallet.balance + amount,
    },
  });

  await db.notification.create({
    data: {
      type: "CREDIT",
      userId: user.id,
      message: `🤑 Votre compte a été crédité de ${amount} XOF.`,
    },
  });

  return true;
};

export const subtractSolde = async (userId: number, amount: number) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      wallet: true,
      Notification: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await db.wallet.update({
    where: {
      id: user.wallet.id,
    },
    data: {
      balance: user.wallet.balance - amount,
    },
  });

  await db.notification.create({
    data: {
      type: "DEBIT",
      userId: user.id,
      message: `🥵 Votre compte a été débité de ${amount} XOF.`,
    },
  });

  return true;
};

export const getMatches = async () => {
  // Calculer les dates de début et de fin de la semaine actuelle
  const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Lundi
  const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 }); // Dimanche

  // Récupérer les matchs qui ont lieu entre ces deux dates
  const matches = await db.match.findMany({
    orderBy: {
      matchStartTime: "asc",
    },
    where: {
      matchStartTime: {
        gte: startOfThisWeek, // Matchs à partir du début de la semaine
        lte: endOfThisWeek, // Matchs jusqu'à la fin de la semaine
      },
    },
    include: {
      awayTeam: true,
      homeTeam: true,
      league: true,
    },
  });

  return matches;
};

export const getActiveMatche = async () => {
  const activeMatches = await db.match.findFirst({
    where: {
      status: "ACTIVE",
    },
    include: {
      awayTeam: true,
      homeTeam: true,
      league: true,
    },
  });

  return activeMatches;
};

export const getMatch = async (id: number) => {
  const match = await db.match.findUnique({
    where: {
      id,
    },
    include: {
      awayTeam: true,
      homeTeam: true,
      league: true,
    },
  });

  if (!match) {
    throw new Error("Match not found");
  }

  return match;
};
