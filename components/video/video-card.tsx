import { format } from 'date-fns';
import { Image } from 'expo-image';
import { navigate } from 'expo-router/build/global-state/routing';
import { Pressable, StyleSheet } from 'react-native';
import { Typography } from '@/components/ui/typography';

/**
 * Props for the VideoCard component.
 */
interface ThumbnailProps {
	/** YouTube video ID */
	id: string;
	/** Video title */
	title: string;
	/** ISO date string of when the video was published */
	publishedAt: string;
	/** Thumbnail image URL */
	thumbnail: string;
	/** Channel/creator name (only shown in 'large' variant) */
	channelName?: string;
	/** Card size variant - 'small' (180x112) or 'large' (full width) */
	variant?: 'small' | 'large';
}

/**
 * Video card component displaying video thumbnail, title, and metadata.
 * Supports two size variants for different layout contexts.
 *
 * @example
 * ```tsx
 * // Small variant (for horizontal scrolling lists)
 * <VideoCard
 *   id="dQw4w9WgXcQ"
 *   title="Never Gonna Give You Up"
 *   publishedAt="2009-10-25T06:57:33Z"
 *   thumbnail="https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg"
 *   variant="small"
 * />
 *
 * // Large variant (for vertical lists, shows channel name)
 * <VideoCard
 *   id="dQw4w9WgXcQ"
 *   title="Never Gonna Give You Up"
 *   publishedAt="2009-10-25T06:57:33Z"
 *   thumbnail="https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg"
 *   channelName="Rick Astley"
 *   variant="large"
 * />
 * ```
 *
 * Features:
 * - Two size variants: 'small' (180x112px) and 'large' (full width, 16:9 aspect ratio)
 * - Navigates to video player screen on press
 * - Displays formatted publication date (dd.MM.yyyy)
 * - Title truncates to 2 lines with ellipsis
 * - Large variant shows channel name in bold
 */
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
