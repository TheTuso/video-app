import { Text, type TextProps } from 'react-native';
import type { COLORS } from '@/utils/colors';
import type { FONTS } from '@/utils/fonts';

interface TypographyProps extends TextProps {
	font?: keyof typeof FONTS;
	color?: keyof typeof COLORS | string;
}

export function Typography({
	font = 'Poppins_400Regular',
	color = 'foregroundPrimary',
	children,
	style,
	...props
}: TypographyProps) {
	return (
		<Text {...props} style={[style, { fontFamily: font, color }]}>
			{children}
		</Text>
	);
}
