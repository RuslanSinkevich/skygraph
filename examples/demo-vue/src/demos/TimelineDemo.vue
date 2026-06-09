<script setup lang="ts">
/**
 * `TimelineDemo` — aggregator for the Timeline component page.
 *
 * 1:1 with `examples/demo/src/demos/TimelineDemo.tsx`:
 *   - Same 10 demos in the same order.
 *   - `TimelineItem.content` / `dot` / `label` accept strings (backwards
 *     compatible), and the `#content` / `#dot` / `#label` scoped slots
 *     accept any VNode (analogue of React's `ReactNode`).
 *   - The `#dot` slot exposes `isPending` so callers can render the
 *     equivalent of React's `pendingDot` prop.
 *   - React's `Events` and `Horizontal` demos are part of the separate
 *     EventTimeline page.
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

import { useTimelineDocStrings } from './timeline-doc/useStrings'

import BasicTimeline from './timeline/Basic.demo.vue'
import BasicSource from './timeline/Basic.demo.vue?raw'
import RightModeTimeline from './timeline/RightMode.demo.vue'
import RightModeSource from './timeline/RightMode.demo.vue?raw'
import AlternateTimeline from './timeline/Alternate.demo.vue'
import AlternateSource from './timeline/Alternate.demo.vue?raw'
import WithLabelTimeline from './timeline/WithLabel.demo.vue'
import WithLabelSource from './timeline/WithLabel.demo.vue?raw'
import PendingTimeline from './timeline/Pending.demo.vue'
import PendingSource from './timeline/Pending.demo.vue?raw'
import ReverseTimeline from './timeline/Reverse.demo.vue'
import ReverseSource from './timeline/Reverse.demo.vue?raw'
import CustomDotTimeline from './timeline/CustomDot.demo.vue'
import CustomDotSource from './timeline/CustomDot.demo.vue?raw'
import CustomColorTimeline from './timeline/CustomColor.demo.vue'
import CustomColorSource from './timeline/CustomColor.demo.vue?raw'
import TokensOverrideTimeline from './timeline/TokensOverride.demo.vue'
import TokensOverrideSource from './timeline/TokensOverride.demo.vue?raw'

const t = useTimelineDocStrings()

const timelineProps = computed<PropDef[]>(() => [
  { name: 'items', description: t.value.propItems, type: 'TimelineItem[]', required: true },
  {
    name: 'mode',
    description: t.value.propMode,
    type: "'left' | 'right' | 'alternate'",
    default: "'left'",
  },
  { name: 'pending', description: t.value.propPending, type: 'string | boolean' },
  { name: 'reverse', description: t.value.propReverse, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '#content',
    description: t.value.propContentSlot,
    type: 'slot({ item, index, isPending })',
  },
  { name: '#label', description: t.value.propLabelSlot, type: 'slot({ item, index })' },
  { name: '#dot', description: t.value.propDotSlot, type: 'slot({ item, index, isPending })' },
])

const timelineItemProps = computed<PropDef[]>(() => [
  { name: 'content', description: t.value.itemContent, type: 'string', required: true },
  { name: 'label', description: t.value.itemLabel, type: 'string' },
  { name: 'color', description: t.value.itemColor, type: 'string' },
  { name: 'dot', description: t.value.itemDot, type: 'string' },
  { name: 'position', description: t.value.itemPosition, type: "'left' | 'right'" },
])

const timelineCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssPrimary },
  {
    name: 'sg-color-border-secondary',
    default: '#f0f0f0',
    description: t.value.cssBorderSecondary,
  },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssTextTertiary,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssTextSecondary,
  },
  { name: 'sg-color-bg', default: '#ffffff', description: t.value.cssBg },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbTimeline]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicTimeline />
    </DemoBox>

    <DemoBox
      :title="t.demoRightModeTitle"
      :description="t.demoRightModeDesc"
      :code="RightModeSource"
    >
      <RightModeTimeline />
    </DemoBox>

    <DemoBox
      :title="t.demoAlternateTitle"
      :description="t.demoAlternateDesc"
      :code="AlternateSource"
    >
      <AlternateTimeline />
    </DemoBox>

    <DemoBox
      :title="t.demoWithLabelTitle"
      :description="t.demoWithLabelDesc"
      :code="WithLabelSource"
    >
      <WithLabelTimeline />
    </DemoBox>

    <DemoBox :title="t.demoPendingTitle" :description="t.demoPendingDesc" :code="PendingSource">
      <PendingTimeline />
    </DemoBox>

    <DemoBox :title="t.demoReverseTitle" :description="t.demoReverseDesc" :code="ReverseSource">
      <ReverseTimeline />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomDotTitle"
      :description="t.demoCustomDotDesc"
      :code="CustomDotSource"
    >
      <CustomDotTimeline />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomColorTitle"
      :description="t.demoCustomColorDesc"
      :code="CustomColorSource"
    >
      <CustomColorTimeline />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideTimeline />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableTimelineApi" :data="timelineProps" />
      <PropsTable :title="t.tableTimelineItemApi" :data="timelineItemProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="timelineCssVars" />
    </template>
  </ComponentDoc>
</template>
