import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Class-name composer. `clsx` handles conditionals, `twMerge` resolves
 * conflicting Tailwind utilities so callers can override a variant's classes
 * without `!important` (e.g. `<Button className="bg-charcoal-800">`).
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
