import { AppError } from "./appError";
import { ERROR_NAMES, HTTP_CODES } from "./errorTypes";

export class NotFoundError extends AppError {
  constructor(description: string) {
    super(ERROR_NAMES.NOT_FOUND, HTTP_CODES.NOT_FOUND, description);
  }
}
