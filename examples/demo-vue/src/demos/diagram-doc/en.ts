/**
 * English source of truth for Diagram doc page strings (Vue).
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Vue's `SgDiagram` is narrower than React's: no `snapToGrid`,
 * `routeAroundNodes`, lasso, contextmenu callbacks, OBB rotation.
 * Examples are scoped to the current Vue API surface — see
 * `findings/T-Vue-Demo-Complex.md` → `diagram-vue-narrower-than-react`.
 */
export const diagramDocEn = {
  pageTitle: 'Diagram',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbDiagram: 'Diagram',
  pageLead:
    'Visual layer for GraphEngine — DOM nodes + SVG-overlay edges, driven by `useGraph()`. Supports drag-and-drop, wheel zoom, canvas pan, single / multi selection and a single-method imperative `print()` API.',
  pageWhen1: 'Render a flowchart / org chart / dependency graph backed by reactive state.',
  pageWhen2:
    'Build a Visio-like editor where the topology lives in `@skygraph/core` and the visual layer is a thin Vue projection.',
  pageWhen3:
    'Compose with FormEngine / TableEngine / TreeEngine (e.g. visualise dependencies between table rows).',

  demoBasicTitle: 'Basic',
  demoBasicDesc:
    'Three rect nodes with two straight edges. Edges resolve to outline anchors via stable IDs (`nw`, `ne`, `se`, `sw`).',

  demoCustomNodeTitle: 'Custom node',
  demoCustomNodeDesc:
    'Use the `#node` slot to render a custom card per node — Vue idiom for React `renderNode={...}`.',

  demoDraggableTitle: 'Draggable',
  demoDraggableDesc:
    'Click and drag any node. `draggableNodes` is `true` by default; pass `false` to lock positions.',

  demoPanZoomTitle: 'Pan + zoom',
  demoPanZoomDesc:
    'Vue exposes a single `panZoom` flag (default `true`) — wheel zooms, canvas-drag pans. React keeps `zoomable` / `panable` separate; both modes collapse here.',

  demoSelectionTitle: 'Single selection',
  demoSelectionDesc:
    'Click a node — the previous selection is replaced. The `selection-change` event emits the latest id list.',

  demoMultiSelectTitle: 'Multi-select (Ctrl+click)',
  demoMultiSelectDesc:
    '`selectionMode="multi"` toggles individual nodes on `Ctrl+click` / `Shift+click`. Lasso-select is React-only for now.',

  demoUndoRedoTitle: 'Undo / Redo',
  demoUndoRedoDesc:
    "Built-in history on `GraphEngine`. Drag the nodes, then `Ctrl+Z` / `Ctrl+Shift+Z` (or use the buttons) to walk the timeline.",

  demoNodeClickTitle: 'Node click event',
  demoNodeClickDesc:
    '`@node-click` emits `{ id, node, event }` for each node click — handy for inspectors, preview panes or analytics.',

  demoProgrammaticTitle: 'Programmatic edit',
  demoProgrammaticDesc:
    'Add / delete nodes from outside the canvas. Replaces the React context-menu pattern; the `GraphEngine` API is identical.',

  demoPrintTitle: 'Print',
  demoPrintDesc:
    'Imperative `print()` ref-method, mirroring React `DiagramRef.print()`. Honours the `fileName` prop as the document base name.',

  demoLargeTitle: 'Large graph (200 / 400)',
  demoLargeDesc:
    'Stress test: 200 nodes and 400 random straight edges. Mutations are batched through `graph.transaction()` so reactivity emits one update for the whole insert.',

  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc:
    'Drop the default `.sg-diagram*` classes via `unstyled`. The DOM structure stays the same — bring your own design system.',

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
  propDraggableNodes: 'Allow dragging nodes by their wrappers',
  propPanZoom: 'Wheel zoom + canvas-drag pan',
  propSelectionMode: '`single` (replace) or `multi` (Ctrl+click toggle)',
  propSelectedNodeIds: 'Controlled selected ids',
  propFileName: 'Base filename for `ref.print()`',
  propEmitNodeClick: 'Fired on each node click — `{ id, node, event }`',
  propEmitSelectionChange: 'Fired when the selection set changes',

  propUseGraphCore: 'Bring your own Core instance (cross-engine coordination)',
  propUseGraphName: 'Optional debug name for the engine',

  exposePrint: 'Trigger print of the current canvas via `printElement`',
} as const

/** Writable string map — same keys as `diagramDocEn`. */
export type DiagramDocStrings = { -readonly [K in keyof typeof diagramDocEn]: string }
