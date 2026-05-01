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

_Заполняется в ходе аудита._

## 5. Стилевой контракт

_Заполняется в ходе аудита._

## 6. examples/demo и examples/showcases

_Заполняется в ходе аудита._

## 7. Зависимости и инфраструктура

_Заполняется в ходе аудита._

## 8. Dead code, дубли, неконсистентное именование

_Заполняется в ходе аудита._

## 9. Локализация и a11y (беглый обзор)

_Заполняется в ходе аудита._

## 10. Приоритизация исправлений

_Заполняется в конце аудита._

---
