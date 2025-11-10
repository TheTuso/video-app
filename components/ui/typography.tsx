import { StyleSheet, Text, type TextProps } from 'react-native';
import { COLORS } from '@/utils/colors';
import type { FONTS } from '@/utils/fonts';

interface TypographyProps extends TextProps {
	font?: keyof typeof FONTS;
	color?: string;
	size?: keyof typeof sizes;
	align?: 'left' | 'center' | 'right' | 'justify';
	underline?: boolean;
	truncate?: number;
}

export function Typography({
	font = 'Poppins_400Regular',
	color = COLORS.foregroundPrimary,
	size = 'body',
	align = 'left',
	underline = false,
	truncate,
	children,
	style,
	...props
}: TypographyProps) {
	return (
		<Text
			numberOfLines={truncate}
			{...props}
			style={[
				{
					fontFamily: font,
					textAlign: align,
					textDecorationLine: underline ? 'underline' : 'none',
					color,
				},
				sizes[size],
				style,
			]}
		>
			{children}
		</Text>
	);
}

const sizes = StyleSheet.create({
	title: {
		fontSize: 22,
		lineHeight: 24,
		letterSpacing: 0.01,
	},
	body: {
		fontSize: 13,
		lineHeight: 16,
	},
	largeButton: {
		fontSize: 16,
		lineHeight: 24,
		letterSpacing: 0.01,
	},
	section: {
		fontSize: 18,
		lineHeight: 24,
		letterSpacing: 0.01,
	},
	label: {
		fontSize: 12,
		lineHeight: 24,
		letterSpacing: 0.01,
	},
	smallVideoTitle: {
		fontSize: 12,
		lineHeight: 13,
		letterSpacing: 0.01,
	},
	largeVideoTitle: {
		fontSize: 15,
		lineHeight: 16,
		letterSpacing: 0.01,
	},
	small: {
		fontSize: 10,
		lineHeight: 24,
		letterSpacing: 0.01,
	},
	radio: {
		fontSize: 14,
		letterSpacing: 0.01,
	},
});
