import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { useChartsDocStrings } from './charts-doc/useChartsDocStrings'

import { BasicLineChart } from './charts/BasicLine.demo'
import BasicLineSource from './charts/BasicLine.demo?raw'
import { BasicBarChart } from './charts/BasicBar.demo'
import BasicBarSource from './charts/BasicBar.demo?raw'
import { BasicAreaChart } from './charts/BasicArea.demo'
import BasicAreaSource from './charts/BasicArea.demo?raw'
import { BasicPieChart } from './charts/BasicPie.demo'
import BasicPieSource from './charts/BasicPie.demo?raw'

import { WithAxesChart } from './charts/WithAxes.demo'
import WithAxesSource from './charts/WithAxes.demo?raw'
import { WithLegendChart } from './charts/WithLegend.demo'
import WithLegendSource from './charts/WithLegend.demo?raw'
import { AnimationsChart } from './charts/Animations.demo'
import AnimationsSource from './charts/Animations.demo?raw'
import { CrosshairChart } from './charts/Crosshair.demo'
import CrosshairSource from './charts/Crosshair.demo?raw'
import { BrushChart } from './charts/Brush.demo'
import BrushSource from './charts/Brush.demo?raw'
import { StackedChart } from './charts/Stacked.demo'
import StackedSource from './charts/Stacked.demo?raw'
import { MultiSeriesChart } from './charts/MultiSeries.demo'
import MultiSeriesSource from './charts/MultiSeries.demo?raw'
import { RealtimeChart } from './charts/Realtime.demo'
import RealtimeSource from './charts/Realtime.demo?raw'
import { HoverActionsChart } from './charts/HoverActions.demo'
import HoverActionsSource from './charts/HoverActions.demo?raw'
import { ContextMenuChart } from './charts/ContextMenu.demo'
import ContextMenuSource from './charts/ContextMenu.demo?raw'
import { ResponsiveChart } from './charts/Responsive.demo'
import ResponsiveSource from './charts/Responsive.demo?raw'

