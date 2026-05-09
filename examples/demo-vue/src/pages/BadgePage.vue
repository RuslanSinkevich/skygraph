<script setup lang="ts">
import { SgBadge, SgAvatar } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Badge',
    lead: 'Small numerical value or status descriptor on top of an element.',
    when1: 'Unread counters, notification dots, status indicators.',
    when2: 'Use `dot` for "new" markers without a number.',
    countTitle: 'Count',
    countDesc: 'Number badge wrapping content.',
    overflowTitle: 'Overflow',
    overflowDesc: 'Display max+ when count exceeds overflowCount.',
    statusTitle: 'Status',
    statusDesc: 'Standalone status dot with text.',
  },
  ru: {
    title: 'Badge',
    lead: 'Маленькая цифра или статус на углу элемента.',
    when1: 'Счётчики непрочитанного, уведомления, индикаторы статуса.',
    when2: '`dot` — маркер "new" без числа.',
    countTitle: 'Счётчик',
    countDesc: 'Цифровой badge поверх контента.',
    overflowTitle: 'Overflow',
    overflowDesc: '`max+` если count превышает overflowCount.',
    statusTitle: 'Статус',
    statusDesc: 'Standalone статус-точка с текстом.',
  },
})

const propsData: PropDef[] = [
  { name: 'count', description: 'Numeric value to display.', type: 'number' },
  { name: 'dot', description: 'Render a small indicator dot.', type: 'boolean', default: 'false' },
  { name: 'overflowCount', description: 'Threshold above which `count+` is shown.', type: 'number', default: '99' },
  { name: 'showZero', description: 'Render badge when count is zero.', type: 'boolean', default: 'false' },
  { name: 'status', description: 'Preset status style.', type: "'success' | 'error' | 'warning' | 'processing' | 'default'" },
  { name: 'text', description: 'Status label.', type: 'string' },
]

const COUNT = `<SgBadge :count="5"><SgAvatar>U</SgAvatar></SgBadge>
<SgBadge dot><SgAvatar>U</SgAvatar></SgBadge>`
const OVERFLOW = `<SgBadge :count="120" :overflow-count="99"><SgAvatar>U</SgAvatar></SgBadge>`
const STATUS = `<SgBadge status="success" text="Success" />
<SgBadge status="error" text="Error" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Badge']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.countTitle" :description="t.countDesc" :code="COUNT">
      <SgBadge :count="5"><SgAvatar>U</SgAvatar></SgBadge>
      <SgBadge dot><SgAvatar>U</SgAvatar></SgBadge>
    </DemoBox>

    <DemoBox :title="t.overflowTitle" :description="t.overflowDesc" :code="OVERFLOW">
      <SgBadge :count="120" :overflow-count="99"><SgAvatar>U</SgAvatar></SgBadge>
    </DemoBox>

    <DemoBox :title="t.statusTitle" :description="t.statusDesc" :code="STATUS">
      <SgBadge status="success" text="Success" />
      <SgBadge status="error" text="Error" />
      <SgBadge status="warning" text="Warning" />
      <SgBadge status="processing" text="Processing" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
