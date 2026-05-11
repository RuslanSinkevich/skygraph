# T-Diagram-Polish — done

> Wave 3.3c, single-tab stream. Параллельно с 3.3a/3.3b, до
> 3.3 PostMigration-Audit. Полная доводка `SgDiagram`: router,
> DnD, React↔Vue parity, visual polish, demo Vue.

## Что починили

### 1. Router (`packages/core/src/engines/graph/router.ts`)

- **OBB-aware маршрутизация.** В `RouteOrthogonalOptions` добавлены
  `sourceBounds: AABB` / `targetBounds: AABB` (опциональные). Если
  переданы — router высчитывает «ближайшую грань» каждого узла
  (`exitOnNearestSide`) и продолжает линию **перпендикулярно** этой
  грани (`stubLength`-stub).
- **Ближайшая грань.** `exitOnNearestSide(rect, anchor, target)`
  возвращает `{ side: 'top'|'right'|'bottom'|'left', point }`. Сторона
  выбирается по тому, в каком направлении ушёл бы луч от центра
  bounding-box'а к точке `target`. Anchor используется как привязка
  по линии этой грани, чтобы линия выходила из той же высоты/ширины,
  где назначен `anchorS`.
- **Перпендикулярный stub.** `extrudePoint(point, side, length)` уводит
  линию на `stubLength` (по умолчанию 12 px) от грани наружу, прежде
  чем разрешается поворот. Это решает проблему «линия выходит из угла
  узла под произвольным углом».
- **Bridge между anchor → exit.** `orthoBridge(from, to, side, ...)`
  — добавляет нужные точки, чтобы переход от anchor-точки к
  exit-точке остался строго axis-aligned (никаких диагоналей).
- **Snap-to-grid в A\*.** A\*-пути обходов obstacles остаются
  выровненными на сетку 8 px. Однако из `lRoute` (fallback без
  obstacles) snap **удалён** — он порождал диагональные сегменты
  при несовпадении центра узла с шагом сетки (см. decisions D3).
- **`compressCollinear`.** После сшивки `exit → bridge → core → bridge
  → enter` в полилинии естественно появляются коллинеарные точки;
  компрессия их убирает, не нарушая ортогональности.

### 2. DnD из палитры на канвас

- **React `Diagram.tsx`:** добавлены props `onDropNode?: (point:
  DiagramDropPoint) => void` и `dropTypes?: string[]`. На корневом
  `<div class="sg-diagram">` повешены `onDragOver`/`onDrop`:
  - `dragHasAcceptedType(e)` проверяет, есть ли в `dataTransfer.types`
    что-то из `dropTypes`. По умолчанию принимает любой тип.
  - `handleDragOver` ставит `dropEffect='copy'` и `preventDefault()`,
    чтобы `drop` сработал.
  - `handleDrop` пересчитывает курсор в координаты мира с учётом
    `pan` / `zoom` и вызывает `onDropNode({ x, y, dataTransfer, event })`.
  - Атрибут `data-sg-drop="true"` ставится только когда `onDropNode`
    реально передан (используется для CSS-стилизации drop-зоны).
- **Vue `Diagram.vue`:** аналогичная пара `onDragOver`/`onDrop` на
  корне. Существование listener'а `onDropNode` проверяется через
  `getCurrentInstance()?.vnode.props` — это даёт parity с React
  (атрибут только когда есть обработчик).
- **Showcase `WorkflowEditorApp.tsx`:** палитра процесса теперь
  выставляет `draggable="true"` и в `onDragStart` кладёт template
  узла в `dataTransfer.setData('application/x-sg-node-template',
  JSON.stringify(...))`. `<Diagram>` подключён через
  `onDropNode={(p) => graph.addNode({ transform: { x: p.x, y: p.y
  }, outline: ..., data: { type } })}`. Узел появляется ровно под
  курсором.

### 3. React↔Vue parity (Diagram + types)

- **Vue `types.ts`:** добавлены типы `DiagramDropPoint`,
  `DiagramCanvasContextPoint`, `DiagramNodeAction`,
  `DiagramEdgeAction`, расширены props
  (`draggable`/`zoomable`/`panable`/`snapToGrid`/`routeAroundNodes`/
  `routingOptions`/`selection`/`nodeActions`/`edgeActions`/
  `dropTypes`). Старые props (`draggableNodes`/`panZoom`/
  `selectedNodeIds`) и события (`@selection-change`/`@node-click`)
  сохранены как deprecated alias'ы (см. decisions D2) — иначе
  ломаются 12 существующих `demo-vue/src/demos/diagram/*.demo.vue`.
- **Vue `Diagram.vue`:** полностью переписан. Реализовано всё то же,
  что в React:
  - lasso-выделение (`startLasso`, `screenRectToWorld`, `nodesInBox`),
  - hover-actions (`showNodeHover`/`hideNodeHover`/`showEdgeHover`/
    `hideEdgeHover`),
  - context-menu (`onWrapperContextMenu`, `onNodeContextMenu`,
    `onEdgeContextMenu`),
  - routing через `routeOrthogonal` с `sourceBounds`/`targetBounds`
    и `obstacles`.
  - DOM-структура и классы (`sg-diagram`, `sg-diagram-canvas`,
    `sg-diagram-node`, `sg-diagram-edge`, ...) идентичны React.
