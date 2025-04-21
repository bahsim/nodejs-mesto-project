import { HttpStatus } from '../constants';

export class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string = 'Переданы некорректные данные') {
    super(message);
    this.statusCode = HttpStatus.BAD_REQUEST;
    this.name = 'BadRequestError';
  }
}
