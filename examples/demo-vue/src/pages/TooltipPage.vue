<script setup lang="ts">
import { SgButton, SgTooltip } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Tooltip',
    lead: 'Short text bubble shown on hover or focus.',
    when1: 'Reveal a hint about a control without taking screen real estate.',
    when2: 'Avoid for content that is essential — hover-only is not accessible.',
    placementTitle: 'Placement',
    placementDesc: 'Top, bottom, left, right.',
    onFocusTitle: 'On focus',
    onFocusDesc: 'Tooltip also opens on keyboard focus.',
  },
  ru: {
    title: 'Tooltip',
    lead: 'Короткая подсказка по hover или focus.',
    when1: 'Подсказка к контролу без занятия места.',
    when2: 'Не подходит для критичного контента — только hover не доступно.',
    placementTitle: 'Расположение',
    placementDesc: 'Top, bottom, left, right.',
    onFocusTitle: 'По фокусу',
    onFocusDesc: 'Tooltip также открывается по клавиатурному фокусу.',
  },
})

const propsData: PropDef[] = [
  { name: 'title', description: 'Tooltip text content.', type: 'string', required: true },
  { name: 'placement', description: 'Position relative to the trigger.', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'" },
]

const PLACE = `<SgTooltip title="Top"><SgButton>Top</SgButton></SgTooltip>
<SgTooltip placement="bottom" title="Bottom"><SgButton>Bottom</SgButton></SgTooltip>`
const FOCUS = `<SgTooltip title="Hint"><SgButton>Tab here</SgButton></SgTooltip>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="feedback"
    :crumbs="['Feedback', 'Tooltip']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.placementTitle" :description="t.placementDesc" :code="PLACE">
      <SgTooltip title="Top tooltip"><SgButton>Top</SgButton></SgTooltip>
      <SgTooltip placement="bottom" title="Bottom tooltip"><SgButton>Bottom</SgButton></SgTooltip>
      <SgTooltip placement="left" title="Left tooltip"><SgButton>Left</SgButton></SgTooltip>
      <SgTooltip placement="right" title="Right tooltip"><SgButton>Right</SgButton></SgTooltip>
    </DemoBox>

    <DemoBox :title="t.onFocusTitle" :description="t.onFocusDesc" :code="FOCUS">
      <SgTooltip title="Activated by focus too">
        <SgButton>Tab to me</SgButton>
      </SgTooltip>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
