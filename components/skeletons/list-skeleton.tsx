import { FlatList, StyleSheet, View } from 'react-native';
import { Skeleton } from '@/components/skeletons/skeleton';

export function ListSkeleton() {
	return (
		<FlatList
			style={styles.list}
			horizontal
			data={Array.from({ length: 5 }).map(() => ({}))}
			renderItem={() => (
				<View style={styles.item}>
					<Skeleton style={styles.skeleton} />
					<Skeleton style={styles.skeletonTitle} />
					<Skeleton style={[styles.skeletonTitle, styles.skeletonDate]} />
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	list: {
		paddingVertical: 8,
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
