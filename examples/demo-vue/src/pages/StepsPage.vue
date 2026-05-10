<script setup lang="ts">
import { ref } from 'vue'
import { SgButton, SgSteps, type StepItem } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Steps',
    lead: 'Linear progress through a multi-stage workflow — wizard / checkout / onboarding.',
    when1: 'A signup flow with 3-5 stages where progress matters.',
    when2: 'Order checkout — Cart / Address / Payment / Confirm.',
    basicTitle: 'Basic',
    basicDesc: 'Horizontal layout, current step highlighted.',
    interactiveTitle: 'Interactive',
    interactiveDesc: 'Use buttons to advance / rewind.',
    verticalTitle: 'Vertical',
    verticalDesc: 'Stack steps vertically (sidebars).',
    statusTitle: 'Per-step status override',
    statusDesc: 'Mark a single step as `error` even when current advanced past it.',
  },
  ru: {
    title: 'Steps',
    lead: 'Линейный прогресс по многошаговому процессу — wizard / оформление / onboarding.',
    when1: 'Регистрация с 3-5 этапами, где важен прогресс.',
    when2: 'Оформление заказа — Корзина / Адрес / Оплата / Готово.',
    basicTitle: 'Basic',
    basicDesc: 'Горизонтальный layout, текущий шаг подсвечен.',
    interactiveTitle: 'Интерактив',
    interactiveDesc: 'Кнопки вперёд / назад.',
    verticalTitle: 'Вертикально',
    verticalDesc: 'Вертикальный стек шагов (для сайдбаров).',
    statusTitle: 'Override статуса шага',
    statusDesc: 'Один шаг в `error`, даже если текущий ушёл дальше.',
  },
})

const items: StepItem[] = [
  { title: 'Cart', description: 'Review your items.' },
  { title: 'Address', description: 'Where to ship.' },
  { title: 'Payment', description: 'Card / wallet.' },
  { title: 'Done', description: 'Receipt issued.' },
]

const itemsErr: StepItem[] = [
  { title: 'Cart' },
  { title: 'Address', status: 'error' },
  { title: 'Payment' },
  { title: 'Done' },
]

const cur = ref(1)
const next = () => {
  cur.value = Math.min(cur.value + 1, items.length - 1)
}
const prev = () => {
  cur.value = Math.max(cur.value - 1, 0)
}

const propsData: PropDef[] = [
  { name: 'current', description: 'Zero-based active step.', type: 'number', required: true },
  { name: 'items', description: 'Steps in display order.', type: 'StepItem[]', required: true },
  {
    name: 'direction',
    description: 'Stack direction.',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
  },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle' | 'large'" },
  {
    name: 'type',
    description: 'Visual variant.',
    type: "'default' | 'navigation'",
    default: "'default'",
  },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const itemPropsTable: PropDef[] = [
  { name: 'title', description: 'Primary step title.', type: 'string', required: true },
  { name: 'description', description: 'Optional secondary text.', type: 'string' },
  {
    name: 'status',
    description: 'Override auto-derived status.',
    type: "'wait' | 'process' | 'finish' | 'error'",
  },
]

const BASIC = `<SgSteps :current="1" :items="items" />`
const INTERACTIVE = `<SgSteps :current="cur" :items="items" />
<SgButton @click="prev">Prev</SgButton>
<SgButton type="primary" @click="next">Next</SgButton>`
const VERTICAL = `<SgSteps direction="vertical" :current="2" :items="items" />`
const STATUS = `<SgSteps :current="2" :items="[
  { title: 'Cart' },
  { title: 'Address', status: 'error' },
  { title: 'Payment' },
  { title: 'Done' },
]" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="navigation"
    :crumbs="['Navigation', 'Steps']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC" vertical>
      <SgSteps :current="1" :items="items" />
    </DemoBox>

    <DemoBox
      :title="t.interactiveTitle"
      :description="t.interactiveDesc"
      :code="INTERACTIVE"
      vertical
    >
      <SgSteps :current="cur" :items="items" />
      <div style="display: flex; gap: 8px">
        <SgButton :disabled="cur === 0" @click="prev">Prev</SgButton>
        <SgButton :disabled="cur === items.length - 1" type="primary" @click="next">Next</SgButton>
      </div>
    </DemoBox>

    <DemoBox :title="t.verticalTitle" :description="t.verticalDesc" :code="VERTICAL" vertical>
      <SgSteps direction="vertical" :current="2" :items="items" />
    </DemoBox>

    <DemoBox :title="t.statusTitle" :description="t.statusDesc" :code="STATUS" vertical>
      <SgSteps :current="2" :items="itemsErr" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
      <PropsTable title="StepItem" :data="itemPropsTable" />
    </template>
  </ComponentDoc>
</template>
