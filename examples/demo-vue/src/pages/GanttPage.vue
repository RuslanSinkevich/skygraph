<script setup lang="ts">
import { SgGantt } from '@skygraph/vue'
import type { GanttResource, GanttTask } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Gantt',
    lead: 'Time-aware bar chart of tasks per row, with optional resource lanes and dependencies.',
    when1: 'Project schedules, sprint planning, release timelines.',
    when2: 'Anything where each row is "task / period / progress / owner".',
    basicTitle: 'Basic',
    basicDesc: 'Day-scale Gantt with a few tasks and progress bars.',
    resourcesTitle: 'With resources',
    resourcesDesc: 'Group tasks by resource (assignee, team, etc.).',
    scaleTitle: 'Week scale',
    scaleDesc: 'Wider columns, fewer ticks.',
  },
  ru: {
    title: 'Gantt',
    lead: 'Временная диаграмма задач: ряды, прогресс, опционально resources и зависимости.',
    when1: 'Планы проектов, планирование спринтов, релиз-таймлайны.',
    when2: 'Когда строка — это «задача / период / прогресс / исполнитель».',
    basicTitle: 'Basic',
    basicDesc: 'Дневная шкала, несколько задач, progress bars.',
    resourcesTitle: 'С resources',
    resourcesDesc: 'Группировка задач по ресурсу (исполнитель, команда).',
    scaleTitle: 'Шкала weeks',
    scaleDesc: 'Шире колонки, реже тики.',
  },
})

function days(n: number, base = new Date('2026-05-01')) {
  return new Date(base.getTime() + n * 24 * 3600 * 1000)
}

const tasks: GanttTask[] = [
  { id: 't1', name: 'Discovery', start: days(0), end: days(4), progress: 100 },
  { id: 't2', name: 'Design', start: days(3), end: days(8), progress: 70 },
  { id: 't3', name: 'Build', start: days(7), end: days(15), progress: 40 },
  { id: 't4', name: 'QA', start: days(13), end: days(18), progress: 10 },
  { id: 't5', name: 'Launch', start: days(17), end: days(20), progress: 0 },
]

const resources: GanttResource[] = [
  { id: 'r1', name: 'Anna' },
  { id: 'r2', name: 'Boris' },
  { id: 'r3', name: 'Clara' },
]

const tasksWithResources: GanttTask[] = [
  { id: 't1', name: 'Discovery', start: days(0), end: days(4), progress: 100, resourceId: 'r1' },
  { id: 't2', name: 'Design', start: days(3), end: days(8), progress: 70, resourceId: 'r2' },
  { id: 't3', name: 'Build', start: days(7), end: days(15), progress: 40, resourceId: 'r3' },
]

const propsData: PropDef[] = [
  { name: 'tasks', description: 'Gantt task rows.', type: 'GanttTask[]' },
  { name: 'resources', description: 'Group tasks by resource lanes.', type: 'GanttResource[]' },
  {
    name: 'scale',
    description: 'Time scale.',
    type: "'day' | 'week' | 'month' | 'quarter'",
    default: "'day'",
  },
  { name: 'range', description: 'Visible date range.', type: '{ from: Date; to: Date }' },
  { name: 'rowHeight', description: 'Row height in pixels.', type: 'number' },
  { name: 'columnWidth', description: 'Column width in pixels.', type: 'number' },
  { name: 'sidebarWidth', description: 'Left sidebar width.', type: 'number' },
  { name: 'draggable / resizable', description: 'Enable drag / resize on bars.', type: 'boolean' },
  { name: 'unstyled', description: 'Strip Skygraph styles.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgGantt :tasks="tasks" scale="day" />`
const RES = `<SgGantt :tasks="tasks" :resources="resources" />`
const SCALE = `<SgGantt :tasks="tasks" scale="week" :column-width="60" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Gantt']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgGantt :tasks="tasks" scale="day" />
    </DemoBox>

    <DemoBox :title="t.resourcesTitle" :description="t.resourcesDesc" :code="RES">
      <SgGantt :tasks="tasksWithResources" :resources="resources" />
    </DemoBox>

    <DemoBox :title="t.scaleTitle" :description="t.scaleDesc" :code="SCALE">
      <SgGantt :tasks="tasks" scale="week" :column-width="60" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
