# VOLAGRO.DZ — ARCHITECTURE

**Part 1 of 8.** Design tokens, TypeScript/content architecture, static-export
configuration and the runnable skeleton they are built on.

---

## 1. Stack, and why each piece is here

| Layer      | Choice                              | Reason                                                                                                                                                |
| ---------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework  | **Next.js 16.4** (App Router)       | `output: 'export'` gives a folder of HTML we can host anywhere; App Router Server Components keep the JS payload small, which is the LCP story on 4G. |
| Language   | **TypeScript 5.9, `strict`**        | `noUncheckedIndexedAccess` + `verbatimModuleSyntax`. No `any` anywhere — ESLint enforces it as an error, not a warning.                               |
| Styling    | **Tailwind CSS 4.3, CSS-first**     | v4's `@theme` _is_ "design tokens as CSS variables": one file emits both the custom properties and the utilities. No `tailwind.config.js` exists.     |
| i18n       | **next-intl 4.14 — routing only**   | Locale-prefixed links, pathname-preserving switching, hreflang generation. Copy lives in typed content files (see §6 for why that is deliberate).     |
| Motion     | **motion 14** (Framer Motion)       | The package's current name; `motion/react`. Scroll reveals, count-up, SVG path drawing.                                                               |
| Validation | **Zod 4**                           | Quote-form schema, shared by the component and its tests.                                                                                             |
| A11y       | **Radix primitives**                | Dialog (lightbox), Accordion (FAQ), Tabs (product specs). Focus traps and ARIA we do not want to reimplement.                                         |
| Content    | **next-mdx-remote 6 + gray-matter** | Events are MDX files with front matter, compiled at build time — adds zero runtime.                                                                   |
| Tests      | **Vitest 5** / **Playwright**       | Vitest for pure logic (node environment, no DOM); Playwright + axe for behaviour and accessibility.                                                   |

## 2. Three laws the codebase is built around

1. **`content` (data) ← `components` ← `app` (routes).** Components never import
   each other's content and never hard-code copy. Enforced: `content/**` may not
   import React, Next or any component (ESLint), so the same data is importable
   from scripts, unit tests, JSON-LD builders and the post-export gate.
2. **Logical properties only.** `ms-` / `me-` / `ps-` / `pe-` / `text-start` /
   `border-block-start`. RTL is a layout outcome, never a second stylesheet. The
   only directional patches are the explicit `[dir='rtl']` typographic
   corrections in `tokens.css` and the `flip-rtl` utility for glyph mirrors.
3. **A missing fact is a type.** `Slot<T>` has exactly two states, `ready` and
   `pending`, and `pending` carries a bilingual reason. There is no code path in
   which an unknown dosage renders as a plausible number (§7).

## 3. Folder tree

