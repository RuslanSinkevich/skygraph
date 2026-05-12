# Stream T-React-Polish — Visual & i18n polish for the React demo

> Автономный стрим. Четыре независимых задачи в одной зоне (React):
> SchemaFormEditor локализация, Calendar редизайн до уровня antd,
> Pagination без «прыжков» при переключении страниц, Diagram —
> визуальная и поведенческая полировка рёбер (скругление углов,
> пересечения «jump-over», стрелки, антилаги перерисовки). Параллелен
> T-Vue-Parity / T-Angular-Parity / T-Benchmarks-i18n — зоны не
> пересекаются (см. §2).

---

## 0. Контекст и установки от владельца

- На `/components/schema-form-editor` **не подключена локализация**,
  хотя словари `examples/demo/src/demos/schema-form-editor-doc/{en,ru}.ts`
  и хук `useSchemaFormEditorDocStrings` уже **есть**.
- Calendar (`/components/calendar`) визуально «не нравится» — общий
  вид + детали ячеек / шапки / выбранного дня. Референс — **antd
  Calendar** (https://ant.design/components/calendar).
- Pagination — при листании цифр **весь блок прыгает по ширине**,
  потому что число кнопок и их ширина меняются (1 → 1 2 → 1 2 3 4 5
  6 7 8 9 → 1 … 8 9 10). Нужно фиксированное окно, цифры скользят
  внутри.
- Diagram — линии между нодами визуально «ужасно прямые», углы под
  90° резкие; при пересечении линии накладываются без визуального
  разделения; при drag/zoom перестройка идёт с лагом и «прыжками».
  Нужно: скруглённые углы (`arc-corners`), jump-over на пересечениях,
  стрелки на конце, кэширование путей.

---

## 1. Зона стрима

**Можно**:
- `examples/demo/src/demos/SchemaFormEditorDemo.tsx` (подключить
  существующий хук локализации).
- `examples/demo/src/demos/schema-form-editor/Builder.demo.tsx`,
  `Prefilled.demo.tsx` (если в demo-обёртках есть хардкоженые
  строки — локализовать в `<comp>-doc/{en,ru}.ts`).
- `examples/demo/src/demos/schema-form-editor-doc/{en,ru}.ts` —
  расширение словаря под новые ключи, если найдутся.
- `packages/styles/components/calendar.css` — редизайн.
- `packages/styles/components/pagination.css` — фикс прыжков.
- `packages/react/src/components/ui/Pagination.tsx` — стабилизация
  `buildPages` (фиксированный размер окна).
- `packages/react/__tests__/Pagination*` — тесты на новый `buildPages`.
- `packages/core/src/engines/graph/router.ts` — постпроцессинг
  ортогонального пути: arc-corners, опциональные jump-overs (новый
  `roundedCornersPath` рядом с `pointsToPath`, существующий API
  оставить как есть).
- `packages/core/src/__tests__/router.test.ts` — тесты на углы и
  пересечения.
- `packages/react/src/components/complex/Diagram/Diagram.tsx` —
  кэширование путей по edge.id + bbox + bbox endpoints; добавить
  `marker-end` (стрелка).
- `packages/styles/components/diagram.css` — стили `marker-end`,
  jump-over.

**Нельзя**:
- `examples/demo-vue/**`, `examples/demo-angular/**` — другие стримы.
- `examples/_shared/**`.
- DOM-структура `Calendar.tsx`, `Pagination.tsx` — менять
  **минимально**: только если без правки JSX невозможно достичь
  целевого вида (например, поменять `<select>` на кастомный
  Dropdown в Calendar — выходит за scope, оставить как есть).
- Файлы Vue/Angular calendar / pagination / diagram — не трогаем.
- `packages/styles/tokens.css` — токены не правим (CHARTER §2.7).
- Менять контракт `GraphEdge` / `EdgeEndpoint` / типов из
  `@skygraph/core/engines/graph/types`. Новые поля кладём в опции
  компонента / в опции `routeOrthogonal`.

---

## 2. Параллельность с другими стримами

| Стрим | Конфликт |
|---|---|
| T-Vue-Parity | нет (Vue-зона) |
| T-Angular-Parity | нет (Angular-зона) |
| T-Benchmarks-i18n | нет — он пишет в `examples/demo/src/i18n/types.ts` (ветка `benchmarks`); этот стрим в неё не пишет |

Все четыре стрима безопасно идут параллельно.

---

## 3. Задача A — SchemaFormEditor локализация (P0, ~30 минут)

### 3.1. Что сейчас

`examples/demo/src/demos/SchemaFormEditorDemo.tsx` хардкожен:

```tsx
<ComponentDoc
  title="SchemaFormEditor"
  description="Visual constructor over SchemaForm: ..."
  whenToUse={[
    'Build admin panels where end-users design their own forms.',
    'Prototype JSON-Schema payloads with a live preview.',
    'Pair with SchemaForm to turn the editor output into a runtime form.',
  ]}
>
  <DemoBox
    title="Empty canvas"
    description="Drag any field from the palette onto the canvas to start building."
    code={BuilderSource}
  >
    <BuilderDemo />
  </DemoBox>

  <DemoBox
    title="Pre-filled schema"
    description="Editor seeded with five fields. Hit Reset ..."
    code={PrefilledSource}
  >
    <PrefilledDemo />
  </DemoBox>

  <PropsTable title="SchemaFormEditor API" data={editorProps} />
  <PropsTable title="useSchemaEditor() Options" data={useSchemaEditorProps} />
</ComponentDoc>
```

При этом рядом лежит **полностью готовый** хук
`useSchemaFormEditorDocStrings()` (см.
`examples/demo/src/demos/schema-form-editor-doc/`), который отдаёт
все нужные ключи. Просто не используется.

### 3.2. Что делать

1. В `SchemaFormEditorDemo.tsx`:

```tsx
import { useSchemaFormEditorDocStrings } from './schema-form-editor-doc/useSchemaFormEditorDocStrings'

export function SchemaFormEditorDemo() {
  const t = useSchemaFormEditorDocStrings()

  const editorProps = useMemo<PropDef[]>(() => [
    { name: 'initialSchema',   description: t.propInitialSchema,   type: 'EditorSchema' },
    { name: 'store',           description: t.propStore,           type: 'SchemaEditorStore' },
    { name: 'paletteItems',    description: t.propPaletteItems,    type: 'PaletteItem[]' },
    { name: 'onChange',        description: t.propOnChange,        type: '(schema: EditorSchema) => void' },
    { name: 'emptyText',       description: t.propEmptyText,       type: 'string', default: "'Drop a field here'" },
    { name: 'hideSchemaView',  description: t.propHideSchemaView,  type: 'boolean', default: 'false' },
  ], [t])

  const useSchemaEditorProps = useMemo<PropDef[]>(() => [
    { name: 'initialSchema', description: t.propHookInitialSchema, type: 'EditorSchema' },
    { name: 'core',          description: t.propHookCore,          type: 'Core' },
    { name: 'onChange',      description: t.propHookOnChange,      type: '(schema: EditorSchema) => void' },
  ], [t])

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataEntry, t.crumbSchemaFormEditor]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox
        title={t.demoBuilderTitle}
        description={t.demoBuilderDesc}
        code={BuilderSource}
      >
        <BuilderDemo />
      </DemoBox>

      <DemoBox
        title={t.demoPrefilledTitle}
        description={t.demoPrefilledDesc}
        code={PrefilledSource}
      >
        <PrefilledDemo />
      </DemoBox>

      <PropsTable title={t.tableEditorApi} data={editorProps} />
      <PropsTable title={t.tableHookApi} data={useSchemaEditorProps} />
    </ComponentDoc>
  )
}
```

2. Проверить `ru.ts` — все ключи присутствуют (если каких-то нет —
   добавить, ориентируясь на стиль соседних страниц, например
   `select-doc/ru.ts`).

3. Запустить dev, переключить ru/en — убедиться что обе локали
   отрабатывают.

### 3.3. Acceptance

- `pnpm --filter demo typecheck` зелёный.
- `pnpm --filter demo build` зелёный.
- Переключатель ru/en на `/components/schema-form-editor` меняет
  заголовок, lead, when-to-use, заголовки demo-боксов, заголовки
  PropsTable и описания пропов.
- Хардкоженых английских строк не осталось (кроме `'Drop a field
  here'` в `default:` — это значение пропа, не UI-строка).

---

## 4. Задача B — Calendar visual redesign (P0, ~2-3 часа)

### 4.1. Что не так относительно antd

Анализ `packages/styles/components/calendar.css` + сравнение с
ant.design/components/calendar:

| Слот | Сейчас | antd | Действие |
|---|---|---|---|
| **Header** | `space-between`, центр содержит `<select>` month + `<select>` year + mode-switch, переносится на 2 строки на узких | Справа: маленький `<select>` Year (тип `link`), `<select>` Month, и Tabs `Month/Year` | Перейти на правое выравнивание: month/year на правом крае, mode-switch справа от них. Убрать `flex-wrap` из `header-center` для full-screen. |
| **Day cell** (`cell-inner`) | Круглая капсула `cell-date` 24×24, центрирована | Число в левом верхнем углу, без круглой подложки, ячейка слева-сверху | Заменить `display: inline-flex; border-radius: 50%` у `.sg-calendar-cell-date` на `text-align` слева, `font-weight: 500`; высота ячейки — без круга. |
| **Selected** | Залитый primary круг вокруг числа | `border-top: 2px solid primary` сверху ячейки + `bg: primary-bg` | Перенести `selected`-стиль с `cell-date` на `cell-inner`: `border-top: 2px solid primary; background: primary-bg`. Сбросить круг. |
| **Today** | `border: 1px solid primary` вокруг числа | `border-top: 2px solid primary` без bg, число выделено цветом | Аналогично: на `cell-inner` — `border-top: 2px solid primary`; цвет числа = primary. |
| **Day header row** | Без сепаратора, сразу примыкает к body | `border-bottom: 1px solid border-secondary`, чуть приподнят | Добавить нижнюю границу под `.sg-calendar-day-header` row, выровнять отступы. |
| **Cell hover** | Серый `bg-hover` на всю ячейку | Светло-серый только на cell-inner | Перенести hover на `.sg-calendar-cell-inner:hover`. |
| **Mini mode** | Круги остаются (datepicker-стиль) | n/a (mini — это datepicker) | **Не трогать**: круги в mini оставляем, это правильно для datepicker. Все правки идут только в `.sg-calendar-fullscreen`-скоупе. |
| **Year view** (month grid) | 3×4 квадрата с границей | 3×4 квадрата с тем же стилем что cell | Минимально: проверить отступы; селекторам `selected/current` дать тот же `border-top: 2px solid primary`. |
| **Footer** | Сейчас есть `today-btn` | antd не имеет footer внутри Calendar | Оставить как есть (footer — opt-in, у antd своя кнопка снаружи). |

### 4.2. Структурно — что менять

**Только CSS**. JSX `packages/react/src/components/ui/Calendar.tsx`
**не трогаем** (классы уже эти).

Правила:
- Все правки `selected`/`today`/`hover` сделать через scoping
  `.sg-calendar-fullscreen .sg-calendar-cell-inner` (`.sg-calendar-mini`
  не задеваем).
- Не править tokens.css (используем существующие `--sg-color-primary`,
  `--sg-color-primary-bg`, `--sg-color-border-secondary`).
- Все hover/selected — на `cell-inner`, не на `cell-date` (последний
  оставляем для mini).

### 4.3. Smoke-checklist

1. Переключение `Month/Year` в шапке не плывёт (стрелки не
   меняют положение).
2. Selected day выглядит как полоска сверху ячейки + светлый bg,
   **не как круг**.
3. Today без выбора — полоска primary сверху + цвет числа primary,
   без подложки.
4. Hover показывает светлый фон только на `cell-inner`, не на всей
   `<td>`.
5. Events demo (`/components/calendar` → Events): синие точки лежат
   под числом, не «выезжают» из ячейки на края.
6. Mini-вариант (если есть отдельный demo, например в DatePicker
   popup) — не пострадал (круги остались).
7. Dark theme — все правки `border-top`/`background` идут через
   токены, dark-mode подхватывает.

### 4.4. Acceptance

- `pnpm --filter @skygraph/styles build` зелёный (он же — копирование
  CSS).
- `pnpm --filter demo build` зелёный.
- Глазами на `/components/calendar`: 14 demo-блоков (Basic, Card,
  Controlled, CustomCell, CustomHeader, DisabledDates, Events, Locale,
  MultipleSelection, RangeSelection, TokensOverride, Unstyled,
  WeekNumbers, YearMode) — все читаются, ничто не сломалось.
- DOM-классы прежние — `Calendar.tsx` не правился (это критично:
  если правил — фиксируй в `decisions/T-React-Polish.md`).

---

## 5. Задача C — Pagination без «прыжков» (P0, ~1-2 часа)

### 5.1. Что прыгает

`buildPages(current, total)` (`packages/react/src/components/ui/Pagination.tsx:236`):

```ts
function buildPages(current, total) {
  if (total <= 7) return Array.from({length: total}, (_, i) => i+1)
  const pages = [1]
  if (current > 3) pages.push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
}
```

При current=1 на 50 страницах: `[1,2,3,'...',50]` → 5 элементов.
При current=5: `[1,'...',4,5,6,'...',50]` → 7 элементов.
При current=50: `[1,'...',48,49,50]` → 5 элементов.

То есть число кнопок **гуляет 5 ↔ 7**. Плюс `.sg-pagination-item`
имеет `min-width: var(--sg-height-md)` — двузначные числа раздувают
кнопку шире однозначных. Третья причина — ellipsis-`<span>` имеет тот
же `min-width`, но без `border`, отчего смотрится как пропуск.

### 5.2. Что менять

Три правки, каждая независимая:

**1) Фиксированная ширина item.** В `pagination.css`:

