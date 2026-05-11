# Findings — T-Vue-Components-DOM-Parity (Волна 3.3b)

> Случаи, где паритет с React невозможен без слома публичного API или
> требует значительного рефакторинга вне рамок стрима. По правилам карты —
> фиксируем findings, не делаем breaking change.

## 1. `@skygraph/vue (esm)` превышает size-limit на ~1.63 KB

- **Симптом:** после добавления `loading` props (+ inline `sg-spin` рендер)
  и расширения некоторых компонентов размер ESM-бандла = 91.63 KB при
  лимите 90 KB.
- **CJS остаётся в пределах** (153.33 KB при лимите 160 KB).
- **Что попробовали:**
  - Заменили все `<SgSpin>` рендеры на inline
    `<span class="sg-spin sg-spin-small">` (минус один импорт компонента
    на каждое использование).
  - Откатили `useConfigWithDefaults` в `Select`/`AutoComplete` (вернули
    локальный `props.size`).
  - Убрали дублирующий импорт `SgSpin` из 12 компонентов.
- **Что осталось:** добавленные `loading` props и `sg-*-loading` классы
  системно добавляют ~1–2 KB после minify+brotli.
- **Дальнейшие шаги:** требуется владелец `.size-limit.json` (или
  владелец стрима 3.3a/Wrappers-Parity), чтобы либо договориться о
  поднятии лимита Vue до 92 KB (на уровне фактически достигнутого
  размера + 0.4 KB), либо отказаться от части `loading`-парити.
- **Карта запрещает** трогать `.size-limit.json` самостоятельно в этом
  стриме.

## 2. SgLocale в `@skygraph/vue` не зеркалит React

- **Симптом:** в `packages/vue/src/types.ts` отсутствуют интерфейсы
  `CarouselLocale`, `RateLocale`, `BreadcrumbLocale`, `TagLocale`,
  `DrawerLocale`, `NotificationLocale`, `SpinLocale`, `SkeletonLocale`,
  `DatePickerLocale`, `TimePickerLocale`, `CascaderLocale`,
  `TreeSelectLocale`, `UploadLocale`, `TransferLocale`, `CalendarLocale`,
  `FormLocale`, `DashboardLocale`, `GanttLocale`,
  `ResourceCalendarLocale`, `TimelineLocale`, `SchemaFormEditorLocale`,
  `ChartsLocale`, `TableLocale`, `DataGridLocale`.
- **Последствия:** `Rate`, `Carousel`, `Drawer`, `Modal` (closeAriaLabel),
  `Notification` и др. не могут читать локализованные строки из
  `ConfigProvider` — захардкожены английские дефолты.
- **Зона:** относится к стриму `T-Vue-Demo-Wrappers-Parity` (3.3a),
  который владеет public API Vue-пакета (`types.ts`, `locales/**`).
- **Не делаем:** добавление 20+ интерфейсов в `types.ts` пересекается
  с зоной 3.3a и потребует расширения публичного API. Стрим 3.3b не
  трогает `types.ts`.

## 3. Vue-компоненты с data-driven API в местах, где React принимает `ReactNode`

Перечисленные ниже компоненты сознательно принимают `string` (или строго
типизированную структуру) там, где React-аналог принимает `ReactNode`.
Это API-разница, не DOM-разница; полный паритет потребует слотов вместо
данных и сломает существующих потребителей.

| Vue | React | Поле |
|---|---|---|
| `Collapse` | `Collapse` | `items[].label`/`children` → `label`/`content` (строки) |
| `Descriptions` | `Descriptions` | `items[].children` → `items[].value` (строка) |
| `Menu` | `Menu` | `items[].icon` (Vue не принимает VNode, finding) |
| `Tabs` | `Tabs` | `items[].icon` — финдинг (вместо ReactNode) |
| `Notification` | `Notification` | `message`/`description` — `string` вместо `ReactNode` |
| `Popconfirm` | `Popconfirm` | `title`/`description` — `string` |
| `Drawer` | `Drawer` | `title` — `string`, footer = named slot |
| `Modal` | `Modal` | `title` — `string` (Vue), footer — named slot |
| `Carousel` | `Carousel` | aria-label per slide не использует `locale.carousel.slide(i)` |

Решение: оставить как есть, потому что:

