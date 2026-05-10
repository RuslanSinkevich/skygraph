# Findings — T-Vue-Demo-Forms

> Append-only. Каждая запись — что нашли вне scope или что пропустили.

Поток: Wave 3.2 / Tab A. Зона: 18 data-entry компонентов
(`input, inputnumber, textarea, select, checkbox, radio, switch, slider,
rate, autocomplete, cascader, treeselect, colorpicker, datepicker,
timepicker, calendar, upload, transfer`).

---

## input-textarea-loading-not-in-vue

`packages/vue/src/components/ui/Textarea.vue` (`SgTextarea`) **не имеет**
prop `loading` — есть только `disabled`. У React `<Textarea loading />`
есть.

**Где задело:** `examples/demo-vue/src/demos/input/TextareaStates.demo.vue`.
Заменили loading-row на ещё одну disabled-вариацию (с `placeholder`),
чтобы visual rows совпали по числу. В `input-doc/{en,ru}` сняли ключ
`propTextareaLoading`, упоминание dropped в `demoTextareaStatesDesc`.

**Решение:** не добавляем prop в core под Wave 3 (это вне зоны Tab A).
Помечаем как parity-gap для будущей Wave 4 / Vue-core стрима.

## inputnumber-loading-not-in-vue

`packages/vue/src/components/ui/InputNumber.vue` (`SgInputNumber`) **не
имеет** `loading` prop — у React `<InputNumber loading />` есть.

**Где задело:** `examples/demo-vue/src/demos/inputnumber/States.demo.vue`.
Оставили только disabled-вариант (one row), description обновлён в
`inputnumber-doc/{en,ru}` (`demoStatesDesc`), `propLoading` снят.

**Решение:** parity-gap, не лечим в Tab A.

## select-loading-not-in-vue

`packages/vue/src/components/ui/Select.vue` (`SgSelect`) **не имеет**
`loading` prop, а `SelectOption` — `loading` поля. У React оба есть.

**Где задело:** заменили `examples/demo/src/demos/select/Loading.demo.tsx`
на `examples/demo-vue/src/demos/select/EmptyState.demo.vue`, который
демонстрирует `disabled` группой и пустой `options=[]`. Доки:
`select-doc/{en,ru}` — сняли `propLoading`, `propOptionLoading`, добавили
`propMultiple` (Vue-only superset: `multiple` есть в `SgSelect`, нет в
React `Select`).

**Решение:** parity-gap; multiple — намеренный Vue-superset, фиксируем
как Vue-feature (не undo).

## checkbox-loading-not-in-vue

`packages/vue/src/components/ui/Checkbox.vue` (`SgCheckbox`) **не имеет**
`loading` prop. У React `<Checkbox loading />` есть.

**Где задело:** `examples/demo-vue/src/demos/checkbox/States.demo.vue` —
5 visual rows вместо 6 (no loading), description в `checkbox-doc/{en,ru}`
обновлён, `propLoading` снят.

**Решение:** parity-gap.

## radio-loading-not-in-vue

`packages/vue/src/components/ui/Radio.vue` (`SgRadio`) **не имеет**
`loading` prop. У React `<RadioGroup loading />` есть.

**Где задело:** `examples/demo-vue/src/demos/radio/DisabledStates.demo.vue` —
показывает только per-option `disabled` + group-level `disabled`
(loading-row отброшен). Doc-key `propLoading` не добавлен в
`radio-doc/{en,ru}`. Title демо переименован с "States" в
"Disabled states", чтобы не вводить в заблуждение.

**Решение:** parity-gap.

## colorpicker-showtext-boolean-only-in-vue

`packages/vue/src/components/ui/ColorPicker.vue` (`SgColorPicker`)
принимает `show-text` только как `boolean`. У React
`showText: boolean | ((color: string) => ReactNode)` — можно отрисовать
кастомный node вместо строки.

**Где задело:** в `colorpicker-doc/{en,ru}` тип `propShowText` помечен
как `boolean`. Vue-демо не использует функциональную форму. В
PropsTable напрямую отражено.

