import { navigate } from 'expo-router/build/global-state/routing';
import { SectionList, StyleSheet, View } from 'react-native';
import { SearchIcon, SettingsIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { VideosSection } from '@/components/video/videos-section';
import { COLORS } from '@/utils/colors';

const CATEGORIES = [
	{
		title: 'React Native',
		data: [],
	},
	{
		title: 'React',
		data: [],
	},
	{
		title: 'TypeScript',
		data: [],
	},
	{
		title: 'JavaScript',
		data: [],
	},
];

export default function Home() {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Input
					placeholder="Search videos"
					startIcon={
						<SearchIcon
							color={COLORS.foregroundPrimary}
							width={32}
							height={32}
						/>
					}
					onPress={() => navigate('/search')}
				/>
				<SettingsIcon width={32} height={32} />
			</View>
			<SectionList
				style={styles.sectionsList}
				sections={CATEGORIES}
				renderSectionHeader={({ section }) => (
					<VideosSection title={section.title} />
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 0,
		height: '100%',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 16,
		paddingHorizontal: 24,
	},
	sectionsList: {
		// height: '100%',
		marginTop: 24,
	},
});
