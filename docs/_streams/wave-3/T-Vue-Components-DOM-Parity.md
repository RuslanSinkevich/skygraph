# T-Vue-Components-DOM-Parity — Волна 3.3b: DOM-паритет компонентов `@skygraph/vue` с React

> Читать первым: `docs/_streams/CHARTER.md`, `docs/_streams/wave-3/CHARTER.md`,
> `docs/_streams/done/T-Vue-Demo-Foundation.md`,
> `docs/_streams/findings/T-Vue-Demo-Foundation.md`.

## ID и волна

- **ID:** T-Vue-Components-DOM-Parity
- **Волна:** 3.3b (один независимый стрим, **параллельно** с 3.3a `T-Vue-Demo-Wrappers-Parity`, **строго до** 3.3 `T-Vue-Demo-PostMigration-Audit`)
- **Режим:** один таб

## Зачем стрим

Компоненты `@skygraph/vue` (~88 SFC в `packages/vue/src/components/**`)
писались отдельно от React-аналогов (~96 файлов в
`packages/react/src/components/**`). DOM в основном совпадает (одни
`sg-*` классы из `@skygraph/styles`), но есть систематические
расхождения, которые дают визуальный дрейф:

- лишние/недостающие узлы (например `Button.vue` оборачивает spinner в
  лишний `<span class="sg-button-spin">`, в React его нет);
- лишние классы или другая структура классов;
- дополнительные named slots, которых нет в React (Button `#icon`);
- отсутствующие `aria-*` атрибуты или иной их состав;
- иногда — другой тег корня (`<span>` vs `<div>`).

Цель — **ровно DOM/className/aria-паритет** без слома публичного API:

- **Можно** добавлять новые опциональные props (например `Button.unstyled`
  по образцу React).
- **Нельзя** удалять или переименовывать существующие props.
- **Нельзя** менять сигнатуры событий и emit-имена.

## Зона файлов

### Можно править

- `packages/vue/src/components/**/*.vue` — все SFC, **кроме**
  `packages/vue/src/components/complex/Diagram/**` (зона стрима
  `T-Diagram-Polish`, 3.3c).
- `packages/vue/src/components/**/*.ts` — внутренние утилиты компонентов,
  **кроме** `complex/Diagram/**`. Не изменять публичный re-export в
  `index.ts` и `locales/`.
- `packages/styles/components/*.css` — **только** Vue-специфичные правила
  (например лишние селекторы под `sg-button-spin`, которых нет в React-
  использовании). Если правило используется и React-кодом — finding,
  не трогаем.
- `docs/_streams/{decisions,findings,done}/T-Vue-Components-DOM-Parity.md`

### Нельзя трогать

- `packages/react/**` — целиком read-only (это эталон).
- `packages/core/**` — read-only.
- `packages/vue/src/components/complex/Diagram/**` и
  `packages/react/src/components/complex/Diagram/**` — зона стрима
  `T-Diagram-Polish` (3.3c). Если по пути встретился Diagram —
  пропусти и зафиксируй в decisions.
- `packages/vue/src/index.ts`, `packages/vue/src/locales/**` — публичный
  API; добавление нового prop НЕ требует изменения index.
- `examples/**` — целиком read-only (включая 3.3a зону `demos/components/*`).
- `tsconfig*`, `package.json`, `pnpm-lock.yaml`.
- `.size-limit.json` — лимиты Vue (90 KB esm / 160 KB cjs) не двигать.
  Если порт DOM раздул bundle — finding, ищем оптимизацию.

## Разделение зон с 3.3a и 3.3c (важно)

| Стрим | Зона | Префикс классов |
|---|---|---|
| 3.3a `T-Vue-Demo-Wrappers-Parity` | `examples/demo-vue/src/demos/components/*.vue` + `examples/demo-vue/src/style.css` + `examples/demo-vue/src/i18n/**` | `.demo-box*` / `.doc-*` (классы демо-сайта) |
| **3.3b (этот)** | `packages/vue/src/components/**` (кроме `complex/Diagram/**`) + точечно `packages/styles/components/*.css` (кроме `diagram.css`) | `sg-*` (классы пакета) |
| 3.3c `T-Diagram-Polish` | `packages/{vue,react}/src/components/complex/Diagram/**` + `packages/core/src/engines/graph/**` + `packages/styles/components/diagram.css` + `examples/showcases/src/showcases/workflow-editor/**` | `sg-diagram*` |

Никаких пересечений. Можно запускать одновременно с 3.3a и 3.3c.

## ⚠️ Правила автономности

