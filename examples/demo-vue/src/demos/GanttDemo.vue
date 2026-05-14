<script setup lang="ts">
/**
 * Gantt aggregator — 1:1 with React `examples/demo/src/demos/GanttDemo.tsx`.
 * Two demos: Basic (draggable + dependencies + resources) and Scale (runtime
 * granularity switcher).
 */
import { computed } from 'vue'
import {
  ComponentDoc,
  DemoBox,
  PropsTable,
  CssVarsTable,
  type PropDef,
  type CssVarDef,
} from './components'
import { useGanttDocStrings } from './gantt-doc/useStrings'

import BasicGantt from './gantt/Basic.demo.vue'
import BasicSource from './gantt/Basic.demo.vue?raw'
import ScaleGantt from './gantt/Scale.demo.vue'
import ScaleSource from './gantt/Scale.demo.vue?raw'

const t = useGanttDocStrings()

const ganttProps = computed<PropDef[]>(() => [
  { name: 'tasks', description: t.value.propTasks, type: 'GanttTask[]', required: true },
  { name: 'resources', description: t.value.propResources, type: 'GanttResource[]' },
  {
    name: 'scale',
    description: t.value.propScale,
    type: "'day' | 'week' | 'month' | 'quarter'",
    default: "'day'",
  },
  { name: 'range', description: t.value.propRange, type: '{ from: Date; to: Date }' },
  { name: 'rowHeight', description: t.value.propRowHeight, type: 'number', default: '32' },
  { name: 'columnWidth', description: t.value.propColumnWidth, type: 'number', default: '40' },
  { name: 'sidebarWidth', description: t.value.propSidebarWidth, type: 'number', default: '200' },
  { name: 'draggable', description: t.value.propDraggable, type: 'boolean', default: 'false' },
  { name: 'resizable', description: t.value.propResizable, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@taskChange',
    description: t.value.propEmitTaskChange,
    type: '(task: GanttTask) => void',
  },
])

const taskProps = computed<PropDef[]>(() => [
  { name: 'id', description: t.value.propTaskId, type: 'string', required: true },
  { name: 'name', description: t.value.propTaskName, type: 'string', required: true },
  { name: 'start', description: t.value.propTaskStart, type: 'Date | number', required: true },
  { name: 'end', description: t.value.propTaskEnd, type: 'Date | number', required: true },
  { name: 'progress', description: t.value.propTaskProgress, type: 'number' },
  { name: 'parentId', description: t.value.propTaskParentId, type: 'string' },
  { name: 'dependencies', description: t.value.propTaskDependencies, type: 'string[]' },
  { name: 'resourceId', description: t.value.propTaskResourceId, type: 'string' },
  { name: 'color', description: t.value.propTaskColor, type: 'string' },
])

const resourceProps = computed<PropDef[]>(() => [
  { name: 'id', description: t.value.propResourceId, type: 'string', required: true },
  { name: 'name', description: t.value.propResourceName, type: 'string', required: true },
])

const ganttCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssSgColorPrimary },
  {
    name: 'sg-color-primary-active',
    default: '#0958d9',
    description: t.value.cssSgColorPrimaryActive,
  },
  { name: 'sg-color-white', default: '#ffffff', description: t.value.cssSgColorWhite },
  { name: 'sg-color-bg', default: '#ffffff', description: t.value.cssSgColorBg },
  { name: 'sg-color-bg-container', default: '#fafafa', description: t.value.cssSgColorBgContainer },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.value.cssSgColorBgElevated },
  { name: 'sg-color-bg-secondary', default: '#fafafa', description: t.value.cssSgColorBgSecondary },
  { name: 'sg-color-border', default: '#d9d9d9', description: t.value.cssSgColorBorder },
  {
    name: 'sg-color-border-secondary',
    default: '#f0f0f0',
    description: t.value.cssSgColorBorderSecondary,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssSgColorTextSecondary,
  },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssSgBorderRadius },
  { name: 'sg-border-radius-sm', default: '4px', description: t.value.cssSgBorderRadiusSm },
  { name: 'sg-padding-md', default: '12px', description: t.value.cssSgPaddingMd },
  { name: 'sg-padding-xs', default: '4px', description: t.value.cssSgPaddingXs },
  {
    name: 'sg-shadow-sm',
    default: '0 1px 2px rgba(0, 0, 0, 0.05)',
    description: t.value.cssSgShadowSm,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbGantt]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicGantt />
    </DemoBox>

    <DemoBox :title="t.demoScaleTitle" :description="t.demoScaleDesc" :code="ScaleSource">
      <ScaleGantt />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableGanttApi" :data="ganttProps" />
      <PropsTable :title="t.tableTaskApi" :data="taskProps" />
      <PropsTable :title="t.tableResourceApi" :data="resourceProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="ganttCssVars" />
    </template>
  </ComponentDoc>
</template>
