/**
 * YouTube video thumbnail data.
 * Contains URL and dimensions for a single thumbnail size.
 */
export interface Thumbnail {
	/** Direct URL to the thumbnail image */
	url: string;
	/** Thumbnail width in pixels */
	width: number;
	/** Thumbnail height in pixels */
	height: number;
}

/**
 * Core video metadata from YouTube API.
 * Contains basic information about a video including title, description, and thumbnails.
 */
interface Snippet {
	/** ISO 8601 date string of when the video was published */
	publishedAt: string; // ISO
	/** Unique identifier for the channel that uploaded the video */
	channelId: string;
	/** Display name of the channel/creator */
	channelTitle: string;
	/** Video title */
	title: string;
	/** Full video description */
	description: string;
	/** Available thumbnail images in multiple sizes */
	thumbnails: {
		/** Default size thumbnail (typically 120x90) */
		default: Thumbnail;
		/** Medium size thumbnail (typically 320x180) */
		medium: Thumbnail;
		/** High quality thumbnail (typically 480x360) */
		high: Thumbnail;
	};
}

/**
 * Video statistics from YouTube API.
 * Contains engagement metrics like views and likes.
 * Note: All values are strings as returned by the YouTube API.
 */
interface Statistics {
	/** Total number of views (as string) */
	viewCount: string;
	/** Total number of likes (as string) */
	likeCount: string;
}

/**
 * Video snippet with an associated ID.
 * Used for search results where the ID is separate from the snippet data.
 */
export interface SnippetWithId extends Snippet {
	/** YouTube video ID */
	id: string;
}

/**
 * Detailed video information from YouTube API videos endpoint.
 * Includes snippet data with localized title/description and statistics.
 */
export interface VideoDetails {
	/** YouTube video ID */
	id: string;
	/**
	 * Video snippet with localized title and description.
	 * In the videos endpoint, title and description are in the localized field,
	 * so we omit them from the base snippet and add the localized field.
	 */
	snippet: Omit<Snippet, 'title' | 'description'> & {
		/** Localized video metadata in the requested language */
		localized: {
			/** Video title in the requested language */
			title: string;
			/** Video description in the requested language */
			description: string;
		};
	};
	/** Video engagement statistics (views, likes) */
	statistics: Statistics;
}

/**
 * Response from YouTube Data API v3 search endpoint.
 * Contains a paginated list of video search results.
 */
export interface SearchVideosResponse {
	/** Resource type identifier (e.g., 'youtube#searchListResponse') */
	kind: string;
	/** ETag for cache validation */
	etag: string;
	/** Token for fetching the next page of results (undefined on last page) */
	nextPageToken?: string;
	/** Two-letter country code for region-specific results */
	regionCode: string;
	/** Pagination metadata */
	pageInfo: {
		/** Total number of results available */
		totalResults: number;
		/** Number of results in this page */
		resultsPerPage: number;
	};
	/** Array of video search results */
	items: {
		/** Resource type (e.g., 'youtube#searchResult') */
		kind: string;
		/** ETag for this specific item */
		etag: string;
		/** Video identifier object */
		id: {
			/** Resource kind (e.g., 'youtube#video') */
			kind: string;
			/** YouTube video ID */
			videoId: string;
		};
		/** Video metadata */
		snippet: Snippet;
	}[];
}

/**
 * Response from YouTube Data API v3 videos endpoint.
 * Contains detailed information about one or more videos.
 */
export interface VideoDetailsResponse {
	/** Resource type identifier (e.g., 'youtube#videoListResponse') */
	kind: string;
	/** ETag for cache validation */
	etag: string;
	/** Array of video details (typically contains one item when fetching by ID) */
	items: VideoDetails[];
}

/**
 * Sort order options for YouTube search results.
 * Determines how videos are ordered in search responses.
 */
export type SortOption = 'date' | 'viewCount' | 'relevance';
