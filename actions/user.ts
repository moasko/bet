"use server";

import { db } from "@/lib/db";
import { handleError } from "@/lib/errors";
import { generateReferralCode } from "@/lib/utils";
import bcrypt from "bcryptjs";

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findFirst({
      where: { email },
    });
  } catch (error) {
    handleError("getUserByEmail", error);
    throw new Error("Erreur lors de la vérification de l'email.");
  }
};

/**
 * Finds a user by their phone number.
 *
 * @param phone - The phone number to search for.
 * @returns The user with the given phone number, or null if no user is found.
 * @throws If there is an error with the database, an error is thrown with a
 *   message indicating that the verification of the phone number failed.
 */
const getUserByPhone = async (phone: string) => {
  try {
    return await db.user.findFirst({
      where: { phone },
    });
  } catch (error) {
    handleError("getUserByPhone", error);
    throw new Error("Erreur lors de la vérification du numéro de téléphone.");
  }
};

const getUserById = async (userId: number) => {
  try {
    return await db.user.findUnique({ where: { id: userId } });
  } catch (error) {
    handleError("getUserById", error);
    throw new Error("Erreur lors de la récupération du user par id");
  }
};

const getUserWallet = async (userId: number) => {
  try {
    return await db.wallet.findUnique({ where: { userId } });
  } catch (error) {
    handleError("getUserWallet", error);
    throw new Error("Erreur lors de la récupération du wallet par user id");
  }
};

const getUserWallerBalance = async (userId: number) => {
  try {
    return db.wallet.findUnique({
      where: {
        userId,
      },
    });
  } catch (error) {
    handleError("getUserWallet", error);
  }
};

const getUserParrainWithCode = async (code: string) => {
  try {
    return await db.user.findUnique({
      where: { referalCode: code },
    });
  } catch (error) {
    handleError("getUserParrainWithCode", error);
    throw new Error("Erreur lors de la vérification du code de parrainage.");
  }
};

const registerUser = async ({
  email,
  password,
  name,
  phone,
  parainCode,
}: {
  email: string;
  password: string;
  name: string;
  phone: string;
  parainCode: string;
}) => {
  try {
    // Validation : Vérification des doublons (email et téléphone)
    const [existingEmailUser, existingPhoneUser] = await Promise.all([
      getUserByEmail(email),
      getUserByPhone(phone),
    ]);

    if (existingEmailUser) {
      throw new Error("Un utilisateur avec cet email existe déjà.");
    }

    if (existingPhoneUser) {
      throw new Error(
        "Un utilisateur avec ce numéro de téléphone existe déjà."
      );
    }

    // Validation : Mot de passe
    if (password.length < 8) {
      throw new Error("Le mot de passe doit contenir au moins 8 caractères.");
    }

    // Hash du mot de passe
    const hashedPassword = await hashPassword(password);

    // Validation : Code de parrainage
    let referredById = null;
    let parainReferralCode = "0";
    if (parainCode) {
      const parain = await getUserParrainWithCode(parainCode);
      if (!parain) {
        throw new Error("Le code de parrainage est invalide.");
      }
      referredById = parain.id;
      parainReferralCode = parain.referalCode;
    }

    // Création du nouvel utilisateur
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        referalCode: generateReferralCode(6), // Génération d'un code unique
        parainCode: parainReferralCode,
        referredById,
        wallet: {
          create: { balance: 0 },
        },
      },
      include: {
        wallet: true,
      },
    });

    return newUser;
  } catch (error: any) {
    // Gestion explicite des messages d'erreur
    if (error.message) {
      throw new Error(error.message); // Utiliser le message d'erreur existant
    } else {
      throw new Error(
        "Une erreur inattendue s'est produite lors de l'inscription."
      );
    }
  }
};

export {
  getUserByEmail,
  getUserById,
  getUserByPhone,
  getUserParrainWithCode,
  getUserWallerBalance,
  getUserWallet,
  registerUser,
};
