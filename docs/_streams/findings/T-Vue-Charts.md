# T-Vue-Charts — Findings (out of scope)

## F1. `SgLocale` does not expose a `chart.toolbar` / `chart.actions` namespace

The T-Vue-Charts card mandates: *"Локали — через `useConfig()`. Если
ключей нет в `SgLocale` — `findings/T-Vue-Charts.md`, не добавлять
ключи (зона T-Docs-Locales)."*

`packages/vue/src/types.ts` declares the `SgLocale` interface with the
following sub-namespaces only: `modal`, `popconfirm`, `empty`,
`pagination`, `inputPassword`, `searchInput`, `tagInput`, `pinInput`,
`inlineEdit`. There is **no** `chart` namespace at all — neither for the
toolbar (`Chart actions`, `Print`, `Download SVG`, `Download PNG`,
`Reset zoom`) nor for the crosshair tooltip header strings.

Recording per the protocol. The Vue components hardcode English strings
to match the React parity source (`packages/react/src/components/complex/
Charts/ChartHoverToolbar.tsx` and friends — same approach). React's
crosshair / brush / toolbar do not consume `useConfig()` either.

T-Docs-Locales can introduce a `chart.toolbar.{print,downloadSvg,
downloadPng,resetBrush,actions}` namespace later and route the strings
through `useConfig` without changing the component DOM.

## F2. `vue-tsc` TS2774 warnings on `slots.<name>` truthy checks (re-confirmed)

`pnpm --filter @skygraph/vue build` continues to surface the two
pre-existing TS2774 warnings reported in `findings/T-Vue-Cleanup.md` F1
and re-confirmed in `findings/T-Vue-Misc.md` F2:

```
src/components/complex/List/List.vue:298:16
src/components/complex/Table/Table.vue:210:27
```

T-Vue-Charts did not touch either file and the warnings are unchanged.
Re-confirmed; not actioned.

## F3. jsdom does not populate `SVGSVGElement.viewBox.baseVal` from the attribute

While writing tests for `ChartBrush.vue` and `chartContextMenu.ts`,
confirmed that creating an SVG element via `createElementNS` and
calling `setAttribute('viewBox', '0 0 600 400')` leaves
`svg.viewBox.baseVal.width === 0` under the project's Vitest +
`jsdom` setup.

The brush handles this by parsing the raw attribute as a fallback (see
`decisions/T-Vue-Charts.md` D4). The pure-DOM `contextMenu.ts` keeps the
React-identical code path; its tests stub `viewBox.baseVal` explicitly
via `Object.defineProperty(svg, 'viewBox', …)` to exercise both the
mapped and fallback branches.

Logged so future writers of jsdom-based chart tests know not to rely on
the native viewBox accessor.

## F4. `defaultChartActions` resets brush via the action `id="resetBrush"`, not a separate prop

While porting React's default toolbar set, noted that the React adapter
flips the action visibility based on the presence of the `brushReset`
callback inside `defaultChartActions(opts)`. Vue mirrors this exactly —
the action is appended to the array only when `opts.brushReset` is set
— rather than declaring a `showResetBrush` prop on the toolbar. This
keeps the public surface (`actions: true | ChartAction[]`) identical to
React; logging it here so anybody writing a Vue chart wrapper that
doesn't pre-bind `brushReset` knows why the button "vanishes" without
the brush being engaged.
