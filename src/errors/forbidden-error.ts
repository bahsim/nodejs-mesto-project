import { HttpStatus } from '../constants';

export class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatus.FORBIDDEN;
    this.name = 'ForbiddenError';
  }
}
