import jwt from 'jsonwebtoken';

interface DecodedToken {
  user_id: string;
  role?: string;
  exp?: number;
}

// Vérifier le token d'accès
export const verifyAccessToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Erreur de vérification du token d'accès:",error)
    return null;
  }
};

// Vérifier le token de rafraîchissement
export const verifyRefreshToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Erreur de vérification du token de rafraîchissement:",error)
    return null;
  }
};