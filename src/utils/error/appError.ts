import { CommonResponse } from "../../interfaces/httpResponseTypes";
import { HTTP_CODES } from "./errorTypes";

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HTTP_CODES;
  public readonly description: string;

  constructor(name: string, httpCode: HTTP_CODES, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.description = description;
    this.name = name;
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }

  json(): CommonResponse {
    return {
      data: null,
      ok: false,
      errors: {
        message: this.description,
        all: [this.description],
      },
    };
  }
}
