<script setup lang="ts">
import { SgAreaChart, SgBarChart, SgLineChart, SgPieChart } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Charts',
    lead: 'Lightweight SVG charts: Line / Bar / Area / Pie. Categories + series.',
    when1: 'KPI dashboards, time-series, simple categorical comparisons.',
    when2: 'Avoid heavy chart libraries when only basic shapes are needed.',
    lineTitle: 'Line',
    lineDesc: 'Two series with markers and legend.',
    barTitle: 'Bar',
    barDesc: 'Grouped bars per category.',
    areaTitle: 'Area',
    areaDesc: 'Area fills under the line.',
    pieTitle: 'Pie',
    pieDesc: 'Single-series sliced pie chart.',
    donutTitle: 'Donut',
    donutDesc: 'Pie with `innerRadius` for the donut effect.',
  },
  ru: {
    title: 'Charts',
    lead: 'Лёгкие SVG-графики: Line / Bar / Area / Pie. Categories + series.',
    when1: 'KPI-дашборды, time-series, простые категориальные сравнения.',
    when2: 'Без тяжёлых chart-библиотек, когда нужны базовые формы.',
    lineTitle: 'Line',
    lineDesc: 'Две серии с маркерами и легендой.',
    barTitle: 'Bar',
    barDesc: 'Группы баров по категории.',
    areaTitle: 'Area',
    areaDesc: 'Заливка под линиями.',
    pieTitle: 'Pie',
    pieDesc: 'Один series, разбитый на сектора.',
    donutTitle: 'Donut',
    donutDesc: 'Pie с `innerRadius` — donut.',
  },
})

const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const series = [
  { id: 'a', label: 'Visits', values: [120, 200, 150, 80, 70, 110, 130] },
  { id: 'b', label: 'Signups', values: [20, 35, 28, 18, 15, 22, 27] },
]

const pieCategories = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other']
const pieSeries = [{ id: 'share', label: 'Share', values: [62, 8, 18, 7, 5] }]

const propsData: PropDef[] = [
  { name: 'categories', description: 'X-axis labels.', type: 'ChartCategory[]' },
  { name: 'series', description: 'Series to plot.', type: 'ChartSeries[]' },
  { name: 'width', description: 'Chart width.', type: 'number | string', default: "'100%'" },
  { name: 'height', description: 'Chart height.', type: 'number', default: '200' },
  { name: 'legend', description: 'Show legend.', type: 'boolean', default: 'false' },
  {
    name: 'animate',
    description: 'Enable transitions.',
    type: 'boolean | { duration }',
    default: 'true',
  },
  {
    name: 'padding',
    description: 'Inner padding [top, right, bottom, left].',
    type: 'number | [n,n,n,n]',
  },
  {
    name: 'xAxis / yAxis',
    description: 'Axis options (`tickFormatter`, `label`, …).',
    type: 'XAxisOptions / YAxisOptions',
  },
  { name: 'unstyled', description: 'Strip Skygraph styles.', type: 'boolean', default: 'false' },
]

const LINE = `<SgLineChart legend :categories="categories" :series="series" />`
const BAR = `<SgBarChart legend :categories="categories" :series="series" />`
const AREA = `<SgAreaChart legend :categories="categories" :series="series" />`
const PIE = `<SgPieChart legend :categories="pieCategories" :series="pieSeries" />`
const DONUT = `<SgPieChart legend :inner-radius="0.55" :categories="pieCategories" :series="pieSeries" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Charts']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.lineTitle" :description="t.lineDesc" :code="LINE">
      <SgLineChart legend :categories="categories" :series="series" />
    </DemoBox>

    <DemoBox :title="t.barTitle" :description="t.barDesc" :code="BAR">
      <SgBarChart legend :categories="categories" :series="series" />
    </DemoBox>

    <DemoBox :title="t.areaTitle" :description="t.areaDesc" :code="AREA">
      <SgAreaChart legend :categories="categories" :series="series" />
    </DemoBox>

    <DemoBox :title="t.pieTitle" :description="t.pieDesc" :code="PIE">
      <SgPieChart legend :categories="pieCategories" :series="pieSeries" />
    </DemoBox>

    <DemoBox :title="t.donutTitle" :description="t.donutDesc" :code="DONUT">
      <SgPieChart legend :inner-radius="0.55" :categories="pieCategories" :series="pieSeries" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
