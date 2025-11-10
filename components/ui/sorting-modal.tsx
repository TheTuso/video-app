import { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button } from '@/components/ui/button';
import type { RadioOption } from '@/components/ui/radio';
import { RadioGroup } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { COLORS } from '@/utils/colors';

interface ModalProps {
	visible?: boolean;
	onClose?: () => void;
	onSubmit?: (value: string) => void;
	selectedOption: string;
	options: RadioOption[];
}

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