```css
.sg-pagination-item {
  /* ... */
  min-width: var(--sg-height-md);
  width: var(--sg-height-md);   /* добавить */
  padding: 0;                    /* убрать боковой padding — width уже фиксирован */
}
```

`--sg-height-md` = 32px, помещает «999». Если рассчитываем на 10000+
страниц — параметризовать через CSS-var `--sg-pagination-item-w` с
дефолтом `var(--sg-height-md)`.

**2) Фиксированный размер окна в `buildPages`.** Цель — **всегда
возвращать одно и то же число слотов** (по умолчанию 7):

```ts
function buildPages(current: number, total: number, siblingCount = 1): (number | '...')[] {
  // Total slots = first + last + currentSibling*2 + 2 dots = 5 + 2*siblingCount
  const totalSlots = 5 + 2 * siblingCount

  if (total <= totalSlots) {
    return Array.from({length: total}, (_, i) => i + 1)
  }

  const left  = Math.max(current - siblingCount, 1)
  const right = Math.min(current + siblingCount, total)

  const showLeftDots  = left > 2
  const showRightDots = right < total - 1

  if (!showLeftDots && showRightDots) {
    // 1 2 3 4 5 ... N
    const leftCount = 3 + 2 * siblingCount
    return [...range(1, leftCount), '...', total]
  }
  if (showLeftDots && !showRightDots) {
    // 1 ... N-4 N-3 N-2 N-1 N
    const rightCount = 3 + 2 * siblingCount
    return [1, '...', ...range(total - rightCount + 1, total)]
  }
  // 1 ... c-1 c c+1 ... N
  return [1, '...', ...range(left, right), '...', total]
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
```