```
volagro-dz/
├── content/                     ← single source of truth (pure data, no React)
│   ├── types.ts                 Localized<T> · Slot<T> · Flagged<T> · ImageSlot
│   ├── company.ts               identity, tagline, hero, 4 key figures, address,
│   │                            sites, TECHNA (2018), units (2022), certifications
│   ├── products.ts              9 products: registry + 8 pending spec slots each
│   ├── contacts.ts              3 departments, flagged emails/phones, WhatsApp
│   ├── timeline.ts              1998 → 2018 → 2022
│   ├── events/                  MDX events (Part 5)
│   └── images.manifest.ts       slot → file → alt(fr/ar/en) → blurhash (Part 7)
├── docs/
│   ├── ARCHITECTURE.md          this file
│   ├── ART_BRIEF.md             (Part 7)
│   ├── IMAGE_PROMPTS.md         (Part 7)
│   ├── ASSET_LICENSES.md        (Part 7)
│   ├── CONTENT_GUIDE.md         (Part 7)
│   └── reference/old-site/      the six screenshots of the legacy site, kept as
│                                the audit trail for every "flag as to verify"
├── public/
│   ├── _redirects               legacy /X.html map + `/` → /fr/  (edge, no HTML)
│   ├── _headers                 immutable caching for hashed assets, no HTML cache
│   ├── images/{real,generated,logo}/
│   └── documents/               product technical sheets (PDF)
├── scripts/
│   ├── postbuild.ts             writes the root language gate to out/index.html
│   └── optimize-images.ts       sharp → AVIF/WebP ×3 + blurhash (Part 7)
├── src/
│   ├── app/[locale]/            ← the root layout lives HERE, not at app/layout
│   │   ├── layout.tsx           html lang/dir, next/font, base metadata
│   │   └── page.tsx             home (shell in Part 1, sections in Part 3)
│   ├── components/
│   │   ├── sections/            home sections (Part 3)
│   │   ├── ui/                  Button · Card · Badge · Dialog · Tabs · Accordion
│   │   ├── motion/              Reveal · CountUp · Parallax · PageTransition
│   │   ├── diagrams/            integrated chain, repro process (SVG)
│   │   ├── gallery/             grid + lightbox
│   │   └── forms/               quote form
│   ├── lib/
│   │   ├── i18n/                config · routing · navigation · preference
│   │   ├── seo/                 metadata, JSON-LD, sitemap (Part 6)
│   │   ├── motion/              shared variants + reduced-motion helper
│   │   ├── whatsapp/            deep-link builder (Part 5)
│   │   ├── validation/          Zod schemas (Part 5)
│   │   └── utils/               cn · format
│   └── styles/
│       ├── tokens.css           ← THE Tailwind config + the design system
│       └── globals.css          base layer, composite utilities, variants
└── tests/{unit,e2e}/
```

## 4. Static export: what breaks, and how it is handled

`output: 'export'` ships files, not a server. Four consequences, all already
resolved in configuration rather than left as surprises:

| Server feature              | Replacement here                                                                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `images.optimizer`          | `unoptimized: true` + pre-optimised AVIF/WebP ×3 widths produced by `scripts/optimize-images.ts`.                                                       |
| `redirects()` / `headers()` | `public/_redirects` + `public/_headers` (CF Pages / Netlify), documented for Vercel in Part 8. Applied at the **edge** — faster than a server redirect. |
| A redirect for `/`          | Two layers: the edge rule `/ → /fr/ 302`, plus a real `out/index.html` language gate for hosts with no redirect support.                                |
| Content negotiation         | `localePrefix: 'always'`: `/fr/…`, `/ar/…`, `/en/…` are three peer, indexable URL spaces. Nothing sniffs `Accept-Language`.                             |

`trailingSlash: true` so every route resolves to `<route>/index.html` — one URL
shape, identical on Cloudflare Pages, Vercel, S3 and nginx.

**The root gate** (`scripts/postbuild.ts`) is a complete page, not a stub: an
inline script resolves the locale from a stored choice, then `navigator.languages`,
then French; a `<meta refresh>` catches JavaScript-disabled visitors; visible
links catch everything else, crawlers included. It only becomes sticky when the
visitor chooses a language deliberately (`src/lib/i18n/preference.ts` is the
single writer/reader of `volagro.locale`), so nobody is trapped in a language
they never picked.

## 5. Design tokens

`src/styles/tokens.css` is both the design system and the Tailwind
configuration. Semantic roles (`surface`, `ink`, `line`, `accent`) point at
palette entries, and because Tailwind compiles to `color: var(--color-ink)`
rather than a literal, redefining four variables re-themes any subtree. That is
the entire dark-mode mechanism: `.theme-ink` on the footer strip and contact
band, and nothing else in the product is dark.

### Palette (with measured contrast on `#FAF7F2`)

