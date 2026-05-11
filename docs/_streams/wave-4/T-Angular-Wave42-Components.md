# T-Angular-Wave42-Components — Волна 4.2: порт компонентов и расширение demo-angular

> Читать первым: `docs/_streams/CHARTER.md`, `docs/_streams/wave-4/CHARTER.md`,
> `docs/_streams/done/T-Angular-Foundation.md`,
> `docs/_streams/decisions/T-Angular-Foundation.md`,
> `docs/_streams/findings/T-Angular-Foundation.md`.
> 4.1 уже закрыт (`SgButton`, `SgSpin`, `SgConfigProvider`,
> `provideSgConfig`, `injectSgConfig`, локали en/ru, demo с Landing
> и страницей Button). Этот стрим строит на 4.1.

## ID и волна

- **ID:** T-Angular-Wave42-Components
- **Волна:** 4.2 (один независимый стрим, **внутри идём батчами**)
- **Режим:** один таб, **параллельно** с T-Vue-Demo-Header-Parity (3.4)

## Цель

Портировать **остальные** компоненты из `@skygraph/react` в
`@skygraph/angular` (за вычетом тех, что уже сделал foundation 4.1) и
**одновременно** расширить `examples/demo-angular` страницами для каждого
нового компонента + сайдбаром по образцу demo-vue / demo.

Принцип тот же что в 4.1: **«не изобретай свой визуал и стили»** —
DOM/className/aria копируются из React 1:1, меняется только обвязка
(Inputs/Outputs/DI). Селекторы атрибутные (`button[sg-button]`-style),
без обёрток `<sg-…>` для host-element компонентов.

## Эталоны (READ-ONLY)

- `packages/react/src/components/{ui,complex}/**` — DOM-эталон каждого
  компонента.
- `packages/vue/src/components/**` — образец того, как порт сделан в
  Vue (DI/composables вместо React-Context, `loading`/`unstyled` props,
  inline `<span class="sg-spin sg-spin-small">` вместо импорта `Spin`,
  см. `done/T-Vue-Components-DOM-Parity.md`).
- `packages/angular/src/lib/components/ui/{button,spin}/**` — образец
  Angular SFC (как 4.1 это сделал, attribute-selector, `host: { '[class]'
  : 'classes()' }` биндинги).
- `packages/angular/__tests__/styling-contract.parity.test.ts` —
  образец парности-теста, расширяем его кейсами на каждый новый
  компонент.
- `examples/demo/src/App.tsx` + `examples/demo-vue/src/nav.ts` —
  список и порядок компонентов в сайдбаре.
- `examples/demo/src/demos/<comp>/*.demo.tsx` — образец примеров
  на странице компонента.

## Зона файлов

### Можно править / создавать

#### Пакет `packages/angular/`
- `src/lib/components/ui/<name>/sg-<name>.component.ts` (новые SFC).
- `src/lib/components/ui/<name>/index.ts` (новые барели).
- `src/lib/components/ui/<name>/sg-<name>.directive.ts` (если для
  компонента нужны вспомогательные директивы — например, `sgInput`,
  `sgSelectOption`).
- `src/lib/components/nav-feedback/<name>/...` (если решено отделить
  навигацию/feedback от ui-base; иначе всё под `ui/`).
- `src/lib/components/complex/<name>/...` (Form, Table, Tree, List —
  если успеваем; см. §«Порядок батчей»).
- `src/lib/locales/{en_US,ru_RU}.ts` — добавление новых ключей по
  образцу `packages/react/src/locales/{en_US,ru_RU}.ts`. Не
  переписываем существующие, только append.
- `src/lib/locales/locale.types.ts` — расширение интерфейса `SgLocale`
  под новые секции.
- `src/public-api.ts` — append новых re-export'ов. Не трогать порядок
  существующих.
- `__tests__/styling-contract.parity.test.ts` — расширение под новые
  компоненты. Один файл, новые `describe`-блоки.
- `__tests__/setup.ts` — без правок (если нужно — finding).
- `tsconfig.json` / `ng-package.json` / `package.json` /
  `vitest.config.mts` — без правок.

#### Демо `examples/demo-angular/`
- `src/app/pages/components/<comp>/<comp>-page.component.{ts,html,css}`
  (новые) — по странице на каждый портированный компонент. Структура
  и количество примеров — как в `examples/demo/src/demos/<comp>/`.
