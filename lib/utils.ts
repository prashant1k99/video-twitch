import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const stringToColor = (str: string) => {
	let hash = 0
	let i

	/* eslint-disable no-bitwise */
	for (i = 0; i < str.length; i += 1) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash)
	}

	let color = '#'

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff
		color += `00${value.toString(16)}`.substr(-2)
	}
	/* eslint-enable no-bitwise */

	return color
}
