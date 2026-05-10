# T-Vue-Charts — Decisions

## D1. Action-icons cross the framework boundary as Vue VNodes (not strings)

**Context.** React's `ChartHoverToolbar` accepts `ChartAction.icon` typed as
`ReactNode`. The Vue port needs an equivalent contract: declarative icons
that the toolbar can render with no runtime dependency on the icon library
of the host app.

**Decision.** Type `ChartAction.icon` as Vue's `VNode` and render it via
`<component :is="a.icon" />`. The default factory `defaultChartActions`
builds icons through `h('svg', {...}, [h('path', {...}), …])` — the
literal Vue equivalent of React's inline JSX. No `<img>`, no string-based
icon registry.

**Rationale.**

- `VNode` is the only Vue-native value that round-trips through templates
  without re-mounting (`h('svg', …)` ≡ JSX `<svg>…</svg>`).
- React parity at the **consumer** level: each shipped action has the
  same `id` (`print`, `downloadSvg`, `downloadPng`, `resetBrush`), label,
  and visual stroke recipe (16×16, `currentColor`, 1.5px). Only the
  literal call-site changes (`createElement` vs `h`).
- No new dependency: keeps `@skygraph/vue` icon-library-free, identical to
  React.

**Trade-offs.**

- Functional-component icons (no JSX) are slightly more verbose. Acceptable
  — same verbosity as React if you choose `createElement`.

## D2. `resolveBrushConfig` and brush types live inside `ChartBrush.vue` via a regular `<script>` block

**Context.** Vue's `<script setup>` forbids runtime ES exports
(`export function …`), but the React adapter exports `ChartBrushRange`,
`ChartBrushConfig`, and `resolveBrushConfig` from the same module as the
`ChartBrush` component. Splitting them into a separate `chartBrush.ts`
helper would break import-path parity.

**Decision.** Use the dual-script SFC pattern: a non-setup `<script
lang="ts">` block for the runtime exports + types, plus a `<script setup
lang="ts">` block for the component body. Both blocks compile into the
same module, so consumers can write
`import SgChartBrush, { resolveBrushConfig } from '…/ChartBrush.vue'`.

**Rationale.**

- This is the documented Vue 3 escape hatch for SFCs that need to expose
  module-level helpers next to the default component export.
- Keeps the public surface of `@skygraph/vue` (`packages/vue/src/index.ts`)
  identical to the parity expectation: one re-export pulls the SFC and
  the helpers from one path.
- Avoids a third file (`brushUtils.ts`) and the cyclic-import risk of
  pulling helpers from a sibling module that the SFC itself consumes.

**Trade-offs.**

- Two-script SFCs are slightly less common than single-`<script setup>`
  files; the file header documents the reason inline so future readers
  don't try to "simplify".

## D3. `download.ts` and `contextMenu.ts` are framework-agnostic — no Vue composables

**Context.** The card mentions: *"Если в React есть React-хук версии — Vue
делает композабл `useChartDownload` / `useChartContextMenu`"*. The React
adapter ships **no** hooks for either feature — only the pure-DOM
`chartExport.ts` and `chartContextMenu.ts` modules.

**Decision.** Mirror that exactly. Vue's `download.ts` and
`contextMenu.ts` are plain `.ts` files with the same exports as React
(`serializeSvg`, `triggerDownload`, `measureSvg`, `downloadSvg`,
`downloadSvgAsPng`, `makeChartContextMenuHandler`,
`makeSeriesContextMenuHandler`). No `useXxx` composable wrappers.

**Rationale.**

- Charter §9: parity is measured at the public-export level. Adding Vue
  composables that don't exist in React would break that contract.
- The card's "If React has a hook…" clause is conditional and triggers
  only when React actually has one. It doesn't.
- Existing consumers (the Bar/Line/Area/Pie wrappers, future toolbar
  integrations) call these as plain functions inside `<script setup>` —
  reactivity wraps the callsites, not the helpers themselves.

**Trade-offs.**

- A future PR can still add composables on top without breaking the
  current contract (additive-only). For now they would be dead weight.

## D4. `ChartBrush` falls back to a `viewBox` attribute parser for jsdom

**Context.** React's `chartContextMenu.ts` reads `svg.viewBox.baseVal`
directly, but jsdom (used by Vitest) does not always populate
`SVGSVGElement.viewBox.baseVal` from the `viewBox` attribute. This is
fine in production browsers but breaks the test environment and any
downstream consumer that runs the brush under jsdom-like SSR shells.

**Decision.** Inside `ChartBrush.vue`'s `clientToCategoryIndex` helper, try
`svg.viewBox?.baseVal?.width` first (parity with React), then fall back
to parsing the `viewBox` attribute, then to the chart's standard `600`
viewBox width. The runtime contract is unchanged for real browsers; the
fallback only fires when `baseVal` is missing/zero. `contextMenu.ts`
keeps the React-identical path (no fallback) — its tests stub `viewBox`
explicitly to exercise both branches.

**Rationale.**

- The brush is interactive; rendering correct selection rectangles in
  jsdom is necessary for our component tests.
- The fallback chain is monotonic: real browsers see the same code path
  React uses; jsdom and SSR see a graceful degradation rather than a
  silent no-op.
