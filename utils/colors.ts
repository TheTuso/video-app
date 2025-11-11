export const COLORS = {
	backgroundPrimary: '#8D99AE',
	backgroundSecondary: '#fff',
	foregroundPrimary: '#2B2D42',
	foregroundSecondary: '#fff',
	progressBar: '#C71F1F',
	progressBarBackground: '#C8C8C8',
};

// hexa function allows adding alpha to a color to the hex format
export function hexa(color: string, alpha: number) {
	alpha = Math.min(Math.max(0, alpha), 1);
	return (
		color +
		Math.round(alpha * 255)
			.toString(16)
			.padStart(2, '0')
	);
}
