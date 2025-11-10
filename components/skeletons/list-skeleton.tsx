import { StyleSheet, View } from 'react-native';
import { Skeleton } from '@/components/skeletons/skeleton';

export function ListSkeleton() {
	return (
		<View style={styles.container}>
			{Array.from([0, 1]).map((index) => (
				<View key={`s-${index}`} style={styles.item}>
					<Skeleton style={styles.skeleton} />
					<Skeleton style={styles.skeletonTitle} />
					<Skeleton style={[styles.skeletonTitle, styles.skeletonDate]} />
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	item: {
		marginLeft: 18,
	},
	skeleton: {
		width: 180,
		height: 112,
		borderRadius: 16,
	},
	skeletonTitle: {
		width: 180,
		height: 12,
		borderRadius: 16,
		marginTop: 8,
	},
	skeletonDate: {
		width: '25%',
		marginRight: 0,
		marginLeft: 'auto',
		marginBottom: 18,
	},
});
