import { useInfiniteQuery } from '@tanstack/react-query';
import { searchVideos } from '@/api/youtube';
import type { SearchVideosResponse } from '@/types/videos';

export function useSearchVideos(query: string, order?: 'date' | 'viewCount') {
	return useInfiniteQuery<SearchVideosResponse>({
		queryKey: ['videos', query],
		queryFn: ({ pageParam }) =>
			searchVideos(query, order ?? 'viewCount', pageParam as string),
		initialPageParam: '',
		staleTime: 1000 * 60 * 60,
		getNextPageParam: ({ nextPageToken }) => nextPageToken,
	});
}