**Решение:** parity-gap. Вариант для Wave 4 — ввести scoped slot
`#showText="{ color }"` (Vue-эквивалент функционального prop).

## treeselect-naming-difference

`packages/vue/src/components/ui/TreeSelect.vue` (`SgTreeSelect`)
использует `value` / `label` для узлов вместо React-овских `key` /
`title`. Также вместо `treeDefaultExpandAll` есть только
`defaultExpandedKeys`.

**Где задело:**
- `examples/demo-vue/src/demos/treeselect/data.ts` — поля переименованы;
  экспортирована вспомогательная константа `orgTreeAllParentKeys` для
  эмуляции `treeDefaultExpandAll`.
- В `treeselect-doc/{en,ru}` сняты `propTreeDefaultExpandAll`,
  `nodeTitle`, `nodeKey`, `nodeCheckable`; добавлены
  `propDefaultExpandedKeys`, `nodeValue`, `nodeLabel`. Названия столбцов
  таблицы тоже актуализированы (`TreeSelectNode`).

**Решение:** долго не оставляли документально; зафиксировали как
naming-разницу. Унификация (alias-полей React → Vue) — кандидат для
Wave 4.

## treeselect-no-cascade-in-vue

`SgTreeSelect` с `tree-checkable=true` показывает чекбокс на каждом
узле, но **не** автоматически отмечает поддерево, если кликнуть на
parent. У React `<TreeSelect treeCheckable />` cascade-отметка работает
по умолчанию.

**Где задело:** `examples/demo-vue/src/demos/treeselect/Checkable.demo.vue` —
описание прямо упоминает отсутствие cascade. В `treeselect-doc/{en,ru}`
текст `propTreeCheckable` обновлён.

**Решение:** parity-gap. Добавление cascade-логики — изменение в
core-Vue, для Wave 4.

## cascader-feature-gaps-in-vue

`packages/vue/src/components/ui/Cascader.vue` (`SgCascader`) отстаёт от
React по нескольким направлениям:

1. **Нет `multiple`** (и сопутствующих `maxTagCount`).
2. **Нет `loadData`** / `option.isLeaf` для async-load.
3. **`displayRender` принимает `(labels: string[]) => string`**
   (а не `ReactNode`) — нельзя вернуть VNode/JSX.
4. **`showSearch` — boolean only** — нет `{ filter }` overload.
5. **Нет `dropdownStyle`** prop.
6. `option.label` — `string`, не `ReactNode`.

**Где задело:**
- Демо `Multiple.demo.vue` и `AsyncLoad.demo.vue` **не созданы**
  (в React-аналоге их 2 → итого 12 демо у React, 10 у Vue).
- `CustomRender.demo.vue` использует строковый форматтер
  (`'A › B'` вместо JSX-чипа с цветом).
- `Search.demo.vue` показывает только базовую булеву форму, второй
  React-вариант (`{ filter }`) не воспроизводится.

В `cascader-doc/{en,ru}` сняты `propMultiple`, `propLoadData`,
`propMaxTagCount`, `propDropdownStyle`, `optionIsLeaf`. Тип
`propDisplayRender` помечен как string-only, `propShowSearch` — как
boolean-only. Описания соответствующих демо переписаны с упоминанием
parity-gap.

**Решение:** parity-gap. Добавить эти возможности в Vue-core — задача
для Wave 4 (потребует значительной доработки `Cascader.vue`).

## autocomplete-loading-not-in-vue

`packages/vue/src/components/ui/AutoComplete.vue` (`SgAutoComplete`)
**не имеет** `loading` prop. У React `<AutoComplete loading />`
показывает inline-spinner и блокирует ввод.

**Где задело:**
- `examples/demo-vue/src/demos/autocomplete/States.demo.vue` — оставили
  только два disabled-варианта.
- `examples/demo-vue/src/demos/autocomplete/AsyncSearch.demo.vue` —
  паттерн async-поиска: вместо inline-spinner показываем side-label
  «идёт поиск…».

