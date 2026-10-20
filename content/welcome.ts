/* ============================================================================
 * WELCOME / INTRO SCREEN
 * ----------------------------------------------------------------------------
 * The landing experience shown at `/<locale>/bienvenue/`, before the home page.
 * Copy is authored in all three locales; no literal ever lives in the component.
 * ========================================================================= */

import type { Localized } from './types';

export const WELCOME = {
  eyebrow: {
    fr: 'Bienvenue chez VOLAGRO',
    ar: 'مرحبًا بكم في فولاغرو',
    en: 'Welcome to VOLAGRO',
  },
  title: {
    fr: "L'expertise de la filière animale, depuis 1998.",
    ar: 'خبرة في شعبة الإنتاج الحيواني منذ 1998.',
    en: 'Animal production expertise since 1998.',
  },
  figuresTitle: {
    fr: 'Quelques repères',
    ar: 'بعض المعالم',
    en: 'A few facts',
  },
  cta: {
    fr: 'Entrer sur le site',
    ar: 'الدخول إلى الموقع',
    en: 'Enter the site',
  },
  clickHint: {
    fr: "Cliquez n'importe où pour continuer",
    ar: 'انقر في أي مكان للمتابعة',
    en: 'Click anywhere to continue',
  },
  autoPrefix: {
    fr: 'Entrée automatique dans',
    ar: 'الدخول التلقائي خلال',
    en: 'Entering automatically in',
  },
  language: {
    fr: 'Langue',
    ar: 'اللغة',
    en: 'Language',
  },
  splashLabel: {
    fr: 'Chargement du site VOLAGRO',
    ar: 'جارٍ تحميل موقع فولاغرو',
    en: 'Loading the VOLAGRO site',
  },
  backgroundAlt: {
    fr: "Œufs et granulés d'aliment dans l'élevage VOLAGRO",
    ar: 'بيض وحبيبات علف من فولاغرو',
    en: 'VOLAGRO eggs and feed pellets',
  },
} as const satisfies Record<string, Localized>;
