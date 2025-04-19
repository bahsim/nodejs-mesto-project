export class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string = 'Переданы некорректные данные') {
    super(message);
    this.statusCode = 400;
    this.name = 'BadRequestError';
  }
}
