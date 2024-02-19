import { Response, Router } from "express";

import { GeneralResponse } from "@src/interfaces/httpResponseTypes";
import { formatResponse } from "@src/utils/responseFormatter";
import { handleError } from "@src/utils/error/handler";
import { setAuthUser } from "@src/middlewares/authMiddleware";
import { IRequest } from "@src/interfaces/common";
import { UserNotFoundError } from "@src/utils/error/UserNotFoundError";
import { getSearchHistory, searchSong } from "@src/controllers/searchSong.controller";

const searchSongRouter = Router();

searchSongRouter.get("/", setAuthUser, async (req: IRequest, res: Response): Promise<GeneralResponse> => {
    try {
        if (!req.user) return res.status(404).json(new UserNotFoundError().json());

        const result = await searchSong((req.query.q as string) || " ", req.user.id);
        return res.json(formatResponse(result));
    } catch (error) {
        return handleError(res, error);
    }
});

searchSongRouter.get("/history", setAuthUser, async (req: IRequest, res: Response): Promise<GeneralResponse> => {
    try {
        if (!req.user) return res.status(404).json(new UserNotFoundError().json());
        const result = await getSearchHistory(req.user.id);
        return res.json(formatResponse(result));
    } catch (error) {
        return handleError(res, error);
    }
});

export { searchSongRouter };
