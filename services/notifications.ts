import { db } from "@/lib/db";
import { NotificationType } from "@/types";
import { Prisma } from "@prisma/client";

class NotificationsService {
  /**
   * Crée une notification personnalisée.
   * @param data - Les données de la notification.
   * @returns La notification créée.
   */
  async createNotification(data: Prisma.NotificationCreateInput) {
    try {
      const newNotification = await db.notification.create({ data });
      return newNotification;
    } catch (error) {
      console.error("Erreur lors de la création de la notification :", error);
      throw new Error("Impossible de créer la notification.");
    }
  }

  /**
   * Envoie une notification globale à tous les utilisateurs.
   * @param title - Le titre de la notification.
   * @param message - Le message de la notification.
   * @param type - Le type de notification (INFO, WARNING, etc.).
   * @returns La notification créée.
   */
  async sendGlobalNotification(
    title: string,
    message: string,
    type: NotificationType
  ) {
    try {
      const newNotification = await db.notification.create({
        data: {
          title,
          message,
          type,
        },
      });
      return newNotification;
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la notification globale :",
        error
      );
      throw new Error("Impossible d'envoyer la notification globale.");
    }
  }

  /**
   * Envoie une notification à un utilisateur spécifique.
   * @param userId - L'ID de l'utilisateur.
   * @param title - Le titre de la notification.
   * @param message - Le message de la notification.
   * @param type - Le type de notification (INFO, WARNING, etc.).
   * @returns La notification créée.
   */
  async sendNotificationToUser(
    userId: number,
    title: string,
    message: string,
    type: NotificationType
  ) {
    try {
      const newNotification = await db.notification.create({
        data: {
          title,
          message,
          type,
          user: { connect: { id: userId } },
        },
      });
      return newNotification;
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la notification à l'utilisateur :",
        error
      );
      throw new Error("Impossible d'envoyer la notification à l'utilisateur.");
    }
  }

  /**
   * Envoie une notification de victoire de match à un utilisateur.
   * @param userId - L'ID de l'utilisateur.
   * @param matchId - L'ID du match.
   * @returns La notification créée.
   */
  async sendMatchWonNotification(userId: number, matchId: number) {
    try {
      const newNotification = await db.notification.create({
        data: {
          title: "Match Gagné",
          message: `Félicitations ! Vous avez gagné le match #${matchId}.`,
          type: NotificationType.INFO,
          user: { connect: { id: userId } },
        },
      });
      return newNotification;
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la notification de victoire de match :",
        error
      );
      throw new Error(
        "Impossible d'envoyer la notification de victoire de match."
      );
    }
  }

  /**
   * Envoie une notification de défaite de match à un utilisateur.
   * @param userId - L'ID de l'utilisateur.
   * @param matchId - L'ID du match.
   * @returns La notification créée.
   */
  async sendMatchLostNotification(userId: number, matchId: number) {
    try {
      const newNotification = await db.notification.create({
        data: {
          title: "Match Perdu",
          message: `Désolé, vous avez perdu le match #${matchId}.`,
          type: NotificationType.INFO,
          user: { connect: { id: userId } },
        },
      });
      return newNotification;
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la notification de défaite de match :",
        error
      );
      throw new Error(
        "Impossible d'envoyer la notification de défaite de match."
      );
    }
  }

  /**
   * Envoie une notification de rechargement de compte à un utilisateur.
   * @param userId - L'ID de l'utilisateur.
   * @param amount - Le montant rechargé.
   * @returns La notification créée.
   */
  async sendAccountRechargedNotification(userId: number, amount: number) {
    try {
      const newNotification = await db.notification.create({
        data: {
          title: "Compte Rechargé",
          message: `Votre compte a été rechargé de ${amount} €.`,
          type: NotificationType.CREDIT,
          user: { connect: { id: userId } },
        },
      });
      return newNotification;
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la notification de rechargement de compte :",
        error
      );
      throw new Error(
        "Impossible d'envoyer la notification de rechargement de compte."
      );
    }
  }

  /**
   * Envoie une notification de débit de compte à un utilisateur.
   * @param userId - L'ID de l'utilisateur.
   * @param amount - Le montant débité.
   * @returns La notification créée.
   */
  async sendAccountDebitedNotification(userId: number, amount: number) {
    try {
      const newNotification = await db.notification.create({
        data: {
          title: "Débit de Compte",
          message: `${amount} € ont été débités de votre compte.`,
          type: NotificationType.WARNING,
          user: { connect: { id: userId } },
        },
      });
      return newNotification;
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la notification de débit de compte :",
        error
      );
      throw new Error(
        "Impossible d'envoyer la notification de débit de compte."
      );
    }
  }

  /**
   * Envoie une notification de paiement des gains à un utilisateur.
   * @param userId - L'ID de l'utilisateur.
   * @param amount - Le montant des gains payés.
   * @returns La notification créée.
   */
  async sendWinningsPaidNotification(userId: number, amount: number) {
    try {
      const newNotification = await db.notification.create({
        data: {
          title: "Gains Payés",
          message: `Félicitations ! ${amount} € ont été crédités à votre compte.`,
          type: NotificationType.CREDIT,
          user: { connect: { id: userId } },
        },
      });
      return newNotification;
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la notification de paiement des gains :",
        error
      );
      throw new Error(
        "Impossible d'envoyer la notification de paiement des gains."
      );
    }
  }

  /**
   * Récupère les notifications d'un utilisateur.
   * @param userId - L'ID de l'utilisateur.
   * @returns Les notifications de l'utilisateur.
   */
  async getUserNotifications(userId: number) {
    try {
      const notifications = await db.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      return notifications;
    } catch (error) {
      console.error("Erreur lors de la récupération des notifications :", error);
      throw new Error("Impossible de récupérer les notifications.");
    }
  }
}

export const notificationsService = new NotificationsService();

   * @returns Les notifications de l'utilisateur.
   */
  async getUserNotifications(userId: number) {
    try {
      const notifications = await db.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      return notifications;
    } catch (error) {
      console.error("Erreur lors de la récupération des notifications :", error);
      throw new Error("Impossible de récupérer les notifications.");
    }
  }
}

export const notificationsService = new NotificationsService();
