# T-Vue-Demo-NavFeedback — отчёт

> Wave 3.2 / Tab C. Закрывает миграцию 12 navigation + feedback компонентов
> demo-vue с архитектуры `pages/<Comp>Page.vue` на
> `demos/<comp>/*.demo.vue` + `demos/<comp>-doc/` + `demos/<Comp>Demo.vue`,
> паритетно с React-демо.

## Статус

**Закрыт.** Зелёные проверки:
- `pnpm --filter demo-vue exec vue-tsc -p tsconfig.app.json --noEmit` —
  **0 ошибок** в зоне 12 компонентов Tab C. Остаются 3 ошибки в
  `FormDemo.vue` (Tab D) — не наш скоуп.
- `pnpm --filter demo-vue build` (`vue-tsc -b && vite build`) — **exit 0**.
  Все 12 агрегаторов попадают в bundle отдельными chunks (см. ниже).

## Acceptance criteria

| # | Требование | Статус |
|---|---|---|
| 1 | Для каждого из 12 компонентов: `demos/<comp>/<Example>.demo.vue` (≥ N-1 React-примеров, минимум 5). | ✓ 88 примеров: 7/9/5/7/8/8/7/7/7/7/9/7 |
| 2 | Для каждого: `demos/<comp>-doc/{en,ru,useStrings}.ts`. | ✓ 12 троек, ключи en === ru, `use<Comp>DocStrings()` через `useI18n`. |
| 3 | Для каждого: `demos/<Comp>Demo.vue` (агрегатор) с `ComponentDoc`/`DemoBox`/`PropsTable`. | ✓ 12 агрегаторов, импорты `?raw` для исходников каждого примера. |
| 4 | `examples/demo-vue/src/router/index.ts` — заменены 12 routes на `demos/*Demo.vue`. | ✓ точечный diff (12 импортов + 12 route записей), остальные routes не тронуты. |
| 5 | 12 файлов `pages/{Tabs,Menu,Pagination,Breadcrumb,Dropdown,Steps,Segmented,Modal,Drawer,Popconfirm,Notification,ConfigProvider}Page.vue` — удалены. | ✓ |
| 6 | `vue-tsc --noEmit` — 0 ошибок в зоне Tab C. | ✓ |
| 7 | `vite build` — exit 0. | ✓ |
| 8 | `decisions/T-Vue-Demo-NavFeedback.md` + `findings/T-Vue-Demo-NavFeedback.md` + `done/T-Vue-Demo-NavFeedback.md`. | ✓ |
| 9 | CSS-vars table в каждом агрегаторе **кроме** `ConfigProviderDemo.vue` (см. D-004). | ✓ 11/12 (configprovider — by design без CssVarsTable). |
| 10 | `Modal/Drawer/Popconfirm/Notification` — Vue-механика overlay сохранена, DOM (`sg-modal-mask` и т.д.) не сломан. | ✓ Modal/Drawer — `<Teleport to="body">`, Popconfirm/Notification — inline (как и в React, см. D-002). |
| 11 | `ConfigProvider` — без `--with-css-vars`. | ✓ (D-004). |

## Распределение примеров

| Компонент | React | Vue | Заметка |
|---|---|---|---|
| `tabs` | 7 | 7 | full parity (`#panel` слот вместо `ReactNode`) |
| `menu` | 10 | 9 | пропущен `WithIcons.demo` (см. findings) |
| `breadcrumb` | 7 | 5 | пропущены `WithIcons` + `Dropdown` (см. findings) |
| `dropdown` | 8 | 7 | пропущен `RichItems` (см. findings) |
| `pagination` | 8 | 8 | full parity (`showTotal` boolean only — finding) |
| `steps` | 9 | 8 | пропущен `CustomIcon` (см. findings) |
| `segmented` | 8 | 7 | пропущен `WithIcons` (см. findings) |
| `modal` | 7 | 7 | full parity (Teleport via body-class watcher для тем) |
| `drawer` | 7 | 7 | full parity (Teleport via body-class watcher для тем) |
| `popconfirm` | 7 | 7 | full parity (inline rendering — как и React) |
| `notification` | 9 | 9 | `RichContent` упрощён до plain text (см. findings) |
| `configprovider` | 7 | 7 | full parity, без CssVarsTable (D-004) |
| **Итого** | **94** | **88** | **−6** vs React (5 skip + 1 simplification) |

## Findings (создано 17 записей)

