import nextConfig from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier';

/**
 * ESLint 9 flat config.
 *
 * `eslint-config-next` 16 ships **native flat config arrays**, so there is no
 * FlatCompat bridge and no eslintrc-era indirection: what Next curates is what
 * we run, with our own rules appended on top (later blocks win).
 *
 * Order matters: ignores → Next's configs → our guardrails → formatting (last,
 * so it can switch off every stylistic rule instead of fighting them).
 */
export default [
  {
    ignores: [
      'out/**',
      '.next/**',
      'node_modules/**',
      'next-env.d.ts',
      'public/**',
      'docs/reference/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },

  ...nextCoreWebVitals,
  ...nextConfig,

  /* ── Architectural guardrails ─────────────────────────────────────────────
   * These rules are the difference between "we said we'd do i18n/RTL" and "the
   * build refuses to let us forget". Each one encodes a real bug we'd ship. */
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'next/link',
              message:
                "A bare next/link drops the locale prefix. Import { Link } from '@/lib/i18n/navigation'.",
            },
            {
              name: 'next/navigation',
              importNames: ['useRouter', 'usePathname', 'redirect'],
              message:
                "Use the locale-aware equivalents from '@/lib/i18n/navigation' so navigation keeps the /fr|/ar|/en prefix.",
            },
          ],
        },
      ],
      // Phone numbers, WhatsApp targets and e-mail addresses are DATA, authored
      // in content/contacts.ts. This block is scoped to src/, so content/ stays
      // free to hold them. A number typed into a component is a number that will
      // be wrong in one of the three languages.
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/0[2-9]\\d{2}[\\s.]?\\d{2}[\\s.]?\\d{2}[\\s.]?\\d{2}/]',
          message:
            'Hard-coded phone number. Take it from content/contacts.ts (or content/company.ts for the switchboard).',
        },
        {
          selector: 'Literal[value=/\\+213\\d+/]',
          message:
            'Hard-coded international number. Take it from content/contacts.ts / content/company.ts.',
        },
      ],
    },
  },

  /* ── TypeScript strictness ────────────────────────────────────────────────
   * Kept in its own block on purpose: Next registers the `@typescript-eslint`
   * plugin only for TypeScript and TSX files, so applying these rules to `.mjs`
   * as well would make ESLint fail with "could not find plugin". */
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // The brief is explicit: no `any`. Next's own config only warns.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },

  /* ── Shared strictness ───────────────────────────────────────────────────── */
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx}'],
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'object-shorthand': ['error', 'properties'],

      // Accessibility is a launching requirement, not a suggestion: Next ships
      // these as `warn`, and a warning nobody reads is a bug we ship.
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/no-autofocus': 'error',
    },
  },

  /* ── The content layer is pure data ───────────────────────────────────────
   * Enforced so `content/` stays importable from scripts, tests, JSON-LD
   * builders and the post-export gate — never only from inside React. */
  {
    files: ['content/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['react', 'react-dom', 'next', 'next/*', '@/components/*'],
              message:
                'content/ is pure data: importing React or components would make it unusable outside the render tree.',
            },
          ],
        },
      ],
    },
  },

  /* ── Build/test tooling may log and touch the filesystem ─────────────────── */
  {
    files: ['scripts/**/*.ts', 'tests/**/*.ts', '*.config.{ts,mjs}'],
    rules: {
      'no-console': 'off',
      'no-restricted-syntax': 'off',
      // Next's own preference, but a config file IS its default export — that is
      // the documented shape for eslint/tailwind/postcss configs.
      'import/no-anonymous-default-export': 'off',
    },
  },

  prettier,
];
