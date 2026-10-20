/* ============================================================================
 * TIMELINE — 1998 → 2018 → 2022
 * ----------------------------------------------------------------------------
 * Three milestones were supplied. Three are published. The brief's silence on
 * anything else is honoured: no filler entries, no "the story continues" prose.
 * ========================================================================= */

import type { Localized } from './types';

export interface Milestone {
  readonly id: string;
  readonly year: number;
  /** Short label rendered on the scroll-linked axis. */
  readonly kicker: Localized;
  readonly title: Localized;
  readonly body: Localized;
  /** The one milestone that carries a headline figure, rendered oversized. */
  readonly figure?: { readonly value: number; readonly suffix: Localized };
}

export const TIMELINE: readonly Milestone[] = [
  {
    id: 'creation',
    year: 1998,
    kicker: { fr: 'Création', ar: 'التأسيس', en: 'Founded' },
    title: {
      fr: 'Naissance de VOLAGRO à Tizi-Ouzou',
      ar: 'ميلاد فولاغرو بتيزي وزو',
      en: 'VOLAGRO is founded in Tizi-Ouzou',
    },
    body: {
      fr: "Une entreprise familiale spécialisée dans la fabrication d'aliments et la production de poussins d'un jour pour poulets de chair, avec une capacité de 20 000 000 de poussins par an.",
      ar: 'مؤسسة عائلية متخصصة في صناعة الأعلاف وإنتاج الكتاكيت عمر يوم واحد لدجاج اللحم، بطاقة إنتاجية تبلغ 20 000 000 كتكوت سنويًا.',
      en: 'A family-owned company specialising in feed manufacturing and the production of day-old broiler chicks, with a capacity of 20,000,000 chicks per year.',
    },
    figure: {
      value: 20_000_000,
      suffix: { fr: 'poussins/an', ar: 'كتكوت/سنة', en: 'chicks/year' },
    },
  },
  {
    id: 'techna',
    year: 2018,
    kicker: { fr: 'Partenariat', ar: 'شراكة', en: 'Partnership' },
    title: {
      fr: 'Partenariat avec le Groupe TECHNA FRANCE',
      ar: 'شراكة مع مجمع TECHNA الفرنسي',
      en: 'Partnership with the TECHNA FRANCE Group',
    },
    body: {
      fr: 'VOLAGRO conclut un partenariat avec TECHNA pour bénéficier de son expertise en nutrition et zootechnie.',
      ar: 'أبرمت فولاغرو شراكة مع TECHNA للاستفادة من خبرته في التغذية وعلم تربية الحيوان.',
      en: 'VOLAGRO enters a partnership with TECHNA to draw on its expertise in nutrition and zootechnics.',
    },
  },
  {
    id: 'unites',
    year: 2022,
    kicker: { fr: 'Industrialisation', ar: 'التصنيع', en: 'Industrialisation' },
    title: {
      fr: 'Unité industrielle de prémélanges (CMV)',
      ar: 'وحدة إنتاج الـ CMV الحديثة',
      en: 'Industrial premix unit (CMV)',
    },
    body: {
      fr: "Inauguration d'une unité de production industrielle de prémélanges minéraux et vitaminés (CMV) d'une capacité de 5 000 tonnes par an à Tala Athmane.",
      ar: 'تدشين وحدة صناعية حديثة لإنتاج مكملات الـ CMV بطاقة 5000 طن سنويًا بمنطقة النشاط تالة عثمان.',
      en: 'Commissioning of an industrial CMV premix production unit with an annual capacity of 5,000 tonnes in Tala Athmane.',
    },
    figure: {
      value: 5_000,
      suffix: { fr: 'tonnes/an', ar: 'طن/سنة', en: 'tonnes/year' },
    },
  },
];
