import NextAuth from "next-auth";
import authConfig from "./modules/auth/auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { auth: userAuth, nextUrl } = req;
  const isLoggedIn = !!userAuth; // Vérifie si l'utilisateur est connecté
  const { pathname } = nextUrl;

  // Log pour déboguer les chemins et états
  console.log("Pathname:", pathname, "Logged in:", isLoggedIn);

  // Vérifie si la route est liée à l'API d'authentification
  if (pathname.startsWith(apiAuthPrefix)) {
    console.log("API auth route, no redirect.");
    return; // Pas de redirection pour les routes API d'auth
  }

  // Vérifie si c'est une route publique
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Vérifie si c'est une route d'authentification
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirige vers la page par défaut après connexion
      console.log("Auth route, user logged in. Redirecting...");
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }
    console.log("Auth route, user not logged in. Allowing access.");
    return; // Permettre l'accès aux routes d'authentification
  }

  if (!isLoggedIn && !isPublicRoute) {
    // Redirige vers la page de connexion
    console.log(
      "User not logged in, not a public route. Redirecting to signin."
    );
    return Response.redirect(new URL("/auth/signin", req.url));
  }

  console.log("Route allowed." + userAuth);
  return; // Laisse passer toutes les autres routes
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
