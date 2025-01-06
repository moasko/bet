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

    const members = await db.user.findMany({
      where: {
        referredById: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        referalCode: true,
        statuts: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedMembers = members.map((member) => ({
      id: member.id,
      name: member.name,
      email: member.email,
      joinedAt: member.createdAt,
      referralCode: member.referalCode,
      status: member.statuts,
    }));

    return NextResponse.json(formattedMembers);
  } catch (error) {
    console.error("[TEAM_MEMBERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
