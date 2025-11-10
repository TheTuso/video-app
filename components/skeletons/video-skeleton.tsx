import { StyleSheet, View } from 'react-native';
import { Skeleton } from '@/components/skeletons/skeleton';

export function VideoSkeleton() {
	return (
		<View>
			<Skeleton style={styles.skeleton} />
			<Skeleton style={[styles.skeleton, { height: 18 }]} />
			<Skeleton style={[styles.skeleton, { height: 18 }]} />
			<Skeleton style={[styles.skeleton, { height: 16 }]} />
		</View>
	);
}

const styles = StyleSheet.create({
	skeleton: {
		height: 196,
		borderRadius: 16,
		marginBottom: 16,
	},
});
