import { useFonts } from '@expo-google-fonts/poppins';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { FONTS } from '@/utils/fonts';

// Prevent the splash screen from auto-hiding before assets have loaded.
preventAutoHideAsync();

const queryClient = new QueryClient();

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

	return (
		<QueryClientProvider client={queryClient}>
			<Stack screenOptions={{ headerShown: false }} />
			<StatusBar style="light" />
		</QueryClientProvider>
	);
}
