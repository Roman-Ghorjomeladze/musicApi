import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { app } from "@src/app";
import * as authController from "@src/controllers/auth.controller";
import { MockUser } from "../mocks/user";
import { MockLoginResponse, MockLoginRequestBody, MockSignUpRequestBody } from "../mocks/auth/request";
import prisma from "@src/prisma/client";

beforeEach(() => {
	jest.restoreAllMocks();
});

describe("POST /auth/login", () => {
	it("Should authorise user with correct credentials", async () => {
		jest.spyOn(authController, "findUserByUsernameAndPassword").mockResolvedValue(MockUser);
		(jest.spyOn(jwt, "sign") as jest.Mock).mockReturnValue("access_token");
		const res = await request(app).post("/auth/login").send(MockLoginRequestBody);
		expect(res.status).toBe(200);
		expect(res.body).toEqual(MockLoginResponse);
	});

	it(`Should return 404 not found if user doesn't exists`, async () => {
		jest.spyOn(prisma.user, "findFirst").mockResolvedValue(null);
		(jest.spyOn(jwt, "sign") as jest.Mock).mockReturnValue("access_token");
		const res = await request(app).post("/auth/login").send(MockLoginRequestBody);
		expect(res.status).toBe(404);
	});

	it(`Should return 404 not found if password doesn't match`, async () => {
		jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		(jest.spyOn(jwt, "sign") as jest.Mock).mockReturnValue("access_token");
		(jest.spyOn(bcrypt, "compare") as jest.Mock).mockResolvedValue(false);
		const res = await request(app).post("/auth/login").send(MockLoginRequestBody);
		expect(res.status).toBe(404);
	});

	const testBadScenario = async (body: Object) => {
        jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
        (jest.spyOn(jwt, "sign") as jest.Mock).mockReturnValue("access_token");
        (jest.spyOn(bcrypt, "compare") as jest.Mock).mockResolvedValue(false);
        const res = await request(app).post("/auth/login").send(body);
        expect(res.status).toBe(400);
    }
    it(`Should return bad request if username is missing`, async () => {
        await testBadScenario({password: 'password'})
    })

    it(`Should return bad request if password is missing`, async () => {
        await testBadScenario({username: 'username'})
    })

    it(`Should return bad request if password is invalid`, async () => {
        await testBadScenario({username: 'username', password: 123})
        await testBadScenario({username: 'username', password: 'shrt'})
        await testBadScenario({username: 'username', password: 'Too_Long_Password_Lorem_Ipsum'})
    })
});

describe('POST /auth/signup', () => {
    it("Should register user with valid credentials", async () => {
		jest.spyOn(authController, "createUser").mockResolvedValue(MockUser);
		const res = await request(app).post("/auth/signup").send(MockSignUpRequestBody);
		expect(res.status).toBe(201);
	});

	it(`Should return 400 bad request if user with such username already exists`, async () => {
		jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		jest.spyOn(prisma.user, "create").mockResolvedValue(MockUser);
		(jest.spyOn(jwt, "sign") as jest.Mock).mockReturnValue("access_token");
		const res = await request(app).post("/auth/signup").send(MockLoginRequestBody);
		expect(res.status).toBe(400);
	});

    const testBadScenario = async (body: Object) => {
        jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
        (jest.spyOn(jwt, "sign") as jest.Mock).mockReturnValue("access_token");
        (jest.spyOn(bcrypt, "compare") as jest.Mock).mockResolvedValue(false);
        const res = await request(app).post("/auth/signup").send(body);
        expect(res.status).toBe(400);
    }
    it(`Should return bad request if name is missing`, async () => {
        await testBadScenario({password: 'password', username: 'username'})
    })

    it(`Should return bad request if username is missing`, async () => {
        await testBadScenario({password: 'password', name: 'name'})
    })

    it(`Should return bad request if password is missing`, async () => {
        await testBadScenario({username: 'username', name: 'name'})
    })

    it(`Should return bad request if body is empty`, async () => {
        await testBadScenario({})
    })
})