Гарантия: длина результата всегда `totalSlots` при `total >
totalSlots`. Контейнер не меняет ширину.

Добавить опциональный пропс в `PaginationProps`:
```ts
/** Number of pages to show around the current one. @default 1 */
siblingCount?: number
```
Со значением по умолчанию 1 (старое поведение по окну ±1).

**3) Ellipsis выровнять с item.** В `pagination.css`:

```css
.sg-pagination-ellipsis {
  /* ... */
  min-width: var(--sg-height-md);
  width: var(--sg-height-md);
  /* убрать letter-spacing: 2px — он визуально «съезжает» */
}
```

### 5.3. Опционально (не обязательно в этот стрим)

Подсветка активной страницы анимировать `transform: translateX(...)`
на абсолютной подложке — как у antd: рамка скользит между ячейками.
Это требует:
- абсолютный `::after` или underlay-`<span>` на родителе;
- `useLayoutEffect` для расчёта оффсета активной кнопки;
- transition `transform 180ms cubic-bezier(0.645, 0.045, 0.355, 1)`.

Если останется время — реализовать. Иначе оставить заметку в
`findings/T-React-Polish.md`.

### 5.4. Тест

`packages/react/__tests__/Pagination.spec.tsx` (создать, если нет):

```ts
import { buildPages } from '@skygraph/react/components/ui/Pagination'

test('returns fixed slot count for large totals', () => {
  for (let cur = 1; cur <= 50; cur++) {
    expect(buildPages(cur, 50)).toHaveLength(7)
  }
})

test('returns all pages when total <= slot count', () => {
  expect(buildPages(1, 5)).toEqual([1,2,3,4,5])
  expect(buildPages(3, 7)).toEqual([1,2,3,4,5,6,7])
})

test('left-side window', () => {
  expect(buildPages(1, 20)).toEqual([1,2,3,4,5,'...',20])
})

test('middle window', () => {
  expect(buildPages(10, 20)).toEqual([1,'...',9,10,11,'...',20])
})

test('right-side window', () => {
  expect(buildPages(20, 20)).toEqual([1,'...',16,17,18,19,20])
})
```

