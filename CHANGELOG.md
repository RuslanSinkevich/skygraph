# Changelog

All notable changes to SkyGraph are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **`ConfigProvider` — themes, direction and runtime hooks.** Both the
  React and Vue providers now accept:
  - `theme.mode` (`'light' | 'dark'`) — built-in palette preset emitted
    via `data-sg-theme`.
  - `theme.token` — friendly overrides (`colorPrimary`, `colorSuccess`,
    `colorWarning`, `colorError`, `colorText`, `colorBg`, `colorBorder`,
    `borderRadius`, `fontSize`, `fontFamily`) that map to the matching
    `--sg-*` CSS custom properties.
  - `theme.cssVars` — escape hatch for raw `--sg-*` overrides.
  - `direction` (`'ltr' | 'rtl'`) — applied via the `dir` attribute and
    surfaced to descendants through `useConfigWithDefaults`.
  - `getPopupContainer` / `getTargetContainer` — choose the mount node
    for overlays (dropdowns, tooltips, pickers) and the scroll target
    for affix-like positioning.
  - `renderEmpty` — global override for the default `Empty` art across
    every data component.
  - `csp.nonce` — applied to dynamically created `<style>` tags so
    runtime styles pass strict Content-Security-Policy rules.

  When any of these is set, children are wrapped in a single
  `display: contents` scope element, so the new attributes / variables
  cascade without introducing an extra layout box. Nested providers
  shallow-merge `token` and `cssVars` key-wise.

  New exports: `buildThemeVars`, `Direction`, `ThemeConfig`,
  `SgThemeToken`, `CSPConfig`, `RenderEmptyHandler`.
- **`Input` (React) — `allowClear`, `prefix` / `suffix` slots and a
  `status` modifier.** A built-in `×` button clears the value while the
  field has content (skipped for disabled / readonly / loading states),
  with a localised `aria-label` driven by `locale.input.clear`. The new
  `prefix` / `suffix` slots host icons or units, and
  `status: 'error' | 'warning'` adds matching `sg-input-*-status-*`
  classes plus `aria-invalid`.
- **`Pagination` keyboard navigation (React + Vue).** `←` / `→` step one
  page, `Home` / `End` jump to the edges, while focus inside the
  size-changer `<select>` or quick-jumper `<input>` keeps native arrow
  behaviour.
- **`Pagination.showTotal` renderer (Vue).** `showTotal` now accepts a
  function `(total, [start, end]) => VNodeChild`, plus a `total` named
  slot — parity with the React adapter.
- **`Upload` (React) — drag-and-drop, custom request, validation
  hooks.** New props: `drag` (renders a drop zone), `maxSize` (skips
  files over the byte limit), `beforeUpload(file, list)` (sync /async
  pre-validation), `customRequest({ file, onProgress, onSuccess,
  onError })` (full control of the upload pipeline), `listType`
  (`'text' | 'picture' | 'picture-card'`) and `showUploadList`. List
  rows now show a per-file `percent` while uploading.
- **`Select` keyboard navigation (Vue).** `↑` / `↓` move the focused
  option, `Enter` / `Space` selects it (or toggles the dropdown when
  closed), `Escape` closes, `Backspace` pops the last tag in `multiple`
  mode. The focused option carries the `sg-select-option-focused`
  modifier. Both the styled trigger and the native `<select>` accept
  `ariaLabel` / `ariaLabelledby` for WCAG 4.1.2.
- **`ColorPicker` (Vue) — `unstyled` mode and accessible trigger.** The
  whole picker — trigger, swatch, hue / saturation panels, presets —
  now respects `unstyled`, falling back to inline layout styles only.
  The trigger accepts `ariaLabel` / `ariaLabelledby` so the swatch-only
  control passes the `button-name` axe rule, and a new `text` slot
  customises the visible color label.
- **`Carousel` dot label localisation (Vue).** The dots' `aria-label`
  now reads from `locale.carousel.slide(index)` instead of a hardcoded
  English string.
- **`Cascader.dropdownStyle` (Vue).** Inline styles for the dropdown
  panel — parity with the React adapter.
- **`Empty.description` slot (Vue).** Override the default text without
  replacing the whole component via the default slot.
- **Locale — `input.clear`.** Added to `en_US`, `ru_RU`, `de_DE`,
  `es_ES`, `fr_FR` and `zh_CN`. Drives the `Input` clear button label.
- **Tokens registry shared across demos.** `globalTokens`,
  `componentTokenGroups`, `categoryLabels` and `categoryOrder` moved
  out of `examples/demo/src/tokens/` into
  `@skygraph-examples/shared/tokens` so the React, Vue and Angular
  `#/guide/design-tokens` pages render from one source of truth.
- **Vue + Angular guide pages promoted from stubs.** `#/guide/core-api`,
  `#/guide/config-provider`, `#/guide/design-tokens` and
  `#/guide/styling-showcase` now ship full content (intro, mental
  model, props tables, runnable snippets, live demos) instead of
  pointing at the React docs. Angular gains a shared
  `<sg-guide-stub-banner>` for any guide route still in flight.