В `autocomplete-doc/{en,ru}` сняли `propLoading`, переписали
`demoStatesDesc`/`demoAsyncDesc`.

**Решение:** parity-gap.

## rate-character-string-only-in-vue

`packages/vue/src/components/ui/Rate.vue` (`SgRate`) принимает
`character` только как `string`. У React `Rate.character` — `ReactNode`,
поэтому в React-демо `CustomCharacter.demo.tsx` третий ряд — inline SVG.

**Где задело:** `examples/demo-vue/src/demos/rate/CustomCharacter.demo.vue`
показывает три глифа (`♥`, `🔥`, `✦`) вместо SVG. В `rate-doc/{en,ru}`
тип `propCharacter` помечен как `string`, описание `demoCustomCharacterDesc`
переписано.

**Решение:** parity-gap. Для Wave 4 имеет смысл добавить scoped slot
`#character="{ index }"`, что даст полную React-параллель.

## switch-loading-not-in-vue

`packages/vue/src/components/ui/Switch.vue` (`SgSwitch`) **не имеет**
`loading` prop. У React `<Switch loading />` показывает inline-spinner и
блокирует клики.

**Где задело:**
- `examples/demo-vue/src/demos/switch/States.demo.vue` — оставили только
  disabled-row, описание "loading-row dropped";
- `examples/demo-vue/src/demos/switch/AsyncToggle.demo.vue` — паттерн
  оптимистичного toggle сделали через `:disabled="pending"` плюс
  side-label "сохранение…", без визуального спиннера в треке.

**Решение:** parity-gap. Возможно, добавить `loading` в Vue-core в
рамках Wave 4 — он повышает UX async-форм. Для Tab A — out of scope.

## datepicker-vue-feature-gaps

`packages/vue/src/components/ui/DatePicker.vue` (`SgDatePicker`) сильно
отстаёт от React-аналога. Пропуски:

1. **Нет `SgRangePicker`** — отсутствует двухсторонний диапазонный пикер
   (в React это отдельный экспорт + дроп `RangePicker.tsx`).
2. **Нет `presets`** — sidebar-шорткатов нет ни в API, ни в UI.
3. **Нет `picker="week"`** — только `'date' | 'month' | 'year'`.
4. **`show-time` — boolean only** — нет `ShowTimeConfig` (`hourStep`,
   `minuteStep`, `secondStep`, `defaultValue`, `format`).
5. **Нет `showNow`** шортката, нет `placement`, нет `inputReadOnly`.
6. **Нет локализации** — месяцы и дни недели захардкожены на английском
   (`MONTH_NAMES` / `DAY_NAMES` константы в `<script setup>`), нет
   интеграции с `ConfigProvider.locale.calendar`.
7. **Нет `onCalendarChange`** — есть только `change` (после фиксации) и
   `openChange`.

**Где задело:**
- В Vue-стриме создано **8 демо** вместо 11 React-демо. Дропнули:
  `Range.demo.vue`, `RangePresets.demo.vue` (нет `SgRangePicker`),
  `Presets.demo.vue` (нет `presets`-prop), `RussianLocale.demo.vue`
  (нет локализации).
- `WithTime.demo.vue` — упрощён до boolean `show-time`, в side-label
  явно сказано «нет hourStep/minuteStep/showNow».
- `PickerModes.demo.vue` — три ряда (date/month/year), без week.
- В `datepicker-doc/{en,ru}` сняты ключи `propRangeXxx`, `propTimeXxx`
  (`ShowTimeConfig`), `propPresets`, `propPlacement`,
  `propOnCalendarChange`, `propShowNow`, `propInputReadOnly`. Удалены
  `tableRangePickerApi`, `tableShowTimeConfig`. В `pageWhen3` явно
  сказано «для диапазонов / пресетов / недель / i18n — пользуйтесь
  React-версией».

**Решение:** parity-gap огромный — добавление `SgRangePicker`, `presets`,
`week`-picker и i18n требует существенной доработки `DatePicker.vue` и,
возможно, нового `RangePicker.vue`. Для Wave 4 / отдельной задачи на
Vue-core. Для Tab A — out of scope, фиксируем как «React-only feature
set» в доках.

