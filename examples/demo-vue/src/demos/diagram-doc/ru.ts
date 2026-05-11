import type { DiagramDocStrings } from './en'

/** Russian translations — keys must mirror `diagramDocEn` exactly. */
export const diagramDocRu: DiagramDocStrings = {
  pageTitle: 'Diagram',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbDiagram: 'Diagram',
  pageLead:
    'Визуальный слой для GraphEngine — DOM-узлы + SVG-overlay рёбер на базе `useGraph()`. Поддерживает drag-and-drop, wheel-zoom, pan-канвы, single / multi выбор и императивный `print()` через ref.',
  pageWhen1: 'Flow / org-chart / dependency-graph поверх реактивного state.',
  pageWhen2:
    'Visio-подобный редактор, где топология живёт в `@skygraph/core`, а визуальный слой — тонкая Vue-проекция.',
  pageWhen3:
    'Композиция с FormEngine / TableEngine / TreeEngine (например визуализация связей между строками таблицы).',

  demoBasicTitle: 'Basic',
  demoBasicDesc:
    'Три rect-узла и два прямых ребра. Рёбра привязаны к якорям контура (`nw`, `ne`, `se`, `sw`).',

  demoCustomNodeTitle: 'Свой узел',
  demoCustomNodeDesc:
    'Слот `#node` рисует свою карточку — Vue-идиома для React `renderNode={...}`.',

  demoDraggableTitle: 'Draggable',
  demoDraggableDesc:
    'Зажмите и тащите любой узел. `draggableNodes` по умолчанию `true`; передайте `false`, чтобы заблокировать перемещения.',

  demoPanZoomTitle: 'Pan + zoom',
  demoPanZoomDesc:
    'Vue использует единый флаг `panZoom` (default `true`) — wheel зумит, drag канвы панит. У React `zoomable` / `panable` раздельные; здесь оба режима совмещены.',

  demoSelectionTitle: 'Single selection',
  demoSelectionDesc:
    'Клик по узлу — предыдущий выбор сбрасывается. Событие `selection-change` отдаёт актуальный список id.',

  demoMultiSelectTitle: 'Multi-select (Ctrl+click)',
  demoMultiSelectDesc:
    '`selectionMode="multi"` переключает узлы по `Ctrl+click` / `Shift+click`. Lasso-select пока только в React.',

  demoUndoRedoTitle: 'Undo / Redo',
  demoUndoRedoDesc:
    'Встроенная история `GraphEngine`. Тащите узлы, затем `Ctrl+Z` / `Ctrl+Shift+Z` (или кнопки) — пройдитесь по таймлайну.',

  demoNodeClickTitle: 'Событие клика по узлу',
  demoNodeClickDesc:
    '`@node-click` отдаёт `{ id, node, event }` на каждый клик узла — пригодится для инспекторов, превью-панелей или аналитики.',

  demoProgrammaticTitle: 'Программная правка',
  demoProgrammaticDesc:
    'Add / delete узлов снаружи канвы. Заменяет React-паттерн контекст-меню; API `GraphEngine` идентичен.',

  demoPrintTitle: 'Print',
  demoPrintDesc:
    'Императивный `print()` через ref, повторяет React `DiagramRef.print()`. Учитывает проп `fileName` как имя документа.',

  demoLargeTitle: 'Большой граф (200 / 400)',
  demoLargeDesc:
    'Стресс-тест: 200 узлов и 400 случайных рёбер. Мутации объединены в `graph.transaction()` — реактивность эмитит один апдейт на всю вставку.',

  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc:
    'Сбрасывает дефолтные `.sg-diagram*` классы через `unstyled`. Структура DOM сохраняется — приносите собственный дизайн.',

  demoOrthogonalTitle: 'Ортогональная маршрутизация (обходы узлов)',
  demoOrthogonalDesc:
    'Прокинутый `routeAroundNodes` подаёт остальные узлы как препятствия в A*-роутер — линии огибают их, а не идут через. Роутер также выходит / входит через ближайшую грань узла (T-Diagram-Polish 3.3c).',

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
  propDraggableNodes: 'Разрешить перетаскивание узлов',
  propPanZoom: 'Wheel zoom + pan канвы',
  propSelectionMode: '`single` (замена) или `multi` (Ctrl+click toggle)',
  propSelectedNodeIds: 'Контролируемые id выбранных узлов',
  propFileName: 'Базовое имя файла для `ref.print()`',
  propEmitNodeClick: 'Эмитится при клике по узлу — `{ id, node, event }`',
  propEmitSelectionChange: 'Эмитится при изменении набора выбранных',

  propUseGraphCore: 'Внешний Core (для кросс-движковой координации)',
  propUseGraphName: 'Опциональное debug-имя движка',

  exposePrint: 'Запустить печать текущей канвы через `printElement`',
}
