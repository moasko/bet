import { db } from "@/lib/db";
import { Match, Prisma } from "@prisma/client";

class MatchService {
  /**
   * Crée un nouveau match.
   * @param data - Les données du match à créer.
   * @returns Le match créé.
   */
  async createMatch(data: Prisma.MatchCreateInput): Promise<Match> {
    try {
      const newMatch = await db.match.create({ data });
      return newMatch;
    } catch (error) {
      console.error("Erreur lors de la création du match :", error);
      throw new Error("Impossible de créer le match.");
    }
  }

  /**
   * Met à jour un match existant.
   * @param id - L'ID du match à mettre à jour.
   * @param data - Les nouvelles données du match.
   * @returns Le match mis à jour.
   */
  async updateMatch(id: number, data: Prisma.MatchUpdateInput): Promise<Match> {
    try {
      const updatedMatch = await db.match.update({ where: { id }, data });
      return updatedMatch;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du match :", error);
      throw new Error("Impossible de mettre à jour le match.");
    }
  }

  /**
   * Supprime un match.
   * @param id - L'ID du match à supprimer.
   * @returns Le match supprimé.
   */
  async deleteMatch(id: number): Promise<Match> {
    try {
      const deletedMatch = await db.match.delete({ where: { id } });
      return deletedMatch;
    } catch (error) {
      console.error("Erreur lors de la suppression du match :", error);
      throw new Error("Impossible de supprimer le match.");
    }
  }

  /**
   * Récupère un match par son ID.
   * @param id - L'ID du match à récupérer.
   * @returns Le match correspondant.
   */
  async getMatch(id: number): Promise<Match | null> {
    try {
      const match = await db.match.findUnique({ where: { id } });
      return match;
    } catch (error) {
      console.error("Erreur lors de la récupération du match :", error);
      throw new Error("Impossible de récupérer le match.");
    }
  }

  /**
   * Récupère tous les matchs.
   * @returns Une liste de tous les matchs.
   */
  async getAllMatches(): Promise<Match[]> {
    try {
      const matches = await db.match.findMany();
      return matches;
    } catch (error) {
      console.error("Erreur lors de la récupération des matchs :", error);
      throw new Error("Impossible de récupérer les matchs.");
    }
  }

  /**
   * Termine un match.
   * @param id - L'ID du match à terminer.
   * @returns Le match terminé.
   */
  async endMatch(id: number): Promise<Match> {
    try {
      const match = await db.match.update({
        where: { id },
        data: { status: "FINISHED" },
      });
      return match;
    } catch (error) {
      console.error("Erreur lors de la fin du match :", error);
      throw new Error("Impossible de terminer le match.");
    }
  }

  /**
   * Active le prochain match en attente.
   * @returns Le match activé ou null s'il n'y en a pas.
   */
  async activateNextMatch(): Promise<Match | null> {
    try {
      const nextMatch = await db.match.findFirst({
        where: { status: "PENDING", matchStartTime: { gte: new Date() } },
        orderBy: { matchStartTime: "asc" },
      });

      if (nextMatch) {
        const updatedMatch = await db.match.update({
          where: { id: nextMatch.id },
          data: { status: "ACTIVE" },
        });
        return updatedMatch;
      }

      return null;
    } catch (error) {
      console.error("Erreur lors de l'activation du match :", error);
      throw new Error("Impossible d'activer le match.");
    }
  }

  /**
   * Récupère les matchs actifs.
   * @returns Une liste des matchs actifs.
   */
  async getActiveMatches(): Promise<Match[]> {
    try {
      const activeMatches = await db.match.findMany({
        where: { status: "ACTIVE" },
      });
      return activeMatches;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des matchs actifs :",
        error
      );
      throw new Error("Impossible de récupérer les matchs actifs.");
    }
  }

  /**
   * Récupère les matchs de la semaine.
   * @returns Une liste des matchs de la semaine.
   */
  async getTheWeekMatches(): Promise<Match[]> {
    try {
      const weekMatches = await db.match.findMany({
        where: { status: "ACTIVE", matchStartTime: { gte: new Date() } },
      });
      return weekMatches;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des matchs de la semaine :",
        error
      );
      throw new Error("Impossible de récupérer les matchs de la semaine.");
    }
  }

  /**
   * Récupère les matchs à venir.
   * @returns Une liste des matchs à venir.
   */
  async getUpcomingMatches(): Promise<Match[]> {
    try {
      const upcomingMatches = await db.match.findMany({
        where: { status: "PENDING", matchStartTime: { gte: new Date() } },
      });
      return upcomingMatches;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des matchs à venir :",
        error
      );
      throw new Error("Impossible de récupérer les matchs à venir.");
    }
  }

  /**
   * Récupère les matchs terminés.
   * @returns Une liste des matchs terminés.
   */
  async getFinishedMatches(): Promise<Match[]> {
    try {
      const finishedMatches = await db.match.findMany({
        where: { status: "FINISHED" },
      });
      return finishedMatches;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des matchs terminés :",
        error
      );
      throw new Error("Impossible de récupérer les matchs terminés.");
    }
  }

  async payMatchWinner(matchId: number) {
    try {
      const match = await db.match.findUnique({ where: { id: matchId } });
      if (!match) {
        throw new Error("Match non trouvé.");
      }
      const updatedMatch = await db.match.update({
        where: { id: matchId },
        data: { status: "FINISHED" },
      });
      return updatedMatch;
    } catch (error) {
      console.error("Erreur lors du paiement du vainqueur du match :", error);
    }
  }

  async getUserBetHistory(userId: number) {
    try {
      const bets = await db.bet.findMany({
        where: { userId },
      });
      return bets;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'historique des paris :",
        error
      );
      throw new Error("Impossible de récupérer l'historique des paris.");
    }
  }
}

export const matchService = new MatchService();
