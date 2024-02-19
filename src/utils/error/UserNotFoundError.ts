import { NotFoundError } from "./NotFoundError";

export class UserNotFoundError extends NotFoundError {
  constructor(identifier?: number) {
    super(
      identifier
        ? `User with id ${identifier} not found!`
        : `Default user not found`
    );
  }
}
