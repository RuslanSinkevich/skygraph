# T-Diagram-Polish — Decisions

## D1. `createNode({ type, position })` — не добавлен, остался `addNode`

Карта стрима допускает добавление опционального `createNode` в `GraphEngine`.
Решено сохранить только `addNode(init)`:

- `addNode({ transform, outline, data })` уже покрывает DnD-кейс полностью.
- Шорткат с параметром `type` требовал бы прошить домен «start/task/
  decision/end» в core. Core по дизайну знает только outline+transform —
  типы и их визуал живут на уровне application/showcase.
- Текущие 11 React-демо и 12 Vue-демо привязаны к `addNode`. Введение
  второго входа усложнило бы API без выигрыша.

Покрытие DnD реализовано на уровне `<Diagram>` через новые опции
`onDropNode` (callback с координатами курсора в мире) и default-handler
`onDragOver = preventDefault`. Showcase сам декодирует `dataTransfer`
и вызывает `graph.addNode(...)`.

## D2. Vue Diagram — переписан с расширением API; старые props/события — backward-compat aliases

Vue `SgDiagram` был сильно урезан по сравнению с React `Diagram`. Чтобы
выполнить acceptance «React-Diagram и Vue-Diagram имеют одинаковый DOM/
классы/props/events», его пришлось пересобрать. Сохранены и помечены
deprecated следующие старые props/события (чтобы не ломать существующие
демо/тесты):

| Старое                       | Новое (паритет с React)               |
|------------------------------|----------------------------------------|
| `draggableNodes: boolean`    | `draggable: boolean \| Function`       |
| `panZoom: boolean`           | `panable: boolean` + `zoomable: boolean` |
| `selectedNodeIds: NodeId[]`  | `selection: NodeId[]`                  |
| `@selection-change`          | `@selectionChange`                    |
| `@node-click`                | сохранено; React: callback `onNodeClick` (добавлен) |

Старые имена работают **как алиасы** (если задан новый — он
приоритетный). Зафиксировано отдельным комментарием в `Diagram.vue`.
Удаление старых имён — отдельный breaking-release.

## D3. Router — добавлены `sourceBounds` / `targetBounds`

Чтобы edge выходила перпендикулярно из ближайшей к target грани
source-узла (и наоборот), API `routeOrthogonal` расширен опциями
`sourceBounds` / `targetBounds`. Это **обратно совместимое** добавление:

- Если опции не заданы — старое поведение (L-route или A* на
  obstacles), legacy-тесты в `graph.test.ts` зелёные.
- Если заданы — router переопределяет endpoints в середины
  ближайших граней и прокладывает H-stub/V-stub, чтобы линия
  «выпадала» из узла под прямым углом.

`<Diagram>` (React и Vue) при `routing='orthogonal'` передаёт bounds
этих двух узлов в router автоматически — отдельно опц-ин не нужен.

## D4. `routeAroundNodes` остался opt-in

Включить A*-обходы по умолчанию для каждого orthogonal-edge соблазнительно,
но это даёт O(N·M) поведение при больших графах. Поэтому
`routeAroundNodes={true}` остаётся явным флагом. В showcase «Редактор
процессов» он включён.

## D5. `<Diagram>` `onDropNode` принимает мировые координаты

Вместо того, чтобы передавать абстрактный `{ type, position }`,
обработчик принимает `{ x, y, dataTransfer, event }`. Это позволяет
showcase'у самостоятельно декодировать любой формат — JSON-template,
plain text, drop-зона из стороннего DnD-механизма.

`x` / `y` пересчитаны в координаты мира с учётом текущего `pan` / `zoom`.
