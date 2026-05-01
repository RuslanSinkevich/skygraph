# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **GraphEngine orthogonal routing** — new `routeOrthogonal(start, end)` and `pointsToPath(points)` helpers exported from `@skygraph/core`. `<Diagram>` now renders edges differently based on `edge.routing` (`'straight' | 'orthogonal' | 'manual'`); manual mode uses the edge's `waypoints`.
- **TableEngine column pinning** — `pinColumn(column, side)`, `getPinnedColumns()`, `clearPinned()`. State mirrored into the Core store under `$table.<id>.state.pinnedLeft|pinnedRight`.
- **+19 tests** in this iteration: GraphEngine routing (9) + Diagram routing variants (3) + TableEngine pinning (7). Total now **603** (270 + 333).
- **Diagram component** + **useGraph** hook in `@skygraph/react` — visual layer for `GraphEngine` (DOM nodes + SVG-overlay edges, custom renderNode, outline-kind modifier classes).
- **GraphEngine.subscribe(cb)** — public engine-level subscription used by the React adapter to avoid path-prefix lookups.
- **AreaChart** — stacked / non-stacked SVG area chart with strokeWidth + fillOpacity props.
- **PieChart** — pie / donut chart (innerRadius), clockwise from 12 o'clock, `<title>` for accessibility, palette color resolution.
- **ChartLegend** — shared component, opt-in via `legend` prop on Line/Bar/Area charts.
- **+65 tests** in this round: GraphEngine edge cases (+15), Diagram + useGraph integration (+11), Charts incl. Area/Pie/legend (+26), a11y hooks (+13). Total now **584** (254 + 330).
- Localized in demo (en/ru): App shell, system components (PropsTable, CssVarsTable, DemoBox, ComponentDoc), and 4 *Page.tsx (GettingStarted, Theming, CoreApi, **DesignTokens**).
- `docs/conventions.md` updated: modern demo pattern (DemoBox + raw imports), i18n schema, stream artifacts, commit prefixes.

### Changed

- `audit-styles.mjs` — detects template-literal classes (`` `sg-X-${var}` ``) and excludes them from the dead-code count. Result: 201 → **53** possibly-dead classes (3.8x more accurate).
- `useGraph` snapshot caching via `useRef` + `graph.subscribe()` — fixes infinite-loop with `useSyncExternalStore`.
- `charts.css` — replaced unknown `var(--sg-font-family, inherit)` with plain `inherit`.

### Changed

