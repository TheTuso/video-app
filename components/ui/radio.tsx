import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Typography } from '@/components/ui/typography';
import { COLORS } from '@/utils/colors';

export interface RadioOption {
	name: string;
	value: string;
}

interface RadioProps {
	option: RadioOption;
	selected?: boolean;
	onSelect?: (value: string) => void;
}

export function Radio({ option, selected = false, onSelect }: RadioProps) {
	const opacity = useSharedValue(selected ? 1 : 0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: we need only selected here
	useEffect(() => {
		opacity.value = withTiming(selected ? 1 : 0, {
			duration: 250,
		});
	}, [selected]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	});

	return (
		<Pressable
			style={styles.container}
			onPress={() => onSelect?.(option.value)}
		>
			<View style={styles.circle}>
				<Animated.View
					style={[
						styles.selected,
						{ backgroundColor: COLORS.foregroundPrimary },
						animatedStyle,
					]}
				/>
			</View>
			<Typography
				font="Poppins_400Regular"
				size="radio"
				color={COLORS.foregroundSecondary}
			>
				{option.name}
			</Typography>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 16,
		alignItems: 'center',
	},
	circle: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: COLORS.foregroundSecondary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	selected: {
		width: 14,
		height: 14,
		borderRadius: 7,
		borderColor: COLORS.foregroundPrimary,
	},
});