Не останавливаться, не задавать вопросов. Решения вне карты —
`docs/_streams/decisions/T-Vue-Components-DOM-Parity.md`. Пропуски и
breaking changes — `docs/_streams/findings/T-Vue-Components-DOM-Parity.md`.
В конце — отчёт `docs/_streams/done/T-Vue-Components-DOM-Parity.md`.
Никаких `git commit`/`push`/`pnpm install`.

## Принципы DOM-паритета (применяй к каждому компоненту)

1. **Тег корня** = тег корня React (если React `<button>`, Vue должен
   рендерить `<button>`, а не `<div>`).
2. **Список классов** на корне = список классов React-аналога. Порядок
   допускается любой, главное — набор тот же.
3. **Атрибуты** (`type`, `role`, `aria-*`, `disabled`, `tabindex`,
   `data-*`) — повторить как в React. Если в React их нет, в Vue тоже
   не должно быть (минус «лишние»).
4. **Внутренние узлы** — структура слой-в-слой совпадает. Если React
   рендерит `<button><Spin /><children /></button>`, Vue рендерит то же.
   Если Vue добавляет обёртку (`<span class="sg-button-spin">…</span>`)
   — убрать (если эта обёртка не несёт стилевой нагрузки в общем CSS) или
   завести finding с обоснованием.
5. **Named slots** — если в React это `children`, в Vue должен быть
   default slot. Дополнительные named slots можно оставить **только**
   если они есть и используются в `examples/demo-vue/src/demos/<comp>/**`
   (т.е. их кто-то реально вызывает); иначе finding на удаление.
6. **`unstyled` prop** — если в React есть, в Vue должен быть. Поведение:
   при `unstyled=true` рендерим только пользовательский `class`, без
   `sg-*`. Если уже есть — оставить, если нет — **добавить новый prop**.
7. **`v-model`** — если React-аналог имеет `value`/`onChange` или
   `checked`/`onChange`, в Vue должен поддерживаться `v-model:value`
   или `v-model:checked` (default `v-model` = `modelValue`). Если уже
   есть — не трогать.
8. **`fall-through attrs`** — если в React `className` и `style` идут
   на корень, в Vue `inheritAttrs` для корневого узла должен быть `true`
   (по умолчанию), и `class`/`style` атрибуты пользователя должны
   попадать на тот же узел.
9. **Любой структурный API-change** (удалить prop, переименовать emit) →
   **finding**, не делаем.

## Порядок работы

Список 88 компонентов в `packages/vue/src/components/**` разбит на 4
батча по 22 компонента. Идём батчами, после каждого — `pnpm --filter
@skygraph/vue typecheck && pnpm --filter @skygraph/vue test --run`.
Если тесты parity (Wave 2 их добавила) красные — ремонтируем перед
переходом к следующему компоненту.

### Батч 1 — UI base (22)

`Button` (примечание: spinner-обёртка `sg-button-spin`, slot `#icon`,
prop `unstyled`), `Input`, `InputNumber`, `InputPassword`, `InputGroup`,
`Textarea`, `SearchInput`, `PinInput`, `Mentions`, `TagInput`, `Tag`,
`Badge`, `Avatar`, `Tooltip`, `Spin`, `Skeleton`, `Progress`, `Empty`,
`Result`, `Switch`, `Checkbox`, `Radio`.

### Батч 2 — UI nav + feedback (22)

`Tabs`, `Menu`, `Breadcrumb`, `Dropdown`, `Pagination`, `Steps`,
`Segmented`, `Modal`, `Drawer`, `Popconfirm`, `Notification`,
`ConfigProvider`, `Carousel`, `Collapse`, `Descriptions`, `Slider`,
`Rate`, `ColorPicker`, `Select`, `AutoComplete`, `InlineEdit`,
`Transition`.

### Батч 3 — UI date + complex base (22)

`DatePicker`, `TimePicker`, `Calendar`, `Cascader`, `TreeSelect`,
`Upload`, `Transfer`, `Timeline`, `EventTimeline`, `List`,
`VirtualList`, `Tree`, `TreeNodeRow`, `Form`, `FormList`,
`FormProvider`, `Field`, `SubmitButton` (Form/SubmitButton.vue),
`SchemaForm`, `AutoField`, `Table`, `DataGrid`.

### Батч 4 — Visualization + complex (22)

`ChartAxes`, `ChartLegend`, `ChartBrush`, `ChartCrosshair`,
`ChartHoverToolbar`, `LineChart`, `AreaChart`, `BarChart`, `PieChart`,
~~`Diagram`~~ (зона стрима 3.3c `T-Diagram-Polish`, не трогаем),
`Dashboard`, `DashboardEditor`, `Gantt`,
`ResourceCalendar`, `SchemaFormEditor`,
`SchemaFormEditorPalette`, `SchemaFormEditorCanvas`,
`SchemaFormEditorInspector`, `SchemaFormEditorSchemaView`,
`HistoryPanel` (devtools), плюс резерв на 2 переиспользуемых
вспомогательных SFC, если найдутся.

