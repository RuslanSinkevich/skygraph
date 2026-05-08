# SkyGraph

**Reactive UI library with a state graph engine at its core.**

AntD-level components + reactive state management out of the box. Forms, tables, trees — no boilerplate. CSS Variables, zero runtime, framework-agnostic styles.

[![CI](https://github.com/RuslanSinkevich/skygraph/actions/workflows/ci.yml/badge.svg)](https://github.com/RuslanSinkevich/skygraph/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Features

- **Reactive Core** — path-based store with granular subscriptions, transactions, batching, computed values, cycle detection, middleware pipeline, time-travel debugging
- **Six Domain Engines** in one family `form / table / tree / virtual / graph / calendar`:
  FormEngine (validation, dependencies, multiple errors/warnings, preserve),
  TableEngine (sort, filter, pagination, virtual scroll, **column pinning + width persistence**, advanced filters, grouping + aggregates),
  TreeEngine (check cascade, drag & drop, async load),
  **GraphEngine** (nodes / edges / hierarchy / anchors / **orthogonal routing with obstacle avoidance** + OBB + **undo/redo**),
  **CalendarEngine** (`packages/core/calendar`: resources, assignments, **availability rules + conflict detection + capacity**)
- **78+ React Components** — Button (`type` × `danger` × `block`) to DataGrid, Calendar, Tree, Transfer, Mentions, TreeSelect, Cascader, Select (single/**multiple**), Input (**readOnly**), **Diagram** (visual layer of GraphEngine, **draggable nodes**, **zoom/pan**, **snap-to-grid**, **context menu**, **hover actions**, **multi-select / lasso**), **responsive interactive Charts** (Line / Bar / Area / Pie + **ResizeObserver-based SVG sizing** + **axes** + **legend** + **tooltips** + **brush** + **crosshair** + **animations** + **hover toolbar** with print / SVG / PNG export + **context menu**), **Dashboard** + **DashboardEditor** (drag/resize widgets + **widget hover actions** + **context menu**), **ResourceCalendar** (lane planner with drag/resize/conflict overlay), **SchemaFormEditor** (visual form builder with palette + inspector + undo/redo)
- **Print / PDF** — `printable` prop + `ref.print()` on Table / Diagram / all Charts (popup + native browser print dialog, no runtime deps), `@media print` global layer, `data-sg-page-break` attribute API
- **ConfigProvider** — centralized defaults for size, disabled, locale (React Context, not CSS)
- **Schema Forms** — auto-generate forms from JSON Schema or Zod schemas; **visual builder** via `SchemaFormEditor`
- **Zero-runtime CSS** — 3-layer token system (palette → semantic → component), dark mode via `data-sg-theme`
- **Accessible** — ARIA roles/attributes on all components, keyboard navigation, focus traps, roving tabindex, axe-core smoke tests
- **Animations** — `Transition` component with CSS-class transitions (fade, slide, zoom, collapse)
- **Ant-style Documentation** — interactive bilingual (en/ru) demos with live preview, code toggle, and API prop tables. 27+ pro-feature demos for Charts / Diagram / Dashboard / Table.
- **Type-safe** — TypedCore wrapper for compile-time path validation

## Quick Start

```bash
npm install @skygraph/core @skygraph/react
```

```tsx
import '@skygraph/react/styles'
import { Form, Field, SubmitButton } from '@skygraph/react'

function App() {
  return (
    <Form
      defaultValues={{ username: '', email: '' }}
      onSubmit={async (values) => {
        await saveUser(values)
      }}
    >
      <Field name="username" label="Username" rules={[{ required: true }]} />
      <Field name="email" label="Email" rules={[{ type: 'email' }]} />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}
```

## Packages

| Package | Description | Size |
|---------|------------|------|
| `@skygraph/core` | Reactive runtime + 6 engines (form/table/tree/virtual/graph/calendar) | ~32 KB (ESM) |
| `@skygraph/react` | React hooks, 78+ components, CSS styles | ~280 KB (ESM) |

## Architecture

```
@skygraph/core (pure TS, 0 dependencies)
┌─────────────────────────────────────────────┐
│  runtime/                                   │
│    Store, Batch, Transaction,               │
│    Computed, Scheduler, Middleware           │
│                                             │
│  engines/                                   │
│    FormEngine     — validation, deps, lists │
│    TableEngine    — sort, filter, group     │
│    TreeEngine     — check, expand, drag     │
│    VirtualScroll  — windowed rendering      │
│    GraphEngine    — nodes, edges, routing   │
│    CalendarEngine — assignments, conflicts  │
└─────────────────────────────────────────────┘
          ▲ public API only
          │
@skygraph/react (peer: core + react)
┌─────────────────────────────────────────────┐
│  hooks/                                     │
│    useForm, useField, useFieldArray,        │
│    useWatch, useTable, useTree,             │
│    useComputed, useHistory, useVirtualScroll│
│                                             │
│  hooks/a11y/                                │
│    useFocusTrap, useRovingTabIndex,         │
│    useListNavigation                        │
│                                             │
│  components/complex/                        │
│    Form, Field, FormList, FormProvider,     │
│    SchemaForm, SchemaFormEditor,            │
│    AutoField, SubmitButton,                 │
│    Table, DataGrid, Tree, List,             │
│    TreeSelect, Cascader, Calendar,          │
│    Transfer, VirtualList,                   │
│    Diagram, LineChart, BarChart, AreaChart, │
│    PieChart, Dashboard, DashboardEditor,    │
│    Gantt, EventTimeline, ResourceCalendar   │
│                                             │
│  components/ui/ (49 components)             │
│    Button, Input, Select, Modal, Drawer,    │
│    Tabs, Menu, Notification, Tooltip, ...   │
│                                             │
│  ConfigProvider                             │
│    size, disabled, locale (en/ru)           │
│                                             │
│  adapters/                                  │
│    zodAdapter, jsonSchemaAdapter            │
│                                             │
│  styles/                                    │
│    tokens, themes, transitions,             │
│    59 component CSS files                   │
└─────────────────────────────────────────────┘
```

## Theming

SkyGraph uses CSS Variables for theming — zero JS runtime overhead:

```css
/* Custom theme — just override tokens */
:root {
  --sg-color-primary: #7c3aed;
  --sg-border-radius: 8px;
}
```

Switch to dark mode:

```html
<div data-sg-theme="dark">
  <!-- all children use dark theme -->
</div>
```

4 levels of customization:

1. **Global theme** — override `--sg-color-*` tokens
2. **Component type** — override `--sg-btn-*` variables
3. **Instance** — `unstyled` prop + render props for custom UI
4. **Headless** — skip CSS, use only hooks (`useField`, `useForm`, etc.)

SkyGraph treats styling as a public contract. Full reference:

- [`docs/styling-contract.md`](./docs/styling-contract.md) — stable tokens, root classes, slots, `classNames` / `styles` API, versioning policy.
- [`docs/styling-recipes.md`](./docs/styling-recipes.md) — practical recipes: custom brand, dark mode, per-component overrides, conditional row/cell styling, full `unstyled` mode.

## Component List

**Data Entry (18):** Button, Input, InputNumber, Textarea, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker, AutoComplete, Rate, Upload, ColorPicker, Cascader, TreeSelect, Mentions

**Data Display (17):** Table, DataGrid, Tree, List, Tabs, Collapse, Descriptions, Badge, Tag, Avatar, Calendar, Carousel, Timeline, Steps, Segmented, Skeleton, **Diagram**

**Visualization (9):** **LineChart**, **BarChart**, **AreaChart**, **PieChart**, **Dashboard**, **DashboardEditor**, **Gantt**, **EventTimeline**, **ResourceCalendar**

**Feedback (9):** Modal, Drawer, Notification, Popconfirm, Tooltip, Progress, Spin, Result, Empty

**Navigation (5):** Menu, Breadcrumb, Dropdown, Pagination, Transfer

**Form (8):** Form, Field, FormList, FormProvider, SchemaForm, **SchemaFormEditor**, AutoField, SubmitButton

**Utility (1):** Transition (CSS-class-based animations)

## Tests

```
1013 active tests across core + react packages (+ 1 bench-gated skipped)
  @skygraph/core:  388 tests (runtime, form, table+pinning+widths+advanced-filters+grouping,
                              tree, virtual, graph+routing+OBB+history,
                              calendar+availability+conflicts+capacity,
                              middleware, time-travel, typed, subpath-exports, benchmarks)
  @skygraph/react: 625 tests (components, hooks, adapters, a11y hooks + axe-core smoke, styling contract,
                              diagram+drag+zoom+pan+snap+context-menu+hover-actions+multi-select+lasso,
                              charts+legend+axes+tooltip+animations+crosshair+brush+responsive+toolbar+export+context-menu,
                              dashboard+editor+hover-actions+context-menu,
                              gantt+drag+resize+dependencies+resources,
                              event-timeline+groupBy+orientation+custom-renderers,
                              resource-calendar+drag+resize+conflicts+capacity,
                              schema-form-editor+palette+inspector+undo-redo,
                              print+ref.print()+@media print, table-virtual+dynamic-height,
                              ui-extended)
```

## Development

```bash
pnpm install           # install all workspace deps (packages/* + examples/*)
pnpm build             # build all packages
pnpm test              # run tests (1013 across core + react)
pnpm lint              # eslint
pnpm format            # prettier

# Demo app (Ant-style interactive docs)
cd examples/demo
pnpm dev               # → http://localhost:5173/skygraph/

# Showcases (full-app examples)
cd examples/showcases
pnpm dev
```

## Documentation

- [Live Demo](https://skygraph.github.io/skygraph/) — Ant-style interactive docs with code toggle
- [Architecture](ARCHITECTURE.md) — immutable design decisions
- [Changelog](CHANGELOG.md)

## Sky Platform

SkyGraph is part of the **Sky Platform** ecosystem:

- [Skycode](https://github.com/RuslanSinkevich/skycode) — VS Code fork with AI assistant
- [SkyFork](https://github.com/RuslanSinkevich/skyfork) — Git client
- [SkyGraph](https://github.com/RuslanSinkevich/skygraph) — Reactive UI library

More at [skycode-ai.ru](https://skycode-ai.ru/about)

## License

[MIT](LICENSE)
