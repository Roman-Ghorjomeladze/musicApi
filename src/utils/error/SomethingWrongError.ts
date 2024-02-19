import { AppError } from "./appError";
import { ERROR_NAMES, HTTP_CODES } from "./errorTypes";

export class SomethingWrongError extends AppError {
  constructor() {
    super(
      ERROR_NAMES.SOMETHING_WRONG,
      HTTP_CODES.SOMETHING_WRONG,
      "Something went wrong, please try again later!"
    );
  }
}

export const SomethingWrong = new SomethingWrongError();
