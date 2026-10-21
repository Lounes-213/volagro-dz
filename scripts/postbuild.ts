/**
 * POST-EXPORT: THE ROOT LANGUAGE GATE
 * ============================================================================
 * `output: 'export'` ships files, not a server, so nothing can issue a redirect
 * for `/`. Two layers cover it:
 *
 *   1. This script: a real `out/index.html` for every static host (S3, GitHub
 *      Pages, cPanel/Apache, nginx `try_files`). It is a complete, branded,
 *      no-JS-functional page:
 *        · an inline script resolves the locale from a stored choice, then
 *          `navigator.languages`, then falls back to French;
 *        · a `<meta http-equiv="refresh">` catches JavaScript-disabled visitors;
 *        · visible links catch everything else, including crawlers.
 *   2. The resolved locale is sent to `/<locale>/bienvenue/` — the welcome
 *      screen — which then hands over to the home page on click or after 12s.
 *
 * The detected locale is *not* sticky on its own: only a deliberate choice in
 * the language switcher writes `volagro.locale` to localStorage, so we never
 * trap a bilingual visitor in a language they never picked.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { DEFAULT_LOCALE, LOCALES, LOCALE_META } from '../src/lib/i18n/config';
import { LOCALE_STORAGE_KEY } from '../src/lib/i18n/preference';
import { IDENTITY, TAGLINE } from '../content/company';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(projectRoot, 'out');

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.volagro.dz').replace(/\/+$/, '');

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const buildGate = (): string => {
  const links = LOCALES.map(
    (code) =>
      `        <li><a href="/${code}/bienvenue/" hreflang="${LOCALE_META[code].hreflang}" lang="${LOCALE_META[code].htmlLang}">${escapeHtml(LOCALE_META[code].endonym)} <span class="abbr">${escapeHtml(LOCALE_META[code].abbr)}</span></a></li>`,
  ).join('\n');

  const alternates = LOCALES.map(
    (code) =>
      `    <link rel="alternate" hreflang="${LOCALE_META[code].hreflang}" href="${siteUrl}/${code}/" />`,
  ).join('\n');

  return `<!doctype html>
<html lang="${LOCALE_META[DEFAULT_LOCALE].htmlLang}" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(IDENTITY.legalName)} — ${escapeHtml(IDENTITY.headOffice.fr)}</title>
    <meta name="description" content="${escapeHtml(TAGLINE.fr)}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${siteUrl}/${DEFAULT_LOCALE}/" />
    <link rel="canonical" href="${siteUrl}/${DEFAULT_LOCALE}/" />
    <meta name="theme-color" content="#faf7f2" />
    <meta http-equiv="refresh" content="2; url=/${DEFAULT_LOCALE}/bienvenue/" />
    <style>
      :root { color-scheme: light; }
      html, body { margin: 0; height: 100%; }
      body {
        display: grid;
        place-items: center;
        background: #faf7f2;
        color: #1f2a2b;
        font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      .gate { padding: 2.5rem 1.5rem; max-width: 34rem; text-align: center; }
      .wordmark {
        font-size: clamp(2rem, 8vw, 3.25rem);
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1;
        margin: 0;
      }
      .rule { width: 2.5rem; height: 2px; background: #a00611; margin: 1.25rem auto; border: 0; }
      .tagline { font-size: 0.9375rem; line-height: 1.6; color: #3f4d4e; margin: 0 0 2rem; }
      ul { list-style: none; display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; padding: 0; margin: 0; }
      a {
        display: inline-flex; align-items: center; gap: 0.5rem;
        min-height: 44px; padding: 0 1.125rem;
        border: 1px solid rgb(31 42 43 / 0.18); border-radius: 4px;
        color: #1f2a2b; text-decoration: none; font-size: 0.9375rem; font-weight: 500;
      }
      a:hover { border-color: #a00611; color: #a00611; }
      a:focus-visible { outline: 2px solid #a00611; outline-offset: 2px; }
      .abbr { color: #566464; font-size: 0.75rem; letter-spacing: 0.08em; }
    </style>
  </head>
  <body>
    <main class="gate">
      <h1 class="wordmark">${escapeHtml(IDENTITY.wordmark)}</h1>
      <hr class="rule" />
      <p class="tagline">${escapeHtml(TAGLINE.fr)}</p>
      <ul>
${links}
      </ul>
    </main>
    <script>
      (function () {
        var locales = ${JSON.stringify(LOCALES)};
        var fallback = ${JSON.stringify(DEFAULT_LOCALE)};
        var target = null;
        try {
          var stored = window.localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)});
          if (stored && locales.indexOf(stored) !== -1) target = stored;
        } catch (error) {
          /* private mode / storage disabled: fall through to negotiation */
        }
        if (!target) {
          var languages =
            navigator.languages && navigator.languages.length
              ? navigator.languages
              : [navigator.language || ''];
          for (var i = 0; i < languages.length; i += 1) {
            var code = String(languages[i]).toLowerCase().split('-')[0];
            if (locales.indexOf(code) !== -1) {
              target = code;
              break;
            }
          }
        }
        location.replace('/' + (target || fallback) + '/bienvenue/' + (location.hash || ''));
      })();
    </script>
  </body>
</html>
`;
};

const main = async (): Promise<void> => {
  const gateHtml = buildGate();
  const vercelStaticDir = join(projectRoot, '.vercel', 'output', 'static');

  if (existsSync(outDir) || !existsSync(vercelStaticDir)) {
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, 'index.html'), gateHtml, 'utf8');
    console.log(`[postbuild] language gate written to out/index.html`);
  }

  if (existsSync(vercelStaticDir)) {
    await writeFile(join(vercelStaticDir, 'index.html'), gateHtml, 'utf8');
    console.log(`[postbuild] language gate written to .vercel/output/static/index.html`);
  }

  const written = LOCALES.map((code) => `  /${code}/`).join('\n');
  console.log(`[postbuild] locales:\n${written}`);
};

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