Если `buildPages` сейчас не экспортируется — экспортировать
именованным `export function buildPages`. Это **внутренний** утиль,
но экспорт оправдан тестом.

### 5.5. Acceptance

- `pnpm --filter @skygraph/react test` зелёный (включая новые тесты).
- `pnpm --filter @skygraph/react typecheck` зелёный.
- Глазами на `/components/pagination`: при кликах по цифрам блок
  **не меняет ширину**, не двигается ни на пиксель.
- На странице Table → Pagination (где встроенная пагинация) — то же.
- Двузначные и однозначные цифры выглядят одинаково по габаритам
  кнопки.

---

## 6. Задача D — Diagram: линии, углы, пересечения, лаги (P0, ~4-6 часов)

### 6.1. Что сейчас (диагностика)

Файлы:
- `packages/react/src/components/complex/Diagram/Diagram.tsx`
  (рендер, `renderEdge` — обычная функция, не компонент).
- `packages/core/src/engines/graph/router.ts` (L-route +
  A* + перпендикулярные стабы).
- `packages/styles/components/diagram.css`.

Видимые проблемы:

| # | Симптом | Причина | Фикс |
|---|---|---|---|
| 1 | Углы 90° «ужасно прямые» | `pointsToPath()` рендерит только `M`/`L`, `stroke-linejoin: round` скругляет только внутреннюю кромку штриха, не геометрию | Постпроцесс: каждый внутренний vertex заменить на дугу `A r r 0 0 sweep …`. Радиус — параметр (`cornerRadius`, default 8) |
| 2 | Линии накладываются на пересечениях без визуального разделения | jump-overs не реализованы | Перед сериализацией пути собирать список «нижних» сегментов, верхние при пересечении рисуют арку (см. §6.3) |
| 3 | Edges «дергаются» при drag | `renderEdge` зовётся в `nodes.map` каждый ре-рендер; `routeOrthogonal` (включая A*) исполняется заново на каждое движение мыши | Мемоизировать пути по ключу `(edge.id, fromBoundsHash, toBoundsHash, obstaclesHash)`. Hash — конкатенация округлённых координат |
| 4 | Edge упирается в node без стрелки | `<path>` без `marker-end` | Добавить `<defs><marker id="sg-edge-arrow" …/>` в SVG и `marker-end="url(#sg-edge-arrow)"`. Опциональная пропа `arrow?: boolean \| 'end' \| 'both' \| 'none'`, default `'end'` |
| 5 | Edge выходит из угла node (anchor `ne`/`sw`) под диагональю | `endpointWorldPoint` отдаёт реальную позицию угла, а `sourceBounds` вычисляет «ближайшую сторону» — получается стуб через перпендикуляр от угла | Если `anchor === 'corner'` И `routing === 'orthogonal'` — игнорировать anchor, начинать с середины ближайшей стороны (как делает X6 при `port="auto"`). Альтернатива — отдельный enum `anchorPolicy: 'corner' \| 'side' \| 'auto'` |
| 6 | A* медленный при `routeAroundNodes: true` на 50+ нодах | Quadratic open-set (`open.splice` + линейный поиск best `f`) | Заменить на бинарную кучу min-heap (cost-priority queue). Это уже стандартная оптимизация A* |

