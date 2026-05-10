<script setup lang="ts">
import { SgEventTimeline } from '@skygraph/vue'
import type { TimelineEvent } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'EventTimeline',
    lead: 'Chronological list of events grouped by day / month / year, horizontal or vertical.',
    when1: 'Audit logs, release histories, "what happened" sequences.',
    when2: 'When users want a glanceable chronology with grouping.',
    verticalTitle: 'Vertical',
    verticalDesc: 'Default vertical orientation grouped by day.',
    horizontalTitle: 'Horizontal',
    horizontalDesc: 'Lay events along the X axis instead.',
    monthTitle: 'Group by month',
    monthDesc: 'Coarser grouping for long ranges.',
  },
  ru: {
    title: 'EventTimeline',
    lead: 'Хронологический список событий: группировка day / month / year, горизонтально или вертикально.',
    when1: 'Audit-логи, истории релизов, последовательности «что было».',
    when2: 'Когда нужен glanceable-хроно с группировкой.',
    verticalTitle: 'Вертикально',
    verticalDesc: 'Дефолт — vertical, group by day.',
    horizontalTitle: 'Горизонтально',
    horizontalDesc: 'События вдоль X-оси.',
    monthTitle: 'Группировка month',
    monthDesc: 'Шире группы для длинных диапазонов.',
  },
})

function date(s: string) {
  return new Date(s)
}

const events: TimelineEvent[] = [
  {
    id: '1',
    date: date('2026-04-12T08:30'),
    title: 'Repo created',
    description: 'Project bootstrap',
  },
  { id: '2', date: date('2026-04-12T14:00'), title: 'CI pipeline added' },
  {
    id: '3',
    date: date('2026-04-15T11:00'),
    title: 'First release',
    color: 'var(--sg-color-success)',
  },
  { id: '4', date: date('2026-04-22T10:00'), title: 'Schema v2', description: 'Breaking change' },
  { id: '5', date: date('2026-05-01T16:00'), title: 'New theme', color: 'var(--sg-color-warning)' },
  { id: '6', date: date('2026-05-05T09:00'), title: 'Performance pass' },
]

const propsData: PropDef[] = [
  { name: 'events', description: 'Timeline events.', type: 'TimelineEvent[]' },
  {
    name: 'orientation',
    description: 'Layout direction.',
    type: "'horizontal' | 'vertical'",
    default: "'vertical'",
  },
  {
    name: 'groupBy',
    description: 'Grouping bucket.',
    type: "'day' | 'month' | 'year'",
    default: "'day'",
  },
  { name: 'unstyled', description: 'Strip Skygraph styles.', type: 'boolean', default: 'false' },
]

const VERT = `<SgEventTimeline :events="events" />`
const HORIZ = `<SgEventTimeline orientation="horizontal" :events="events" />`
const MONTH = `<SgEventTimeline group-by="month" :events="events" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'EventTimeline']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.verticalTitle" :description="t.verticalDesc" :code="VERT">
      <SgEventTimeline :events="events" />
    </DemoBox>

    <DemoBox :title="t.horizontalTitle" :description="t.horizontalDesc" :code="HORIZ">
      <SgEventTimeline orientation="horizontal" :events="events" />
    </DemoBox>

    <DemoBox :title="t.monthTitle" :description="t.monthDesc" :code="MONTH">
      <SgEventTimeline group-by="month" :events="events" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
