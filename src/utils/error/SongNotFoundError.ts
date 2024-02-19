
import { NotFoundError } from "./NotFoundError";

export class SongNotFoundError extends NotFoundError {
  constructor(id: number) {
    super(`Song with id ${id} not found`);
  }
}
