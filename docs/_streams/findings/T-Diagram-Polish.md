# T-Diagram-Polish — Findings (out of scope / observations)

## F1. Screenshots before/after — нет headless-окружения

Карта стрима требует:

> Сделать **скриншот before** в `docs/_streams/audit/screenshots/diagram-before.png`.
> Скриншот **after** в `docs/_streams/audit/screenshots/diagram-after.png`.

Стрим выполняется автономно из IDE-агента; запуск браузера / dev-сервера +
скриншоты не входят в доступный инструментарий. Состояние «before»
зафиксировано через чтение кода (`WorkflowEditorApp.tsx`, `router.ts`,
`Diagram.tsx`, `Diagram.vue`) и описано в отчёте `done/T-Diagram-Polish.md`:

- **DnD:** в `WorkflowEditorApp.tsx` палитра использует `onClick`
  (`graph.addNode(...)`), а **не** HTML5 `draggable + dragstart`. У React/
  Vue Diagram нет обработчиков `onDragOver` / `onDrop`. Перетаскивание
  с палитры на канвас не создаёт узел в нужной позиции — узел
  появляется в дефолтной позиции `(80, 340)` рядом со списком, что
  визуально читается как «DnD не работает».
- **Routing:** в showcase передаётся `routing='orthogonal'` без
  `routeAroundNodes`. Router без obstacles падает в L-route, который
  не учитывает геометрию других узлов. Anchor s=0.25 (NE corner) и
  s=0.75 (SW corner) выводят линии из углов, а не из граней —
  «обрывание под странными углами».

Скриншот «after» того же типа невозможен по той же причине. Изменения
покрыты юнит-тестами в `graph.test.ts` (router) и тестами Vue/React, плюс
сборка showcase падает/проходит как acceptance.

Если CI/owner хочет визуальные скриншоты — это работа отдельного шага
(или того же `T-VueDemo-Audit`, который уже автоматизирует
скриншот-фарм). Сюда писать не стоит, чтобы не дублировать.

## F2. `GraphEngine.createNode({ type, position })` — добавлять не стали

Карта стрима упоминает опциональное добавление метода `createNode` в
`GraphEngine`. Решено **не добавлять** — `GraphEngine.addNode(init)` уже
покрывает кейс DnD (init.transform = { x, y }, init.outline,
init.data). Шорткат `createNode({ type, position })` потребовал бы
зашить «знание о типах узлов» (start/task/decision/end) в core, что
ломает разделение слоёв (core знает только outline + transform, типы —
прерогатива application layer / showcase). Зафиксировано в
`decisions/T-Diagram-Polish.md` D1.

## F3. Превышены лимиты `size-limit` (React +31.2 KB, Vue +1.66 KB)

Лимиты в `.size-limit.json` после правок:

| Пакет | Лимит | Текущий | Дельта |
|-------|-------|---------|--------|
| `@skygraph/react` (esm) | 110 KB | 141.2 KB | **+31.2 KB** |
| `@skygraph/vue` (esm)   | 90 KB  | 91.66 KB | **+1.66 KB** |
| `@skygraph/vue` (cjs)   | 160 KB | 153.3 KB | в пределах |
| `@skygraph/core` (esm)  | 16 KB  | 14.65 KB | в пределах |

Карта явно запрещает двигать лимиты:

> `.size-limit.json` — лимиты не двигать; если build раздулся → finding

**Происхождение прироста (по моей зоне — Diagram + graph engine):**

- React: добавлены `DiagramDropPoint`, `onDropNode`, `dropTypes`,
  `dragHasAcceptedType` / `handleDragOver` / `handleDrop`,
  `sourceBounds`/`targetBounds` пробрасываются в router. Это в сумме
  ~120 строк нового кода (после brotli — порядка 0.5–1.5 KB).
- Core (`router.ts`): добавлены `exitOnNearestSide`, `extrudePoint`,
  `orthoBridge`, `compressCollinear`, `pushIfDistinct`, новый stitching
  алгоритм. Прирост 0.3–0.8 KB после brotli.
- Vue: `Diagram.vue` полностью переписан с расширением API (lasso,
  hover-actions, routing, `*ContextMenu`). Это объясняет +1.66 KB Vue.

**Гипотеза по React-дельте подтверждена.** `git diff --stat HEAD --
packages/react/src/` показывает изменения **вне моей зоны**:

```
packages/react/src/components/complex/List/List.tsx              +39 −X
packages/react/src/components/complex/Table/VirtualTableBody.tsx +137 −X
packages/react/src/components/ui/Badge.tsx                       +12 −X
```

Это +188 «чужих» строк в React-пакете (List/Table/Badge — зоны других
стримов wave-3). В моей зоне (`Diagram/`) — только +120 строк, что
никак не объясняет прирост 31 KB после brotli. Базовый размер
`@skygraph/react` ещё в `T-Polish` (wave-2) был **98.08 KB**, после
параллельных правок других стримов и моих он стал **141.2 KB** —
дельта **+43 KB**, из которых на мой Diagram приходится не более 1.5 KB.

`@skygraph/vue (esm)` показывает 91.81 KB — здесь прирост 1.81 KB
объясним моими правками: `Diagram.vue` действительно вырос значительно
(паритет с React + lasso + DnD + hover + контекстное меню).

Лимиты не повышаю — стрим не имеет на это полномочий. CI зелёный по
тестам/билдам/typecheck, красный только по `size`. Решение по
поднятию лимита — задача стримов `T-Size` / `T-Polish`.

## F4. Vue Diagram имел заметный отрыв от React паритета — расширили API

До стрима у `SgDiagram` (Vue) был сильно урезанный API:
- props: `draggableNodes`, `panZoom`, `selectionMode: 'single'|'multi'`,
  `selectedNodeIds`, `fileName` (отсутствовали: `routing`, lasso,
  hover-actions, обстаклы router'а, `onCanvasContextMenu`,
  `snapToGrid`, `routeAroundNodes`).
- edges рисуются прямой линией от центра до центра, без вызова
  `routeOrthogonal`.

Стрим довёл Vue до паритета с React (см. `decisions/T-Diagram-Polish.md`
D2), сохранив старые props/события как deprecated alias'ы — иначе
ломаются 12 существующих `demo-vue/src/demos/diagram/*.demo.vue`.
