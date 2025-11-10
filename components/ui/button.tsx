import { Pressable, type PressableProps, StyleSheet } from 'react-native';
import { COLORS } from '@/utils/colors';

interface ButtonProps extends PressableProps {
	fullWidth?: boolean;
}

export function Button({ fullWidth, children, style, ...props }: ButtonProps) {
	return (
		<Pressable
			{...props}
			// @ts-ignore
			style={[styles.button, { width: fullWidth ? '100%' : 'auto' }, style]}
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
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		justifyContent: 'center',
	},
});
