import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId);
    if (isNaN(userId)) {
      return new NextResponse("Invalid user ID", { status: 400 });
    }

    // Récupérer le nombre total de membres
    const totalMembers = await db.user.count({
      where: {
        referredById: userId,
      },
    });

    // Récupérer la distribution par statut
    const statusDistribution = await db.user.groupBy({
      by: ["statuts"],
      where: {
        referredById: userId,
      },
      _count: {
        id: true,
      },
    });

    // Formater la distribution par statut
    const formattedDistribution = statusDistribution.map((item) => ({
      status: item.statuts,
      count: item._count.id,
    }));

    return NextResponse.json({
      totalMembers,
      levelDistribution: formattedDistribution,
    });
  } catch (error) {
    console.error("[TEAM_STATS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
