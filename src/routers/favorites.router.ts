
import { Request, Response, Router } from "express";

import {
  createFavorite,
  deleteFavorite,
  getFavoriteById,
  getFavorites,
  updateFavorite,
} from "@src/controllers/favorites.controller";
import { IRequest } from "@src/interfaces/common";
import { GeneralResponse } from "@src/interfaces/httpResponseTypes";
import { setAuthUser } from "@src/middlewares/authMiddleware";
import { UserNotFoundError } from "@src/utils/error/UserNotFoundError";
import { handleError } from "@src/utils/error/handler";
import { formatResponse } from "@src/utils/responseFormatter";
import { validateUpdateFavoriteSong } from "@src/validation/updateFavoriteValidation";
import { validateCreateFavoriteSong } from "@src/validation/createFavoriteValidation";

const favoritesRouter = Router();

favoritesRouter.get(
  "/",
  async (_: Request, res: Response): Promise<GeneralResponse> => {
    try {
      const favorites = await getFavorites();
      return res.json(formatResponse(favorites));
    } catch (error) {
      return handleError(res, error);
    }
  }
);

favoritesRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<GeneralResponse> => {
    try {
      const favorites = await getFavoriteById(Number(req.params.id));
      return res.json(formatResponse(favorites));
    } catch (error) {
      return handleError(res, error);
    }
  }
);

favoritesRouter.post(
  "/",
  validateCreateFavoriteSong,
  setAuthUser,
  async (req: IRequest, res: Response): Promise<GeneralResponse> => {
    try {
      if (!req.user)
        return res.status(404).json(new UserNotFoundError().json());
      const favorite = await createFavorite(req.body, req.user.id);
      return res.status(201).json(formatResponse(favorite));
    } catch (error) {
      return handleError(res, error);
    }
  }
);

favoritesRouter.put(
  "/:id",
  validateUpdateFavoriteSong,
  setAuthUser,
  async (req: IRequest, res: Response): Promise<GeneralResponse> => {
    try {
      if (!req.user)
        return res.status(404).json(new UserNotFoundError().json());
      const favorite = await updateFavorite(
        Number(req.params.id),
        req.user?.id,
        req.body,
      );
      return res.json(formatResponse(favorite));
    } catch (error) {
      return handleError(res, error);
    }
  }
);

favoritesRouter.delete(
  "/:id",
  setAuthUser,
  async (req: IRequest, res: Response): Promise<GeneralResponse> => {
    try {
      if (!req.user)
        return res.status(404).json(new UserNotFoundError().json());
      const result = await deleteFavorite(Number(req.params.id), req.user.id);
      return res.json(formatResponse(result));
    } catch (error) {
      return handleError(res, error);
    }
  }
);

export { favoritesRouter };
