import { diagramDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `diagramDocEn`, no extras.
 */
export const diagramDocRu: { [K in keyof typeof diagramDocEn]: string } = {
  pageTitle: 'Diagram',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbDiagram: 'Diagram',
  pageLead:
    'Визуальный слой для GraphEngine — DOM-узлы и SVG-наложение для рёбер. Поддерживает drag-and-drop, zoom / pan, snap-to-grid, ортогональную маршрутизацию с обходом препятствий, multi-select с лассо, hover-панели и кастомные context-menu.',
  pageWhen1: 'Отрисовать flowchart, оргструктуру или граф зависимостей с реактивным состоянием.',
  pageWhen2:
    'Построить редактор в духе Visio: топология живёт в `@skygraph/core`, визуальный слой — тонкая React-проекция.',
  pageWhen3:
    'Комбинировать с FormEngine / TableEngine / TreeEngine (например, визуализировать зависимости между строками таблицы).',

  demoBasicTitle: 'Базовый',
  demoBasicDesc:
    'Три прямоугольных узла и два прямых ребра. Рёбра привязываются к якорям контура по стабильным ID (`nw`, `ne`, `se`, `sw`).',

  demoDraggableTitle: 'Drag-and-drop',
  demoDraggableDesc:
    'Тяните узлы мышью. На hover поднимается тень, во время drag добавляется атрибут `[data-sg-dragging="true"]` для усиленного визуального отклика.',

  demoZoomableTitle: 'Zoom',
  demoZoomableDesc:
    'Удерживайте `Ctrl` (или `⌘` на macOS) и крутите колесо для зума под курсором. Масштаб ограничен разумным диапазоном.',

  demoPannableTitle: 'Pan',
  demoPannableDesc:
    'Средняя кнопка мыши тащит холст. Колесо без модификаторов скроллит; в паре с `zoomable` за зумом остаётся `Ctrl + колесо`, остальное — pan.',

  demoSnapToGridTitle: 'Привязка к сетке',
  demoSnapToGridDesc:
    '`snapToGrid={20}` округляет координаты по концу drag к шагу 20 world-юнитов и подключает соответствующий CSS-фон с сеткой.',

  demoBezierTitle: 'Bezier-кривые',
  demoBezierDesc:
    'Кубические Bezier-рёбра — управляющие точки уходят перпендикулярно ближайшей грани каждой ноды, как в React Flow / draw.io. Маркер-стрелка автоматически следует за цветом линии при hover и выделении.',

  demoOrthogonalTitle: 'Ортогональная маршрутизация',
  demoOrthogonalDesc:
    'A*-маршрутизатор с обходом препятствий — рёбра огибают другие узлы, а не проходят сквозь них.',

  demoUndoRedoTitle: 'Undo / Redo',
  demoUndoRedoDesc:
    'Встроенная история. Подвигайте узлы и нажмите `Ctrl+Z` / `Ctrl+Shift+Z` (или используйте кнопки) — пройдёте по истории мутаций.',

  demoContextMenuTitle: 'Контекстное меню',
  demoContextMenuDesc:
    'Правый клик по узлу, ребру или пустому месту — три коллбэка (`onNodeContextMenu`, `onEdgeContextMenu`, `onCanvasContextMenu`) подавляют нативное меню и позволяют отрисовать своё.',

  demoMultiSelectTitle: 'Multi-select и лассо',
  demoMultiSelectDesc:
    '`Ctrl+click` тоглит узлы по одному; drag по пустому месту открывает рамку, выбирающую все узлы, чьи AABB пересекаются с ней. Drag любого выбранного узла двигает всю группу.',

  demoOBBTitle: 'Повёрнутые узлы (OBB)',
  demoOBBDesc:
    'У каждого узла свой `transform.rot`. Engine проецирует OBB в плотный AABB, поэтому layout, якоря и обход препятствий продолжают работать.',

  demoLargeTitle: 'Большой граф (200 / 400)',
  demoLargeDesc:
    'Стресс-тест: 200 узлов и 400 случайных рёбер; включены drag, zoom и pan. Воспроизводимый seed гарантирует стабильную раскладку между перерисовками.',

  tableDiagramApi: 'API Diagram',
  tableUseGraphApi: 'Опции useGraph(options)',

  propGraph: 'Инстанс GraphEngine (из `useGraph()`)',
  propState: 'Реактивный snapshot из `useGraph()`',
  propWidth: 'Ширина холста',
  propHeight: 'Высота холста',
  propRenderNode: 'Кастомный рендерер содержимого узла',
  propClassName: 'className корня',
  propStyle: 'Inline-стиль корня',
  propUnstyled: 'Убрать дефолтные классы sg-diagram',
  propDraggable: 'Включить drag (true / false / кастомный хендлер)',
  propZoomable: '`Ctrl + колесо` зум по холсту',
  propPanable: 'Средняя кнопка drag + колесо pan',
  propSnapToGrid: 'Привязка результата drag к сетке (world-юниты)',
  propRouteAroundNodes: 'A*-обход препятствий для ортогональных рёбер',
  propRoutingOptions:
    'Настройки маршрутизации — `gridSize` / `inflate` / `maxNodes` для A*, `cornerRadius` для скруглений (по умолчанию 8), `curvature` для bezier (по умолчанию 0.25).',
  propEdgeArrows: 'Рисовать стрелку на конце каждого ребра.',
  propSelection: 'Управляемый selection: массив id узлов',
  propSelectionMode: '`single` (legacy) / `multi` (Ctrl+click) / `lasso`',
  propOnSelectionChange: 'Срабатывает при изменении selection',
  propNodeActions: 'Мини-панель над hover-нутым узлом',
  propEdgeActions: 'Мини-панель над hover-нутым ребром',
  propOnNodeContextMenu: 'Правый клик по узлу — кастомный коллбэк',
  propOnEdgeContextMenu: 'Правый клик по ребру — кастомный коллбэк',
  propOnCanvasContextMenu: 'Правый клик по пустому месту — кастомный коллбэк',

  propUseGraphCore: 'Собственный инстанс Core (координация между движками)',
  propUseGraphName: 'Опциональное debug-имя движка',
}
