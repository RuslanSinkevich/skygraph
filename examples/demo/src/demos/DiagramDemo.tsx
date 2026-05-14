import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { useDiagramDocStrings } from './diagram-doc/useDiagramDocStrings'

import { BasicDiagram } from './diagram/Basic.demo'
import BasicSource from './diagram/Basic.demo?raw'
import { DraggableDiagram } from './diagram/Draggable.demo'
import DraggableSource from './diagram/Draggable.demo?raw'
import { ZoomableDiagram } from './diagram/Zoomable.demo'
import ZoomableSource from './diagram/Zoomable.demo?raw'
import { PannableDiagram } from './diagram/Pannable.demo'
import PannableSource from './diagram/Pannable.demo?raw'
import { SnapToGridDiagram } from './diagram/SnapToGrid.demo'
import SnapToGridSource from './diagram/SnapToGrid.demo?raw'
import { OrthogonalRoutingDiagram } from './diagram/OrthogonalRouting.demo'
import OrthogonalRoutingSource from './diagram/OrthogonalRouting.demo?raw'
import { BezierDiagram } from './diagram/Bezier.demo'
import BezierSource from './diagram/Bezier.demo?raw'
import { UndoRedoDiagram } from './diagram/UndoRedo.demo'
import UndoRedoSource from './diagram/UndoRedo.demo?raw'
import { ContextMenuDiagram } from './diagram/ContextMenu.demo'
import ContextMenuSource from './diagram/ContextMenu.demo?raw'
import { MultiSelectDiagram } from './diagram/MultiSelect.demo'
import MultiSelectSource from './diagram/MultiSelect.demo?raw'
import { OBBDiagram } from './diagram/OBB.demo'
import OBBSource from './diagram/OBB.demo?raw'
import { LargeGraphDiagram } from './diagram/LargeGraph.demo'
import LargeGraphSource from './diagram/LargeGraph.demo?raw'

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
      {
        name: 'draggable',
        description: t.propDraggable,
        type: 'boolean | (id, x, y) => void',
        default: 'false',
      },
      { name: 'zoomable', description: t.propZoomable, type: 'boolean', default: 'false' },
      { name: 'panable', description: t.propPanable, type: 'boolean', default: 'false' },
      { name: 'snapToGrid', description: t.propSnapToGrid, type: 'number' },
      {
        name: 'routeAroundNodes',
        description: t.propRouteAroundNodes,
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'routingOptions',
        description: t.propRoutingOptions,
        type: '{ gridSize?; inflate?; maxNodes?; cornerRadius?; curvature? }',
      },
      {
        name: 'edgeArrows',
        description: t.propEdgeArrows,
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'selectionMode',
        description: t.propSelectionMode,
        type: "'single' | 'multi' | 'lasso'",
        default: "'single'",
      },
      { name: 'selection', description: t.propSelection, type: 'NodeId[]' },
      {
        name: 'onSelectionChange',
        description: t.propOnSelectionChange,
        type: '(ids: NodeId[]) => void',
      },
      { name: 'nodeActions', description: t.propNodeActions, type: 'DiagramNodeAction[]' },
      { name: 'edgeActions', description: t.propEdgeActions, type: 'DiagramEdgeAction[]' },
      {
        name: 'onNodeContextMenu',
        description: t.propOnNodeContextMenu,
        type: '(event, node) => void',
      },
      {
        name: 'onEdgeContextMenu',
        description: t.propOnEdgeContextMenu,
        type: '(event, edge) => void',
      },
      {
        name: 'onCanvasContextMenu',
        description: t.propOnCanvasContextMenu,
        type: '(event, point) => void',
      },
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
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicDiagram />
      </DemoBox>

      <DemoBox
        title={t.demoDraggableTitle}
        description={t.demoDraggableDesc}
        code={DraggableSource}
      >
        <DraggableDiagram />
      </DemoBox>

      <DemoBox title={t.demoZoomableTitle} description={t.demoZoomableDesc} code={ZoomableSource}>
        <ZoomableDiagram />
      </DemoBox>

      <DemoBox title={t.demoPannableTitle} description={t.demoPannableDesc} code={PannableSource}>
        <PannableDiagram />
      </DemoBox>

      <DemoBox
        title={t.demoSnapToGridTitle}
        description={t.demoSnapToGridDesc}
        code={SnapToGridSource}
      >
        <SnapToGridDiagram />
      </DemoBox>

      <DemoBox title={t.demoBezierTitle} description={t.demoBezierDesc} code={BezierSource}>
        <BezierDiagram />
      </DemoBox>

      <DemoBox
        title={t.demoOrthogonalTitle}
        description={t.demoOrthogonalDesc}
        code={OrthogonalRoutingSource}
      >
        <OrthogonalRoutingDiagram />
      </DemoBox>

      <DemoBox title={t.demoUndoRedoTitle} description={t.demoUndoRedoDesc} code={UndoRedoSource}>
        <UndoRedoDiagram />
      </DemoBox>

      <DemoBox
        title={t.demoContextMenuTitle}
        description={t.demoContextMenuDesc}
        code={ContextMenuSource}
      >
        <ContextMenuDiagram />
      </DemoBox>

      <DemoBox
        title={t.demoMultiSelectTitle}
        description={t.demoMultiSelectDesc}
        code={MultiSelectSource}
      >
        <MultiSelectDiagram />
      </DemoBox>

      <DemoBox title={t.demoOBBTitle} description={t.demoOBBDesc} code={OBBSource}>
        <OBBDiagram />
      </DemoBox>

      <DemoBox title={t.demoLargeTitle} description={t.demoLargeDesc} code={LargeGraphSource}>
        <LargeGraphDiagram />
      </DemoBox>

      <PropsTable title={t.tableDiagramApi} data={diagramProps} />
      <PropsTable title={t.tableUseGraphApi} data={useGraphProps} />
    </ComponentDoc>
  )
}
