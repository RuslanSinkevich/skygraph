<script setup lang="ts">
import { SgProgress } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Progress',
    lead: 'Bar or circle progress indicator with status and custom color.',
    when1: 'Show how far a long-running task is to completion.',
    when2: 'Use circle variant in cards or compact UIs.',
    lineTitle: 'Line',
    lineDesc: 'Default horizontal bar.',
    statusTitle: 'Status',
    statusDesc: 'Success / error / active states.',
    circleTitle: 'Circle',
    circleDesc: 'Circular progress with center label.',
  },
  ru: {
    title: 'Progress',
    lead: 'Прогресс-бар или круг со статусом и кастомным цветом.',
    when1: 'Показать прогресс долгой задачи.',
    when2: 'Circle вариант для карточек и компактных UI.',
    lineTitle: 'Line',
    lineDesc: 'Горизонтальный bar по умолчанию.',
    statusTitle: 'Статус',
    statusDesc: 'success / error / active.',
    circleTitle: 'Circle',
    circleDesc: 'Круговой прогресс со значением в центре.',
  },
})

const propsData: PropDef[] = [
  { name: 'percent', description: 'Completion 0–100 (clamped).', type: 'number', required: true },
  { name: 'type', description: 'Bar or circle.', type: "'line' | 'circle'", default: "'line'" },
  { name: 'status', description: 'Visual state.', type: "'normal' | 'success' | 'error' | 'active'", default: "'normal'" },
  { name: 'showInfo', description: 'Show numeric label.', type: 'boolean', default: 'true' },
  { name: 'strokeColor', description: 'Custom filled-portion color.', type: 'string' },
  { name: 'strokeWidth', description: 'Bar/stroke thickness.', type: 'number' },
]

const LINE = `<SgProgress :percent="30" />
<SgProgress :percent="70" />
<SgProgress :percent="100" />`
const STATUS = `<SgProgress :percent="60" status="active" />
<SgProgress :percent="60" status="error" />`
const CIRCLE = `<SgProgress type="circle" :percent="65" />
<SgProgress type="circle" :percent="100" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="feedback"
    :crumbs="['Feedback', 'Progress']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.lineTitle" :description="t.lineDesc" :code="LINE" vertical>
      <SgProgress :percent="30" />
      <SgProgress :percent="70" />
      <SgProgress :percent="100" />
    </DemoBox>

    <DemoBox :title="t.statusTitle" :description="t.statusDesc" :code="STATUS" vertical>
      <SgProgress :percent="60" status="active" />
      <SgProgress :percent="60" status="error" />
    </DemoBox>

    <DemoBox :title="t.circleTitle" :description="t.circleDesc" :code="CIRCLE">
      <SgProgress type="circle" :percent="65" />
      <SgProgress type="circle" :percent="100" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
