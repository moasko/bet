import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = parseInt(params.userId);
    if (isNaN(userId)) {
      return new NextResponse("Invalid user ID", { status: 400 });
    }

    // Vérifier que l'utilisateur demande ses propres paris
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.id !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Récupérer les paris avec les détails des matchs
    const bets = await db.bet.findMany({
      where: {
        userId,
      },
      include: {
        match: {
          include: {
            league: true,
            homeTeam: true,
            awayTeam: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bets);
  } catch (error) {
    console.error("[BETS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
