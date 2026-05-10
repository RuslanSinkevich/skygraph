<script setup lang="ts">
/**
 * `EmptyDemo` — aggregator for the Empty component page.
 *
 * Mirrors `examples/demo/src/demos/EmptyDemo.tsx` (8 examples).
 * Vue-specific delta: `description` is `string | null` (no VNode
 * support); `image` is a Vue slot, not a prop. See findings →
 * `empty-rich-description-no-vue` for the gap.
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

import { useEmptyDocStrings } from './empty-doc/useStrings'

import BasicEmpty from './empty/Basic.demo.vue'
import BasicSource from './empty/Basic.demo.vue?raw'
import DescriptionEmpty from './empty/Description.demo.vue'
import DescriptionSource from './empty/Description.demo.vue?raw'
import NoDescriptionEmpty from './empty/NoDescription.demo.vue'
import NoDescriptionSource from './empty/NoDescription.demo.vue?raw'
import CustomImageEmpty from './empty/CustomImage.demo.vue'
import CustomImageSource from './empty/CustomImage.demo.vue?raw'
import WithActionsEmpty from './empty/WithActions.demo.vue'
import WithActionsSource from './empty/WithActions.demo.vue?raw'
import InCardEmpty from './empty/InCard.demo.vue'
import InCardSource from './empty/InCard.demo.vue?raw'
import TokensOverrideEmpty from './empty/TokensOverride.demo.vue'
import TokensOverrideSource from './empty/TokensOverride.demo.vue?raw'
import UnstyledEmpty from './empty/Unstyled.demo.vue'
import UnstyledSource from './empty/Unstyled.demo.vue?raw'

const t = useEmptyDocStrings()

const emptyProps = computed<PropDef[]>(() => [
  { name: 'description', description: t.value.propDescription, type: 'string | null' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '#image', description: t.value.propImageSlot, type: 'slot' },
  { name: '#default', description: t.value.propDefaultSlot, type: 'slot' },
])

const emptyCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssTextDisabled,
  },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssTextTertiary,
  },
  { name: 'sg-margin-xs', default: '8px', description: t.value.cssMarginXs },
  { name: 'sg-margin-sm', default: '12px', description: t.value.cssMarginSm },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbEmpty]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicEmpty />
    </DemoBox>

    <DemoBox
      :title="t.demoDescriptionTitle"
      :description="t.demoDescriptionDesc"
      :code="DescriptionSource"
    >
      <DescriptionEmpty />
    </DemoBox>

    <DemoBox
      :title="t.demoNoDescriptionTitle"
      :description="t.demoNoDescriptionDesc"
      :code="NoDescriptionSource"
    >
      <NoDescriptionEmpty />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomImageTitle"
      :description="t.demoCustomImageDesc"
      :code="CustomImageSource"
    >
      <CustomImageEmpty />
    </DemoBox>

    <DemoBox
      :title="t.demoWithActionsTitle"
      :description="t.demoWithActionsDesc"
      :code="WithActionsSource"
    >
      <WithActionsEmpty />
    </DemoBox>

    <DemoBox :title="t.demoInCardTitle" :description="t.demoInCardDesc" :code="InCardSource">
      <InCardEmpty />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideEmpty />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledEmpty />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableEmptyApi" :data="emptyProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="emptyCssVars" />
    </template>
  </ComponentDoc>
</template>