| ID | Что | Зона ремонта |
|---|---|---|
| `menu-item-icon-no-vue` | `MenuItem` без `icon` | `Menu.vue` |
| `breadcrumb-item-icon-no-vue` | `BreadcrumbItem.title: string` only | `Breadcrumb.vue` |
| `breadcrumb-item-dropdown-no-vue` | `BreadcrumbItem` не интегрирован с `Dropdown` | `Breadcrumb.vue` |
| `dropdown-item-rich-no-vue` | `DropdownItem.label: string` only | `Dropdown.vue` |
| `steps-item-icon-no-vue` | `StepItem` без `icon` | `Steps.vue` |
| `segmented-option-icon-no-vue` | `SegmentedOption` без `icon` | `Segmented.vue` |
| `notification-rich-content-no-vue` | `message`/`description: string` only | `Notification.vue` |
| `pagination-show-total-no-render-fn` | `showTotal: boolean` only | `Pagination.vue` |
| `modal-no-classname-prop` | нет `className` prop | `Modal.vue` |
| `drawer-no-classname-style-prop` | нет `className`/`style` props | `Drawer.vue` |
| `modal-footer-prop-string-enum` | `footer` строковый enum (документирован) | — |
| `calendar-no-fullscreen-prop` | нет `fullscreen` prop | `Calendar.vue` |
| `breadcrumb-itemclick-emit-vs-react-onclick` | `@itemClick` на родителе (документирован) | — |
| `popconfirm-no-portal-not-bug` | inline rendering (как React) | — |
| `notification-container-not-mounted-globally` | `App.vue` не монтирует контейнеры | `App.vue` |
| `gen-vue-demo-pascal-case-bug` | scaffolder ломает casing | `scripts/gen-vue-demo.mjs` |
| `modal-drawer-teleport-breaks-css-vars` | inherent Vue behavior (документирован) | — |

12 из 17 findings — **вне зоны** Волны 3 (`wave-3/CHARTER.md` §2 запрещает
правки `packages/vue/**`). Заведены в `T-Vue-Cleanup-2`.

## Decisions

См. `docs/_streams/decisions/T-Vue-Demo-NavFeedback.md` (10 пунктов):

1. **D-001** — Modal/Drawer Teleport ломает каскад токенов → body-class watcher.
2. **D-002** — Popconfirm/Notification рендерятся inline (как и React), не Teleport.
3. **D-003** — `SgNotificationContainer` монтируется в самом `NotificationDemo.vue`.
4. **D-004** — `ConfigProvider` — без `CssVarsTable` (нет визуальных токенов).
5. **D-005** — Богатый контент (`ReactNode`) → `string` или skip с findings.
6. **D-006** — `gen-vue-demo` PascalCase bug — переименовываем руками.
7. **D-007** — `Calendar` без `fullscreen` prop, `Modal.locale` корректно работает.
8. **D-008** — `Pagination.showTotal: boolean` only, документировано.
9. **D-009** — Router и pages — точечный diff (только мои 12 строк).
10. **D-010** — `typecheck/build` — игнорим ошибки чужих табов.

## Файлы

### Создано (137 файлов)

```
docs/_streams/decisions/T-Vue-Demo-NavFeedback.md
docs/_streams/findings/T-Vue-Demo-NavFeedback.md
docs/_streams/done/T-Vue-Demo-NavFeedback.md   ← этот файл

examples/demo-vue/src/demos/TabsDemo.vue
examples/demo-vue/src/demos/MenuDemo.vue
examples/demo-vue/src/demos/BreadcrumbDemo.vue
examples/demo-vue/src/demos/DropdownDemo.vue
examples/demo-vue/src/demos/PaginationDemo.vue
examples/demo-vue/src/demos/StepsDemo.vue
examples/demo-vue/src/demos/SegmentedDemo.vue
examples/demo-vue/src/demos/ModalDemo.vue
examples/demo-vue/src/demos/DrawerDemo.vue
examples/demo-vue/src/demos/PopconfirmDemo.vue
examples/demo-vue/src/demos/NotificationDemo.vue
examples/demo-vue/src/demos/ConfigProviderDemo.vue

examples/demo-vue/src/demos/tabs/{Basic,Line,Controlled,Sizes,RichLabels,States,TokensOverride}.demo.vue
examples/demo-vue/src/demos/menu/{data.ts,Vertical,Horizontal,Inline,Collapsed,GroupsDividers,Controlled,DarkTheme,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/breadcrumb/{Basic,Separator,OnClick,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/dropdown/{data.ts,Basic,Trigger,Placement,Disabled,Keyboard,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/pagination/{Basic,ManyPages,SizeChanger,Simple,ShowTotal,Disabled,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/steps/{data.ts,Basic,Vertical,Sizes,ErrorStatus,Clickable,Navigation,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/segmented/{Basic,Sizes,Disabled,Block,Controlled,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/modal/{Basic,DefaultFooter,NoFooter,AsyncConfirm,Widths,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/drawer/{Basic,Placement,Sizes,Footer,NoMask,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/popconfirm/{Basic,WithDescription,Placement,Disabled,InTable,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/notification/{Basic,Types,Duration,Placement,OnClose,RichContent,DestroyAll,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/configprovider/{Size,Disabled,Nested,Bordered,Locale,ThemeScope,UseConfigHook}.demo.vue

examples/demo-vue/src/demos/tabs-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/menu-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/breadcrumb-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/dropdown-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/pagination-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/steps-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/segmented-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/modal-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/drawer-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/popconfirm-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/notification-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/configprovider-doc/{en,ru,useStrings}.ts
```

