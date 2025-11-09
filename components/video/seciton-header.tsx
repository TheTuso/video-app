import { navigate } from 'expo-router/build/global-state/routing';
import { StyleSheet, View } from 'react-native';
import { Typography } from '@/components/ui/typography';

interface SectionHeaderProps {
	title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
	return (
		<View style={styles.sectionHeader}>
			<Typography font="Poppins_600SemiBold" size="section">
				{title}
			</Typography>
			<Typography
				font="Poppins_400Regular"
				size="label"
				underline
				onPress={() => navigate(`/search?query=${title}`)}
			>
				Show more
			</Typography>
		</View>
	);
}

const styles = StyleSheet.create({
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 24,
	},
});
