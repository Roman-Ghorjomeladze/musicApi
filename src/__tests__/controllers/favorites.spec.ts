import prisma from "@src/prisma/client";
import { MockFavoriteSong, MockUpdateFavoriteReqeust } from "../mocks/favorites/favorite";
import {
	createFavorite,
	deleteFavorite,
	getFavoriteById,
	getFavorites,
	updateFavorite,
} from "@src/controllers/favorites.controller";
import { MockSearchApiSong } from "../mocks/searchSong/searchSong";
import { FavoriteNotFoundError } from "@src/utils/error/FavoriteNotFoundError";
import * as searchSongController from "@src/controllers/searchSong.controller";

describe("getFavorites", () => {
	it(`Should return favorite songs`, async () => {
		const spy = jest.spyOn(prisma.favoriteSongs, "findMany").mockResolvedValue([MockFavoriteSong]);
		const favorites = await getFavorites();
		expect(favorites).toEqual([MockFavoriteSong]);
		spy.mockRestore();
	});
});

describe("getFavoriteById", () => {
	it(`Should return favorite if favorite song with id exists`, async () => {
		const spy = jest.spyOn(prisma.favoriteSongs, "findFirst").mockResolvedValue(MockFavoriteSong);
		const favorite = await getFavoriteById(1);
		expect(favorite).toEqual(MockFavoriteSong);
		spy.mockRestore();
	});
	it(`Should throw error if favorite with id doesn't exist`, async () => {
		const spy = jest.spyOn(prisma.favoriteSongs, "findFirst").mockResolvedValue(null);

		expect(getFavoriteById(1)).rejects.toThrow(FavoriteNotFoundError);
		spy.mockRestore();
	});
});

describe("createFavorite", () => {
	it(`Should'n create new favorite if it already exists`, async () => {
		const spy = jest.spyOn(prisma.favoriteSongs, "findFirst").mockResolvedValue(MockFavoriteSong);
		const songSpy = jest.spyOn(searchSongController, "findSongById").mockResolvedValue(MockSearchApiSong);
		const favorite = await createFavorite({ id: 112233 }, 1);
		expect(favorite).toEqual(MockFavoriteSong);
		spy.mockRestore();
	});
	it(`Should create favorite song and return`, async () => {
		const spy = jest.spyOn(prisma.favoriteSongs, "create").mockResolvedValue(MockFavoriteSong);
		const favorite = await createFavorite({ id: 112233 }, 1);
		expect(favorite).toEqual(MockFavoriteSong);
		spy.mockRestore();
	});
});

describe("updateFavorite", () => {
	it(`Should update favorite if favorite with id exists`, async () => {
		const findSpy = jest.spyOn(prisma.favoriteSongs, "findFirst").mockResolvedValue(MockFavoriteSong);
		const updateSpy = jest.spyOn(prisma.favoriteSongs, "update").mockResolvedValue(MockFavoriteSong);
		const song = await updateFavorite(1, 1, MockUpdateFavoriteReqeust);
		expect(song).toEqual(MockFavoriteSong);
		findSpy.mockRestore();
		updateSpy.mockRestore();
	});
	it(`Should throw error if favorite song with id doesn't exist`, async () => {
		const spy = jest.spyOn(prisma.favoriteSongs, "findFirst").mockResolvedValue(null);

		expect(updateFavorite(1, 1, MockUpdateFavoriteReqeust)).rejects.toThrow(FavoriteNotFoundError);
		spy.mockRestore();
	});
});

describe("deleteFavorite", () => {
  it(`Should delete favorite if it exists`, async () => {
    const findSpy = jest
      .spyOn(prisma.favoriteSongs, "findFirst")
      .mockResolvedValue(MockFavoriteSong);
    const deleteSpy = jest
      .spyOn(prisma.favoriteSongs, "delete")
      .mockResolvedValue(MockFavoriteSong);
    
    const favorite = await deleteFavorite(1, 1);
    expect(favorite).toEqual(MockFavoriteSong);
    findSpy.mockRestore();
    deleteSpy.mockRestore();
  });
  it(`Should throw error if favorite with id doesn't exist`, async () => {
    const spy = jest.spyOn(prisma.favoriteSongs, "findFirst").mockResolvedValue(null);

    expect(deleteFavorite(1, 1)).rejects.toThrow(FavoriteNotFoundError);
    spy.mockRestore();
  });
});
