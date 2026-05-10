# Findings — T-Vue-Demo-NavFeedback

> Append-only. Каждая запись — что нашли вне scope или что пропустили.
>
> Поток: Wave 3.2 / Tab C. Зона: 12 navigation + feedback компонентов
> (`tabs, menu, breadcrumb, dropdown, pagination, steps, segmented,
> modal, drawer, popconfirm, notification, configprovider`).

---

## menu-item-icon-no-vue

`packages/vue/src/components/ui/Menu.vue` (`SgMenu`) — `MenuItem` **не
имеет** поля `icon`. У React `MenuItem.icon: ReactNode` есть.

**Где задело:** `examples/demo-vue/src/demos/menu/WithIcons.demo.vue` —
**пропущен**. В `menu-doc/{en,ru}` нет `itemIcon`. `Collapsed.demo.vue`
переписан без иконок (только скрытие label).

**Решение:** API-gap. Не лечится в Tab C. Карточка
`T-Vue-Cleanup-2 → menu-item-rich-content`.

## breadcrumb-item-icon-no-vue

`packages/vue/src/components/ui/Breadcrumb.vue` (`SgBreadcrumb`) —
`BreadcrumbItem.title: string` only. Иконки и rich content — нет.

**Где задело:** `breadcrumb/WithIcons.demo.vue` — **пропущен**.

**Решение:** API-gap, в `T-Vue-Cleanup-2`.

## breadcrumb-item-dropdown-no-vue

`BreadcrumbItem` не интегрирован с `SgDropdown` (в React item-у можно
прокинуть `menu` для inline-dropdown).

**Где задело:** `breadcrumb/Dropdown.demo.vue` — **пропущен**.

**Решение:** API-gap, в `T-Vue-Cleanup-2`.

## dropdown-item-rich-no-vue

`packages/vue/src/components/ui/Dropdown.vue` (`SgDropdown`) —
`DropdownItem.label: string` only. У React `label: ReactNode`.

**Где задело:** `dropdown/RichItems.demo.vue` — **пропущен**.

**Решение:** API-gap. `T-Vue-Cleanup-2 → dropdown-item-rich`.

## steps-item-icon-no-vue

`packages/vue/src/components/ui/Steps.vue` (`SgSteps`) — `StepItem` не
имеет `icon` поля; `title` и `description` — `string` only.

**Где задело:** `steps/CustomIcon.demo.vue` — **пропущен**.

**Решение:** API-gap. `T-Vue-Cleanup-2 → steps-rich-content`.

## segmented-option-icon-no-vue

`packages/vue/src/components/ui/Segmented.vue` (`SgSegmented`) —
`SegmentedOption` не имеет `icon` поля.

**Где задело:** `segmented/WithIcons.demo.vue` — **пропущен**.

**Решение:** API-gap. `T-Vue-Cleanup-2 → segmented-option-icon`.

## notification-rich-content-no-vue

`packages/vue/src/components/ui/Notification.vue` —
`NotificationConfig.message: string`, `description: string` only.
React-аналог принимает `ReactNode`.

**Где задело:** `notification/RichContent.demo.vue` — упрощён до plain
text (одна `notification.open({ message, description })` без markup).

**Решение:** API-gap. `T-Vue-Cleanup-2 → notification-rich-content`.

## pagination-show-total-no-render-fn

`packages/vue/src/components/ui/Pagination.vue` —
`SgPagination.showTotal: boolean` only. React-аналог:
`boolean | (total, range) => ReactNode`.

**Где задело:** `pagination-doc/{en,ru}` явно фиксируют в `propShowTotal`
ограничение. `pagination/Basic.demo.vue` — `:show-total="true"`.

**Решение:** API-gap. `T-Vue-Cleanup-2 → pagination-show-total-render`.

## modal-no-classname-prop

`packages/vue/src/components/ui/Modal.vue` (`SgModal`) — нет `className`
prop. В Vue полагаемся на attribute fallthrough на root, но он попадает
не в overlay (тот teleport-ится в body), а в `<Teleport>`-обёртку — это
бесполезно.

**Где задело:** React `modal/TokensOverride.demo.tsx` использует
`<Modal className="purple-modal">` для скоупа CSS-vars. Vue-демо
переписан через body-class watcher (см. `decisions D-001`).

