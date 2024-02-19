export const MockBreezSong = {
	id: 138545995,
	readable: true,
	title: "Hello",
	title_short: "Hello",
	title_version: "",
	link: "https://www.deezer.com/track/138545995",
	duration: 295,
	rank: 887451,
	explicit_lyrics: false,
	explicit_content_lyrics: 0,
	explicit_content_cover: 0,
	preview: "https://cdns-preview-c.dzcdn.net/stream/c-cf968741c42b47400aca81b6da437a03-3.mp3",
	md5_image: "eaeadce7932a97533fe495881d2fcd7a",
	artist: {
		id: 75798,
		name: "Adele",
		link: "https://www.deezer.com/artist/75798",
		picture: "https://api.deezer.com/artist/75798/image",
		picture_small:
			"https://e-cdns-images.dzcdn.net/images/artist/e5fc443d2abc03b487234ba4de65a001/56x56-000000-80-0-0.jpg",
		picture_medium:
			"https://e-cdns-images.dzcdn.net/images/artist/e5fc443d2abc03b487234ba4de65a001/250x250-000000-80-0-0.jpg",
		picture_big:
			"https://e-cdns-images.dzcdn.net/images/artist/e5fc443d2abc03b487234ba4de65a001/500x500-000000-80-0-0.jpg",
		picture_xl:
			"https://e-cdns-images.dzcdn.net/images/artist/e5fc443d2abc03b487234ba4de65a001/1000x1000-000000-80-0-0.jpg",
		tracklist: "https://api.deezer.com/artist/75798/top?limit=50",
		type: "artist",
	},
	album: {
		id: 14880539,
		title: "25",
		cover: "https://api.deezer.com/album/14880539/image",
		cover_small:
			"https://e-cdns-images.dzcdn.net/images/cover/eaeadce7932a97533fe495881d2fcd7a/56x56-000000-80-0-0.jpg",
		cover_medium:
			"https://e-cdns-images.dzcdn.net/images/cover/eaeadce7932a97533fe495881d2fcd7a/250x250-000000-80-0-0.jpg",
		cover_big:
			"https://e-cdns-images.dzcdn.net/images/cover/eaeadce7932a97533fe495881d2fcd7a/500x500-000000-80-0-0.jpg",
		cover_xl:
			"https://e-cdns-images.dzcdn.net/images/cover/eaeadce7932a97533fe495881d2fcd7a/1000x1000-000000-80-0-0.jpg",
		md5_image: "eaeadce7932a97533fe495881d2fcd7a",
		tracklist: "https://api.deezer.com/album/14880539/tracks",
		type: "album",
	},
	type: "track",
};

export const MockSearchDeezerApiResponse = {
	data: [MockBreezSong],
};

export const MockSearchApiSong = {
	id: 138545995,
	title: "Hello",
	link: "https://www.deezer.com/track/138545995",
	preview: "https://cdns-preview-c.dzcdn.net/stream/c-cf968741c42b47400aca81b6da437a03-3.mp3",
	artist: {
		id: 75798,
		name: "Adele",
		image: "https://e-cdns-images.dzcdn.net/images/artist/e5fc443d2abc03b487234ba4de65a001/1000x1000-000000-80-0-0.jpg",
	},
	album: {
		id: 14880539,
		title: "25",
		image: "https://e-cdns-images.dzcdn.net/images/cover/eaeadce7932a97533fe495881d2fcd7a/1000x1000-000000-80-0-0.jpg",
	},
};

export const MockSearchHistoryRecord = {
	id: 2,
	search: "q=hello",
	userId: 1,
	count: 1,
	createdAt: new Date("2024-02-18T03:10:33.026Z"),
	updatedAt: new Date("2024-02-18T03:10:33.026Z"),
};

export const MockSearchApiResponse = {
	data: [
	  {
		id: 138545995,
		title: 'Hello',
		link: 'https://www.deezer.com/track/138545995',
		preview: 'https://cdns-preview-c.dzcdn.net/stream/c-cf968741c42b47400aca81b6da437a03-3.mp3',
		artist: {
            id: 75798,
            name: 'Adele',
            image: 'https://e-cdns-images.dzcdn.net/images/artist/e5fc443d2abc03b487234ba4de65a001/1000x1000-000000-80-0-0.jpg'
          },
          album: {
            id: 14880539,
            title: '25',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/eaeadce7932a97533fe495881d2fcd7a/1000x1000-000000-80-0-0.jpg'
          }
	  }
	],
	ok: true
  }

  export const MockSearchHistoryResponse = {
	data: [
	  {
		id: 2,
		search: 'q=hello',
		userId: 1,
		count: 1,
		createdAt: '2024-02-18T03:10:33.026Z',
		updatedAt: '2024-02-18T03:10:33.026Z'
	  }
	],
	ok: true
  }