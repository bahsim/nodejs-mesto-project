import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Default error
  return res.status(500).json({ message: 'На сервере произошла ошибка' });
};
