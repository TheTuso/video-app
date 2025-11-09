const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const api = {
	v3: {
		videos: (id: string) =>
			buildUrl('/videos', { part: 'snippet,statistics', id }),
		search: (query: string, order: 'date' | 'viewCount', page?: string) =>
			buildUrl('/search', {
				part: 'snippet',
				type: 'video',
				order,
				q: query,
				pageToken: page,
			}),
	},
};

export async function searchVideos(
	query: string,
	order: 'date' | 'viewCount',
	page?: string,
) {
	const response = await fetch(api.v3.search(query, order, page));
	if (!response.ok) throw new Error('Failed to fetch videos');
	return response.json();
}

export async function getVideoDetails(id: string) {
	const response = await fetch(api.v3.videos(id));
	if (!response.ok) throw new Error('Failed to fetch video details');
	return response.json();
}

function buildUrl(
	path: string,
	params: Record<string, string | undefined> = {},
) {
	if (!API_URL || !API_KEY) {
		throw new Error('API_URL or API_KEY is not defined');
	}

	const url = new URL(path, API_URL);
	const search = new URLSearchParams();

	Object.entries(params).forEach(([k, v]) => {
		if (v !== undefined && v !== '') search.set(k, v);
	});

	// Always include the key param
	search.set('key', API_KEY);

	url.search = search.toString();
	return url.toString();
}
