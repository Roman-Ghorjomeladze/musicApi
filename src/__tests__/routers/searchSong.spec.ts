import request from "supertest";
import jwt from "jsonwebtoken";
import prisma from "@src/prisma/client";

import { app } from "@src/app";
import * as searchSongController from "@src/controllers/searchSong.controller";
import { MockUser } from "../mocks/user";
import {
	MockSearchApiResponse,
	MockSearchApiSong,
	MockSearchHistoryRecord,
	MockSearchHistoryResponse,
} from "../mocks/searchSong/searchSong";

beforeEach(() => {
	jest.restoreAllMocks();
});

describe("GET /search", () => {
	it("should fetch songs from the API", async () => {
		const findFirstSpy = jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		const searchSongSpy = jest.spyOn(searchSongController, "searchSong").mockResolvedValue([MockSearchApiSong]);
		(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });
		const res = await request(app).get("/search?q=hello").set("Authorization", "Bearer token");

		expect(res.statusCode).toBe(200);
		expect(findFirstSpy).toHaveBeenCalledTimes(1);
		expect(searchSongSpy).toHaveBeenCalledWith("hello", 1);
		expect(res.body).toEqual(MockSearchApiResponse);
	});

	it("should return unauthorised response if token is invalid", async () => {
		jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		jest.spyOn(searchSongController, "searchSong").mockResolvedValue([]);
		const jwtMock = jest.spyOn(jwt, "verify") as jest.Mock;
		jwtMock.mockReturnValue(null);

		const res = await request(app).get("/search?q=hello").set("Authorization", "Bearer token");
		expect(res.statusCode).toBe(401);
	});

	it("should return unauthorised response if user not found", async () => {
		jest.spyOn(prisma.user, "findFirst").mockResolvedValue(null);
		jest.spyOn(searchSongController, "searchSong").mockResolvedValue([]);
		const jwtMock = jest.spyOn(jwt, "verify") as jest.Mock;
		jwtMock.mockReturnValue({ id: 1 });

		const res = await request(app).get("/search?q=hello").set("Authorization", "Bearer token");
		expect(res.statusCode).toBe(401);
	});

	it("should return unauthorised response if token not in request headers", async () => {
		jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		jest.spyOn(searchSongController, "searchSong").mockResolvedValue([]);
		const jwtMock = jest.spyOn(jwt, "verify") as jest.Mock;
		jwtMock.mockReturnValue({ id: 1 });

		const res = await request(app).get("/search?q=hello").set("Authorization", "Bearer");
		expect(res.statusCode).toBe(401);
	});
});

describe("GET /search/history", () => {
	it("should fetch search history", async () => {
		const findFirstSpy = jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		const historySpy = jest
			.spyOn(searchSongController, "getSearchHistory")
			.mockResolvedValue([MockSearchHistoryRecord]);
		(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });
		const res = await request(app).get("/search/history").set("Authorization", "Bearer token");

		expect(res.statusCode).toBe(200);
		expect(findFirstSpy).toHaveBeenCalledTimes(1);
		expect(historySpy).toHaveBeenCalledWith(1);
		expect(res.body).toEqual(MockSearchHistoryResponse);
	});
});