- `useGraph` now caches snapshot via `useRef` and subscribes through the new `graph.subscribe()` API — fixes infinite-loop issue with `useSyncExternalStore`.
- `charts.css` — replaced unknown `var(--sg-font-family, inherit)` with plain `inherit` (token wasn't declared in `tokens.css`, broke `check:tokens`).

## [0.4.0] - 2026-05-01

### Added — GraphEngine (diagram domain engine)

- `@skygraph/core` — **GraphEngine** as the fourth member of the `form / table / tree / graph` family. Models a directed graph with parent-child hierarchy, outline-based geometry (rect / ellipse / polygon / flattened path), stable anchor IDs, and AABB bounds. Operations: `addNode`, `removeNode`, `updateNode`, `moveNode`, `setParent`, `addEdge`, `removeEdge`. State mirror under `$graph.snapshot.<engineId>`.
- `@skygraph/core` — `GRAPH_PREFIX = '$graph.'` reserved in `engines/namespaces.ts`.
- `@skygraph/react` — `useGraph()` hook + `<Diagram>` component (DOM nodes + SVG-overlay edges) for visualising a `GraphEngine`.
- `@skygraph/react/styles/components/diagram.css` — default styling for `Diagram` (token-only, dark-theme aware).
- 22 new unit tests for `GraphEngine` (now **497 → 519** total tests across both packages).

### Changed — public API consolidations

- `TreeSelect` main export now points to `components/complex/TreeSelect` (uses `@skygraph/core` types `TreeNodeData` / `TreeKey` / `TreeFieldNames`). The legacy `components/ui/TreeSelect` is still on disk for tests; type alias `TreeSelectNode` is kept as `@deprecated` for migration.
- `Transfer` main export now points to `components/complex/Transfer` (richer surface — pagination, sortable, locale, footer, operations, custom search).
- `Calendar` main export now comes directly from `components/complex/Calendar` (the `components/ui/Calendar.tsx` re-export shim was removed — it violated the "ui has no core" boundary).
- `package.json` — removed legacy npm `workspaces` field (pnpm workspace already declared in `pnpm-workspace.yaml`).
- `package-lock.json` — removed; only `pnpm-lock.yaml` remains. Both `package-lock.json` and `yarn.lock` added to `.gitignore`.

### Fixed

- `SchemaForm.tsx` — `useConfig()` was being called conditionally, violating `react-hooks/rules-of-hooks`. Hoisted to top of the function.
- `SchemaForm.tsx` — submit button used `sg-btn sg-btn-primary` which had no styles (CSS only declares `sg-button-*`). Changed to `sg-button sg-button-primary`.
- `TagInput.tsx` — replaced `let next = [...tags]` with `const` (`prefer-const`).
- Demo: `PropDef` now accepts `required?: boolean` (was missing, caused TS errors in CollapseDemo / ProgressDemo / ResultDemo).
- Demo: `treeselect/*.demo.tsx` migrated from `TreeSelectNode` to `TreeNodeData` after the public API change.
- Demo: `Bordered.demo.tsx` row ids switched from `number` to `string` to match Table's contract.
- Demo: `transfer/CustomRender.demo.tsx` — `listStyle` prop dropped (not on the new complex `Transfer`); replaced with `listHeight`.

### Tooling

- `scripts/audit-styles.mjs` — added allowlist for runtime-generated transition classes (`sg-fade-*`, `sg-slide-*`, `sg-zoom-*`, `sg-collapse-*`). Reduces "possibly dead" CSS class count by 41 false positives.
- `eslint.config.js` — clarified the rationale for ignoring `examples/` (oversized demo set) and pointed at a targeted `npx eslint examples/...` workflow.
- `themes/default.css` and `themes/dark.css` — clarified in JSDoc that both are convenience re-exports of the full `tokens.css`; theme activation is via `data-sg-theme` attribute, not via importing one or the other.
- `STREAM-PLAN.md` v1 — terminology corrected: "stream" = entire continuous turn, "task" = individual unit of work (was conflated in v0).

### Added — Public styling contract established

- [`docs/styling-contract.md`](docs/styling-contract.md) — публичный стилевой контракт: стабильные токены, корневые классы `.sg-*`, перечень слотов, `classNames` / `styles` API, политика версий.
- [`docs/styling-recipes.md`](docs/styling-recipes.md) — практические рецепты для пользователя: бренд, тёмная тема, стилизация одной таблицы, условный цвет строк/ячеек, `unstyled`.
- `classNames` / `styles` API (слоты) для `Table` и `List`. Ключи слотов перечислены в `styling-contract.md` §4.
- `TableColumn.headerClassName` — паритет с `cellClassName`.
- Общие утилиты `SlotClassNames` / `SlotStyles` / `slotClass` / `slotStyle` в `@skygraph/react` для будущих компонентов.
- CI: `scripts/check-tokens.mjs` — проверка, что все `var(--sg-*)` задекларированы в `tokens.css` или локально в компонентной CSS.
- CI: `scripts/check-no-important.mjs` — запрет `!important` в компонентных CSS (с явным allowlist для accessibility и print).
- CI: `scripts/audit-styles.mjs` — разовый аудит `var(--sg-*)`, `.sg-*` классов и «магических» hex-цветов.
- Npm-скрипты `audit:styles`, `check:tokens`, `check:no-important`, `check:styles`; `check:styles` подключён в GitHub Actions.

### Changed

- Нормализованы токены в `mentions.css`, `spin.css`, `input.css`, `table.css`, `tree.css` — убраны «чужие» имена, все ссылки идут через `tokens.css` или локальные `--sg-<component>-*`.
- Убраны все `!important` из компонентных CSS, где они были неоправданы: `input-password.css`, `search-input.css`, `table.css` (fullscreen, group cell), `tree.css`, `list.css` (responsive grid через каскад CSS-переменных).
- `SgConfig.prefixCls` убран из публичного API до корректной реализации (вариант A из `styling-plan.md`, фаза 4). Для изоляции классов — изолированный скоуп на хосте.

## [0.3.0] - 2026-04-14

### Added

- **Demo Documentation** — Ant-style interactive docs for all 40+ components
  - `DemoBox` — live preview + collapsible source code
  - `PropsTable` — API reference tables for every component
  - `ComponentDoc` — page layout with title, description, "When To Use", examples
- All 40 demo pages converted to documentation format

## [0.2.0] - 2026-04-13

### Added

- **Tests** — 282 new tests across UI components, hooks, and adapters (428 total)
- **Accessibility** — ARIA attributes on 24+ components, keyboard navigation for Select, Dropdown, AutoComplete, Menu, Tabs, Rate, Slider
- **A11y hooks** — `useFocusTrap`, `useRovingTabIndex`, `useListNavigation`
- **New components** — Transfer, Calendar, TreeSelect, Mentions, Transition
- **Animations** — `Transition` component with CSS class-based transitions (fade, slide-up/down/left/right, zoom, collapse)
- **Transition integration** — Modal, Drawer, Dropdown, Tooltip, Popconfirm, Notification, Select use `Transition`
- **ConfigProvider completion** — full integration across all UI and complex components (size, disabled, locale)
- **Form Super Universal** — `scrollToFirstError`, `onValuesChange`, `preserve`, `warningRules`, `feedbackIcons`, `FormProvider` (multi-form coordination), `SchemaForm`, expanded `AutoField` (10 new types), `jsonSchemaAdapter`, `zodToJsonSchema`
- **Table Ant-killer** — multi-sort UI, row drag & drop, context menus, column visibility, column pinning, virtual scroll, CSV/clipboard export, selection summary, zebra striping, advanced pagination
- **DataGrid** — Excel-like component with inline editing, selection, formulas
- **Middleware pipeline** — pluggable middleware for core store
- **Time-travel debugging** — `useHistory` hook with undo/redo

## [0.1.0] - 2026-04-13

### Added

- `@skygraph/core` — reactive runtime (Store, Batch, Transaction, Computed, Scheduler)
- `@skygraph/core` — FormEngine (fields, validation, submit, reset, dependencies)
- `@skygraph/core` — TableEngine (CRUD, sorting, filtering, pagination)
- `@skygraph/core` — TreeEngine (expand, check, select, drag, async load, filter)
- `@skygraph/core` — TypedCore wrapper for type-safe paths
- `@skygraph/react` — hooks: useForm, useField, useWatch, useComputed, useTable, useTree
- `@skygraph/react` — 11 complex components (Form, Field, Table, Tree, List, Transfer, etc.)
- `@skygraph/react` — 39 UI components (Button, Input, Modal, Select, etc.)
- `@skygraph/react` — CSS design tokens, light/dark themes, per-component styles
- Demo application with 41 interactive examples
- CI pipeline (GitHub Actions)
- ESLint + Prettier configuration
