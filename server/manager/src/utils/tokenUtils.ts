import { Request, Response } from 'express';

// Fonction pour extraire les tokens
export const extractToken = (req: Request): string | undefined => {
  const authHeader = req.headers?.authorization; // Use optional chaining
  if (!authHeader) {
      return undefined; // Return undefined if no authorization header
  }
  return authHeader.split(' ')[1]; // Assuming Bearer token format
};

// Gestion centralisée des erreurs
export const handleError = (
  res: Response,
  statusCode: number,
  message: string,
  error?: unknown
) => {
  console.error(error);
  return res.status(statusCode).json({ msg: message });
};