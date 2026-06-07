<script setup lang="ts">
/**
 * ResourceCalendar aggregator — 1:1 with React
 * `examples/demo/src/demos/ResourceCalendarDemo.tsx`. Two demos: Basic
 * (drag/resize, overlap conflict) and WithCapacity (capacityPerSlot →
 * `@conflict` panel).
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
import { useResourceCalendarDocStrings } from './resource-calendar-doc/useStrings'

import BasicRc from './resource-calendar/Basic.demo.vue'
import BasicSource from './resource-calendar/Basic.demo.vue?raw'
import WithCapacityRc from './resource-calendar/WithCapacity.demo.vue'
import WithCapacitySource from './resource-calendar/WithCapacity.demo.vue?raw'

const t = useResourceCalendarDocStrings()

const calendarProps = computed<PropDef[]>(() => [
  { name: 'resources', description: t.value.propResources, type: 'readonly Resource[]' },
  { name: 'assignments', description: t.value.propAssignments, type: 'readonly Assignment[]' },
  {
    name: 'scale',
    description: t.value.propScale,
    type: "'day' | 'week' | 'month'",
    default: "'week'",
  },
  { name: 'range', description: t.value.propRange, type: '{ from: Date; to: Date }' },
  { name: 'columnWidth', description: t.value.propColumnWidth, type: 'number', default: '120' },
  { name: 'rowHeight', description: t.value.propRowHeight, type: 'number', default: '56' },
  { name: 'sidebarWidth', description: t.value.propSidebarWidth, type: 'number', default: '200' },
  { name: 'draggable', description: t.value.propDraggable, type: 'boolean', default: 'false' },
  { name: 'resizable', description: t.value.propResizable, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@assignmentChange',
    description: t.value.propEmitAssignmentChange,
    type: '(next: Assignment) => void',
  },
  {
    name: '@conflict',
    description: t.value.propEmitConflict,
    type: '(conflicts: Conflict[]) => void',
  },
])

const calendarCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-rcal-availability-off-bg',
    default: 'var(--sg-color-bg-disabled)',
    description: t.value.cssSgRcalAvailabilityOffBg,
  },
  {
    name: 'sg-rcal-conflict-color',
    default: 'var(--sg-color-error)',
    description: t.value.cssSgRcalConflictColor,
  },
  {
    name: 'sg-rcal-conflict-bg',
    default: 'var(--sg-color-error-bg)',
    description: t.value.cssSgRcalConflictBg,
  },
  {
    name: 'sg-rcal-tentative-bg',
    default: 'var(--sg-color-primary-bg)',
    description: t.value.cssSgRcalTentativeBg,
  },
  {
    name: 'sg-rcal-tentative-border',
    default: 'var(--sg-color-primary)',
    description: t.value.cssSgRcalTentativeBorder,
  },
  {
    name: 'sg-rcal-confirmed-bg',
    default: 'var(--sg-color-primary)',
    description: t.value.cssSgRcalConfirmedBg,
  },
  {
    name: 'sg-rcal-confirmed-text',
    default: 'var(--sg-color-white)',
    description: t.value.cssSgRcalConfirmedText,
  },
  { name: 'sg-rcal-marker-size', default: '10px', description: t.value.cssSgRcalMarkerSize },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbResourceCalendar]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource" flush>
      <BasicRc />
    </DemoBox>

    <DemoBox
      :title="t.demoWithCapacityTitle"
      :description="t.demoWithCapacityDesc"
      :code="WithCapacitySource"
      flush
    >
      <WithCapacityRc />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableCalendarApi" :data="calendarProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="calendarCssVars" />
    </template>
  </ComponentDoc>
</template>