- **`ConfigProvider` regression tests.** New
  `packages/react/src/__tests__/config-provider.test.tsx` (164 lines)
  and an extended `packages/vue/src/__tests__/components/ui-config.test.ts`
  cover `buildThemeVars`, the scope wrapper, nested merging,
  `direction` resolution and `renderEmpty` overrides on `Empty`.

### Changed

- **Header / footer link renamed `Roadmap` → `Changelog`.** The
  page now lives at `#/changelog` (React, Vue, Angular). The previous
  `#/roadmap` URL keeps working: React resolves it through hash
  rewriting, Vue declares an explicit `redirect`, and Angular adds a
  `pathMatch: 'full'` redirect route.
- **`AppShell.section` type renamed `roadmap` → `changelog`** in
  `examples/_shared-react` and `examples/_shared-vue`. Demo apps that
  consumed the old literal need to switch to `'changelog'` —
  `sectionForRoute` keeps mapping legacy `/roadmap` paths to the new
  section.
- **`AutoField` (React) — token names aligned with the public
  contract.** `--sg-error` → `--sg-color-error`,
  `--sg-warning` → `--sg-color-warning`,
  `--sg-border` → `--sg-color-border`,
  `--sg-bg-disabled` → `--sg-color-bg-disabled`,
  `--sg-bg` → `--sg-color-bg-container`,
  `--sg-radius` → `--sg-border-radius`. The matching CSS files
  (`packages/styles/components/{cascader,select,treeselect}.css`) were
  refreshed to expose the same names. `DataGrid` row numbers now read
  `--sg-color-text-tertiary`.
- **Pagination buttons get an explicit `type="button"` (React).**
  Prevents form-embedded paginations from accidentally submitting the
  enclosing `<form>`.
- **API extractor reports refreshed.** `packages/react/etc/react.api.md`
  and `packages/vue/etc/vue.api.md` now reflect the expanded
  `ConfigProvider` and adapter surfaces.

### Removed

- **`COMPONENT_COUNT` constant** dropped from
  `examples/_shared/src/constants/stats.ts` (and the package's
  re-exports). The number drifted out of sync with reality and the
  landing page no longer reads it. `TEST_COUNT`, `ENGINE_COUNT` and
  `SHOWCASE_COUNT` remain available from
  `@skygraph-examples/shared/constants/stats` but are no longer
  re-exported from the package root.

## [0.5.0] - 2026-05-31

### Added

- **`@skygraph/vue`** — Vue 3 adapter with the same components and the same
  `.sg-*` CSS classes as React. Install `skygraph-vue` and you get the whole
  set styled out of the box.
- **`skygraph-react` / `skygraph-vue` meta-packages** — one install brings
  the adapter, the core engine and the stylesheet. No separate
  `@skygraph/styles` import needed.
- **`@skygraph/styles`** — CSS extracted into its own package. Same classes,
  same tokens, can be cherry-picked from any framework or from vanilla
  HTML.
- **`ResourceCalendar`** — schedule resources against a timeline with
  drag/resize, capacity limits, working-hours rules and automatic conflict
  detection.
- **`Gantt`** — task bars over a discrete time axis with drag, resize,
  dependency arrows and resource lanes.
- **`EventTimeline`** — date-anchored event stream, horizontal or vertical,
  optional grouping by day / month / year.
- **`SchemaFormEditor`** — visual form builder on top of `SchemaForm`:
  palette, canvas, inspector, undo/redo, JSON-Schema round-trip.
- **Print / PDF** — `printElement(node)` helper plus a `printable` prop
  and a `.print()` method on `Table`, `Diagram` and every chart.
  PDF export is handled by the browser's native print dialog.
- **Diagram** — context menu and hover-actions per node / edge / canvas,
  multi-select with Ctrl+click and lasso, undo/redo, snap-to-grid,
  zoom and pan, orthogonal routing that avoids obstacles.
- **Charts** — responsive SVG (auto-resize), interactive crosshair,
  range brushing, animations, hover toolbar with print / SVG / PNG export,
  per-series and per-chart context menus.
- **Dashboard** — widget hover actions, context menu, editor mode for
  drag-resize layout.
- **Table** — dynamic-height virtualization, advanced filters (operator
  picker), row grouping with aggregates, column pinning persistence.
- **Telegram contact** surfaced on the landing page and author card.

### Changed

