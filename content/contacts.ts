/* ============================================================================
 * CONTACTS — one file, nothing hard-coded in components
 * ----------------------------------------------------------------------------
 * Everything here is FLAGGED as reproduced from the legacy site. The brief
 * explicitly asks us to flag it as "to verify": the company email on the old
 * page reads `CMV@volagro.dz.com`, which is not a well-formed domain (a `.dz.com`
 * second-level does not exist), so it must NOT go live unreviewed.
 *
 * `unverifiedFields()` below enumerates every unconfirmed value, so the
 * pre-launch checklist is generated from the data instead of being maintained
 * by hand in a document that drifts.
 * ========================================================================= */

import { flagged, type Flagged, type Localized, type PhoneNumber } from './types';

export type DepartmentId = 'entreprise' | 'technical' | 'sales';

export interface DepartmentContact {
  readonly id: DepartmentId;
  readonly title: Localized;
  /** Department purpose — helps a visitor pick the right door. */
  readonly purpose: Localized;
  readonly person?: {
    readonly name: Localized;
    readonly role: Localized;
    readonly verified: boolean;
  };
  readonly phones: readonly PhoneNumber[];
  readonly email: Flagged<string>;
  /** Exactly what to confirm with the client before launch. */
  readonly toConfirm?: Localized;
}

export const CONTACTS: readonly DepartmentContact[] = [
  {
    id: 'entreprise',
    title: { fr: 'Entreprise', ar: 'المؤسسة', en: 'Company' },
    purpose: {
      fr: 'Siège, fournisseurs, partenariats et demandes administratives.',
      ar: 'المقر، الموردون، الشراكات والطلبات الإدارية.',
      en: 'Head office, suppliers, partnerships and administrative enquiries.',
    },
    phones: [
      {
        e164: '+21326441870',
        display: '026 44 18 70',
        label: { fr: 'Standard', ar: 'الهاتف الرئيسي', en: 'Switchboard' },
      },
      {
        e164: '+21326441871',
        display: '026 44 18 71',
        label: {
          fr: 'Standard (2ᵉ ligne)',
          ar: 'الهاتف الرئيسي (الخط الثاني)',
          en: 'Switchboard (2nd line)',
        },
      },
    ],
    email: flagged('cmv@volagro.dz', false, {
      fr: "L'ancien site affiche « CMV@volagro.dz.com », qui n'est pas un domaine valide. Nous proposons « cmv@volagro.dz » : à confirmer avec le service informatique avant publication, ainsi que l'adresse réellement relevée par le standard.",
      ar: 'يعرض الموقع القديم العنوان « CMV@volagro.dz.com » وهو نطاق غير صحيح. نقترح « cmv@volagro.dz »، ويُرجى تأكيده مع مصلحة الإعلام الآلي قبل النشر.',
      en: 'The legacy site shows "CMV@volagro.dz.com", which is not a valid domain. We propose "cmv@volagro.dz" — to be confirmed with IT before publication, along with the address the switchboard actually uses.',
    }),
    toConfirm: {
      fr: 'Adresse e-mail exacte + domaine définitif, boîte de réception réellement consultée pour les demandes de devis.',
      ar: 'العنوان الإلكتروني الدقيق والنطاق النهائي، مع التأكد من صندوق البريد المُتابَع فعليًا لطلبات التسعيرة.',
      en: 'Exact email address and final domain, plus the inbox that is genuinely monitored for quote requests.',
    },
  },
  {
    id: 'technical',
    title: {
      fr: 'Direction technique — DTC',
      ar: 'الإدارة التقنية — DTC',
      en: 'Technical department — DTC',
    },
    purpose: {
      fr: 'Formulations, accompagnement zootechnique, suivi des élevages et appui TECHNA.',
      ar: 'التركيبات، المتابعة الحيوانية، مرافقة المربّين والدعم التقني لـ TECHNA.',
      en: 'Formulations, zootechnical support, farm monitoring and TECHNA backing.',
    },
    person: {
      name: { fr: 'Hakim Arbouche', ar: 'حكيم أربوش', en: 'Hakim Arbouche' },
      role: { fr: 'Direction technique', ar: 'الإدارة التقنية', en: 'Technical department' },
      verified: false,
    },
    phones: [
      {
        e164: '+213770492675',
        display: '0770 49 26 75',
        label: { fr: 'Mobile', ar: 'هاتف محمول', en: 'Mobile' },
      },
      {
        e164: '+213661052209',
        display: '0661 05 22 09',
        label: { fr: 'Mobile', ar: 'هاتف محمول', en: 'Mobile' },
      },
    ],
    email: flagged('hakimarbouche@volagro.dz', false, {
      fr: "Adresse reprise du site actuel : vérifier l'orthographe (Arbouch / Arbouche) et le domaine.",
      ar: 'العنوان منقول من الموقع الحالي: يُرجى التحقق من كتابة اللقب (أربوش) ومن النطاق.',
      en: 'Address carried over from the current site: verify the spelling (Arbouch / Arbouche) and the domain.',
    }),
    toConfirm: {
      fr: "Intitulé exact de la fonction (« DTC » reste une abréviation interne dont le développement n'a pas été communiqué), numéros actifs, et adresse e-mail professionnelle définitive.",
      ar: 'التسمية الدقيقة للوظيفة (اختصار DTC داخلي ولم تُبلَّغ تسميته الكاملة)، الأرقام الفعّالة، والبريد الإلكتروني النهائي.',
      en: 'Exact job title ("DTC" remains an internal abbreviation whose expansion was never supplied), currently active numbers, and the final work email address.',
    },
  },
  {
    id: 'sales',
    title: { fr: 'Gestion des ventes', ar: 'إدارة المبيعات', en: 'Sales department' },
    purpose: {
      fr: 'Commandes de poussins, de prémélanges et de matières premières, disponibilités et livraisons.',
      ar: 'طلبات الكتاكيت والـ CMV والمواد الأولية، مع التوفر والتسليم.',
      en: 'Orders for chicks, premixes and raw materials, availability and delivery.',
    },
    person: {
      name: { fr: 'Ghenima Naït Laziz', ar: 'غنيمة نايت لعزيز', en: 'Ghenima Naït Laziz' },
      role: { fr: 'Gestion des ventes', ar: 'إدارة المبيعات', en: 'Sales department' },
      verified: false,
    },
    phones: [
      {
        e164: '+213770552328',
        display: '0770 55 23 28',
        label: { fr: 'Mobile', ar: 'هاتف محمول', en: 'Mobile' },
      },
    ],
    email: flagged('ghenimanaitlaziz@volagro.dz', false, {
      fr: "Adresse reprise du site actuel : vérifier l'ordre du nom et le domaine.",
      ar: 'العنوان منقول من الموقع الحالي: يُرجى التحقق من ترتيب الاسم ومن النطاق.',
      en: 'Address carried over from the current site: verify the name order and the domain.',
    }),
    toConfirm: {
      fr: 'Numéros actifs, éventuel second poste au service ventes, et adresse e-mail définitive.',
      ar: 'الأرقام الفعّالة، هل يوجد رقم ثانٍ بمصلحة المبيعات، والبريد الإلكتروني النهائي.',
      en: 'Currently active numbers, whether a second sales line exists, and the final email address.',
    },
  },
];

