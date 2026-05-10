# T-Quality — Blocked

## A11y — `@axe-core/playwright` and `axe-core` not installed

The a11y harness in `tests/a11y/` imports `@axe-core/playwright`, which is not
present in `node_modules` and not declared in any `package.json` in the repo.

`pnpm install` is forbidden for this stream per CHARTER §5 (would race with
seven sibling streams in the same working tree). The dependencies must be
added by the user / T-CI in a single coordinated install:

```bash
pnpm add -DW @axe-core/playwright axe-core
```

Once installed, the a11y matrix can be run from the repo root:

```bash
npx playwright test --config=playwright-a11y.config.ts
```

Until then, the spec files compile (no `tsc` references them) but cannot run.

### Why a separate config and not adding `axe-core` as a peer of `@playwright/test`

`@axe-core/playwright` ships its own peer of `playwright-core`; both are needed
side-by-side. They are dev-only and have no effect on the published packages.

## Coordination needed for `package.json` script

T-Quality cannot edit the root `package.json` (T-CI's zone per CHARTER §4).
The `test:a11y` script needs to be added there. See `findings/T-Quality.md` for
the proposed entry.
