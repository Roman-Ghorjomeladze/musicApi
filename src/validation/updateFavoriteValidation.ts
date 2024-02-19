import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { formatError } from "@src/utils/responseFormatter";

export const validateUpdateFavoriteSong = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name should be string"),
  body("link")
    .notEmpty()
    .withMessage("link is required")
    .isString()
    .withMessage("link should be string"),
  body("preview")
    .notEmpty()
    .withMessage("preview is required")
    .isString()
    .withMessage("preview should be string"),
  body("artist.id")
    .notEmpty()
    .isNumeric()
    .withMessage("artist.id should be number"),
  body("artist.name")
    .notEmpty()
    .isString()
    .withMessage("artist.name should be string"),
  body("artist.image")
    .notEmpty()
    .isString()
    .withMessage("artist.image should be string"),
  body("album.id")
    .notEmpty()
    .isNumeric()
    .withMessage("album.id should be number"),
  body("album.title")
    .notEmpty()
    .isString()
    .withMessage("album.title should be string"),
  body("album.image")
    .notEmpty()
    .isString()
    .withMessage("album.image should be string"),

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