> Цифры приблизительны: глобальный счётчик `packages/vue/src/components/**`
> = 88 SFC. Финальный отчёт пишет точное распределение.

## Чек-лист (для каждого компонента)

### Шаг 0 (один раз). Прочитать обязательное
- `docs/_streams/CHARTER.md` + `docs/_streams/wave-3/CHARTER.md`.
- `docs/_streams/findings/T-Vue-Demo-Foundation.md` (Button-Unstyled и пр.).
- README пакетов `packages/vue/README.md` если есть.

### Шаг 1 (на каждый компонент)
1. Открыть React-аналог (`packages/react/src/components/{ui,complex}/<Name>.tsx`).
2. Открыть Vue-исходник (`packages/vue/src/components/{ui,complex}/<Name>.vue`
   или `<Name>/<Name>.vue`).
3. Сравнить: тег корня, список классов, атрибуты, внутренний DOM,
   slots, props.
4. Применить **минимальную правку** под §«Принципы DOM-паритета».
5. **Не менять** публичный API (props, emits) — только дополнения.

### Шаг 2 (на каждый компонент)
- `pnpm --filter @skygraph/vue typecheck` — зелёный.
- `pnpm --filter @skygraph/vue test --run` — зелёный (parity-тесты Wave 2).
- Если красное — починить в этом же компоненте, не идти дальше.

### Шаг 3 (после каждого батча)
- `pnpm --filter @skygraph/vue build` — зелёный.
- `pnpm size` — зелёный (`@skygraph/vue (esm)` ≤ 90 KB,
  `@skygraph/vue (cjs)` ≤ 160 KB).

### Шаг 4 (финал)
- `pnpm -r --if-present run typecheck` — зелёный.
- `pnpm -r --if-present run test --run` — зелёный.
- `pnpm --filter @skygraph/vue build && pnpm --filter demo-vue build` — зелёные.
- `pnpm size` — зелёный.

## Acceptance criteria

- Все 88 SFC в `packages/vue/src/components/**` пройдены, по каждому в
  отчёте указано: «PARITY-OK» / «FIXED (что именно)» / «FINDING (что
  именно)».
- Нет breaking changes публичного API (отчёт явно подтверждает).
- `pnpm size` зелёный, лимиты Vue не подняты.
- Parity-тесты Wave 2 (если есть) — зелёные. Если правка ломает
  существующий тест → finding, разбор владельцем.
- Отчёт `docs/_streams/done/T-Vue-Components-DOM-Parity.md` сдан с
  таблицей по 88 компонентам, секцией «Решения вне плана» и
  ссылками на decisions/findings.

## Зависимости

- **Параллельно** с `T-Vue-Demo-Wrappers-Parity` (3.3a) — зоны не
  пересекаются (см. §«Разделение зон с 3.3a»).
- **Строго до** `T-Vue-Demo-PostMigration-Audit` (3.3) — иначе аудит
  будет фиксировать те же расхождения, что чинит этот стрим.

---

## Текст запуска стрима (копипаст в новый таб Cursor)

```text
Ты — стрим T-Vue-Components-DOM-Parity (Волна 3.3b) в репозитории skygraph.

Задача: пройти все ~88 SFC в packages/vue/src/components/** (КРОМЕ
complex/Diagram/** — это зона стрима 3.3c T-Diagram-Polish) и привести
DOM/className/aria к паритету 1:1 с React-аналогами в
packages/react/src/components/**. БЕЗ слома публичного API: новые
опциональные props добавлять можно (например Button.unstyled), удалять/
переименовывать существующие — нельзя (finding). Параллельно с 3.3a
(Wrappers-Parity) и 3.3c (Diagram-Polish), их зоны не пересекаются.

Полная карта: docs/_streams/wave-3/T-Vue-Components-DOM-Parity.md

Правила автономности: не останавливаться, не спрашивать. Идём батчами
по 22 компонента, после каждого батча — pnpm --filter @skygraph/vue
typecheck && test --run && build, после всех — pnpm size. В конце —
отчёт docs/_streams/done/T-Vue-Components-DOM-Parity.md. Никаких
git commit / pnpm install. Не лезь в packages/react, packages/core,
examples/**.

Старт: Шаг 0 карты, потом Батч 1 (Button и далее по списку).
```
