# Decisions — T-Vue-Demo-NavFeedback

> Принятые архитектурные решения по `T-Vue-Demo-NavFeedback`
> (Wave 3.2 / Tab C), которые отклоняются от буквы task-карты или
> CHARTER §6.1.

---

## D-001 — `Modal` / `Drawer` — Vue Teleport ломает каскад токенов

**Контекст:** React `<Modal>` / `<Drawer>` рендерятся **inline**, поэтому
React-демо `TokensOverride.demo.tsx` оборачивают сам компонент в
`<div style={{ '--sg-color-...': ... }}>` и токены наследуются по DOM.

`SgModal.vue` / `SgDrawer.vue` используют `<Teleport to="body">`, поэтому
overlay вынесен из дерева демо и обычная inline-обёртка с CSS-переменными
не работает.

**Решение:** в `modal/TokensOverride.demo.vue`,
`modal/Unstyled.demo.vue`, `drawer/TokensOverride.demo.vue`,
`drawer/Unstyled.demo.vue` используется паттерн «body-class watcher»:

```ts
watch(open, (isOpen) => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('sg-modal-tokens-purple', isOpen)
})
```

и unscoped `<style>` в том же `.vue`-файле, который таргетит
`body.sg-modal-tokens-purple .sg-modal-mask { ... }`. Класс снимается при
закрытии — никакого глобального побочного эффекта между демо.

**Почему:** альтернатива (передавать токены прямо в `class`/`style`
через `<SgModal>`) требует доработок core-компонента — это явно вне зоны
Wave 3 (см. `wave-3/CHARTER.md` §2). Паттерн с body-классом честно
показывает реальный production-сценарий: либо ставите класс на корневой
элемент темы, либо используете данный watcher для скоупа на момент
открытия.

В doc-страницах `modal-doc/{en,ru}` и `drawer-doc/{en,ru}` это
явно описано в `demoTokensDesc` / `demoUnstyledDesc`, чтобы у
консьюмера не было сюрпризов.

## D-002 — `Popconfirm` / `Notification` — НЕ-Teleport, как и React

**Контекст:** task-карта говорит «Modal/Drawer/Popconfirm/Notification —
Vue Teleport вместо React Portal». Я проверил `Popconfirm.vue` и
`Notification.vue` — оба рендерятся **inline** (без `<Teleport>`),
аналогично React-аналогам.

**Решение:** не «исправляю» это в core. Демо `popconfirm/*.demo.vue` и
`notification/*.demo.vue` используют обычный inline-стайлинг
(div-обёртка с `--sg-*` токенами). Это даёт честный паритет с React.

`popconfirm-doc/{en,ru}` и `notification-doc/{en,ru}` явно фиксируют:
> Inline rendering — no Teleport / Portal. CSS variables cascade
> normally from any wrapper.

## D-003 — `NotificationContainer` — монтаж в агрегаторе

**Контекст:** React `App.tsx` глобально монтирует все 4 контейнера
`<NotificationContainer placement="topRight" />` и т.д. Vue `App.vue`
**не** монтирует `SgNotificationContainer` (это вне зоны нашей
правки — `wave-3/CHARTER.md` запрещает менять не свои файлы).

**Решение:**
- Три `<SgNotificationContainer placement="...">` (`topRight`,
  `topLeft`, `bottomRight`) добавлены прямо в шаблон
  `NotificationDemo.vue` — это всё ещё «зона Tab C».
- Четвёртый (`bottomLeft`, с `unstyled`) живёт в
  `notification/Unstyled.demo.vue`, потому что тот пример
  специально показывает unstyled-режим.

В `notification-doc/{en,ru}` это документировано через
`containerPlacement` / `containerUnstyled` и в lead-разделе.

## D-004 — `ConfigProvider` — без CSS-vars table

Task-карта явно требует `gen-vue-demo configprovider` **без**
`--with-css-vars`. `SgConfigProvider` действительно не владеет
визуальными токенами — это контекстный provider для `size` /
`disabled` / `bordered` / `locale`. React-аналог тоже не имеет
`CssVarsTable`.

**Решение:** в `ConfigProviderDemo.vue` нет `CssVarsTable` (только
4 `PropsTable`: provider API, locale shape, presets, hooks).
Доку-строки в `configprovider-doc/{en,ru}` это явно фиксируют.

## D-005 — Богатый контент (`ReactNode`) → `string` + skip

