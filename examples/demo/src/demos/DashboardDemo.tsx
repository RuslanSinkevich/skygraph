import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { BasicDashboard } from './dashboard/Basic.demo'
import BasicSource from './dashboard/Basic.demo?raw'

const dashboardProps: PropDef[] = [
  { name: 'widgets', description: 'Widgets pinned to grid cells', type: 'DashboardWidget[]', required: true },
  { name: 'columns', description: 'Total grid columns', type: 'number', default: '12' },
  { name: 'rowHeight', description: 'Uniform row height in pixels', type: 'number', default: '80' },
  { name: 'gap', description: 'Gap between cells in pixels', type: 'number', default: '16' },
  { name: 'unstyled', description: 'Drop default sg-dashboard classes', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Root className', type: 'string' },
  { name: 'style', description: 'Root inline style', type: 'CSSProperties' },
]

const widgetProps: PropDef[] = [
  { name: 'id', description: 'Stable widget id', type: 'string', required: true },
  { name: 'title', description: 'Header text (omitted when undefined)', type: 'ReactNode' },
  { name: 'x', description: '1-based column start', type: 'number', required: true },
  { name: 'y', description: '1-based row start', type: 'number', required: true },
  { name: 'w', description: 'Column span', type: 'number', default: '1' },
  { name: 'h', description: 'Row span', type: 'number', default: '1' },
  { name: 'children', description: 'Widget body', type: 'ReactNode' },
  { name: 'render', description: 'Alternative to children — render callback', type: '() => ReactNode' },
  { name: 'className', description: 'Widget className', type: 'string' },
  { name: 'style', description: 'Widget inline style', type: 'CSSProperties' },
]

export function DashboardDemo() {
  return (
    <ComponentDoc
      title="Dashboard"
      description="Static-layout grid for widgets. v0 — fixed (x, y, w, h) per widget; no drag, no resize, no auto-pack. Use as a primitive for read-only dashboards or as the rendering layer for a richer editor."
      whenToUse={[
        'Build a read-only KPI / analytics page with a fixed widget layout.',
        'Render the visual layer of a dashboard editor (drag/resize lives in your app).',
        'Compose with Charts, Table, Diagram, custom widgets — anything fits inside a cell.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="A 12-column grid: line chart, KPI tile, bar chart, and an activity feed."
        code={BasicSource}
      >
        <BasicDashboard />
      </DemoBox>

      <PropsTable title="Dashboard API" data={dashboardProps} />
      <PropsTable title="DashboardWidget" data={widgetProps} />
    </ComponentDoc>
  )
}
