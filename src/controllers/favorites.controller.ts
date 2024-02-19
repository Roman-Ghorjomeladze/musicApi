import { FavoriteSongs } from "@prisma/client";
import prisma from "@src/prisma/client";
import { CreateFavoriteRequest, UpdateFavoriteRequest } from "@src/interfaces/favorites/request";
import { FavoriteNotFoundError } from "@src/utils/error/FavoriteNotFoundError";
import { findSongById } from "./searchSong.controller";

export const getFavorites = async () => {
    const favorites = await prisma.favoriteSongs.findMany();
    return favorites;
};

export const getFavoriteById = async (id: number): Promise<FavoriteSongs> => {
    const favorite = await prisma.favoriteSongs.findFirst({ where: { id } });
    if (!favorite) throw new FavoriteNotFoundError(id);
    return favorite;
};

export const createFavorite = async (body: CreateFavoriteRequest, userId: number): Promise<FavoriteSongs> => {
    const songAlreadyFavorite = await prisma.favoriteSongs.findFirst({ where: { userId, deezerId: body.id } });
    if (songAlreadyFavorite) return songAlreadyFavorite;
    const song = await findSongById(body.id);
    if (!song) throw new FavoriteNotFoundError(body.id);

    const created = await prisma.favoriteSongs.create({
        data: {
            name: song.title,
            deezerId: song.id,
            userId: userId,
            preview: song.preview,
            album: song.album,
            artist: song.artist,
            link: song.link,
        },
    });
    return created;
};

export const updateFavorite = async (
    id: number,
    userId: number,
    body: UpdateFavoriteRequest
): Promise<FavoriteSongs> => {
    const favorite = await prisma.favoriteSongs.findFirst({ where: { id, userId } });
    if (!favorite) throw new FavoriteNotFoundError(id);
    const updated = await prisma.favoriteSongs.update({
        data: {
            album: {
                id: body.album.id,
                image: body.album.image,
                title: body.album.title
            },
            artist: {
                id: body.artist.id,
                image: body.artist.image,
                name: body.artist.name
            },
            link: body.link,
            name: body.name,
            preview: body.preview,
        },
        where: {
            id,
        },
    });
    return updated;
};

export const deleteFavorite = async (id: number, userId: number): Promise<FavoriteSongs> => {
    const favorite = await prisma.favoriteSongs.findFirst({ where: { id, userId } });
    if (!favorite) throw new FavoriteNotFoundError(id);
    const deleted = await prisma.favoriteSongs.delete({ where: { id } });
    return deleted;
};
