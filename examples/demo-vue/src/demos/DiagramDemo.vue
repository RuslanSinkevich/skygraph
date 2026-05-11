<script setup lang="ts">
/**
 * Diagram aggregator. After T-Diagram-Polish (Wave 3.3c) Vue's
 * `SgDiagram` is on parity with React: routing, `routeAroundNodes`,
 * lasso, `*ContextMenu`, hover-actions, snap-to-grid, DnD, panable /
 * zoomable. Legacy v0 props (`draggableNodes`, `panZoom`,
 * `selectedNodeIds`) still work as deprecated aliases — see
 * `decisions/T-Diagram-Polish.md` D2.
 */
import { computed } from 'vue'
import { ComponentDoc, DemoBox, PropsTable, type PropDef } from './components'
import { useDiagramDocStrings } from './diagram-doc/useStrings'

import BasicDiagram from './diagram/Basic.demo.vue'
import BasicSource from './diagram/Basic.demo.vue?raw'
import CustomNodeDiagram from './diagram/CustomNode.demo.vue'
import CustomNodeSource from './diagram/CustomNode.demo.vue?raw'
import DraggableDiagram from './diagram/Draggable.demo.vue'
import DraggableSource from './diagram/Draggable.demo.vue?raw'
import PanZoomDiagram from './diagram/PanZoom.demo.vue'
import PanZoomSource from './diagram/PanZoom.demo.vue?raw'
import SelectionDiagram from './diagram/Selection.demo.vue'
import SelectionSource from './diagram/Selection.demo.vue?raw'
import MultiSelectDiagram from './diagram/MultiSelect.demo.vue'
import MultiSelectSource from './diagram/MultiSelect.demo.vue?raw'
import UndoRedoDiagram from './diagram/UndoRedo.demo.vue'
import UndoRedoSource from './diagram/UndoRedo.demo.vue?raw'
import NodeClickDiagram from './diagram/NodeClick.demo.vue'
import NodeClickSource from './diagram/NodeClick.demo.vue?raw'
import ProgrammaticDiagram from './diagram/ProgrammaticEdit.demo.vue'
import ProgrammaticSource from './diagram/ProgrammaticEdit.demo.vue?raw'
import PrintDiagram from './diagram/Print.demo.vue'
import PrintSource from './diagram/Print.demo.vue?raw'
import LargeDiagram from './diagram/LargeGraph.demo.vue'
import LargeSource from './diagram/LargeGraph.demo.vue?raw'
import UnstyledDiagram from './diagram/Unstyled.demo.vue'
import UnstyledSource from './diagram/Unstyled.demo.vue?raw'
import OrthogonalDiagram from './diagram/OrthogonalRouting.demo.vue'
import OrthogonalSource from './diagram/OrthogonalRouting.demo.vue?raw'

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
    name: 'draggableNodes',
    description: t.value.propDraggableNodes,
    type: 'boolean',
    default: 'true',
  },
  { name: 'panZoom', description: t.value.propPanZoom, type: 'boolean', default: 'true' },
  {
    name: 'selectionMode',
    description: t.value.propSelectionMode,
    type: "'single' | 'multi'",
    default: "'single'",
  },
  { name: 'selectedNodeIds', description: t.value.propSelectedNodeIds, type: 'NodeId[]' },
  { name: 'fileName', description: t.value.propFileName, type: 'string', default: "'diagram'" },
  {
    name: '@node-click',
    description: t.value.propEmitNodeClick,
    type: '(p: { id, node, event }) => void',
  },
  {
    name: '@selection-change',
    description: t.value.propEmitSelectionChange,
    type: '(ids: NodeId[]) => void',
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
      :title="t.demoCustomNodeTitle"
      :description="t.demoCustomNodeDesc"
      :code="CustomNodeSource"
    >
      <CustomNodeDiagram />
    </DemoBox>

    <DemoBox
      :title="t.demoDraggableTitle"
      :description="t.demoDraggableDesc"
      :code="DraggableSource"
    >
      <DraggableDiagram />
    </DemoBox>

    <DemoBox :title="t.demoPanZoomTitle" :description="t.demoPanZoomDesc" :code="PanZoomSource">
      <PanZoomDiagram />
    </DemoBox>

    <DemoBox
      :title="t.demoSelectionTitle"
      :description="t.demoSelectionDesc"
      :code="SelectionSource"
    >
      <SelectionDiagram />
    </DemoBox>

    <DemoBox
      :title="t.demoMultiSelectTitle"
      :description="t.demoMultiSelectDesc"
      :code="MultiSelectSource"
    >
      <MultiSelectDiagram />
    </DemoBox>

    <DemoBox :title="t.demoUndoRedoTitle" :description="t.demoUndoRedoDesc" :code="UndoRedoSource">
      <UndoRedoDiagram />
    </DemoBox>

    <DemoBox
      :title="t.demoNodeClickTitle"
      :description="t.demoNodeClickDesc"
      :code="NodeClickSource"
    >
      <NodeClickDiagram />
    </DemoBox>

    <DemoBox
      :title="t.demoProgrammaticTitle"
      :description="t.demoProgrammaticDesc"
      :code="ProgrammaticSource"
    >
      <ProgrammaticDiagram />
    </DemoBox>

    <DemoBox :title="t.demoPrintTitle" :description="t.demoPrintDesc" :code="PrintSource">
      <PrintDiagram />
    </DemoBox>

    <DemoBox :title="t.demoLargeTitle" :description="t.demoLargeDesc" :code="LargeSource">
      <LargeDiagram />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledDiagram />
    </DemoBox>

    <DemoBox
      :title="t.demoOrthogonalTitle"
      :description="t.demoOrthogonalDesc"
      :code="OrthogonalSource"
    >
      <OrthogonalDiagram />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableDiagramApi" :data="diagramProps" />
      <PropsTable :title="t.tableUseGraphApi" :data="useGraphProps" />
      <PropsTable :title="t.tableDiagramExpose" :data="exposeProps" />
    </template>
  </ComponentDoc>
</template>
