"use client";

import Wallet from "@/components/app/Wallet";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowLeft, BellDot } from "lucide-react";
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
  const { user: currentUser } = useAuthStore();

  return (
    <>
      {showFirstHeader && (
        <header className="bg-red-600 py-2 px-2 sticky top-0 z-10">
          <div className="mx-auto flex w-full justify-between items-center">
            {/* Logo */}
            <div className="text-white italic font-bold text-xs">
              <Link href="/">
                <span className="text-yellow-500">STORE-</span>BET
              </Link>
            </div>

            {/* User Actions */}
            <div className="flex gap-2">
              {/* Balance */}
              {session?.user ? (
                <>
                  <div className="bg-yellow-400 p-2 rounded shadow">
                    <p className="text-[11px] font-semibold uppercase">
                      <Wallet />
                    </p>
                  </div>
                  <p>{currentUser?.email}</p>
                  <button
                    onClick={() => router.push("/dashboard/profile")}
                    className="p-2 rounded relative shadow"
                    aria-label="Go to profile"
                  >
                    <div className="absolute z-20 top-0 right-0 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-semibold border-[1.5px] bg-red-500 border-white">
                      15
                    </div>

                    <BellDot
                      className=" animate-bounce"
                      color="white"
                      size={18}
                    />
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