| Token                        | Value                 | Use                                               | Contrast               |
| ---------------------------- | --------------------- | ------------------------------------------------- | ---------------------- |
| `--color-burgundy-600`       | `#a00611`             | The single accent: CTAs, markers, key figures     | 7.8:1                  |
| `--color-burgundy-700/800`   | `#85050e` / `#6b060d` | Hover / press states                              | 9.7:1 / 11.9:1         |
| `--color-charcoal-800`       | `#1f2a2b`             | Body ink (faintly green-grey, like the dark leaf) | 14.4:1                 |
| `--color-charcoal-600 / 500` | `#3f4d4e` / `#566464` | Muted / subtle text                               | 8.6:1 / 6.0:1          |
| `--color-cream`              | `#faf7f2`             | Default page                                      | —                      |
| `--color-mist`               | `#e6e8e6`             | Chips, inert states                               | —                      |
| `--color-amber-500`          | `#e9a13b`             | Decorative warmth only                            | 2.1:1 — **never text** |
| `--color-amber-800`          | `#8a5c12`             | Amber as text                                     | 5.4:1                  |
| `--color-sage-400`           | `#a8b4b3`             | The logo's grey leaf: tonal bridges               | decorative             |

**Palette provenance.** The brief specifies ≈`#A00611`; we sampled the supplied
logo raster and measured `#840c18` for the `VOLAGRO` wordmark fill and `#880018`
averaged across the crest. The discrepancy is explained by the source: that
image is a compressed screenshot, which darkens flat fills. We therefore anchor
the ramp on the brief's value and keep 700/800 as the press states. **Outstanding:
the client's vector logo (AI/EPS/SVG) to lock the exact red.**

### Type

Three self-hosted faces via `next/font` (no third-party request, no FOUT, and a
metric-matched fallback so the swap costs zero layout shift):

- **Barlow Condensed** — display. Big headlines, key figures, section titles.
- **Inter** — text. 16px+ body, excellent on low-DPI phones.
- **IBM Plex Sans Arabic** — Arabic. `preload: false`, deliberately: the layout
  is shared by all locales, so preloading it would push ~40 KB of Arabic glyphs
  at every French visitor who will never paint them.

Display sizes are fluid `clamp()` steps (`--text-d1` … `--text-d4`,
`--text-figure`), each carrying its own line-height and letter-spacing so a
component cannot get the pairing wrong. `--text-figure` uses tabular numerals:
the count-up animates digits without the figure jittering sideways (a CLS source
we removed by construction).

**Arabic typography is corrected, not translated.** Condensed + negative
tracking destroys Arabic legibility, so `[dir='rtl']` re-points `--font-display`
at the Arabic face, raises leading to 1.24–1.42 and zeroes negative tracking.
This is the only place a direction-specific rule is allowed to exist.

## 6. i18n: FR (default) · AR (RTL) · EN

**Why the copy is not in ICU message catalogs.** `Localized<T>` is
`Record<Locale, T>`, so forgetting a language is a **compile error**. A message
catalog makes it a silent runtime fallback to French on the Arabic page — exactly
the failure mode the brief warns about. `next-intl` is therefore used for what it
is uniquely good at here (prefix-aware navigation and hreflang), while all copy
stays in typed content files that a Vitest suite can audit (§9).

Consequences that are wired in from the start rather than retro-fitted:

- `Link`, `useRouter`, `usePathname` and `redirect` come from
  `@/lib/i18n/navigation`. **ESLint blocks importing them from `next/*`** and
  fails with an explanation.
- `html lang` is region-qualified (`fr-DZ`, `ar-DZ`, `en-DZ`) because the
  audience is Algerian; `hreflang` stays language-only (`fr`, `ar`, `en`) plus
  `x-default`, so the alternate set stays broad.
- Digits: `ar-DZ` in ICU groups with a **full stop** (`20.000.000`), which reads
  as a decimal in the Maghreb. Arabic therefore uses Latin digits with French
  spacing (`20 000 000`), asserted by unit test.
- The switcher shows endonyms (Français / العربية / English) and preserves the
  current path.

## 7. The placeholder system (how "no invented figures" is enforced)

Three primitives in `content/types.ts`:

- `Localized<T>` → every value exists in all three languages (compile error otherwise).
- `Slot<T>` → `ready(value)` or `pending(reason)`. Components render the reason
  as a visibly marked placeholder block, in the visitor's own language.
- `Flagged<T>` → legacy data awaiting confirmation (`verified: false`), with a
  note saying exactly what to confirm.

