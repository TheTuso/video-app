import { type ReactNode, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Typography } from '@/components/ui/typography';
import { COLORS } from '@/utils/colors';

export interface Tab {
	title: string;
	component: ReactNode;
}

interface TabsProps {
	tabs: Tab[];
	selectedTab?: number;
}

export function Tabs({ tabs, selectedTab = 0 }: TabsProps) {
	const [activeIndex, setActiveIndex] = useState(selectedTab);

	return (
		<View style={styles.container}>
			<View style={styles.tabBar}>
				{tabs.map((tab, index) => (
					<Pressable
						key={`tab-${tab.title.toLowerCase()}`}
						onPress={() => setActiveIndex(index)}
						style={[styles.tab, activeIndex === index && styles.tabActive]}
					>
						<Typography
							font="Poppins_600SemiBold"
							color={COLORS.foregroundPrimary}
							size="smallVideoTitle"
						>
							{tab.title}
						</Typography>
					</Pressable>
				))}
			</View>
			<View style={styles.content}>{tabs[activeIndex]?.component}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	tab: {
		flex: 1,
		paddingVertical: 4,
		alignItems: 'center',
		borderBottomWidth: 2,
		borderBottomColor: `${COLORS.foregroundPrimary}66`,
	},
	tabActive: {
		borderBottomColor: `${COLORS.foregroundPrimary}`,
	},
	content: {
		flex: 1,
		paddingHorizontal: 8,
		paddingVertical: 16,
	},
});
