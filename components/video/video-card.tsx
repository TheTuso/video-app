import { format } from 'date-fns';
import { Image } from 'expo-image';
import { navigate } from 'expo-router/build/global-state/routing';
import { Pressable, StyleSheet } from 'react-native';
import { Typography } from '@/components/ui/typography';

interface ThumbnailProps {
	id: string;
	title: string;
	publishedAt: string;
	thumbnail: string;
	channelName?: string;
	variant?: 'small' | 'large';
}

export function VideoCard({
	id,
	title,
	publishedAt,
	thumbnail,
	channelName,
	variant = 'small',
}: ThumbnailProps) {
	const variantStyles = variant === 'small' ? small : large;

	return (
		<Pressable
			style={variantStyles.container}
			onPress={() => navigate(`/video/${id}`)}
		>
			<Image
				source={{ uri: thumbnail }}
				style={[styles.thumbnail, variantStyles.thumbnail]}
			/>
			{variant === 'large' && (
				<Typography font="Poppins_700Bold" size="smallVideoTitle">
					{channelName}
				</Typography>
			)}
			<Typography
				font={variant === 'small' ? 'Poppins_500Medium' : 'Poppins_400Regular'}
				size={`${variant}VideoTitle`}
				truncate={2}
				style={{ width: variantStyles.thumbnail.width }}
			>
				{title}
			</Typography>
			<Typography font="Poppins_400Regular" size="small" align="right">
				{format(new Date(publishedAt), 'dd.MM.yyyy')}
			</Typography>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	thumbnail: {
		borderRadius: 16,
	},
});

const small = StyleSheet.create({
	container: {
		gap: 4,
	},
	thumbnail: {
		width: 180,
		height: 112,
	},
});

const large = StyleSheet.create({
	container: {
		gap: 16,
	},
	thumbnail: {
		width: '100%',
		aspectRatio: 16 / 9,
	},
});
