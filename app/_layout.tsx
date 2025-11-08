import { useFonts } from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { useEffect } from 'react';
import { FONTS } from '@/utils/fonts';

// Prevent the splash screen from auto-hiding before assets have loaded.
preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts(FONTS);

	useEffect(() => {
		if (loaded || error) {
			// Hide the splash screen once the fonts have loaded.
			hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return <Stack screenOptions={{ headerShown: false }} />;
}
