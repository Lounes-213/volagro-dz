'use client';

import { useEffect, useState } from 'react';

import { IDENTITY, PRIMARY_PHONE, SITE_ADDRESS } from '@content/company';
import { CONTACTS, WHATSAPP_TARGET } from '@content/contacts';
import { pick } from '@content/types';
import { Glyph } from '@/components/icons/Glyph';
import { telHref, whatsappHref } from '@/lib/contact-links';
import type { Locale } from '@/lib/i18n/config';

export const CallChoiceModal = ({ locale }: { readonly locale: Locale }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    window.addEventListener('volagro:open-call-choice', onOpen);
    return () => window.removeEventListener('volagro:open-call-choice', onOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sales = CONTACTS.find((contact) => contact.id === 'sales');
  const technical = CONTACTS.find((contact) => contact.id === 'technical');

  const modalTitle = pick(
    {
      fr: 'Numéros et contacts directs',
      ar: 'أرقام الاتصال المباشر',
      en: 'Direct phone lines',
    },
    locale,
  );

  const modalSubtitle = pick(
    {
      fr: 'Lignes directes : Ventes, Standard et Assistance technique.',
      ar: 'الخطوط المباشرة: المبيعات، الهاتف الثابت والمرافقة التقنية.',
      en: 'Direct lines: Sales, Switchboard and Technical Support.',
    },
    locale,
  );

  const closeLabel = pick(
    {
      fr: 'Fermer',
      ar: 'إغلاق',
      en: 'Close',
    },
    locale,
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="call-modal-title"
      className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Dialog Card - compact mobile view matching mobile menu sheet */}
      <div className="relative w-full max-w-lg rounded-t-xl sm:rounded-card bg-surface-raised border border-line p-4 sm:p-6 md:p-8 shadow-card z-10 max-h-[85vh] sm:max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3.5 sm:pb-5 border-b border-line">
          <div>
            <p className="eyebrow marker text-[11px] sm:text-xs">
              <span className="marker-tick" aria-hidden="true" />
              <span>{IDENTITY.wordmark} · {pick(IDENTITY.headOffice, locale)}</span>
            </p>
            <h2 id="call-modal-title" className="text-xl sm:text-2xl md:text-d3 font-display mt-1 sm:mt-2 text-ink">
              {modalTitle}
            </h2>
            <p className="text-ink-muted text-xs sm:text-sm mt-0.5 sm:mt-1 leading-snug">
              {modalSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="tap flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-sm border border-line text-ink-muted hover:text-ink hover:border-line-strong hover:bg-surface-sunken transition-colors"
            aria-label={closeLabel}
          >
            <Glyph name="close" size={18} />
          </button>
        </div>

        {/* Department Lines Directory */}
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          {/* Department 1: Gestion des ventes (WhatsApp & Mobile direct) */}
          <div className="rounded-sm sm:rounded-card border border-line p-3.5 sm:p-5 bg-surface hover:border-line-strong transition-colors">
            <div className="flex items-center justify-between gap-2">
              <span className="eyebrow text-accent text-[11px] sm:text-xs">
                {pick(
                  { fr: 'Gestion des ventes & Devis', ar: 'إدارة المبيعات والتسعيرة', en: 'Sales & Quotes' },
                  locale,
                )}
              </span>
            </div>

            <div className="mt-2 sm:mt-3">
              <div className="text-[11px] sm:text-xs text-ink-subtle">
                {pick({ fr: 'Responsable', ar: 'المسؤولة', en: 'Manager' }, locale)} :{' '}
                <span className="text-ink font-medium">
                  {pick(sales?.person?.name ?? { fr: 'Ghenima Naït Laziz', ar: 'غنيمة نايت لعزيز', en: 'Ghenima Naït Laziz' }, locale)}
                </span>
              </div>
              <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-ink tracking-tight tnum mt-0.5 sm:mt-1">
                {WHATSAPP_TARGET.display}
              </div>
              <p className="text-ink-muted text-[11px] sm:text-xs leading-snug mt-1 mb-3 sm:mb-4">
                {pick(
                  {
                    fr: 'Commandes de poussins d’un jour, prémélanges CMV, aliments et devis rapides.',
                    ar: 'طلبات الكتاكيت عمر يوم واحد، مكملات CMV، الأعلاف والتسعيرة الفورية.',
                    en: 'Day-old broiler chicks, CMV premixes, feed orders and quick quotes.',
                  },
                  locale,
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={whatsappHref(WHATSAPP_TARGET, {
                  message: 'Bonjour VOLAGRO, je souhaite demander des informations et un devis.',
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="tap inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-sm bg-green-700 hover:bg-green-800 active:bg-green-900 text-white font-medium text-xs sm:text-sm h-9 sm:h-11 px-2.5 sm:px-4 shadow-sm transition-colors"
              >
                <Glyph name="whatsapp" size={17} />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${WHATSAPP_TARGET.e164}`}
                onClick={() => setIsOpen(false)}
                className="tap inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-sm border border-line-strong text-ink hover:border-accent hover:text-accent font-medium text-xs sm:text-sm h-9 sm:h-11 px-2.5 sm:px-4 transition-colors"
              >
                <Glyph name="phone" size={15} />
                <span>{pick({ fr: 'Appel direct', ar: 'اتصال مباشر', en: 'Direct call' }, locale)}</span>
              </a>
            </div>
          </div>

          {/* Department 2: Standard Usine & Siège (Tala Athmane) */}
          <div className="rounded-sm sm:rounded-card border border-line p-3.5 sm:p-5 bg-surface hover:border-line-strong transition-colors">
            <div className="flex items-center justify-between gap-2">
              <span className="eyebrow text-ink-subtle text-[11px] sm:text-xs">
                {pick(
                  { fr: 'Standard Usine & Siège', ar: 'المقر الرئيسي والمصنع', en: 'Factory & Head Office' },
                  locale,
                )}
              </span>
              <span className="text-[11px] sm:text-xs text-ink-subtle">
                Tala Athmane
              </span>
            </div>
            <p className="text-ink-muted text-[11px] sm:text-xs leading-snug mt-1 mb-2.5 sm:mb-3">
              {pick(
                {
                  fr: 'Accueil général, administration, partenaires et fournisseurs.',
                  ar: 'الاستقبال العام، الإدارة، الموردون والشركاء.',
                  en: 'General switchboard, administration and suppliers.',
                },
                locale,
              )}
            </p>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={telHref(PRIMARY_PHONE)}
                onClick={() => setIsOpen(false)}
                className="tap flex items-center justify-between p-2.5 sm:p-3.5 rounded-sm border border-line bg-surface-raised hover:border-accent hover:text-accent group transition-colors"
              >
                <div>
                  <span className="eyebrow block text-ink-subtle text-[10px] sm:text-xs">
                    {pick({ fr: 'Ligne 1', ar: 'الخط 1', en: 'Line 1' }, locale)}
                  </span>
                  <span className="font-display text-sm sm:text-base md:text-lg font-bold text-ink group-hover:text-accent tnum block mt-0.5">
                    {PRIMARY_PHONE.display}
                  </span>
                </div>
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xs border border-line text-ink-subtle group-hover:border-accent group-hover:text-accent group-hover:bg-accent-soft transition-colors ms-1">
                  <Glyph name="phone" size={14} />
                </span>
              </a>

              <a
                href="tel:+21326441871"
                onClick={() => setIsOpen(false)}
                className="tap flex items-center justify-between p-2.5 sm:p-3.5 rounded-sm border border-line bg-surface-raised hover:border-accent hover:text-accent group transition-colors"
              >
                <div>
                  <span className="eyebrow block text-ink-subtle text-[10px] sm:text-xs">
                    {pick({ fr: 'Ligne 2', ar: 'الخط 2', en: 'Line 2' }, locale)}
                  </span>
                  <span className="font-display text-sm sm:text-base md:text-lg font-bold text-ink group-hover:text-accent tnum block mt-0.5">
                    026 44 18 71
                  </span>
                </div>
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xs border border-line text-ink-subtle group-hover:border-accent group-hover:text-accent group-hover:bg-accent-soft transition-colors ms-1">
                  <Glyph name="phone" size={14} />
                </span>
              </a>
            </div>
          </div>

          {/* Department 3: Direction Technique & Suivi Zootechnique */}
          <div className="rounded-sm sm:rounded-card border border-line p-3.5 sm:p-5 bg-surface hover:border-line-strong transition-colors">
            <div className="flex items-center justify-between gap-2">
              <span className="eyebrow text-ink-subtle text-[11px] sm:text-xs">
                {pick(
                  { fr: 'Assistance Technique TECHNA', ar: 'المرافقة التقنية ودعم TECHNA', en: 'Technical Support TECHNA' },
                  locale,
                )}
              </span>
              <span className="text-[11px] sm:text-xs text-ink-subtle">
                DTC
              </span>
            </div>
            <div className="text-[11px] sm:text-xs text-ink-subtle mt-0.5 sm:mt-1">
              {pick({ fr: 'Direction technique', ar: 'الإدارة التقنية', en: 'Technical department' }, locale)} :{' '}
              <span className="text-ink font-medium">
                {pick(technical?.person?.name ?? { fr: 'Hakim Arbouch', ar: 'حكيم أربوش', en: 'Hakim Arbouch' }, locale)}
              </span>
            </div>
            <p className="text-ink-muted text-[11px] sm:text-xs leading-snug mt-1 mb-2.5 sm:mb-3">
              {pick(
                {
                  fr: 'Formulations nutritionnelles, accompagnement d’élevage et appui zootechnique.',
                  ar: 'التركيبات الغذائية، متابعة مزارع التربية والدعم الحيواني المتخصص.',
                  en: 'Nutritional formulations, farm visits and zootechnical backing.',
                },
                locale,
              )}
            </p>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+213770492675"
                onClick={() => setIsOpen(false)}
                className="tap flex items-center justify-between p-2.5 sm:p-3.5 rounded-sm border border-line bg-surface-raised hover:border-accent hover:text-accent group transition-colors"
              >
                <div>
                  <span className="eyebrow block text-ink-subtle text-[10px] sm:text-xs">
                    {pick({ fr: 'Technique 1', ar: 'التقني 1', en: 'Tech 1' }, locale)}
                  </span>
                  <span className="font-display text-sm sm:text-base md:text-lg font-bold text-ink group-hover:text-accent tnum block mt-0.5">
                    0770 49 26 75
                  </span>
                </div>
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xs border border-line text-ink-subtle group-hover:border-accent group-hover:text-accent group-hover:bg-accent-soft transition-colors ms-1">
                  <Glyph name="phone" size={14} />
                </span>
              </a>

              <a
                href="tel:+213661052209"
                onClick={() => setIsOpen(false)}
                className="tap flex items-center justify-between p-2.5 sm:p-3.5 rounded-sm border border-line bg-surface-raised hover:border-accent hover:text-accent group transition-colors"
              >
                <div>
                  <span className="eyebrow block text-ink-subtle text-[10px] sm:text-xs">
                    {pick({ fr: 'Technique 2', ar: 'التقني 2', en: 'Tech 2' }, locale)}
                  </span>
                  <span className="font-display text-sm sm:text-base md:text-lg font-bold text-ink group-hover:text-accent tnum block mt-0.5">
                    0661 05 22 09
                  </span>
                </div>
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xs border border-line text-ink-subtle group-hover:border-accent group-hover:text-accent group-hover:bg-accent-soft transition-colors ms-1">
                  <Glyph name="phone" size={14} />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-line flex items-center justify-between gap-2 text-[11px] sm:text-xs text-ink-muted">
          <div className="inline-flex items-center gap-1.5 truncate">
            <Glyph name="pin" size={13} className="text-accent shrink-0" />
            <span className="truncate">{pick(SITE_ADDRESS.city, locale)} · {IDENTITY.legalName}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="tap font-medium text-accent hover:underline shrink-0"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
