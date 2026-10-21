/* ============================================================================
 * NAVIGATION
 * ----------------------------------------------------------------------------
 * Two defects of the legacy site are fixed structurally here:
 *
 *   1. "Produits et services" and "Evenements" pointed at the SAME page. They are
 *      separate destinations with separate content, and the products entry now
 *      owns the mega-menu.
 *   2. Product pages were reachable only from a right-hand link list that
 *      repeated on every page. They now live in the mega-menu, ordered by
 *      commercial importance (matching `PRODUCTS`), with the CMV range grouped
 *      apart from chicks / feed / slaughter because that is how the business
 *      actually sells them.
 *
 * `href` values are LOCALE-LESS on purpose: the locale-aware `Link` from
 * `@/lib/i18n/navigation` adds the /fr | /ar | /en prefix. Writing the prefix here
 * would double it and break the switcher's path preservation.
 * ========================================================================= */

import { PRODUCTS, PRODUCT_FAMILIES, productPath, type ProductFamily } from './products';
import type { Localized } from './types';

export interface NavChild {
  readonly id: string;
  readonly href: string;
  readonly label: Localized;
  readonly description?: Localized;
}

export interface NavGroup {
  readonly id: string;
  readonly label: Localized;
  readonly children: readonly NavChild[];
}

export interface NavItem {
  readonly id: string;
  readonly href: string;
  readonly label: Localized;
  /** Present ⇒ renders a mega-menu (desktop) / collapsible group (mobile). */
  readonly groups?: readonly NavGroup[];
  /** The single call to action that is always present. */
  readonly cta?: boolean;
}

const familyLabel = (family: ProductFamily): Localized => {
  const meta = PRODUCT_FAMILIES.find((entry) => entry.id === family);
  if (!meta) throw new Error(`[nav] unknown product family: ${family}`);
  return meta.label;
};

const productChildren = (family: ProductFamily): readonly NavChild[] =>
  PRODUCTS.filter((product) => product.family === family).map((product) => ({
    id: product.slug,
    href: productPath(product.slug),
    label: product.name,
    description: product.target,
  }));

export const NAV_PRIMARY: readonly NavItem[] = [
  {
    id: 'welcome',
    href: '/bienvenue',
    label: { fr: 'Bienvenue', ar: 'مرحبًا بكم', en: 'Welcome' },
  },
  {
    id: 'about',
    href: '/a-propos',
    label: {
      fr: "Présentation de l'entreprise",
      ar: 'تقديم المؤسسة',
      en: 'Company Presentation',
    },
  },
  {
    id: 'home',
    href: '/',
    label: { fr: "Vue d'ensemble", ar: 'نظرة عامة', en: 'Overview' },
  },
  {
    id: 'products',
    href: '/produits',
    label: { fr: 'Produits et services', ar: 'المنتجات والخدمات', en: 'Products & services' },
    groups: [
      {
        id: 'other',
        label: { fr: 'Couvoir & Aliments', ar: 'المفقس والأعلاف', en: 'Hatchery & Feed' },
        children: [...productChildren('chicks'), ...productChildren('feed')],
      },
      {
        id: 'cmv',
        label: familyLabel('cmv'),
        children: productChildren('cmv'),
      },
    ],
  },
  {
    id: 'expertise',
    href: '/expertise',
    label: { fr: 'Expertise technique', ar: 'الخبرة التقنية', en: 'Technical expertise' },
  },
  {
    id: 'events',
    href: '/evenements',
    label: { fr: 'Événements', ar: 'الأحداث', en: 'Events' },
  },
  {
    id: 'gallery',
    href: '/galerie',
    label: { fr: 'Galerie', ar: 'معرض الصور', en: 'Gallery' },
  },
];

export const NAV_SECONDARY: readonly NavItem[] = [
  {
    id: 'contact',
    href: '/contact',
    label: { fr: 'Contact', ar: 'اتصل بنا', en: 'Contact' },
    cta: true,
  },
];

export const ALL_NAV_ITEMS: readonly NavItem[] = [...NAV_PRIMARY, ...NAV_SECONDARY];

/** Footer link columns. Kept here so a route can never be orphaned from the nav. */
export const FOOTER_COLUMNS: readonly NavGroup[] = [
  {
    id: 'products',
    label: { fr: 'Nos produits', ar: 'منتجاتنا', en: 'Our products' },
    children: PRODUCTS.map((product) => ({
      id: product.slug,
      href: productPath(product.slug),
      label: product.name,
    })),
  },
  {
    id: 'company',
    label: { fr: 'La maison VOLAGRO', ar: 'مؤسسة فولاغرو', en: 'The VOLAGRO house' },
    children: [
      {
        id: 'about',
        href: '/a-propos',
        label: {
          fr: "Présentation de l'entreprise",
          ar: 'تقديم المؤسسة',
          en: 'Company Presentation',
        },
      },
      {
        id: 'expertise',
        href: '/expertise',
        label: { fr: 'Expertise technique', ar: 'الخبرة التقنية', en: 'Technical expertise' },
      },
      {
        id: 'events',
        href: '/evenements',
        label: { fr: 'Événements', ar: 'الأحداث', en: 'Events' },
      },
      {
        id: 'gallery',
        href: '/galerie',
        label: { fr: 'Galerie', ar: 'معرض الصور', en: 'Gallery' },
      },
    ],
  },
  {
    id: 'legal',
    label: { fr: 'Informations', ar: 'معلومات', en: 'Information' },
    children: [
      {
        id: 'contact',
        href: '/contact',
        label: { fr: 'Contact et devis', ar: 'الاتصال والتسعيرة', en: 'Contact & quotes' },
      },
      {
        id: 'legal-notice',
        href: '/mentions-legales',
        label: { fr: 'Mentions légales', ar: 'معلومات قانونية', en: 'Legal notice' },
      },
    ],
  },
];