- удаление существующего props/строкового контракта — breaking change;
- большинство этих props покрыты тестами `ui-feedback`, `ui-display`,
  `ui-navigation`, парити-тесты ориентированы на `class`-/`role`-набор,
  а не на тип контента.

Стрим `T-Vue-Demo-PostMigration-Audit` (3.3) при необходимости заведёт
отдельную задачу на смену data-driven → slot-driven (это уже волна 4+).

## 4. `ColorPicker.vue` не имеет saturation/hue панели

- **Vue ColorPicker** = swatch trigger + text input + presets.
- **React ColorPicker** = swatch + saturation-square + hue-bar + text + presets.
- Vue реализация сознательно упрощена; добавление пайпа SV/Hue (≈200 LOC,
  pointer-capture/touch) поднимет размер ESM ещё на ~1 KB и нарушит §1
  жёстче.
- **Решение:** finding, оставить как есть до volna 4.

## 5. `Cascader` не имеет async-loading опций

- React `Cascader` поддерживает `loadData` async-функцию и рендерит
  `sg-cascader-option-loading` на узлах, у которых грузятся children.
- Vue `Cascader` — синхронный, без `loadData`.
- **Решение:** finding, async API — отдельный стрим (Wave 4+).

## 6. `DatePicker.vue` без редактируемого `<input>` и без `RangePicker`

- React DatePicker рендерит `<input type="text">`, парсит руками
  введённую дату, поддерживает `RangePicker` (2 даты).
- Vue DatePicker рендерит `<div class="sg-datepicker-input">` (read-only
  combobox), `RangePicker` отсутствует.
- **Решение:** finding, рефактор требует ~400 LOC и поломает API
  внешних потребителей (clear/keyboard input). Wave 4+.

## 7. `TimePicker.vue` без редактируемого ввода

Аналогично §6 — read-only display.

## 8. `Mentions.vue` — раздутая Vue-специфика

- Vue компонент дополнительно содержит `prefix`-токенизацию и keyboard-
  навигацию по dropdown, которых нет в React (Mentions Vue был портирован
  до того, как React-аналог фиксировался).
- **Решение:** оставить (это additive API, не ломает паритет DOM).

## 9. Diagram zone — обнаруженный typecheck-error

- `packages/vue/src/components/complex/Diagram/Diagram.vue` имел
  pre-existing `TS6133: 'slots' is declared but its value is never read`
  (неиспользуемый `const slots = useSlots()`).
- **Действие:** удалена строка + неиспользуемый `useSlots` импорт
  (один-в-один с правкой `complex/Table/Table.vue` для `sortIndicator`,
  сделанной до этого).
- **Обоснование:** локальный фикс ради `pnpm typecheck`; DOM/aria/CSS
  Diagram не менялся (только мёртвый код).
- **Уведомление:** стрим `T-Diagram-Polish` (3.3c) может включить эту
  правку в свой scope, конфликта нет.

## 10. `Form/SubmitButton.vue` — composition rewrite

- Был: прямой `<button class="sg-button ...">`.
- Стало: `<SgButton type="primary" htmlType="submit" :loading :unstyled>`.
- **Обоснование:** React `SubmitButton` тоже композирует `<Button>`,
  а не дублирует CSS-классы. Это PARITY-fix, а не finding.
- **Добавлены** новые опциональные props `loading?: boolean` и
  `unstyled?: boolean` (additive).

## 11. `List.vue` / `Table.vue` — warning `TS2774`

- При генерации `.d.ts` `vue-tsc` ругается на `slots.loadMore` /
  `slots.toolbar` («This condition will always return true since this
  function is always defined»).
- Это известный артефакт `defineSlots` + `useSlots()` — типы named
  slot функций считаются всегда определёнными, хотя на runtime могут
  быть `undefined`.
- **Действие:** не трогаем. `pnpm typecheck` зелёный (vue-tsc не
  падает), `pnpm test` зелёный, `pnpm build` создаёт корректный
  bundle (предупреждение от `vite:dts` не блокирует).
- **Pre-existing:** обе строки были в коде до стрима 3.3b.

---

Все остальные ~70 компонентов прошли парити-аудит и помечены в
финальном отчёте `T-Vue-Components-DOM-Parity.md` как PARITY-OK или
FIXED.
