import { CustomError } from './custom-error';

export class HttpError extends CustomError {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
