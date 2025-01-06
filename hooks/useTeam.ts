import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./use-current-user";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  joinedAt: string;
  status: string;
}

interface TeamStats {
  totalMembers: number;
  levelDistribution: {
    status: string;
    count: number;
  }[];
}

export const useTeam = () => {
  const user = useCurrentUser();

  const { data: teamStats, isLoading: isLoadingStats } = useQuery<TeamStats>({
    queryKey: ["team-stats", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await fetch(`/api/users/${user.id}/team/stats`);
      if (!response.ok) throw new Error("Failed to fetch team stats");
      return response.json();
    },
    enabled: !!user?.id,
  });

  const { data: teamMembers, isLoading: isLoadingMembers } = useQuery<TeamMember[]>({
    queryKey: ["team-members", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await fetch(`/api/users/${user.id}/team/members`);
      if (!response.ok) throw new Error("Failed to fetch team members");
      return response.json();
    },
    enabled: !!user?.id,
  });

  return {
    stats: teamStats,
    members: teamMembers,
    isLoading: isLoadingStats || isLoadingMembers,
    referralCode: user?.referalCode,
  };
};
