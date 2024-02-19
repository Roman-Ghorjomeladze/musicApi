import prisma from "@src/prisma/client";
import bcryptjs from "bcryptjs";

import { MockUser } from "../mocks/user";
import { createUser, findUserByUsernameAndPassword } from "@src/controllers/auth.controller";
import { MockSignUpRequestBody, MockLoginRequestBody } from "../mocks/auth/request";
import { BadRequestError } from "@src/utils/error/BadRequestError";
import { NotFoundError } from "@src/utils/error/NotFoundError";

describe("createUser", () => {
	it(`Should create user and return when unique username is passed`, async () => {
		const createSpy = jest.spyOn(prisma.user, "create").mockResolvedValue(MockUser);
		const findSpy = jest.spyOn(prisma.user, "findFirst").mockResolvedValue(null);
		const result = await createUser(MockSignUpRequestBody);
		expect(result).toBe(MockUser);
		createSpy.mockRestore();
		findSpy.mockRestore();
	});

	it(`Should throw error if user with similar username exists`, async () => {
		const createSpy = jest.spyOn(prisma.user, "create").mockResolvedValue(MockUser);
		const findSpy = jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		expect(createUser(MockSignUpRequestBody)).rejects.toThrow(BadRequestError);
		createSpy.mockRestore();
		findSpy.mockRestore();
	});
});

describe("findUserByUsernameAndPassword", () => {
	it(`Should find user with valid username and password`, async () => {
		const spy = jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		const bcryptSpy = jest.spyOn(bcryptjs, "compare") as jest.Mock;
		bcryptSpy.mockResolvedValue(true);
		const user = await findUserByUsernameAndPassword(MockLoginRequestBody);
		expect(user).toBe(MockUser);
		spy.mockRestore();
		bcryptSpy.mockRestore();
	});

	it(`Should throw not found error if username is incorrect`, async () => {
		const spy = jest.spyOn(prisma.user, "findFirst").mockResolvedValue(null);
		const bcryptSpy = jest.spyOn(bcryptjs, "compare") as jest.Mock;
		bcryptSpy.mockResolvedValue(true);
		expect(findUserByUsernameAndPassword(MockLoginRequestBody)).rejects.toThrow(NotFoundError);
		spy.mockRestore();
		bcryptSpy.mockRestore();
	});

	it(`Should throw not found error if password doesn't match`, async () => {
		const spy = jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		const bcryptSpy = jest.spyOn(bcryptjs, "compare") as jest.Mock;
		bcryptSpy.mockResolvedValue(false);
		expect(findUserByUsernameAndPassword(MockLoginRequestBody)).rejects.toThrow(NotFoundError);
		spy.mockRestore();
		bcryptSpy.mockRestore();
	});
});