`SPEC_REQUEST_LIST` is derived at module load by walking every product, so the
document request we hand back to VOLAGRO can never drift from what the pages
actually render as placeholders. It currently reports **72 outstanding
specification items** (9 products × 8 slots).

The same mechanism covers images: an `ImageSlot` with `source: null` renders the
branded burgundy/charcoal hatch; dropping the file into `public/images/` and
running `npm run images` fills in `source`, `blurhash` and dimensions, and the
real photo appears with **no code change**.

## 8. Verification (what was actually run)

| Check               | Command             | Result                                                     |
| ------------------- | ------------------- | ---------------------------------------------------------- |
| Types               | `npm run typecheck` | ✅ 0 errors, `strict` + `noUncheckedIndexedAccess`         |
| Lint                | `npm run lint`      | ✅ 0 errors (incl. the import/number guardrails)           |
| Unit tests          | `npm test`          | ✅ 21/21 in 2 files                                        |
| Static export       | `npm run build`     | ✅ `/fr`, `/ar`, `/en` prerendered + `/` gate + `404.html` |
| Artifacts inspected | manual              | see below                                                  |

Artifact checks, not just exit codes:

- `out/index.html` = the gate; `out/fr|ar|en/index.html` exist; `_redirects`,
  `_headers` and `404.html` are emitted.
- `<html lang="ar-DZ" dir="rtl">` on `/ar/`, `lang="fr-DZ" dir="ltr"` on `/fr/`.
- Numbers render as `20 000 000` (fr/ar, U+202F) and `20,000,000` (en); the year
  renders `1998`, **not** `1 998` — two real bugs this pass caught and fixed,
  now locked by tests.
- Fonts self-hosted in `out/_next/static/media/*.woff2`; only the Latin faces are
  preloaded.
- Production CSS: **29 KB** for the whole design system and page stylesheet.

**Not yet run** (scoped to later parts, and I will not claim them early):
Lighthouse, Playwright + axe, visual snapshots LTR/RTL.

## 9. Decisions waiting on VOLAGRO

Every one of these is already represented in the code as a flagged value or a
`pending()` slot, so supplying the answer is a content edit, not a refactor.

1. **Company e-mail domain** — the legacy page shows `CMV@volagro.dz.com`, which
   is not a valid second-level domain. We propose `cmv@volagro.dz`; needs sign-off.
2. **WhatsApp number** for the quote form — the brief requires the flow but names
   no number. Currently routed to the sales mobile, flagged.
3. **Vector logo (AI/EPS/SVG)** — to lock the exact brand red and to cut the
   header lockup from the real artwork rather than a screenshot.
4. **The real photographs** — the gallery screenshots show 12+ genuine photos
   (TECHNA visit, trade-show stands, teams, buildings). We need the original
   files; we will not generate substitutes for people or facilities.
5. **GPS coordinates and opening hours** for the contact map.
6. **Certifications / approvals** — none were supplied, so none are published.
7. **72 product specification items** — see `SPEC_REQUEST_LIST`.

## 10. What each remaining part delivers

| Part | Scope                                                                                                                     |
| ---- | ------------------------------------------------------------------------------------------------------------------------- |
| 2    | Layout shell, sticky header + product mega-menu, mobile bottom sheet, footer, sticky CTA bar, language switcher           |
| 3    | Home sections: hero (parallax), count-up numbers, animated chain diagram, CMV bento, TECHNA split, scroll-linked timeline |
| 4    | Products overview + product template + 6 CMV pages + the "Filière repro" explainer                                        |
| 5    | About, Expertise, Events (MDX), Gallery (categories + lightbox), Contact (Zod → WhatsApp/mailto, map)                     |
| 6    | SEO, JSON-LD, sitemap, OG images, accessibility pass, performance pass, Playwright + axe                                  |
| 7    | ART_BRIEF, IMAGE_PROMPTS, image optimiser, asset manifest, CONTENT_GUIDE                                                  |
| 8    | Deployment: Cloudflare Pages / Vercel, custom domain, legacy `.html` redirects                                            |
