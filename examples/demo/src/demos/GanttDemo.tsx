import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useGanttDocStrings } from './gantt-doc/useGanttDocStrings'

import { BasicGantt } from './Gantt/Basic.demo'
import BasicSource from './Gantt/Basic.demo?raw'
import { ScaleGantt } from './Gantt/Scale.demo'
import ScaleSource from './Gantt/Scale.demo?raw'

export function GanttDemo() {
  const t = useGanttDocStrings()

  const ganttProps = useMemo<PropDef[]>(
    () => [
      { name: 'tasks', description: t.propTasks, type: 'GanttTask[]', required: true },
      { name: 'resources', description: t.propResources, type: 'GanttResource[]' },
      { name: 'scale', description: t.propScale, type: "'day' | 'week' | 'month' | 'quarter'", default: "'day'" },
      { name: 'range', description: t.propRange, type: '{ from: Date; to: Date }' },
      { name: 'rowHeight', description: t.propRowHeight, type: 'number', default: '32' },
      { name: 'columnWidth', description: t.propColumnWidth, type: 'number', default: '40' },
      { name: 'sidebarWidth', description: t.propSidebarWidth, type: 'number', default: '200' },
      { name: 'onTaskChange', description: t.propOnTaskChange, type: '(task: GanttTask) => void' },
      { name: 'draggable', description: t.propDraggable, type: 'boolean', default: 'false' },
      { name: 'resizable', description: t.propResizable, type: 'boolean', default: 'false' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
    ],
    [t],
  )

  const taskProps = useMemo<PropDef[]>(
    () => [
      { name: 'id', description: t.propTaskId, type: 'string', required: true },
      { name: 'name', description: t.propTaskName, type: 'string', required: true },
      { name: 'start', description: t.propTaskStart, type: 'Date | number', required: true },
      { name: 'end', description: t.propTaskEnd, type: 'Date | number', required: true },
      { name: 'progress', description: t.propTaskProgress, type: 'number' },
      { name: 'parentId', description: t.propTaskParentId, type: 'string' },
      { name: 'dependencies', description: t.propTaskDependencies, type: 'string[]' },
      { name: 'resourceId', description: t.propTaskResourceId, type: 'string' },
      { name: 'color', description: t.propTaskColor, type: 'string' },
    ],
    [t],
  )

  const resourceProps = useMemo<PropDef[]>(
    () => [
      { name: 'id', description: t.propResourceId, type: 'string', required: true },
      { name: 'name', description: t.propResourceName, type: 'string', required: true },
    ],
    [t],
  )

  const ganttCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssSgColorPrimary },
      { name: 'sg-color-primary-active', default: '#0958d9', description: t.cssSgColorPrimaryActive },
      { name: 'sg-color-white', default: '#ffffff', description: t.cssSgColorWhite },
      { name: 'sg-color-bg', default: '#ffffff', description: t.cssSgColorBg },
      { name: 'sg-color-bg-container', default: '#fafafa', description: t.cssSgColorBgContainer },
      { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.cssSgColorBgElevated },
      { name: 'sg-color-bg-secondary', default: '#fafafa', description: t.cssSgColorBgSecondary },
      { name: 'sg-color-border', default: '#d9d9d9', description: t.cssSgColorBorder },
      { name: 'sg-color-border-secondary', default: '#f0f0f0', description: t.cssSgColorBorderSecondary },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssSgColorTextSecondary },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-border-radius', default: '6px', description: t.cssSgBorderRadius },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssSgBorderRadiusSm },
      { name: 'sg-padding-md', default: '12px', description: t.cssSgPaddingMd },
      { name: 'sg-padding-xs', default: '4px', description: t.cssSgPaddingXs },
      { name: 'sg-shadow-sm', default: '0 1px 2px rgba(0, 0, 0, 0.05)', description: t.cssSgShadowSm },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbGantt]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox
        title={t.demoBasicTitle}
        description={t.demoBasicDesc}
        code={BasicSource}
      >
        <BasicGantt />
      </DemoBox>

      <DemoBox
        title={t.demoScaleTitle}
        description={t.demoScaleDesc}
        code={ScaleSource}
      >
        <ScaleGantt />
      </DemoBox>

      <PropsTable title={t.tableGanttApi} data={ganttProps} />
      <PropsTable title={t.tableTaskApi} data={taskProps} />
      <PropsTable title={t.tableResourceApi} data={resourceProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={ganttCssVars}
      />
    </ComponentDoc>
  )
}
