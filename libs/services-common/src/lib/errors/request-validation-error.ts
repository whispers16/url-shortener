import { Location, ValidationError } from "express-validator";
import { CustomError } from "./"

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  static buildCustomMessage(
    message: string,
    value: unknown,
    param: string,
    location: Location
  ): ValidationError {
    return {
      msg: message,
      value,
      param,
      location,
    };
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
