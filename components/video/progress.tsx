import { StyleSheet, View } from 'react-native';
import { COLORS } from '@/utils/colors';

interface ProgressProps {
	progress?: `${number}%`;
}

export function Progress({ progress = '0%' }: ProgressProps) {
	return (
		<View style={styles.container}>
			<View style={[styles.progress, { width: progress }]} />
			<View style={styles.circle} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.progressBarBackground,
		height: 4,
		width: '100%',
		flexDirection: 'row',
	},
	progress: {
		backgroundColor: COLORS.progressBar,
		height: '100%',
	},
	circle: {
		backgroundColor: COLORS.progressBar,
		width: 12,
		aspectRatio: 1,
		borderRadius: 6,
		transform: [{ translateY: -4 }, { translateX: -4 }],
	},
});
