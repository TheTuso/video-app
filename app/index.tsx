import { Image } from 'expo-image';
import { openURL } from 'expo-linking';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { COLORS } from '@/utils/colors';

export default function Index() {
	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={require('../assets/images/logo.svg')}
				style={styles.logo}
				contentFit="contain"
			/>
			<Image
				source={require('../assets/images/app-icon.svg')}
				style={styles.icon}
				contentFit="contain"
			/>
			<View style={styles.bottomContainer}>
				<Typography
					font="Poppins_600SemiBold"
					color={COLORS.foregroundSecondary}
					size="title"
					style={{ marginBottom: 8 }}
				>
					Welcome to the best YouTube-based learning application.
				</Typography>
				<Button fullWidth>
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
							style={styles.underline}
							onPress={() =>
								openURL('https://example.com/terms-and-conditions')
							}
						>
							Terms and Conditions
						</Typography>{' '}
						and{' '}
						<Typography
							style={styles.underline}
							onPress={() => openURL('https://example.com/privacy-policy')}
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
	logo: {
		height: 116,
		width: 292,
	},
	icon: {
		width: 128,
		aspectRatio: 1,
	},
	underline: {
		textDecorationLine: 'underline',
	},
});
