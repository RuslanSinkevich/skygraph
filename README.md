# SkyGraph

> English version: [README.en.md](README.en.md)

**UI-компоненты для React и Vue на общем движке. Одна установка, один CSS, одинаковый вид.**

Готовые компоненты — формы, таблицы, деревья, графики, календари,
диаграммы, дашборды. Один и тот же DOM, одни и те же классы `.sg-*`,
одинаковое поведение в обоих адаптерах. Бесплатно, MIT.

[![CI](https://github.com/RuslanSinkevich/skygraph/actions/workflows/ci.yml/badge.svg)](https://github.com/RuslanSinkevich/skygraph/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Быстрый старт (React)

```bash
npm install skygraph-react
```

```tsx
import { Form, Field, SubmitButton } from 'skygraph-react'

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

Стили подключаются автоматически — не нужен отдельный `import '@skygraph/styles'`
и отдельная установка `@skygraph/core`.

## Быстрый старт (Vue 3)

```bash
npm install skygraph-vue
```

```vue
<script setup lang="ts">
import { SgForm, SgField, SgSubmitButton } from 'skygraph-vue'

async function onSubmit(values: Record<string, unknown>) {
  await saveUser(values)
}
</script>

<template>
  <SgForm :default-values="{ username: '', email: '' }" @submit="onSubmit">
    <SgField name="username" label="Username" :rules="[{ required: true }]" />
    <SgField name="email"    label="Email"    :rules="[{ type: 'email' }]" />
    <SgSubmitButton>Submit</SgSubmitButton>
  </SgForm>
</template>
```

Тот же DOM и те же CSS-классы — смена фреймворка не меняет внешний вид.
Подробнее: [`docs/multi-framework.md`](./docs/multi-framework.md).

## Возможности

- **Компоненты для React и Vue** — Button, Input, Select,
  DatePicker, Table, DataGrid, Tree, Transfer, TreeSelect, Cascader,
  Diagram, Charts (Line / Bar / Area / Pie), Dashboard, Gantt,
  EventTimeline, ResourceCalendar, SchemaFormEditor и остальной набор
  в духе AntD.
- **Один движок для React и Vue** — общий runtime (`@skygraph/core`)
  хранит состояние, оба адаптера на него подписываются. Обновил движок
  один раз — синхронны оба.
- **Одинаковый вид из коробки** — React и Vue рендерят один и тот же DOM
  и одни и те же классы `.sg-*`. Смена фреймворка не меняет UI.
- **Лёгкий и предсказуемый CSS** — ~25 KB gzip, без CSS-in-JS и
  runtime-инъекций. Тёмная и светлая темы — одним атрибутом на `<html>`.
- **TypeScript в первую очередь** — строгие типы от начала до конца. Схемы
  форм из JSON Schema или Zod. Никаких `any` в публичном API.
- **Доступность по умолчанию** — навигация с клавиатуры, ARIA-роли и
  управление фокусом встроены.
- **Печать / PDF** — у таблиц, диаграмм и графиков есть проп `printable`
  и метод `ref.print()`, открывающий чистый системный диалог печати.

## Темизация

Только CSS Variables — никаких накладных расходов в JS-рантайме.

```css
:root {
  --sg-color-primary: #7c3aed;
  --sg-border-radius: 8px;
}
```

Тёмная тема:

```html
<div data-sg-theme="dark">
  <!-- все вложенные элементы используют тёмную тему -->
</div>
```

Четыре уровня кастомизации:

1. **Глобальная тема** — переопределить токены `--sg-color-*`
2. **Тип компонента** — переопределить переменные `--sg-btn-*`
3. **Экземпляр** — проп `unstyled` + render props для своего UI
4. **Headless** — без CSS, только хуки (`useField`, `useForm` и т.д.)

Справочник:

- [`docs/styling-contract.md`](./docs/styling-contract.md) — стабильные токены, корневые классы, слоты, API `classNames` / `styles`, политика версионирования.
- [`docs/styling-recipes.md`](./docs/styling-recipes.md) — практические рецепты: свой бренд, тёмная тема, переопределения для отдельных компонентов, условные стили строк и ячеек, полный режим `unstyled`.

## Список компонентов

**Ввод данных:** Button, Input, InputNumber, Textarea, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker, AutoComplete, Rate, Upload, ColorPicker, Cascader, TreeSelect, Mentions

**Отображение данных:** Table, DataGrid, Tree, List, Tabs, Collapse, Descriptions, Badge, Tag, Avatar, Calendar, Carousel, Timeline, Steps, Segmented, Skeleton, Diagram

**Визуализация:** LineChart, BarChart, AreaChart, PieChart, Dashboard, DashboardEditor, Gantt, EventTimeline, ResourceCalendar

**Обратная связь:** Modal, Drawer, Notification, Popconfirm, Tooltip, Progress, Spin, Result, Empty

**Навигация:** Menu, Breadcrumb, Dropdown, Pagination, Transfer

**Формы:** Form, Field, FormList, FormProvider, SchemaForm, SchemaFormEditor, AutoField, SubmitButton

**Утилиты:** Transition (анимации на CSS-классах)

Vue-адаптер содержит тот же набор с префиксом `Sg*` — `SgButton`,
`SgInput`, `SgForm`, `SgTable`, `SgDiagram`, `SgDashboard`,
`SgSchemaFormEditor` и т.д.

## Обзор архитектуры

`skygraph-react` и `skygraph-vue` — мета-пакеты: они реэкспортируют
адаптер и подтягивают runtime и CSS транзитивными зависимостями.
Внутреннее разделение выглядит так:

```
@skygraph/core         — runtime на чистом TS + движки (формы, таблицы, ...)
@skygraph/styles       — CSS без привязки к фреймворку (токены, темы, стили компонентов)
@skygraph/react        — React-хуки и компоненты (peer: core + react)
@skygraph/vue          — Vue 3 composables и компоненты (peer: core + vue)
skygraph-react         — мета-пакет: react-адаптер + core + styles
skygraph-vue           — мета-пакет: vue-адаптер + core + styles
```

Нижележащие пакеты можно ставить и напрямую, если нужен точный контроль
(например, отдать только CSS в одно приложение, а адаптер — в другое).
Полный разбор — в [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Разработка

```bash
pnpm install           # установить зависимости воркспейса (packages/* + examples/*)
pnpm build             # собрать все пакеты
pnpm test              # тесты (1672+ в core + react + vue)
pnpm lint              # eslint
pnpm typecheck         # tsc --noEmit (рекурсивно)
pnpm format            # prettier
pnpm check:styles      # аудит токенов / !important / классов (гейт в CI)

# React-демо (интерактивная документация + бенчмарки)
cd examples/demo
pnpm dev               # → http://localhost:5173/skygraph/

# Vue 3-демо (зеркало React-документации)
cd examples/demo-vue
pnpm dev

# Showcases (12 мини-приложений — CRM, Helpdesk, Inbox, Dashboard, …)
cd examples/showcases
pnpm dev
```

### Деплой нескольких фреймворков

В папке `deploy/` лежит раскладка по подкаталогам (Caddy + Docker), чтобы
отдавать интерактивную документацию React и Vue на одном домене (`/react/`,
`/vue/` и статический лендинг). Подробнее: [`deploy/README.md`](./deploy/README.md).

```bash
node deploy/build-all.mjs                         # локальная статическая сборка
docker build -f deploy/Dockerfile -t skygraph .   # в контейнере
```

## Документация

- Демо — запускаются локально, см. [Разработка](#разработка): интерактивная документация React и Vue, 12 showcase-приложений
- [Архитектура](ARCHITECTURE.md) — внутренние проектные решения
- [Стратегия multi-framework](docs/multi-framework.md) — контракт адаптеров React ↔ Vue
- [Контракт стилей](docs/styling-contract.md) / [рецепты](docs/styling-recipes.md)
- [Changelog](CHANGELOG.md)

## Другие проекты автора

SkyGraph — один из pet-проектов [Руслана Синкевича](https://ruslansinkevich.ru/):

- [GitBor](https://gitbor.ru/) — кроссплатформенный десктопный Git-клиент (Electron, [github.com/RuslanSinkevich/gitbor](https://github.com/RuslanSinkevich/gitbor))
- [SkyGraph](https://github.com/RuslanSinkevich/skygraph) — UI-библиотека для нескольких фреймворков (этот репозиторий)
- [Skycode](https://github.com/RuslanSinkevich/skycode) — форк VS Code со встроенным AI-ассистентом

Контакты: [ruslansinkevich.ru](https://ruslansinkevich.ru/), [Telegram](https://t.me/ruslansinkevich), [GitHub](https://github.com/RuslanSinkevich).

## Лицензия

[MIT](LICENSE)
