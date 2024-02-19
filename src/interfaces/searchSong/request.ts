export type DeezerTrack = {
  id: number,
  title: string,
  link: string,
  preview: string,
  artist: {
     id: number,
     name: string,
     picture_xl: string,
  },
  album: {
      id: number,
      title: string,
      cover_xl: string,
  }
}

export interface SearchApiSong {
  id: number;
  title: string;
  link: string;
  preview: string;
  artist: {
    id: number,
    name: string,
    image: string
  };
  album: {
    id: number,
    title: string,
    image: string
  };
}