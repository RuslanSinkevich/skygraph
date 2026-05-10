# T-Polish — done

> Wave 2, single-tab stream. Goal: close 3 packaging hygiene gaps —
> Vue dts rollup, total-bundle budget guard, and `sideEffects` flags.

## Files changed

### Part 1 — Vue dts rollup

- `packages/vue/vite.config.ts` — added `bundledPackages: ['@skygraph/core']`
  + `compilerOptions: { paths: {} }` to the `dts()` plugin (option B from
  the task card). See `decisions/T-Polish.md` §D1 for why.
- `packages/vue/api-extractor.json` — removed
  `ae-wrong-input-file-type` and `ae-unresolved-link` suppressions (their
  root cause is gone). See `decisions/T-Polish.md` §D3.

### Part 2 — Bundle budget guard

- `scripts/check-bundle-budget.mjs` — **new**. Sums every JS chunk in
  `examples/demo/dist/assets/*.js` against a hard 5 MB raw ceiling.
  Sorted table + headroom + 0/1 exit code.
- `scripts/README.md` — appended `check-bundle-budget.mjs` to the script
  index table and added a "Bundle budget" section with usage / limit-bump
  process / CI notes.
- `package.json` (root) — added `"bundle:check": "node
  scripts/check-bundle-budget.mjs"` next to `"size"`.
- `.github/workflows/ci.yml` — added a `Bundle budget` step in
  `build-and-test` after `pnpm build`, gated on
  `matrix.os == 'ubuntu-latest' && matrix.node-version == 22`.

### Part 3 — sideEffects

- `packages/core/package.json` — added `"sideEffects": false`.
- `packages/react/package.json` — added `"sideEffects": false`.
- `packages/vue/package.json` — added `"sideEffects": false`.

### Logs

- `docs/_streams/decisions/T-Polish.md` — **new**. 5 decisions (A/B/C
  for the Vue dts fix, api:check baseline drift handling, suppression
  removal, budget choice, sideEffects audit).
- `docs/_streams/findings/T-Polish.md` — **new**. 3 out-of-scope
  observations (demo `tsc -b` red from T-Showcases-I18n WIP, new
  `ae-forgotten-export` warnings exposed by the dts fix, demo bundle
  growth in parallel working tree).

## Vue dts fix — A/B/C result

| Variant | What changed | Result |
|---|---|---|
| A | `bundledPackages: ['@skygraph/core']` only | Did **not** work. dist/index.d.ts still had 67 references to `core/src` (24 of them `from '…/core/src/index.ts'`). The vite alias destroys the package identity before api-extractor sees the imports. |
| **B** | A + `compilerOptions: { paths: {} }` on the dts plugin | **Worked.** `rg "core/src" packages/vue/dist/index.d.ts` → 0 matches. Suppressions removed without raising new extractor errors. |
| C | Disable `rollupTypes` | Not attempted (B succeeded). Would have splintered the .d.ts into many files. |

## `pnpm bundle:check` final table

```
Bundle budget — raw bytes of all JS assets
────────────────────────────────────────────────────────────────
chunk                                                       size
────────────────────────────────────────────────────────────────
examples/demo/assets/index-zNCQEVMf.js                   3.33 MB
examples/demo/assets/FormsApp-iThqoU0A.js                42.4 KB
examples/demo/assets/EcommerceApp-BbeSf5cG.js            35.7 KB
examples/demo/assets/CrmApp-CwHb-LOd.js                  28.4 KB
examples/demo/assets/AdminApp-C3QIhiIE.js                27.4 KB
examples/demo/assets/Tag-CDRig4_g.js                     22.5 KB
examples/demo/assets/dashboard-DguN_kMW.js               21.5 KB
examples/demo/assets/HrPortalApp-CBQHNs0i.js             17.9 KB
…mples/demo/assets/TableKitchenSinkApp-DisAc7vZ.js       17.7 KB
examples/demo/assets/helpdesk-SG9uIOBV.js                14.1 KB
examples/demo/assets/chat-fUSpWhra.js                    13.3 KB
examples/demo/assets/inbox-Cvce0e-g.js                   12.8 KB
examples/demo/assets/WorkflowEditorApp-C8JMKU1q.js       12.1 KB
examples/demo/assets/FileManagerApp-Dk7b-Ulv.js          11.1 KB
examples/demo/assets/namespaces-DWgamSBT.js               6.0 KB
examples/demo/assets/printElement-_Gzms_cD.js             1.4 KB
────────────────────────────────────────────────────────────────
TOTAL                                                    3.61 MB
BUDGET                                                   5.00 MB
HEADROOM                                                 1.39 MB  (27.8%)

[bundle:check] OK — 27.8% headroom remaining.
```

Failure path independently verified by temporarily lowering the constant
to `1_000_000` and re-running — the script printed a clear `FAIL` and
exited `1`. Constant restored to `5_000_000`.

