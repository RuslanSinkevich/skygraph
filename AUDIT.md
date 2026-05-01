# SkyGraph — Audit Report (Stream 1)

> Дата: 2026-05-01
> Версия: 1.0 (стрим 1)
> Метод: ручная инспекция кода и документации без правок.

---

## Оглавление

1. [Структура репозитория и инвентарь](#1-структура-репозитория-и-инвентарь)
2. [Архитектурные границы](#2-архитектурные-границы)
3. [Состояние тестов и покрытие](#3-состояние-тестов-и-покрытие)
4. [Расхождения README / ARCHITECTURE с фактом](#4-расхождения-readme--architecture-с-фактом)
5. [Стилевой контракт](#5-стилевой-контракт)
6. [examples/demo и examples/showcases](#6-examplesdemo-и-examplesshowcases)
7. [Зависимости и инфраструктура](#7-зависимости-и-инфраструктура)
8. [Dead code, дубли, неконсистентное именование](#8-dead-code-дубли-неконсистентное-именование)
9. [Локализация и a11y (беглый обзор)](#9-локализация-и-a11y-беглый-обзор)
10. [Приоритизация исправлений](#10-приоритизация-исправлений)

---

## 1. Структура репозитория и инвентарь

### 1.1 Корень репозитория

**Документы:**
- `README.md` — публичное описание проекта
- `ARCHITECTURE.md` — архитектурная конституция (заморозка API)
- `CHANGELOG.md` — релизы 0.1.0 / 0.2.0 / 0.3.0 + Unreleased
- `CONTRIBUTING.md` — правила контрибьюции
- `PLAN.md` — старый план разработки (до начала; ~480 строк)
- `STREAM-PLAN.md` — текущий опорный план длинных стримов (создан в стриме 1)
- `CYCLE-LOG.md`, `TODO-cycle.md`, `AUDIT.md` — артефакты стримов
- `LICENSE` — MIT

**Конфиги:**
- `package.json` — корневой workspace (skygraph, private)
- `pnpm-workspace.yaml` + `pnpm-lock.yaml` — pnpm как пакет-менеджер
- ⚠ `package-lock.json` — присутствует одновременно с pnpm-lock.yaml. Один из двух лишний.
- `tsconfig.base.json` — общая TS-база
- `eslint.config.js` — flat config (eslint 9.x, typescript-eslint, react-hooks, prettier)
- `.prettierrc`, `.prettierignore`, `.gitignore`

**Папки:**
- `.github/` — CI workflow
- `docs/` — документация (12 .md файлов)
- `examples/` — `demo` + `showcases`
- `packages/` — `core` + `react`
- `scripts/` — утилиты для аудита стилей/токенов
- `node_modules/` — зависимости (не в скоупе)

### 1.2 packages/core

**43 .ts файла**, разбиты на:

```
packages/core/src/
├── index.ts                       # публичный API (createCore, createForm, ...)
├── runtime-internal.ts            # для engines, нестабильный
├── Core.ts                        # реализация createCore
├── types.ts                       # публичные типы
├── typed.ts                       # TypedCore<T> compile-time wrapper
│
├── runtime/  (8 файлов)
│   ├── Store.ts
│   ├── Batch.ts
│   ├── Transaction.ts
│   ├── ComputedEngine.ts
│   ├── SubscriptionEngine.ts
│   ├── Scheduler.ts
│   ├── CycleDetector.ts
│   ├── Node.ts
│   └── index.ts
│
├── engines/
│   ├── namespaces.ts              # reservePrefix + FORM_META_PREFIX, ...
│   ├── form/      (FormEngine, types, index)
│   ├── table/     (TableEngine, types, index)
│   ├── tree/      (TreeEngine, types, index)
│   └── virtual/   (index — VirtualEngine)
│
├── middleware/
│   ├── logger.ts
│   ├── persistence.ts
│   ├── freeze.ts
│   ├── validation.ts
│   └── index.ts
│
├── plugins/
│   ├── history.ts                 # createHistory + HistoryPlugin
│   └── index.ts
│
└── __tests__/  (11 файлов)
    ├── core.test.ts
    ├── form.test.ts
    ├── form-extended.test.ts
    ├── table.test.ts
    ├── table-extended.test.ts
    ├── tree.test.ts                # ⚠ docs/status.md ошибочно говорит "нет тестов TreeEngine"
    ├── virtual.test.ts
    ├── history.test.ts
    ├── typed.test.ts
    ├── middleware.test.ts
    └── benchmark.test.ts
```

### 1.3 packages/react

**135 файлов** (.ts/.tsx), включая 5 тестовых.

```
packages/react/src/
├── index.ts                       # главный entrypoint
├── form.ts, table.ts, tree.ts, virtual.ts   # subpath entrypoints
│
├── components/
│   ├── ConfigProvider.tsx
│   ├── ui/                        # 39+ компонентов: Button, Input, Modal, ...
│   ├── complex/                   # Form, Table, Tree, List, TreeSelect,
│   │                              # Cascader, Calendar, Transfer, VirtualList,
│   │                              # DataGrid, AutoField, Field, FormProvider, ...
│   └── devtools/                  # HistoryPanel.tsx
│
├── hooks/
│   ├── useForm, useField, useFieldArray, useWatch, useComputed
│   ├── useTable, useTree, useVirtualScroll, useHistory
│   └── a11y/  (useFocusTrap, useRovingTabIndex, useListNavigation)
│
├── adapters/
│   ├── jsonSchemaAdapter.ts
│   └── zodAdapter.ts
│
├── locales/
│   ├── en_US.ts, ru_RU.ts, index.ts
│
├── types/  (index.ts, slots.ts)
│
└── __tests__/  (5 файлов)
    ├── components.test.tsx
    ├── complex-components.test.tsx
    ├── new-components.test.tsx
    ├── ui-components.test.tsx
    ├── hooks.test.tsx
    ├── jsonSchemaAdapter.test.ts
    ├── zodAdapter.test.ts
    └── styling-contract.test.tsx
```

`packages/react/styles/` — отдельная директория (через `exports`):
- `tokens.css`, `reset.css`, `transitions.css`
- `themes/` (default.css, dark.css)
- `components/` (по одному CSS на компонент)

### 1.4 examples/demo

**511 файлов** (.ts/.tsx). Огромный объём — это интерактивная Ant-style документация.

Замечания по структуре (детально в Секции 6):
- **Смешанный паттерн**: часть демо живёт как старые `XxxDemo.tsx` (`BadgeDemo.tsx`, `ModalDemo.tsx`, `DatePickerDemo.tsx`), часть как новый `<component>/<Variant>.demo.tsx` паттерн (`badge/Basic.demo.tsx`, `modal/NoFooter.demo.tsx`).
- **Потенциальный дубль:** есть и `BadgeDemo.tsx` и `badge/*.demo.tsx`. Аналогично для Modal, DatePicker, Tabs, Pagination и др.

### 1.5 examples/showcases

**19 файлов** (.ts/.tsx). 9 шоукейсов:
- `admin/AdminApp.tsx` — **562 строки одним файлом**
- `analytics/AnalyticsApp.tsx`
- `crm/CrmApp.tsx`
- `ecommerce/EcommerceApp.tsx`
- `file-manager/FileManagerApp.tsx`
- `forms/FormsApp.tsx`
- `hr-portal/HrPortalApp.tsx`
- `project-tracker/ProjectTrackerApp.tsx`
- `table-kitchen-sink/TableKitchenSinkApp.tsx`

Каждый шоукейс = один `App.tsx` + `data.ts`. Нет декомпозиции на страницы/виджеты/компоненты.

### 1.6 docs/

12 .md файлов:
- `README.md` — индекс документации
- `quick-start.md` — быстрый старт
- `architecture.md` — публичное описание архитектуры (отдельный файл, не путать с корневым `ARCHITECTURE.md`)
- `core-engine.md` — описание ядра
- `components.md` — каталог компонентов
- `conventions.md` — конвенции кода
- `status.md` — состояние проекта (датирован 2026-04-06, **частично устарел**)
- `styling.md` — общее про стили
- `styling-plan.md` — план работ по стилевой реформе
- `styling-contract.md` — публичный стилевой контракт (введён в Unreleased)
- `styling-recipes.md` — практические рецепты
- `_audit/styling-audit.md` — авто-сгенерированный отчёт скриптом `scripts/audit-styles.mjs`

### 1.7 scripts/

Утилиты для CI и аудита (детали см. Секцию 5/7):
- `audit-styles.mjs` — генерирует `_audit/styling-audit.md`
- `check-tokens.mjs` — все `var(--sg-*)` объявлены в `tokens.css`
- `check-no-important.mjs` — запрет `!important` (с allowlist для a11y/print)

### 1.8 Сводка инвентаря

| Метрика | Значение |
|---------|----------|
| Пакетов в монорепо | 2 (`@skygraph/core`, `@skygraph/react`) |
| Файлов в `packages/core/src/` | 43 (включая 11 тестов) |
| Файлов в `packages/react/src/` | 135 (включая 8 тестов) |
| Тестовых файлов всего (.test.ts/.tsx) | 20 (14 + 6) |
| Файлов в `examples/demo/src/` | 511 |
| Файлов в `examples/showcases/src/` | 19 |
| .md файлов в `docs/` | 12 |
| CSS-файлов в `packages/react/styles/components/` | ~53 |
| Текущая релизная версия | 0.3.0 (2026-04-14), есть Unreleased |

## 2. Архитектурные границы

### 2.1 Заявленные границы (`ARCHITECTURE.md` + `eslint.config.js`)

```
runtime/   ──❌──>  engines/        (запрещено)
engines/   ──❌──>  engines/        (cross-import между form/table/tree запрещён)
engines/   ──❌──>  runtime/Store, runtime/Batch, ...   (только через ../../types или runtime-internal)
ui/        ──❌──>  @skygraph/core/runtime-internal, /form, **/engines, **/runtime
```

Нарушения **статически enforced** через `no-restricted-imports` в flat-конфиге ESLint.

### 2.2 Фактическая проверка (grep по импортам)

| Граница | Проверено | Нарушений |
|---------|-----------|-----------|
| `runtime/` не импортирует `engines/` | grep `from "*engines/*"` в `runtime/` | **0** |
| `engines/` не cross-import (form↔table↔tree) | grep `from "*../{form,table,tree,virtual}/*"` в `engines/*/` | **0** |
| `engines/` не лезут в `runtime/Store` и т.п. | grep `from "*runtime/<primitive>"` в `engines/` | **0** |
| `engines/` не используют `runtime/` напрямую | grep `from "../runtime"` или `"../../runtime"` в `engines/` | **0** |
| `components/ui/` не импортирует `@skygraph/core` | grep `@skygraph/core` в `components/ui/` | **0** |

### 2.3 Что фактически импортируют engines

```
FormEngine.ts:  import type { Core } from '../../types'
                import { FORM_META_PREFIX as META_PREFIX } from '../namespaces'

TableEngine.ts: import type { Core } from '../../types'
                import { TABLE_PREFIX } from '../namespaces'

TreeEngine.ts:  import type { Core } from '../../types'
                import { TREE_PREFIX } from '../namespaces'
```

**Чисто** — все 3 engine берут только публичный `Core` интерфейс + свой зарезервированный префикс. `runtime-internal` фактически не используется ни одним engine.

### 2.4 Что импортируют React-хуки

```
useForm.ts:    createCore, createForm + типы из '@skygraph/core' (public)
useTable.ts:   createCore, createTable
useTree.ts:    createCore, createTree
useHistory.ts: Core, createHistory + HistoryPlugin/Options
useVirtualScroll.ts: createVirtual + VirtualEngine/VirtualRange
useField/useWatch/useComputed/useFieldArray: только типы (Core, FormEngine, FieldMeta, Rule, ...)
```

Все импорты идут через публичный `@skygraph/core`. Никаких subpath `/runtime-internal`.

### 2.5 Что импортируют complex-компоненты

| Файл | Импорт |
|------|--------|
| `Form.tsx` | type `ValidationMode` |
| `FormContext.ts` | type `Core, FormEngine` |
| `FormProvider.tsx` | type `FormEngine` |
| `FormList.tsx` | type `FormListOperation` |
| `Field.tsx` | type `Rule` |
| `Table/helpers.ts`, `Table/types.ts` | type `RowId, SortConfig, SortDirection` |
| `Tree/types.ts`, `TreeSelect/types.ts` | type `TreeKey, TreeNodeData, TreeFieldNames` |
| `VirtualList/VirtualList.tsx` | type `VirtualItem` |

Все импорты — **только типы**. Реализационная связь идёт через хуки.

### 2.6 Замечание: `runtime-internal` фактически не используется

`packages/core/src/runtime-internal.ts` экспортирует Store, SubscriptionEngine, Batch, Transaction, ComputedEngine, CycleDetector, Scheduler как **публичный entrypoint** для авторов кастомных engines. Но:

- Никто из встроенных engines (form/table/tree/virtual) его не импортирует.
- Никто из `@skygraph/react` его не импортирует.

Это не нарушение, но кандидат в **TODO**: либо появится первый внешний потребитель (например, GraphEngine из Стрима 5), либо стоит подумать, нужен ли вообще этот публичный subpath.

### 2.7 ESLint игнорирует `examples/`

В `eslint.config.js`:
```
ignores: ['**/dist/', '**/node_modules/', 'examples/']
```

Следствие: внутри `examples/demo/` и `examples/showcases/` границы импортов **не проверяются**. Демо может неконтролируемо импортировать что угодно (это не критично — демо должно использовать только публичный API через npm/pnpm-link, но проверки нет).

### 2.8 Вердикт по архитектурным границам

**Зелёный.** Заявленные границы соблюдаются и фактически, и через статические правила. Минорные замечания:

- `runtime-internal` — неиспользуемая публичная поверхность (заявлена для будущих внешних engines).
- ESLint не покрывает `examples/`.

## 3. Состояние тестов и покрытие

### 3.1 Запуск (фактически)

Команда: `pnpm -r test`

```
packages/core test:  RUN  v2.1.9
  ✓ core.test.ts            (20 tests)  16ms
  ✓ table-extended.test.ts  (20 tests)  16ms
  ✓ middleware.test.ts      (17 tests)  13ms
  ✓ tree.test.ts            (45 tests)  30ms
  ✓ form-extended.test.ts   (28 tests)  275ms
  ✓ form.test.ts            (19 tests)  336ms
  ✓ virtual.test.ts         (18 tests)  8ms
  ✓ history.test.ts         (15 tests)  151ms
  ✓ typed.test.ts           (5 tests)   7ms
  ✓ benchmark.test.ts       (8 tests)   151ms
  ✓ table.test.ts           (22 tests)  11013ms  ⚠
  Test Files  11 passed (11)
       Tests  217 passed (217)
    Duration  12.58s

packages/react test:  RUN  v2.1.9
  ✓ jsonSchemaAdapter.test.ts     (8 tests)
  ✓ hooks.test.tsx                (23 tests)
  ✓ new-components.test.tsx       (20 tests)
  ✓ components.test.tsx           (49 tests)
  ✓ zodAdapter.test.ts            (5 tests)
  ✓ styling-contract.test.tsx     (13 tests)
  ✓ export.test.ts                (5 tests)
  ✓ ui-components.test.tsx        (103 tests)
  ✓ complex-components.test.tsx   (54 tests)
  Test Files  9 passed (9)
       Tests  280 passed (280)
    Duration  6.91s
```

**Все тесты зелёные.**

### 3.2 Сводка

| Метрика | Core | React | Всего |
|---------|------|-------|-------|
| Тестовых файлов | 11 | 9 | **20** |
| Тестов (it/test) | 217 | 280 | **497** |
| Время (быстрее на холодном запуске) | 12.58s | 6.91s | ~19.5s |

### 3.3 Расхождение с заявленным числом

`README.md` пишет **«428 tests across core + react»** (146 + 282).

Фактически:
- **core: 217** (заявлено 146 — недосчитали 71)
- **react: 280** (заявлено 282 — почти совпало, ±2)
- **всего: 497** (заявлено 428 — недосчитали 69)

Скорее всего цифра в README заморожена с релиза 0.3.0 / Unreleased и не обновлялась. Кандидат в Стрим 9 (доки).

### 3.4 Покрытие по модулям

Косвенное покрытие (по наличию специализированного теста):

| Модуль | Тестовый файл | Покрытие |
|--------|----------------|----------|
| `runtime/Store` | `core.test.ts` (через Core API) | косвенное |
| `runtime/Batch` | `core.test.ts` | косвенное |
| `runtime/Transaction` | `core.test.ts` | косвенное |
| `runtime/ComputedEngine` | `core.test.ts` | косвенное |
| `runtime/Scheduler` | `core.test.ts` | косвенное |
| `runtime/CycleDetector` | — | **только через core** |
| `runtime/SubscriptionEngine` | — | **только через core** |
| `engines/form/FormEngine` | `form.test.ts` + `form-extended.test.ts` | **47 тестов** |
| `engines/table/TableEngine` | `table.test.ts` + `table-extended.test.ts` | **42 теста** |
| `engines/tree/TreeEngine` | `tree.test.ts` | **45 тестов** |
| `engines/virtual/VirtualEngine` | `virtual.test.ts` | **18 тестов** |
| `middleware/*` | `middleware.test.ts` | **17 тестов** |
| `plugins/history` | `history.test.ts` | **15 тестов** |
| `typed.ts` (TypedCore) | `typed.test.ts` | **5 тестов** |
| `*` (производительность) | `benchmark.test.ts` | **8 тестов** |

> ⚠ Замечание: `docs/status.md` ошибочно заявляет «❌ Нет тестов для TreeEngine». Фактически — 45 тестов в `tree.test.ts`. Расхождение в Секции 4.

### 3.5 Покрытие React-пакета

| Область | Тесты |
|---------|-------|
| UI-компоненты | `ui-components.test.tsx` (103) + `components.test.tsx` (49) + `new-components.test.tsx` (20) |
| Complex-компоненты | `complex-components.test.tsx` (54) |
| Хуки | `hooks.test.tsx` (23) |
| Адаптеры | `jsonSchemaAdapter.test.ts` (8) + `zodAdapter.test.ts` (5) |
| Стилевой контракт | `styling-contract.test.tsx` (13) |
| Экспорт CSV/TSV | `export.test.ts` (5) |

### 3.6 Конфигурация vitest

- `packages/react/vitest.config.ts` — есть, environment: `jsdom`, `globals: true`.
- `packages/core/vitest.config.ts` — **отсутствует** (vitest работает на дефолтах). Это норма для core, но если потребуется coverage / setupFiles — придётся добавить.
- **Coverage не настроен** ни в одном пакете (нет `--coverage` флагов, нет `@vitest/coverage-*` в devDependencies). Невозможно посчитать процент покрытия по строкам.

### 3.7 Производительность (бенчмарки)

Из `benchmark.test.ts` и `table.test.ts > scalability`:

| Сценарий | Время | Комментарий |
|----------|-------|-------------|
| Core: 10k set | 13.5ms | хорошо |
| Core: 10k get | 1.9ms | очень хорошо |
| Core: 10k subscribe | 9.2ms | хорошо |
| Core: 10k unsubscribe | 5.8ms | хорошо |
| Form: 1000 register | 17ms | хорошо |
| Form: 1000 setValue | 8.4ms | хорошо |
| Form: 1000 validate (sync) | 28.1ms | хорошо |
| Table: 100k addRows | **1237ms** | приемлемо |
| Table: 100k getVisible | **0.3ms** | отлично |
| Table: 100k sort | **6634ms** | ⚠ медленно |
| Table: 100k filter | **3126ms** | ⚠ медленно |

**Замечание:** `table.test.ts` на 100k строках — единственный медленный тест в наборе (11 секунд). Это влияет на скорость CI и dev-цикла. Кандидат: вынести в отдельный набор «slow / benchmark» с `vitest --testNamePattern` или `it.skip` по умолчанию + ручной запуск. Записано в TODO.

### 3.8 Вердикт по тестам

- Все тесты зелёные.
- Хорошее покрытие engines (form/table/tree/virtual).
- Нет настроенного coverage — нельзя посчитать % по строкам.
- README цифры устарели на ~69 тестов.
- Один тест (table.test.ts scalability) ест 11s — кандидат на изоляцию.

## 4. Расхождения README / ARCHITECTURE с фактом

### 4.1 Числа компонентов

| Источник | UI | Complex | Всего | CSS |
|----------|-----|---------|-------|-----|
| `README.md` | 44 | 11 | "**55+**" | 49 |
| `docs/status.md` (2026-04-06) | 39 | 11 | 50 | 53 |
| `ARCHITECTURE.md` | "44 ui" в схеме | — | — | — |
| **Фактически** (.tsx файлы) | **50** | **16 уникальных** | **66** | **56** |

**Расхождение:** README отстаёт на ~11 компонентов, status.md отстаёт сильнее. CSS-файлов на 7 больше чем заявлено в README, на 3 больше чем в status.md.

### 4.2 Число тестов

| Источник | Заявлено |
|----------|----------|
| `README.md` | 428 (146 + 282) |
| **Фактически** | **497 (217 + 280)** |

(Подробности в Секции 3.) Расхождение: +69 тестов суммарно.

### 4.3 docs/status.md устарел

Файл датирован 2026-04-06. Расхождения с реальностью:

| Заявление в `status.md` | Факт |
|-------------------------|------|
| ❌ Нет тестов для TreeEngine | ✅ Есть `tree.test.ts` (45 тестов) |
| 50 компонентов | ~66 |
| 53 CSS-файлов | 56 |
| 41 демо-страница | ~480+ файлов в `demos/` (после введения `*/Variant.demo.tsx` паттерна) |
| Известные проблемы: `Notification.tsx` `useCallback` unused | требует проверки в текущей версии |
| Известные проблемы: `useField.ts` `onFieldBlur` не существует | требует проверки в текущей версии |

**Решение:** обновить или пометить как archived в Стриме 9.

### 4.4 ARCHITECTURE.md vs реальность

| Заявление | Реальность | Статус |
|-----------|------------|--------|
| Префикс form `$meta.` | `FORM_META_PREFIX = '$meta.'` | ✅ совпадает |
| Префикс table `$table.` | `TABLE_PREFIX = '$table.'` | ✅ совпадает |
| Префикс tree `$tree.` | `TREE_PREFIX = '$tree.'` | ✅ совпадает |
| Engines не cross-import | grep подтверждает | ✅ соблюдается |
| ESLint статически enforce'ит границы | `eslint.config.js` имеет правила | ✅ совпадает |
| `runtime/` не импортирует `engines/` | grep подтверждает | ✅ соблюдается |
| Core API заморожен | публичный `index.ts` стабилен | ✅ совпадает |
| FormEngine API заморожен | API существует и не урезан | ✅ совпадает |

В целом **ARCHITECTURE.md актуален**, расхождений нет.

### 4.5 Subpath entrypoints — путаница с TreeSelect

`packages/react/package.json` декларирует subpath exports:
- `@skygraph/react` (главный)
- `@skygraph/react/form` (`form.ts`)
- `@skygraph/react/table` (`table.ts`)
- `@skygraph/react/tree` (`tree.ts`)
- `@skygraph/react/virtual` (`virtual.ts`)
- `@skygraph/react/datagrid` (`datagrid.ts`)
- `@skygraph/react/devtools` (`devtools.ts`)

**Проблема:** `TreeSelect` экспортируется по-разному из двух entrypoint:

| Импорт | Реализация | Путь файла |
|--------|------------|------------|
| `import { TreeSelect } from '@skygraph/react'` | **UI-версия** (без core) | `components/ui/TreeSelect.tsx` |
| `import { TreeSelect } from '@skygraph/react/tree'` | **Complex-версия** (с core) | `components/complex/TreeSelect/` |

Это два **разных компонента** с одним именем. Пользователь получит разную семантику в зависимости от пути импорта. Это **серьёзный баг публичного API**.

`Calendar`: экспорт идёт из `ui/Calendar.tsx`, который **реэкспортирует** complex-версию. Не дубль, но `ui/Calendar.tsx` нарушает идею "ui без core" (Calendar внутри использует core через хуки).

**Кандидат на исправление в отдельном стриме (не в текущей очереди):**
- Решить какая реализация `TreeSelect` основная, удалить вторую.
- Решить нужен ли `ui/Calendar.tsx` как реэкспорт или унифицировать.

### 4.6 `complex/Transfer/` — мёртвый код

`Transfer` экспортируется в публичном `index.ts` из `components/ui/Transfer`. Сама папка `components/complex/Transfer/` содержит:
- `Transfer.tsx`
- `TransferList.tsx`
- `types.ts`
- `index.ts`

Эта реализация **не экспортируется ни из одного публичного entrypoint**. Используется только в `__tests__/complex-components.test.tsx`. Это либо забытый рефакторинг (была complex-версия, заменили на ui), либо незавершённая миграция в обратную сторону.

**Кандидат:** удалить `components/complex/Transfer/` или вернуть в публичный API.

### 4.7 CI workflow на ветке `main`, локальная ветка — `master`

`.github/workflows/ci.yml`:
```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

Локальная ветка — `master`. CI badge в README ссылается на `actions/workflows/ci.yml` — но если репозиторий на GitHub использует `master`, CI **никогда не запустится**. Если основная ветка на удалённом — `main`, тогда расхождение между локальным и удалённым.

**Кандидат:** проверить какая ветка основная на удалённом, привести в соответствие.

### 4.8 README указывает использовать pnpm, но есть `package-lock.json`

Корень репо содержит ОДНОВРЕМЕННО:
- `pnpm-workspace.yaml` + `pnpm-lock.yaml` (основная система)
- `package-lock.json` (атавизм npm)

README пишет:
```bash
pnpm install
pnpm build
pnpm test
```

`package-lock.json` либо забыт от npm-версии до перехода на pnpm, либо генерируется при случайном `npm install` в корне. **Кандидат:** удалить `package-lock.json`, добавить в `.gitignore`.

### 4.9 README упоминает «428 tests» в двух местах

```markdown
**Tests** — 282 new tests across UI components, hooks, and adapters (428 total)  ← в CHANGELOG 0.2.0
428 tests across core + react packages
  @skygraph/core:  146 tests (form, runtime, engines)
  @skygraph/react: 282 tests (components, hooks, adapters, a11y)
```

Цифры одинаковые в README и CHANGELOG[0.2.0]. Релизы были 0.2.0 → 0.3.0, тесты прирастали — но цифра не обновлялась. Кандидат в Стрим 9.

### 4.10 Вердикт

| Категория | Статус |
|-----------|--------|
| ARCHITECTURE.md vs реализация | ✅ соответствует |
| README числа | ⚠ устарели (компоненты, тесты) |
| docs/status.md | ⚠ заметно устарел (2026-04-06) |
| Subpath entrypoints | ❌ **баг**: TreeSelect двойной |
| Complex/Transfer | ❌ мёртвый код |
| CI vs локальная ветка | ⚠ возможное расхождение main/master |
| Lockfiles | ⚠ дубль npm + pnpm |

## 5. Стилевой контракт

### 5.1 Архитектура стилей

```
packages/react/styles/
├── tokens.css                # 91 токен: palette + light theme + dark theme
├── reset.css                 # CSS-сброс
├── transitions.css           # анимации (fade, slide-*, zoom, collapse)
│
├── themes/
│   ├── default.css           # ⚠ только @import '../tokens.css'  (дубль)
│   └── dark.css              # ⚠ только @import '../tokens.css'  (дубль)
│
└── components/  (56 файлов)
    └── *.css                 # один файл на компонент
```

Тёмная тема активируется через `[data-sg-theme="dark"]` — переопределение семантических токенов внутри `tokens.css`. Файлы `themes/default.css` и `themes/dark.css` фактически **не несут содержимого** — оба делают `@import '../tokens.css'`. Это вводит пользователя в заблуждение (он подключает `dark.css` ожидая dark-only тему, получает оба theme-селектора).

### 5.2 Статические проверки (CI)

| Скрипт | Результат |
|--------|-----------|
| `pnpm check:tokens` (`scripts/check-tokens.mjs`) | ✅ OK (91 tokens, 61 files) |
| `pnpm check:no-important` (`scripts/check-no-important.mjs`) | ✅ OK (62 files) |
| `pnpm audit:styles` (`scripts/audit-styles.mjs`) | ✅ Запускается, генерирует `docs/_audit/styling-audit.md` |

**Все статические проверки зелёные.**

### 5.3 Контракт API стилизации (`docs/styling-contract.md`)

Заявленные уровни:
1. **Тема через токены** — переопределение `--sg-*` глобально.
2. **`classNames` / `styles` по слотам** — точечная настройка через React-проп.
3. **`unstyled` + свой CSS** — полный контроль.

`Table` и `List` уже имеют `classNames`/`styles` API (по CHANGELOG/Unreleased). Остальные complex-компоненты — статус неясен из текущего аудита, требует отдельной проверки в Стрим 9 (документация).

### 5.4 Auto-сгенерированный отчёт `docs/_audit/styling-audit.md`

Файл регенерируется через `pnpm audit:styles`. Свежие данные:

| Метрика | Значение | Комментарий |
|---------|----------|-------------|
| Объявлено токенов в `tokens.css` | **91** | OK |
| Чужих имён `var(--sg-*)` в компонентных CSS | **0** | OK |
| Классов `.sg-*` в CSS | **853** | |
| Классов `sg-*` в DOM | **749** | |
| Совпадает (CSS + DOM) | **625** | |
| **Только в CSS (потенциально мёртвые)** | **228** | ⚠ |
| **Только в DOM (без стилей)** | **124** | ⚠ |
| Магических hex-цветов | **8 уникальных** | ⚠ |

#### 5.4.1 Только в CSS — 228 классов (мёртвый стиль)

Примеры:
- Все `.sg-button-large`, `.sg-button-small`, `.sg-button-primary`, `.sg-button-dashed`, `.sg-button-link`, `.sg-button-text` — никогда не появляются в DOM. Возможно, прежний паттерн именования заменён на `--variant` / `--size` через CSS-переменные.
- Все `.sg-table-large`, `.sg-table-small`, `.sg-form-vertical`, `.sg-form-large`, ... — то же самое.
- Все варианты `.sg-tooltip-{top|right|bottom|left}`, `.sg-popconfirm-*`, `.sg-dropdown-{topLeft|...}` — варианты позиционирования. Возможно, перенесены в DOM как другие классы или в data-атрибуты.
- 25+ классов `.sg-{transition}-enter-*` / `.sg-{transition}-leave-*` для fade/slide/zoom/collapse — возможно, классы transitions используются динамически только при анимации (генерируются runtime в `Transition.tsx`). Не обязательно мёртвые, но grep по DOM их не находит.
- `.sg-list-grid-{md|sm|lg|xs}-{1..6}` — responsive grid классы, не используются в DOM.

**Действие:** требует ручной проверки каждой группы — часть классов может действительно использоваться (например, transitions подключаются динамически через `classList.add` без литерала в JSX), но большая часть похожа на legacy от старого паттерна. Кандидат в мини-стрим по очистке стилей.

#### 5.4.2 Только в DOM — 124 класса (без стилей)

Примеры:
- `sg-btn`, `sg-btn-primary` — есть в DOM (в Button.tsx?), но нет в CSS. Текущий правильный класс — `.sg-button-*`. Возможно, остался legacy в каком-то компоненте.
- `sg-datagrid-*` (24+ класса) — DataGrid использует BEM-стиль `--modifier`, но CSS этих классов не содержит. Это может означать: либо CSS DataGrid неполный, либо классы условные и только подсветят в реальном UI.
- `sg-tree-select-*` (16+ классов) — потому что используется отдельная (UI) реализация TreeSelect (см. Секцию 4.5). Стили могли остаться от complex-версии.
- `sg-field-*` (`sg-field-feedback-*`, `sg-field-has-warning`, ...) — отсутствие стилей фидбэков. Возможно, описывают через `[data-sg-state]`, а не классы.

**Действие:** проверить какие из них фактически нужны (в этом случае добавить стили), а какие — рудимент (удалить из JSX).

#### 5.4.3 Магические цвета

| Цвет | Файлы | Назначение | Действие |
|------|-------|------------|----------|
| `#00f #0f0 #0ff #f00 #f0f #ff0` | `colorpicker.css` | RGB-палитра для color picker | ✅ оправдано (это сам функционал) |
| `#ff4d4f` | `form.css` | Цвет ошибки | ❌ должен быть `var(--sg-red-5)` или `var(--sg-color-error)` |
| `#fff` | `avatar.css`, `badge.css`, `colorpicker.css`, `menu.css`, `pagination.css`, `steps.css` | Белый цвет | ⚠ кандидат на `var(--sg-gray-1)` или `var(--sg-color-bg)`. В dark theme — баг (останется белым). |

**Кандидат:** заменить `#ff4d4f` и `#fff` на токены. `#fff` особенно критично для dark theme.

### 5.5 `docs/_audit/styling-audit.md` — генерируется при каждом `audit:styles`

Файл живёт в репозитории и **обновляется** при запуске. Это полезно, но:
- Не запускается автоматически в CI (см. `.github/workflows/ci.yml` — там только `check:styles`).
- Может быть рассинхронизирован с реальностью между запусками.

**Кандидат:** добавить запуск `audit:styles` в CI с проверкой что файл не изменился (если изменился — fail), либо генерировать в pre-commit.

### 5.6 Вердикт

| Категория | Статус |
|-----------|--------|
| Контракт стилей описан в `docs/styling-contract.md` | ✅ есть |
| `tokens.css` чистый, все 91 токен задействован | ✅ |
| Нет `!important` в компонентных CSS | ✅ |
| `themes/default.css`, `themes/dark.css` | ⚠ дубль через `@import` |
| 228 dead-классов в CSS | ⚠ требует ручной проверки |
| 124 класса в DOM без стилей | ⚠ требует проверки |
| Магические цвета `#ff4d4f`, `#fff` | ⚠ кандидат на замену токенами |

## 6. examples/demo и examples/showcases

### 6.1 Самые большие файлы

| Файл | Строк | Превышение порога 250 (Стрим 4) |
|------|-------|-------------------------------|
| `examples/showcases/src/showcases/forms/FormsApp.tsx` | **1131** | ×4.5 |
| `examples/showcases/src/showcases/ecommerce/EcommerceApp.tsx` | **1080** | ×4.3 |
| `examples/demo/src/demos/StylingShowcasePage.tsx` | **884** | ×3.5 |
| `examples/showcases/src/showcases/table-kitchen-sink/TableKitchenSinkApp.tsx` | **814** | ×3.3 |
| `examples/showcases/src/showcases/analytics/AnalyticsApp.tsx` | **571** | ×2.3 |
| `examples/showcases/src/showcases/admin/AdminApp.tsx` | **561** | ×2.2 |
| `examples/showcases/src/showcases/crm/CrmApp.tsx` | **545** | ×2.2 |
| `examples/demo/src/App.tsx` | **390** | ×1.6 |
| `examples/demo/src/demos/FormComponentsDemo.tsx` | 367 | ×1.5 |
| `examples/demo/src/demos/TableDemo.tsx` | 360 | ×1.4 |
| `examples/demo/src/demos/FormDemo.tsx` | 325 | ×1.3 |
| `examples/demo/src/demos/DesignTokensPage.tsx` | 301 | ×1.2 |
| `examples/showcases/src/showcases/hr-portal/HrPortalApp.tsx` | 297 | ×1.2 |
| `examples/showcases/src/showcases/project-tracker/ProjectTrackerApp.tsx` | 270 | ×1.1 |

**12 файлов превышают порог 250 строк, 7 — более чем в 2 раза.** Стрим 4 (рефакторинг showcases) должен закрыть это.

### 6.2 Структура examples/showcases

9 шоукейсов в формате «один App.tsx + один data.ts на каждый»:

```
examples/showcases/src/
├── App.tsx                            # 9 импортов, navigation
├── main.tsx
└── showcases/
    ├── admin/         AdminApp.tsx (561 строк) + data.ts
    ├── analytics/     AnalyticsApp.tsx (571) + data.ts
    ├── crm/           CrmApp.tsx (545) + data.ts
    ├── ecommerce/     EcommerceApp.tsx (1080) + data.ts
    ├── file-manager/  FileManagerApp.tsx (171) + data.ts
    ├── forms/         FormsApp.tsx (1131)         ⚠ нет data.ts
    ├── hr-portal/     HrPortalApp.tsx (297) + data.ts
    ├── project-tracker/ ProjectTrackerApp.tsx (270) + data.ts
    └── table-kitchen-sink/ TableKitchenSinkApp.tsx (814) + data.ts
```

**Проблемы:**
- Каждый App.tsx — монолит, в котором перемешаны:
  - моки данных (часть в data.ts, часть остаётся inline);
  - state-менеджмент (useState, локальные хуки);
  - множественные виджеты (header, sidebar, content, dialogs);
  - бизнес-логика обработчиков.
- Нет декомпозиции на `pages/`, `widgets/`, `components/`.
- `forms/` нет своего `data.ts` — данные внутри `FormsApp.tsx`.

### 6.3 Структура examples/demo

```
examples/demo/src/
├── App.tsx                  # 390 строк: 30+ импортов, hash router, pages map, menu, search
├── components/              # ComponentDoc, DemoBox, PropsTable, CssVarsTable
├── tokens/tokens-data.ts
└── demos/
    ├── *Demo.tsx            # ~40 страниц-обёрток (старый паттерн)
    └── <component>/         # каждый компонент — папка с подвариантами
        ├── Basic.demo.tsx
        ├── Variant.demo.tsx
        └── ...
```

Из ~480 файлов в `demos/`:
- **~40 страниц-обёрток** `XxxDemo.tsx` (BadgeDemo, ButtonDemo, ModalDemo, ...) — каждая использует `ComponentDoc` + `DemoBox` + `PropsTable` + `CssVarsTable`.
- **~440 маленьких `<comp>/Variant.demo.tsx`** — изолированные демо одного варианта.

Это **продуманный паттерн** композиции:

```
BadgeDemo.tsx (127 строк):
  ├── импортирует <Variant>.demo.tsx
  ├── импортирует ?raw исходник того же файла
  ├── рендерит через DemoBox с code={Source}
  ├── PropsTable + CssVarsTable
  └── ComponentDoc (заголовок + описание)
```

**Проблема в `examples/demo/src/App.tsx` (390 строк):**

Огромный объект `pages: Record<string, ComponentType>` — кандидат на:
- вынести в `routes.ts`;
- разделить меню/навигацию на отдельные модули;
- отделить `Overview` компонент в свой файл.

### 6.4 Состояние i18n (для подготовки к Стрим 2)

| Что есть | Что нет |
|----------|---------|
| `examples/demo/src/demos/datepicker/RussianLocale.demo.tsx` — пример русской локали для DatePicker | Глобальный переключатель языка в App |
| `examples/demo/src/demos/config-provider/Locale.demo.tsx` — пример использования `ConfigProvider.locale` | Структура `locales/ru.ts`, `locales/en.ts` для текстов demo |
| Библиотека `@skygraph/react/locales` (en_US, ru_RU) | `react-i18next` или подобной библиотеки в `package.json` |
| `ConfigProvider` используется в 28 файлах demo | Тексты в JSX — все хардкод (английский) |

**Итог:** инфраструктура i18n для самой demo-страницы **отсутствует**. Стрим 2 строит её с нуля. Локализация компонентов библиотеки (DatePicker, Pagination, Modal, Empty, Form) уже есть через `ConfigProvider.locale`.

### 6.5 Дубль паттерн: смешение старого и нового стилей демо

Часть страниц всё ещё построены по **старому** монолитному паттерну:
- `examples/demo/src/demos/StylingShowcasePage.tsx` (884 строк, монолит).
- `examples/demo/src/demos/DesignTokensPage.tsx` (301 строк).
- `examples/demo/src/demos/FormComponentsDemo.tsx` (367 строк).
- `examples/demo/src/demos/TableDemo.tsx` (360 строк).
- `examples/demo/src/demos/FormDemo.tsx` (325 строк).

Часть — по новому композиционному:
- `BadgeDemo.tsx` (127), `ButtonDemo.tsx`, и многие другие — используют `ComponentDoc` + маленькие demo-файлы.

Возможный смысл: новые компоненты получили новый формат, старые остались. **Кандидат на стандартизацию в Стрим 8** (стандартизация шаблона демо).

### 6.6 ESLint игнорирует demo и showcases

В `eslint.config.js`: `ignores: ['examples/']`. Это означает что в этих файлах нет линт-проверок. Может быть:
- Hardcoded строки не отлавливаются.
- `console.log` остаются.
- Unused imports не находятся.
- Импорты из внутренностей `@skygraph/react` не запрещены.

**Кандидат:** включить хотя бы `unused-vars` и `no-console` для examples в Стрим 4.

### 6.7 Vite конфигурация

```typescript
// examples/demo/vite.config.ts (16 строк)
```
Простая, без `?raw` плагина (но `?raw` импорты используются — Vite поддерживает их по умолчанию).

### 6.8 Вердикт

| Категория | Статус |
|-----------|--------|
| Стандарт паттерна `XxxDemo + Variant.demo` | ✅ внедрён, но не везде |
| Декомпозиция showcases | ❌ полное отсутствие, нужен Стрим 4 |
| Размеры файлов | ❌ 12 файлов > 250 строк, 7 — > 500 |
| i18n в demo/showcases | ❌ отсутствует, нужен Стрим 2 |
| ESLint coverage examples | ⚠ полностью отключён |
| Vite конфигурация | ✅ норма |

## 7. Зависимости и инфраструктура

### 7.1 Workspace конфигурация

**Конфликт двух систем:**

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
```

```json
// package.json
"workspaces": ["packages/*"]
```

- `pnpm-workspace.yaml` — для pnpm.
- `workspaces` в корневом `package.json` — для **npm/yarn**, pnpm их игнорирует (или поддерживает как fallback).

**Расхождение скоупа:** оба не включают `examples/`. Демо и showcases подключают пакеты через **`file:../../packages/{core,react}`** (file: protocol), а не через workspace. Это работает, но выпадает из единой workspace-инфраструктуры (нет автоматических symlinks pnpm для examples).

**Кандидат:**
- удалить `workspaces` из корневого `package.json` (npm-атавизм);
- расширить `pnpm-workspace.yaml` до `packages: ['packages/*', 'examples/*']`, заменить `file:` на `workspace:*` в demo/showcases;
- ИЛИ подтвердить что текущая схема намеренная и оставить.

### 7.2 Версии React — расхождение между библиотекой и demo

| Место | React | Заметка |
|-------|-------|---------|
| `packages/react/package.json` peer | `>=18.0.0` | покрывает R18 и R19 |
| `packages/react/package.json` dev | `^18.0.0` (фактически 18.3.1) | тесты идут на R18 |
| `examples/demo/package.json` | `^19.2.4` | demo на **R19** |
| `examples/showcases/package.json` | `^19.2.4` | showcases на **R19** |

Технически peer `>=18` это допускает, но **тесты библиотеки идут только на R18**. На R19 поведение в demo может немного отличаться (StrictMode rerender, suspense, эффекты). Это потенциальный источник багов.

**Кандидат:**
- добавить вторую матрицу тестов на R19 в `react` пакете;
- ИЛИ обновить devDep до R19 и тестировать на нём.

### 7.3 Версии TypeScript

| Место | TS |
|-------|-----|
| `packages/core/package.json` dev | `^5.4.0` (установлено 5.9.3) |
| `packages/react/package.json` dev | `^5.4.0` (установлено 5.9.3) |
| `examples/*/package.json` | `~5.9.3` |

Через `^` все upgrade'ятся до 5.9.3 — фактически совпадают. Норма.

### 7.4 Установленные версии (pnpm list -r)

```
root:
  eslint 9.39.4
  typescript-eslint 8.58.1
  prettier 3.8.2

core:
  tsup 8.5.1
  vitest 2.1.9
  typescript 5.9.3
  rimraf 5.0.10

react:
  @testing-library/react 16.3.2
  @types/react 18.3.28
  jsdom 25.0.1
  react 18.3.1
  react-dom 18.3.1
```

Все версии современные (по состоянию на ~апрель 2026). Major-обновлений в очевидной зоне риска нет.

### 7.5 Build (tsup)

**`packages/core/tsup.config.ts`** объявляет 3 entrypoint:
- `index` (главный)
- `form` (subpath)
- `runtime-internal` (subpath, нестабильный)

Subpaths `table`, `tree`, `virtual` в core **отсутствуют** в build entrypoints (есть только в react). В `index.ts` все export'ы есть, но через subpath не достучаться.

**`packages/react/tsup.config.ts`** объявляет 7 entrypoints:
- `index`, `form`, `table`, `tree`, `datagrid`, `virtual`, `devtools`.

Совпадает с заявленным в `package.json#exports`. Хорошо.

`external: ['react', 'react-dom', '@skygraph/core']` — корректная маркировка peers.

### 7.6 Lockfiles

- ✅ `pnpm-lock.yaml` — основной.
- ❌ `package-lock.json` — **атавизм npm**. Нужно удалить.

Когда оба присутствуют — npm и pnpm могут давать разные деревья. Если кто-то случайно сделает `npm install` в корне, package-lock обновится и расхождение усугубится.

### 7.7 CI workflow `.github/workflows/ci.yml`

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    matrix:
      node-version: [18, 20, 22]
    steps:
      - uses: pnpm/action-setup@v4 (v9)
      - pnpm install --frozen-lockfile
      - pnpm lint
      - pnpm check:styles
      - pnpm build
      - pnpm test
```

**Замечания:**
- Триггер на ветку `main`, локальная ветка — `master` (см. Секцию 4.7).
- Матрица node 18/20/22 — нормально (Node 18 LTS подходит к концу, можно подумать про 24).
- Не запускается `pnpm audit:styles` — генерация `_audit/styling-audit.md` остаётся за разработчиком (см. Секцию 5.5).
- Нет шага coverage.

Также есть `deploy.yml` (содержимое не аудировано в этом стриме).

### 7.8 Скрипты в package.json (root)

```json
"scripts": {
  "build": "pnpm -r build",
  "test": "pnpm -r test",
  "lint": "eslint packages/",
  "format": "prettier --write \"packages/**/*.{ts,tsx,css,json}\"",
  "format:check": "prettier --check \"packages/**/*.{ts,tsx,css,json}\"",
  "clean": "pnpm -r clean",
  "audit:styles": "node scripts/audit-styles.mjs",
  "check:tokens": "node scripts/check-tokens.mjs",
  "check:no-important": "node scripts/check-no-important.mjs",
  "check:styles": "pnpm run check:tokens && pnpm run check:no-important"
}
```

**Замечания:**
- `lint` ограничен `packages/` — examples не линтятся (см. Секцию 6.6).
- `format` тоже только `packages/**` — examples не форматируются.
- Нет команды `pnpm dev` (для запуска demo/showcases). Запуск идёт через `cd examples/demo && pnpm dev`.

### 7.9 Issue/PR templates

Есть `.github/ISSUE_TEMPLATE/bug_report.md` + `feature_request.md` + `pull_request_template.md`. Содержимое не аудировано в этом стриме (можно расширить в Стрим 9).

### 7.10 Вердикт

| Категория | Статус |
|-----------|--------|
| Workspace конфигурация | ⚠ конфликт `workspaces` (npm) + `pnpm-workspace.yaml` |
| Examples в workspace | ❌ не подключены, использует `file:` protocol |
| Версии React | ⚠ R18 в core/react, R19 в demo/showcases |
| Версии TypeScript | ✅ совпадают (5.9.3 везде) |
| tsup конфиги | ✅ корректные |
| Lockfile | ❌ дубль npm + pnpm |
| CI | ⚠ ветка `main` vs локальная `master` |
| Скрипты root | ⚠ format/lint только для `packages/`, не для examples |

## 8. Dead code, дубли, неконсистентное именование

### 8.1 Сводка по уже выявленному в предыдущих секциях

| Находка | Где описано | Приоритет |
|---------|-------------|-----------|
| `complex/Transfer/` — мёртвый код, не экспортируется | 4.6 | Высокий |
| `runtime-internal.ts` — публичный, но не используется | 2.6 | Низкий |
| 228 dead-классов в CSS | 5.4.1 | Средний |
| 124 класса в DOM без стилей | 5.4.2 | Средний |
| `themes/default.css`, `themes/dark.css` — дубль `@import` | 5.1 | Низкий |
| `package-lock.json` — атавизм | 4.8 | Низкий |
| `workspaces` (npm) + `pnpm-workspace.yaml` (pnpm) | 7.1 | Низкий |
| Старые `XxxDemo.tsx` и новые `<comp>/Variant.demo.tsx` сосуществуют | 6.5 | Средний |
| `PLAN.md` (старый план) рядом с `STREAM-PLAN.md` | 1.1 | Низкий — оставить как историю |

### 8.2 Дубли компонентов под одним именем

#### TreeSelect — две разные реализации

```
import { TreeSelect } from '@skygraph/react'        → ui/TreeSelect.tsx (без core, 295 строк)
import { TreeSelect } from '@skygraph/react/tree'   → complex/TreeSelect/TreeSelect.tsx (с core)
```

Обе используют CSS-классы `sg-tree-select-*` (видны в DOM). Стилевой файл `treeselect.css` использует префикс `sg-treeselect-*` (без дефиса). **Двойная путаница**: разные имплементации + разные CSS-префиксы.

**Действие:** мини-стрим — выбрать одну реализацию.

#### Transfer — две реализации, complex мёртвый

```
import { Transfer } from '@skygraph/react'   → ui/Transfer.tsx (214 строк) — публичный
complex/Transfer/Transfer.tsx                → используется только в тестах — мёртвый
```

**Действие:** удалить `complex/Transfer/` или вернуть в публичный API.

#### Calendar — реэкспорт через ui

```
ui/Calendar.tsx (5 строк):
  export { Calendar } from '../complex/Calendar'
```

Это не дубль, но `ui/Calendar.tsx` **нарушает идею «ui без core»** косвенно (через реэкспорт компонента, использующего core). ESLint правило проверяет прямые импорты, не реэкспорты.

**Действие:** либо удалить `ui/Calendar.tsx` и экспортировать прямо в `index.ts` из complex.

### 8.3 Непоследовательное именование CSS-классов

#### Button: `sg-button-*` vs `sg-btn-*`

```typescript
// packages/react/src/components/ui/Button.tsx
'sg-button'
'sg-button-${type}'    // primary, default, dashed, link, text
'sg-button-${size}'    // small, middle, large
'sg-button-loading'

// packages/react/src/components/complex/SchemaForm.tsx
<button className="sg-btn sg-btn-primary">
```

**Проблема:** `SchemaForm` использует **`sg-btn-primary`**, который **не определён в CSS** (только в DOM по `_audit/styling-audit.md`). Кнопка submit в SchemaForm не получает стилей.

В `button.css` сами **CSS-переменные** называются `--sg-btn-*` (короткое имя), но классы — `sg-button-*` (полное). Это внутренняя непоследовательность.

**Действие:** унифицировать в `sg-button` или `sg-btn`. Исправить SchemaForm.tsx.

#### DatePicker: `sg-datepicker-*` vs `sg-dp-*`

В `datepicker.css`:
- 21 правил с `sg-datepicker-*` (главная обёртка, range, sizes).
- 78 правил с `sg-dp-*` (time-cell, dropdown, now/today buttons).

Сокращение `dp` для внутренних элементов компонента **не задокументировано** в `styling-contract.md`.

**Действие:** либо унифицировать на `sg-datepicker-*`, либо явно задокументировать сокращение.

#### TreeSelect: `sg-treeselect-*` vs `sg-tree-select-*`

CSS определяет `sg-treeselect-large`, `sg-treeselect-small` (без дефиса). DOM использует `sg-tree-select-*` (с дефисами). Расхождение приводит к 16+ DOM-классам без стилей.

**Действие:** унифицировать (рекомендация — `sg-tree-select-*` с дефисами).

### 8.4 Сокращения и unification

| Префикс | Что обозначает | Полный | Расхождение |
|---------|----------------|--------|-------------|
| `sg-btn-*` | Button (атрибуты + класс в SchemaForm) | `sg-button-*` | ❌ Расходится |
| `sg-dp-*` | DatePicker внутренности | `sg-datepicker-*` | ⚠ Не задокументировано |
| `sg-treeselect-*` | TreeSelect (CSS) | `sg-tree-select-*` | ❌ Расходится |

### 8.5 Dropdown placement классы — camelCase

CSS:
- `.sg-dropdown-bottomLeft`, `.sg-dropdown-bottomRight`, `.sg-dropdown-topLeft`, `.sg-dropdown-topRight` (camelCase).
- Аналогично для `.sg-tooltip-{top|right|bottom|left}`, `.sg-popconfirm-{top|...}`, `.sg-notification-{topLeft|...}`.

**camelCase в CSS-классах** — антипаттерн (общепринят kebab-case). Скорее всего наследие от React-prop'а `placement: 'bottomLeft'` и прямое склеивание `\`sg-dropdown-${placement}\``.

**Действие:** перевести на kebab-case или нормализовать через утилиту преобразования.

### 8.6 Транзиции — runtime-классы (не мёртвый код)

Классы `.sg-fade-enter-from`, `.sg-fade-enter-active`, `.sg-slide-up-leave-to` и т.д. (~30 классов) фигурируют **только в CSS** по `_audit/styling-audit.md`. Это потому что `Transition.tsx` добавляет их **программно** через `classList.add(\`sg-${name}-enter-from\`)`, а grep по DOM-литералам их не находит.

**Это НЕ мёртвый код**, это runtime-генерируемые классы. Стоит **исключить такие префиксы из подсчёта в `audit-styles.mjs`** (whitelist для runtime-классов transitions).

**Действие:** добавить allowlist в `scripts/audit-styles.mjs` для известных runtime-префиксов (`sg-fade-`, `sg-slide-*-`, `sg-zoom-`, `sg-collapse-`).

### 8.7 Старая страница `tokens-data.ts` vs. `DesignTokensPage.tsx`

В `examples/demo/src/`:
- `tokens/tokens-data.ts` — данные токенов (216 строк).
- `demos/DesignTokensPage.tsx` — страница с токенами (301 строк).

Они работают вместе: data → page. Не дубль. Но кандидат на проверку в Стрим 9 — может ли `tokens-data.ts` авто-генерироваться из реального `tokens.css` (сейчас, видимо, ведётся вручную и расходится с CSS).

### 8.8 Вердикт по dead code и дублям

| Категория | Найдено |
|-----------|---------|
| Дубли компонентов под одним именем | 2 (TreeSelect, Transfer) |
| Реэкспорт нарушающий чистоту слоя | 1 (ui/Calendar) |
| Непоследовательное именование CSS | 3 (Button, DatePicker, TreeSelect) |
| camelCase в CSS-классах | 4 группы (dropdown, tooltip, popconfirm, notification) |
| Dead-классы CSS | 228 (часть — runtime transitions, нужен allowlist) |
| DOM-классы без стилей | 124 (часть — последствие расхождения нейминга) |
| Мёртвая папка | 1 (`complex/Transfer/`) |
| Атавизмы | 2 (`package-lock.json`, npm `workspaces`) |

## 9. Локализация и a11y (беглый обзор)

> Это **беглый** обзор — детальная ревизия делается в Стрим 3 (a11y) и при подготовке Стрима 2 (i18n demo).

### 9.1 Локализация в библиотеке

`@skygraph/react` имеет:
- `locales/en_US.ts` — английская локаль (по умолчанию).
- `locales/ru_RU.ts` — русская локаль.
- `types/locale.ts` — `SgLocale` (контракт всех ключей).

Текущий состав ключей (по `en_US.ts`):

| Раздел | Покрытые компоненты |
|--------|--------------------|
| `empty` | `Empty` |
| `pagination` | `Pagination` |
| `popconfirm` | `Popconfirm` |
| `modal` | `Modal` |
| `form` | `Form`, `SchemaForm` |
| `upload` | `Upload` |
| `transfer` | `Transfer` |
| `calendar` | `Calendar` |

Подключение через `<ConfigProvider locale={...}>`.

**Что НЕ покрыто локалями (имеют свои локальные строки или хардкод):**
- `Table` (имеет `TableLocale` — отдельный per-prop, не через ConfigProvider).
- `Tree` (имеет `TreeLocale` — то же).
- `DataGrid` (имеет `DataGridLocale`).
- `TreeSelect`, `Cascader`, `Mentions`, `AutoComplete`, `ColorPicker`, `Steps`, `Carousel`, `Result`, `Tabs`, `Drawer`, `Notification`, `Dropdown`, `Menu`, `Breadcrumb`.

Гибридная схема: часть локалей через `ConfigProvider.locale`, часть — через прямой проп `locale={...}` в компоненте. Это **не нарушение**, но создаёт две разные точки настройки локализации.

**Кандидат для отдельного стрима:** унифицировать локализацию — все строки через ConfigProvider.locale, или хотя бы зафиксировать раскол в `styling-contract.md` / `docs/components.md`.

### 9.2 a11y — статистика

#### Использование ARIA-атрибутов

Файлов с `aria-(label|describedby|labelledby|live|expanded|selected|checked|disabled|hidden|haspopup|controls|current|sort|busy|invalid|required)`:

**47 компонентов.** Самые активные:
- `complex/AutoField` — 17
- `complex/Table/TableHeader` — 12
- `complex/Tree` (Tree + TreeNodeRow) — 8
- `ui/Input` — 9
- `ui/Menu` — 8
- `ui/InputPassword` — 7
- `ui/TreeSelect` — 7
- `ui/Modal` — 6, `ui/Drawer` — 6, `complex/Field` — 6
- `ui/Pagination` — 5, `ui/Tooltip` — 5

#### Использование `role=*`

Файлов с явными ARIA-ролями (button|dialog|menu|listbox|option|tab|tooltip|status|alert|combobox|...):

**~36 компонентов.** Самые активные:
- `complex/Table/TableHeader` — 12
- `complex/Table/Table` — 9
- `ui/Menu` — 9
- `complex/DataGrid/DataGrid` — 7
- `ui/Tabs` — 6
- `ui/Tree/Tree` — 4
- `ui/Notification` — 2
- `ui/Modal` — 2

#### a11y-хуки в `hooks/a11y/`

- `useFocusTrap(active)` — ловушка фокуса для модалок/drawers.
- `useRovingTabIndex(options)` — roving tabindex для таб-групп / меню.
- `useListNavigation(options)` — клавиши Up/Down/Home/End для списков.

Все три экспортированы публично через `index.ts`.

### 9.3 Что точно покрыто a11y (по beglyму обзору)

✅ Покрыто:
- Form / Field / SubmitButton (`required`, `aria-invalid`, фидбэк)
- Table / TableHeader / DataGrid (role=row/cell, aria-sort)
- Tree (role=tree, aria-expanded, aria-selected)
- Menu / Tabs / Tooltip (roving + role)
- Modal / Drawer (focus trap)
- Pagination (aria-current, aria-label)

⚠ Требует проверки в Стриме 3:
- `Carousel` (3 role/aria) — достаточно ли для "carousel" pattern?
- `Steps` (1 role/aria) — должен быть `aria-current` на активном шаге, проверить.
- `Rate` (3 aria) — должна быть keyboard навигация стрелками.
- `Slider` (1 aria) — мало для slider'а, обычно нужно `aria-valuemin/max/now`.
- `ColorPicker` (2 aria) — palette должна быть navigable.
- `Mentions` (1 aria) — combobox с tags, нужен `role="combobox"` + `aria-autocomplete`.
- `Switch` (2 aria) — обычно `role="switch"` + `aria-checked`.
- `Segmented` (1 aria, 3 role) — должен быть как radiogroup.
- `Cascader` — не нашёл прямых упоминаний (не в списке) — потенциально без a11y.
- `TimePicker` (3 aria, 1 role) — мало.

❌ Без a11y (по grep):
- `ui/Empty.tsx` — есть только `role` (2 совпадения, без aria-*).
- `complex/VirtualList` — не нашёл (виртуализированный список без role="listbox" — возможно).

(Числа из grep могут быть приблизительные — точная проверка в Стриме 3.)

### 9.4 Тесты a11y

В `__tests__/styling-contract.test.tsx` (13 тестов) — частично проверяет CSS-контракт, не полный a11y.

В `__tests__/components.test.tsx`, `complex-components.test.tsx` — большинство тестов на функциональность, не на ARIA.

**Нет специализированного `a11y.test.tsx`** или интеграции с `@axe-core/react` / `jest-axe`. Это проблема — автоматического a11y-регресса нет.

**Кандидат:** в Стрим 3 добавить `@axe-core/react` тесты на каждый компонент.

### 9.5 README заявляет «ARIA на всех 24+»

Из `CHANGELOG[0.2.0]`:
> ARIA attributes on 24+ components, keyboard navigation for Select, Dropdown, AutoComplete, Menu, Tabs, Rate, Slider

Фактически покрыто **намного больше** компонентов (~47 файлов с aria, ~36 с role). Это **прирост** с того релиза, не отставание. Хорошо.

### 9.6 Вердикт по a11y и локализации

| Категория | Состояние |
|-----------|-----------|
| `SgLocale` контракт + en_US/ru_RU | ✅ есть, но покрывает только 8 компонентов |
| Гибридная локализация (ConfigProvider + per-prop) | ⚠ норма для library, но требует документации |
| a11y покрытие компонентов | ✅ 47/66 имеют aria, 36/66 имеют role |
| Хуки a11y | ✅ useFocusTrap / useRovingTabIndex / useListNavigation |
| Автоматические a11y-тесты (axe-core) | ❌ отсутствуют |
| Полная ревизия по компонентам | ❌ нужен Стрим 3 |

## 10. Приоритизация исправлений

> Все находки аудита, расставленные по уровню приоритета и привязке к стримам из `STREAM-PLAN.md`.
> Каждый пункт также продублирован в `TODO-cycle.md` для запуска в будущих стримах.

### P0 — критические (баги публичного API / функциональности)

| Находка | Секция | Действие | Куда |
|---------|--------|----------|------|
| **TreeSelect — два разных компонента под одним именем** (`@skygraph/react` vs `@skygraph/react/tree`) | 4.5, 8.2 | Выбрать одну реализацию, удалить вторую | Отдельный мини-стрим (вне основной очереди) |
| **`sg-btn-primary` в `SchemaForm.tsx` не имеет стилей** (используется `sg-btn-*`, в CSS только `sg-button-*`) | 8.3 | Заменить на `sg-button sg-button-primary` | Быстрая правка / Стрим 9 |

### P1 — важные (качество и большие зоны)

| Находка | Секция | Действие | Куда |
|---------|--------|----------|------|
| **12 файлов в `examples/showcases` > 250 строк, 7 — > 500** (forms 1131, ecommerce 1080, ...) | 6.1 | Декомпозиция | Стрим 4 |
| **Нет i18n инфраструктуры в `examples/demo`** (хардкод английского) | 6.4 | Внедрение локалей + переключатель | Стрим 2 |
| **228 dead-классов в CSS / 124 DOM без стилей** | 5.4 | Allowlist для runtime-transitions + ручная чистка | Мини-стрим стилей (после Стрим 7) |
| **`complex/Transfer/` — мёртвый код** (4 файла, не экспортируется) | 4.6, 8.2 | Удалить или вернуть в API | Мини-стрим cleanup |
| **Нет автоматических a11y-тестов** (нет axe-core / jest-axe) | 9.4 | Добавить axe-core + a11y.test.tsx | Стрим 3 |
| **Coverage не настроен** в обоих пакетах | 3.6 | Добавить `@vitest/coverage-*` + конфиг | Стрим 10 |

### P2 — расхождения документации

| Находка | Секция | Действие | Куда |
|---------|--------|----------|------|
| **README числа устарели** (44/50 ui, 11/16 complex, 49/56 CSS, 428/497 тестов) | 4.1, 4.2 | Обновить README | Стрим 9 |
| **`docs/status.md` устарел** (2026-04-06, ложно "нет тестов TreeEngine") | 4.3 | Обновить или archived | Стрим 9 |
| **CI триггерится на `main`, локально `master`** | 4.7 | Проверить удалённый, унифицировать | Стрим 9 |
| **Гибридная локализация** (ConfigProvider vs per-prop) | 9.1 | Документировать | Стрим 9 |
| **`sg-dp-*` сокращение не задокументировано** в styling-contract.md | 8.3 | Описать или унифицировать | Стрим 9 |

### P3 — мелкие чистки и неконсистентности

| Находка | Секция | Действие | Куда |
|---------|--------|----------|------|
| **`package-lock.json` рядом с `pnpm-lock.yaml`** | 4.8, 7.6 | Удалить package-lock + .gitignore | Стрим 9 / cleanup |
| **`workspaces` (npm) в корневом package.json** | 7.1 | Удалить или подтвердить намерение | Стрим 9 |
| **`runtime-internal.ts` не используется** | 2.6 | Решить: оставить для GraphEngine (Стрим 5) или удалить | Стрим 5 |
| **`themes/default.css` и `themes/dark.css` — пустые `@import`** | 5.1 | Удалить или вынести только селекторы темы | Стрим 9 |
| **`ui/Calendar.tsx` — реэкспорт нарушает идею "ui без core"** | 8.2 | Унифицировать (export напрямую из complex) | Мини-стрим cleanup |
| **camelCase в CSS-классах** (sg-dropdown-bottomLeft и т.п.) | 8.5 | Перевести на kebab-case | Мини-стрим стилей |
| **Магический `#ff4d4f` в `form.css`** | 5.4.3 | Заменить на `var(--sg-color-error)` | Мини-стрим стилей |
| **Магический `#fff` в 6 файлах** (avatar, badge, ...) | 5.4.3 | Заменить на токен (важно для dark theme) | Мини-стрим стилей |
| **Старые `XxxDemo.tsx` + новые `<comp>/Variant.demo.tsx`** | 6.5 | Стандартизировать паттерн | Стрим 8 |
| **`forms/` showcase нет своего `data.ts`** | 6.2 | Вынести данные | Стрим 4 |
| **`examples/demo/src/App.tsx` 390 строк** | 6.3 | Разбить на routes/menu/Overview | Стрим 4 |
| **`StylingShowcasePage.tsx` 884 строки** | 6.5 | Декомпозиция | Стрим 4 |

### P4 — инфраструктура и развитие

| Находка | Секция | Действие | Куда |
|---------|--------|----------|------|
| **`audit:styles` не в CI** | 5.5 | Добавить шаг в CI | Стрим 9 |
| **`format` / `lint` в root скриптах не покрывают `examples/`** | 7.8 | Расширить или отдельные команды | Стрим 4 / 9 |
| **`examples/` исключены из ESLint** | 2.7, 6.6 | Включить unused-vars + no-console | Стрим 4 |
| **React 18 в библиотеке vs React 19 в demo** | 7.2 | Добавить вторую матрицу тестов на R19 | Стрим 10 / отдельно |
| **TableEngine sort/filter на 100k медленные** (6.6s / 3.1s) | 3.7 | Оптимизация алгоритмов | Стрим 6 |
| **`table.test.ts > scalability > 100k` занимает 11s** | 3.7 | Вынести в отдельный slow-набор | Стрим 10 |
| **Косвенное покрытие `runtime/CycleDetector` и `runtime/SubscriptionEngine`** | 3.4 | Прямые unit-тесты | Стрим 10 |
| **Subpaths `table/tree/virtual` отсутствуют в `core/tsup.config.ts`** | 7.5 | Добавить если нужны | По мере необходимости |

### Сводная таблица: что попадает в какой стрим

| Стрим | P0 | P1 | P2 | P3 | P4 |
|-------|-----|-----|-----|-----|-----|
| **2** (i18n demo) | — | i18n инфра, отсутствие в demo | — | — | — |
| **3** (a11y) | — | a11y-тесты | — | — | — |
| **4** (showcases refactor) | — | 12 больших файлов в showcases | — | App.tsx 390, forms data.ts, StylingShowcase | examples в lint/format |
| **5** (GraphEngine) | — | — | — | runtime-internal | — |
| **6** (Table pro) | — | — | — | — | sort/filter optimization |
| **8** (демо-шаблон) | — | — | — | старые vs новые demo | — |
| **9** (доки) | sg-btn-primary fix | — | README/status/CI ветка/локализация/sg-dp doc | package-lock, npm workspaces, themes/*.css, calendar reexport | audit:styles в CI, format/lint examples |
| **10** (бенчмарки) | — | coverage | — | — | runtime tests, R18/R19, slow test isolation |
| **Мини-стрим** (вне очереди) | TreeSelect | dead CSS classes, complex/Transfer | — | camelCase, magic colors | — |

### Что НЕ требует исправлений

✅ **Архитектурные границы соблюдаются.** Runtime не лезет в engines, engines не cross-import, ui не лезут в core. ESLint enforce-ит.

✅ **Все 497 тестов зелёные.** Стрим 1 не выявил ни одного flaky-теста.

✅ **`check:tokens` и `check:no-important` зелёные.** Все 91 токен задействован, нет `!important` нарушений.

✅ **`ARCHITECTURE.md` соответствует реальности.** Префиксы, API заморожены и не нарушены.

✅ **Файлы в `packages/core` и `packages/react` — нормального размера** (никто > 1000 строк, в отличие от examples).

✅ **a11y покрытие хорошее** для базовых компонентов (47/66 имеют aria, 36/66 имеют role). Доводка в Стрим 3.

---

## Финал стрима 1

**Артефакт:** этот файл (`AUDIT.md`).
**Ход стрима:** см. `CYCLE-LOG.md`.
**Отложенные задачи:** см. `TODO-cycle.md`.
**Канал общения:** см. `STREAM-CHAT.md`.
