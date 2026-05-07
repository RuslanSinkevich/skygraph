import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { useDashboardDocStrings } from './dashboard-doc/useDashboardDocStrings'

import { BasicDashboard } from './dashboard/Basic.demo'
import BasicSource from './dashboard/Basic.demo?raw'

export function DashboardDemo() {
  const t = useDashboardDocStrings()

  const dashboardProps = useMemo<PropDef[]>(
    () => [
      { name: 'widgets', description: t.propWidgets, type: 'DashboardWidget[]', required: true },
      { name: 'columns', description: t.propColumns, type: 'number', default: '12' },
      { name: 'rowHeight', description: t.propRowHeight, type: 'number', default: '80' },
      { name: 'gap', description: t.propGap, type: 'number', default: '16' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
    ],
    [t],
  )

  const widgetProps = useMemo<PropDef[]>(
    () => [
      { name: 'id', description: t.widgetId, type: 'string', required: true },
      { name: 'title', description: t.widgetTitle, type: 'ReactNode' },
      { name: 'x', description: t.widgetX, type: 'number', required: true },
      { name: 'y', description: t.widgetY, type: 'number', required: true },
      { name: 'w', description: t.widgetW, type: 'number', default: '1' },
      { name: 'h', description: t.widgetH, type: 'number', default: '1' },
      { name: 'children', description: t.widgetChildren, type: 'ReactNode' },
      { name: 'render', description: t.widgetRender, type: '() => ReactNode' },
      { name: 'className', description: t.widgetClassName, type: 'string' },
      { name: 'style', description: t.widgetStyle, type: 'CSSProperties' },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox
        title={t.demoBasicTitle}
        description={t.demoBasicDesc}
        code={BasicSource}
      >
        <BasicDashboard />
      </DemoBox>

      <PropsTable title={t.tableDashboardApi} data={dashboardProps} />
      <PropsTable title={t.tableDashboardWidget} data={widgetProps} />
    </ComponentDoc>
  )
}
