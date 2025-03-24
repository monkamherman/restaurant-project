import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../utils/tokenToBlacklist';

interface DecodedToken {
  user_id: string;
  role?: string;
  exp?: number;
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your-access-token-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-token-secret';


// Générer un token d'accès (valide 15 minutes)
export const generateAccessToken = (payload: DecodedToken): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

// Vérifier le token d'accès
export const verifyAccessToken = (token: string): DecodedToken | null => {
  if (isTokenBlacklisted(token)) {
    console.error("Token blacklisted");
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Erreur de vérification du token d'accès:",error)
    return null;
  }
};

// Générer un token de rafraîchissement (valide 7 jours)
export const generateRefreshToken = (payload: DecodedToken): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// Vérifier le token de rafraîchissement
export const verifyRefreshToken = (token: string): DecodedToken | null => {
  if (isTokenBlacklisted(token)) {
    console.error("Token blacklisted");
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Erreur de vérification du token de rafraîchissement:",error)
    return null;
  }
};