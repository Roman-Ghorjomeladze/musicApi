import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { IRequest } from "@src/interfaces/common";
import prisma from "@src/prisma/client";
import { HTTP_CODES } from "@src/utils/error/errorTypes";
import { EnvService } from "@src/config/EnvService";
import { UnAuthorisedError } from "@src/utils/error/UnAuthorisedError";

export const setAuthUser = async (req: IRequest, res: Response, next: NextFunction) => {
    const JWT_SECRET = EnvService.getJwtSecret();
    if (!req.headers.authorization || !req.headers.authorization.includes("Bearer "))
        return res.status(401).json(new UnAuthorisedError().json());
    const [_, token] = req.headers.authorization.split(" ");
    if (!token) return res.status(401).json(new UnAuthorisedError().json());
    try {
        const payload: { id: number } = verify(token, JWT_SECRET) as { id: number };
        const user = await prisma.user.findFirst({
            where: {
                id: payload.id,
            },
        });
        if (user) {
            req.user = user;
            return next();
        }
        return res.status(HTTP_CODES.UNAUTHORISED).json(new UnAuthorisedError().json());
    } catch (error) {
        return res.status(HTTP_CODES.UNAUTHORISED).json(new UnAuthorisedError().json());
    }
};
