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

interface ControlsProps {
	duration: number;
	currentTime: number;
	onPlayPause?: () => void;
	onMute?: () => void;
	onFullscreen?: () => void;
	onForward?: () => void;
	onBackward?: () => void;
}

function formatSecondsToMS(totalSeconds: number) {
	const secs = Math.floor(totalSeconds);
	const minutes = Math.floor((secs % 3600) / 60);
	const seconds = secs % 60;
	const pad = (n: number) => String(n).padStart(2, '0');
	return `${pad(minutes)}:${pad(seconds)}`;
}

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
