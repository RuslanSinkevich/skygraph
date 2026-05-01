# SkyGraph — Post-Audit (Задача 17)

> Дата: 2026-05-01
> Метод: ручная ревизия результатов всех задач 1–18, выполненных в текущем стриме (одном непрерывном turn-е).
> Цель: проверить что критерии стопа задач выполнены, регрессий нет, оставшиеся хвосты записаны в `TODO-cycle.md`.

---

## 1. Контекст

В стриме (после команды «всё в одном») были выполнены задачи 1, 2 (частично), 3 (минимум), 5 (минимум + Diagram), 9 (минимум), 16 (большой набор), 18 (минимум).

Нумерация в `STREAM-PLAN.md` v1: «задача» = пункт работы. «Стрим» = весь turn.

---

## 2. Сводка по каждой выполненной задаче

### Задача 1 — Аудит ✅
- `AUDIT.md` ~1356 строк, 10 секций.
- 11 коммитов `cycle(1): audit section N - ...`.
- **Критерий стопа:** все секции заполнены, приоритизация в Секции 10 — ✅ выполнено.

### Задача 1.5 — Audit-fixes (Q1-Q4 + bonuses) ✅
- TreeSelect / Transfer переключены на complex-версии в публичном API.
- `package-lock.json` удалён, `.gitignore` обновлён.
- npm `workspaces` удалён из `package.json`.
- `sg-btn-primary` → `sg-button-primary` в `SchemaForm.tsx`.
- 38 посторонних правок worktree вынесены в `chore:` коммит.
- **Регрессии:** нет, 519 тестов зелёные.

### Задача 2 — Локализация demo (i18n) ⚠ ЧАСТИЧНО
- ✅ Инфраструктура `examples/demo/src/i18n/` (Locale, DemoDict, I18nProvider, useI18n, LanguageSwitch).
- ✅ App shell: меню, hero, search, topbar — на ru/en.
- ✅ Системные demo-компоненты: `PropsTable`, `CssVarsTable`, `DemoBox`, `ComponentDoc` — на ru/en.
- ⚠ Осталось ~480 файлов в `examples/demo/src/demos/` с хардкодом (заголовки `ComponentDoc`, описания `whenToUse`, hint-ы `DemoBox`, описания `PropsTable`/`CssVarsTable`). Серия мини-стримов в `TODO-cycle.md`.
- ⚠ `examples/showcases/` — отдельная задача в Задаче 4.
- ⚠ Подключение `@skygraph/react/locales` (en_US/ru_RU) к `<ConfigProvider locale={...}>` при смене языка — отложено.

### Задача 3 — a11y ✅ (минимально)
- Подтверждено что Switch / Slider / Segmented / Empty уже имеют корректные ARIA. Аудит частично ошибался (grep по count не отражал факт).
- ⚠ Не проверены вручную: Carousel, Mentions, Cascader, VirtualList, Rate, ColorPicker, TimePicker. Отложены в TODO до полной задачи 3 (с `@axe-core/react`).

### Задача 5 — GraphEngine ✅ (минимально + Diagram)
- ✅ Core: `engines/graph/types.ts` + `GraphEngine.ts` + `index.ts` + `GRAPH_PREFIX`. Полный публичный API.
- ✅ React: `useGraph` хук + `<Diagram>` компонент (DOM nodes + SVG edges) + `diagram.css`.
- ✅ Demo: страница Diagram с 3 узлами и 2 рёбрами.
- ✅ 22 unit-теста для GraphEngine — все зелёные.
- ⚠ НЕ ВХОДИТ (отложено): orthogonal-роутер, drag-and-drop, undo/redo, snap-to-grid, повороты узлов в bounds (OBB), zoom/pan в Diagram, selection.

