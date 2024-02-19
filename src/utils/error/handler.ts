import { Response } from "express";

import { AppError } from "./appError";
import { SomethingWrongError } from "./SomethingWrongError";
import { GeneralResponse } from "@src/interfaces/httpResponseTypes";

export const handleError = (res: Response, error: unknown): GeneralResponse => {
  if (error instanceof AppError) {
    return res.status(error.httpCode).json(error.json());
  }
  return res.status(500).json(new SomethingWrongError().json());
};
