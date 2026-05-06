// examples-eslint.config.js
//
// Linter for `examples/demo` and `examples/showcases`. These two apps are
// kept out of the main `eslint.config.js` (they contain large amounts of
// hardcoded English strings, intentionally-impure demos, and non-canonical
// patterns), but a proper companion config still helps catch real bugs:
// unused vars, missing return types in shared utilities, dead code, and so on.
//
// Run via `pnpm lint:examples`.
//
// Rationale for the relaxations below:
//   - `react-hooks/exhaustive-deps` → 'warn' (not 'error'): demos
//     intentionally re-render on every prop change; an over-strict deps
//     check would flood the output without surfacing real regressions.
//   - `@typescript-eslint/no-explicit-any` → 'off': demo code routinely
//     passes `any` for prop spreads and event handlers.
//   - `no-console` → 'warn': demos use `console.log` to illustrate engine
//     events; we surface the warning but don't fail.
//   - `@typescript-eslint/no-unused-vars` → 'warn' (with `_`-prefix
//     ignore): demos often import a symbol just to render its docs box.

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintConfigPrettier from 'eslint-config-prettier'

const repoRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(
  {
    ignores: [
      '**/dist/',
      '**/node_modules/',
      '**/.vite/',
      '**/.tmp/',
      // The auto-generated showcase docs index file is a build artefact.
      'examples/demo/src/__generated__/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Cursor / typescript-eslint: when several tsconfig.json parents exist (repo
  // root vs examples/*/…), the parser must not guess — pin a root per app.
  {
    files: ['examples/demo/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: path.join(repoRoot, 'examples/demo'),
        project: './tsconfig.app.json',
      },
    },
  },
  {
    files: ['examples/showcases/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: path.join(repoRoot, 'examples/showcases'),
        project: './tsconfig.app.json',
      },
    },
  },
  {
    files: ['examples/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': 'warn',
      // Demos sometimes use `let` for state-tracking variables that get
      // reassigned in event handlers. Don't elevate to `error` like the
      // packages/ config does.
      'prefer-const': 'warn',
    },
  },
  eslintConfigPrettier,
)
