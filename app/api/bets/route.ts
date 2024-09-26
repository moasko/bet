
import db from "@/lib/db";

const getAllBetters = async () => {
  return db.user.findMany();
};

export async function GET(request: Request) {
    const events = await getAllBetters();
    const response = {
      events,
    };
    return new Response(JSON.stringify(response));
  }
  