## timepicker-vue-feature-gaps

`packages/vue/src/components/ui/TimePicker.vue` (`SgTimePicker`)
отстаёт от React-аналога. Пропуски:

1. **Нет `SgTimeRangePicker`** — нет двухстороннего диапазонного пикера
   времени (в React это отдельный экспорт `TimeRangePicker`).
2. **Нет `disabledHours` / `disabledMinutes` / `disabledSeconds`** —
   нельзя через предикат-callback серить недоступные слоты (бизнес-часы).
3. **Нет `loading`** prop — нельзя показать inline-spinner и блок ввода.
4. **Нет `inputReadOnly`** — нельзя заблокировать клавиатурный ввод,
   принудив выбирать только в скролле.

**Где задело:**
- В Vue-стриме создано **7 демо** вместо 9 React-демо. Дропнули:
  `Range.demo.vue` (нет `SgTimeRangePicker`),
  `DisabledSlots.demo.vue` (нет `disabledHours/Minutes/Seconds`).
- `States.demo.vue` — оставили только `disabled`-ряд + ряд с
  «загрузкой через `:disabled`» и подписью сбоку (паттерн как в
  `switch/AsyncToggle`).
- В `timepicker-doc/{en,ru}` сняты `propLoading`, `propDisabledHours`,
  `propDisabledMinutes`, `propDisabledSeconds`, `propClassName`,
  `propStyle`, `propRangeXxx`. Удалены `tableTimeRangePickerApi`. В
  `pageWhen3` явно сказано «для диапазонов / disabled-слотов / loading
  — пользуйтесь React-версией».

**Решение:** parity-gap. Добавление `SgTimeRangePicker`,
`disabledHours/Minutes/Seconds` и `loading` — задачи Wave 4 / Vue-core.
Для Tab A — out of scope, фиксируем как «React-only feature set».

## calendar-vue-feature-gaps

`packages/vue/src/components/ui/Calendar.vue` (`SgCalendar`) — самый
ужатый из data-entry компонентов. Пропуски vs React:

1. **Нет `fullscreen`** — Vue всегда рендерит компактную таблицу.
2. **Нет `multipleSelection` / `multipleValue` / `onMultipleChange`** —
   нельзя выбрать несколько произвольных дат (тогл).
3. **Нет `rangeSelection` / `rangeValue` / `onRangeChange`** — нет
   диапазонного режима с подсветкой средних дней.
4. **Нет `cellRender` / `headerRender`** — нет slot-механизма для
   кастомного содержимого ячейки или замены chrome.
5. **Нет `locale`** prop — `MONTH_NAMES` и `DAY_NAMES` захардкожены на
   английском.
6. **Нет `maxEvents`** — все события в ячейке рендерятся плоским
   списком (без `+N more` overflow).
7. **`event.color` / `event.key` отсутствуют** — Vue `CalendarEvent`
   имеет шейп `{ id, title, type }`. Нет цветовой подсветки чипов.
8. **`mode="year"`** принимается, но в реальности рисуется тот же
   `monthGrid` (нет 12-месячного overview).

**Где задело:**
- В Vue-стриме создано **9 демо** вместо 14 React-демо. Дропнули:
  `Card.demo.vue` (нет `fullscreen`), `MultipleSelection.demo.vue`,
  `RangeSelection.demo.vue`, `CustomCell.demo.vue`,
  `CustomHeader.demo.vue`, `Locale.demo.vue`. Итого 6 дропов; добавлен
  `Controlled.demo.vue` (был только в виде составной части других
  React-демо), чтобы покрыть v-model + buttons-pattern.
- `Events.demo.vue` использует Vue-шейп события (`{ id, title, type }`)
  без цвета — описание прямо упоминает разницу.
- `YearMode.demo.vue` показывает, что `mode='year'` принимается, но
  сетка та же.
