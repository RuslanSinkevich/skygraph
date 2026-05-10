<script setup lang="ts">
/**
 * Charts aggregator (Wave 3.2 / Tab D).
 * 14/15 React demos covered (no `Crosshair` / `Brush` direct props on
 * Vue charts — use stand-alone `SgChartCrosshair` / `SgChartBrush`).
 *
 * No CssVarsTable — parity with React (carta §C).
 */
import { computed } from 'vue'
import { ComponentDoc, DemoBox, PropsTable, type PropDef } from './components'
import { useChartsDocStrings } from './charts-doc/useStrings'

import BasicLineChart from './charts/BasicLine.demo.vue'
import BasicLineSource from './charts/BasicLine.demo.vue?raw'
import BasicBarChart from './charts/BasicBar.demo.vue'
import BasicBarSource from './charts/BasicBar.demo.vue?raw'
import BasicAreaChart from './charts/BasicArea.demo.vue'
import BasicAreaSource from './charts/BasicArea.demo.vue?raw'
import BasicPieChart from './charts/BasicPie.demo.vue'
import BasicPieSource from './charts/BasicPie.demo.vue?raw'
import WithAxesChart from './charts/WithAxes.demo.vue'
import WithAxesSource from './charts/WithAxes.demo.vue?raw'
import WithLegendChart from './charts/WithLegend.demo.vue'
import WithLegendSource from './charts/WithLegend.demo.vue?raw'
import MultiSeriesChart from './charts/MultiSeries.demo.vue'
import MultiSeriesSource from './charts/MultiSeries.demo.vue?raw'
import StackedChart from './charts/Stacked.demo.vue'
import StackedSource from './charts/Stacked.demo.vue?raw'
import AnimationsChart from './charts/Animations.demo.vue'
import AnimationsSource from './charts/Animations.demo.vue?raw'
import RealtimeChart from './charts/Realtime.demo.vue'
import RealtimeSource from './charts/Realtime.demo.vue?raw'
import HoverActionsChart from './charts/HoverActions.demo.vue'
import HoverActionsSource from './charts/HoverActions.demo.vue?raw'
import ContextMenuChart from './charts/ContextMenu.demo.vue'
import ContextMenuSource from './charts/ContextMenu.demo.vue?raw'
import ResponsiveChart from './charts/Responsive.demo.vue'
import ResponsiveSource from './charts/Responsive.demo.vue?raw'
import UnstyledChart from './charts/Unstyled.demo.vue'
import UnstyledSource from './charts/Unstyled.demo.vue?raw'

const t = useChartsDocStrings()

const commonProps = computed<PropDef[]>(() => [
  { name: 'categories', description: t.value.propCategories, type: 'ChartCategory[]', required: true },
  { name: 'series', description: t.value.propSeries, type: 'ChartSeries[]', required: true },
  { name: 'width', description: t.value.propWidth, type: 'number | string', default: "'100%'" },
  { name: 'height', description: t.value.propHeight, type: 'number', default: '200' },
  { name: 'padding', description: t.value.propPadding, type: 'number | [n, n, n, n]' },
  { name: 'legend', description: t.value.propLegend, type: 'boolean', default: 'false' },
  { name: 'animate', description: t.value.propAnimate, type: 'boolean | { duration }' },
  { name: 'xAxis', description: t.value.propXAxis, type: 'XAxisOptions' },
  { name: 'yAxis', description: t.value.propYAxis, type: 'YAxisOptions' },
  { name: 'fileName', description: t.value.propFileName, type: 'string', default: "'chart'" },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: 'className', description: t.value.propClassName, type: 'string' },
  { name: 'style', description: t.value.propStyle, type: 'CSSProperties' },
])

const lineExtras = computed<PropDef[]>(() => [
  { name: 'markers', description: t.value.propMarkers, type: 'boolean', default: 'true' },
  { name: 'strokeWidth', description: t.value.propStrokeWidth, type: 'number', default: '2' },
])

const barExtras = computed<PropDef[]>(() => [
  { name: 'groupGap', description: t.value.propGroupGap, type: 'number' },
  { name: 'barGap', description: t.value.propBarGap, type: 'number' },
])

