import { useQuery } from '@tanstack/react-query';
import { getVideoDetails } from '@/api/youtube';
import type { VideoDetailsResponse } from '@/types/videos';

const ONE_HOUR = 1000 * 60 * 60;

export function useVideoDetails(id: string) {
	const { data, isLoading, isError, error } = useQuery<VideoDetailsResponse>({
		queryKey: ['video', id],
		queryFn: () => getVideoDetails(id),
		staleTime: ONE_HOUR,
	});

	return { data: data?.items[0] ?? null, isLoading, isError, error };
}
