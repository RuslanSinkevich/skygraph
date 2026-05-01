import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { BasicLineChart } from './charts/BasicLine.demo'
import BasicLineSource from './charts/BasicLine.demo?raw'
import { BasicBarChart } from './charts/BasicBar.demo'
import BasicBarSource from './charts/BasicBar.demo?raw'

const baseProps: PropDef[] = [
  { name: 'categories', description: 'X-axis categories (string[] or number[])', type: 'ChartCategory[]', required: true },
  { name: 'series', description: 'Data series (id, label, values, optional color)', type: 'ChartSeries[]', required: true },
  { name: 'width', description: 'CSS width', type: 'number | string', default: "'100%'" },
  { name: 'height', description: 'Pixel height', type: 'number', default: '200' },
  { name: 'padding', description: 'Plot padding (single number or [t,r,b,l])', type: 'number | [number, number, number, number]', default: '[16,16,24,32]' },
  { name: 'unstyled', description: 'Drop sg-chart classes', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Root SVG className', type: 'string' },
  { name: 'style', description: 'Root SVG inline style', type: 'CSSProperties' },
]

const lineExtraProps: PropDef[] = [
  { name: 'markers', description: 'Show dot markers at each point', type: 'boolean', default: 'true' },
  { name: 'strokeWidth', description: 'Line stroke width in pixels', type: 'number', default: '2' },
]

const barExtraProps: PropDef[] = [
  { name: 'groupGap', description: 'Gap between groups (0..1 of category step)', type: 'number', default: '0.2' },
  { name: 'barGap', description: 'Gap between bars within a group (0..1 of slot)', type: 'number', default: '0.1' },
]

export function ChartsDemo() {
  return (
    <ComponentDoc
      title="Charts"
      description="Minimal SVG charts (v0): LineChart and BarChart. No axes, tooltip, animation in this version — just clean primitives that respect SkyGraph CSS tokens."
      whenToUse={[
        'Render light data visualisations (KPIs, sparklines, simple comparisons) without pulling in a third-party charting library.',
        'Build the visual layer of a dashboard where richer interactivity (selection, drill-down) lives in your app.',
        'Theme charts together with the rest of the UI by overriding `--sg-color-primary`, `--sg-color-success`, etc.',
      ]}
    >
      <DemoBox
        title="Line chart"
        description="Two series of weekly traffic. Series colours follow the default SkyGraph palette."
        code={BasicLineSource}
      >
        <BasicLineChart />
      </DemoBox>

      <DemoBox
        title="Bar chart"
        description="Grouped bars per quarter. Bars rest on a zero baseline so negative values would extend below."
        code={BasicBarSource}
      >
        <BasicBarChart />
      </DemoBox>

      <PropsTable title="Common Chart API" data={baseProps} />
      <PropsTable title="LineChart Extras" data={lineExtraProps} />
      <PropsTable title="BarChart Extras" data={barExtraProps} />
    </ComponentDoc>
  )
}
