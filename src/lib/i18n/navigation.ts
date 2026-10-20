import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

/**
 * Locale-aware navigation primitives.
 *
 * Always import `Link` from here — never from `next/link`. A bare `next/link`
 * silently drops the locale prefix, which is how bilingual sites end up with
 * half their Arabic pages linking into French ones.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
