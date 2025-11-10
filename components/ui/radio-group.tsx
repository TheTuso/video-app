import { StyleSheet, View } from 'react-native';
import { Radio, type RadioOption } from '@/components/ui/radio';

interface RadioGroupProps {
	options: RadioOption[];
	selected?: string;
	onValueChange?: (value: string) => void;
}

export function RadioGroup({
	options,
	selected,
	onValueChange,
}: RadioGroupProps) {
	if (selected === undefined) {
		selected = options[0].value;
	}

	return (
		<View style={styles.container}>
			{options.map((option) => (
				<Radio
					key={option.value}
					option={option}
					selected={option.value === selected}
					onSelect={onValueChange}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 16,
	},
});
