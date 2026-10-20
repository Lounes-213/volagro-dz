import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

/**
 * Unit tests only (the brief scopes Vitest to utils); browser-level behaviour is
 * Playwright's job in `tests/e2e`.
 *
 * `environment: 'node'` on purpose: everything under test here — formatters,
 * content integrity, WhatsApp/mailto builders — must be usable *outside* React
 * (scripts, JSON-LD builders, the post-export gate). If a unit test needs a DOM,
 * that is a signal the logic belongs in a component instead.
 */
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
    reporters: ['default'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@content': fileURLToPath(new URL('./content', import.meta.url)),
    },
  },
});
