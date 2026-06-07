/**
 * English source of truth for Diagram doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const diagramDocEn = {
  pageTitle: 'Diagram',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbDiagram: 'Diagram',
  pageLead:
    'Visual layer for small GraphEngine-backed editors — DOM nodes plus SVG-overlay edges. Supports drag-and-drop, zoom / pan, snap-to-grid, Bezier routing, multi-select with lasso, hover mini-toolbars and custom context menus.',
  pageWhen1: 'Render a compact flowchart or dependency graph backed by reactive state.',
  pageWhen2:
    'Build a Visio-like editor where the topology lives in `@skygraph/core` and the visual layer is just a thin React projection.',
  pageWhen3:
    'Compose with FormEngine / TableEngine / TreeEngine (e.g. visualise dependencies between table rows).',

  demoBasicTitle: 'Basic',
  demoBasicDesc:
    'Three rect nodes with two straight edges. Edges resolve to outline anchors via stable IDs (`nw`, `ne`, `se`, `sw`).',

  demoDraggableTitle: 'Draggable',
  demoDraggableDesc:
    'Click and drag any node. Hover lifts the shadow, dragging stamps `[data-sg-dragging="true"]` for an even stronger visual cue.',

  demoZoomableTitle: 'Zoomable',
  demoZoomableDesc:
    'Hold `Ctrl` (or `⌘` on macOS) and scroll the wheel to zoom in / out around the cursor. Scale is clamped to a sensible range.',

  demoPannableTitle: 'Pannable',
  demoPannableDesc:
    'Middle-button drag pans the canvas. Plain wheel scrolls; combined with `zoomable` it leaves `Ctrl + wheel` for zoom and the rest for pan.',

  demoSnapToGridTitle: 'Snap to grid',
  demoSnapToGridDesc:
    '`snapToGrid={20}` rounds every drag-end to multiples of 20 world units and turns on the matching CSS background grid.',

  demoBezierTitle: 'Bezier curves',
  demoBezierDesc:
    'Cubic-Bezier edges whose control handles extend perpendicular to the nearest face of each node, in the spirit of React Flow / draw.io. Arrow markers track the line colour through hover and selected states.',

  demoUndoRedoTitle: 'Undo / Redo',
  demoUndoRedoDesc:
    'Built-in history. Drag the nodes, then `Ctrl+Z` / `Ctrl+Shift+Z` (or use the buttons) to walk the timeline.',

  demoContextMenuTitle: 'Context menu',
  demoContextMenuDesc:
    'Right-click a node, an edge, or empty canvas — three callbacks (`onNodeContextMenu`, `onEdgeContextMenu`, `onCanvasContextMenu`) suppress the native menu and let you render your own.',

  demoMultiSelectTitle: 'Multi-select & lasso',
  demoMultiSelectDesc:
    '`Ctrl+click` toggles individual nodes; dragging on empty canvas opens a rubber-band that picks every node whose AABB intersects it. Dragging any selected node moves the whole group.',

  demoOBBTitle: 'Rotated nodes (OBB)',
  demoOBBDesc:
    'Each node carries a non-zero `transform.rot`. The engine projects the OBB to a tight axis-aligned box so layout, anchors and obstacle-aware routing keep working.',

  tableDiagramApi: 'Diagram API',
  tableUseGraphApi: 'useGraph(options) Options',

  propGraph: 'GraphEngine instance (from `useGraph()`)',
  propState: 'Reactive snapshot from `useGraph()`',
  propWidth: 'Canvas width',
  propHeight: 'Canvas height',
  propRenderNode: 'Per-node content renderer',
  propClassName: 'Root className',
  propStyle: 'Root inline style',
  propUnstyled: 'Drop default sg-diagram classes',
  propDraggable: 'Enable drag (true / false / custom handler)',
  propZoomable: '`Ctrl + wheel` zoom on the canvas',
  propPanable: 'Middle-button drag + plain wheel pan',
  propSnapToGrid: 'Snap drag results to a world-units grid',
  propRouteAroundNodes: 'A*-based obstacle avoidance for orthogonal edges',
  propRoutingOptions:
    'Router tuning — `gridSize` / `inflate` / `maxNodes` for A*, `cornerRadius` for orthogonal corners (default 8), `curvature` for bezier (default 0.25).',
  propEdgeArrows: 'Draw a directional arrow on every edge target end.',
  propSelection: 'Controlled selection: array of node ids',
  propSelectionMode: '`single` (legacy) / `multi` (Ctrl+click) / `lasso`',
  propOnSelectionChange: 'Fired when the selection set changes',
  propNodeActions: 'Mini-toolbar shown above a hovered node',
  propEdgeActions: 'Mini-toolbar shown above a hovered edge',
  propOnNodeContextMenu: 'Right-click on a node → custom callback',
  propOnEdgeContextMenu: 'Right-click on an edge → custom callback',
  propOnCanvasContextMenu: 'Right-click on empty canvas → custom callback',

  propUseGraphCore: 'Bring your own Core instance (cross-engine coordination)',
  propUseGraphName: 'Optional debug name for the engine',
} as const

/** Writable string map — use for props / table builders (same keys as `diagramDocEn`). */
export type DiagramDocStrings = { -readonly [K in keyof typeof diagramDocEn]: string }