### 6.2. Открытые референсы

| Тема | Где смотреть |
|---|---|
| **Скругление углов ортогональной линии** (arc-corners algorithm) | mxGraph: `mxConnector.js` → `paintCurvedLine` / `arcTo`; современный форк MaxGraph https://github.com/maxGraph/maxGraph/blob/main/packages/core/src/view/shape/edge/AbstractEdgeShape.ts |
| | yEd / yWorks: реализация в `RoutedEdgeStyle` (только идея — закрытый код, но описана в Wiki «Orthogonal Edge Router») https://docs.yworks.com/yfiles-html/dguide/layout/edge_routing/orthogonal_router.html |
| | draw.io / mxGraph open-source: `RoundConnector` рендер, https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/shape/mxConnector.js — функция `paintLine` с `arcSize` |
| | React-Flow: внутренний `getSmoothStepPath` (TS), https://github.com/xyflow/xyflow/blob/main/packages/system/src/utils/edges/smoothstep-edge.ts — короткая реализация: каждый внутренний угол → пара `L` + `Q` |
| | Mermaid: `dagre-d3-renderer`, конкретно `intersectRect` + `lineCurves`, https://github.com/mermaid-js/mermaid/blob/develop/packages/mermaid/src/dagre-wrapper/edges.ts (использует `d3-shape` curveBasis/curveLinear) |
| | Eclipse ELK: `RoundedPolyline` рендер edges, спецификация https://www.eclipse.org/elk/reference/options/org-eclipse-elk-edgeRouting.html |
| **Пересечения "jump-over"** | Graphviz dot: атрибут `splines=ortho` + `edge[concentrate=true]`. Алгоритм jump-arc описан в "An open graph visualization system…" (E.R.Gansner), https://www.graphviz.org/pdf/dotguide.pdf §4.4 |
| | yEd "Cross routing line bumps" — описание визуала: https://yed.yworks.com/support/qa/3221/edges-jumping-over-crossing-edges |
| | yFiles: класс `BridgeManager` (концепция bridge-style: `gap`, `arc`, `two-sides`, `none`), https://docs.yworks.com/yfilesneo/api/de/yworks/yfiles/view/BridgeManager.html |
| | JointJS: `link.bridges` (out-of-the-box jump-over), https://docs.jointjs.com/learn/features/links/bridges/ — open-source-портабельная идея |
| | X6 (AntV): `connectorBridge` опция, https://x6.antv.antgroup.com/api/registry/connector — алгоритм поиска пересечений: для каждой пары сегментов вычислить пересечение, у "верхнего" заменить ε-окрестность точки на полудугу |
| **Стрелки на конце** | SVG `<marker>` спецификация: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker — стандартный путь для edges |
| | React-Flow default arrowhead: https://github.com/xyflow/xyflow/blob/main/packages/system/src/components/Edges/MarkerDefinitions.tsx — готовый шаблон markup |
| **Кэширование путей при drag** | Cytoscape.js perf doc: https://js.cytoscape.org/#performance — рекомендация мемоизировать `renderedPosition` и не пересчитывать edges, чьи endpoints не изменились |
| | React-Flow useNodesState perf тред: https://github.com/xyflow/xyflow/discussions/2841 — пример «edge path memo key = (sourceId, sourceX, sourceY, targetX, targetY)» |

