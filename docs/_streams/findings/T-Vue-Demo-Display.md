# Findings — T-Vue-Demo-Display

> Append-only. Каждая запись — что нашли вне scope или что пропустили.

## tooltip-rich-content-no-vue

`SgTooltip` (`packages/vue/src/components/ui/Tooltip.vue`) принимает
`title: string`, без слота для JSX-контента. React-аналог `title`
принимает `ReactNode`, что используется в `RichContent.demo.tsx` для
рендера `<strong>` + `<span>`-блока.

- **Что**: `examples/demo-vue/src/demos/tooltip/RichContent.demo.vue` —
  **не создаётся**.
- **Почему**: нет паблик-API в `@skygraph/vue` для богатого контента
  подсказки.
- **Что вместо**: 6 из 7 React-примеров перенесены (`Basic`, `Placement`,
  `OnDisabled`, `OnIcon`, `TokensOverride`, `Unstyled`). Карта требует
  минимум **N-1 = 6** — выполнено.
- **Зона ремонта**: `packages/vue/src/components/ui/Tooltip.vue`
  (добавить `#title` slot или `titleNode?: VNode` prop). Это **вне
  зоны** Волны 3 (`wave-3/CHARTER.md` §2 — «не лезем в `packages/vue/**`»).
  Завести в будущей карте `T-Vue-Cleanup-2`.

## collapse-rich-extra-no-vue

`SgCollapse` / `CollapseItem` (`packages/vue/src/components/ui/Collapse.vue`)
объявляет `extra?: string`. Vue-шаблон рендерит его внутри
`<span class="sg-collapse-extra">{{ item.extra }}</span>` — нет паблик-API
для произвольного VNode-узла (Tag / Button / иконка). React-аналог
принимает `ReactNode` и в `examples/demo/src/demos/collapse/Extra.demo.tsx`
показывает `<Tag color="success">Up to date</Tag>` и кнопку `Reset`
с `onClick`-обработчиком.

- **Что**: `examples/demo-vue/src/demos/collapse/Extra.demo.vue` создан,
  но `extra` подменён на короткие текстовые статусы
  (`'Up to date' | '3 pending' | 'Sensitive'`).
- **Почему**: нет слота для произвольного контента в шапке элемента.
- **Что вместо**: визуальный паритет смягчён — стиль страницы
  по-прежнему 12 примеров (как в React), просто без Tag-«пилюль».
- **Зона ремонта**: `packages/vue/src/components/ui/Collapse.vue` —
  расширить `CollapseItem.extra` до `string | VNode` либо добавить
  `<slot name="extra" :item="item">`. Это **вне зоны** Волны 3
  (`wave-3/CHARTER.md` §2 — «не лезем в `packages/vue/**`»).
  Завести в будущей карте `T-Vue-Cleanup-2`.

## descriptions-rich-content-no-vue

`SgDescriptions` / `DescriptionsItem` (`packages/vue/src/components/ui/Descriptions.vue`)
объявляет `value: string` (плюс `label: string`). React-аналог
принимает `ReactNode` для `children` и `label`, что используется в
`examples/demo/src/demos/descriptions/RichContent.demo.tsx` для
рендера `<Tag>`, `<Badge>` и `<strong>`.

- **Что**: `examples/demo-vue/src/demos/descriptions/RichContent.demo.vue`
  создан, но `value` подменён на форматированные строки
  (`'Pro annual'`, `'● Active'`, `'12 / 25'`, `'2027-04-01'`).
- **Почему**: нет паблик-API в `@skygraph/vue` для VNode-контента в
  ячейках `Descriptions`.
- **Что вместо**: визуальный паритет смягчён — структура страницы
  по-прежнему 9 примеров, но без живых пилюль / бейджей.
- **Зона ремонта**: `packages/vue/src/components/ui/Descriptions.vue` —
  расширить `DescriptionsItem` до `value: string | VNode` либо
  добавить `<slot name="value" :item="item">`. Это **вне зоны**
  Волны 3 (`wave-3/CHARTER.md` §2). Завести в `T-Vue-Cleanup-2`.

## empty-rich-description-no-vue

`SgEmpty` (`packages/vue/src/components/ui/Empty.vue`) принимает
`description?: string | null`. React-аналог `description` принимает
`ReactNode`, что используется в `examples/demo/src/demos/empty/Description.demo.tsx`
(`<span>No invoices matching <code>status=paid</code></span>`) и в
`Unstyled.demo.tsx` (`<strong>Your own paint job</strong>`).

- **Что**: `examples/demo-vue/src/demos/empty/Description.demo.vue`
  и `Unstyled.demo.vue` созданы, но богатый контент описания
  заменён на plain-string (`'No invoices matching status=paid'`,
  `'Your own paint job'` плюс глобальный CSS на `font-weight: 700`).
- **Почему**: нет паблик-API в `@skygraph/vue` для VNode-описания.
- **Что вместо**: 8 из 8 React-примеров перенесены, текст
  упрощён.
- **Зона ремонта**: `packages/vue/src/components/ui/Empty.vue` —
  добавить `<slot name="description">` или расширить тип
  `description` до `string | VNode`. Вне зоны Волны 3.
  Завести в `T-Vue-Cleanup-2`.

## timeline-rich-dot-no-vue

`SgTimeline` / `TimelineItem` (`packages/vue/src/components/ui/Timeline.vue`)
объявляет `dot?: string` (отрисовывается как
`{{ item.dot ?? '' }}` внутри `.sg-timeline-item-head`).
React-аналог принимает `ReactNode`, что используется в
`examples/demo/src/demos/timeline/CustomDot.demo.tsx` для
`<span aria-hidden>🧑</span>` (с `aria-hidden`).

- **Что**: `examples/demo-vue/src/demos/timeline/CustomDot.demo.vue`
  создан, но `dot` подменён на чистые emoji без `aria-hidden`-обёртки.
- **Почему**: нет паблик-API для VNode-узла маркера.
- **Что вместо**: визуальный паритет с emoji-маркерами.
  `aria-hidden` теряем — emoji читается screen-reader-ом.
- **Зона ремонта**: `packages/vue/src/components/ui/Timeline.vue` —
  добавить `<slot name="dot" :item="item">` или расширить
  `dot` до `string | VNode`. Вне зоны Волны 3. Завести в
  `T-Vue-Cleanup-2`.

## timeline-pending-dot-no-vue

`SgTimeline` не имеет `pendingDot` prop — pending-элемент
синтезируется как `{ content: pending, dot: undefined }` и
получает дефолтный «●» dot. React-аналог принимает
`pendingDot?: ReactNode`, что используется в
`examples/demo/src/demos/timeline/Pending.demo.tsx` для
`<span aria-hidden>⏳</span>`.

- **Что**: `examples/demo-vue/src/demos/timeline/Pending.demo.vue`
  создан без кастомного pending-dot — дефолтный «●».
- **Почему**: нет паблик-API для маркера pending-элемента.
- **Что вместо**: paritet текста (`pending="Deploying..."`),
  dot — стандартный.
- **Зона ремонта**: `packages/vue/src/components/ui/Timeline.vue` —
  добавить `pendingDot?: string` (или `<slot name="pendingDot">`).
  Вне зоны Волны 3. Завести в `T-Vue-Cleanup-2`.
