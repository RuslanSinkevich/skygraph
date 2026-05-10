# T-Polish — decisions

## D1. Vue dts rollup — Option B (paths override + bundledPackages) won

The chain that produced the bug:

1. `packages/vue/vite.config.ts` had alias `@skygraph/core → ../core/src/index.ts`
   so dev / build / typecheck all resolve core symbols through source files
   (no need to rebuild `@skygraph/core` between iterations).
2. `vite-plugin-dts` in rolled-types mode (`rollupTypes: true`) forwards the
   active tsconfig's `paths` to its internal compiler. The `paths` mapping in
   `packages/vue/tsconfig.json` mirrors the alias, so during .d.ts generation
   `@skygraph/core` is also resolved to `../core/src/index.ts`.
3. api-extractor (under-the-hood rollup engine of the dts plugin) sees core
   types as **plain relative-path imports of `.ts` source files outside the
   project** rather than as imports from a published package. It therefore
   cannot inline them, and emits literal `import { X } from
   '../../core/src/index.ts'` lines into the rolled `dist/index.d.ts`.
4. `bundledPackages: ['@skygraph/core']` (Option A) had no effect on its own:
   by the time api-extractor sees the imports, they are already relative paths,
   no package name attached.

**Tried**:

- **A. `bundledPackages: ['@skygraph/core']` alone.** Built clean, zero diff
  in `dist/index.d.ts` (still 67 references to `core/src`). Confirmed
  `bundledPackages` matches by the string identifier of the import source,
  which the alias has already destroyed.
- **B. `bundledPackages: ['@skygraph/core']` + `compilerOptions: { paths: {} }`
  on the dts plugin only.** Builds clean, `dist/index.d.ts` has **0** references
  to `core/src` (verified via `rg "core/src" packages/vue/dist/index.d.ts`).
  Core's types are now inlined into the rolled `.d.ts`.
- C. Not needed (B worked).

**Why the override is dts-plugin-only**: the alias is still applied for the
JS build (`build.rollupOptions.external` keeps `@skygraph/core` external in
the runtime bundle, so we don't double-ship core code). Only the type
generation pipeline is forced to resolve via node_modules / `dist`, which is
exactly what published consumers will see.

**Cost of the fix**: `dist/index.d.ts` grows from ~140 KB to ~226 KB because
core's types are now inlined. This affects only IDE / `tsc` resolution speed
for downstream consumers, not runtime bundle size (the JS output is byte-for-
byte identical to before — `index.js` 386.4 KB / `index.cjs` 304.6 KB across
both configurations). Acceptable for the upside of removing the api-extractor
suppressions.

## D2. `pnpm --filter @skygraph/vue api:check` red post-fix — left for
## user-driven baseline regen

After Option B the rolled `temp/vue.api.md` legitimately diverges from the
committed baseline `etc/vue.api.md`:

- The `import ... from '../../*/core/src/index.ts'` lines disappear (good).
- Type aliases that api-extractor previously had to dedupe across multiple
  alias depths (`Core_2`, `Core_3`, `TreeKey_2`, `TreeKey_3`, …) collapse
  into single canonical names (`Core`, `TreeKey`, …) (good).
- A few previously-silent `(ae-forgotten-export)` warnings surface for symbols
  vue's public surface uses by reference but does not re-export
  (`GraphNode`, etc.). These were hidden as "external" imports before;
  inlining made them visible. They're suppressed at `logLevel: "none"` in
  `api-extractor.json`, so they do not fail the run.

The user prompt forbids regenerating any `etc/*.api.md` (parallel Vue streams
are in flight on `packages/vue/src/index.ts`; a regen now would silently
capture their WIP exports into the baseline). The acceptance criteria of
T-Polish allow this gate to stay red — the user runs the regen by hand after
Wave 2 completes.

Independently confirmed that **the same gate was already red _before_** my
changes due to in-flight T-Vue-Cleanup exports (`SgInputPassword`,
`SgSearchInput`, `SgTagInput`, `SgPinInput`, `SgInlineEdit`, `SgInputGroup`,
locale presets) that aren't in the committed baseline. T-Polish therefore
neither caused the gate to go red nor blocks its recovery — both just need
the same one-shot `pnpm --filter @skygraph/vue api:update` post-Wave-2.

## D3. Suppressions removed from `packages/vue/api-extractor.json`

`ae-wrong-input-file-type` and `ae-unresolved-link` are gone. Their root
cause (relative imports to `core/src/*.ts` source files in the rolled
`.d.ts`) no longer exists after D1, so these suppressions had nothing to
suppress. Step 8 of the task card explicitly asks to remove them in this
case. No new extractor messages appear in their place (verified by reading
the post-fix `temp/vue.api.md` warnings block).

## D4. Bundle budget = 5 MB raw, lives in `scripts/check-bundle-budget.mjs`

T-Size's `.size-limit.json` already polices the React demo's main entry
chunk at 1 MB brotli. T-Polish adds a complementary, **raw-bytes / total-
payload** ceiling because the demo splits into ~14 lazy showcase apps
(`AdminApp-*.js`, `WorkflowEditorApp-*.js`, …) that `.size-limit.json`
deliberately ignores (its glob is `assets/index-*.js` only — see T-Size's
finding for why).

Numbers used to pick the limit:

- Current sum of `examples/demo/dist/assets/*.js` ≈ **3.5–3.6 MB raw**
  across 14–16 chunks (varies with in-flight changes from T-Showcases-I18n
  / T-React-Cleanup / T-React-I18n-Styles in the same working tree).
- Rounded up to a clean number: **5 MB / `5_000_000` bytes**.
- Headroom: ~1.4 MB (~28%). Tight enough to catch a careless `import * as
  everything from 'lodash-es'`, loose enough to absorb the 13 in-flight
  parallel streams without nuisance failures.

Lives as a single constant in `scripts/check-bundle-budget.mjs`; bumping
process documented in `scripts/README.md` ("Bundle budget").

## D5. `sideEffects: false` for all three packages (no array form needed)

Audit of `packages/{core,react,vue}/src/**` for side-effect imports
(grep for `^import\s+['"][^'"]+['"]\s*$` and `\.css['"]`):

- `@skygraph/core` — pure exports + plain `.ts`. No CSS, no polyfills, no
  top-level imperative code. **`"sideEffects": false`**.
- `@skygraph/react` — same. CSS lives in `@skygraph/styles` (shipped
  separately and consumed by the user app, not auto-imported by component
  modules). **`"sideEffects": false`**.
- `@skygraph/vue` — same. **`"sideEffects": false`**.

No package needed the array form (`["**/*.css", …]`) because none of them
auto-load styles from inside their `src/`.