### 6.3. План работ

#### 6.3.1. Скруглённые углы — `roundedCornersPath` (P0)

Расширить `packages/core/src/engines/graph/router.ts`. Не трогать
существующий `pointsToPath` (back-compat). Добавить:

```ts
export interface RoundedCornersOptions {
  /** Corner radius in world units. Default 8. */
  radius?: number
}

/**
 * Build an SVG path d-attribute from an orthogonal polyline, replacing
 * every interior 90° vertex with an arc of the given radius. The arc
 * stays inside the original turn (sweep direction picked from the
 * cross-product sign of the incoming/outgoing legs).
 *
 * Algorithm:
 *   For each interior vertex Vi with neighbours V(i-1) and V(i+1):
 *     - Compute the two unit vectors u = (V(i-1) - Vi).normalize()
 *       and v = (V(i+1) - Vi).normalize().
 *     - Effective radius r = min(radius, length(V(i-1)..Vi)/2,
 *       length(Vi..V(i+1))/2).
 *     - Start of arc: P_in = Vi + u*r
 *     - End of arc:   P_out = Vi + v*r
 *     - Sweep flag from sign of cross(u, v) (handles all four 90°
 *       corners deterministically).
 *     - Emit: ...L P_in A r r 0 0 sweep P_out
 *
 * Degenerate cases (collinear vertices, zero-length segments) collapse
 * to a plain L — the existing `compressCollinear` already strips them
 * before this stage.
 */
export function roundedCornersPath(
  points: readonly Point[],
  opts: RoundedCornersOptions = {},
): string {
  // …implementation
}
```

В `Diagram.tsx` → `buildEdgePath` для `routing === 'orthogonal'`
вызывать `roundedCornersPath(points, { radius: cornerRadius })`
вместо `pointsToPath(points)`. Радиус — через новый проп
`edgeCornerRadius?: number` (default 8).

**Тесты** (`packages/core/src/__tests__/router.test.ts`):

```ts
test('rounded path emits arc for each interior corner', () => {
  const d = roundedCornersPath([[0,0],[100,0],[100,100]], { radius: 8 })
  // expect M 0 0 L 92 0 A 8 8 0 0 1 100 8 L 100 100
  expect(d).toMatch(/^M 0 0 L 92 0 A 8 8 0 0 1 100 8 L 100 100$/)
})

test('rounded path collapses to L when segments too short', () => {
  const d = roundedCornersPath([[0,0],[5,0],[5,5]], { radius: 8 })
  // segment length 5 < 2*radius → r clamps to 2.5 (half)
  expect(d).toMatch(/A 2\.5 2\.5/)
})

test('rounded path no-op for 2-point polyline', () => {
  expect(roundedCornersPath([[0,0],[100,100]])).toBe('M 0 0 L 100 100')
})
```

#### 6.3.2. Jump-overs на пересечениях (P1)

Включается через новый проп `edgeBridges?: 'arc' | 'gap' | 'none'`
(default `'arc'`). Опция применяется **только для orthogonal-edges**.

Алгоритм (минимальная версия):

1. После расчёта всех путей, преобразовать каждый в список
   осевых сегментов `Segment { kind: 'h'|'v', x0, y0, x1, y1,
   edgeId, idx }`.
2. Для каждой пары `(h, v)` найти пересечение: точка лежит на обоих
   сегментах если `v.x ∈ [h.x0..h.x1]` И `h.y ∈ [v.y0..v.y1]`. Это
   единственный нетривиальный тест — два параллельных сегмента
   пересекаться не могут (или они полностью collinear, что должно
   быть отдельной заботой A*-роутера).
