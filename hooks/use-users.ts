import {
  getUserByEmail,
  getUserById,
  getUserByPhone,
  getUserParrainWithCode,
} from "@/actions/user";
import { useQuery } from "@tanstack/react-query";

interface UserHookParams {
  userId?: number;
  userEmail?: string;
  userCode?: string;
  phone?: string;
}

interface User {
  id: number;
  email: string;
}

export function useUsers({
  userId,
  userEmail,
  userCode,
  phone,
}: UserHookParams) {
  const fetchUsers = async (): Promise<User | null> => {
    if (userId) {
      return await getUserById(userId);
    }
    if (userEmail) {
      return await getUserByEmail(userEmail);
    }

    if (userCode) {
      return await getUserParrainWithCode(userCode);
    }

    if (phone) {
      return await getUserByPhone(phone);
    }
    throw new Error("No valid Parameters provided for fetching user ");
  };

  const {
    data: user,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: fetchUsers,
    enabled: !!(userId || userEmail || userCode || phone),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return {
    user,
    isLoading,
    isError,
    error,
    refetch,
  };
}
