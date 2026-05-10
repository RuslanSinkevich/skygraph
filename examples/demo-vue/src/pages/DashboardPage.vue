<script setup lang="ts">
import { SgDashboard, SgDashboardEditor, SgLineChart, SgBarChart, SgPieChart } from '@skygraph/vue'
import type { DashboardWidget } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Dashboard',
    lead: 'CSS-grid layout for KPI cards and chart widgets. Editor variant adds drag/resize.',
    when1: 'KPI dashboards, observability boards, executive overviews.',
    when2: 'When you need a fixed grid that hosts heterogeneous content.',
    basicTitle: 'Basic',
    basicDesc: 'Static grid: 12 columns, fixed widget positions.',
    editorTitle: 'Editor',
    editorDesc: 'Drag widget headers to move; SE-corner to resize.',
  },
  ru: {
    title: 'Dashboard',
    lead: 'CSS-grid под KPI-карточки и виджеты. Editor добавляет drag/resize.',
    when1: 'KPI-дашборды, observability-борды, executive-обзоры.',
    when2: 'Когда нужна фиксированная сетка с разнородным контентом.',
    basicTitle: 'Basic',
    basicDesc: 'Статичная сетка: 12 колонок, фиксированные позиции виджетов.',
    editorTitle: 'Editor',
    editorDesc: 'Drag заголовков двигает; уголок — resize.',
  },
})

const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const series = [{ id: 's', label: 'Visits', values: [120, 200, 150, 80, 130] }]
const pieSeries = [{ id: 'p', label: 'Browsers', values: [62, 22, 16] }]
const pieCategories = ['Chrome', 'Safari', 'Other']

const widgets: DashboardWidget[] = [
  { id: 'kpi1', title: 'Visits today', x: 1, y: 1, w: 3, h: 1 },
  { id: 'kpi2', title: 'Conv. rate', x: 4, y: 1, w: 3, h: 1 },
  { id: 'kpi3', title: 'New users', x: 7, y: 1, w: 3, h: 1 },
  { id: 'kpi4', title: 'Avg. revenue', x: 10, y: 1, w: 3, h: 1 },
  { id: 'line', title: 'Visits this week', x: 1, y: 2, w: 8, h: 3 },
  { id: 'pie', title: 'Browsers', x: 9, y: 2, w: 4, h: 3 },
  { id: 'bar', title: 'Channels', x: 1, y: 5, w: 12, h: 3 },
]

const editableWidgets: DashboardWidget[] = [
  { id: 'a', title: 'Widget A', x: 1, y: 1, w: 4, h: 2 },
  { id: 'b', title: 'Widget B', x: 5, y: 1, w: 4, h: 2 },
  { id: 'c', title: 'Widget C', x: 9, y: 1, w: 4, h: 2 },
]

const propsData: PropDef[] = [
  {
    name: 'widgets',
    description: 'Widget descriptors with grid coords.',
    type: 'DashboardWidget[]',
  },
  { name: 'columns', description: 'Number of grid columns.', type: 'number', default: '12' },
  { name: 'rowHeight', description: 'Row height in pixels.', type: 'number', default: '80' },
  { name: 'gap', description: 'Gap between widgets in pixels.', type: 'number', default: '8' },
  { name: 'unstyled', description: 'Strip Skygraph styles.', type: 'boolean', default: 'false' },
]

const editorProps: PropDef[] = [
  { name: 'draggable', description: 'Drag widget headers.', type: 'boolean', default: 'true' },
  {
    name: 'resizable',
    description: 'SE-corner handle to resize.',
    type: 'boolean',
    default: 'true',
  },
  { name: 'minW / minH', description: 'Minimum spans.', type: 'number', default: '1 / 1' },
]

const BASIC = `<SgDashboard :widgets="widgets" :columns="12" :row-height="80" :gap="8">
  <template #widget="{ widget }">…</template>
</SgDashboard>`

const EDITOR = `<SgDashboardEditor :widgets="widgets" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Dashboard']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgDashboard :widgets="widgets">
        <template #widget="{ widget }">
          <div v-if="widget.id.startsWith('kpi')" style="padding: 12px">
            <div style="font-size: 24px; font-weight: 600">
              {{ Math.round(Math.random() * 1000) }}
            </div>
            <div style="font-size: 12px; color: var(--sg-color-text-secondary)">vs last week</div>
          </div>
          <SgLineChart
            v-else-if="widget.id === 'line'"
            :categories="categories"
            :series="series"
            :height="200"
          />
          <SgPieChart
            v-else-if="widget.id === 'pie'"
            :categories="pieCategories"
            :series="pieSeries"
            :height="200"
          />
          <SgBarChart
            v-else-if="widget.id === 'bar'"
            :categories="categories"
            :series="series"
            :height="200"
          />
        </template>
      </SgDashboard>
    </DemoBox>

    <DemoBox :title="t.editorTitle" :description="t.editorDesc" :code="EDITOR">
      <SgDashboardEditor :widgets="editableWidgets">
        <template #widget="{ widget }">
          <div style="padding: 12px; font-weight: 500">{{ widget.title }}</div>
        </template>
      </SgDashboardEditor>
    </DemoBox>

    <template #api>
      <h3 style="margin-top: 24px">SgDashboard</h3>
      <PropsTable :data="propsData" />
      <h3 style="margin-top: 24px">SgDashboardEditor (extra)</h3>
      <PropsTable :data="editorProps" />
    </template>
  </ComponentDoc>
</template>
