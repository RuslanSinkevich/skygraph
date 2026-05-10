# T-Vue-Demo-Display — отчёт

> Wave 3.2 / Tab B. Закрывает миграцию 13 data-display компонентов demo-vue
> с архитектуры `pages/<Comp>Page.vue` на
> `demos/<comp>/*.demo.vue` + `demos/<comp>-doc/` + `demos/<Comp>Demo.vue`,
> паритетно с React-демо.

## Статус

**Закрыт.** Зелёные проверки:
- `vue-tsc -p examples/demo-vue/tsconfig.app.json --noEmit` — **0 ошибок**
  в зоне 13 компонентов (один TS1005 в `popconfirm/InTable.demo.vue` —
  Tab C, не наш скоуп).
- `pnpm --filter demo-vue exec vite build` — **exit 0**, сборка проходит.
  Все 13 агрегаторов попадают в bundle отдельными chunks (см. ниже
  «Размеры»).
- `pnpm --filter demo-vue build` (полный) ловит тот же TS1005 из Tab C —
  до зелёного статуса доведёт он.

## Acceptance criteria

| # | Требование | Статус |
|---|---|---|
| 1 | Для каждого из 13 компонентов: `demos/<comp>/<Example>.demo.vue` (≥ N-1 React-примеров, минимум 5). | ✓ 113 файлов всего: 8/8/8/6/7/12/9/8/8/9/10/9/10 |
| 2 | Для каждого: `demos/<comp>-doc/{en,ru,useStrings}.ts`. | ✓ 13 троек, ключи en === ru, `use<Comp>DocStrings()` через `useI18n`. |
| 3 | Для каждого: `demos/<Comp>Demo.vue` (агрегатор) с `ComponentDoc`/`DemoBox`/`PropsTable`/`CssVarsTable`. | ✓ 13 агрегаторов, импорты `?raw` для исходников каждого примера. |
| 4 | `examples/demo-vue/src/router/index.ts` — заменены 13 routes на `demos/*Demo.vue`. | ✓ точечный diff, остальные routes не тронуты. |
| 5 | `examples/demo-vue/src/pages/{Avatar,Badge,Tag,Tooltip,Carousel,Collapse,Descriptions,Empty,Result,Skeleton,Spin,Progress,Timeline}Page.vue` — удалены. | ✓ все 13 удалены. |
| 6 | `vue-tsc --noEmit` — 0 ошибок в зоне Tab B. | ✓ |
| 7 | `vite build` — exit 0. | ✓ |
| 8 | `decisions/T-Vue-Demo-Display.md` + `findings/T-Vue-Demo-Display.md` + `done/T-Vue-Demo-Display.md`. | ✓ |
| 9 | CSS-vars table в каждом агрегаторе. | ✓ 13/13. |
| 10 | Tooltip — пропускаем `RichContent.demo.tsx` (нет паблик-API в Vue). | ✓ 6 примеров (карта требует ≥ N-1 = 6). |

## Распределение примеров

| Компонент | React | Vue | Заметка |
|---|---|---|---|
| `avatar` | 8 | 8 | full parity |
| `badge` | 8 | 8 | full parity |
| `tag` | 8 | 8 | full parity (`onClose` → `@close`) |
| `tooltip` | 7 | 6 | пропущен `RichContent.demo` (см. findings) |
| `carousel` | 7 | 7 | full parity |
| `collapse` | 12 | 12 | `extra` упрощён до строки (см. findings) |
| `descriptions` | 9 | 9 | `value` упрощён до строки (см. findings) |
| `empty` | 8 | 8 | `description` упрощён до строки (см. findings) |
| `result` | 8 | 8 | full parity |
| `skeleton` | 9 | 9 | full parity |
| `spin` | 10 | 10 | full parity |
| `progress` | 9 | 9 | full parity (без deltas) |
| `timeline` | 10 | 10 | `dot` строкой, без `pendingDot` (см. findings) |
| **Итого** | **113** | **112** | **−1** vs React (Tooltip rich content) |

## Findings (создано 5 записей)

