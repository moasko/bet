"use client";

import React from "react";
import { ArrowLeft, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  showSecondHeader?: boolean;
  goBackLabel?: string;
}

const Header = ({ showSecondHeader = true, goBackLabel = "" }: Props) => {
  const router = useRouter();
  return (
    <>
      <header className="bg-red-600  py-[.5em] px-2">
        <div className="mx-auto flex w-full justify-between items-center">
          <div className="text-white italic font-semibold text-sm">
            <span className="text-yellow-500">STOR</span> BET
          </div>
          <div className="flex gap-2">
            <div className="bg-yellow-400 p-2 w-max rounded shadow">
              <p className="text-sm font-semibold uppercase">0 XOF</p>
            </div>
            <button
              onClick={() => router.push("/dashboard/profile")}
              className="bg-red-500 p-2 w-max rounded shadow"
            >
              <User color="white" size={20} />
            </button>
          </div>
        </div>
      </header>
      {showSecondHeader && (
        <div className="sticky top-0">
          <div className="bg-red-500  w-full text-white py-[.5em] px-2">
            <div className="mx-auto flex gap-2 items-center">
              <button
                onClick={() => router.back()}
                className="bg-red-400 p-2 w-max rounded"
              >
                <ArrowLeft size={20} />
              </button>
              <p className=" font-bold">{goBackLabel}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
