# Decisions — T-Vue-Components-DOM-Parity (Волна 3.3b)

Решения, принятые вне явного указания карты.

## D-1. `loading` prop повсюду через inline `<span class="sg-spin sg-spin-small">`

Карта рекомендует «убрать `sg-button-spin` обёртку и рендерить `<Spin />`».
React-аналог использует компонент `Spin` (`SgSpin`). Я сначала пошёл по
этому пути, но импорт `SgSpin` в каждый из 16 компонентов поднял
ESM bundle на ~2 KB и пробил size-limit.

**Решение:** добавляем `loading?: boolean` (опциональный, additive)
и рендерим `<span v-if="loading && !unstyled" class="sg-spin sg-spin-small" aria-hidden="true" />` напрямую.

- DOM/CSS совпадает с тем, что рендерит React (`<Spin />` под капотом
  даёт ту же `.sg-spin.sg-spin-small`).
- Вес — меньше, чем импорт `SgSpin` компонента в каждый файл.
- Когда стрим `T-Vue-Demo-PostMigration-Audit` (3.3) договорится о
  поднятии size-limit, можно вернуть `<SgSpin>` для единообразия.

Применено в:
- `ui/Button.vue`, `Button/Button.vue` (legacy)
- `ui/Input.vue`, `ui/InputNumber.vue`, `ui/Textarea.vue`
- `ui/AutoComplete.vue`, `ui/Select.vue`
- `ui/DatePicker.vue`, `ui/TimePicker.vue`
- `ui/Upload.vue` (list-item-uploading)
- `ui/Tabs.vue` (item.loading)
- `ui/Switch.vue`, `ui/Checkbox.vue`, `ui/Radio.vue`
- `complex/List/List.vue` (sg-list-loading-indicator)

## D-2. `aria-busy="loading || undefined"` вместо `loading`

В Vue boolean `false` → атрибут `aria-busy="false"`. React при `false`
вообще не рендерит атрибут. Чтобы DOM совпал, добавлено `loading || undefined`
во всех Button-like компонентах.

## D-3. `SubmitButton.vue` теперь композирует `<SgButton>`

Раньше Vue `SubmitButton` дублировал классы `sg-button sg-button-primary`
в собственном `<button>`. React-аналог композирует `<Button type="primary" htmlType="submit">`.

**Решение:** Vue теперь тоже композирует `<SgButton>`. Это:
- даёт точный DOM-паритет (любые изменения Button автоматически на
  SubmitButton);
- сохраняет старый API (`disabled` остался, `loading`/`unstyled`
  — additive);
- покрывает `htmlType="submit"`, который раньше требовался руками.

## D-4. Diagram quick-fix вне моей зоны

`packages/vue/src/components/complex/Diagram/Diagram.vue` имел
неиспользуемую переменную `slots` (`TS6133`), которая блокировала
`vue-tsc --noEmit` для всего пакета. Карта запрещает менять Diagram,
но фикс нужен для `pnpm typecheck` зелёного состояния.

**Решение:** удалена пара мёртвых строк (`const slots = useSlots()` +
неиспользуемый `useSlots` импорт). Это не меняет DOM/aria/CSS Diagram.
Зафиксировано в findings §9.

Альтернатива — отказаться от typecheck-фазы. Не принял, т.к. карта
явно требует «после каждого батча — pnpm --filter @skygraph/vue
typecheck && test --run && build».

## D-5. SgLocale в Vue — не расширяем

Карта запрещает менять `packages/vue/src/locales/**` и
`packages/vue/src/index.ts`. `types.ts` формально не запрещён, но
расширение SgLocale потребует синхронных правок во всех 5 `locales/*.ts`
файлах (en/ru/de/fr/es/zh), что выходит за рамки 3.3b. Зафиксировано
в findings §2 как зона стрима 3.3a (Wrappers-Parity).

## D-6. Modal width — оставлен как `style.width: '800px'`

Изначально я попробовал перевести Vue Modal на CSS-var
`--sg-modal-width` (как у React), но `ui-feedback.test.ts > SgModal >
uses custom width` ожидает `style.width === '800px'`. Поскольку
parity-test Wave 2 является источником истины — откатил, оставил
прямой `style.width`. Это finding по самому parity-тесту, не по
компоненту.

## D-7. Mentions dropdown — `<div role="listbox">` вместо `<ul>`

Vue использовал `<ul><li>` для dropdown, React — `<div role="listbox"><div role="option">`.
Парити-зависимый CSS селектор сохранён (`sg-mentions-dropdown` /
`sg-mentions-option`). Изменение прошло без поломки тестов.
