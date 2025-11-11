import type { SortOption } from '@/types/videos';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

/**
 * Builds a YouTube API URL with query parameters.
 * Automatically appends the API key to all requests.
 *
 * @param path - The API endpoint path (e.g., '/videos', '/search')
 * @param params - Query parameters to include in the URL (empty/undefined values are omitted)
 * @returns The complete URL string with query parameters
 * @throws {Error} If API_URL or API_KEY environment variables are not defined
 */
function buildUrl(
	path: string,
	params: Record<string, string | undefined> = {},
) {
	if (!API_URL || !API_KEY) {
		throw new Error('API_URL or API_KEY is not defined');
	}

	// Append path to API_URL preserving the base path
	const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
	const cleanPath = path.startsWith('/') ? path : `/${path}`;
	const url = new URL(`${baseUrl}${cleanPath}`);
	const search = new URLSearchParams();

	Object.entries(params).forEach(([k, v]) => {
		if (v !== undefined && v !== '') search.set(k, v);
	});

	// Always include the key param
	search.set('key', API_KEY);

	url.search = search.toString();
	return url.toString();
}

const api = {
	v3: {
		videos: (id: string) =>
			buildUrl('/videos', { part: 'snippet,statistics', id }),
		search: (query: string, order: SortOption, page?: string) =>
			buildUrl('/search', {
				part: 'snippet',
				type: 'video',
				videoCategoryId: '28', // 28 is a Science & Technology category for the PL region
				order,
				q: query,
				pageToken: page,
			}),
	},
};

/**
 * Searches for videos on YouTube using the YouTube Data API v3.
 * Results are filtered to the Science & Technology category (ID: 28).
 *
 * @param query - The search query string
 * @param order - Sort order for results (e.g., 'viewCount', 'date', 'rating')
 * @param page - Optional page token for pagination (obtained from previous response's nextPageToken)
 * @returns A promise resolving to the YouTube API search response with video snippets
 * @throws {Error} If the API request fails
 */
export async function searchVideos(
	query: string,
	order: SortOption,
	page?: string,
) {
	const response = await fetch(api.v3.search(query, order, page));
	if (!response.ok) throw new Error('Failed to fetch videos');
	return response.json();
}

/**
 * Fetches detailed information for a specific video by ID.
 * Includes video snippet (title, description, thumbnails) and statistics (views, likes).
 *
 * @param id - The YouTube video ID
 * @returns A promise resolving to the YouTube API video details response
 * @throws {Error} If the API request fails
 */
export async function getVideoDetails(id: string) {
	const response = await fetch(api.v3.videos(id));
	if (!response.ok) throw new Error('Failed to fetch video details');
	return response.json();
}
