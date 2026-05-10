# T-Showcases-I18n — done

## Итог

Локализованы все 12 SkyGraph Showcases на en + ru. Хардкод user-facing
строк убран из `examples/showcases/src/showcases/**/*.tsx`. Юникод-символы
(`✓ ✕ → × ⌕ ◉ ✎`), CSS-классы, ARIA-роли и dataset-ключи не
локализованы (см. CHARTER §10).

Sanity-check (зелёные):

```
pnpm --filter showcases exec tsc -b
pnpm --filter showcases build
```

## Архитектура

### Расширение типа

`ShowcasesLocale` расширен полем `apps`, где каждое из 12 апп получило
собственный интерфейс локали:

```ts
export interface ShowcasesLocale {
  // hub fields …
  apps: {
    chat: ChatLocale
    inbox: InboxLocale
    helpdesk: HelpdeskLocale
    dashboard: DashboardLocale
    fileManager: FileManagerLocale
    workflowEditor: WorkflowEditorLocale
    forms: FormsLocale
    hrPortal: HrPortalLocale
    admin: AdminLocale
    crm: CrmLocale
    ecommerce: EcommerceLocale
    tableKitchenSink: TableKitchenSinkLocale
  }
}
```

### Доставка локали в апп

В `examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx`
заведён лёгкий React-контекст:

- `ShowcaseLocaleProvider` — монтируется один раз в `ShowcasesViews`
  поверх lazy-загруженных апп.
- `useShowcaseLocale()` — полный объект `ShowcasesLocale` (нужен для
  hub-страницы / language switcher).
- `useAppLocale('admin')` — типобезопасный slice нужного апп.

Контекст лучше пробрасывания пропсами для lazy-апп: иначе пришлось бы
дублировать «спустить локаль вниз» на каждом уровне табов / модалок.

Decision Protocol §6: **React Context** выбран (а не пропсы) — chain of
custody уже размыт `React.lazy`, проп-пробрасывание дало бы N-кратное
дублирование.

### Маппинг enum-значений

Где у апп есть enum-поля (status / priority / stage / activity-type),
введены отдельные словари-карты, например:

- `statusLabel: { active: 'Active', 'on-leave': 'On leave', ... }`
- `priorityLabel: { p0: 'Critical', p1: 'High', ... }`
- `stageLabel: { lead: 'Lead', proposal: 'Proposal', ... }`

Это позволяет рендерить тег с локализованной подписью, сохраняя
технический ключ для бизнес-логики.

### Внутренняя локаль `<Table>`

Для `table-kitchen-sink` интерфейс `TableKitchenSinkLocale` расширен
вложенным объектом `tableLocale`, по форме совпадающим с публичным
`TableLocale` из `@skygraph/react`. Хелпер
`makeTableLocale(loc)` в `common.tsx` тип-безопасно конвертирует его
обратно в `TableLocale`. Все 7 табов передают результат в `<Table
locale={…} />`, поэтому встроенный поиск/фильтр-меню/empty-state и
плотность тоже локализованы.

## Структура ключей по апп