**Решение:** API-gap. `T-Vue-Cleanup-2 → modal-class-name-prop` (или
prop `wrapperClassName` / `dialogClassName`).

## drawer-no-classname-style-prop

То же самое для `SgDrawer.vue` — нет `className` / `style` props.

**Решение:** API-gap. `T-Vue-Cleanup-2 → drawer-class-name-prop`.

## modal-footer-prop-string-enum

`SgModal.footer: 'default' | 'none'` (string enum). React-аналог:
`footer?: ReactNode` — можно передать любой JSX. Vue использует
именованный slot `#footer` для кастомного содержимого.

**Где задело:** не блокирует, паттерн другой, но идиоматичный для Vue.
Документировано в `modal-doc/{en,ru}` (`propFooter` + `slotFooter`).

**Решение:** не fix, документация. Не finding в core.

## calendar-no-fullscreen-prop

`packages/vue/src/components/ui/Calendar.vue` — нет `fullscreen` prop.
React-аналог имеет (для compact / mini-варианта).

**Где задело:** `configprovider/Locale.demo.vue` —
`<SgCalendar />` без prop. Не визуально критично, но ограничивает
demo-сценарии.

**Решение:** API-gap. Подаю заявку в `T-Vue-Cleanup-2 → calendar-fullscreen`.

## breadcrumb-itemclick-emit-vs-react-onclick

React `BreadcrumbItem.onClick` — handler на конкретном элементе.
Vue эмитит `@itemClick(item, index)` с **родителя** `<SgBreadcrumb>`.

**Где задело:** `breadcrumb/OnClick.demo.vue` использует
`@item-click="onItemClick"`. Семантически эквивалентно (имеем индекс),
но не 1:1.

**Решение:** идиоматичный Vue-паттерн. Не finding, документировано.

## popconfirm-no-portal-not-bug

`packages/vue/src/components/ui/Popconfirm.vue` — рендерится **inline**
(без `<Teleport>`). React-аналог тоже без `createPortal`. Task-карта
говорит «Popconfirm — Vue Teleport вместо React Portal», но в реале
оба inline.

**Где задело:** `popconfirm/TokensOverride.demo.vue` — простой
inline-стайлинг через `<div :style="{ '--sg-...': ... }">`.

**Решение:** не fix. Документировано в `popconfirm-doc/{en,ru}`.

## notification-container-not-mounted-globally

В Vue `App.vue` нет глобального `<SgNotificationContainer>`. React
`App.tsx` монтирует все 4 placement-контейнера глобально.

**Где задело:** `NotificationDemo.vue` сам монтирует 3 контейнера
(`topRight`, `topLeft`, `bottomRight`); `notification/Unstyled.demo.vue`
монтирует 4-й (`bottomLeft` с `unstyled`).

**Решение:** правильная зона исправления — `App.vue` (вне Tab C).
Заявка в `T-Vue-Cleanup-2 → notification-app-mount`.

## gen-vue-demo-pascal-case-bug

`scripts/gen-vue-demo.mjs` обрабатывает имя без дефисов (`configprovider`)
буквально и генерит `ConfigproviderDemo.vue` — lowercase 'p' посередине.

**Где задело:** руками переименован в `ConfigProviderDemo.vue` после
генерации; идентификаторы в `configprovider-doc/{en,ru,useStrings}.ts`
поправлены (`Configprovider* → ConfigProvider*`).

**Решение:** API-gap. Карточка `T-Foundation-Cleanup → gen-vue-demo-pascal`
или explicit `--component-pascal-name` flag.

## modal-drawer-teleport-breaks-css-vars

Vue `<Teleport to="body">` ломает каскад `--sg-*` от ближайшей
обёртки демо.

**Где задело:** `modal/{TokensOverride,Unstyled}.demo.vue`,
`drawer/{TokensOverride,Unstyled}.demo.vue` используют body-class
watcher паттерн (см. `decisions D-001`). Решение — не идеальное, но
честно отражает production constraints.

**Решение:** не finding в core, это inherent поведение Teleport.
Удобный fix в core — пробросить `wrapperClass` или `dialogClass` props
(см. `modal-no-classname-prop` / `drawer-no-classname-style-prop`).
