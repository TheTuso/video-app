import { StyleSheet, View, type ViewProps } from 'react-native';
import { COLORS } from '@/utils/colors';

export function Skeleton({ style, children, ...props }: ViewProps) {
	return (
		<View style={[styles.skeleton, style]} {...props}>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	skeleton: {
		width: '100%',
		height: '100%',
		backgroundColor: `${COLORS.foregroundPrimary}22`,
	},
});