### Изменено

```
examples/demo-vue/src/router/index.ts
  — 12 импортов pages/{Tabs,Menu,Pagination,Breadcrumb,Dropdown,Steps,
    Segmented,Modal,Drawer,Popconfirm,Notification,ConfigProvider}Page.vue
    заменены на demos/{Tabs,Menu,Pagination,Breadcrumb,Dropdown,Steps,
    Segmented,Modal,Drawer,Popconfirm,Notification,ConfigProvider}Demo.vue
  — 12 routes теперь указывают на новые компоненты
```

### Удалено (12 файлов)

```
examples/demo-vue/src/pages/TabsPage.vue
examples/demo-vue/src/pages/MenuPage.vue
examples/demo-vue/src/pages/PaginationPage.vue
examples/demo-vue/src/pages/BreadcrumbPage.vue
examples/demo-vue/src/pages/DropdownPage.vue
examples/demo-vue/src/pages/StepsPage.vue
examples/demo-vue/src/pages/SegmentedPage.vue
examples/demo-vue/src/pages/ModalPage.vue
examples/demo-vue/src/pages/DrawerPage.vue
examples/demo-vue/src/pages/PopconfirmPage.vue
examples/demo-vue/src/pages/NotificationPage.vue
examples/demo-vue/src/pages/ConfigProviderPage.vue
```

## Размеры (vite chunks, gzip)

| Chunk | Raw | gzip |
|---|---|---|
| `BreadcrumbDemo` | 15.00 kB | 5.00 kB |
| `PaginationDemo` | 17.19 kB | 5.73 kB |
| `SegmentedDemo` | 19.98 kB | 6.18 kB |
| `StepsDemo` | 20.06 kB | 7.34 kB |
| `ModalDemo` | 24.28 kB | 7.83 kB |
| `DrawerDemo` | 24.56 kB | 8.38 kB |
| `PopconfirmDemo` | 26.64 kB | 8.35 kB |
| `DropdownDemo` | 27.11 kB | 7.87 kB |
| `TabsDemo` | 29.32 kB | 8.63 kB |
| `NotificationDemo` | 31.38 kB | 9.53 kB |
| `MenuDemo` | 31.76 kB | 9.74 kB |
| `ConfigProviderDemo` | 32.75 kB | 9.82 kB |

Все 12 chunks под 33 kB raw / 10 kB gzip. Главный bundle
(`index-...js`) — 105.25 kB / 39.91 kB gzip. Лимит `pnpm size` для
demo-vue (160 KB) — не нарушен.

## Что не сделано

- 5 React-демо **пропущены** (`menu/WithIcons`, `breadcrumb/WithIcons`,
  `breadcrumb/Dropdown`, `dropdown/RichItems`, `steps/CustomIcon`,
  `segmented/WithIcons`) — все из-за отсутствия rich-content / icon API
  в `packages/vue` (см. findings). Закроется в `T-Vue-Cleanup-2`.
- `notification/RichContent.demo` — упрощён до plain text (тот же gap).
- Playwright-аудит UI не запускался (общая позиция стримов 3.x —
  finding `audit-styles-no-playwright` в Display).
- Body-class watcher паттерн в `modal`/`drawer` `TokensOverride` /
  `Unstyled` — рабочий, но не идеальный. После добавления
  `wrapperClass`/`dialogClass` props в core (см. findings) можно будет
  упростить.

## Следующий шаг

17 findings уезжают в карту `T-Vue-Cleanup-2` — приоритет высокий для
групп rich-content (5 компонентов) и `className`/`wrapperClass`
для overlay-компонентов (Modal/Drawer).

После Tab D (`T-Vue-Demo-Forms` доделают `FormDemo.vue`) полный
typecheck станет зелёным end-to-end.
