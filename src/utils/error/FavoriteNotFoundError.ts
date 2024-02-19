import { NotFoundError } from "./NotFoundError";

export class FavoriteNotFoundError extends NotFoundError {
  constructor(id: number) {
    super(`Favorite with id ${id} not found!`);
  }
}
