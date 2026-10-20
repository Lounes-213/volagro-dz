/* ============================================================================
 * INTERFACE STRINGS
 * ----------------------------------------------------------------------------
 * Every label rendered by a component lives here, in all three languages. A
 * literal in JSX is a string that exists in one language only — this file is what
 * makes that impossible to ship by accident.
 * ========================================================================= */

import type { Localized } from './types';

export const UI = {
  /* ── Actions ─────────────────────────────────────────────────────────────── */
  requestQuote: {
    fr: 'Demander un devis',
    ar: 'اطلب تسعيرة',
    en: 'Request a quote',
  },
  callNow: { fr: 'Appeler maintenant', ar: 'اتصل الآن', en: 'Call now' },
  whatsapp: { fr: 'WhatsApp', ar: 'واتساب', en: 'WhatsApp' },
  seeSheet: { fr: 'Voir la fiche', ar: 'عرض البطاقة', en: 'View the sheet' },
  seeAllProducts: {
    fr: 'Voir tous les produits',
    ar: 'كل المنتجات',
    en: 'See all products',
  },
  seeAll: { fr: 'Tout voir', ar: 'عرض الكل', en: 'See all' },
  readMore: { fr: 'En savoir plus', ar: 'المزيد', en: 'Read more' },
  directions: { fr: 'Itinéraire', ar: 'الاتجاهات', en: 'Get directions' },
  understand: { fr: 'Comprendre', ar: 'تعرّف', en: 'Learn more' },

  /* ── Section markers ─────────────────────────────────────────────────────── */
  ourRange: { fr: 'Notre gamme', ar: 'منتجاتنا', en: 'Our range' },
  theCompany: { fr: "L'entreprise", ar: 'المؤسسة', en: 'The company' },
  gallery: { fr: 'Galerie', ar: 'معرض الصور', en: 'Gallery' },
  latestNews: { fr: 'Actualités', ar: 'المستجدات', en: 'Latest news' },
  contact: { fr: 'Contact', ar: 'الاتصال', en: 'Contact' },
  menu: { fr: 'Menu', ar: 'القائمة', en: 'Menu' },
  close: { fr: 'Fermer', ar: 'إغلاق', en: 'Close' },
  openMenu: { fr: 'Ouvrir le menu', ar: 'فتح القائمة', en: 'Open the menu' },
  language: { fr: 'Langue', ar: 'اللغة', en: 'Language' },
  skipToContent: {
    fr: 'Aller au contenu principal',
    ar: 'الانتقال إلى المحتوى',
    en: 'Skip to main content',
  },
  backToTop: { fr: 'Haut de page', ar: 'أعلى الصفحة', en: 'Back to top' },

  /* ── Home sections ───────────────────────────────────────────────────────── */
  keyFiguresTitle: {
    fr: 'Une entreprise, quatre repères',
    ar: 'مؤسسة بأربعة أرقام',
    en: 'One company, four figures',
  },
  chainEyebrow: { fr: 'Chaîne intégrée', ar: 'سلسلة متكاملة', en: 'Integrated chain' },
  chainTitle: {
    fr: 'De l’accouvage à la nutrition, une expertise maîtrisée',
    ar: 'من المفقس إلى التغذية، خبرة متكاملة',
    en: 'From hatchery to nutrition, master expertise',
  },
  chainBody:
  {
    fr: "Chaque maillon clé de la filière avicole est géré par les équipes VOLAGRO. Depuis les œufs à couver issus de nos centres d'élevage à Aïn Oussara, des poussins d’un jour de haute qualité sont produits au niveau de notre couvoir de Tala Athmane dans le respect des règles irréprochables de bio-sécurité.\n\n L’aliment destiné à l'autoconsommation, ainsi que les prémélanges (CMV) sont fabriqués dans nos unités et bénéficient de l’accompagnement de nos equipes technechosanitaire.",

    ar: "تتولى فرق فولاغرو إدارة كل حلقة أساسية من سلسلة الإنتاج الداجني. فمن بيض التفريخ إلى الفقس، ينتج مفقسنا بعين وسارة كتاكيت عمر يوم واحد ذات جودة عالية. كما يُنتَج العلف والمخاليط الأولية (CMV) في وحداتنا الصناعية المتطورة، وتستفيد المزارع من مرافقة فريقنا التقني المتخصص.",

    en: "Every key link in the poultry production chain is managed by VOLAGRO teams. From hatching eggs produced in our hatching center in Ain Oussara, we produce high-quality day-old chicks. Feed and premixes (CMV) are manufactured in our state-of-the-art industrial facilities, while poultry farms receive support from our technical team."
  },

  cmvTitle: {
    fr: 'Une gamme complète, de l’accouvage à la nutrition',
    ar: 'مجموعة شاملة، من التفريخ إلى التغذية',
    en: 'A complete range, from hatchery to nutrition',
  },
  cmvBody: {
    fr: "Poussins d'un jour certifiés, aliments composés et prémélanges CMV formulés avec l'expertise TECHNA.",
    ar: 'كتاكيت عمر يوم معتمدة، أعلاف مركّبة ومكمّلات CMV بخبرة TECHNA.',
    en: 'Certified day-old chicks, compound feed and CMV premixes formulated with TECHNA expertise.',
  },
  technaEyebrow: { fr: 'Partenariat', ar: 'شراكة', en: 'Partnership' },
  timelineEyebrow: { fr: 'Notre histoire', ar: 'تاريخنا', en: 'Our story' },
  timelineTitle: {
    fr: "Trois dates qui expliquent l'entreprise",
    ar: 'ثلاث محطّات تشرح المؤسسة',
    en: 'Three dates that explain the company',
  },
  visitUs: {
    fr: 'Passez nous voir',
    ar: 'زوروا مقرّنا',
    en: 'Come and see us',
  },

  /* ── Contact band ────────────────────────────────────────────────────────── */
  contactBandTitle: {
    fr: 'Un besoin précis ? Parlons-en.',
    ar: 'لديكم حاجة محدّدة؟ لنتحدّث.',
    en: 'A specific need? Let’s talk.',
  },
  contactBandBody: {
    fr: 'Ventes, poussins, prémélanges ou accompagnement technique : choisissez le bon interlocuteur, ou envoyez-nous directement votre demande.',
    ar: 'المبيعات، الكتاكيت، الـ CMV أو المتابعة التقنية: اختاروا الجهة المناسبة أو أرسلوا طلبكم مباشرة.',
    en: 'Sales, chicks, premixes or technical support: pick the right contact, or send us your request directly.',
  },
  technical: { fr: 'Technique', ar: 'تقني', en: 'Technical' },
  sales: { fr: 'Ventes', ar: 'المبيعات', en: 'Sales' },
  partner: { fr: 'Partenaire', ar: 'الشريك', en: 'Partner' },
  area: { fr: 'Domaine', ar: 'المجال', en: 'Area' },
  everything: { fr: 'Tout voir', ar: 'عرض الكل', en: 'See everything' },
} as const satisfies Record<string, Localized>;

export type UIKey = keyof typeof UI;
