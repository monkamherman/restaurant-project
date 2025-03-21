import { Request, Response } from 'express';

// Fonction pour extraire les tokens
export const extractToken = (req: Request, type: 'access' | 'refresh') => {
  if (type === 'access') {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.split(' ')[1]; // Extraire le token après "Bearer"
  } else if (type === 'refresh') {
    return req.cookies?.cook_emp_xyz || null; // Extraire le refresh token des cookies
  }
  return null;
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