import { Request, Response, Router } from "express";
import { sign } from "jsonwebtoken";

import { GeneralResponse } from "@src/interfaces/httpResponseTypes";
import { handleError } from "@src/utils/error/handler";
import { formatResponse } from "@src/utils/responseFormatter";
import { createUser, findUserByUsernameAndPassword } from "@src/controllers/auth.controller";
import { UserRegisteredResponse } from "@src/utils/constants/response";
import { EnvService } from "@src/config/EnvService";
import { validateLoginUser } from "@src/validation/userLoginValidation";
import { validateSignUpUser } from "@src/validation/userSignUpValidation";

const authRouter = Router();

authRouter.post("/login", validateLoginUser, async (req: Request, res: Response): Promise<GeneralResponse> => {
	try {
		const JWT_SECRET = EnvService.getJwtSecret();
		const user = await findUserByUsernameAndPassword(req.body);
		const accessToken = sign({ id: user.id }, JWT_SECRET);
		return res.status(200).json(formatResponse({ user, accessToken }));
	} catch (error) {
		return handleError(res, error);
	}
});

authRouter.post("/signup", validateSignUpUser, async (req: Request, res: Response): Promise<GeneralResponse> => {
	try {
		await createUser(req.body);
		return res.status(201).json(formatResponse(UserRegisteredResponse));
	} catch (error) {
		return handleError(res, error);
	}
});

export { authRouter };