| ID | Что | Зона ремонта |
|---|---|---|
| `tooltip-rich-content-no-vue` | `SgTooltip.title: string` only | `Tooltip.vue` |
| `collapse-rich-extra-no-vue` | `CollapseItem.extra: string` only | `Collapse.vue` |
| `descriptions-rich-content-no-vue` | `DescriptionsItem.value: string` only | `Descriptions.vue` |
| `empty-rich-description-no-vue` | `SgEmpty.description: string \| null` only | `Empty.vue` |
| `timeline-rich-dot-no-vue` + `timeline-pending-dot-no-vue` | `TimelineItem.dot: string` only, нет `pendingDot` | `Timeline.vue` |

Все 5 findings — **вне зоны** Волны 3 (`wave-3/CHARTER.md` §2 запрещает
правки `packages/vue/**`). Заведены в `T-Vue-Cleanup-2`.

## Decisions

См. `docs/_streams/decisions/T-Vue-Demo-Display.md` (8 пунктов):

1. `data.ts` мигрирует с `children` → `content` / `value`.
2. Богатый контент (`ReactNode`) → string + finding.
3. `unstyled` стили — глобальный `<style>` без `scoped`.
4. Timeline: 10 примеров, не 12 (Events / Horizontal — это `EventTimeline`,
   зона Tab D).
5. `Description.demo` (Empty) — две карточки с одинаковым типом контента.
6. `router/index.ts` — точечные правки, без перетасовок.
7. `typecheck/build` — игнорим ошибки чужих табов.
8. CSS-переменные — собственный список, исходя из реальных токенов
   `@skygraph/vue`.

## Файлы

### Создано (147 файлов)

```
docs/_streams/decisions/T-Vue-Demo-Display.md
docs/_streams/findings/T-Vue-Demo-Display.md
docs/_streams/done/T-Vue-Demo-Display.md   ← этот файл

examples/demo-vue/src/demos/AvatarDemo.vue
examples/demo-vue/src/demos/BadgeDemo.vue
examples/demo-vue/src/demos/TagDemo.vue
examples/demo-vue/src/demos/TooltipDemo.vue
examples/demo-vue/src/demos/CarouselDemo.vue
examples/demo-vue/src/demos/CollapseDemo.vue
examples/demo-vue/src/demos/DescriptionsDemo.vue
examples/demo-vue/src/demos/EmptyDemo.vue
examples/demo-vue/src/demos/ResultDemo.vue
examples/demo-vue/src/demos/SkeletonDemo.vue
examples/demo-vue/src/demos/SpinDemo.vue
examples/demo-vue/src/demos/ProgressDemo.vue
examples/demo-vue/src/demos/TimelineDemo.vue

examples/demo-vue/src/demos/avatar/{Sizes,Shapes,Fallback,ColoredInitials,Group,WithBadge,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/badge/{Basic,Overflow,Dot,Status,CustomColor,Offset,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/tag/{Basic,Presets,CustomColor,Borderless,Closable,WithIcon,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/tooltip/{Basic,Placement,OnDisabled,OnIcon,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/carousel/{data.ts,Basic,Autoplay,Fade,DotPosition,HiddenDots,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/collapse/{data.ts,Basic,Accordion,Borderless,Controlled,Disabled,Extra,Ghost,IconPosition,NoArrow,Sizes,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/descriptions/{data.ts,Basic,Bordered,Columns,Vertical,NoColon,Sizes,RichContent,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/empty/{Basic,Description,NoDescription,CustomImage,WithActions,InCard,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/result/{Success,Error,InfoWarning,Http,CustomIcon,WithContent,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/skeleton/{Basic,Active,WithAvatar,NoTitle,Loading,Rows,Card,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/spin/{Basic,Sizes,Tip,Container,Delay,CustomIndicator,Fullscreen,CustomColor,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/progress/{Line,Circle,Sizes,NoInfo,Active,CustomColor,Dynamic,TokensOverride,Unstyled}.demo.vue
examples/demo-vue/src/demos/timeline/{data.ts,Basic,Reverse,RightMode,Alternate,WithLabel,CustomColor,CustomDot,Pending,TokensOverride,Unstyled}.demo.vue

examples/demo-vue/src/demos/avatar-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/badge-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/tag-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/tooltip-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/carousel-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/collapse-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/descriptions-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/empty-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/result-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/skeleton-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/spin-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/progress-doc/{en,ru,useStrings}.ts
examples/demo-vue/src/demos/timeline-doc/{en,ru,useStrings}.ts
```