- `src/app/shared/layout/sidebar.component.ts` — расширить категориями
  и пунктами по образцу `examples/demo-vue/src/nav.ts`
  (`buildComponentsSidebar`).
- `src/app/app.routes.ts` — append маршрутов `/components/<name>` →
  lazy-loaded `<comp>PageComponent`.
- `src/app/app.component.ts` / `.html` / `.css` — точечные правки,
  если нужно (например, активный пункт, breadcrumb). Никаких ломающих
  изменений в layout.
- `src/styles.css` — без правок (импорт `@skygraph/styles/sg.css` уже
  есть, локальные стили demo не добавлять; если нужно — finding).
- `package.json` / `angular.json` / `tsconfig*.json` — без правок.

#### Документация
- `docs/_streams/{decisions,findings,done}/T-Angular-Wave42-Components.md`
  (новые).

### Нельзя трогать

- `packages/{core,react,vue,styles}/**` — read-only эталоны.
- `examples/{demo,demo-vue,_shared,_shared-react,_shared-vue,
  showcases}/**` — read-only.
- `tsconfig.base.json`, root `package.json`, `pnpm-lock.yaml`,
  `pnpm-workspace.yaml`.
- `.size-limit.json` — лимиты `@skygraph/angular` (150 KB) и
  `examples/demo-angular` (600 KB) **не двигаем**. Если упирается —
  finding с реальным замером, не повышаем.
- `.husky/**`, `.github/**`, `.eslintrc*`, `.prettier*`.
- Зоны других стримов: `examples/demo-vue/{App.vue, nav.ts, router/,
  pages/Roadmap.vue, pages/About.vue, guide/, components/
  FrameworkSwitcher.vue, i18n/}` — это зона T-Vue-Demo-Header-Parity (3.4).

## ⚠️ Правила автономности

Не останавливаться, не задавать вопросов. Решения вне карты —
`docs/_streams/decisions/T-Angular-Wave42-Components.md`. Пропуски и
ограничения — `docs/_streams/findings/T-Angular-Wave42-Components.md`.
В конце — отчёт `docs/_streams/done/T-Angular-Wave42-Components.md`.

**Никаких:**
- `git commit` / `push`,
- `pnpm install` / `add` / `update`. Все нужные пакеты уже в
  `node_modules` после foundation 4.1. Если **очень** нужна новая
  зависимость — finding и пропуск компонента.
- глобальных `pnpm typecheck` / `build` / `test`. Только
  `--filter @skygraph/angular` и `--filter demo-angular`.
- правок в `packages/{core,react,vue,styles}/**`.

Если столкнулся с тем, что ядро (`@skygraph/core`) не предоставляет
нужного API (например, нет `FormEngine` getter) — **finding**,
пропускаем сложный компонент и идём дальше. Не лезем в core.

## Принципы порта (применяй к каждому компоненту)

1. **Селектор:** для host-element компонентов (Button, Input, Tag,
   Badge, Tooltip-host, Switch, Checkbox, Radio) — атрибутный
   (`input[sg-input]`, `[sg-tag]`, `[sg-badge]`). Для компонентов с
   собственным DOM (Modal, Drawer, Tabs, Menu, Dropdown, Tooltip-content,
   Popconfirm-content, Spin как standalone, Skeleton, Carousel,
   Collapse, Steps, Pagination, Calendar, DatePicker, Charts) —
   обычный (`sg-modal`, `sg-tabs`, …). Решение фиксируется в
   decisions, если идёт вразрез с интуицией.
2. **DOM/Classes/Aria:** копируются из React 1:1. Никаких лишних
   обёрток. Если в React `<button class="sg-button …">`, в Angular
   тоже **должна быть кнопка**, не `<sg-button><button>`.
3. **Inputs/Outputs:** имена и типы 1:1 с React-props. Boolean
   prop'ы → `@Input() … = false`; событие `onClick` → `@Output() click = new EventEmitter<...>()`. Если в Vue/React есть `v-model:value` /
   `value`+`onChange` → в Angular делаем
   `@Input() value` + `@Output() valueChange = new EventEmitter<...>()`
   (для совместимости с `[(value)]`). Где в React стоит `defaultValue`/
   `value` (uncontrolled/controlled) — в Angular поддерживаем оба
   режима через `[(value)]` + `value` без events.
4. **DI:** `injectSgConfig()` (уже есть, 4.1) для глобального
   `size`/`disabled`/`locale`. Не делать собственных глобальных
   синглтонов.
