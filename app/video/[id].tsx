import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
	Animated,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video, {
	type OnLoadData,
	type OnProgressData,
	type VideoRef,
} from 'react-native-video';
import { PersonIcon } from '@/components/icons';
import { EmptyState } from '@/components/ui/empty-state';
import { Tabs } from '@/components/ui/tabs';
import { Typography } from '@/components/ui/typography';
import { Controls } from '@/components/video/controls';
import { VideoDetails } from '@/components/video/video-details';
import { useVideoDetails } from '@/hooks/use-video-details';
import { COLORS } from '@/utils/colors';

export default function VideoScreen() {
	const { id } = useLocalSearchParams();
	const { data, isLoading, isError, error } = useVideoDetails(
		Array.isArray(id) ? id.join('') : id,
	);
	const videoRef = useRef<VideoRef>(null);
	const hideControlsTimeoutRef = useRef<number | null>(null);
	const opacityAnim = useRef(new Animated.Value(1)).current;
	const [videoDuration, setVideoDuration] = useState<number>(0);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState<boolean>(true);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
	const [showControls, setShowControls] = useState<boolean>(false);

	useEffect(() => {
		Animated.timing(opacityAnim, {
			toValue: showControls ? 0.5 : 1,
			duration: 100,
			useNativeDriver: true,
		}).start();
	}, [showControls, opacityAnim]);

	if (!data || isLoading) return <EmptyState message="Loading video..." />;

	if (isError && error) return <EmptyState message={error.message} />;

	const onLoad = (data: OnLoadData) => {
		setVideoDuration(data.duration);
		videoRef.current?.seek(0);
	};

	const onProgress = (data: OnProgressData) => {
		setCurrentTime(data.currentTime);
	};

	const seek = (time: number) => {
		videoRef.current?.seek(time);
		setCurrentTime(time);
	};

	const toggleControls = () => {
		console.log('toggleControls');
		// Clear any existing timeout
		if (hideControlsTimeoutRef.current) {
			clearTimeout(hideControlsTimeoutRef.current);
		}

		setShowControls((prev) => !prev);

		// Set new timeout and store reference
		hideControlsTimeoutRef.current = setTimeout(() => {
			setShowControls(false);
			hideControlsTimeoutRef.current = null;
		}, 3000);
	};

	return (
		<SafeAreaView edges={['top', 'bottom']} style={styles.container}>
			<View>
				<Animated.View style={{ opacity: opacityAnim }}>
					<Video
						ref={videoRef}
						style={styles.video}
						source={require('@/assets/video/broadchurch.mp4')}
						onLoad={onLoad}
						onProgress={onProgress}
						paused={!isPlaying}
						muted={isMuted}
						fullscreen={isFullScreen}
						onFullscreenPlayerWillDismiss={() => setIsFullScreen(false)}
						onEnd={() => {
							setShowControls(true);
						}}
					/>
				</Animated.View>
				<Pressable
					style={styles.videoOverlay}
					onPress={toggleControls}
				/>
			</View>
			{showControls && (
				<Controls
					currentTime={currentTime}
					duration={videoDuration}
					onPlayPause={() => setIsPlaying((prev) => !prev)}
					onMute={() => setIsMuted((prev) => !prev)}
					onFullscreen={() => setIsFullScreen((prev) => !prev)}
					onBackward={() => seek(currentTime - 5)}
					onForward={() => seek(currentTime + 5)}
				/>
			)}
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
	videoOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	content: {
		padding: 16,
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
