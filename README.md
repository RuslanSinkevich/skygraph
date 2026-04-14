# SkyGraph

**Reactive UI library with a state graph engine at its core.**

AntD-level components + reactive state management out of the box. Forms, tables, trees — no boilerplate. CSS Variables, zero runtime, framework-agnostic styles.

[![CI](https://github.com/skygraph/skygraph/actions/workflows/ci.yml/badge.svg)](https://github.com/skygraph/skygraph/actions/workflows/ci.yml)
[![npm @skygraph/core](https://img.shields.io/npm/v/@skygraph/core)](https://www.npmjs.com/package/@skygraph/core)
[![npm @skygraph/react](https://img.shields.io/npm/v/@skygraph/react)](https://www.npmjs.com/package/@skygraph/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Features

- **Reactive Core** — path-based store with granular subscriptions, transactions, batching, computed values with cycle detection
- **Domain Engines** — FormEngine (validation, dependencies), TableEngine (sort, filter, pagination), TreeEngine (check cascade, drag & drop, async load)
- **50+ React Components** — from Button to Table, Calendar, Tree, Transfer
- **Zero-runtime CSS** — 3-layer token system (palette → semantic → component), dark mode via `data-sg-theme`
- **Accessible** — ARIA roles, keyboard navigation, focus management
- **Type-safe** — TypedCore wrapper for compile-time path validation

## Quick Start

```bash
npm install @skygraph/core @skygraph/react
```

```tsx
import '@skygraph/react/styles'
import { Form, Field, SubmitButton, Button } from '@skygraph/react'

function App() {
  return (
    <Form
      defaultValues={{ username: '', email: '' }}
      onSubmit={async ({ values }) => {
        await saveUser(values)
      }}
    >
      <Field name="username" label="Username" required />
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
| `@skygraph/react` | React hooks, 50+ components, CSS styles | ~244 KB (ESM) |

## Architecture

```
@skygraph/core (pure TS, 0 dependencies)
┌─────────────────────────────────────────┐
│  runtime/                               │
│    Store, Batch, Transaction,           │
│    Computed, Scheduler                  │
│                                         │
│  engines/                               │
│    FormEngine, TableEngine, TreeEngine  │
└─────────────────────────────────────────┘
          ▲ public API only
          │
@skygraph/react (peer: core + react)
┌─────────────────────────────────────────┐
│  hooks/      useForm, useField, ...     │
│  components/complex/  Form, Table, Tree │
│  components/ui/       Button, Modal, .. │
│  styles/     tokens, themes, components │
└─────────────────────────────────────────┘
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

## Component List

**Data Entry:** Button, Input, InputNumber, Textarea, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker, AutoComplete, Rate, Upload, ColorPicker, Cascader, TreeSelect, Transfer

**Data Display:** Table, Tree, List, Tabs, Collapse, Descriptions, Badge, Tag, Avatar, Calendar, Carousel, Timeline, Steps, Segmented, Skeleton, Empty

**Feedback:** Modal, Drawer, Notification, Popconfirm, Tooltip, Progress, Spin, Result

**Navigation:** Menu, Breadcrumb, Dropdown, Pagination

## Development

```bash
pnpm install        # install deps
pnpm build          # build all packages
pnpm test           # run tests (166 tests)
pnpm lint           # eslint
pnpm format         # prettier
```

## Documentation

- [Getting Started](https://skygraph.github.io/skygraph/#/getting-started)
- [Components](https://skygraph.github.io/skygraph/#/components/button)
- [Theming](https://skygraph.github.io/skygraph/#/theming)
- [Core API](https://skygraph.github.io/skygraph/#/core-api)
- [Architecture](ARCHITECTURE.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)
