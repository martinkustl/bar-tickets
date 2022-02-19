import { CustomError } from './custom-error';

export class ValidationError extends CustomError {
  public statusCode;

  constructor(public message: string) {
    super(message);
    this.statusCode = 400;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
