import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { useDashboardDocStrings } from './dashboard-doc/useDashboardDocStrings'

import { BasicDashboard } from './dashboard/Basic.demo'
import BasicSource from './dashboard/Basic.demo?raw'
import { EditorDashboard } from './dashboard/Editor.demo'
import EditorSource from './dashboard/Editor.demo?raw'
import { WithActionsDashboard } from './dashboard/WithActions.demo'
import WithActionsSource from './dashboard/WithActions.demo?raw'
import { MixedDashboard } from './dashboard/Mixed.demo'
import MixedSource from './dashboard/Mixed.demo?raw'
import { ResponsiveDashboard } from './dashboard/Responsive.demo'
import ResponsiveSource from './dashboard/Responsive.demo?raw'
import { RealtimeDashboard } from './dashboard/Realtime.demo'
import RealtimeSource from './dashboard/Realtime.demo?raw'
import { LargeGridDashboard } from './dashboard/LargeGrid.demo'
import LargeGridSource from './dashboard/LargeGrid.demo?raw'

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
      { name: 'onWidgetContextMenu', description: t.propOnWidgetContextMenu, type: '(event, widget) => void' },
      { name: 'onDashboardContextMenu', description: t.propOnDashboardContextMenu, type: '(event) => void' },
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
      { name: 'actions', description: t.widgetActions, type: 'WidgetAction[]' },
    ],
    [t],
  )

  const actionProps = useMemo<PropDef[]>(
    () => [
      { name: 'id', description: t.actionId, type: 'string', required: true },
      { name: 'label', description: t.actionLabel, type: 'ReactNode', required: true },
      { name: 'icon', description: t.actionIcon, type: 'ReactNode' },
      { name: 'onClick', description: t.actionOnClick, type: '(widget) => void', required: true },
      { name: 'variant', description: t.actionVariant, type: "'default' | 'danger'", default: "'default'" },
      { name: 'hidden', description: t.actionHidden, type: '(widget) => boolean' },
    ],
    [t],
  )

  const editorProps = useMemo<PropDef[]>(
    () => [
      { name: 'widgets', description: t.propWidgets, type: 'DashboardWidget[]', required: true },
      { name: 'onLayoutChange', description: t.editorOnLayoutChange, type: '(next, meta) => void' },
      { name: 'editable', description: t.editorEditable, type: 'boolean', default: 'true' },
      { name: 'columns', description: t.propColumns, type: 'number', default: '12' },
      { name: 'rowHeight', description: t.propRowHeight, type: 'number', default: '80' },
      { name: 'gap', description: t.propGap, type: 'number', default: '16' },
      { name: 'onWidgetRefresh', description: t.editorOnWidgetRefresh, type: '(widget) => void' },
      { name: 'onWidgetSettings', description: t.editorOnWidgetSettings, type: '(widget) => void' },
      { name: 'onWidgetRemove', description: t.editorOnWidgetRemove, type: '(widget) => void' },
      { name: 'onWidgetContextMenu', description: t.propOnWidgetContextMenu, type: '(event, widget) => void' },
      { name: 'onDashboardContextMenu', description: t.propOnDashboardContextMenu, type: '(event) => void' },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicDashboard />
      </DemoBox>

      <DemoBox title={t.demoActionsTitle} description={t.demoActionsDesc} code={WithActionsSource}>
        <WithActionsDashboard />
      </DemoBox>

      <DemoBox title={t.demoEditorTitle} description={t.demoEditorDesc} code={EditorSource}>
        <EditorDashboard />
      </DemoBox>

      <DemoBox title={t.demoMixedTitle} description={t.demoMixedDesc} code={MixedSource}>
        <MixedDashboard />
      </DemoBox>

      <DemoBox title={t.demoResponsiveTitle} description={t.demoResponsiveDesc} code={ResponsiveSource}>
        <ResponsiveDashboard />
      </DemoBox>

      <DemoBox title={t.demoRealtimeTitle} description={t.demoRealtimeDesc} code={RealtimeSource}>
        <RealtimeDashboard />
      </DemoBox>

      <DemoBox title={t.demoLargeGridTitle} description={t.demoLargeGridDesc} code={LargeGridSource}>
        <LargeGridDashboard />
      </DemoBox>

      <PropsTable title={t.tableDashboardApi} data={dashboardProps} />
      <PropsTable title={t.tableDashboardWidget} data={widgetProps} />
      <PropsTable title={t.tableWidgetAction} data={actionProps} />
      <PropsTable title={t.tableEditorApi} data={editorProps} />
    </ComponentDoc>
  )
}
