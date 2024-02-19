import request from "supertest";

import { app } from "@src/app";
import * as favoritesController from "@src/controllers/favorites.controller";
import { MockSomethingWrongResponse } from "../mocks/general";
import prisma from "@src/prisma/client";
import {
	MockFavoriteNotFoundResponse,
	MockCreateFavoriteResponse,
	MockFavoriteSong,
	MockGetFavoritesResponse,
	MockGetFavoriteByIdResponse,
	InvalidUpdateFavoriteScenarios,
	MockUpdateFavoriteReqeust,
} from "../mocks/favorites/favorite";
import { MockUser, UnauthorisedRequest } from "../mocks/user";
import jwt from "jsonwebtoken";

beforeEach(() => {
  jest.restoreAllMocks();
})

describe("GET /favorite", () => {
	// Happy path
	it(`Should return favorites and status code 200`, async () => {
		jest.spyOn(favoritesController, "getFavorites").mockResolvedValue([MockFavoriteSong]);

		const res = await request(app).get("/favorite");
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(MockGetFavoritesResponse);
	});

	// Unhappy path
	it(`Should return bad request if database layer fails`, async () => {
		const mockError = new Error("Test error message");
		jest.spyOn(favoritesController, "getFavorites").mockRejectedValue(mockError);

		const response = await request(app).get("/favorite");
		expect(response.status).toBe(500);
		expect(response.body).toEqual(MockSomethingWrongResponse);
	});
});

describe("GET /favorite/:id", () => {
	// Happy path
	it(`Should return favorite song and status code 200`, async () => {
		jest.spyOn(favoritesController, "getFavoriteById").mockResolvedValue(MockFavoriteSong);

		const res = await request(app).get("/favorite/1");
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(MockGetFavoriteByIdResponse);
	});

	// Unhappy path
	it(`Should return bad request if database layer fails`, async () => {
		const mockError = new Error("Test error message");
		jest.spyOn(favoritesController, "getFavoriteById").mockRejectedValue(mockError);

		const response = await request(app).get("/favorite/1");
		expect(response.status).toBe(500);
		expect(response.body).toEqual(MockSomethingWrongResponse);
	});
	it(`Should return 404 not found if there is no favoirte song with provided id`, async () => {
		jest.spyOn(prisma.favoriteSongs, "findFirst").mockResolvedValue(null);

		const response = await request(app).get("/favorite/1");

		expect(response.status).toBe(404);
		expect(response.body).toEqual(MockFavoriteNotFoundResponse);
	});
});

describe("POST /favorite", () => {
	// Happy path
	it(`Should create favorite if request body is valid`, async () => {
		jest.spyOn(favoritesController, "createFavorite").mockResolvedValue(MockFavoriteSong);
		jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });
		const res = await request(app).post("/favorite").set("Authorization", "Bearer token").send({ id: 1 });
		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual(MockCreateFavoriteResponse);
		
	});

	const testBadScenario = async (body: Object) => {
		jest.spyOn(favoritesController, "createFavorite").mockResolvedValue(MockFavoriteSong);
		(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });
		const res = await request(app).post("/favorite").set("Authorization", "Bearer token").send(body);
		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty("ok", false);
		expect(res.body).toHaveProperty("errors");
		expect(res.body).toHaveProperty("errors.message");
		expect(res.body).toHaveProperty("errors.all");
	
	};
	// Unhappy path
	describe(`Should throw an error if request body is invalid`, () => {
		it(`Fails when request body is empty`, async () => {
			testBadScenario({});
		});
		it(`Fails when request body has name with non string value`, async () => {
			testBadScenario({ id: null });
			testBadScenario({ id: "notNumber" });
		});

		it(`Should return user not found error if auth user doesn't exists`, async () => {
			jest.spyOn(prisma.user, "findFirst").mockResolvedValue(null);
			(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });
			const res = await request(app).post("/favorite").set("Authorization", "Bearer token").send({ id: 1 });
			expect(res.statusCode).toBe(401);
			expect(res.body).toEqual(UnauthorisedRequest);
			
		});

		it(`Should return something wrong response if database layer fails`, async () => {
			const mockError = new Error("Test error message");
			jest.spyOn(favoritesController, "createFavorite").mockRejectedValue(mockError);
			jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
			(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });

			const res = await request(app).post("/favorite").set("Authorization", "Bearer token").send({ id: 1 });
			expect(res.status).toBe(500);
			expect(res.body).toEqual(MockSomethingWrongResponse);
			
		});
	});
});

