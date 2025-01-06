import {
  DEFAULT_LOGIN_REDIRECT, // URL par défaut après connexion réussie
  apiAuthPrefix, // Préfixe pour les routes d'API liées à l'authentification
  authRoutes, // Routes liées à l'authentification (connexion, inscription)
  publicRoutes, // Routes accessibles sans authentification
} from "@/routes";

import NextAuth from "next-auth";
import authConfig from "./auth.config"; // Configuration NextAuth

// Création de l'instance NextAuth
const { auth } = NextAuth(authConfig);

// Middleware Next.js pour gérer les redirections d'authentification
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // Vérifie si l'utilisateur est connecté

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix); // Routes API auth
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname); // Routes publiques
  const isAuthRoute = authRoutes.includes(nextUrl.pathname); // Routes d'authentification

  // 1. Ne rien faire si c'est une route d'API liée à l'authentification
  if (isApiAuthRoute) {
    return;
  }

  // 2. Rediriger un utilisateur connecté qui tente d'accéder aux routes d'authentification
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // 3. Rediriger un utilisateur non connecté qui essaie d'accéder à une page protégée
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname; // Conserver l'URL actuelle
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    // Redirection vers la page de connexion avec l'URL de rappel
    return Response.redirect(
      new URL(`/auth/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // 4. Laisser passer la requête si aucune condition ne s'applique
  return;
});

// Configuration du middleware pour les routes protégées et publiques
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
