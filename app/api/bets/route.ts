import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { matchId, amount } = body;

    if (!matchId || !amount) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Récupérer l'utilisateur
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: { wallet: true },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (!user.wallet) {
      return new NextResponse("Wallet not found", { status: 404 });
    }

    // Vérifier le solde
    if (user.wallet.balance < amount) {
      return new NextResponse("Insufficient balance", { status: 400 });
    }

    // Récupérer le match
    const match = await db.match.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      return new NextResponse("Match not found", { status: 404 });
    }

    // Vérifier si les paris sont encore ouverts
    const now = new Date();
    if (now > match.betEndTime) {
      return new NextResponse("Betting is closed for this match", { status: 400 });
    }

    // Calculer le gain potentiel
    const potentialWin = amount * match.percentage;

    // Créer le pari et mettre à jour le solde dans une transaction
    const bet = await db.$transaction(async (tx) => {
      // Créer le pari
      const bet = await tx.bet.create({
        data: {
          userId: user.id,
          matchId,
          amount,
          potentialWin,
          status: "PENDING",
        },
      });

      // Mettre à jour le solde
      await tx.wallet.update({
        where: { userId: user.id },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      return bet;
    });

    return NextResponse.json(bet);
  } catch (error) {
    console.error("[BETS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
