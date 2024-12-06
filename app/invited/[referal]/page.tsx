"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

function InvitePage() {
  const { referal } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">
        Code de parrainage : {referal || "Aucun code"}
      </h1>
      <Link href={`/auth/signup/?ref=${referal}`}>continuer</Link>
    </div>
  );
}

export default InvitePage;
