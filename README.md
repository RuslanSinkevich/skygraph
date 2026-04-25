# SkyGraph

**Reactive UI library with a state graph engine at its core.**

AntD-level components + reactive state management out of the box. Forms, tables, trees — no boilerplate. CSS Variables, zero runtime, framework-agnostic styles.

[![CI](https://github.com/RuslanSinkevich/skygraph/actions/workflows/ci.yml/badge.svg)](https://github.com/RuslanSinkevich/skygraph/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Features

- **Reactive Core** — path-based store with granular subscriptions, transactions, batching, computed values, cycle detection, middleware pipeline, time-travel debugging
- **Domain Engines** — FormEngine (validation, dependencies, multiple errors/warnings, preserve), TableEngine (sort, filter, pagination, virtual scroll), TreeEngine (check cascade, drag & drop, async load)
- **55+ React Components** — from Button to DataGrid, Calendar, Tree, Transfer, Mentions, TreeSelect, Cascader
- **ConfigProvider** — centralized defaults for size, disabled, locale (React Context, not CSS)
- **Schema Forms** — auto-generate forms from JSON Schema or Zod schemas
- **Zero-runtime CSS** — 3-layer token system (palette → semantic → component), dark mode via `data-sg-theme`
- **Accessible** — ARIA roles/attributes on all components, keyboard navigation, focus traps, roving tabindex
- **Animations** — `Transition` component with CSS-class transitions (fade, slide, zoom, collapse)
- **Ant-style Documentation** — interactive demos with live preview, code toggle, and API prop tables
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
| `@skygraph/core` | Reactive runtime + form/table/tree engines | ~28 KB (ESM) |
| `@skygraph/react` | React hooks, 55+ components, CSS styles | ~260 KB (ESM) |

## Architecture

```
@skygraph/core (pure TS, 0 dependencies)
┌─────────────────────────────────────────────┐
│  runtime/                                   │
│    Store, Batch, Transaction,               │
│    Computed, Scheduler, Middleware           │
│                                             │
│  engines/                                   │
│    FormEngine    — validation, deps, lists  │
│    TableEngine   — sort, filter, pagination │
│    TreeEngine    — check, expand, drag, DnD │
│    VirtualScroll — windowed rendering       │
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
│    SchemaForm, AutoField, SubmitButton,     │
│    Table, DataGrid, Tree, List,             │
│    TreeSelect, Cascader, Calendar,          │
│    Transfer, VirtualList                    │
│                                             │
│  components/ui/ (44 components)             │
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
│    49 component CSS files                   │
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

**Data Display (16):** Table, DataGrid, Tree, List, Tabs, Collapse, Descriptions, Badge, Tag, Avatar, Calendar, Carousel, Timeline, Steps, Segmented, Skeleton

**Feedback (9):** Modal, Drawer, Notification, Popconfirm, Tooltip, Progress, Spin, Result, Empty

**Navigation (5):** Menu, Breadcrumb, Dropdown, Pagination, Transfer

**Form (7):** Form, Field, FormList, FormProvider, SchemaForm, AutoField, SubmitButton

**Utility (1):** Transition (CSS-class-based animations)

## Tests

```
428 tests across core + react packages
  @skygraph/core:  146 tests (form, runtime, engines)
  @skygraph/react: 282 tests (components, hooks, adapters, a11y)
```

## Development

```bash
pnpm install           # install deps
pnpm build             # build all packages
pnpm test              # run tests (428 tests)
pnpm lint              # eslint
pnpm format            # prettier

# Demo app (Ant-style interactive docs)
cd examples/demo
npm run dev            # → http://localhost:5173/skygraph/
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
