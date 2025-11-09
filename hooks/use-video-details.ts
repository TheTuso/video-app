import { useQuery } from '@tanstack/react-query';
import { getVideoDetails } from '@/api/youtube';
import type { VideoDetailsResponse } from '@/types/videos';

export function useVideoDetails(id: string) {
	const { data, isLoading, isError, error } = useQuery<VideoDetailsResponse>({
		queryKey: ['video', id],
		queryFn: () => getVideoDetails(id),
		staleTime: 1000 * 60 * 60,
	});

	return { data: data?.items[0] ?? null, isLoading, isError, error };
}