export function ChartsDemo() {
  const t = useChartsDocStrings()

  const baseProps = useMemo<PropDef[]>(
    () => [
      {
        name: 'categories',
        description: t.propCategories,
        type: 'ChartCategory[]',
        required: true,
      },
      { name: 'series', description: t.propSeries, type: 'ChartSeries[]', required: true },
      { name: 'width', description: t.propWidth, type: 'number | string', default: "'100%'" },
      { name: 'height', description: t.propHeight, type: 'number', default: '200' },
      {
        name: 'padding',
        description: t.propPadding,
        type: 'number | [number, number, number, number]',
        default: '[16,16,24,44]',
      },
      { name: 'legend', description: t.propLegend, type: 'boolean', default: 'false' },
      {
        name: 'animate',
        description: t.propAnimate,
        type: 'boolean | { duration?: number }',
        default: 'true',
      },
      { name: 'xAxis', description: t.propXAxis, type: 'XAxisOptions' },
      { name: 'yAxis', description: t.propYAxis, type: 'YAxisOptions' },
      {
        name: 'printable',
        description: t.propPrintable,
        type: 'boolean | { fileName?: string }',
        default: 'false',
      },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
    ],
    [t],
  )

  const lineExtraProps = useMemo<PropDef[]>(
    () => [
      { name: 'markers', description: t.propMarkers, type: 'boolean', default: 'true' },
      { name: 'strokeWidth', description: t.propStrokeWidth, type: 'number', default: '2' },
      {
        name: 'crosshair',
        description: t.propCrosshair,
        type: 'boolean | { valueFormatter?: (v: number) => string }',
        default: 'false',
      },
      { name: 'brush', description: t.propBrush, type: 'boolean | ChartBrushConfig' },
    ],
    [t],
  )

  const barExtraProps = useMemo<PropDef[]>(
    () => [
      { name: 'groupGap', description: t.propGroupGap, type: 'number', default: '0.2' },
      { name: 'barGap', description: t.propBarGap, type: 'number', default: '0.1' },
      { name: 'brush', description: t.propBrush, type: 'boolean | ChartBrushConfig' },
    ],
    [t],
  )

  const areaExtraProps = useMemo<PropDef[]>(
    () => [
      { name: 'stacked', description: t.propStacked, type: 'boolean', default: 'false' },
      { name: 'strokeWidth', description: t.propStrokeWidth, type: 'number', default: '2' },
      { name: 'fillOpacity', description: t.propFillOpacity, type: 'number', default: '0.25' },
      { name: 'brush', description: t.propBrush, type: 'boolean | ChartBrushConfig' },
    ],
    [t],
  )

  const axisProps = useMemo<PropDef[]>(
    () => [
      { name: 'tickCount', description: t.propAxisTickCount, type: 'number' },
      {
        name: 'tickFormatter',
        description: t.propAxisTickFormatter,
        type: '(value, index?) => string',
      },
      { name: 'label', description: t.propAxisLabel, type: 'string' },
      { name: 'gridLines', description: t.propAxisGridLines, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoLineTitle} description={t.demoLineDesc} code={BasicLineSource}>
        <BasicLineChart />
      </DemoBox>

      <DemoBox title={t.demoBarTitle} description={t.demoBarDesc} code={BasicBarSource}>
        <BasicBarChart />
      </DemoBox>

      <DemoBox title={t.demoAreaTitle} description={t.demoAreaDesc} code={BasicAreaSource}>
        <BasicAreaChart />
      </DemoBox>

      <DemoBox title={t.demoPieTitle} description={t.demoPieDesc} code={BasicPieSource}>
        <BasicPieChart />
      </DemoBox>

      <DemoBox title={t.demoAxesTitle} description={t.demoAxesDesc} code={WithAxesSource}>
        <WithAxesChart />
      </DemoBox>

      <DemoBox title={t.demoLegendTitle} description={t.demoLegendDesc} code={WithLegendSource}>
        <WithLegendChart />
      </DemoBox>

      <DemoBox
        title={t.demoAnimationsTitle}
        description={t.demoAnimationsDesc}
        code={AnimationsSource}
      >
        <AnimationsChart />
      </DemoBox>

      <DemoBox
        title={t.demoCrosshairTitle}
        description={t.demoCrosshairDesc}
        code={CrosshairSource}
      >
        <CrosshairChart />
      </DemoBox>

      <DemoBox title={t.demoBrushTitle} description={t.demoBrushDesc} code={BrushSource}>
        <BrushChart />
      </DemoBox>

      <DemoBox title={t.demoStackedTitle} description={t.demoStackedDesc} code={StackedSource}>
        <StackedChart />
      </DemoBox>

      <DemoBox
        title={t.demoMultiSeriesTitle}
        description={t.demoMultiSeriesDesc}
        code={MultiSeriesSource}
      >
        <MultiSeriesChart />
      </DemoBox>

      <DemoBox title={t.demoRealtimeTitle} description={t.demoRealtimeDesc} code={RealtimeSource}>
        <RealtimeChart />
      </DemoBox>

      <DemoBox
        title={t.demoHoverActionsTitle}
        description={t.demoHoverActionsDesc}
        code={HoverActionsSource}
      >
        <HoverActionsChart />
      </DemoBox>

      <DemoBox
        title={t.demoContextMenuTitle}
        description={t.demoContextMenuDesc}
        code={ContextMenuSource}
      >
        <ContextMenuChart />
      </DemoBox>

      <DemoBox
        title={t.demoResponsiveTitle}
        description={t.demoResponsiveDesc}
        code={ResponsiveSource}
      >
        <ResponsiveChart />
      </DemoBox>

      <PropsTable title={t.tableCommonApi} data={baseProps} />
      <PropsTable title={t.tableLineExtras} data={lineExtraProps} />
      <PropsTable title={t.tableBarExtras} data={barExtraProps} />
      <PropsTable title={t.tableAreaExtras} data={areaExtraProps} />
      <PropsTable title={t.tableAxisApi} data={axisProps} />
    </ComponentDoc>
  )
}