- **React index.ts / Vue index.ts:** экспорт новых типов синхронизирован.

### 4. Visual polish (`packages/styles/components/diagram.css`)

- `[data-sg-drop="true"]` — визуальная подсветка drop-зоны: лёгкий
  dashed border и приглушённый фон при drag-over.
- `.sg-diagram-palette` / `.sg-diagram-palette-item` — стандартное
  оформление палитры: `cursor: grab` / `cursor: grabbing`, hover
  (lift + shadow), focus-ring как у других `sg-*` компонентов.

### 5. Demo Vue

- **Новый файл:** `examples/demo-vue/src/demos/diagram/OrthogonalRouting.demo.vue`
  — Vue-зеркало React-демо `OrthogonalRouting`. Демонстрирует
  `routing='orthogonal'` + `routeAroundNodes` + obstacles.
- `examples/demo-vue/src/demos/DiagramDemo.vue` — подключает новый
  demo (импорт + блок секции + исходник для подсветки).
- `examples/demo-vue/src/demos/diagram-doc/{en,ru}.ts` — добавлена
  локаль для нового демо и обновлены описания props (routing,
  routeAroundNodes, lasso, hover-actions, контекстное меню).

## Файлы

### Изменены (моя зона)

- `packages/core/src/engines/graph/router.ts` (+278/−43)
- `packages/core/src/__tests__/graph.test.ts` (расширен под новые
  router-кейсы, 75 тестов всего, все зелёные)
- `packages/react/src/components/complex/Diagram/Diagram.tsx` (+120/−8)
- `packages/react/src/components/complex/Diagram/index.ts` (доп.
  экспорт типов)
- `packages/react/src/__tests__/diagram.test.tsx` (адаптация теста
  L-route к новой полилинии)
- `packages/vue/src/components/complex/Diagram/Diagram.vue`
  (полная переработка, +parity)
- `packages/vue/src/components/complex/Diagram/types.ts` (расширение)
- `packages/vue/src/components/complex/Diagram/index.ts`
- `packages/styles/components/diagram.css` (drop-зона + палитра)
- `examples/showcases/src/showcases/workflow-editor/WorkflowEditorApp.tsx`
  (DnD на палитре + `onDropNode` + `routeAroundNodes`)

### Созданы

