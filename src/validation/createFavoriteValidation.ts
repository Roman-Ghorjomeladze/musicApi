import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { formatError } from "@src/utils/responseFormatter";

export const validateCreateFavoriteSong = [
  body("id")
    .notEmpty()
    .isNumeric()
    .withMessage("id should be number"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(formatError("Invalid request", errors.array()));
    }

    return next();
  },
];
