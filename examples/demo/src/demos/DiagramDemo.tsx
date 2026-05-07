import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { useDiagramDocStrings } from './diagram-doc/useDiagramDocStrings'

import { BasicDiagram } from './diagram/Basic.demo'
import BasicSource from './diagram/Basic.demo?raw'

export function DiagramDemo() {
  const t = useDiagramDocStrings()

  const diagramProps = useMemo<PropDef[]>(
    () => [
      { name: 'graph', description: t.propGraph, type: 'GraphEngine', required: true },
      { name: 'state', description: t.propState, type: 'GraphState', required: true },
      { name: 'width', description: t.propWidth, type: 'number | string', default: "'100%'" },
      { name: 'height', description: t.propHeight, type: 'number | string', default: '400' },
      { name: 'renderNode', description: t.propRenderNode, type: '(node: GraphNode) => ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const useGraphProps = useMemo<PropDef[]>(
    () => [
      { name: 'core', description: t.propUseGraphCore, type: 'Core' },
      { name: 'name', description: t.propUseGraphName, type: 'string' },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbDiagram]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox
        title={t.demoBasicTitle}
        description={t.demoBasicDesc}
        code={BasicSource}
      >
        <BasicDiagram />
      </DemoBox>

      <PropsTable title={t.tableDiagramApi} data={diagramProps} />
      <PropsTable title={t.tableUseGraphApi} data={useGraphProps} />
    </ComponentDoc>
  )
}