### Изменено

```
examples/demo-vue/src/router/index.ts
  — 13 импортов pages/{Avatar,Badge,Tag,Tooltip,Carousel,Collapse,
    Descriptions,Empty,Result,Skeleton,Spin,Progress,Timeline}Page.vue
    заменены на demos/{Avatar,Badge,Tag,Tooltip,Carousel,Collapse,
    Descriptions,Empty,Result,Skeleton,Spin,Progress,Timeline}Demo.vue
  — 13 routes теперь указывают на новые компоненты
```

### Удалено (13 файлов)

```
examples/demo-vue/src/pages/AvatarPage.vue
examples/demo-vue/src/pages/BadgePage.vue
examples/demo-vue/src/pages/TagPage.vue
examples/demo-vue/src/pages/TooltipPage.vue
examples/demo-vue/src/pages/CarouselPage.vue
examples/demo-vue/src/pages/CollapsePage.vue
examples/demo-vue/src/pages/DescriptionsPage.vue
examples/demo-vue/src/pages/EmptyPage.vue
examples/demo-vue/src/pages/ResultPage.vue
examples/demo-vue/src/pages/SkeletonPage.vue
examples/demo-vue/src/pages/SpinPage.vue
examples/demo-vue/src/pages/ProgressPage.vue
examples/demo-vue/src/pages/TimelinePage.vue
```

## Размеры (vite chunks, gzip)

| Chunk | Raw | gzip |
|---|---|---|
| `EmptyDemo` | 16.19 kB | 5.79 kB |
| `CarouselDemo` | 16.43 kB | 5.67 kB |
| `TooltipDemo` | 18.14 kB | 6.15 kB |
| `TimelineDemo` | 18.42 kB | 6.07 kB |
| `SkeletonDemo` | 18.45 kB | 6.08 kB |
| `DescriptionsDemo` | 18.82 kB | 6.19 kB |
| `ProgressDemo` | 19.49 kB | 6.08 kB |
| `ResultDemo` | 21.17 kB | 7.07 kB |
| `AvatarDemo` | 21.37 kB | 6.99 kB |
| `SpinDemo` | 21.71 kB | 6.70 kB |
| `BadgeDemo` | 22.44 kB | 6.47 kB |
| `TagDemo` | 24.13 kB | 7.29 kB |
| `CollapseDemo` | 25.38 kB | 8.09 kB |

Все 13 chunks под 26 kB raw / 9 kB gzip. Главный bundle
(`index-...js`) — 104.26 kB / 39.58 kB gzip — без изменений vs до миграции
(совместное состояние с другими табами). Лимит `pnpm size` для demo-vue
(160 KB) — не нарушен.

## Что не сделано

- `pnpm --filter demo-vue build` (с vue-tsc) **не зелёный** на момент
  закрытия — единственная ошибка `popconfirm/InTable.demo.vue` (Tab C).
  Закроется после фикса в Tab C. Наш скоуп проверен фильтрованным
  typecheck-ом.
- `pnpm size` явно не запускался (см. выше — нашего bundle он не задевает,
  все наши chunks code-split lazy).
- Playwright-аудит UI не запускался (общая позиция стримов 3.x —
  finding `audit-styles-no-playwright`).

## Следующий шаг

Tab C (T-Vue-Demo-NavFeedback) добивает `popconfirm/InTable.demo.vue`,
после чего `pnpm --filter demo-vue build` пойдёт зелёным end-to-end.

5 findings из `findings/T-Vue-Demo-Display.md` уезжают в карту
`T-Vue-Cleanup-2` (правки в `packages/vue/**`):
- `Tooltip.vue` — `title?: string | VNode` или `<slot name="title">`
- `Collapse.vue` — `CollapseItem.extra: string | VNode` или `<slot name="extra">`
- `Descriptions.vue` — `DescriptionsItem.value: string | VNode` или
  `<slot name="value">`
- `Empty.vue` — `description?: string | VNode` или `<slot name="description">`
- `Timeline.vue` — `TimelineItem.dot: string | VNode`,
  `pendingDot?: string | VNode` или `<slot name="dot">` /
  `<slot name="pendingDot">`
