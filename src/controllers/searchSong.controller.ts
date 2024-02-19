import { EnvService } from "@src/config/EnvService";
import { DeezerTrack, SearchApiSong } from "@src/interfaces/searchSong/request";
import prisma from "@src/prisma/client";
import { SongNotFoundError } from "@src/utils/error/SongNotFoundError";
import axios from "axios";

const URL = EnvService.getSearchMusicUrl();

export const createSearchHistoryRecord = async (query: string, userId: number) => {
	let search = await prisma.searchHistory.findFirst({ where: { search: query } });
	if (search) {
		search = await prisma.searchHistory.update({ data: { count: search.count + 1 }, where: { id: search.id } });
	} else {
		search = await prisma.searchHistory.create({
			data: {
				search: query,
				userId,
				count: 1,
			},
		});
	}
	return search;
};

export const getSearchHistory = async (userId: number) => {
	const searches = await prisma.searchHistory.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
	return searches;
};

export const searchSong = async (queryString: string = " ", userId: number) => {
	const params = new URLSearchParams();
	params.append("q", queryString);
	const res = await axios.get(`${URL}/search/track`, { params });
	const transformed = transform(res.data?.data || []);
	createSearchHistoryRecord(params.toString(), userId);
	return transformed;
};

export const findSongById = async (id: number) => {
	const res = await axios.get(`${URL}/track/${id}`);
	if (res.data.error) throw new SongNotFoundError(id);
	return res.data ? transformOne(res.data) : null;
};

export const transform = (data: DeezerTrack[]) => {
	return data.map((item) => transformOne(item));
};

const transformOne = (track: DeezerTrack): SearchApiSong => {
	return {
		id: track.id,
		title: track.title,
		link: track.link,
		preview: track.preview,
		artist: {
			id: track.artist.id,
			name: track.artist.name,
			image: track.artist.picture_xl,
		},
		album: {
			id: track.album.id,
			title: track.album.title,
			image: track.album.cover_xl,
		},
	};
};