const areaExtras = computed<PropDef[]>(() => [
  { name: 'stacked', description: t.value.propStacked, type: 'boolean', default: 'false' },
  { name: 'strokeWidth', description: t.value.propStrokeWidth, type: 'number', default: '2' },
  { name: 'fillOpacity', description: t.value.propFillOpacity, type: 'number', default: '0.25' },
])

const pieExtras = computed<PropDef[]>(() => [
  { name: 'innerRadius', description: t.value.propInnerRadius, type: 'number', default: '0' },
  { name: 'labels', description: t.value.propLabels, type: 'boolean', default: 'false' },
])

const axisProps = computed<PropDef[]>(() => [
  { name: 'tickCount', description: t.value.propAxisTickCount, type: 'number' },
  { name: 'tickFormatter', description: t.value.propAxisTickFormatter, type: '(v) => string' },
  { name: 'label', description: t.value.propAxisLabel, type: 'string' },
  { name: 'gridLines', description: t.value.propAxisGridLines, type: 'boolean (Y axis)' },
])

const exposeProps = computed<PropDef[]>(() => [
  { name: 'print', description: t.value.exposePrint, type: '(opts?) => void' },
  { name: 'exportSvg', description: t.value.exposeExportSvg, type: '() => string | null' },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbCharts]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoLineTitle" :description="t.demoLineDesc" :code="BasicLineSource">
      <BasicLineChart />
    </DemoBox>
    <DemoBox :title="t.demoBarTitle" :description="t.demoBarDesc" :code="BasicBarSource">
      <BasicBarChart />
    </DemoBox>
    <DemoBox :title="t.demoAreaTitle" :description="t.demoAreaDesc" :code="BasicAreaSource">
      <BasicAreaChart />
    </DemoBox>
    <DemoBox :title="t.demoPieTitle" :description="t.demoPieDesc" :code="BasicPieSource">
      <BasicPieChart />
    </DemoBox>
    <DemoBox :title="t.demoAxesTitle" :description="t.demoAxesDesc" :code="WithAxesSource">
      <WithAxesChart />
    </DemoBox>
    <DemoBox :title="t.demoLegendTitle" :description="t.demoLegendDesc" :code="WithLegendSource">
      <WithLegendChart />
    </DemoBox>
    <DemoBox :title="t.demoMultiSeriesTitle" :description="t.demoMultiSeriesDesc" :code="MultiSeriesSource">
      <MultiSeriesChart />
    </DemoBox>
    <DemoBox :title="t.demoStackedTitle" :description="t.demoStackedDesc" :code="StackedSource">
      <StackedChart />
    </DemoBox>
    <DemoBox :title="t.demoAnimationsTitle" :description="t.demoAnimationsDesc" :code="AnimationsSource">
      <AnimationsChart />
    </DemoBox>
    <DemoBox :title="t.demoRealtimeTitle" :description="t.demoRealtimeDesc" :code="RealtimeSource">
      <RealtimeChart />
    </DemoBox>
    <DemoBox :title="t.demoHoverActionsTitle" :description="t.demoHoverActionsDesc" :code="HoverActionsSource">
      <HoverActionsChart />
    </DemoBox>
    <DemoBox :title="t.demoContextMenuTitle" :description="t.demoContextMenuDesc" :code="ContextMenuSource">
      <ContextMenuChart />
    </DemoBox>
    <DemoBox :title="t.demoResponsiveTitle" :description="t.demoResponsiveDesc" :code="ResponsiveSource">
      <ResponsiveChart />
    </DemoBox>
    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledChart />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableCommonApi" :data="commonProps" />
      <PropsTable :title="t.tableLineExtras" :data="lineExtras" />
      <PropsTable :title="t.tableBarExtras" :data="barExtras" />
      <PropsTable :title="t.tableAreaExtras" :data="areaExtras" />
      <PropsTable :title="t.tablePieExtras" :data="pieExtras" />
      <PropsTable :title="t.tableAxisApi" :data="axisProps" />
      <PropsTable :title="t.tableExposeApi" :data="exposeProps" />
    </template>
  </ComponentDoc>
</template>
