<script setup lang="ts">
import { SgResourceCalendar } from '@skygraph/vue'
import type { ResourceCalendarAssignment, ResourceCalendarResource } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'ResourceCalendar',
    lead: 'Two-axis calendar — resources on Y, time on X — with assignments per cell.',
    when1: 'Room booking, staff scheduling, equipment allocation.',
    when2: 'Anything where rows are resources and columns are time slots.',
    weekTitle: 'Week scale',
    weekDesc: 'Default week view with daily columns.',
    dayTitle: 'Day scale',
    dayDesc: 'Hour-level columns.',
    interactiveTitle: 'Interactive',
    interactiveDesc: 'Allow drag / resize on assignment bars.',
  },
  ru: {
    title: 'ResourceCalendar',
    lead: 'Двухосевой календарь: resources по Y, время по X, assignments в ячейках.',
    when1: 'Бронирование переговорок, расписание сотрудников, аллокация техники.',
    when2: 'Когда строки — это ресурсы, а колонки — слоты времени.',
    weekTitle: 'Неделя',
    weekDesc: 'Дефолтный недельный вид с дневными колонками.',
    dayTitle: 'День',
    dayDesc: 'Колонки по часам.',
    interactiveTitle: 'Интерактив',
    interactiveDesc: 'Drag / resize на assignment-барах.',
  },
})

const resources: ResourceCalendarResource[] = [
  { id: 'anna', name: 'Anna' },
  { id: 'boris', name: 'Boris' },
  { id: 'clara', name: 'Clara' },
]

function dt(s: string) {
  return new Date(s)
}

const assignments: ResourceCalendarAssignment[] = [
  {
    id: 'a1',
    resourceId: 'anna',
    start: dt('2026-05-04T09:00'),
    end: dt('2026-05-05T18:00'),
    title: 'Project A',
    status: 'confirmed',
  },
  {
    id: 'a2',
    resourceId: 'anna',
    start: dt('2026-05-07T09:00'),
    end: dt('2026-05-08T13:00'),
    title: 'Code review',
    status: 'tentative',
  },
  {
    id: 'a3',
    resourceId: 'boris',
    start: dt('2026-05-05T10:00'),
    end: dt('2026-05-06T16:00'),
    title: 'Design sprint',
    status: 'confirmed',
  },
  {
    id: 'a4',
    resourceId: 'clara',
    start: dt('2026-05-04T14:00'),
    end: dt('2026-05-05T17:00'),
    title: 'QA pass',
    status: 'confirmed',
  },
  {
    id: 'a5',
    resourceId: 'clara',
    start: dt('2026-05-08T10:00'),
    end: dt('2026-05-09T15:00'),
    title: 'Release',
    status: 'tentative',
  },
]

const propsData: PropDef[] = [
  { name: 'resources', description: 'Resources displayed as rows.', type: 'Resource[]' },
  { name: 'assignments', description: 'Assignments to render.', type: 'Assignment[]' },
  {
    name: 'scale',
    description: 'Time scale.',
    type: "'day' | 'week' | 'month'",
    default: "'week'",
  },
  { name: 'range', description: 'Visible date range.', type: '{ from: Date; to: Date }' },
  { name: 'columnWidth / rowHeight', description: 'Cell sizing.', type: 'number' },
  { name: 'sidebarWidth', description: 'Left sidebar width.', type: 'number' },
  { name: 'draggable / resizable', description: 'Interactive bars.', type: 'boolean' },
  { name: 'unstyled', description: 'Strip Skygraph styles.', type: 'boolean', default: 'false' },
]

const WEEK = `<SgResourceCalendar :resources="resources" :assignments="assignments" />`
const DAY = `<SgResourceCalendar scale="day" :resources="resources" :assignments="assignments" />`
const INTER = `<SgResourceCalendar draggable resizable :resources="resources" :assignments="assignments" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'ResourceCalendar']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.weekTitle" :description="t.weekDesc" :code="WEEK">
      <SgResourceCalendar :resources="resources" :assignments="assignments" />
    </DemoBox>

    <DemoBox :title="t.dayTitle" :description="t.dayDesc" :code="DAY">
      <SgResourceCalendar scale="day" :resources="resources" :assignments="assignments" />
    </DemoBox>

    <DemoBox :title="t.interactiveTitle" :description="t.interactiveDesc" :code="INTER">
      <SgResourceCalendar draggable resizable :resources="resources" :assignments="assignments" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