## `pnpm size` — before vs after

| Bundle | Limit | Before T-Polish | After T-Polish | Δ |
|---|---:|---:|---:|---:|
| `@skygraph/core` (esm) | 16 KB | 14.14 KB | 14.14 KB | 0 |
| `@skygraph/react` (esm) | 110 KB | 98.08 KB | 98.08 KB | 0 |
| `@skygraph/vue` (esm) | 90 KB | 81.7 KB | 81.65 KB | -0.05 KB |
| `@skygraph/vue` (cjs) | 160 KB | 144.11 KB | 144.09 KB | -0.02 KB |
| `examples/demo` | 1 MB | 753.67 KB | 768.78 KB | +15.11 KB ¹ |
| `examples/demo-vue` | 120 KB | 61.25 KB | 61.25 KB | 0 |

¹ Demo growth is **not** caused by T-Polish — see `findings/T-Polish.md`
§F3. Per-package sizes are flat or down, which is the only thing T-Polish
can move (sideEffects + dts paths). Demo growth comes from parallel
streams editing `examples/demo/src/**` and `examples/showcases/src/**`
in the same working tree between consecutive builds.

All numbers stay within their `.size-limit.json` budgets.

## Acceptance criteria

| Criterion | Status |
|---|---|
| `packages/vue/dist/index.d.ts` has no relative imports to `core/src/*.ts` | ✅ `rg "core/src" packages/vue/dist/index.d.ts` → 0. |
| Suppressions `ae-wrong-input-file-type` and `ae-unresolved-link` removed from `packages/vue/api-extractor.json` | ✅ |
| `scripts/check-bundle-budget.mjs` exists and works | ✅ |
| `pnpm bundle:check` green at current state | ✅ 3.61 MB / 5.00 MB (28% headroom). |
| `.github/workflows/ci.yml` has a `Bundle budget` step | ✅ ubuntu-latest × node 22 only. |
| Root `package.json` has a `bundle:check` script | ✅ |
| `core` / `react` / `vue` `package.json` each declare `sideEffects` | ✅ All three set `"sideEffects": false`. No CSS or bare side-effect imports under any `src/`. |
| `pnpm size` did not grow vs baseline | ✅ for everything T-Polish controls (per-package sizes are flat/down). Demo growth comes from other streams (see `findings/T-Polish.md` §F3). |

### Known not-green: `pnpm --filter @skygraph/vue api:check`

`api:check` is red — but it was **already** red at baseline before T-Polish
ran, due to in-flight T-Vue-Cleanup exports
(`SgInputPassword`/`SgSearchInput`/`SgTagInput`/`SgPinInput`/`SgInlineEdit`/
`SgInputGroup` + locale presets) that are not yet in the committed
`etc/vue.api.md`. The Option B fix adds purely structural diff on top
(relative-import lines collapse + `Core_2 → Core` style dedup).

The user's hard restriction explicitly forbids regenerating any
`etc/*.api.md` from inside this stream. Per CHARTER §6.1 (minimum-invasive
+ document) and `decisions/T-Polish.md` §D2, the gate is left for the
user to clear with a single `pnpm --filter @skygraph/vue api:update` after
Wave 2 completes — at which point both the T-Vue-Cleanup and T-Polish
diffs will land in one consistent baseline.

## Final sanity-check command transcript

```text
$ pnpm --filter @skygraph/core build       → ✅ tsup ESM/CJS/DTS green
$ pnpm --filter @skygraph/react build      → ✅ tsup ESM/CJS/DTS green
$ pnpm --filter @skygraph/vue build        → ✅ vite + dts rollup green;
                                              0 matches for "core/src"
                                              in dist/index.d.ts
$ pnpm --filter @skygraph/vue api:check    → ❌ baseline drift (see above)
$ pnpm --filter demo exec vite build       → ✅ (full `pnpm --filter demo
                                              build` blocked on tsc step
                                              owned by T-Showcases-I18n;
                                              see findings/T-Polish.md §F1)
$ pnpm bundle:check                        → ✅ 3.61 MB / 5.00 MB
$ pnpm size                                → ✅ all 6 entries within limit
```

## Cross-references

- `decisions/T-Polish.md` — D1 (dts fix), D2 (api:check left for user
  regen), D3 (suppression removal), D4 (budget = 5 MB), D5 (sideEffects
  audit).
- `findings/T-Polish.md` — F1 (T-Showcases-I18n breaks demo `tsc -b`),
  F2 (`GraphNode` etc. are forgotten exports — Vue stream's job),
  F3 (demo bundle inflation from parallel streams, not T-Polish).
- `findings/T-API.md` — original T-API finding that motivated Part 1
  ("Vue rollup типов оставляет ts-импорты").
