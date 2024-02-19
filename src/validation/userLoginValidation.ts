import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { formatError } from "@src/utils/responseFormatter";

export const validateLoginUser = [
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage('Password should be a string')
    .matches(/^.{5,12}$/)
    .withMessage('Password should contain from 5 to 12 characters'),
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isString()
    .withMessage("username should be string"),

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
