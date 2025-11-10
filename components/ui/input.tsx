import type { ReactNode } from 'react';
import { StyleSheet, TextInput, type TextInputProps, View } from 'react-native';
import { COLORS } from '@/utils/colors';

interface InputProps extends TextInputProps {
	startIcon?: ReactNode;
	endIcon?: ReactNode;
}

export function Input({
	startIcon,
	endIcon,
	placeholder,
	...props
}: InputProps) {
	return (
		<View style={styles.container}>
			{startIcon}
			<TextInput
				{...props}
				placeholder={placeholder}
				style={styles.input}
				placeholderTextColor={`${COLORS.foregroundPrimary}99`} // HEX + 99 = hex & 60% opacity (alpha layer)
			/>
			{endIcon}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderWidth: 2,
		borderColor: COLORS.foregroundPrimary,
		borderRadius: 16,
		paddingVertical: 10,
		paddingHorizontal: 12,
		alignItems: 'center',
		gap: 12,
		flex: 1,
		maxHeight: 44,
		minHeight: 44,
	},
	input: {
		fontFamily: 'Poppins_400Regular',
		fontSize: 16,
		lineHeight: 24,
		letterSpacing: 0.01,
		color: COLORS.foregroundPrimary,
		width: '100%',
		height: '100%',
	},
});
