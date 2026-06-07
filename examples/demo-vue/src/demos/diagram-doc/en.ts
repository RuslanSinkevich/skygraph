/**
 * English source of truth for Diagram doc page strings (Vue).
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * 1:1 demo parity with React. The public page intentionally stays focused
 * on compact editor scenarios; stress graphs and obstacle-routing demos are
 * kept out of the showcase surface until the visual layer can present them
 * cleanly.
 */
export const diagramDocEn = {
  pageTitle: 'Diagram',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbDiagram: 'Diagram',
  pageLead:
    'Visual layer for small GraphEngine-backed editors — DOM nodes + SVG-overlay edges, driven by `useGraph()`. Supports drag-and-drop, wheel zoom, canvas pan, single / multi / lasso selection, snap-to-grid, OBB rotation, and an imperative `print()` API.',
  pageWhen1: 'Render a compact flowchart or dependency graph backed by reactive state.',
  pageWhen2:
    'Build a Visio-like editor where the topology lives in `@skygraph/core` and the visual layer is a thin Vue projection.',
  pageWhen3:
    'Compose with FormEngine / TableEngine / TreeEngine (e.g. visualise dependencies between table rows).',

  demoBasicTitle: 'Basic',
  demoBasicDesc:
    'Three rect nodes with two straight edges. Edges resolve to outline anchors via stable IDs (`nw`, `ne`, `se`, `sw`).',
  demoDraggableTitle: 'Draggable',
  demoDraggableDesc: 'Click and drag any node — `draggable` enables the built-in mover.',
  demoZoomableTitle: 'Zoomable',
  demoZoomableDesc: 'Hold `Ctrl` (or `⌘` on macOS) and scroll the wheel to zoom in / out.',
  demoPannableTitle: 'Pannable',
  demoPannableDesc:
    'Middle-button drag pans, plain wheel scrolls. Combined with `zoomable` keeps `Ctrl + wheel` for zoom.',
  demoSnapToGridTitle: 'Snap to grid',
  demoSnapToGridDesc:
    '`snap-to-grid="20"` rounds drag-end coords to multiples of 20 world units and turns on the grid background.',
  demoBezierTitle: 'Bezier routing',
  demoBezierDesc:
    'Cubic-Bezier edges with control handles perpendicular to the nearest face — drag nodes to see curves re-fit.',
  demoUndoRedoTitle: 'Undo / Redo',
  demoUndoRedoDesc:
    'Built-in history on `GraphEngine`. Drag the nodes, then `Ctrl+Z` / `Ctrl+Shift+Z` (or use the buttons) to walk the timeline.',
  demoContextMenuTitle: 'Context menu',
  demoContextMenuDesc:
    '`@node-context-menu` / `@edge-context-menu` / `@canvas-context-menu` events open a custom floating menu.',
  demoMultiSelectTitle: 'Multi-select (Ctrl+click)',
  demoMultiSelectDesc:
    '`selection-mode="multi"` toggles individual nodes on `Ctrl+click` / `Shift+click`. Use `lasso` for rubber-band selection.',
  demoOBBTitle: 'Rotated nodes (OBB)',
  demoOBBDesc:
    'Every transform carries a non-zero `rot`; the engine still derives correct AABBs via OBB projection so routing keeps working.',
  tableDiagramApi: 'Diagram API',
  tableUseGraphApi: 'useGraph(options) Options',
  tableDiagramExpose: 'SgDiagram ref methods',

  propGraph: 'GraphEngine instance (from `useGraph()`)',
  propState: 'Reactive snapshot from `useGraph()`',
  propWidth: 'Canvas width',
  propHeight: 'Canvas height',
  propClassName: 'Root className',
  propStyle: 'Root inline style',
  propUnstyled: 'Drop default sg-diagram classes',
  propDraggable: 'Allow click-and-drag to move nodes',
  propZoomable: 'Wheel zoom (`Ctrl + wheel`)',
  propPanable: 'Plain wheel scrolls + middle-button drag',
  propSnapToGrid: 'Snap drag-end coords to multiples of N world units',
  propRouteAroundNodes: 'Use other nodes as obstacles for the orthogonal router',
  propRoutingOptions: 'A*-router knobs (gridSize, inflate, maxNodes, cornerRadius, curvature)',
  propEdgeArrows: 'Draw arrow markers on every edge end (defaults to true)',
  propSelectionMode: '`single` (replace), `multi` (Ctrl+click), or `lasso` (rubber-band)',
  propSelection: 'Controlled selected ids',
  propNodeActions: 'Hover mini-toolbar above each node',
  propEdgeActions: 'Hover mini-toolbar next to each edge',
  propFileName: 'Base filename for `ref.print()`',
  slotNode: 'Render a custom node body — Vue idiom for React `renderNode`',
  propEmitSelectionChange: 'Fired when the selection set changes',
  propEmitNodeContextMenu: 'Right-click on a node — `{ event, node }`',
  propEmitEdgeContextMenu: 'Right-click on an edge — `{ event, edge }`',
  propEmitCanvasContextMenu: 'Right-click on empty canvas — `{ event, point }`',

  propUseGraphCore: 'Bring your own Core instance (cross-engine coordination)',
  propUseGraphName: 'Optional debug name for the engine',

  exposePrint: 'Trigger print of the current canvas via `printElement`',
} as const

/** Writable string map — same keys as `diagramDocEn`. */
export type DiagramDocStrings = { -readonly [K in keyof typeof diagramDocEn]: string }