### Задача 9 — Документация ⚠ ЧАСТИЧНО
- ✅ README числа обновлены (65+ компонентов, 497 тестов).
- ✅ `docs/status.md` помечен archived с указанием на актуальные `AUDIT.md` / `CYCLE-LOG.md`.
- ✅ `ARCHITECTURE.md` — добавлен GraphEngine в схему, в таблицу префиксов (`graph → $graph.`), `useGraph` в хуки.
- ✅ `CHANGELOG.md` — добавлен большой Unreleased раздел с GraphEngine, Changed (TreeSelect/Transfer/Calendar), Fixed, Tooling.
- ⚠ `docs/architecture.md` (отдельный файл в docs/) — НЕ синхронизирован.
- ⚠ `docs/components.md` — НЕ синхронизирован.
- ⚠ CI ветка main vs локальная master — НЕ проверено на удалённом.

### Задача 16 — Все остальные находки ✅ (большой набор)
- ✅ Lint errors fixed: `SchemaForm.useConfig` conditional, `TagInput.prefer-const`.
- ✅ Existing TS errors in demo: PropDef.required, Bordered ids as strings, treeselect migrated to TreeNodeData, Transfer.listStyle removed, index.ts dedupe TreeKey/TransferLocale.
- ✅ `PLAN.md` помечен archived.
- ✅ `themes/default.css`, `dark.css` — добавлены явные комментарии.
- ✅ `ui/Calendar.tsx` — реэкспорт удалён, прямой экспорт из `complex/Calendar`.
- ✅ ESLint `examples/` — добавлено объяснение в конфиге.
- ✅ camelCase placement aliases для dropdown / notification.
- ✅ `audit-styles.mjs` allowlist для runtime-transitions (228→189 dead, 41 false-positive снят).
- ✅ `runtime-internal.ts` — оставлен как намеренный публичный entrypoint.
- ⚠ Не сделано: 189 dead-классов CSS — ручная чистка (некоторые могут быть legacy `.sg-button-large` после миграции на CSS-vars), 105 DOM-классов без CSS, full `examples-eslint.config.js`, удаление `ui/TreeSelect.tsx` и `ui/Transfer.tsx` файлов.

### Задача 18 — Актуализация документации ⚠ ЧАСТИЧНО (см. Задача 9)
- Покрывается одновременно Задачей 9.

---

## 3. Регрессии и состояние сборки

### Тесты

```
core:    239 (217 + 22 graph)  — все зелёные
react:   280                    — все зелёные
total:   519                    — все зелёные
```

### TS build (demo)

```
$ npx tsc -b examples/demo
(no errors, exit 0)
```

### check:tokens / check:no-important

```
check-tokens: OK (91 tokens, 62 files)
check-no-important: OK (63 files)
```

### Lint (точечный по затронутым файлам)

`SchemaForm.tsx` и `TagInput.tsx` — чисто после fix.

---

## 4. Что осталось (полный список незакрытого)

### Из STREAM-PLAN.md (большие задачи целиком не сделаны)

- **Задача 4** (Рефакторинг examples/showcases) — НЕ запускалась. 12 файлов > 250 строк (forms 1131, ecommerce 1080, ...). Большой объём, отдельный мини-стрим.
- **Задача 6** (Усиление TableEngine — pinning/resize/groups/aggregations/CSV export/extended filters) — НЕ запускалась.
- **Задача 7** (Графики LineChart/BarChart/AreaChart/PieChart) — НЕ запускалась.
- **Задача 8** (Стандартизация шаблона demo) — НЕ запускалась.
- **Задача 10** (Performance бенчмарки + coverage) — НЕ запускалась. `coverage` не настроен ни в одном пакете.
- **Задача 11** (Dashboard / конструктор отчётов) — НЕ запускалась.
- **Задача 12** (Gantt / Timeline / Resource Calendar) — НЕ запускалась.
- **Задача 13** (Schema Forms визуальный редактор — после Задачи 5) — НЕ запускалась.
- **Задача 14** (Print/PDF) — пользователь явно отложил.
- **Задача 15** (Релизная подготовка 0.2) — НЕ запускалась. CHANGELOG обновлён, но версии в `package.json` не выставлены.

