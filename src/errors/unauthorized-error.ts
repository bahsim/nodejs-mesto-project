import { HttpStatus } from '../constants';

export class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string = 'Необходимо авторизоваться') {
    super(message);
    this.statusCode = HttpStatus.UNAUTHORIZED;
    this.name = 'UnauthorizedError';
  }
}
