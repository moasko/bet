import { db } from "@/lib/db"; // Assurez-vous que ce chemin est correct
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session } = useSession();

  const { data: user } = useQuery({
    queryKey: ["current-user", session?.user?.email],
    queryFn: async () => {
      if (!session?.user?.email) return null;

      return await db.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
    },
    enabled: !!session?.user?.email,
  });

  return user;
};