- Public repository moved to
  [github.com/RuslanSinkevich/skygraph-public](https://github.com/RuslanSinkevich/skygraph-public).
- Diagram edge routing rewritten on the floating-edges algorithm used by
  xyflow / mxGraph. Edges now slide along node perimeters as nodes are
  dragged — no more bunching at a single corner on dense graphs.
- Landing page and README rewritten in plain language; contributor-only
  jargon moved into `ARCHITECTURE.md`.
- TypeScript target raised to ES2022. `Array.prototype.at()` and other
  recent additions are now usable from source without polyfills.

### Fixed

- `Tooltip` rich content no longer collapses to zero width.
- `Progress` bar no longer flashes empty on the first frame.
- `Tree` virtualization scrollbar reflects the full tree height,
  not only the visible window.
- `Slider` stretches correctly inside flex/grid containers.
- `Rate` inactive symbols are now visually distinguishable when using
  colour emoji as the character.
- `Collapse` (Vue) — clicking the header now actually expands the panel.
- `Checkbox` / `Radio` (Vue) — initial mount no longer ignores
  `checked` / `defaultChecked`.

### Removed

- `import '@skygraph/react/styles'` and all its subpaths. Replace with
  `import '@skygraph/styles'` (or a `@skygraph/styles/components/*`
  subpath). The styles travel transitively when you install
  `@skygraph/react`, so no separate install is required.
- Deprecated `ui/TreeSelect` and `ui/Transfer` (the complex versions
  have been the canonical implementations since 0.4.0).

## [0.4.0] - 2026-05-01

### Added

- **`GraphEngine`** — fourth domain engine alongside form / table / tree.
  Models a directed graph with parent-child hierarchy, outline-based
  geometry (rect / ellipse / polygon), stable anchors and AABB bounds.
- **`<Diagram>`** + **`useGraph`** — visual layer for `GraphEngine`
  with DOM nodes, SVG edges, custom `renderNode`, draggable nodes and
  orthogonal edge routing.
- **`AreaChart`**, **`PieChart`** (and donut via `innerRadius`), shared
  **`ChartLegend`**.
- **`Dashboard`** — CSS-grid widget layout with per-widget `(x, y, w, h)`
  placement, plus an editable counterpart with drag and resize.
- **Public styling contract** — `docs/styling-contract.md` documents
  stable tokens, root classes, slot keys and the `classNames` / `styles`
  API. CI scripts (`check:tokens`, `check:no-important`, `audit:styles`)
  keep the contract honest.
- **Table column pinning** — `pinColumn(column, side)`, `clearPinned()`;
  persisted in the core store.

### Changed

- `TreeSelect`, `Transfer` and `Calendar` main exports now point at the
  richer `complex/` implementations. The flat `ui/` versions remain on
  disk for tests and are scheduled for removal.
- `package-lock.json` removed — pnpm is the single source of truth.

### Fixed

- `SchemaForm` no longer calls `useConfig()` conditionally.
- Default submit button styling (`sg-btn` → `sg-button`).

## [0.3.0] - 2026-04-14

### Added

- Interactive documentation surface for every component:
  - `DemoBox` — live preview with collapsible source.
  - `PropsTable` — API reference tables.
  - `ComponentDoc` — page layout with title, description, "When to use"
    and examples.
- All 40 demo pages migrated to the new documentation format.

## [0.2.0] - 2026-04-13

### Added

- **Accessibility** — ARIA attributes on 24+ components; keyboard
  navigation for `Select`, `Dropdown`, `AutoComplete`, `Menu`, `Tabs`,
  `Rate`, `Slider`. New hooks `useFocusTrap`, `useRovingTabIndex`,
  `useListNavigation`.
- **New components** — `Transfer`, `Calendar`, `TreeSelect`, `Mentions`,
  `Transition`.
- **Animations** — class-based transitions (fade, slide, zoom, collapse)
  used by `Modal`, `Drawer`, `Dropdown`, `Tooltip`, `Popconfirm`,
  `Notification`, `Select`.
- **`ConfigProvider`** — size / disabled / locale, propagated through
  every UI and complex component.
- **Form** — `scrollToFirstError`, `onValuesChange`, `preserve`,
  `warningRules`, `feedbackIcons`, `FormProvider` (multi-form
  coordination), `SchemaForm`, expanded `AutoField` (ten new types),
  `jsonSchemaAdapter`, `zodToJsonSchema`.
- **Table** — multi-sort UI, row drag-and-drop, context menus, column
  visibility, column pinning, virtual scroll, CSV / clipboard export,
  selection summary, zebra striping, advanced pagination.
- **`DataGrid`** — Excel-like component with inline editing, selection
  and formulas.
- **Core** — pluggable middleware pipeline and a `useHistory` hook for
  undo / redo.

## [0.1.0] - 2026-04-13

### Added

- **`@skygraph/core`** — reactive runtime (`Store`, `Batch`,
  `Transaction`, `Computed`, `Scheduler`).
- **`FormEngine`** — fields, validation, submit, reset, cross-field
  dependencies.
- **`TableEngine`** — CRUD, sorting, filtering, pagination.
- **`TreeEngine`** — expand, check, select, drag, async load, filter.
- **`TypedCore`** wrapper for type-safe paths.
- **`@skygraph/react`** — hooks (`useForm`, `useField`, `useWatch`,
  `useComputed`, `useTable`, `useTree`), 11 complex components, 39 UI
  components.
- CSS design tokens, light / dark themes, per-component styles.
- Demo application with 41 interactive examples.
- CI pipeline (GitHub Actions), ESLint + Prettier configuration.
