export interface CreateFavoriteRequest {
  id: number,
}

export interface UpdateFavoriteRequest {
  name: string,
  link: string,
  preview: string,
  artist: {
    id: number,
    name: string,
    image: string
  }
  album: {
    id: number,
    title: string,
    image: string
  }
}