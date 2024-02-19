import { hash, compare } from "bcryptjs";
import { User } from "@prisma/client";

import { LogInUserRequest, SignUpUserRequest } from "@src/interfaces/auth/request";
import prisma from "@src/prisma/client";
import { BadRequestError } from "@src/utils/error/BadRequestError";
import { NotFoundError } from "@src/utils/error/NotFoundError";


export const createUser = async (body: SignUpUserRequest): Promise<User> => {
    const user = await prisma.user.findFirst({where: {username: body.username}})
    if (user) throw new BadRequestError('Username is taken!')
    const hashedPassword = await hash(body.password, 12);
    const created = await prisma.user.create({
        data: {
            username: body.username,
            password: hashedPassword,
            name: body.name,
        },
    });
    return created;
};

export const findUserByUsernameAndPassword = async (body: LogInUserRequest): Promise<User> => {
    const user = await prisma.user.findFirst({ where: { username: body.username } });
    const notFoundError = new NotFoundError("User with such credentials doesn't exist");
    if (!user) throw notFoundError;
    const passwordMatches = await compare(body.password, user?.password);
    if (!passwordMatches) throw notFoundError;
    return user;
};