5. **Локали:** для каждого компонента, у которого в React есть
   ключи в `SgLocale` (Modal `okText`/`cancelText`, Pagination
   `prevText`, …) — добавить эти ключи в
   `packages/angular/src/lib/locales/{en_US,ru_RU}.ts`. Брать значения
   из React-аналогов (`packages/react/src/locales/{en_US,ru_RU}.ts`).
6. **Spinner inline:** не импортируем `SgSpinComponent` в каждый
   loading-aware компонент (раздувает bundle). Рендерим
   `<span class="sg-spin sg-spin-small" aria-hidden="true"></span>`
   inline (см. Vue D-1).
7. **Не повторять foundation:** `SgButton`, `SgSpin`,
   `SgConfigProvider`, `provideSgConfig`, `injectSgConfig` — уже
   есть. Не пересоздавать. Если нужно — расширить (например, добавить
   `SgButton.danger`, если в 4.1 пропустили — finding).
8. **Парность-тест:** на каждый новый компонент — минимум 1 кейс в
   `__tests__/styling-contract.parity.test.ts`, сравнивающий DOM с
   React-аналогом (рендер через `TestBed` + сравнение нормализованного
   `outerHTML` с React-эталоном из `packages/react`). Если для
   компонента нет лёгкого способа сравнить (работает с порталами,
   таймерами, `requestAnimationFrame`) — finding и пропускаем тест,
   но компонент оставляем.

## Порядок батчей (последовательно внутри одного таба)

После каждого батча:
```
pnpm --filter @skygraph/angular typecheck
pnpm --filter @skygraph/angular test --run
pnpm --filter @skygraph/angular build
```
Зелёные → следующий батч. Если красное — починить в этом же батче,
не идти дальше.

### Батч A — UI primitives (10–14 SFC)
`Tag`, `Badge`, `Avatar`, `Tooltip`, `Skeleton`, `Progress`, `Empty`,
`Result`, `Switch`, `Checkbox`, `Radio`, `Slider`, `Rate`,
`ColorPicker`. Это самые простые, без сложного state.

### Батч B — UI inputs (10–12 SFC)
`Input`, `InputNumber`, `Textarea`, `InputPassword`, `SearchInput`,
`PinInput`, `TagInput`, `Mentions`, `InlineEdit`, `InputGroup`.

### Батч C — UI nav + feedback (10–14 SFC)
`Tabs`, `Menu`, `Breadcrumb`, `Dropdown`, `Pagination`, `Steps`,
`Segmented`, `Modal`, `Drawer`, `Popconfirm`, `Notification`,
`Carousel`, `Collapse`, `Descriptions`.

### Батч D — UI selectors + date (8–10 SFC)
`Select`, `AutoComplete`, `Cascader`, `TreeSelect`, `DatePicker`,
`TimePicker`, `Calendar`, `Upload`, `Transfer`, `Timeline`.

### Батч E (по возможности) — Complex
`List`, `Tree`, `Form` + `FormItem`/`FormProvider`. **Не обязательно**
в этом стриме. Если в каком-то месте увязли (Form-engine API не
тянется, Table требует virtual scrolling — это серьёзный объём) —
finding и оставляем для Wave 4.3 / отдельного стрима. Лучше отдать
A-D зелёным, чем застрять на Form/Table.

### Батч F (по возможности) — Charts / Diagram / Dashboard / Gantt /
ResourceCalendar / EventTimeline / SchemaForm / SchemaFormEditor.
**Скорее не успеем**. Финдинг и пропуск как блок. Эти компоненты
очень крупные, заведём для них отдельную карту Wave 4.3.

### Демо-страницы (параллельно с компонентами)

После каждого батча обновляем `examples/demo-angular`:
- На каждый новый компонент — `src/app/pages/components/<name>/
  <name>-page.component.{ts,html,css}` со скрин-ребром
  «Title + 2-4 примера + минимальный пояснительный текст». Не
  делаем `<DemoBox>` / `<ComponentDoc>` / `<PropsTable>` /
  `<CssVarsTable>` (это потенциальная Wave 4.3, аналог Vue 3.1
  Foundation).
- В `app.routes.ts` — append `loadComponent: () => import('./pages/
  components/<name>/<name>-page.component').then(m =>
  m.<Name>PageComponent)`.
- В `sidebar.component.ts` — добавить пункт в нужную категорию.

## Acceptance criteria

- Не менее **батчей A + B + C + D** портированы (минимум 38–50 SFC
  без учёта foundation Button/Spin/ConfigProvider).
