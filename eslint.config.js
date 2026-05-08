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
    // examples/ are intentionally not part of the default lint set — they
    // contain a lot of "wip" demo code with hardcoded English strings,
    // imperative dom probes, and non-canonical patterns. The base config
    // (`tseslint.configs.recommended`) is too strict for them.
    //
    // Examples have their own minimal block below, attached only when the
    // user explicitly lints them (e.g. via `pnpm lint:examples`).
    ignores: [
      '**/dist/',
      '**/node_modules/',
      'examples/',
      // Config files are plain JS/MJS; type-aware parsing would pick ambiguous
      // tsconfig roots (repo vs examples/*/).
      'eslint.config.js',
      'examples-eslint.config.js',
      // vitest.config.ts / tsup.config.ts live next to package.json, not
      // under `src/` — the per-package tsconfig.json includes only `src`,
      // so type-aware parsing fails. We don't lint bundler/runner configs.
      '**/vitest.config.ts',
      '**/tsup.config.ts',
      '**/vite.config.ts',
      // @skygraph/vue ships .vue SFCs which need vue-eslint-parser to lint
      // properly. The current root config is type-aware TS-only. Vue gates
      // are covered by `vue-tsc --noEmit` (typecheck) + vitest. Adding a
      // proper Vue eslint setup is a follow-up stream.
      'packages/vue/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['packages/core/**/*.ts'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: path.join(repoRoot, 'packages/core'),
        project: './tsconfig.json',
      },
    },
  },
  {
    files: ['packages/react/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: path.join(repoRoot, 'packages/react'),
        project: './tsconfig.json',
      },
    },
  },
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  // ── Architectural boundaries (see ARCHITECTURE.md §1) ──
  //
  // runtime/ MUST NOT know about engines/.
  // Violating this makes core depend on domain logic and breaks the
  // "core = physics, engines = logic" split.
  {
    files: ['packages/core/src/runtime/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/engines/**', '../engines/**', '../../engines/**'],
              message:
                'runtime/ cannot import from engines/. Core must not know about engine categories. Move the feature into middleware or the engine itself.',
            },
          ],
        },
      ],
    },
  },

  // engines/ MUST NOT cross-import each other, and MUST NOT reach into
  // runtime/ primitives directly (use public `Core` from ../../types, or
  // the explicit `runtime-internal` entry for advanced needs).
  {
    files: ['packages/core/src/engines/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '../form/**',
                '../table/**',
                '../tree/**',
                '../virtual/**',
                '../../engines/form/**',
                '../../engines/table/**',
                '../../engines/tree/**',
                '../../engines/virtual/**',
              ],
              message:
                'Engines must not cross-import. Compose via the Core interface instead.',
            },
            {
              group: [
                '../../runtime/Store',
                '../../runtime/SubscriptionEngine',
                '../../runtime/Batch',
                '../../runtime/Transaction',
                '../../runtime/ComputedEngine',
                '../../runtime/CycleDetector',
                '../../runtime/Scheduler',
                '../../runtime/Node',
              ],
              message:
                'Engines must not reach into runtime primitives directly. Use the public Core interface from ../../types, or import from ../../runtime-internal if you really need low-level access.',
            },
          ],
        },
      ],
    },
  },

  // ── React UI primitives stay framework-pure ──
  //
  // components/ui/ are standalone React components. They MUST NOT import
  // from @skygraph/core runtime or engines — they are pure presentation.
  {
    files: ['packages/react/src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@skygraph/core/runtime-internal',
                '@skygraph/core/form',
                '**/engines/**',
                '**/runtime/**',
              ],
              message:
                'components/ui/* must stay framework-pure. No core/runtime/engine imports here — those belong in components/complex/ or hooks/.',
            },
          ],
        },
      ],
    },
  },

  eslintConfigPrettier,
)

// ── Note on examples/ linting ─────────────────────────────────────────────
//
// examples/* are kept out of the default lint set on purpose (see ignores
// above). They have a relaxed companion config at `examples-eslint.config.js`
// and a dedicated npm script:
//
//   pnpm lint:examples
//
// The companion config relaxes `react-hooks/exhaustive-deps`, allows
// `console.*` and `any`, and ignores the auto-generated docs index. Use it
// to catch real regressions in demo code without drowning in noise.
