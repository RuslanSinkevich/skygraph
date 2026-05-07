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
    'Visual layer for GraphEngine — DOM nodes + SVG-overlay edges. v0: straight edges only; orthogonal routing, drag-and-drop, and zoom/pan are follow-ups.',
  pageWhen1: 'Render a flowchart / org chart / dependency graph backed by reactive state.',
  pageWhen2:
    'Build a Visio-like editor where the topology lives in `@skygraph/core` and the visual layer is just a thin React projection.',
  pageWhen3:
    'Compose with FormEngine / TableEngine / TreeEngine (e.g. visualise dependencies between table rows).',

  demoBasicTitle: 'Basic',
  demoBasicDesc:
    'Three rect nodes with two straight edges. Edges resolve to outline anchors via stable IDs (`nw`, `ne`, `se`, `sw`).',

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

  propUseGraphCore: 'Bring your own Core instance (cross-engine coordination)',
  propUseGraphName: 'Optional debug name for the engine',
} as const

/** Writable string map — use for props / table builders (same keys as `diagramDocEn`). */
export type DiagramDocStrings = { -readonly [K in keyof typeof diagramDocEn]: string }
