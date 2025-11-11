import { useQuery } from '@tanstack/react-query';
import { getVideoDetails } from '@/api/youtube';
import type { VideoDetailsResponse } from '@/types/videos';

const ONE_HOUR = 1000 * 60 * 60;

/**
 * Custom hook for fetching detailed information about a specific YouTube video.
 * Uses React Query for automatic caching and background updates.
 *
 * @param id - The YouTube video ID
 * @returns Object containing:
 *   - data: The video details object (null if not found or loading)
 *   - isLoading: Boolean indicating if the initial fetch is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if request failed
 *
 * @example
 * ```tsx
 * const { data, isLoading, isError } = useVideoDetails('dQw4w9WgXcQ');
 * if (isLoading) return <Skeleton />;
 * if (isError) return <Error />;
 * return <Typography>{data.id}</Typography>;
 * ```
 *
 * Features:
 * - 1 hour cache (staleTime) to reduce API calls
 * - Automatically extracts first item from API response array
 * - Returns null for data if no video found
 */
export function useVideoDetails(id: string) {
	const { data, isLoading, isError, error } = useQuery<VideoDetailsResponse>({
		queryKey: ['video', id],
		queryFn: () => getVideoDetails(id),
		staleTime: ONE_HOUR,
	});

	return { data: data?.items[0] ?? null, isLoading, isError, error };
}
