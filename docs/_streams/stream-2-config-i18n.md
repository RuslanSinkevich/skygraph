# Stream 2 — Config & i18n (propagation + локали)

> Часть плана `demo-and-fixes-plan.md` (индекс). Один из 3 параллельных стримов. Зоны не пересекаются с S1/S3.

## Charter (правила исполнения)
1. **Не останавливаться** до конца стрима. Не спрашивать — все решения принимать самому.
2. **Не выходить за свою файловую зону** (ниже). Чужие зоны не трогать даже «по пути».
3. **Без субагентов.**
4. Definition of done: React и Vue собираются, typecheck зелёный, `disabled`/`locale` реально доходят до компонентов из репорта, 4 новых языка экспортируются.

## Ветка
`stream/config-i18n`

## Файловая зона (эксклюзивно)
- `packages/react/src/components/ui/**` и `packages/vue/src/components/ui/**` (**не Table** — это S1)
- `packages/{react,vue}/src/components/complex/Form/**` (Field)
- `packages/{react,vue}/src/locales/**`
- `packages/{react,vue}/src/index.ts` и `packages/{react,vue}/src/locales/index.ts` — **только строки экспорта пресетов**

Table (`components/complex/Table`) — зона S1. `examples/` — зона S3.

## Предусловие
`packages/` должна быть на диске. Если нет — восстановить: `git restore packages`.

## Порядок внутри стрима
Сначала B1–B3 (зафиксировать, какие locale-ключи реально потребляются), затем C1–C2 (добавить эти ключи в пресеты). Так не придётся дважды править пресеты.

---

## B1. Vue: `disabled` не доходит до большинства компонентов
- **Репорт:** `/vue/#/guide/config-provider~disabled` — сработали не все компоненты.
- **Корень:** `useConfigWithDefaults` применён выборочно (~10 из 40+). Не wired: `Select, Checkbox, Switch, Radio, Input, Textarea, InputNumber, Slider, DatePicker, Upload, Rate, ColorPicker, AutoComplete, Cascader`.
- **Фикс:** в каждом подключить `useConfigWithDefaults` и резолвить `disabled = props.disabled ?? resolvedDisabled`.

## B2. React: locale покрывает не всё
- **Репорт:** `/react/#/guide/config-provider` — переводится не всё.
- **Корень:** `DataGrid, List, Transfer, Tree, TimePicker, PinInput, ColorPicker` не читают `ConfigProvider.locale` (только prop/хардкод). React `en_US` беднее Vue по ключам (см. C1).
- **Фикс:** подключить к `useConfig().locale.*` с fallback. (React Table — в S1/A5, сюда НЕ лезть.)

## B3. Vue: Field markers захардкожены
- **Корень:** `Field.vue` рисует `*` хардкодом, не читает `locale.form.required/optional`. React это делает.
- **Фикс:** выровнять Vue по React.

---

## C1. Выровнять существующие 6 языков по единому набору ключей
- React `en_US` (~175 строк) беднее Vue (~201): нет `table, dataGrid, list, tree, diagram, colorPicker, pinInput` и расширений `inputPassword/searchInput/tagInput/inlineEdit/calendar/cascader`.
- Привести en/ru/zh/de/fr/es к единому суперсету ключей в обоих фреймворках. Набор ключей определяется тем, что реально потребляют компоненты (B1–B3 + S1/A5).

## C2. Добавить языки Tier 1: `ja_JP`, `ko_KR`, `pt_BR`, `it_IT`
- Для каждого: файл в `packages/react/src/locales/` и `packages/vue/src/locales/` (Vue = суперсет ключей), экспорт в `locales/index.ts` и `index.ts` пакета.
- Angular-зеркало (`packages/angular/src/lib/locales/`) — опционально (вне основной зоны; если трогать — только locales angular).
- Функции-ключи (`removeTag`, `star`, `slide`, `totalRows`, ...) — сохранять сигнатуры.

---

## Для релиза (передать в E)
Записать в CHANGELOG (делает стрим E после мержа):
- Vue: `ConfigProvider disabled` теперь доходит до всех интерактивных контролов.
- React: `ConfigProvider locale` подключён к DataGrid/List/Transfer/Tree/TimePicker/PinInput/ColorPicker.
- Vue `Field`: маркеры required/optional берутся из locale.
- Локали: выровнен набор ключей; добавлены `ja_JP`, `ko_KR`, `pt_BR`, `it_IT`.
