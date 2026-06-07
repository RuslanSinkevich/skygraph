import type { DiagramDocStrings } from './en'

/** Russian translations — keys must mirror `diagramDocEn` exactly. */
export const diagramDocRu: DiagramDocStrings = {
  pageTitle: 'Diagram',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbDiagram: 'Diagram',
  pageLead:
    'Визуальный слой для небольших редакторов на GraphEngine — DOM-узлы + SVG-overlay рёбер на базе `useGraph()`. Поддерживает drag-and-drop, wheel-zoom, pan-канвы, single / multi / lasso выбор, snap-to-grid, OBB-вращение и императивный `print()` через ref.',
  pageWhen1: 'Компактный flowchart или dependency-graph поверх реактивного state.',
  pageWhen2:
    'Visio-подобный редактор, где топология живёт в `@skygraph/core`, а визуальный слой — тонкая Vue-проекция.',
  pageWhen3:
    'Композиция с FormEngine / TableEngine / TreeEngine (например визуализация связей между строками таблицы).',

  demoBasicTitle: 'Basic',
  demoBasicDesc:
    'Три rect-узла и два прямых ребра. Рёбра привязаны к якорям контура (`nw`, `ne`, `se`, `sw`).',
  demoDraggableTitle: 'Draggable',
  demoDraggableDesc: 'Зажмите и тащите любой узел — `draggable` включает встроенный мувер.',
  demoZoomableTitle: 'Zoomable',
  demoZoomableDesc: 'Зажмите `Ctrl` (или `⌘` на macOS) и крутите колесо — зум in/out.',
  demoPannableTitle: 'Pannable',
  demoPannableDesc:
    'Drag средней кнопкой мыши панит, обычное колесо скроллит. С `zoomable` `Ctrl + wheel` остаётся на зум.',
  demoSnapToGridTitle: 'Snap to grid',
  demoSnapToGridDesc:
    '`snap-to-grid="20"` округляет drag-end-координаты к шагу 20 world-units и включает фон-сетку.',
  demoBezierTitle: 'Bezier-маршрутизация',
  demoBezierDesc:
    'Кубические Bezier-рёбра, контрольные точки перпендикулярны ближайшей грани — таскайте узлы и смотрите как кривые подстраиваются.',
  demoUndoRedoTitle: 'Undo / Redo',
  demoUndoRedoDesc:
    'Встроенная история `GraphEngine`. Тащите узлы, затем `Ctrl+Z` / `Ctrl+Shift+Z` (или кнопки) — пройдитесь по таймлайну.',
  demoContextMenuTitle: 'Контекстное меню',
  demoContextMenuDesc:
    '`@node-context-menu` / `@edge-context-menu` / `@canvas-context-menu` открывают своё floating-меню.',
  demoMultiSelectTitle: 'Multi-select (Ctrl+click)',
  demoMultiSelectDesc:
    '`selection-mode="multi"` переключает узлы по `Ctrl+click` / `Shift+click`. Используйте `lasso` для рамки.',
  demoOBBTitle: 'Повёрнутые узлы (OBB)',
  demoOBBDesc:
    'У каждого transform нетривиальный `rot`; движок всё равно считает корректные AABB через проекцию OBB — роутинг продолжает работать.',
  tableDiagramApi: 'Diagram API',
  tableUseGraphApi: 'useGraph(options) Options',
  tableDiagramExpose: 'Методы ref-а SgDiagram',

  propGraph: 'Инстанс GraphEngine (из `useGraph()`)',
  propState: 'Реактивный snapshot из `useGraph()`',
  propWidth: 'Ширина канвы',
  propHeight: 'Высота канвы',
  propClassName: 'Класс на корневом элементе',
  propStyle: 'Inline-стиль на корневом элементе',
  propUnstyled: 'Сбросить дефолтные sg-diagram классы',
  propDraggable: 'Click-and-drag для перемещения узлов',
  propZoomable: 'Wheel-zoom (`Ctrl + wheel`)',
  propPanable: 'Обычное колесо скроллит + drag средней кнопкой панит',
  propSnapToGrid: 'Округлить drag-end к шагу N world-units',
  propRouteAroundNodes: 'Использовать остальные узлы как препятствия для ortho-роутера',
  propRoutingOptions:
    'Тонкая настройка A*-роутера (gridSize, inflate, maxNodes, cornerRadius, curvature)',
  propEdgeArrows: 'Рисовать стрелки на концах рёбер (default true)',
  propSelectionMode: '`single` (замена), `multi` (Ctrl+click) или `lasso` (рамка)',
  propSelection: 'Контролируемые id выбранных узлов',
  propNodeActions: 'Hover-toolbar над каждым узлом',
  propEdgeActions: 'Hover-toolbar рядом с каждым ребром',
  propFileName: 'Базовое имя файла для `ref.print()`',
  slotNode: 'Кастомный body узла — Vue-идиома для React `renderNode`',
  propEmitSelectionChange: 'Эмитится при изменении набора выбранных',
  propEmitNodeContextMenu: 'Right-click по узлу — `{ event, node }`',
  propEmitEdgeContextMenu: 'Right-click по ребру — `{ event, edge }`',
  propEmitCanvasContextMenu: 'Right-click по пустой канве — `{ event, point }`',

  propUseGraphCore: 'Внешний Core (для кросс-движковой координации)',
  propUseGraphName: 'Опциональное debug-имя движка',

  exposePrint: 'Запустить печать текущей канвы через `printElement`',
}
