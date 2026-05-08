# @skygraph-examples/shared

Vanilla TypeScript helpers shared by the SkyGraph example apps
(`examples/demo`, `examples/showcases`, plus future `examples/demo-vue` and
`examples/demo-angular`). No React, no UI dependencies — pure parsers,
types and constants.

Contents:

- `src/parsers/changelog.ts` — `parseChangelog(md: string)` builds a
  `ChangelogEntry[]` tree from the repository's `CHANGELOG.md`.
- `src/parsers/todo.ts` — `parseTodo(md: string)` builds a `TodoItem[]`
  tree from the repository's `TODO.md`.
- `src/types/{changelog,todo}.ts` — public structural types used by both
  parsers.
- `src/constants/stats.ts` — repo-wide statistics surfaced on the demo
  Landing page (component count, test count, engine count, showcase
  count).
- `__tests__/` — fixture-based unit tests (vitest).

This package is consumed via the `pnpm` workspace symlink — Vite runs
the TS sources directly without a build step.