- В `calendar-doc/{en,ru}` сняты `propFullscreen`, `propCellRender`,
  `propHeaderRender`, `propLocale`, `propRangeSelection`,
  `propMultipleSelection`, `propMaxEvents`, `propKeyboard`,
  `eventColor`, `eventKey`. В `pageWhen3` явно сказано «для range /
  multiple / cellRender / locale / fullscreen — пользуйтесь
  React-версией».

**Решение:** parity-gap огромный — фактически Vue-Calendar — это
«MVP» относительно React. Все недостающие фичи требуют существенной
доработки `Calendar.vue`. Для Wave 4 / отдельной задачи на Vue-core.
Для Tab A — out of scope, фиксируем как «React-only feature set».

## upload-vue-feature-gaps

`packages/vue/src/components/ui/Upload.vue` (`SgUpload`) в целом
покрывает функциональность React, но есть несколько отличий:

1. **Нет `loading`** prop — у React `<Upload loading />` подменяет
   триггер на спиннер. В Vue этого нет.
2. **Нет публичного `onUpload(file: File[])`** — в Vue файлы
   обрабатываются внутри (`handleFiles`); вместо этого предлагается
   `customRequest({ file, onProgress, onSuccess, onError })`. Это
   архитектурный выбор Vue-версии, а не bug.

**Vue-supersets** (есть в Vue, нет в React):
- `drag` (drop-зона как триггер) и связанный handler.
- `listType="picture"` / `"picture-card"` layouts.
- `beforeUpload` хук с `boolean | Promise<boolean | File>`.
- `maxSize` (фильтр по байтам перед добавлением).
- `percent` рендерится inline в дефолтном списке (React оставляет это
  на потребителя).

**Где задело:**
- В Vue-стриме создано **9 демо** (parity по числу). React-вариант
  `Disabled / loading` ужат до `Disabled` (loading-row дропнут).
- `Basic.demo.vue` использует `customRequest` вместо отсутствующего
  `onUpload`-callback паттерна.
- В `upload-doc/{en,ru}` сняты `propLoading`, `propOnUpload`,
  `propChildren` (default slot — Vue-идиома, не нужен отдельный prop),
  `propClassName`, `propStyle`, `cssSgSpinColor`. Добавлены
  `propModelValue`, `propFileList`, `propDefaultFileList`,
  `propDrag`, `propListType`, `propShowUploadList`, `propMaxSize`,
  `propBeforeUpload`, `propCustomRequest`, `emit*`, `filePercent`,
  `fileType`, `fileUrl`, `fileError`, `fileRaw`.

**Решение:** parity-gap по `loading` — отметить, не лечить в Tab A.
По `onUpload` — оставить Vue-идиому с `customRequest` (это
сознательный выбор архитектуры, документировано в Vue-доке).

## transfer-vue-feature-gaps

`packages/vue/src/components/ui/Transfer.vue` (`SgTransfer`) — почти
паритет с React, но есть пропуски:

1. **Нет `render` prop** — нельзя задать кастомный лейбл строки
   (например, title + description второй строкой). Vue рендерит только
   `item.title`, `item.description` хранится в данных, но не
   отображается.
2. **Нет `listStyle`** prop — нельзя ограничить высоту списка
   (`listHeight`) через prop без CSS-токенов.
3. **Нет scoped slot для строки** — Vue-альтернатива React-овскому
   `render` тоже отсутствует.

**Где задело:**
- В Vue-стриме создано **7 демо**: дропнули React-овский
  `CustomRender.demo.tsx`. Вместо него добавлен `Unstyled.demo.vue`,
  чтобы соответствовать общей практике stream'а («у каждого data-entry
  компонента есть Unstyled-демо») и сохранить число demo (7 = 7).
- В `transfer-doc/{en,ru}` сняты `propRender`, `propListStyle`. В
  `pageWhen3` добавлено упоминание про gap для лейблов.

**Решение:** parity-gap. Для Wave 4 имеет смысл добавить scoped slot
`#item="{ item }"` (Vue-эквивалент `render`-prop) — это даст полный
паритет с React. Для Tab A — out of scope.