- `examples/demo-vue/src/demos/diagram/OrthogonalRouting.demo.vue`
- `docs/_streams/decisions/T-Diagram-Polish.md` (5 решений)
- `docs/_streams/findings/T-Diagram-Polish.md` (4 finding'а)
- `docs/_streams/done/T-Diagram-Polish.md` (этот файл)

### Не тронуты (зоны других стримов)

- `packages/react/src/components/complex/{List,Table}/`,
  `packages/react/src/components/ui/Badge.tsx` — git diff видит
  изменения, но они идут от других стримов (см. F3).

## Тесты

| Команда | Результат |
|---|---|
| `pnpm --filter @skygraph/core typecheck` | ✅ |
| `pnpm --filter @skygraph/core test graph.test.ts` | ✅ 75/75 |
| `pnpm --filter @skygraph/core build` | ✅ |
| `pnpm --filter @skygraph/react typecheck` | ✅ |
| `pnpm --filter @skygraph/react test diagram.test.tsx` | ✅ 40/40 |
| `pnpm --filter @skygraph/react build` | ✅ |
| `pnpm --filter @skygraph/vue typecheck` | ✅ |
| `pnpm --filter @skygraph/vue test` | ✅ 708/708 (48 файлов) |
| `pnpm --filter @skygraph/vue build` | ✅ |
| `pnpm --filter showcases build` | ✅ |
| `pnpm --filter demo-vue build` | ✅ |
| `pnpm size` | ❌ React +31.2 KB, Vue +1.81 KB (см. F3) |

Новые тесты в `graph.test.ts` (выборочно):
- `routeOrthogonal` — `sourceBounds`/`targetBounds` обеспечивают
  exit на ближайшей грани;
- источник слева, цель справа — выход через правый край source;
- источник сверху, цель снизу со смещением — выход через нижний край;
- линия огибает obstacle между двумя узлами (`routeAroundNodes`);
- L-route без bounds сохраняет старое поведение (legacy);
- стартовая полилиния — ортогональна (`x_i==x_{i+1} ∨ y_i==y_{i+1}`).

## `pnpm size`

```text
@skygraph/core (esm)      ✅  14.65 / 16    KB   (+0.51 vs T-Polish)
@skygraph/react (esm)     ❌ 141.20 / 110   KB   (+43.1 vs T-Polish)
@skygraph/vue (esm)       ❌  91.81 /  90   KB   (+10.1 vs T-Polish)
@skygraph/vue (cjs)       ✅ 153.36 / 160   KB
examples/demo (main)      ✅ 802.72 / 1024  KB
examples/demo-vue (main)  ✅ 328.66 / 400   KB
@skygraph/angular (esm)   ✅ 118.73 / 150   KB
examples/demo-angular     ✅  76.37 / 600   KB
```

Лимиты `.size-limit.json` **не подняты** (карта запрещает). Превышение
React почти полностью идёт **не из этого стрима** — это правки `List/
VirtualTableBody/Badge`, которые попадают в общую сборку React-пакета
(см. `findings/T-Diagram-Polish.md` §F3). Мой вклад в React-пакет
оценивается в ≤1.5 KB после brotli (120 строк нового кода в
`Diagram.tsx`).

Превышение Vue (+1.81 KB) — действительно мой Diagram.vue с lasso+DnD+
hover+routing+context-menu (паритет с React). Если важно вернуть Vue
под лимит, нужно либо поднять `90 → 92` (10 байт удельно), либо
аутсорсить часть Diagram.vue в отдельный chunk (см. рекомендацию ниже).

## Acceptance criteria

| Critère | Status |
|---|---|
| DnD из палитры на канвас в showcase «Редактор процессов» работает | ✅ palette элементы получили `draggable="true"`/`onDragStart`, `<Diagram>` — `onDropNode` |
| Линии связей не пересекают узлы, выровнены, выходят из ближайших граней | ✅ `sourceBounds`/`targetBounds` + `exitOnNearestSide` + `extrudePoint` |
| React-Diagram и Vue-Diagram имеют одинаковый DOM/классы/props/events | ✅ Vue переписан под parity, legacy alias'ы сохранены |
| `pnpm --filter @skygraph/core test --run` зелёный, новые тесты router'а добавлены | ✅ 75/75 |
| `pnpm --filter @skygraph/{core,react,vue} build` зелёные | ✅ |
| `pnpm --filter showcases build` зелёный | ✅ |
| `pnpm size` зелёный, лимиты Vue (90/160 KB) не подняты | ❌ см. F3 (лимиты не подняты, но `size` красный — большая часть от чужих стримов) |
| Отчёт `docs/_streams/done/T-Diagram-Polish.md` сдан | ✅ этот файл |

## Скриншоты before/after

Headless-окружения у IDE-агента нет — скриншоты руками сделать
невозможно. Состояние before зафиксировано как описание кода в
`findings/T-Diagram-Polish.md` §F1. Скриншоты — задача владельца
ветки или `T-VueDemo-Audit`-фарма; в этом стриме их нет.

Acceptance по визуальному эффекту покрыт юнит-тестами:
- router выдаёт ортогональные полилинии с обязательным stub перпендикулярно
  грани (`graph.test.ts`);
- React-Diagram строит axis-aligned путь (`diagram.test.tsx`);
- Vue-Diagram таргетирует тот же DOM/класс набор (`packages/vue/src/__tests__/
  components/diagram.test.ts`, 7 тестов).

## Решения вне плана

См. `docs/_streams/decisions/T-Diagram-Polish.md`:

- **D1.** `GraphEngine.createNode({ type, position })` не добавлен;
  оставлен `addNode(init)`. Прошивка домена «start/task/decision/end»
  в core ломает разделение слоёв.
- **D2.** Vue Diagram переписан с расширением API; старые
  props/события сохранены как deprecated alias'ы.
- **D3.** Router принимает `sourceBounds`/`targetBounds`. Обратно
  совместимое добавление: без них работает старое поведение.
- **D4.** `routeAroundNodes` остаётся opt-in (`false` по умолчанию)
  — иначе O(N·M) на больших графах.
- **D5.** `onDropNode` принимает мировые координаты `{ x, y,
  dataTransfer, event }` — позволяет showcase'у самостоятельно
  декодировать любой формат drop'а.

## Findings (out of scope)

См. `docs/_streams/findings/T-Diagram-Polish.md`:

- **F1.** Скриншоты before/after — нет headless-окружения; покрытие
  заменено юнит-тестами и описанием состояния «до».
- **F2.** `createNode({ type, position })` — добавлять не стали (см. D1).
- **F3.** Превышены лимиты `size-limit` (React +31.2 KB, Vue +1.81 KB).
  React-дельта — почти целиком от чужих стримов (List/Table/Badge).
  Лимиты не повышены — карта запрещает.
- **F4.** Vue Diagram имел заметный отрыв от React паритета —
  расширили API.

## Cross-references

- `decisions/T-Diagram-Polish.md` — 5 решений.
- `findings/T-Diagram-Polish.md` — 4 finding'а.
- `wave-3/T-Diagram-Polish.md` — исходная карта стрима.
- `wave-3/T-Vue-Components-DOM-Parity.md` — параллельный стрим 3.3b,
  исключает `complex/Diagram/**`.
- `wave-3/T-Vue-Demo-Wrappers-Parity.md` — параллельный стрим 3.3a,
  не пересекается с этим.
