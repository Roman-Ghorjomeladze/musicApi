import { AppError } from "./appError";
import { ERROR_NAMES, HTTP_CODES } from "./errorTypes";

export class UnAuthorisedError extends AppError {
  constructor() {
    super(ERROR_NAMES.UNAUTHORISED, HTTP_CODES.UNAUTHORISED, 'Unauthorised request');
  }
}