/* ── WhatsApp ────────────────────────────────────────────────────────────────
 * Target of the quote form's "send on WhatsApp" action. The brief requires the
 * WhatsApp flow but names no number, so we route to the sales mobile and flag it
 * loudly rather than guessing a dedicated business line. */

export const WHATSAPP_TARGET = {
  e164: '+213770552328',
  display: '0770 55 23 28',
  /** Professional WhatsApp (Business) number, if one exists. */
  verified: false,
  note: {
    fr: 'Numéro WhatsApp du formulaire de devis à confirmer : faut-il utiliser le mobile « Gestion des ventes », un compte WhatsApp Business dédié, ou plusieurs destinataires selon le produit ?',
    ar: 'رقم الواتساب الخاص باستمارة طلب التسعيرة ينتظر التأكيد: هل نستعمل رقم إدارة المبيعات، أم حساب WhatsApp Business مخصّص، أم عدة مستلمين حسب المنتج؟',
    en: 'WhatsApp number used by the quote form needs confirming: the sales mobile, a dedicated WhatsApp Business account, or several recipients depending on the product?',
  } satisfies Localized,
} as const;

/* ── Generated pre-launch checklist ─────────────────────────────────────── */

export interface UnverifiedField {
  readonly department: DepartmentId;
  readonly field: 'email' | 'person' | 'phone';
  readonly value: string;
  readonly why: Localized | undefined;
}

/** Derived, never hand-maintained. Drives the QA checklist and dev warnings. */
export const unverifiedFields = (): readonly UnverifiedField[] => {
  const out: UnverifiedField[] = [];
  for (const contact of CONTACTS) {
    if (!contact.email.verified) {
      out.push({
        department: contact.id,
        field: 'email',
        value: contact.email.value,
        why: contact.email.note,
      });
    }
    if (contact.person && !contact.person.verified) {
      out.push({
        department: contact.id,
        field: 'person',
        value: contact.person.name.fr,
        why: contact.toConfirm,
      });
    }
    for (const phone of contact.phones) {
      out.push({
        department: contact.id,
        field: 'phone',
        value: phone.display,
        why: contact.toConfirm,
      });
    }
  }
  if (!WHATSAPP_TARGET.verified) {
    out.push({
      department: 'sales',
      field: 'phone',
      value: WHATSAPP_TARGET.display,
      why: WHATSAPP_TARGET.note,
    });
  }
  return out;
};
