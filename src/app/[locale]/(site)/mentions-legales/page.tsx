import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { IDENTITY, SITE_ADDRESS, PRIMARY_PHONE } from '@content/company';
import { pick } from '@content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LOCALES, isLocale } from '@/lib/i18n/config';

export function generateStaticParams(): { locale: string }[] {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const titles = {
    fr: 'Mentions Légales & Confidentialité — SARL VOLAGRO',
    ar: 'المعلومات القانونية وسياسة الخصوصية — فولاغرو',
    en: 'Legal Notice & Privacy — SARL VOLAGRO',
  };

  return {
    title: titles[locale],
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const labels = {
    eyebrow: { fr: 'INFORMATIONS LÉGALES', ar: 'المعلومات القانونية', en: 'LEGAL INFORMATION' },
    title: {
      fr: 'Mentions légales & Cadre réglementaire',
      ar: 'المعلومات القانونية والإطار التنظيمي',
      en: 'Legal Notice & Regulatory Framework',
    },
    lead: {
      fr: 'Informations administratives et mentions obligatoires relatives au site institutionnel de la SARL VOLAGRO.',
      ar: 'المعلومات الإدارية والتنظيمية الخاصة بالموقع المؤسساتي لشركة فولاغرو ذات المسؤولية المحدودة.',
      en: 'Administrative and regulatory disclosures concerning the corporate website of SARL VOLAGRO.',
    },
  };

  return (
    <div className="py-12 md:py-16">
      <div className="shell max-w-[50rem]">
        <SectionHeading
          eyebrow={pick(labels.eyebrow, locale)}
          title={pick(labels.title, locale)}
          lead={pick(labels.lead, locale)}
          locale={locale}
        />

        <div className="bg-surface rounded-card border-line mt-12 space-y-8 border p-8 md:p-10 shadow-xs text-sm leading-relaxed text-ink-muted">
          <div>
            <h3 className="font-display text-d4 text-ink mb-2">
              1. Éditeur du site
            </h3>
            <p>
              Le présent site web est édité par la société <strong>{IDENTITY.legalName}</strong>, société à responsabilité limitée de droit algérien, au capital social immatriculé au Centre National du Registre de Commerce (CNRC) de la Wilaya de Tizi-Ouzou.
            </p>
            <ul className="mt-3 space-y-1 list-disc ps-5 text-xs text-ink-subtle">
              <li><strong>Dénomination :</strong> {IDENTITY.legalName}</li>
              <li><strong>Siège social :</strong> {pick(SITE_ADDRESS.full, locale)}</li>
              <li><strong>Téléphone :</strong> {PRIMARY_PHONE.display}</li>
              <li><strong>Activité principale :</strong> Production de prémélanges minéraux et vitaminés (CMV), accouvage et fabrication d’aliments du bétail.</li>
            </ul>
          </div>

          <div className="border-t border-line pt-6">
            <h3 className="font-display text-d4 text-ink mb-2">
              2. Propriété intellectuelle
            </h3>
            <p>
              L’ensemble des contenus graphiques, photographies d’archives, marques, logos et textes publiés sur ce site sont la propriété exclusive de la SARL VOLAGRO ou de ses partenaires (notamment le groupe TECHNA pour les éléments afférents au partenariat). Toute reproduction ou exploitation non autorisée est strictement interdite.
            </p>
          </div>

          <div className="border-t border-line pt-6">
            <h3 className="font-display text-d4 text-ink mb-2">
              3. Protection des données personnelles
            </h3>
            <p>
              Conformément à la loi algérienne relative à la protection des personnes physiques dans le traitement des données à caractère personnel, les informations recueillies via le formulaire de contact ou WhatsApp ne sont destinées qu’au traitement interne des demandes de devis et d’assistance technique de nos clients. Elles ne sont cédées à aucun tiers.
            </p>
          </div>

          <div className="border-t border-line pt-6">
            <h3 className="font-display text-d4 text-ink mb-2">
              4. Droit applicable
            </h3>
            <p>
              Le présent site internet est régi par les lois et règlements en vigueur en République Algérienne Démocratique et Populaire. Tout litige relatif à son utilisation relève de la compétence exclusive des juridictions algériennes territorialement compétentes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
