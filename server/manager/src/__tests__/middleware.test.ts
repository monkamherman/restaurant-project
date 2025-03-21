import { userConnect } from '../middlewares/userConnect';
import { Request, Response, NextFunction } from 'express';
import * as tokenModule from '../token/tokenModule';

describe('userConnect.verifyAccessToken', () => {
  it('should return 401 if no token is provided', async () => {
    const mockReq = {} as Request;
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;

    await userConnect.verifyAccessToken(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Aucun jeton d\'accès valide!!!' });
  });

  it('should call next() if token is valid', async () => {
    const mockReq = { headers: { authorization: 'Bearer valid-token' } } as Request;
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;

    jest.spyOn(tokenModule, 'verifyAccessToken').mockReturnValue({ user_id: '123' });

    await userConnect.verifyAccessToken(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});