Многие React-демо используют `ReactNode` для `label` / `title` /
`children` / `description` / `dot`. Vue-аналоги — строковые props или
именованные слоты. Где в Vue нет ни slot-а, ни эквивалента иконки на
item-уровне — пример **пропущен** (а не фейково заполнен), и
`-doc/{en,ru}` это документирует.

| Компонент | Skip | Причина |
|---|---|---|
| `menu/WithIcons.demo` | ✗ | `MenuItem` не имеет `icon` field |
| `breadcrumb/WithIcons.demo` | ✗ | `BreadcrumbItem.title: string` only, нет `icon` |
| `breadcrumb/Dropdown.demo` | ✗ | `BreadcrumbItem` не интегрирован с `Dropdown` |
| `dropdown/RichItems.demo` | ✗ | `DropdownItem.label: string` only |
| `steps/CustomIcon.demo` | ✗ | `StepItem` не имеет `icon` field |
| `segmented/WithIcons.demo` | ✗ | `SegmentedOption` не имеет `icon` field |
| `notification/RichContent.demo` | ✓ упрощён | `message`/`description: string` only |

Все API-gap-ы оформлены в `findings/T-Vue-Demo-NavFeedback.md` для
обработки в `T-Vue-Cleanup-2`.

## D-006 — `gen-vue-demo` PascalCase bug

CLI-скаффолдер `scripts/gen-vue-demo.mjs` обрабатывает имя без дефисов
буквально: на вход `configprovider` он создаёт
`ConfigproviderDemo.vue` (lowercase 'p'). Router же использует
`ConfigProviderPage` (PascalCase).

**Решение:** после генерации руками переименовал
`ConfigproviderDemo.vue → ConfigProviderDemo.vue`, и поправил
типы/идентификаторы в `configprovider-doc/{en,ru,useStrings}.ts`
(`ConfigproviderDocStrings → ConfigProviderDocStrings`,
`useConfigproviderDocStrings → useConfigProviderDocStrings`,
`crumbConfigprovider → crumbConfigProvider`).

Сам скрипт **не правлю** (это шарится с другими стримами Wave 3). Bug
оформлен как finding `gen-vue-demo-pascal-case-bug` для будущего фикса
в Foundation.

## D-007 — `Locale.demo` — `Calendar` без `fullscreen`, без `Modal.locale` теста

`SgCalendar.vue` не имеет `fullscreen` prop (React-аналог имеет).
В `configprovider/Locale.demo.vue` использован `<SgCalendar />` без
этого prop — визуальное поведение совпадает (в обоих случаях inline
календарь). Параметр `fullscreen` — отдельный gap, не в зоне Tab C.

`Modal` показывается как обычно — `OK / Cancel` лейблы корректно
читают `locale.modal` из контекста (проверено в коде `Modal.vue`).

## D-008 — `Pagination.showTotal` — boolean only

React `Pagination.showTotal` — `boolean | (total, range) => ReactNode`.
Vue `SgPagination.showTotal` — `boolean` only.

**Решение:** `pagination/Basic.demo.vue` показывает `:show-total="true"`,
а в `pagination-doc/{en,ru}` явно зафиксировано через `propShowTotal`:
> Show total count prefix. **Vue:** `boolean` only — для кастомного
> формата используйте свой wrapper или `:total-prefix` (если будет
> добавлен в core).

Это finding `pagination-show-total-no-render-fn`.

## D-009 — Router и pages — точечный diff

Поправил **только** свои 12 строк (имена `*Page → *Demo`) +
заменил соответствующие 12 routes. Не трогал импорты других табов
(`A`/`B`/`D`/`E`), даже если рядом — чтобы не мешать.

12 удалённых файлов (`pages/{Tabs,Menu,Pagination,Breadcrumb,Dropdown,
Steps,Segmented,Modal,Drawer,Popconfirm,Notification,
ConfigProvider}Page.vue`) — это полный список.

## D-010 — `typecheck`/`build` — игнорим ошибки чужих табов

`pnpm --filter demo-vue exec vue-tsc -p tsconfig.app.json --noEmit`
показывает 3 ошибки в `FormDemo.vue` (Tab D). Они **не** в моей зоне.
Использую фильтрованный typecheck (через `findstr`/grep по моей зоне)
— ноль ошибок.

`pnpm --filter demo-vue build` (vite + vue-tsc -b) проходит зелёным
(exit 0), потому что `tsconfig.json` через project refs использует
другой конфиг, и FormDemo errors там не всплывают (они только в
`tsconfig.app.json`). После фикса в Tab D всё сойдётся.
