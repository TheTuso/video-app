import { FlatList, StyleSheet, View } from 'react-native';
import { ListSkeleton } from '@/components/skeletons/list-skeleton';
import { SectionHeader } from '@/components/video/seciton-header';
import { VideoCard } from '@/components/video/video-card';
import { useSearchVideos } from '@/hooks/use-search-videos';
import type { SnippetWithId } from '@/types/videos';
import { COLORS } from '@/utils/colors';
import {EmptyState} from "@/components/ui/empty-state";

interface VideosSectionProps {
	title: string;
}

export function VideosSection({ title }: VideosSectionProps) {
	const { data, isLoading, isError, error, fetchNextPage } = useSearchVideos(
		normalizeQuery(title),
	);

	const videos = data?.pages.flatMap((page) =>
		page.items.map((item) => {
			return {
				id: item.id.videoId,
				...item.snippet,
			} as SnippetWithId;
		}),
	) ?? [];

	return (
		<View style={styles.section}>
			<View style={styles.sectionContent}>
				<SectionHeader title={title} />
        {isError && <EmptyState message={error.message}/>}
				{isLoading ? (
					<ListSkeleton />
				) : (
					<FlatList
						style={styles.list}
						horizontal
						data={videos}
						onEndReached={() => fetchNextPage()}
						renderItem={({ item }) => (
							<View style={styles.item}>
								<VideoCard
									id={item.id}
									title={item.title}
									publishedAt={item.publishedAt}
									thumbnail={item.thumbnails.medium.url}
								/>
							</View>
						)}
					/>
				)}
			</View>
		</View>
	);
}

function normalizeQuery(query: string) {
	switch (query.toLowerCase()) {
		case 'react':
			return `${query} js`;
		default:
			return query;
	}
}

const styles = StyleSheet.create({
	section: {
		borderBottomColor: COLORS.foregroundPrimary,
		borderBottomWidth: 2,
	},
	sectionContent: {
		paddingBottom: 0,
		paddingTop: 8,
	},
	list: {
		paddingVertical: 8,
	},
	item: {
		marginLeft: 18,
	},
});
