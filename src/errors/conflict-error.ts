import { HttpStatus } from '../constants';

export class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatus.CONFLICT;
    this.name = 'ConflictError';
  }
}
