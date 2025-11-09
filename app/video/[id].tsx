import { useLocalSearchParams } from 'expo-router';
import { Typography } from '@/components/ui/typography';

// TODO: video player
export default function Video() {
	const { id } = useLocalSearchParams();
	return <Typography>Video [{id}]</Typography>;
}