### Хвосты выполненных задач

- Задача 2: ~480 demo-файлов с хардкодом. Локализация компонентов библиотеки через `ConfigProvider.locale` при смене языка.
- Задача 3: `@axe-core/react` тесты + ручная ревизия Carousel/Mentions/Cascader/VirtualList/Rate/ColorPicker/TimePicker.
- Задача 5: orthogonal-роутер, drag-and-drop, undo/redo, OBB, zoom/pan в Diagram.
- Задача 9: `docs/architecture.md`, `docs/components.md` синхронизация; CI ветка main/master.
- Задача 16: 189 dead-классов CSS (ручная чистка), 105 DOM-классов без CSS, `examples-eslint.config.js`, удаление `ui/TreeSelect.tsx` / `ui/Transfer.tsx` файлов.

### Существующие проблемы вне моих правок

- ⚠ `pnpm lint` warnings в `Table.tsx` / `Tree.tsx` / `DatePicker.tsx` (`react-hooks/exhaustive-deps`, `unused eslint-disable`) — не блокирующие, в TODO.

---

## 5. Все коммиты стрима

```
f908837 task(2):  localize demo system components (PropsTable, CssVarsTable, DemoBox, ComponentDoc) — ru/en
ef00fe9 task(18): docs sync — status.md archived, ARCHITECTURE adds GraphEngine + GRAPH_PREFIX, CHANGELOG Unreleased
7017647 task(3):  a11y — confirmed Switch/Slider/Segmented/Empty already have correct roles
f0de882 task(16): kebab-case placement class aliases for dropdown / notification
4b82a9f task(5b): Diagram demo page (3 nodes + 2 edges) wired into demo app menu
8b44f6c task(5b): React Diagram component + useGraph hook + diagram.css
5fca8ac task(16): fix existing TS errors in demo
4952e54 task(16): document examples/ lint exclusion + targeted-lint hint
c843192 task(16): audit-styles allowlist for runtime transition classes (-41 false-positives)
c5cc322 task(16): drop ui/Calendar.tsx re-export shim
c182156 task(16): document themes/default.css and dark.css behaviour
603ac40 task(16): mark legacy PLAN.md as archived
fefb06f task(16): fix lint errors - useConfig out of conditional in SchemaForm, prefer-const in TagInput
69f1265 chat:    reset STREAM-CHAT.md to clean template (per user request)
a996c9a plan(v1):rename 'streams' to 'tasks', add tasks 16/17/18, strengthen no-stop rule
4d49c9a log:     final report after multi-stream turn
ac57c2d cycle(5): GraphEngine scaffold + 22 tests
0c6d306 cycle(9): update README numbers
c8a1242 audit-fixes: TreeSelect/Transfer to complex, drop package-lock + npm workspaces, fix sg-btn-primary
ade537d chore:   import pending worktree changes
096cac5 cycle(2): demo i18n infrastructure + localized App shell (en/ru)
ba831cd cycle(1): audit section 10 - prioritization (final) + stream 1 done
... (10 коммитов по секциям 1-9 аудита)
```

**Всего: 33 коммита** в одном непрерывном стриме.

---

## 6. Вердикт

| Категория | Состояние |
|-----------|-----------|
| Тесты (519 / 519) | ✅ зелёные |
| TS build demo | ✅ чисто |
| check:tokens / check:no-important | ✅ зелёные |
| Архитектурные границы (ESLint) | ✅ соблюдены |
| GraphEngine как 4-й движок | ✅ внедрён, экспортируется |
| Diagram React | ✅ внедрён, отрендерен в demo |
| i18n инфраструктура demo | ✅ работает (App shell + system components) |
| Документация | ⚠ частично (README/ARCHITECTURE/CHANGELOG обновлены; docs/architecture.md / components.md — нет) |
| Очистка legacy | ✅ PLAN.md, ui/Calendar.tsx, package-lock.json, npm workspaces |
| Существующие баги (lint/TS) | ✅ устранены те что были найдены аудитом |
| 189 dead CSS / 105 DOM unstyled | ⚠ требует ручной ревизии (отложено) |
| Большие задачи 4/6/7/8/10/11/12/13/14/15 | ⚠ не запускались в этом стриме |

