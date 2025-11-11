import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	AirplayIcon,
	BackwardIcon,
	ForwardIcon,
	FullscreenIcon,
	LeftarrowIcon,
	PauseIcon,
	PlayIcon,
	VolumeIcon,
} from '@/components/icons';
import { Typography } from '@/components/ui/typography';
import { ControlButton } from '@/components/video/control-button';
import { Progress } from '@/components/video/progress';
import { COLORS } from '@/utils/colors';

/**
 * Props for the Controls component.
 */
interface ControlsProps {
	/** Total video duration in seconds */
	duration: number;
	/** Current playback position in seconds */
	currentTime: number;
	/** Callback fired when play/pause button is pressed */
	onPlayPause?: () => void;
	/** Callback fired when mute button is pressed */
	onMute?: () => void;
	/** Callback fired when fullscreen button is pressed */
	onFullscreen?: () => void;
	/** Callback fired when forward button is pressed (typically +10s) */
	onForward?: () => void;
	/** Callback fired when backward button is pressed (typically -10s) */
	onBackward?: () => void;
}

/**
 * Formats seconds into MM:SS timestamp format.
 *
 * @param totalSeconds - The total number of seconds to format
 * @returns A formatted string in MM:SS format (e.g., "04:32")
 *
 * @example
 * ```tsx
 * formatSecondsToMS(272)  // Returns "04:32"
 * formatSecondsToMS(59)   // Returns "00:59"
 * ```
 */
function formatSecondsToMS(totalSeconds: number) {
	const secs = Math.floor(totalSeconds);
	const minutes = Math.floor((secs % 3600) / 60);
	const seconds = secs % 60;
	const pad = (n: number) => String(n).padStart(2, '0');
	return `${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Video player controls overlay component.
 * Displays play/pause, seek, volume, fullscreen, and navigation controls.
 *
 * Features:
 * - Back navigation button (returns to previous screen)
 * - Play/Pause toggle with icon state
 * - Forward/Backward seek buttons (+10s/-10s)
 * - Volume control button
 * - Airplay button (placeholder, not implemented)
 * - Fullscreen toggle
 * - Progress bar with current time / total duration display
 * - Safe area insets support for notched devices
 *
 * @example
 * ```tsx
 * <Controls
 *   duration={300}
 *   currentTime={150}
 *   onPlayPause={() => video.playPause()}
 *   onMute={() => video.mute()}
 *   onFullscreen={() => video.enterFullscreen()}
 *   onForward={() => video.seek(currentTime + 10)}
 *   onBackward={() => video.seek(currentTime - 10)}
 * />
 * ```
 */
export function Controls({
	duration,
	currentTime,
	onPlayPause,
	onMute,
	onFullscreen,
	onBackward,
	onForward,
}: ControlsProps) {
	const insets = useSafeAreaInsets();
	const [isPlaying, setIsPlaying] = useState(true);

	return (
		<View style={[styles.container, { marginTop: insets.top }]}>
			<View style={[styles.overlay]}>
				<View style={styles.horizontal}>
					<ControlButton onPress={() => router.back()}>
						<LeftarrowIcon
							color={COLORS.foregroundSecondary}
							width={20}
							height={20}
						/>
					</ControlButton>
					<View style={styles.group}>
						<ControlButton onPress={onMute}>
							<VolumeIcon
								color={COLORS.foregroundSecondary}
								width={20}
								height={20}
							/>
						</ControlButton>
						<ControlButton onPress={() => alert('Airplay not implemented')}>
							<AirplayIcon
								color={COLORS.foregroundSecondary}
								width={20}
								height={20}
							/>
						</ControlButton>
					</View>
				</View>
				<View style={[styles.horizontal, styles.center]}>
					<ControlButton onPress={onBackward}>
						<BackwardIcon
							color={COLORS.foregroundSecondary}
							width={20}
							height={20}
						/>
					</ControlButton>
					<ControlButton
						size={40}
						onPress={() => {
							onPlayPause?.();
							setIsPlaying((prev) => !prev);
						}}
					>
						{isPlaying ? (
							<PauseIcon
								color={COLORS.foregroundSecondary}
								width={25}
								height={25}
							/>
						) : (
							<PlayIcon
								color={COLORS.foregroundSecondary}
								width={25}
								height={25}
							/>
						)}
					</ControlButton>
					<ControlButton onPress={onForward}>
						<ForwardIcon
							color={COLORS.foregroundSecondary}
							width={20}
							height={20}
						/>
					</ControlButton>
				</View>
				<View style={[styles.horizontal, styles.bottom]}>
					<Typography
						font="Poppins_600SemiBold"
						size="timeStamp"
						color={COLORS.foregroundSecondary}
					>
						{formatSecondsToMS(currentTime)} / {formatSecondsToMS(duration)}
					</Typography>
					<ControlButton transparent size={24} onPress={onFullscreen}>
						<FullscreenIcon
							color={COLORS.foregroundSecondary}
							width={24}
							height={24}
						/>
					</ControlButton>
				</View>
			</View>
			<Progress progress={`${(currentTime / duration) * 100}%`} />
		</View>
	);
}

const styles = StyleSheet.create({
	overlay: {
		paddingVertical: 18,
		paddingHorizontal: 16,
		justifyContent: 'space-between',
		flex: 1,
	},
	container: {
		width: '100%',
		aspectRatio: 16 / 9,
		position: 'absolute',
		top: 0,
		left: 0,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	horizontal: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-between',
	},
	center: {
		gap: 48,
		justifyContent: 'center',
	},
	group: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	bottom: {
		alignItems: 'flex-end',
	},
});
