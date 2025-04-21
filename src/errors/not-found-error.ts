import { HttpStatus } from '../constants';

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string = 'Запрашиваемый ресурс не найден') {
    super(message);
    this.statusCode = HttpStatus.NOT_FOUND;
    this.name = 'NotFoundError';
  }
}
