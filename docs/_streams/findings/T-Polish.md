# T-Polish — findings (out-of-scope discoveries)

## F1. `pnpm --filter demo build` red on `tsc -b` step (T-Showcases-I18n WIP)

`examples/demo`'s `build` script is `tsc -b && vite build`. The `tsc -b`
step currently fails with three identical errors in
`examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx`:

```
showcaseLocaleContext.tsx(35,62): error TS2339: Property 'apps' does not exist on type 'ShowcasesLocale'.
showcaseLocaleContext.tsx(37,20): error TS2339: Property 'apps' does not exist on type 'ShowcasesLocale'.
showcaseLocaleContext.tsx(39,17): error TS2339: Property 'apps' does not exist on type 'ShowcasesLocale'.
```

Root cause: in-flight T-Showcases-I18n stream is mid-refactor of
`ShowcasesLocale` in `examples/_shared/src/showcasesLocale.ts`. The current
`ShowcasesLocale` shape exposes a flat `cards: Record<string, …>`; the
consumer at `showcaseLocaleContext.tsx:35-39` assumes a nested `apps[appKey]`
shape that the in-flight refactor will land. Both files belong to
T-Showcases-I18n (per CHARTER §4), not to T-Polish.

**Workaround used for T-Polish sanity-checks**: ran `pnpm --filter demo
exec vite build` (skipping `tsc -b`) so a fresh `examples/demo/dist/` is
available for `pnpm bundle:check`. This is a measurement-only shortcut and
is not committed anywhere.

**No action taken** — out of scope (CHARTER §6.4). T-Showcases-I18n owns
the fix.

## F2. New `(ae-forgotten-export)` warnings surfaced by Vue dts rollup fix

After the Option B dts-rollup fix (decisions/T-Polish.md §D1), a few core
symbols that vue's public API references **by type position only** become
visible to api-extractor as forgotten exports:

- `dist/index.d.ts:2007:5 — GraphNode`
- (plus the previously-known `Row`, `handleExpandAll`, `handleCollapseAll`,
  `handleCheckAll`, `handleUncheckAll`, `scrollToFocused` — all already
  present pre-fix at different line numbers)

Pre-fix, the same symbols were silently imported as
`from '../../../../../core/src/index.ts'`, so api-extractor classified them
as "external" instead of "forgotten". The fix simply makes the existing
oversight visible — the Vue public surface really does use `GraphNode` from
core (e.g. in `DiagramExpose.getSelectedIds: () => NodeId[]`) without
re-exporting it.

These messages are already suppressed at `logLevel: "none"` in
`api-extractor.json` (legitimate suppression: `ae-forgotten-export` is
documentation-quality, not a build break). T-Polish makes no further change
here — the proper fix (re-export `GraphNode`, `NodeId`, etc. from
`packages/vue/src/index.ts`) belongs to one of the Vue work-streams
(T-Vue-Misc most naturally, since the Diagram surface is its zone).

## F3. `examples/demo` dist grows ~15 KB between consecutive builds in the
## same working tree

Comparing two `pnpm --filter demo exec vite build` runs minutes apart:

| Run | `pnpm size` (demo brotli) | `pnpm bundle:check` (demo raw total) | # of JS chunks |
|-----|---------------------------|--------------------------------------|---------------:|
| 1   | 753.67 KB                 | 3.54 MB                              | 14             |
| 2   | 768.78 KB                 | 3.61 MB                              | 16             |

Between the two runs T-Polish did **not** modify any file under
`examples/demo/src/**`. The growth is entirely from in-flight changes by
parallel streams that share this working tree (notably new chunks
`Tag-*.js`, `namespaces-*.js`, `printElement-*.js`; plus `FormsApp-*.js`
grew from 32.4 KB → 42.4 KB). Most likely T-React-Cleanup +
T-React-I18n-Styles + T-Showcases-I18n.

T-Polish's own contribution (`sideEffects: false` × 3 + Vue dts paths
override) cannot inflate downstream bundles — it can only let bundlers
tree-shake more. Per-package brotli sizes confirm:

- `@skygraph/core` ESM: 14.14 KB → 14.14 KB (unchanged).
- `@skygraph/react` ESM: 98.08 KB → 98.08 KB (unchanged).
- `@skygraph/vue` ESM: 81.7 KB → 81.65 KB (-0.05 KB).
- `@skygraph/vue` CJS: 144.11 KB → 144.09 KB (-0.02 KB).

**No action taken** — not a regression caused by T-Polish.
