// Hook from https://github.com/uidotdev/usehooks
import { useEffect, useState } from 'react';

/**
 * Custom hook that debounces a value by delaying its update.
 * Useful for preventing excessive API calls or expensive operations during user input.
 *
 * @param value - The value to debounce (typically from user input)
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced value that updates after the delay period
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 500);
 *
 * // API call only triggers 500ms after user stops typing
 * useEffect(() => {
 *   if (debouncedSearch) {
 *     searchAPI(debouncedSearch);
 *   }
 * }, [debouncedSearch]);
 * ```
 *
 * How it works:
 * - Sets a timeout when the value changes
 * - Clears previous timeout to reset the delay
 * - Updates the debounced value only after the delay period without changes
 */
export function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}