3. Каждое пересечение получает «верхний» edge — для детерминизма
   выбираем по `edgeId` (lexicographic). Нижний edge остаётся как
   есть.
4. У верхнего edge на пересекаемом сегменте в точке (x*, y*) с
   радиусом `bridgeRadius = 4` (default) вставляется арка: разрыв
   `[x* - r .. x* + r]` (или по y, если сегмент вертикальный) →
   `... L (x*-r,y*) A r r 0 0 1 (x*+r,y*) L ...`.

Реализуется как ещё один постпроцессор после
`roundedCornersPath`:

```ts
export interface BridgeIntersectionsOptions {
  /** Bridge radius in world units. Default 4. */
  radius?: number
  /** Style: 'arc' (default) or 'gap' (just split segment with a 2*r hole). */
  style?: 'arc' | 'gap'
}

export function bridgeIntersections(
  paths: Map<string, readonly Point[]>,   // edgeId → polyline
  opts?: BridgeIntersectionsOptions,
): Map<string, readonly Point[]>          // edgeId → polyline with bridge vertices inserted
```

Затем каждый результат прогоняется через `roundedCornersPath`.

**Внимание**: bridge-точки не должны попасть в `compressCollinear`,
поэтому добавлять их **после** компрессии.

Если за P0 не успеваем — `'arc'`-режим оставляем в backlog, в
`bridgeIntersections` сразу возвращаем `paths` без изменений и
дописываем TODO в `findings/T-React-Polish.md`.

#### 6.3.3. Стрелки на конце (P0, лёгкое)

В `Diagram.tsx` в `<svg>` добавить `<defs>` один раз на компонент:

```tsx
<defs>
  <marker
    id={`sg-edge-arrow-${instanceId}`}
    viewBox="0 0 10 10"
    refX="9" refY="5"
    markerWidth="7" markerHeight="7"
    orient="auto-start-reverse"
  >
    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--sg-diagram-edge-color)" />
  </marker>
</defs>
```

`instanceId` — `useId()` чтобы избежать коллизий при нескольких
диаграммах на странице.

