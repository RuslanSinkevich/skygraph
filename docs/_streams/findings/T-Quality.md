# T-Quality — Findings (out of scope)

## 1. `npm` script `test:a11y` needs to be added to root `package.json` (T-CI)

Proposed:

```json
{
  "scripts": {
    "test:a11y": "playwright test --config=playwright-a11y.config.ts"
  }
}
```

Cannot be added by T-Quality — root `package.json` is T-CI's zone per CHARTER §4.

## 2. `examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx` references missing `apps` field

When running `pnpm --filter demo exec tsc -p tsconfig.app.json --noEmit` the
following errors surface, completely outside this stream's zone:

```
../showcases/src/showcases/_shared/showcaseLocaleContext.tsx:35:62
  error TS2339: Property 'apps' does not exist on type 'ShowcasesLocale'.
../showcases/src/showcases/_shared/showcaseLocaleContext.tsx:37:20
  error TS2339: Property 'apps' does not exist on type 'ShowcasesLocale'.
../showcases/src/showcases/_shared/showcaseLocaleContext.tsx:39:17
  error TS2339: Property 'apps' does not exist on type 'ShowcasesLocale'.
```

`useAppLocale<K extends keyof ShowcasesLocale['apps']>(...)` reads `locale.apps[app]`,
but the new `examples/_shared/src/showcasesLocale.ts` (currently untracked, work
of T-Showcases-I18n per CHARTER §4) ships `cards` instead of `apps`.

This blocks `pnpm --filter demo build` (script is `tsc -b && vite build`).
Verified existed independently of T-Quality changes:

* `tsc -b` failure path: `examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx` is reached via `examples/demo/src/pages/Showcases/ShowcasesPage.tsx` which deep-imports `../../../../showcases/src/ShowcasesViews`.
* Files referenced are not in T-Quality's zone.
* `pnpm --filter demo exec vite build` (skipping `tsc -b`) **passes cleanly**, including the three new benchmark routes — proves T-Quality's diff is type-safe at the bundler level.

Coordination: T-Showcases-I18n needs to update `showcaseLocaleContext.tsx` to
match the new `cards` shape, or `showcasesLocale.ts` needs an `apps` alias.

## 3. Pre-existing `TableBenchmark.tsx` already in the working tree

`examples/demo/src/demos/benchmarks/TableBenchmark.tsx` already existed and was
mounted in `BenchmarksPage.tsx` before T-Quality started (see CHARTER §4 zone
listing — the file was named there but the in-tree version pre-dates the wave).
T-Quality did **not** modify the existing file. Per Decision Protocol §6.1 the
pre-existing implementation was kept; the new `benchmarks/table` route in
`App.tsx` reuses the same `<TableBenchmark>` component to satisfy the task
card's "3 new benchmark pages integrated" requirement without duplicating logic.

## 4. `examples/demo/src/demos/benchmarks/LineChartBenchmark.tsx` already covers Line/Chart

`LineChartBenchmark.tsx` already existed and is mounted in `BenchmarksPage.tsx`.
T-Quality's `ChartBenchmark.tsx` is intentionally a **BarChart** benchmark (not
a Line one) so the two cover different chart code paths:

* `LineChartBenchmark` — path-d emission per series.
* `ChartBenchmark`     — per-bar layout, hover commit.

This matches the T-Quality task card (`SkyGraph LineChart/BarChart with 10k
points`) and avoids stepping on `LineChartBenchmark.tsx` which was outside the
"new files" zone.
