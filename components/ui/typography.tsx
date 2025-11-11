import { StyleSheet, Text, type TextProps } from 'react-native';
import { COLORS } from '@/utils/colors';
import type { FONTS } from '@/utils/fonts';

/**
 * Props for the Typography component.
 * Extends React Native's TextProps with additional styling options.
 */
interface TypographyProps extends TextProps {
	/** Font family from the Poppins font set */
	font?: keyof typeof FONTS;
	/** Text color (defaults to foregroundPrimary) */
	color?: string;
	/** Predefined text size variant */
	size?: keyof typeof sizes;
	/** Text alignment */
	align?: 'left' | 'center' | 'right' | 'justify';
	/** Whether to underline the text */
	underline?: boolean;
	/** Number of lines before truncating with ellipsis */
	truncate?: number;
}

/**
 * Typography component for consistent text styling across the app.
 * Provides predefined font sizes, weights, and styling options.
 *
 * @example
 * ```tsx
 * <Typography font="Poppins_700Bold" size="title" color="#000">
 *   Video Title
 * </Typography>
 *
 * <Typography size="body" truncate={1}>
 *   Long description that truncates after 1 line...
 * </Typography>
 *
 * <Typography size="section" align="center" underline>
 *   Section Header
 * </Typography>
 * ```
 *
 * Available sizes:
 * - title: 22px, for main headings
 * - section: 18px, for section headers
 * - body: 13px, for body text
 * - largeButton: 16px, for button labels
 * - smallButton: 10px, for small button labels
 * - largeVideoTitle: 15px, for large video card titles
 * - smallVideoTitle: 12px, for small video card titles
 * - label: 12px, for form labels
 * - small: 10px, for small text
 * - radio: 14px, for radio button labels
 * - timeStamp: 10px, for video timestamps
 */
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
	smallButton: {
		fontSize: 10,
		lineHeight: 12,
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
	timeStamp: {
		fontSize: 10,
		lineHeight: 12,
		letterSpacing: 0.01,
	},
});
