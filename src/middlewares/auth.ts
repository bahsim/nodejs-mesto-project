import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new UnauthorizedError();
    }

    // @ts-ignore
    req.user = jwt.verify(token, JWT_SECRET);

    return next();
  } catch (error) {
    return next(error);
  }
};
