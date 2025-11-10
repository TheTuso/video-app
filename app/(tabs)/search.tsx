import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SearchIcon } from '@/components/icons';
import { EmptyState } from '@/components/ui/empty-state';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { VideoCard } from '@/components/video/video-card';
import { useDebounce } from '@/hooks/use-debounce';
import { useSearchVideos } from '@/hooks/use-search-videos';
import type { SnippetWithId } from '@/types/videos';
import { COLORS } from '@/utils/colors';

export default function Search() {
	const { query } = useLocalSearchParams();
	const [value, setValue] = useState<string>(
		Array.isArray(query) ? query.join(' ') : query,
	);
	const debouncedValue = useDebounce(value, 500);
	const { data, isLoading, isError, error, fetchNextPage } =
		useSearchVideos(debouncedValue);

	// Update the value when the query changes
	useEffect(() => {
		setValue(Array.isArray(query) ? query.join(' ') : query);
	}, [query]);

	const videos =
		data?.pages.flatMap((page) =>
			page.items.map((item) => {
				return {
					id: item.id.videoId,
					...item.snippet,
				} as SnippetWithId;
			}),
		) ?? [];

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Input
					placeholder="Search videos"
					value={value}
					onChangeText={setValue}
					startIcon={
						<SearchIcon
							color={COLORS.foregroundPrimary}
							width={32}
							height={32}
						/>
					}
				/>
				<Typography size="small">
					{data?.pages[0]?.pageInfo.totalResults ?? 0} results found for: {'"'}
					<Typography size="small" font="Poppins_600SemiBold">
						{value}
					</Typography>
					{'"'}
				</Typography>
				<Typography
					size="label"
					align="right"
					onPress={() => alert('open modal')} // https://docs.expo.dev/versions/latest/sdk/checkbox/
				>
					Sort by:{' '}
					<Typography size="label" font="Poppins_600SemiBold">
						Most popular
					</Typography>
				</Typography>
			</View>
			{videos.length === 0 ? (
				<EmptyState
					message={
						isLoading
							? 'Loading your videos'
							: isError
								? error.message
								: 'Nothing here yet, search videos'
					}
				/>
			) : (
				<FlatList
					style={styles.list}
					data={videos}
					keyExtractor={(item, index) => `${item}-${index}`}
					onEndReached={() => fetchNextPage()}
					renderItem={({ item }) => (
						<View style={styles.item}>
							<VideoCard
								id={item.id}
								title={item.title}
								publishedAt={item.publishedAt}
								thumbnail={item.thumbnails.high.url}
								channelName={item.channelTitle}
								variant="large"
							/>
						</View>
					)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 24,
		paddingBottom: 0,
		height: '100%',
	},
	header: {
		gap: 8,
		paddingHorizontal: 24,
	},
	list: {
		marginTop: 32,
	},
	item: {
		paddingHorizontal: 24,
		marginBottom: 16,
	},
});
