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

_Заполняется в ходе аудита._

## 3. Состояние тестов и покрытие

_Заполняется в ходе аудита._

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
