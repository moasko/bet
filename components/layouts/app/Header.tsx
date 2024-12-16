"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { ArrowLeft, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  showSecondHeader?: boolean;
  goBackLabel?: string;
  showFirstHeader?: boolean;
}

const Header = ({
  showSecondHeader = true,
  goBackLabel = "",
  showFirstHeader = true,
}: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const role = useCurrentRole();

  return (
    <>
      {showFirstHeader && (
        <header className="bg-red-600 py-2 px-2">
          <div className="mx-auto flex w-full justify-between items-center">
            {/* Logo */}
            <div className="text-white italic font-bold text-xs">
              <Link href="/">
                <span className="text-yellow-500">STOR</span> BET
              </Link>
            </div>

            {/* User Actions */}
            <div className="flex gap-2">
              {/* Balance */}
              {session?.user ? (
                <>
                  <div className="bg-yellow-400 p-2 rounded shadow">
                    <p className="text-sm font-semibold uppercase">0 XOF</p>
                  </div>

                  <button
                    onClick={() => router.push("/dashboard/profile")}
                    className="bg-red-500 p-2 rounded shadow"
                    aria-label="Go to profile"
                  >
                    <User color="white" size={20} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => router.push("/auth/signin")}
                  className="bg-red-500 p-2 rounded shadow"
                  aria-label="Sign in"
                >
                  <p className="text-white text-xs">Se connecter</p>
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      {showSecondHeader && (
        <div className="sticky top-0 z-10">
          <div className="bg-red-500 w-full text-white py-2 px-2">
            <div className="mx-auto flex gap-2 items-center">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="bg-red-400 p-2 rounded"
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </button>
              {/* Label */}
              <p className="font-bold">{goBackLabel}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