```
apps
├─ chat
│  ├─ title, lead, search, channels, online, away
│  ├─ messageInput { placeholder, send }
│  └─ toasts { sent, attached }
├─ inbox
│  ├─ title, lead, filters[]
│  ├─ list { unread, today, yesterday, older }
│  └─ details { reply, archive, delete, markUnread }
├─ helpdesk
│  ├─ title, lead, columns { ticket, customer, agent, priority, status, updated }
│  ├─ statusLabel, priorityLabel
│  ├─ filters { status, priority, agent, search }
│  └─ actions { assign, escalate, resolve, reopen }
├─ dashboard
│  ├─ title, lead, periodOptions, stats { revenue, customers, orders, conversion }
│  └─ charts { revenueByMonth, topProducts, regions }
├─ fileManager
│  ├─ title, lead, toolbar { newFolder, upload, download, delete, view }
│  ├─ columns { name, size, modified, type }
│  └─ contextMenu { open, rename, share, copy, move, delete }
├─ workflowEditor
│  ├─ paletteTitle, paletteHint, statsTitle, nodesLabel, edgesLabel
│  ├─ kindLabel { start, task, decision, end }
│  ├─ routing { straight, orthogonal }
│  ├─ selection { single, multi, lasso }
│  ├─ inspector { title, id, kind, position, outgoing, incoming, label, apply, delete, deleteConfirm, selectNode }
│  ├─ nodeActions { rename, duplicate, delete }
│  ├─ edgeActions { remove }
│  ├─ contextMenu { rename, duplicate, delete, addNode, addEdge }
│  ├─ modals { addTitle, edgeTitle, labelField, kindField, fromField, toField, edgeLabel, ... }
│  └─ toasts { renamed, addedNode, deletedNode, duplicated, connected, removedEdge, bulkRemoved, reset, ... }
├─ forms
│  ├─ tabs { basic, validation, layouts, dynamic, schema }
│  ├─ basic { fields, placeholders, submit, reset, toasts }
│  ├─ validation { fields, rules, submit, toasts }
│  ├─ layouts { variantOptions, fields }
│  ├─ dynamic { addRow, removeRow, fields }
│  └─ schema { steps[], fields, submit, toasts }
├─ hrPortal
│  ├─ tabs { directory, org, leave, teamAssign, onboarding, reviews }
│  ├─ stats { headcount, openRoles, leaveToday, satisfaction }
│  ├─ statusLabel { active, 'on-leave', remote, terminated }
│  ├─ directory { columns, viewOptions, search }
│  ├─ org { departmentSizes }
│  ├─ leave { conflicts, columns, filters, types, actions, toasts }
│  ├─ teamAssign { heading, transferTitles, assignedTag }
│  ├─ onboarding { steps, panels, fields, equipment, toasts }
│  └─ reviews { aggregate, drawer { period, reviewer, overall, score, breakdown, goals, highlights, improvements }, actions }
├─ admin
│  ├─ tabs { users, roles, audit, sessions, apiKeys, settings }
│  ├─ stats { users, mfa, audit, apiKeys }
│  ├─ users { columns, viewBtn, drawer, modal, bulkActions, toasts }
│  ├─ roles { newRole, modal, save, cancel, permissions, users }
│  ├─ audit { severity, exportBtn, columns, expanded }
│  ├─ sessions { columns, current, terminate, terminateOthers }
│  ├─ apiKeys { columns { rateTitle, rate(n) }, create, modal, toasts }
│  └─ settings { categories, toast }
├─ crm
│  ├─ tabs { leads, contacts, deals, pipeline, activity, hierarchy, deadlines }
│  ├─ stats { leads, customers, deals, pipeline }
│  ├─ statusLabel, stageLabel, activityTypeLabel
│  ├─ leads { card, columns, viewBtn, modal, toasts, filterOptions }
│  ├─ customers { search, viewBtn, columns, statusTags, summary, modal }
│  ├─ contacts { columns, drawer { labels, openDeals, activity, timeline } }
│  ├─ deals { tags { open, weighted, won }, columns, modal, descriptions, toasts }
│  ├─ pipeline { columns, modal, descriptions, dropToast }
│  ├─ activity { filter, count }
│  ├─ hierarchy { rootTitle, breadcrumbs, kpi, dealsHeading, empty }
│  └─ deadlines { intro, conflicts, none, empty }
├─ ecommerce
│  ├─ tabs { products, orders, customers, inventory, analytics }
│  ├─ stats { gmv, orders, aov, conversion }
│  ├─ products { search, filters, segmented, addBtn, drawer, modal, form }
│  ├─ orders { columns, filters, actions, groupBy, summary, modal { steps, items, refund } }
│  ├─ customers { search, exportBtn, badge, columns, drawer { history } }
│  ├─ inventory { columns, search, filters, exportBtn, modal { restock, suppliers } }
│  └─ analytics { period, stats, charts, topProducts, noData }
└─ tableKitchenSink
   ├─ appTitle, appLead
   ├─ tableLocale (полный набор TableLocale: searchPlaceholder, filterConfirm,
   │   emptyText, density*, fullscreen*, export*, pinLeft/Right, sum/avg/count,
   │   totalRows(n), selectedRows(n), …)
   ├─ tabs { basic, sortFilter, editing, virtual, pinned, grouped }
   ├─ statusLabel { active, on-leave, remote, terminated }
   ├─ basic { sectionBasic, sectionEmpty, basicLead, emptyLead, emptyDescription,
   │   addEmployee, addEmployeeToast, columns }
   ├─ sortFilter { lead, expColumn, summary{Employees,Avg,Years,Rating} }
   ├─ editing { lead, columns, tooltip, selectionActions, contextMenu, toasts }
   ├─ virtual { leadPrefix, leadSuffix, columns }
   ├─ pinned { lead, columns }
   └─ grouped { modes, groupByLabel, groupOptions, columns, columnGroups,
       cellSpanLead, groupExpandToast(key, expanded), expanded, collapsed }
```

