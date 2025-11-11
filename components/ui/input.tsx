import type { ReactNode } from 'react';
import { StyleSheet, TextInput, type TextInputProps, View } from 'react-native';
import { COLORS, hexa } from '@/utils/colors';

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
				placeholderTextColor={hexa(COLORS.foregroundPrimary, 0.6)}
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
		letterSpacing: 0.01,
		color: COLORS.foregroundPrimary,
		flex: 1,
		paddingVertical: 0,
	},
});
