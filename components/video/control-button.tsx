import { Pressable, type PressableProps, StyleSheet } from 'react-native';

interface ControlButtonProps extends PressableProps {
	size?: number;
	transparent?: boolean;
}

export function ControlButton({
	size = 32,
	transparent = false,
	children,
	...props
}: ControlButtonProps) {
	return (
		<Pressable
			style={[
				styles.button,
				{
					width: size,
					height: size,
				},
				transparent ? { backgroundColor: 'transparent' } : {},
			]}
			{...props}
		>
			{children}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'rgba(0, 0, 0, 0.25)',
		borderRadius: 64,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
