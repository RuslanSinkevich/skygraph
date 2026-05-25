<script setup lang="ts">
/**
 * Dashboard aggregator (Wave 3.2 / Tab D). 7 demos, no CssVarsTable
 * (parity with React; carta §C — `dashboard-no-css-vars`).
 */
import { computed } from 'vue'
import { ComponentDoc, DemoBox, PropsTable, type PropDef } from './components'
import { useDashboardDocStrings } from './dashboard-doc/useStrings'

import BasicDb from './dashboard/Basic.demo.vue'
import BasicSource from './dashboard/Basic.demo.vue?raw'
import EditorDb from './dashboard/Editor.demo.vue'
import EditorSource from './dashboard/Editor.demo.vue?raw'
import WithActionsDb from './dashboard/WithActions.demo.vue'
import WithActionsSource from './dashboard/WithActions.demo.vue?raw'
import MixedDb from './dashboard/Mixed.demo.vue'
import MixedSource from './dashboard/Mixed.demo.vue?raw'
import ResponsiveDb from './dashboard/Responsive.demo.vue'
import ResponsiveSource from './dashboard/Responsive.demo.vue?raw'
import RealtimeDb from './dashboard/Realtime.demo.vue'
import RealtimeSource from './dashboard/Realtime.demo.vue?raw'
import LargeGridDb from './dashboard/LargeGrid.demo.vue'
import LargeGridSource from './dashboard/LargeGrid.demo.vue?raw'

const t = useDashboardDocStrings()

const dashboardProps = computed<PropDef[]>(() => [
  { name: 'widgets', description: t.value.propWidgets, type: 'DashboardWidget[]', required: true },
  { name: 'columns', description: t.value.propColumns, type: 'number', default: '12' },
  { name: 'rowHeight', description: t.value.propRowHeight, type: 'number', default: '80' },
  { name: 'gap', description: t.value.propGap, type: 'number', default: '8' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
])

const widgetProps = computed<PropDef[]>(() => [
  { name: 'id', description: t.value.widgetId, type: 'string', required: true },
  { name: 'title', description: t.value.widgetTitle, type: 'string' },
  { name: 'x', description: t.value.widgetX, type: 'number', required: true },
  { name: 'y', description: t.value.widgetY, type: 'number', required: true },
  { name: 'w', description: t.value.widgetW, type: 'number', default: '1' },
  { name: 'h', description: t.value.widgetH, type: 'number', default: '1' },
  { name: 'className', description: t.value.widgetClassName, type: 'string' },
  { name: 'style', description: t.value.widgetStyle, type: 'CSSProperties' },
])

const editorProps = computed<PropDef[]>(() => [
  { name: 'widgets', description: t.value.propWidgets, type: 'DashboardWidget[]', required: true },
  { name: 'columns', description: t.value.propColumns, type: 'number', default: '12' },
  { name: 'rowHeight', description: t.value.propRowHeight, type: 'number', default: '80' },
  { name: 'gap', description: t.value.propGap, type: 'number', default: '8' },
  { name: 'draggable', description: t.value.editorDraggable, type: 'boolean', default: 'true' },
  { name: 'resizable', description: t.value.editorResizable, type: 'boolean', default: 'true' },
  { name: 'minW', description: t.value.editorMinW, type: 'number', default: '1' },
  { name: 'minH', description: t.value.editorMinH, type: 'number', default: '1' },
  {
    name: '@layout-change',
    description: t.value.editorEmitLayoutChange,
    type: '(widgets: DashboardWidget[]) => void',
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbDashboard]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource" flush>
      <BasicDb />
    </DemoBox>

    <DemoBox
      :title="t.demoActionsTitle"
      :description="t.demoActionsDesc"
      :code="WithActionsSource"
      flush
    >
      <WithActionsDb />
    </DemoBox>

    <DemoBox :title="t.demoEditorTitle" :description="t.demoEditorDesc" :code="EditorSource" flush>
      <EditorDb />
    </DemoBox>

    <DemoBox :title="t.demoMixedTitle" :description="t.demoMixedDesc" :code="MixedSource" flush>
      <MixedDb />
    </DemoBox>

    <DemoBox
      :title="t.demoResponsiveTitle"
      :description="t.demoResponsiveDesc"
      :code="ResponsiveSource"
      flush
    >
      <ResponsiveDb />
    </DemoBox>

    <DemoBox
      :title="t.demoRealtimeTitle"
      :description="t.demoRealtimeDesc"
      :code="RealtimeSource"
      flush
    >
      <RealtimeDb />
    </DemoBox>

    <DemoBox
      :title="t.demoLargeGridTitle"
      :description="t.demoLargeGridDesc"
      :code="LargeGridSource"
      flush
    >
      <LargeGridDb />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableDashboardApi" :data="dashboardProps" />
      <PropsTable :title="t.tableDashboardWidget" :data="widgetProps" />
      <PropsTable :title="t.tableEditorApi" :data="editorProps" />
    </template>
  </ComponentDoc>
</template>
