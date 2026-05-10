<script setup lang="ts">
import { onMounted } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Diagram',
    lead: 'Pannable / zoomable canvas of nodes and edges driven by `useGraph()`.',
    when1: 'Workflow editors, mind maps, system topology views.',
    when2: 'When you need draggable nodes with selection and a custom node template.',
    basicTitle: 'Basic',
    basicDesc: 'Two nodes and an edge — drag to move, scroll to zoom.',
    customTitle: 'Custom node',
    customDesc: 'Use the `node` slot to render a custom card per node.',
  },
  ru: {
    title: 'Diagram',
    lead: 'Pan/zoom-канва узлов и рёбер на базе `useGraph()`.',
    when1: 'Редакторы воркфлоу, mind-maps, топология систем.',
    when2: 'Когда нужны draggable-узлы с выбором и свой шаблон узла.',
    basicTitle: 'Basic',
    basicDesc: 'Два узла и ребро — drag/scroll.',
    customTitle: 'Свой узел',
    customDesc: 'Слот `node` для собственной карточки узла.',
  },
})

const { graph: g1, state: s1 } = useGraph()
const { graph: g2, state: s2 } = useGraph()

onMounted(() => {
  g1.addNode({ id: 'a', transform: { x: 40, y: 40 }, outline: { kind: 'rect', w: 100, h: 48 } })
  g1.addNode({ id: 'b', transform: { x: 240, y: 140 }, outline: { kind: 'rect', w: 100, h: 48 } })
  g1.addEdge({ id: 'e', from: { node: 'a', anchor: 'nw' }, to: { node: 'b', anchor: 'nw' } })

  g2.addNode({ id: 'idea', transform: { x: 60, y: 60 }, outline: { kind: 'rect', w: 140, h: 60 } })
  g2.addNode({ id: 'plan', transform: { x: 280, y: 60 }, outline: { kind: 'rect', w: 140, h: 60 } })
  g2.addNode({
    id: 'ship',
    transform: { x: 280, y: 200 },
    outline: { kind: 'rect', w: 140, h: 60 },
  })
  g2.addEdge({ id: 'e1', from: { node: 'idea', anchor: 'nw' }, to: { node: 'plan', anchor: 'nw' } })
  g2.addEdge({ id: 'e2', from: { node: 'plan', anchor: 'nw' }, to: { node: 'ship', anchor: 'nw' } })
})

const propsData: PropDef[] = [
  { name: 'graph', description: 'GraphEngine instance from `useGraph()`.', type: 'GraphEngine' },
  { name: 'state', description: 'Reactive `GraphState` snapshot.', type: 'GraphState' },
  {
    name: 'width / height',
    description: 'Canvas dimensions.',
    type: 'number | string',
    default: "'100%' / 400",
  },
  {
    name: 'draggableNodes',
    description: 'Drag node wrappers to move them.',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'panZoom',
    description: 'Wheel-zoom + canvas-drag pan.',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'selectionMode',
    description: 'Single or multi selection.',
    type: "'single' | 'multi'",
    default: "'single'",
  },
  { name: 'selectedNodeIds', description: 'Controlled selection.', type: 'NodeId[]' },
  {
    name: 'fileName',
    description: 'Base name for `.print()`.',
    type: 'string',
    default: "'diagram'",
  },
  { name: 'unstyled', description: 'Strip Skygraph styles.', type: 'boolean', default: 'false' },
]

const BASIC = `const { graph, state } = useGraph()
graph.addNode({ id: 'a', transform: { x: 0, y: 0 }, outline: { kind: 'rect', w: 100, h: 48 } })
graph.addNode({ id: 'b', transform: { x: 200, y: 80 }, outline: { kind: 'rect', w: 100, h: 48 } })
graph.addEdge({ id: 'e', from: { node: 'a', anchor: 'nw' }, to: { node: 'b', anchor: 'nw' } })

<SgDiagram :graph="graph" :state="state" />`

const CUSTOM = `<SgDiagram :graph="graph" :state="state">
  <template #node="{ node }">
    <div class="my-node">{{ node.id }}</div>
  </template>
</SgDiagram>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Diagram']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgDiagram :graph="g1" :state="s1" :height="280" />
    </DemoBox>

    <DemoBox :title="t.customTitle" :description="t.customDesc" :code="CUSTOM">
      <SgDiagram :graph="g2" :state="s2" :height="320">
        <template #node="{ node }">
          <div
            style="
              padding: 12px 16px;
              border-radius: 8px;
              background: var(--sg-color-primary);
              color: var(--sg-color-text-light-solid, #fff);
              font-weight: 600;
              text-transform: uppercase;
              font-size: 12px;
              letter-spacing: 0.4px;
            "
          >
            {{ node.id }}
          </div>
        </template>
      </SgDiagram>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
