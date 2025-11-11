/**
 * Application color palette.
 * Contains all primary colors used throughout the app for consistent theming.
 */
export const COLORS = {
	/** Primary background color - muted blue-gray (#8D99AE) */
	backgroundPrimary: '#8D99AE',
	/** Secondary background color - white (#fff) */
	backgroundSecondary: '#fff',
	/** Primary foreground/text color - dark blue-gray (#2B2D42) */
	foregroundPrimary: '#2B2D42',
	/** Secondary foreground/text color - white (#fff) */
	foregroundSecondary: '#fff',
	/** Progress bar fill color - red (#C71F1F) */
	progressBar: '#C71F1F',
	/** Progress bar background/track color - light gray (#C8C8C8) */
	progressBarBackground: '#C8C8C8',
};

/**
 * Converts a hex color to hexa (hex with alpha channel) format.
 * Adds an alpha transparency value to a hex color code.
 *
 * @param color - The hex color string (e.g., '#8D99AE' or '8D99AE')
 * @param alpha - The alpha/opacity value between 0 (transparent) and 1 (opaque)
 * @returns The color with alpha channel appended in hex format (e.g., '#8D99AE80' for 50% opacity)
 *
 * @example
 * ```tsx
 * hexa('#8D99AE', 0.5)  // Returns '#8D99AE80' (50% opacity)
 * hexa('#FFFFFF', 0.1)  // Returns '#FFFFFF1A' (10% opacity)
 * hexa('#000000', 1.0)  // Returns '#000000FF' (fully opaque)
 * ```
 *
 * Note: Alpha values outside 0-1 range are automatically clamped to valid bounds.
 */
export function hexa(color: string, alpha: number) {
	alpha = Math.min(Math.max(0, alpha), 1);
	return (
		color +
		Math.round(alpha * 255)
			.toString(16)
			.padStart(2, '0')
	);
}
