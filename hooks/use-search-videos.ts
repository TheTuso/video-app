import { useInfiniteQuery } from '@tanstack/react-query';
import { searchVideos } from '@/api/youtube';
import type { SearchVideosResponse, SortOption } from '@/types/videos';

export function useSearchVideos(query: string, order?: SortOption) {
	return useInfiniteQuery<SearchVideosResponse>({
		queryKey: ['videos', query, order],
		queryFn: ({ pageParam }) =>
			searchVideos(query, order ?? 'viewCount', pageParam as string),
		initialPageParam: '',
		staleTime: 1000 * 60 * 60,
		enabled: !!query,
		getNextPageParam: ({ nextPageToken }) => nextPageToken,
	});
}
