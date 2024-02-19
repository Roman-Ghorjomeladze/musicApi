import { AppError } from "./appError";
import { ERROR_NAMES, HTTP_CODES } from "./errorTypes";

export class BadRequestError extends AppError {
  constructor(description: string) {
    super(ERROR_NAMES.BAD_REQUEST, HTTP_CODES.BAD_REQUEST, description);
  }
}
