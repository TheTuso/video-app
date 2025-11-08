import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeIcon, SearchIcon } from '@/components/icons';
import { Typography } from '@/components/ui/typography';
import { COLORS } from '@/utils/colors';

export default function TabsLayout() {
	return (
		<>
			<SafeAreaView style={{ flex: 1 }} edges={['top']}>
				<Tabs
					screenOptions={{
						tabBarActiveTintColor: COLORS.foregroundPrimary,
						tabBarInactiveTintColor: COLORS.foregroundSecondary,
						tabBarStyle: styles.bar,
					}}
				>
					<Tabs.Screen
						name="index"
						options={{
							headerShown: false,
							title: 'Home',
							tabBarIcon: ({ color }) => <HomeIcon color={color} width={32} />,
							tabBarLabel: ({ children, color }) => (
								<Typography size="largeButton" color={color}>
									{children}
								</Typography>
							),
						}}
					/>
					<Tabs.Screen
						name="search"
						options={{
							headerShown: false,
							title: 'Search',
							tabBarIcon: ({ color }) => (
								<SearchIcon color={color} width={32} />
							),
							tabBarLabel: ({ children, color }) => (
								<Typography size="largeButton" color={color}>
									{children}
								</Typography>
							),
						}}
					/>
				</Tabs>
			</SafeAreaView>
			<StatusBar style="dark" />
		</>
	);
}

const styles = StyleSheet.create({
	bar: {
		backgroundColor: COLORS.backgroundPrimary,
		paddingTop: 12,
	},
});
