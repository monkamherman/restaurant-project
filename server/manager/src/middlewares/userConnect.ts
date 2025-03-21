import { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../core/constants';
import { extractToken, handleError } from '../utils/tokenUtils';
import { ERROR_MESSAGES } from '../core/constants/errorMessages';
import { verifyUserRole } from '../utils/roleUtils';
import { verifyAccessToken, verifyRefreshToken } from '../token/tokenModule';


export interface CustumRequest extends Request {
  user?: {
    user_id: string;
    role?: string;
    exp?: number;
  };
}

export const userConnect = {
  // Middleware pour vérifier le token d'accès
  verifyAccessToken: async (req: CustumRequest, res: Response, next: NextFunction) => {
    try {
      const AccessToken = extractToken(req);
      if (!AccessToken) {
        return handleError(res, HttpCode.UNAUTHORIZED, ERROR_MESSAGES.NO_ACCESS_TOKEN);
      }

      const decodedToken = verifyAccessToken(AccessToken);
      if (!decodedToken) {
        return handleError(res, HttpCode.UNAUTHORIZED, ERROR_MESSAGES.INVALID_ACCESS_TOKEN);
      }

      req.user = decodedToken as CustumRequest['user'];
      next();
    } catch (error) {
      handleError(res, HttpCode.INTERNAL_SERVER_ERROR, "Erreur interne du serveur", error);
    }
  },

  // Middleware pour vérifier le token de rafraîchissement
  verifyRefreshToken: async (req: CustumRequest, res: Response, next: NextFunction) => {
    try {
      const RefreshToken = extractToken(req);
      if (!RefreshToken) {
        return handleError(res, HttpCode.UNAUTHORIZED, ERROR_MESSAGES.NO_REFRESH_TOKEN);
      }

      const decodedToken = verifyRefreshToken(RefreshToken);
      if (!decodedToken || typeof decodedToken === 'string' || !decodedToken.user_id) {
        return handleError(res, HttpCode.UNAUTHORIZED, ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
      }

      req.user = {
        user_id: decodedToken.user_id,
        role: decodedToken.role,
      };

      next();
    } catch (error) {
      handleError(res, HttpCode.INTERNAL_SERVER_ERROR, "Erreur interne du serveur", error);
    }
  },

  // Middleware pour vérifier si l'utilisateur est un admin
  verifyUserAdmin: verifyUserRole("admin"),

  // Middleware pour vérifier si l'utilisateur est un super_admin
  verifyUserSuperAdmin: verifyUserRole("super_admin"),
};

// export { userConnect };
export default userConnect;