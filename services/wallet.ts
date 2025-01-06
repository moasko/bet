import { db } from "@/lib/db";

class useWalletService {
  async getWallet(userId: number) {
    const wallet = await db.wallet.findUnique({
      where: {
        userId,
      },
    });
    return wallet;
  }
}

export const walletService = new useWalletService();