describe("PUT /favorite/id", () => {
	// Happy path
	const testBadScenario = async (body: Object) => {
		jest.spyOn(favoritesController, "updateFavorite").mockResolvedValue(MockFavoriteSong);
		jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });

		const res = await request(app).put("/favorite/id").set("Authorization", "Bearer token").send(body);
		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty("ok", false);
		expect(res.body).toHaveProperty("errors");
		expect(res.body).toHaveProperty("errors.message");
		expect(res.body).toHaveProperty("errors.all");
	
	};
	// Unhappy path
	describe.each(InvalidUpdateFavoriteScenarios)(
		`Should throw an error if request body is invalid`,
		({ body, scenario }) => {
			it(scenario, async () => {
				await testBadScenario(body);
			});
		}
	);

	describe(`Other bad scenarios`, () => {
		it(`Should return favorite not found error if favorite doesn't exists`, async () => {
			jest.spyOn(prisma.favoriteSongs, "findFirst").mockResolvedValue(null);
			jest.spyOn(prisma.favoriteSongs, "update").mockResolvedValue(MockFavoriteSong);
			jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
			(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });

			const res = await request(app)
				.put("/favorite/1")
				.set("Authorization", "Bearer token")
				.send(MockUpdateFavoriteReqeust);
			expect(res.statusCode).toBe(404);
			expect(res.body).toEqual(MockFavoriteNotFoundResponse);
			
		});

		it(`Should return user not found error if auth user isn't set`, async () => {
			jest.spyOn(prisma.user, "findFirst").mockResolvedValue(null);
			jest.spyOn(prisma.user, "findFirst").mockResolvedValue(null);
			(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });

			const res = await request(app)
				.put("/favorite/1")
				.set("Authorization", "Bearer token")
				.send(MockUpdateFavoriteReqeust);
			expect(res.statusCode).toBe(401);
			expect(res.body).toEqual(UnauthorisedRequest);
			
		});

		it(`Should return something wrong response if database layer fails`, async () => {
			const mockError = new Error("Test error message");
			jest.spyOn(favoritesController, "updateFavorite").mockRejectedValue(mockError);
			jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
			(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });
			const res = await request(app)
				.put("/favorite/id")
				.set("Authorization", "Bearer token")
				.send(MockUpdateFavoriteReqeust);
			expect(res.status).toBe(500);
			expect(res.body).toEqual(MockSomethingWrongResponse);
		});
	});
});

describe("DELETE /favorite/:id", () => {
	// Happy path
	it(`Should delete favorite with id when favorite exists`, async () => {
		jest.spyOn(favoritesController, "deleteFavorite").mockResolvedValue(MockFavoriteSong);
		jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });

		const res = await request(app).delete("/favorite/1").set("Authorization", "Bearer token");

		expect(res.statusCode).toBe(200);
	
	});

	// Unhappy path
	it(`Should return not found error when favorite doesn't exists`, async () => {
		const findSpy = jest.spyOn(prisma.favoriteSongs, "findFirst").mockResolvedValue(null);
		jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });

		const res = await request(app).delete("/favorite/1").set("Authorization", "Bearer token");
		expect(res.statusCode).toBe(404);
		expect(res.body).toEqual(MockFavoriteNotFoundResponse);
	});

	it(`Should return something wrong response if database layer fails`, async () => {
		const mockError = new Error("Test error message");
		jest.spyOn(favoritesController, "deleteFavorite").mockRejectedValue(mockError);
		jest.spyOn(prisma.user, "findFirst").mockResolvedValue(MockUser);
		(jest.spyOn(jwt, "verify") as jest.Mock).mockReturnValue({ id: 1 });
		const response = await request(app).delete("/favorite/1").set("Authorization", "Bearer token");
		expect(response.status).toBe(500);
		expect(response.body).toEqual(MockSomethingWrongResponse);
	});
});
