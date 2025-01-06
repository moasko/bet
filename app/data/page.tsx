"use client";

import { useUsers } from "@/hooks/use-users";
import { useSession } from "next-auth/react";

function Page() {
  const { data: session } = useSession();
  const { user } = useUsers({ userId: Number(session?.user.id) });
  return <div>user : {JSON.stringify(user, null, 2)}</div>;
}

export default Page;
