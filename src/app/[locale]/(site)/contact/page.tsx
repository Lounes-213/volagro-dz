import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CONTACTS, WHATSAPP_TARGET } from '@content/contacts';
import { PRIMARY_PHONE, SITE_ADDRESS } from '@content/company';
import { PRODUCTS } from '@content/products';
import { UI } from '@content/ui';
import { pick } from '@content/types';
import { Glyph } from '@/components/icons/Glyph';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { mapsDirectionsHref, mapsHref, telHref, whatsappHref, mailtoHref } from '@/lib/contact-links';
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
    fr: 'Contact & Devis — SARL VOLAGRO',
    ar: 'الاتصال وطلب التسعيرة — فولاغرو',
    en: 'Contact & Quote — SARL VOLAGRO',
  };

  const descriptions = {
    fr: 'Contactez les équipes commerciale et technique de VOLAGRO à Tizi-Ouzou. Devis rapide, accompagnement zootechnique et commande.',
    ar: 'اتصل بالفريق التجاري والتقني لمؤسسة فولاغرو بتيزي وزو. طلب تسعيرة سريعة ومرافقة تقنية.',
    en: 'Contact VOLAGRO sales and technical teams in Tizi-Ouzou. Fast quotes and technical support.',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const labels = {
    eyebrow: { fr: 'CONTACT & ÉCHANGES', ar: 'الاتصال والتواصل', en: 'CONTACT & INQUIRIES' },
    title: {
      fr: 'Une équipe à votre écoute pour vos élevages',
      ar: 'فريق في خدمتكم لمرافقة مشاريع التربية',
      en: 'A dedicated team serving your farming operations',
    },
    lead: {
      fr: 'Que ce soit pour une commande de prémélanges CMV, une livraison de poussins ou un conseil de formulation nutritionnelle, nos responsables vous répondent rapidement.',
      ar: 'سواء لطلب مكمّلات CMV الغذائية، أو حجز كتاكيت، أو استشارة في تركيب الأعلاف، يتكفل مستشارونا بالرد السريع.',
      en: 'Whether for CMV premixes, chick supply or nutritional formulation advice, our specialists are at your service.',
    },
    formTitle: { fr: 'Formulaire de demande rapide', ar: 'استمارة طلب سريع', en: 'Quick Inquiry Form' },
    formSubtitle: {
      fr: 'Sélectionnez votre filière pour transmettre votre besoin directement à notre équipe via WhatsApp ou Email.',
      ar: 'اختر الشعبة والمنتج لإرسال طلبك مباشرة لفريقنا عبر واتساب أو البريد الإلكتروني.',
      en: 'Select your sector to send your inquiry directly to our team via WhatsApp or Email.',
    },
    nameLabel: { fr: 'Nom ou Raison sociale', ar: 'الاسم أو اسم المؤسسة', en: 'Full Name or Company' },
    phoneLabel: { fr: 'Numéro de téléphone', ar: 'رقم الهاتف', en: 'Phone Number' },
    wilayaLabel: { fr: 'Wilaya / Région', ar: 'الولاية / المنطقة', en: 'Wilaya / Region' },
    productLabel: { fr: 'Produit ou Filière concernée', ar: 'المنتج أو الشعبة المعنية', en: 'Target Product or Sector' },
    messageLabel: { fr: 'Précisions sur votre besoin', ar: 'تفاصيل الطلب أو الاستفسار', en: 'Details of your request' },
    sendWhatsapp: { fr: 'Envoyer directement via WhatsApp', ar: 'إرسال مباشر عبر واتساب', en: 'Send via WhatsApp' },
    orCall: { fr: 'Ou appelez notre standard', ar: 'أو اتصل بمركز الاستقبال', en: 'Or call our switchboard' },
    departments: { fr: 'Nos départements', ar: 'أقسامنا', en: 'Our Departments' },
    locationTitle: { fr: 'Notre implantation', ar: 'مقر المنشآت', en: 'Our Location' },
  };

  return (
    <div className="py-12 md:py-16">
      <div className="shell">
        <SectionHeading
          eyebrow={pick(labels.eyebrow, locale)}
          title={pick(labels.title, locale)}
          lead={pick(labels.lead, locale)}
          locale={locale}
        />

        {/* ── Contact channels grid ────────────────────────────────────────── */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {CONTACTS.map((dept) => (
            <div
              key={dept.id}
              className="bg-surface rounded-card border-line flex flex-col justify-between border p-6 shadow-xs transition-shadow hover:shadow-md"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {pick(dept.title, locale)}
                </div>

                {dept.person ? (
                  <p className="font-display text-d4 mt-4 text-ink">
                    {pick(dept.person.name, locale)}
                  </p>
                ) : null}

                <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                  {pick(dept.purpose, locale)}
                </p>

                <ul className="mt-6 grid gap-2.5">
                  {dept.phones.map((phone) => (
                    <li key={phone.e164}>
                      <a
                        href={telHref(phone)}
                        className="text-ink hover:text-green-700 tnum inline-flex items-center gap-2.5 text-sm font-medium transition-colors"
                      >
                        <Glyph name="phone" size={16} className="text-green-600 shrink-0" />
                        <span>{phone.display}</span>
                        <span className="text-ink-subtle text-xs">({pick(phone.label, locale)})</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={mailtoHref(dept.email.value)}
                      className="text-ink-muted hover:text-green-700 inline-flex items-center gap-2.5 text-sm transition-colors"
                    >
                      <Glyph name="mail" size={16} className="text-green-600 shrink-0" />
                      <span className="break-all">{dept.email.value}</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-8 border-t border-line pt-4">
                <a
                  href={whatsappHref(WHATSAPP_TARGET, {
                    message: `Bonjour VOLAGRO, je souhaite contacter le département ${pick(dept.title, locale)}.`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-700 hover:bg-green-800 text-white inline-flex w-full items-center justify-center gap-2 rounded-sm py-2.5 text-sm font-medium transition-colors shadow-xs"
                >
                  <Glyph name="whatsapp" size={17} />
                  <span>{pick(UI.whatsapp, locale)}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Form & Map Section ───────────────────────────────────────────── */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Quick quote interactive card */}
          <div className="bg-surface rounded-card border-line border p-7 shadow-sm lg:col-span-7 md:p-9">
            <div className="border-b border-line pb-5">
              <div className="border-s-2 border-accent ps-3">
                <h3 className="text-d3 text-ink font-display">
                  {pick(labels.formTitle, locale)}
                </h3>
              </div>
              <p className="text-ink-muted mt-2 text-sm">
                {pick(labels.formSubtitle, locale)}
              </p>
            </div>

            <form
              action="https://wa.me/213770552328"
              method="get"
              target="_blank"
              className="mt-6 grid gap-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-ink block text-xs font-semibold">
                    {pick(labels.nameLabel, locale)}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="ex. Élevage El Baraka"
                    className="border-line focus:border-green-600 focus:ring-green-600/20 mt-1.5 block w-full rounded-sm border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-ink block text-xs font-semibold">
                    {pick(labels.phoneLabel, locale)}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="0770 XX XX XX"
                    className="border-line focus:border-green-600 focus:ring-green-600/20 mt-1.5 block w-full rounded-sm border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="wilaya" className="text-ink block text-xs font-semibold">
                    {pick(labels.wilayaLabel, locale)}
                  </label>
                  <input
                    id="wilaya"
                    name="wilaya"
                    type="text"
                    placeholder="ex. Tizi-Ouzou, Boumerdès..."
                    className="border-line focus:border-green-600 focus:ring-green-600/20 mt-1.5 block w-full rounded-sm border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="product" className="text-ink block text-xs font-semibold">
                    {pick(labels.productLabel, locale)}
                  </label>
                  <select
                    id="product"
                    name="product"
                    className="border-line focus:border-green-600 focus:ring-green-600/20 mt-1.5 block w-full rounded-sm border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {pick(p.name, locale)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="text-ink block text-xs font-semibold">
                  {pick(labels.messageLabel, locale)}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Quantité souhaitée, type d'animaux, période de livraison..."
                  className="border-line focus:border-green-600 focus:ring-green-600/20 mt-1.5 block w-full rounded-sm border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition"
                />
              </div>

              <div className="pt-2">
                <a
                  href={whatsappHref(WHATSAPP_TARGET, {
                    message: "Bonjour VOLAGRO, je souhaite obtenir un devis pour vos produits d'alimentation animale.",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-700 hover:bg-green-800 text-white inline-flex w-full items-center justify-center gap-2 rounded-sm py-3 text-sm font-semibold transition-all shadow-sm"
                >
                  <Glyph name="whatsapp" size={19} />
                  <span>{pick(labels.sendWhatsapp, locale)}</span>
                </a>
                <p className="text-ink-subtle mt-3 text-center text-xs">
                  {pick(labels.orCall, locale)} :{' '}
                  <a href={telHref(PRIMARY_PHONE)} className="text-green-700 font-medium underline">
                    {PRIMARY_PHONE.display}
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Interactive Map & Site Info */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            <div className="bg-surface rounded-card border-line border p-6 shadow-xs">
              <h4 className="font-display text-d4 text-ink flex items-center gap-2">
                <Glyph name="pin" size={18} className="text-green-600 shrink-0" />
                <span>{pick(labels.locationTitle, locale)}</span>
              </h4>
              <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                {pick(SITE_ADDRESS.full, locale)}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={mapsHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-line hover:border-green-600 hover:text-green-700 text-ink inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-xs font-medium transition"
                >
                  <Glyph name="pin" size={14} className="text-green-600" />
                  <span>Google Maps ↗</span>
                </a>
                <a
                  href={mapsDirectionsHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-line hover:border-green-600 hover:text-green-700 text-ink inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-xs font-medium transition"
                >
                  <Glyph name="arrow" size={14} className="text-green-600 flip-rtl" />
                  <span>{pick(UI.directions, locale)}</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="overflow-hidden rounded-card border border-line bg-surface shadow-xs">
              <iframe
                title="Google Maps SARL VOLAGRO"
                src="https://maps.google.com/maps?q=SARL+Volagro,+Zone+d'Activit%C3%A9+Tala+Athmane,+Tizi-Ouzou,+Algeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="bg-surface-sunken border-t border-line px-4 py-2 text-xs text-ink-subtle flex items-center justify-between">
                <span>Zone d’Activité Tala Athmane, Tizi-Ouzou</span>
                <span className="text-green-700 font-medium">Algérie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
