import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import { PersonIcon } from '@/components/icons';
import { EmptyState } from '@/components/ui/empty-state';
import { Tabs } from '@/components/ui/tabs';
import { Typography } from '@/components/ui/typography';
import { VideoDetails } from '@/components/video/video-details';
import { useVideoDetails } from '@/hooks/use-video-details';
import { COLORS } from '@/utils/colors';

export default function VideoScreen() {
	const { id } = useLocalSearchParams();
	const { data, isLoading, isError, error } = useVideoDetails(
		Array.isArray(id) ? id.join('') : id,
	);

	if (!data || isLoading) return <EmptyState message="Loading video..." />;

	if (isError && error) return <EmptyState message={error.message} />;

	return (
		<SafeAreaView edges={['top', 'bottom']} style={styles.container}>
			<Video
				style={styles.video}
				source={require('@/assets/video/broadchurch.mp4')}
				muted
				controls
			/>
			<ScrollView style={styles.content}>
				<Typography truncate={1} font="Poppins_600SemiBold" size="section">
					{data.snippet.localized.title}
				</Typography>
				<View style={styles.channel}>
					<View style={styles.icon}>
						<PersonIcon
							width={20}
							height={20}
							color={COLORS.foregroundSecondary}
						/>
					</View>
					<Typography font="Poppins_700Bold" size="radio">
						{data.snippet.channelTitle}
					</Typography>
				</View>
				<Tabs
					tabs={[
						{
							title: 'Details',
							component: (
								<VideoDetails
									description={data.snippet.localized.description}
									views={data.statistics.viewCount}
									likes={data.statistics.likeCount}
								/>
							),
						},
						{
							title: 'Notes',
							component: <Typography>Notes should be here 😁</Typography>,
						},
					]}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	video: {
		width: '100%',
		aspectRatio: 16 / 9,
	},
	content: {
		padding: 16,
		// full height
		flex: 1,
	},
	icon: {
		backgroundColor: COLORS.foregroundPrimary,
		width: 48,
		aspectRatio: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 24,
	},
	channel: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingVertical: 16,
		paddingHorizontal: 8,
	},
});
