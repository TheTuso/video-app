import { Image } from 'expo-image';
import { openURL } from 'expo-linking';
import { navigate } from 'expo-router/build/global-state/routing';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIcon from '@/components/icons/AppIcon';
import Logo from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { COLORS } from '@/utils/colors';

export default function LoginScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Logo width={253} height={77} />
			<AppIcon width={128} height={128} />
			<View style={styles.bottomContainer}>
				<Typography
					font="Poppins_600SemiBold"
					color={COLORS.foregroundSecondary}
					size="title"
					style={{ marginBottom: 8 }}
				>
					Welcome to the best YouTube-based learning application.
				</Typography>
				<Button fullWidth onPress={() => navigate('/(tabs)')}>
					<Typography
						font="Poppins_600SemiBold"
						color={COLORS.foregroundSecondary}
						align="center"
						size="largeButton"
					>
						Log in as guest
					</Typography>
				</Button>
				<View style={styles.linksContainer}>
					<Typography
						color={COLORS.foregroundSecondary}
						size="body"
						align="center"
					>
						By continuing you agree with{'\n'}
						<Typography
							onPress={() =>
								openURL('https://example.com/terms-and-conditions')
							}
							underline
						>
							Terms and Conditions
						</Typography>{' '}
						and{' '}
						<Typography
							onPress={() => openURL('https://example.com/privacy-policy')}
							underline
						>
							Privacy Policy
						</Typography>
					</Typography>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.backgroundPrimary,
		flex: 1,
		alignItems: 'center',
		padding: 32,
		justifyContent: 'space-between',
	},
	bottomContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
		width: '100%',
	},
	linksContainer: {
		width: 264,
	},
});
