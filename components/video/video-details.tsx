import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LikesIcon, ViewsIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { COLORS } from '@/utils/colors';

interface VideoDetailsProps {
	description: string;
	views: string;
	likes: string;
}

export function VideoDetails({ description, views, likes }: VideoDetailsProps) {
	const [dynamicLikes, setDynamicLikes] = useState(parseInt(likes));
	return (
		<View style={styles.container}>
			<Typography font="Poppins_600SemiBold" size="small">
				Description
			</Typography>
			<Typography size="smallVideoTitle">{description}</Typography>
			<Typography font="Poppins_600SemiBold" size="small">
				Statistics
			</Typography>
			<View style={styles.buttons}>
				<Button style={styles.button}>
					<ViewsIcon
						width={20}
						height={20}
						color={COLORS.foregroundSecondary}
					/>
					<Typography
						font="Poppins_600SemiBold"
						color={COLORS.foregroundSecondary}
						size="smallButton"
					>
						{views} views
					</Typography>
				</Button>
				<Button
					style={styles.button}
					onPress={() => setDynamicLikes((prev) => prev + 1)}
				>
					<LikesIcon
						width={20}
						height={20}
						color={COLORS.foregroundSecondary}
					/>
					<Typography
						font="Poppins_600SemiBold"
						color={COLORS.foregroundSecondary}
						size="smallButton"
					>
						{dynamicLikes} likes
					</Typography>
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		paddingVertical: 6,
		paddingHorizontal: 8,
		borderRadius: 8,
		width: '36%',
		justifyContent: 'center',
	},
});
