/* ============================================================================
 * WELCOME / INTRO SCREEN
 * ----------------------------------------------------------------------------
 * The landing experience shown at `/<locale>/bienvenue/`, before the home page.
 * Copy is authored in all three locales; no literal ever lives in the component.
 * ========================================================================= */

import type { Localized } from './types';

export const WELCOME = {
  greeting: {
    fr: 'Bienvenue',
    ar: 'مرحبًا بكم',
    en: 'Welcome',
  },
  /**
   * Two sentences, deliberately: identity + what the company does, then the
   * TECHNA partnership. Longer blurbs belong on the About page, not here.
   */
  intro: {
    fr: "Fondée en 1998, SARL VOLAGRO est une entreprise familiale spécialisée dans la fabrication d'aliments et la production de poussins d'un jour, avec une capacité de 20 000 000 de poussins par an. Depuis 2018, elle s'appuie sur son partenariat avec le groupe TECHNA France pour son expertise en nutrition et en zootechnie.",
    ar: 'تأسّست شركة SARL VOLAGRO سنة 1998، وهي مؤسسة عائلية متخصصة في صناعة الأعلاف وإنتاج الكتاكيت عمر يوم واحد بطاقة تبلغ 20 000 000 كتكوت سنويًا. ومنذ 2018، تعتمد على شراكة مع مجمع TECHNA الفرنسي في مجال التغذية وعلم تربية الحيوان.',
    en: 'Founded in 1998, SARL VOLAGRO is a family-owned company specialising in feed manufacturing and day-old chick production, with a capacity of 20,000,000 chicks per year. Since 2018 it has relied on its partnership with the TECHNA France group for nutrition and zootechnics expertise.',
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
