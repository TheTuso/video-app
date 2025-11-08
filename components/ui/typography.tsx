import { Text, type TextProps } from 'react-native';
import { COLORS } from '@/utils/colors';
import type { FONTS } from '@/utils/fonts';

interface TypographyProps extends TextProps {
	font?: keyof typeof FONTS;
	color?: string;
}

export function Typography({
	font = 'Poppins_400Regular',
	color = COLORS.foregroundPrimary,
	children,
	style,
	...props
}: TypographyProps) {
	return (
		<Text
			{...props}
			style={[
				style,
				{
					fontFamily: font,
					color,
				},
			]}
		>
			{children}
		</Text>
	);
}
