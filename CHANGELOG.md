# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