Стрим выполнен в максимальной для одного turn-а полноте. Оставшийся объём — большой, требует следующего стрима.

---

## 7. Дополнения после первой версии AUDIT-POST.md (поздняя итерация стрима)

После первой записи этого отчёта пользователь дал директиву «не оставляй ничего в TODO», и стрим продолжился. Дополнительно сделано:

### Документация и инфраструктура

- ✅ **`docs/architecture.md`** — добавлены `virtual/` и `graph/` engines в схему core.
- ✅ **`docs/components.md`** — список complex-компонентов расширен (включая Diagram, TreeSelect, Transfer, Calendar, и т.д.).
- ✅ **CI workflow** — `branches: [main]` → `branches: [main, master]` (теперь срабатывает и на локальной ветке).
- ✅ **Версии бампнуты до 0.4.0** в `packages/core/package.json` и `packages/react/package.json`. `CHANGELOG.md` теперь имеет секцию `[0.4.0] - 2026-05-01` с полным описанием изменений.
- ✅ **Coverage configs** — добавлены `vitest.config.ts` в обоих пакетах с провайдером `v8`, includes/excludes, threshold-ами. `npm run test:coverage` доступен. Запуск требует установки `@vitest/coverage-v8` (записано в TODO как dev-install шаг).

### Charts (Задача 7)

- ✅ **`@skygraph/react`** — `<LineChart>`, `<BarChart>`, общий контракт типов (`ChartSeries`, `ChartCategory`, `ChartValue`, `BaseChartProps`), `DEFAULT_PALETTE` через CSS-токены, утилита `colorForSeries`.
- ✅ **`packages/react/styles/components/charts.css`** — минимальные стили (color-from-tokens, font-size-sm).
- ✅ **Demo** — `BasicLine.demo.tsx`, `BasicBar.demo.tsx`, `ChartsDemo.tsx`. Подключено в App меню под Data Display.
- ⚠ Не сделано (отложено): AreaChart, PieChart, оси, легенда, tooltip, анимации, кросс-фильтрация.

### Что НЕ удалось закрыть в этом turn-е (даже после расширения)

- **Удаление `ui/TreeSelect.tsx` / `ui/Transfer.tsx`** — требует миграции `__tests__/new-components.test.tsx` на complex-версии. Отложено как мини-стрим.
- **Локализация `*Page.tsx`** (GettingStarted 95, Theming 140, CoreApi 131, DesignTokens 301, StylingShowcase 884) — большой текстовый объём. Отложено.
- **Локализация ~480 файлов в `examples/demo/src/demos/`** — массовая работа.
- **Большие Задачи 4, 6, 8, 11, 12, 13** — не запускались.
- **Орто-роутер для GraphEngine, drag-and-drop, snap-to-grid, OBB, zoom/pan** — не сделаны.
- **AreaChart / PieChart, оси / легенда / tooltip** в Charts — не сделаны.
- **189 dead-классов CSS / 105 DOM без CSS** — ручная чистка отложена.
- **`@vitest/coverage-v8`** — пакет не установлен (нужно явное разрешение пользователя на установку deps).
- **Установка `@axe-core/react`** для a11y-тестов — то же.
- **Удаление `examples/showcases/` больших файлов** (forms 1131, ecommerce 1080) — Задача 4.

### Финальный счётчик коммитов и тестов

```
Тесты:    519 — все зелёные
Коммитов: ~40 в одном непрерывном стриме
TS build: чисто
```

