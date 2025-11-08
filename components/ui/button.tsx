import { Pressable, type PressableProps, StyleSheet } from 'react-native';
import { COLORS } from '@/utils/colors';

interface ButtonProps extends PressableProps {
	size?: 'small' | 'medium' | 'large';
	fullWidth?: boolean;
}

export function Button({
	size = 'medium',
	fullWidth,
	children,
	...props
}: ButtonProps) {
	return (
		<Pressable
			{...props}
			style={[styles.button, { width: fullWidth ? '100%' : 'auto' }]}
		>
			{children}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.foregroundPrimary,
		padding: 12,
		borderRadius: 12,
	},
});
