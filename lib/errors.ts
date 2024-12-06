/**
 * Gestion centralisée des erreurs.
 * @param method - Le nom de la méthode où l'erreur s'est produite.
 * @param error - L'erreur attrapée.
 * @throws Une nouvelle erreur avec un message standardisé.
 */
export const handleError = (method: string, error: any): never => {
  console.error(`Error in ${method}:`, error);
  throw new Error(`Could not complete the ${method} operation.`);
};
