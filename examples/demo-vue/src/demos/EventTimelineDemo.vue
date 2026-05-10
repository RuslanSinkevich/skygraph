<script setup lang="ts">
/**
 * EventTimeline aggregator (Wave 3.2 / Tab D).
 * Vue is wider than React: 3 demos vs 2 (carta §D, «Vue шире», don't shrink).
 * Mirrors React `examples/demo/src/demos/EventTimelineDemo.tsx`.
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
import { useEventTimelineDocStrings } from './event-timeline-doc/useStrings'

import VerticalEt from './event-timeline/Vertical.demo.vue'
import VerticalSource from './event-timeline/Vertical.demo.vue?raw'
import HorizontalEt from './event-timeline/Horizontal.demo.vue'
import HorizontalSource from './event-timeline/Horizontal.demo.vue?raw'
import MonthGroupEt from './event-timeline/MonthGroup.demo.vue'
import MonthGroupSource from './event-timeline/MonthGroup.demo.vue?raw'

const t = useEventTimelineDocStrings()

const eventTimelineProps = computed<PropDef[]>(() => [
  { name: 'events', description: t.value.propEvents, type: 'TimelineEvent[]', required: true },
  { name: 'orientation', description: t.value.propOrientation, type: "'horizontal' | 'vertical'", default: "'vertical'" },
  { name: 'groupBy', description: t.value.propGroupBy, type: "'day' | 'month' | 'year'" },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
])

const eventProps = computed<PropDef[]>(() => [
  { name: 'id', description: t.value.propEventId, type: 'string', required: true },
  { name: 'date', description: t.value.propEventDate, type: 'Date | number', required: true },
  { name: 'title', description: t.value.propEventTitle, type: 'string', required: true },
  { name: 'description', description: t.value.propEventDescription, type: 'string' },
  { name: 'color', description: t.value.propEventColor, type: 'string' },
])

const eventTimelineCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssSgColorPrimary },
  { name: 'sg-color-bg', default: '#ffffff', description: t.value.cssSgColorBg },
  { name: 'sg-color-border-secondary', default: '#f0f0f0', description: t.value.cssSgColorBorderSecondary },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.value.cssSgColorTextSecondary },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.value.cssSgColorTextTertiary },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-line-height', default: '1.57', description: t.value.cssSgLineHeight },
  { name: 'sg-margin-md', default: '16px', description: t.value.cssSgMarginMd },
  { name: 'sg-margin-sm', default: '8px', description: t.value.cssSgMarginSm },
  { name: 'sg-margin-xs', default: '4px', description: t.value.cssSgMarginXs },
  { name: 'sg-padding-md', default: '12px', description: t.value.cssSgPaddingMd },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssSgPaddingSm },
  { name: 'sg-padding-xs', default: '4px', description: t.value.cssSgPaddingXs },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbEventTimeline]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoVerticalTitle" :description="t.demoVerticalDesc" :code="VerticalSource">
      <VerticalEt />
    </DemoBox>

    <DemoBox :title="t.demoHorizontalTitle" :description="t.demoHorizontalDesc" :code="HorizontalSource">
      <HorizontalEt />
    </DemoBox>

    <DemoBox :title="t.demoMonthTitle" :description="t.demoMonthDesc" :code="MonthGroupSource">
      <MonthGroupEt />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableEventTimelineApi" :data="eventTimelineProps" />
      <PropsTable :title="t.tableEventApi" :data="eventProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="eventTimelineCssVars" />
    </template>
  </ComponentDoc>
</template>
