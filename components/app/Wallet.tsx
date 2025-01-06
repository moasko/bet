"use client";

import { currentcyChange } from "@/lib/utils";
import { useWalletStore } from "@/store/useWalletStore";

function Wallet() {
  const { balance } = useWalletStore();

  return (
    <span>
      {currentcyChange({
        amount: balance,
        symbole: "USD",
      })}{" "}
    </span>
  );
}

export default Wallet;
