import { MockBreezSong, MockSearchDeezerApiResponse, MockSearchApiSong, MockSearchHistoryRecord } from "../mocks/searchSong/searchSong";
import { findSongById, searchSong, transform, createSearchHistoryRecord } from "@src/controllers/searchSong.controller";
import axios from "axios";
import { SongNotFoundError } from "@src/utils/error/SongNotFoundError";
import prisma from "@src/prisma/client";
import { SearchHistory } from "@prisma/client";

beforeEach(() => {
	jest.restoreAllMocks();
})

describe("searchSong", () => {
	jest.spyOn(prisma.searchHistory, 'findFirst').mockResolvedValue({} as SearchHistory)
	jest.spyOn(prisma.searchHistory, 'update').mockResolvedValue({} as SearchHistory)
	jest.spyOn(prisma.searchHistory, 'create').mockResolvedValue({} as SearchHistory)
	it(`Should return songs`, async () => {
		jest.spyOn(axios, "get").mockResolvedValue({ data: MockSearchDeezerApiResponse });
		const search = await searchSong(' ', 1);
		expect(search).toEqual([MockSearchApiSong]);
	});
	it(`Should return empty array when api returns nothing`, async () => {
		jest.spyOn(axios, "get").mockResolvedValue({ data: [] });
		const search = await searchSong(' ', 1);
		expect(search).toEqual([]);
	});
});

describe("findSongById", () => {
	it(`Should return song if it exists`, async () => {
		jest.spyOn(axios, "get").mockResolvedValue({ data: MockBreezSong });
		const song = await findSongById(1);
		expect(song).toEqual(MockSearchApiSong);
	});
	it(`Should throw error if song with id doesn't exist`, async () => {
		jest.spyOn(axios, "get").mockResolvedValue({ data: { error: { msg: "error" } } });
		expect(findSongById(1)).rejects.toThrow(SongNotFoundError);
	});
});

describe('createSearchHistoryRecord', () => {
	it(`Should create search hostory of user`, async () => {
		jest.spyOn(prisma.searchHistory, 'findFirst').mockResolvedValue(MockSearchHistoryRecord);
		jest.spyOn(prisma.searchHistory, 'update').mockResolvedValue(MockSearchHistoryRecord);
		jest.spyOn(prisma.searchHistory, 'create').mockResolvedValue(MockSearchHistoryRecord);
		const search = await createSearchHistoryRecord('?q=hello', 1);
		expect(search).toBe(MockSearchHistoryRecord);
	})
})

describe("transform", () => {
  it(`Should transform dreezer song into api song shape`, async () => {
    const transformed = transform([MockBreezSong]);
    expect(transformed).toEqual([MockSearchApiSong]);
  });
});
