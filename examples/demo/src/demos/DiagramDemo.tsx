import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { BasicDiagram } from './diagram/Basic.demo'
import BasicSource from './diagram/Basic.demo?raw'

const diagramProps: PropDef[] = [
  { name: 'graph', description: 'GraphEngine instance (from `useGraph()`)', type: 'GraphEngine', required: true },
  { name: 'state', description: 'Reactive snapshot from `useGraph()`', type: 'GraphState', required: true },
  { name: 'width', description: 'Canvas width', type: 'number | string', default: "'100%'" },
  { name: 'height', description: 'Canvas height', type: 'number | string', default: '400' },
  { name: 'renderNode', description: 'Per-node content renderer', type: '(node: GraphNode) => ReactNode' },
  { name: 'className', description: 'Root className', type: 'string' },
  { name: 'style', description: 'Root inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop default sg-diagram classes', type: 'boolean', default: 'false' },
]

const useGraphProps: PropDef[] = [
  { name: 'core', description: 'Bring your own Core instance (cross-engine coordination)', type: 'Core' },
  { name: 'name', description: 'Optional debug name for the engine', type: 'string' },
]

export function DiagramDemo() {
  return (
    <ComponentDoc
      title="Diagram"
      description="Visual layer for GraphEngine — DOM nodes + SVG-overlay edges. v0: straight edges only; orthogonal routing, drag-and-drop, and zoom/pan are follow-ups."
      whenToUse={[
        'Render a flowchart / org chart / dependency graph backed by reactive state.',
        'Build a Visio-like editor where the topology lives in `@skygraph/core` and the visual layer is just a thin React projection.',
        'Compose with FormEngine / TableEngine / TreeEngine (e.g. visualise dependencies between table rows).',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Three rect nodes with two straight edges. Edges resolve to outline anchors via stable IDs (`nw`, `ne`, `se`, `sw`)."
        code={BasicSource}
      >
        <BasicDiagram />
      </DemoBox>

      <PropsTable title="Diagram API" data={diagramProps} />
      <PropsTable title="useGraph(options) Options" data={useGraphProps} />
    </ComponentDoc>
  )
}
