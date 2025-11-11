import { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button } from '@/components/ui/button';
import type { RadioOption } from '@/components/ui/radio';
import { RadioGroup } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { COLORS } from '@/utils/colors';

/**
 * Props for the SortingModal component.
 */
interface ModalProps {
	/** Controls modal visibility */
	visible?: boolean;
	/** Callback fired when modal is dismissed (via backdrop tap or close) */
	onClose?: () => void;
	/** Callback fired when user confirms selection with the selected value */
	onSubmit?: (value: string) => void;
	/** Currently selected option value (pre-fills the radio selection) */
	selectedOption: string;
	/** Array of radio button options to display */
	options: RadioOption[];
}

/**
 * Modal component for sorting options selection.
 * Displays a centered modal with radio button options and a confirm button.
 *
 * @example
 * ```tsx
 * const [visible, setVisible] = useState(false);
 * const [sortBy, setSortBy] = useState('viewCount');
 *
 * const options = [
 *   { name: 'Most Views', value: 'viewCount' },
 *   { name: 'Most Recent', value: 'date' },
 *   { name: 'Most Relevant', value: 'relevance' },
 * ];
 *
 * <SortingModal
 *   visible={visible}
 *   selectedOption={sortBy}
 *   options={options}
 *   onSubmit={(value) => {
 *     setSortBy(value);
 *     setVisible(false);
 *   }}
 *   onClose={() => setVisible(false)}
 * />
 * ```
 *
 * Features:
 * - Fade animation on show/hide
 * - Dismissible by tapping backdrop (resets selection)
 * - Confirm button applies the selected value
 * - Centered modal with semi-transparent backdrop
 * - 80% width, 40% height responsive sizing
 */
export function SortingModal({
	visible = false,
	onClose,
	onSubmit,
	selectedOption,
	options,
}: ModalProps) {
	const [selected, setSelected] = useState<string>(selectedOption);

	return (
		<Modal visible={visible} transparent animationType="fade">
			<View
				style={styles.closeable}
				onTouchEnd={() => {
					onClose?.();
					setSelected(selectedOption);
				}}
			/>
			<View style={styles.container}>
				<View style={styles.modal}>
					<View style={styles.content}>
						<Typography
							font="Poppins_600SemiBold"
							size="section"
							color={COLORS.foregroundSecondary}
						>
							Sort records by:
						</Typography>
						<RadioGroup
							options={options}
							selected={selected}
							onValueChange={setSelected}
						/>
					</View>
					<Button
						style={styles.button}
						onPress={() => {
							console.log(selected);
							onSubmit?.(selected);
							onClose?.();
						}}
					>
						<Typography
							font="Poppins_600SemiBold"
							color={COLORS.foregroundSecondary}
							align="center"
							size="radio"
						>
							Confirm
						</Typography>
					</Button>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	closeable: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modal: {
		backgroundColor: COLORS.backgroundPrimary,
		padding: 24,
		borderRadius: 24,
		width: '80%',
		height: '40%',
		justifyContent: 'space-between',
	},
	content: {
		gap: 18,
	},
	button: {
		marginTop: 'auto',
	},
});
