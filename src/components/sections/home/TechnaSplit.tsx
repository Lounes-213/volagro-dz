import { PARTNERSHIP } from '@content/company';
import { EXPERTISE_FEATURE } from '@content/home';
import { UI } from '@content/ui';
import { pick } from '@content/types';
import { Figure } from '@/components/ui/Figure';
import { InlineLink } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import type { Locale } from '@/lib/i18n/config';

/**
 * The TECHNA split.
 *
 * The photograph is the client's own (slot `photo.legacy.02` — the team outside
 * TECHNA). This is precisely the section where a generated image would be
 * indefensible: it presents a real partnership, so it must show a real moment.
 *
 * `PARTNERSHIP.scope` is a `pending()` slot, and it surfaces here as a visible
 * note rather than a silence — the client is reminded, on their own site, that the
 * contractual scope still has to be published.
 */
export const TechnaSplit = ({ locale }: { readonly locale: Locale }) => {
  const scope =
    PARTNERSHIP.scope.status === 'pending' ? pick(PARTNERSHIP.scope.reason, locale) : null;

  return (
    <section className="bg-surface-sunken section" aria-labelledby="techna-title">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="border-b border-line pb-4">
            <div className="inline-block border-s-2 border-red-600 ps-3 py-0.5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                {pick(UI.technaEyebrow, locale)} · {PARTNERSHIP.since}
              </span>
            </div>
          </div>

          <h2 id="techna-title" className="font-display text-d2 text-ink mt-6 text-balance font-bold">
            {pick(EXPERTISE_FEATURE.title, locale)}
          </h2>

          <p className="text-ink-muted mt-5 max-w-[52ch] text-base sm:text-lg leading-relaxed">
            {pick(EXPERTISE_FEATURE.body, locale)}
          </p>

          <dl className="border-line mt-8 grid gap-px border-t sm:grid-cols-2">
            <div className="py-5 pe-6">
              <dt className="eyebrow text-ink-subtle">{pick(UI.partner, locale)}</dt>
              <dd className="font-display text-d4 mt-2">TECHNA</dd>
              <dd className="text-ink-muted text-sm">
                {pick(PARTNERSHIP.partnerOrigin, locale)}
              </dd>
            </div>
            <div className="border-line py-5 sm:border-s sm:ps-6">
              <dt className="eyebrow text-ink-subtle">{pick(UI.area, locale)}</dt>
              <dd className="text-ink font-display text-d4 mt-2">
                {pick(PARTNERSHIP.title, locale)}
              </dd>
            </div>
          </dl>

          <InlineLink href="/expertise" className="mt-8">
            {pick(UI.readMore, locale)}
          </InlineLink>

          {scope ? (
            <p className="border-line text-ink-subtle mt-8 border-s-2 ps-4 text-xs leading-relaxed">
              {scope}
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          <Figure
            slot="photo.legacy.02"
            locale={locale}
            sizes="(min-width: 1024px) 46vw, 92vw"
            imageClassName="rounded-card"
          />
          <p className="text-ink-subtle mt-4 text-xs">{pick(EXPERTISE_FEATURE.photoCaption, locale)}</p>
        </Reveal>
      </div>
    </section>
  );
};