На `<path className="sg-diagram-edge">` повесить
`markerEnd={`url(#sg-edge-arrow-${instanceId})`}` для edges, где
направление имеет смысл (т.е. для всех ориентированных рёбер по
умолчанию). Добавить проп:

```ts
arrow?: boolean | 'end' | 'start' | 'both' | 'none'  // default 'end'
```

CSS поправка в `diagram.css`:

```css
.sg-diagram-edge[data-arrow='end']   { /* marker via attr; nothing here */ }
.sg-diagram-edge-hover-stroke { stroke: var(--sg-diagram-edge-color-hover); }
/* hovered edge → marker должен тоже подсветиться */
.sg-diagram-edge:hover { stroke: var(--sg-diagram-edge-color-hover); }
```

Сам marker наследует цвет родителя через `fill="context-stroke"`
(SVG 2) — но поддержка неполная, поэтому **проще**:
завести **два** marker-определения — обычный и `:hover` — и
переключать через `markerEnd` атрибут с `data-state`. Минимум на P0
оставить один цвет, hover не подсвечивать стрелку — детально в
`findings/`.

#### 6.3.4. Кэширование путей (P0, главное против лагов)

Сейчас в `DiagramInner`:

```tsx
{edges.map((edge) => renderEdge(graph, edge, boundsById, ...))}
```

Каждый рендер пересчитывает все пути. Заменить на мемоизированную
сборку:

```tsx
type EdgeKey = string
type EdgeCache = Map<EdgeKey, { d: string; obstacleCount: number }>

const edgeCacheRef = useRef<EdgeCache>(new Map())

const edgePaths = useMemo(() => {
  const next: EdgeCache = new Map()
  for (const edge of edges) {
    const k = makeEdgeKey(edge, boundsById, routeAroundNodes, routingOptions)
    const cached = edgeCacheRef.current.get(k)
    if (cached) {
      next.set(edge.id, cached)
      continue
    }
    const path = computeEdgePath(graph, edge, boundsById, routeAroundNodes, routingOptions)
    next.set(edge.id, path)
  }
  edgeCacheRef.current = next
  return next
}, [edges, boundsById, routeAroundNodes, routingOptions, graph])

function makeEdgeKey(
  edge: GraphEdge,
  bounds: ReadonlyMap<NodeId, AABB>,
  routeAround: boolean,
  opts: DiagramProps['routingOptions'],
): string {
  const fb = bounds.get(edge.from.node)
  const tb = bounds.get(edge.to.node)
  const fk = fb ? `${fb.x.toFixed(0)},${fb.y.toFixed(0)},${fb.w.toFixed(0)},${fb.h.toFixed(0)}` : ''
  const tk = tb ? `${tb.x.toFixed(0)},${tb.y.toFixed(0)},${tb.w.toFixed(0)},${tb.h.toFixed(0)}` : ''
  const obs = routeAround && edge.routing === 'orthogonal'
    ? hashOtherBounds(bounds, edge.from.node, edge.to.node)
    : ''
  const fromAnchor = typeof edge.from.anchor === 'string' ? edge.from.anchor : `s${edge.from.anchor.s}`
  const toAnchor   = typeof edge.to.anchor   === 'string' ? edge.to.anchor   : `s${edge.to.anchor.s}`
  return `${edge.id}|${edge.routing}|${fromAnchor}|${toAnchor}|${fk}|${tk}|${obs}`
}
```

`hashOtherBounds` — отсортированный список `id:x,y,w,h` всех прочих
нодов. Округление до целых даёт устойчивость к субпиксельным
скачкам.

После этой правки drag одной ноды на 50-нодовом графе пересчитывает
**только** edges, инцидентные dragged-ноде (и edges, у которых эта
нода — obstacle), а не все.

#### 6.3.5. min-heap A* (P1, опциональная оптимизация)

Если после кэширования лаг исчез — пропустить и записать в
`findings/T-React-Polish.md` "не понадобилось". Если на больших
графах (`LargeGraph.demo`) всё ещё ощутимо — заменить `open` массив
в `aStarRoute` на бинарную кучу. Тесты на router’е уже есть,
повторно пройти.

### 6.4. Smoke-checklist

1. `/components/diagram → Orthogonal routing`: углы скруглены, edges
   не упираются торцем в node — есть стрелка.
2. `Orthogonal routing` при `draggable`: тащим B вверх-вниз —
   только ребра, привязанные к B, перестраиваются мгновенно;
   остальные не «дергаются».
3. `LargeGraph` demo (~50 нод): drag любой ноды — fps ≥ 30
   (визуально гладко). Раньше — отчётливые «прыжки» при больших
   графах.
4. Скрещивающиеся orthogonal edges показывают jump-over (опционально,
   если §6.3.2 успели).
5. Anchor `ne`/`sw` и т.п. — edge всё ещё выходит из стороны
   прямоугольника, а не из угла (§6.1 строка 5).
6. Печать `ref.print()` — стрелки и арки попадают в PDF корректно
   (см. demo `print/DiagramPrint.demo.tsx`).

### 6.5. Acceptance

- `pnpm --filter @skygraph/core test` зелёный (включая новые
  тесты на `roundedCornersPath`, опц. `bridgeIntersections`).
- `pnpm --filter @skygraph/core typecheck` зелёный.
- `pnpm --filter @skygraph/react typecheck` зелёный.
- `pnpm --filter demo build` зелёный.
- Глазами по всем 11 demo `examples/demo/src/demos/diagram/*` —
  ничего не сломано визуально.
- `findings/T-React-Polish.md` фиксирует, что из P1 (jump-over,
  min-heap A*) не успели.

---

## 7. Команды

```bash
pnpm --filter demo typecheck
pnpm --filter demo build
pnpm --filter demo dev

pnpm --filter @skygraph/core typecheck
pnpm --filter @skygraph/core test

pnpm --filter @skygraph/react typecheck
pnpm --filter @skygraph/react test
pnpm --filter @skygraph/styles build
```

Глобальные `pnpm typecheck/build/test/install/clean/lint` —
**НЕЛЬЗЯ** (CHARTER §2.2).

---

## 8. Финал

Отчёт — `docs/_streams/done/T-React-Polish.md`:
- какие файлы изменены (`SchemaFormEditorDemo.tsx`, `calendar.css`,
  `pagination.css`, `Pagination.tsx`, `router.ts`, `Diagram.tsx`,
  `diagram.css`, тесты);
- скриншоты до/после для Calendar (Basic + Events + YearMode),
  Pagination (страницы 1, 5, 50, последняя) и Diagram
  (Orthogonal routing — статика + drag-кадр + LargeGraph);
- если опциональный slider-эффект для Pagination не успели —
  упомянуть;
- если P1-задачи Diagram (jump-over, min-heap A*) не успели —
  фиксировать в `findings/T-React-Polish.md` со ссылкой на §6.3.2 /
  §6.3.5;
- любые DOM-правки в `Calendar.tsx`/`Pagination.tsx` и любые
  изменения публичных типов в `@skygraph/core`/`@skygraph/react`
  отдельно указать в `decisions/T-React-Polish.md`.
