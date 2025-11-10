import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { SearchIcon } from '@/components/icons';
import { VideoSkeleton } from '@/components/skeletons/video-skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Input } from '@/components/ui/input';
import type { RadioOption } from '@/components/ui/radio';
import { SortingModal } from '@/components/ui/sorting-modal';
import { Typography } from '@/components/ui/typography';
import { VideoCard } from '@/components/video/video-card';
import { useDebounce } from '@/hooks/use-debounce';
import { useSearchVideos } from '@/hooks/use-search-videos';
import type { SnippetWithId, SortOption } from '@/types/videos';
import { COLORS } from '@/utils/colors';

const OPTIONS: RadioOption[] = [
	{
		name: 'Upload date: latest',
		value: 'date',
	},
	{
		name: 'Upload date: oldest',
		value: 'relevance',
	},
	{
		name: 'Most popular',
		value: 'viewCount',
	},
];

export default function Search() {
	const { query } = useLocalSearchParams();
	const [value, setValue] = useState<string>(
		Array.isArray(query) ? query.join(' ') : query,
	);
	const debouncedValue = useDebounce(value, 500);
	const [showModal, setShowModal] = useState(false);
	const [orderBy, setOrderBy] = useState<string>('viewCount');
	const { data, isLoading, isError, error, fetchNextPage } = useSearchVideos(
		debouncedValue,
		orderBy as SortOption,
	);

	// Animated opacity
	const opacity = useSharedValue(1);

	// Update the value when the query changes
	useEffect(() => {
		setValue(Array.isArray(query) ? query.join(' ') : query);
	}, [query]);

	// Animate opacity when modal visibility changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: we need only showModal here
	useEffect(() => {
		opacity.value = withTiming(showModal ? 0.1 : 1, { duration: 250 });
	}, [showModal]);

	const videos =
		data?.pages.flatMap((page) =>
			page.items.map((item) => {
				return {
					id: item.id.videoId,
					...item.snippet,
				} as SnippetWithId;
			}),
		) ?? [];

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	});

	return (
		<Animated.View style={[styles.container, animatedStyle]}>
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
					onPress={() => setShowModal((prev) => !prev)}
				>
					Sort by:{' '}
					<Typography size="label" font="Poppins_600SemiBold">
						{OPTIONS.find((option) => option.value === orderBy)?.name ?? 'x'}
					</Typography>
				</Typography>
			</View>

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
				ListEmptyComponent={
					!isLoading ? (
						<EmptyState
							message={
								isError ? error.message : 'Nothing here yet, search videos'
							}
						/>
					) : null
				}
				ListFooterComponent={() =>
					isLoading ? (
						<View style={styles.item}>
							{Array.from([0, 1, 2, 3]).map((index) => (
								<VideoSkeleton key={`s-${index}`} />
							))}
						</View>
					) : null
				}
			/>
			<SortingModal
				options={OPTIONS}
				visible={showModal}
				onClose={() => setShowModal(false)}
				selectedOption={orderBy}
				onSubmit={setOrderBy}
			/>
		</Animated.View>
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
