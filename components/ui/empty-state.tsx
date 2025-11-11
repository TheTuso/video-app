import { StyleSheet, View } from 'react-native';
import { PlayIcon } from '@/components/icons';
import { Typography } from '@/components/ui/typography';
import { COLORS, hexa } from '@/utils/colors';

interface EmptyStateProps {
	message?: string;
}

const COLOR = hexa(COLORS.foregroundPrimary, 0.4);

export function EmptyState({ message }: EmptyStateProps) {
	return (
		<View style={styles.container}>
			<PlayIcon width={64} height={64} color={COLOR} />
			{message && (
				<Typography font="Poppins_600SemiBold" size="section" color={COLOR}>
					{message}
				</Typography>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
	},
});
