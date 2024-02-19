import { FavoriteSongs } from "@prisma/client";

export const MockFavoriteSong: FavoriteSongs = {
	id: 1,
	userId: 1,
	deezerId: 1711664847,
	name: "Gulo1234",
	link: "https://www.deezer.com/track/1711664847",
	preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
	artist: {
		id: 7497812,
		name: "Hogh2345",
		image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
	},
	album: {
		id: 309055877,
		image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
		title: "Gulo122311231133343434",
	},
};

export const MockUpdateFavoriteReqeust = {
	name: "Gulo1234",
	link: "https://www.deezer.com/track/1711664847",
	preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
	artist: {
		id: 7497812,
		name: "Hogh2345",
		image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
	},
	album: {
		id: 309055877,
		image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
		title: "fasadfsa",
	},
};

export const MockGetFavoritesResponse = {
	data: [
		{
			id: 1,
			userId: 1,
			deezerId: 1711664847,
			name: "Gulo1234",
			link: "https://www.deezer.com/track/1711664847",
			preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
			artist: {
				id: 7497812,
				name: "Hogh2345",
				image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
			},
			album: {
				id: 309055877,
				image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
				title: "Gulo122311231133343434",
			},
		},
	],
	ok: true,
};

export const MockGetFavoriteByIdResponse = {
	data: {
		id: 1,
		userId: 1,
		deezerId: 1711664847,
		name: "Gulo1234",
		link: "https://www.deezer.com/track/1711664847",
		preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
		artist: {
			id: 7497812,
			name: "Hogh2345",
			image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
		},
		album: {
			id: 309055877,
			image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
			title: "Gulo122311231133343434",
		},
	},
	ok: true,
};

export const MockFavoriteNotFoundResponse = {
	data: null,
	ok: false,
	errors: {
		message: "Favorite with id 1 not found!",
		all: ["Favorite with id 1 not found!"],
	},
};

export const MockCreateFavoriteResponse = {
	data: {
		id: 1,
		userId: 1,
		deezerId: 1711664847,
		name: "Gulo1234",
		link: "https://www.deezer.com/track/1711664847",
		preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
		artist: {
			id: 7497812,
			name: "Hogh2345",
			image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
		},
		album: {
			id: 309055877,
			image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
			title: "Gulo122311231133343434",
		},
	},
	ok: true,
};

const NameNotSet = {
	body: {
		link: "https://www.deezer.com/track/1711664847",
		preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
		artist: {
			id: 7497812,
			name: "Hogh2345",
			image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
		},
		album: {
			id: 309055877,
			image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
			title: "fasadfsa",
		},
	},
	scenario: "Name not set",
};

const LinkNotSet = {
	body: {
		name: "Gulo",
		preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
		artist: {
			id: 7497812,
			name: "Hogh2345",
			image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
		},
		album: {
			id: 309055877,
			image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
			title: "fasadfsa",
		},
	},
	scenario: "Link Not Set",
};

const PreviewNotSet = {
	body: {
		name: "Gulo",
		link: "https://www.deezer.com/track/1711664847",
		artist: {
			id: 7497812,
			name: "Hogh2345",
			image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
		},
		album: {
			id: 309055877,
			image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
			title: "fasadfsa",
		},
	},
	scenario: "Preview Not Set",
};

const ArtistNotSet = {
	body: {
		name: "Gulo",
		link: "https://www.deezer.com/track/1711664847",
		preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
		album: {
			id: 309055877,
			image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
			title: "fasadfsa",
		},
	},
	scenario: "Artist Not Set",
};

const ArtistIdNotSet = {
	body: {
		name: "Gulo",
		link: "https://www.deezer.com/track/1711664847",
		preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
		artist: {
			name: "Hogh2345",
			image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
		},
		album: {
			id: 309055877,
			image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
			title: "fasadfsa",
		},
	},
	scenario: "Artist Id Not Set",
};

const ArtistNameNotSet = {
	body: {
		name: "Gulo",
		link: "https://www.deezer.com/track/1711664847",
		preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
		artist: {
			id: 7497812,
			image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
		},
		album: {
			id: 309055877,
			image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
			title: "fasadfsa",
		},
	},
	scenario: "Artist Name Not Set",
};

const ArtistImageNotSet = {
	body: {
		name: "Gulo",
		link: "https://www.deezer.com/track/1711664847",
		preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
		artist: {
			id: 7497812,
			name: "Hogh2345",
		},
		album: {
			id: 309055877,
			image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
			title: "fasadfsa",
		},
	},
	scenario: "Artist Image Not Set",
};

const AlbumNotSet = {
	body: {
		name: "Gulo",
		link: "https://www.deezer.com/track/1711664847",
		preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
		artist: {
			id: 7497812,
			name: "Hogh2345",
			image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
		},
	},
	scenario: "Album Not Set",
};

const AlbumIdNotSet = {
	body: {
		name: "Gulo",
		link: "https://www.deezer.com/track/1711664847",
		preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
		artist: {
			id: 7497812,
			name: "Hogh2345",
			image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
		},
		album: {
			image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
			title: "fasadfsa",
		},
	},
	scenario: "Album Id Not Set",
};

const AlbumImageNotSet = {
	body: {
		name: "Gulo",
		link: "https://www.deezer.com/track/1711664847",
		preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
		artist: {
			id: 7497812,
			name: "Hogh2345",
			image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
		},
		album: {
			id: 309055877,
			title: "fasadfsa",
		},
	},
	scenario: "Album Image Not Set",
};

const AlbumTitleNotSet = {
	body: {
		name: "Gulo",
		link: "https://www.deezer.com/track/1711664847",
		preview: "https://cdns-preview-6.dzcdn.net/stream/c-6f8dacff9fa3a50874ed6cb1872b9720-3.mp3",
		artist: {
			id: 7497812,
			name: "Hogh2345",
			image: "https://e-cdns-images.dzcdn.net/images/artist/699889ff47f89a24a01cd2005e0a6657/1000x1000-000000-80-0-0.jpg",
		},
		album: {
			id: 309055877,
			image: "https://e-cdns-images.dzcdn.net/images/cover/c702a8186afe5c127199f246ffd94c82/1000x1000-000000-80-0-0.jpg",
		},
	},
	scenario: "Album Title Not Set",
};

export const InvalidUpdateFavoriteScenarios = [
	NameNotSet,
	LinkNotSet,
	PreviewNotSet,
	ArtistNotSet,
	ArtistIdNotSet,
	ArtistNameNotSet,
	ArtistImageNotSet,
	AlbumNotSet,
	AlbumIdNotSet,
	AlbumImageNotSet,
	AlbumTitleNotSet,
]