## Затронутые файлы

### Локали (zone: `examples/_shared/`)

- `examples/_shared/src/showcasesLocale.ts` — `+~3500` строк (12
  интерфейсов + 2 словаря).
- `examples/_shared/src/index.ts` — реэкспорт новых типов.

### Контекст / роутинг (zone: `examples/showcases/src/`)

- `examples/showcases/src/App.tsx` — провайдер локали + переключатель
  языка.
- `examples/showcases/src/ShowcasesViews.tsx` — монтаж `ShowcaseLocaleProvider`.
- `examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx`
  — новый файл (контекст + хуки).
- `examples/showcases/src/showcases/_shared/index.ts` — экспорт хуков.

### Апп (zone: `examples/showcases/src/showcases/<app>/`)

| App | Файлы |
|---|---|
| chat | `ChatApp.tsx` |
| inbox | `InboxApp.tsx` |
| helpdesk | `HelpDeskApp.tsx` |
| dashboard | `DashboardApp.tsx` |
| file-manager | `FileManagerApp.tsx` |
| workflow-editor | `WorkflowEditorApp.tsx` |
| forms | `FormsApp.tsx`, `BasicTab.tsx`, `ValidationTab.tsx`, `LayoutsTab.tsx`, `DynamicTab.tsx`, `SchemaTab.tsx` |
| hr-portal | `HrPortalApp.tsx`, `DirectoryTab.tsx`, `OrgTab.tsx`, `LeaveTab.tsx`, `TeamAssignTab.tsx`, `OnboardingTab.tsx`, `ReviewsTab.tsx` |
| admin | `AdminApp.tsx`, `UsersTab.tsx`, `UserForm.tsx`, `AuditTab.tsx`, `RolesTab.tsx`, `SettingsTab.tsx`, `ApiKeysTab.tsx`, `SessionsTab.tsx` |
| crm | `CrmApp.tsx`, `LeadsTab.tsx`, `ContactsTab.tsx`, `ContactForm.tsx`, `ContactDrawer.tsx`, `DealsTab.tsx`, `PipelineTab.tsx`, `HierarchyTab.tsx`, `DeadlinesTab.tsx`, `ActivityTab.tsx` |
| ecommerce | `EcommerceApp.tsx`, `ProductsTab.tsx`, `OrdersTab.tsx`, `CustomersTab.tsx`, `InventoryTab.tsx`, `AnalyticsTab.tsx` |
| table-kitchen-sink | `TableKitchenSinkApp.tsx`, `BasicTab.tsx`, `SortingFilteringTab.tsx`, `EditingTab.tsx`, `VirtualTab.tsx`, `PinnedTab.tsx`, `GroupedTab.tsx`, `common.tsx` |

## Запреты соблюдены

- `packages/**` не тронут.
- `examples/demo/`, `examples/demo-vue/`, `examples/_shared-react/`,
  `examples/_shared-vue/` не тронуты.
- Локали `zh/de/fr/es` не добавлены (зона T-Docs-Locales).
- `git commit/push/checkout/branch`, `pnpm install`, `pnpm clean` не
  запускались.
- Все `pnpm` команды — только с `--filter showcases`.

## Заметки для смежных стримов

- `examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx`
  стал public-внутри-зоны API: любой апп подтягивает локаль через
  `useAppLocale('<key>')`.
- Хелпер `makeTableLocale(tksLocale)` в
  `examples/showcases/src/showcases/table-kitchen-sink/common.tsx`
  показывает паттерн «локализованный slice → форма публичного
  `TableLocale`», который пригодится, если другие апп тоже захотят
  локализовать встроенный UI таблицы.
