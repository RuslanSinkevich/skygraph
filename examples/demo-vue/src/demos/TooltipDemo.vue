<script setup lang="ts">
/**
 * `TooltipDemo` — aggregator for the Tooltip component page.
 * Mirrors `examples/demo/src/demos/TooltipDemo.tsx` 1:1 (7/7).
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

import { useTooltipDocStrings } from './tooltip-doc/useStrings'

import BasicTooltip from './tooltip/Basic.demo.vue'
import BasicSource from './tooltip/Basic.demo.vue?raw'
import PlacementTooltip from './tooltip/Placement.demo.vue'
import PlacementSource from './tooltip/Placement.demo.vue?raw'
import RichContentTooltip from './tooltip/RichContent.demo.vue'
import RichContentSource from './tooltip/RichContent.demo.vue?raw'
import OnDisabledTooltip from './tooltip/OnDisabled.demo.vue'
import OnDisabledSource from './tooltip/OnDisabled.demo.vue?raw'
import OnIconTooltip from './tooltip/OnIcon.demo.vue'
import OnIconSource from './tooltip/OnIcon.demo.vue?raw'
import TokensOverrideTooltip from './tooltip/TokensOverride.demo.vue'
import TokensOverrideSource from './tooltip/TokensOverride.demo.vue?raw'

const t = useTooltipDocStrings()

const tooltipProps = computed<PropDef[]>(() => [
  { name: 'title', description: t.value.propTitle, type: 'string' },
  {
    name: 'placement',
    description: t.value.propPlacement,
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
  },
  { name: '#default', description: t.value.propChildren, type: 'slot' },
  { name: '#title', description: t.value.propTitleSlot, type: 'slot' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
])

const tooltipCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-color-tooltip-bg',
    default: 'rgba(0, 0, 0, 0.85)',
    description: t.value.cssTooltipBg,
  },
  { name: 'sg-color-tooltip-text', default: '#ffffff', description: t.value.cssTooltipText },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssFontSizeSm },
  { name: 'sg-padding-xs', default: '4px', description: t.value.cssPaddingXs },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssPaddingSm },
  { name: 'sg-border-radius-sm', default: '4px', description: t.value.cssRadiusSm },
  { name: 'sg-shadow', default: '0 6px 16px rgba(0,0,0,0.08)', description: t.value.cssShadow },
  { name: 'sg-z-tooltip', default: '1070', description: t.value.cssZTooltip },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicTooltip />
    </DemoBox>

    <DemoBox
      :title="t.demoPlacementTitle"
      :description="t.demoPlacementDesc"
      :code="PlacementSource"
    >
      <PlacementTooltip />
    </DemoBox>

    <DemoBox :title="t.demoRichTitle" :description="t.demoRichDesc" :code="RichContentSource">
      <RichContentTooltip />
    </DemoBox>

    <DemoBox
      :title="t.demoDisabledTitle"
      :description="t.demoDisabledDesc"
      :code="OnDisabledSource"
    >
      <OnDisabledTooltip />
    </DemoBox>

    <DemoBox :title="t.demoIconTitle" :description="t.demoIconDesc" :code="OnIconSource">
      <OnIconTooltip />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideTooltip />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableTooltipApi" :data="tooltipProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="tooltipCssVars" />
    </template>
  </ComponentDoc>
</template>
