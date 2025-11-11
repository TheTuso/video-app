import { useInfiniteQuery } from '@tanstack/react-query';
import { searchVideos } from '@/api/youtube';
import type { SearchVideosResponse, SortOption } from '@/types/videos';

const ONE_HOUR = 1000 * 60 * 60;

/**
 * Custom hook for searching YouTube videos with infinite scroll pagination.
 * Uses React Query's infinite query for automatic pagination and caching.
 *
 * @param query - The search query string (hook is disabled when empty)
 * @param order - Optional sort order (defaults to 'viewCount' if not provided)
 * @returns React Query infinite query result with pages of video search results
 *
 * @example
 * ```tsx
 * const { data, fetchNextPage, hasNextPage, isLoading } = useSearchVideos('React Native', 'date');
 * ```
 *
 * Features:
 * - Automatic pagination using YouTube's nextPageToken
 * - 1 hour cache (staleTime) to reduce API calls
 * - Only enabled when query is non-empty
 * - Query key includes query and order for proper cache invalidation
 */
export function useSearchVideos(query: string, order?: SortOption) {
	return useInfiniteQuery<SearchVideosResponse>({
		queryKey: ['videos', query, order],
		queryFn: ({ pageParam }) =>
			searchVideos(query, order ?? 'viewCount', pageParam as string),
		initialPageParam: '',
		staleTime: ONE_HOUR,
		enabled: !!query,
		getNextPageParam: ({ nextPageToken }) => nextPageToken,
	});
}