- Для каждого портированного компонента есть страница в
  `examples/demo-angular/src/app/pages/components/<name>/`.
- Сайдбар demo-angular показывает все портированные компоненты в тех
  же категориях, что demo-vue / demo.
- `pnpm --filter @skygraph/angular {typecheck,test --run,build}` —
  зелёные.
- `pnpm --filter demo-angular build` — зелёный.
- `pnpm size` — зелёный (лимиты 150 KB / 600 KB **не подняты**).
  Если упирается — finding с реальными замерами.
- Парность-тест расширен (минимум один кейс на батчи A-D-компонент).
- Никаких правок в `packages/{core,react,vue,styles}/**`,
  `examples/{demo,demo-vue,_shared*,showcases}/**`,
  `tsconfig.base.json`, root `package.json`, `pnpm-lock.yaml`.
- Отчёт сдан, decisions/findings заполнены.

## Зависимости

- **Параллельно** с T-Vue-Demo-Header-Parity (3.4). Зоны не пересекаются:
  `packages/angular/**` + `examples/demo-angular/**` vs
  `examples/demo-vue/**`.
- **До** будущей Wave 4.3 (полный demo-angular на уровне demo / demo-vue:
  `<DemoBox>`/`<ComponentDoc>`/`<PropsTable>`/`<CssVarsTable>`,
  `?raw`-импорты, `<Landing>` Hero/Stats/Features, etc).
- **До** будущей Wave 4.4 (post-migration QA для Angular).

---

## Текст запуска стрима (копипаст в новый таб Cursor)

```text
Ты — стрим T-Angular-Wave42-Components (Волна 4.2) в репозитории skygraph.

Задача: добивать @skygraph/angular после foundation 4.1. Порт
компонентов из React в Angular батчами:
A — UI primitives (Tag, Badge, Avatar, Tooltip, Skeleton, Progress,
    Empty, Result, Switch, Checkbox, Radio, Slider, Rate, ColorPicker)
B — UI inputs (Input, InputNumber, Textarea, InputPassword,
    SearchInput, PinInput, TagInput, Mentions, InlineEdit, InputGroup)
C — UI nav + feedback (Tabs, Menu, Breadcrumb, Dropdown, Pagination,
    Steps, Segmented, Modal, Drawer, Popconfirm, Notification,
    Carousel, Collapse, Descriptions)
D — UI selectors + date (Select, AutoComplete, Cascader, TreeSelect,
    DatePicker, TimePicker, Calendar, Upload, Transfer, Timeline)
E (если успеваешь) — Complex (List, Tree, Form). F (Charts/Diagram/
Gantt/Dashboard/ResourceCalendar) — скорее finding, отдельная Wave 4.3.

Параллельно с компонентами расширяй examples/demo-angular: на каждый
портированный компонент создавай src/app/pages/components/<name>/
<name>-page.component.{ts,html,css} (минимум: заголовок + 2–4
примера), append маршрут в app.routes.ts, append пункт в sidebar.

Принцип: НЕ ИЗОБРЕТАЙ — копируй DOM/className/aria из
packages/react/src/components/<...>.tsx. Селекторы host-element
компонентов — атрибутные (input[sg-input] и т.п.). Inputs/Outputs
имена 1:1 с React props. Spinner inline <span class="sg-spin
sg-spin-small">, не импортировать SgSpin в каждый компонент.

Полная карта: docs/_streams/wave-4/T-Angular-Wave42-Components.md.

Все зависимости уже стоят (4.1 сделал pnpm install). Никаких
pnpm install / add / update. Никаких git commit. Не лезь в
packages/{core,react,vue,styles}/**, examples/{demo,demo-vue,
_shared*,showcases}/**. Параллельно с 3.4 (T-Vue-Demo-Header-Parity),
зоны не пересекаются.

Правила автономности: не останавливаться, не спрашивать. Решения вне
карты — docs/_streams/decisions/T-Angular-Wave42-Components.md,
пропуски — findings/. После каждого батча: pnpm --filter
@skygraph/angular {typecheck,test --run,build}, после всех — pnpm
--filter demo-angular build && pnpm size. В конце — отчёт
docs/_streams/done/T-Angular-Wave42-Components.md.

Старт: Шаг 0 (читать React-эталоны, packages/vue/src/components как
образец порта, packages/angular/src/lib/components/ui/{button,spin}
как образец Angular SFC), потом Батч A.
```
