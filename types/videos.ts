export interface Thumbnail {
	url: string;
	width: number;
	height: number;
}

interface Snippet {
	publishedAt: string; // ISO
	channelId: string;
	channelTitle: string;
	title: string;
	description: string;
	thumbnails: {
		default: Thumbnail;
		medium: Thumbnail;
		high: Thumbnail;
	};
}

interface Statistics {
	viewCount: string;
	likeCount: string;
}

export interface SnippetWithId extends Snippet {
	id: string;
}

export interface VideoDetails {
	id: string;
	// In video response, title and description are in the localized field, so we are moving them
	snippet: Omit<Snippet, 'title' | 'description'> & {
		localized: {
			title: string;
			description: string;
		};
	};
	statistics: Statistics;
}

export interface SearchVideosResponse {
	kind: string;
	etag: string;
	nextPageToken?: string;
	regionCode: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
	items: {
		kind: string;
		etag: string;
		id: {
			kind: string;
			videoId: string;
		};
		snippet: Snippet;
	}[];
}

export interface VideoDetailsResponse {
	kind: string;
	etag: string;
	items: VideoDetails[];
}

export type SortOption = 'date' | 'viewCount' | 'relevance';
