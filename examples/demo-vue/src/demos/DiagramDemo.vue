<script setup lang="ts">
/**
 * Diagram aggregator — 1:1 parity with React (12 examples).
 *
 * Routing (orthogonal / bezier), pan / zoom, snap-to-grid, OBB, lasso /
 * multi-select, hover-actions and the three context-menu callbacks.
 */
import { computed } from 'vue'
import { ComponentDoc, DemoBox, PropsTable, type PropDef } from './components'
import { useDiagramDocStrings } from './diagram-doc/useStrings'

import BasicDiagram from './diagram/Basic.demo.vue'
import BasicSource from './diagram/Basic.demo.vue?raw'
import DraggableDiagram from './diagram/Draggable.demo.vue'
import DraggableSource from './diagram/Draggable.demo.vue?raw'
import ZoomableDiagram from './diagram/Zoomable.demo.vue'
import ZoomableSource from './diagram/Zoomable.demo.vue?raw'
import PannableDiagram from './diagram/Pannable.demo.vue'
import PannableSource from './diagram/Pannable.demo.vue?raw'
import SnapToGridDiagram from './diagram/SnapToGrid.demo.vue'
import SnapToGridSource from './diagram/SnapToGrid.demo.vue?raw'
import BezierDiagram from './diagram/Bezier.demo.vue'
import BezierSource from './diagram/Bezier.demo.vue?raw'
import UndoRedoDiagram from './diagram/UndoRedo.demo.vue'
import UndoRedoSource from './diagram/UndoRedo.demo.vue?raw'
import ContextMenuDiagram from './diagram/ContextMenu.demo.vue'
import ContextMenuSource from './diagram/ContextMenu.demo.vue?raw'
import MultiSelectDiagram from './diagram/MultiSelect.demo.vue'
import MultiSelectSource from './diagram/MultiSelect.demo.vue?raw'

const t = useDiagramDocStrings()

const diagramProps = computed<PropDef[]>(() => [
  { name: 'graph', description: t.value.propGraph, type: 'GraphEngine', required: true },
  { name: 'state', description: t.value.propState, type: 'GraphState', required: true },
  { name: 'width', description: t.value.propWidth, type: 'number | string', default: "'100%'" },
  { name: 'height', description: t.value.propHeight, type: 'number | string', default: '400' },
  { name: 'className', description: t.value.propClassName, type: 'string' },
  { name: 'style', description: t.value.propStyle, type: 'CSSProperties' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: 'draggable',
    description: t.value.propDraggable,
    type: 'boolean | (id, x, y) => void',
    default: 'false',
  },
  { name: 'zoomable', description: t.value.propZoomable, type: 'boolean', default: 'false' },
  { name: 'panable', description: t.value.propPanable, type: 'boolean', default: 'false' },
  { name: 'snapToGrid', description: t.value.propSnapToGrid, type: 'number' },
  {
    name: 'routeAroundNodes',
    description: t.value.propRouteAroundNodes,
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'routingOptions',
    description: t.value.propRoutingOptions,
    type: '{ gridSize?; inflate?; maxNodes?; cornerRadius?; curvature? }',
  },
  { name: 'edgeArrows', description: t.value.propEdgeArrows, type: 'boolean', default: 'true' },
  {
    name: 'selectionMode',
    description: t.value.propSelectionMode,
    type: "'single' | 'multi' | 'lasso'",
    default: "'single'",
  },
  { name: 'selection', description: t.value.propSelection, type: 'NodeId[]' },
  { name: 'nodeActions', description: t.value.propNodeActions, type: 'DiagramNodeAction[]' },
  { name: 'edgeActions', description: t.value.propEdgeActions, type: 'DiagramEdgeAction[]' },
  { name: 'fileName', description: t.value.propFileName, type: 'string', default: "'diagram'" },
  { name: '#node', description: t.value.slotNode, type: 'slot ({ node })' },
  {
    name: '@selection-change',
    description: t.value.propEmitSelectionChange,
    type: '(ids: NodeId[]) => void',
  },
  {
    name: '@node-context-menu',
    description: t.value.propEmitNodeContextMenu,
    type: '(p: { event, node }) => void',
  },
  {
    name: '@edge-context-menu',
    description: t.value.propEmitEdgeContextMenu,
    type: '(p: { event, edge }) => void',
  },
  {
    name: '@canvas-context-menu',
    description: t.value.propEmitCanvasContextMenu,
    type: '(p: { event, point }) => void',
  },
])

const useGraphProps = computed<PropDef[]>(() => [
  { name: 'core', description: t.value.propUseGraphCore, type: 'Core' },
  { name: 'name', description: t.value.propUseGraphName, type: 'string' },
])

const exposeProps = computed<PropDef[]>(() => [
  { name: 'print', description: t.value.exposePrint, type: '(opts?: PrintOptions) => void' },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbDiagram]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicDiagram />
    </DemoBox>
    <DemoBox
      :title="t.demoDraggableTitle"
      :description="t.demoDraggableDesc"
      :code="DraggableSource"
    >
      <DraggableDiagram />
    </DemoBox>
    <DemoBox :title="t.demoZoomableTitle" :description="t.demoZoomableDesc" :code="ZoomableSource">
      <ZoomableDiagram />
    </DemoBox>
    <DemoBox :title="t.demoPannableTitle" :description="t.demoPannableDesc" :code="PannableSource">
      <PannableDiagram />
    </DemoBox>
    <DemoBox
      :title="t.demoSnapToGridTitle"
      :description="t.demoSnapToGridDesc"
      :code="SnapToGridSource"
    >
      <SnapToGridDiagram />
    </DemoBox>
    <DemoBox :title="t.demoBezierTitle" :description="t.demoBezierDesc" :code="BezierSource">
      <BezierDiagram />
    </DemoBox>
    <DemoBox :title="t.demoUndoRedoTitle" :description="t.demoUndoRedoDesc" :code="UndoRedoSource">
      <UndoRedoDiagram />
    </DemoBox>
    <DemoBox
      :title="t.demoContextMenuTitle"
      :description="t.demoContextMenuDesc"
      :code="ContextMenuSource"
    >
      <ContextMenuDiagram />
    </DemoBox>
    <DemoBox
      :title="t.demoMultiSelectTitle"
      :description="t.demoMultiSelectDesc"
      :code="MultiSelectSource"
    >
      <MultiSelectDiagram />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableDiagramApi" :data="diagramProps" />
      <PropsTable :title="t.tableUseGraphApi" :data="useGraphProps" />
      <PropsTable :title="t.tableDiagramExpose" :data="exposeProps" />
    </template>
  </ComponentDoc>
</template>
