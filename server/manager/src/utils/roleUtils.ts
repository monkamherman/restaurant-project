import { Request, Response, NextFunction } from 'express';
import { HttpCode } from '../core/constants';
import { handleError } from './tokenUtils';

export interface CustumRequest extends Request {
    user?: {
        role: string;
    };
}

// Middleware générique pour vérifier les rôles
export const verifyUserRole = (requiredRole: string) => {
  return async (req: CustumRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user || req.user.role !== requiredRole) {
        return handleError(res, HttpCode.FORBIDDEN, `Accès refusé. Rôle ${requiredRole} requis`);
      }
      next();
    } catch (error) {
      handleError(res, HttpCode.INTERNAL_SERVER_ERROR, "Erreur interne du serveur", error);
    }
  };
};