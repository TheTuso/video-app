import { StyleSheet, View } from 'react-native';

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
		backgroundColor: '#C8C8C8',
		height: 4,
		width: '100%',
		flexDirection: 'row',
	},
	progress: {
		backgroundColor: '#C71F1F',
		height: '100%',
	},
	circle: {
		backgroundColor: '#C71F1F',
		width: 12,
		aspectRatio: 1,
		borderRadius: 6,
		transform: [{ translateY: -4 }, { translateX: -4 }],
	},
});
