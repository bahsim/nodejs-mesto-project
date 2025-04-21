import { NextFunction, Request, Response } from 'express';
import {
  BadRequestError, ConflictError, ForbiddenError, NotFoundError, UnauthorizedError,
} from '../errors';
import errorLogger from './error-logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  errorLogger.error('Error occurred', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  });

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ForbiddenError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Default error
  return res.status(500).json({ message: 'На сервере произошла ошибка' });
};
