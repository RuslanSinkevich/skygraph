import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useResourceCalendarDocStrings } from './resource-calendar-doc/useResourceCalendarDocStrings'

import { BasicResourceCalendar } from './resource-calendar/Basic.demo'
import BasicSource from './resource-calendar/Basic.demo?raw'
import { WithCapacityResourceCalendar } from './resource-calendar/WithCapacity.demo'
import WithCapacitySource from './resource-calendar/WithCapacity.demo?raw'

export function ResourceCalendarDemo() {
  const t = useResourceCalendarDocStrings()

  const calendarProps = useMemo<PropDef[]>(
    () => [
      { name: 'resources', description: t.propResources, type: 'readonly Resource[]' },
      { name: 'assignments', description: t.propAssignments, type: 'readonly Assignment[]' },
      { name: 'rules', description: t.propRules, type: 'readonly AvailabilityRule[]' },
      {
        name: 'scale',
        description: t.propScale,
        type: "'day' | 'week' | 'month'",
        default: "'week'",
      },
      { name: 'range', description: t.propRange, type: '{ from: Date; to: Date }' },
      { name: 'columnWidth', description: t.propColumnWidth, type: 'number', default: '120' },
      { name: 'rowHeight', description: t.propRowHeight, type: 'number', default: '56' },
      { name: 'sidebarWidth', description: t.propSidebarWidth, type: 'number', default: '200' },
      { name: 'draggable', description: t.propDraggable, type: 'boolean', default: 'false' },
      { name: 'resizable', description: t.propResizable, type: 'boolean', default: 'false' },
      {
        name: 'onAssignmentChange',
        description: t.propOnAssignmentChange,
        type: '(next: Assignment) => void',
      },
      {
        name: 'onConflict',
        description: t.propOnConflict,
        type: '(conflicts: Conflict[]) => void',
      },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
    ],
    [t],
  )

  const calendarCssVars = useMemo<CssVarDef[]>(
    () => [
      {
        name: 'sg-rcal-availability-off-bg',
        default: 'var(--sg-color-bg-disabled)',
        description: t.cssAvailabilityOffBg,
      },
      {
        name: 'sg-rcal-conflict-color',
        default: 'var(--sg-color-error)',
        description: t.cssConflictColor,
      },
      {
        name: 'sg-rcal-conflict-bg',
        default: 'var(--sg-color-error-bg)',
        description: t.cssConflictBg,
      },
      {
        name: 'sg-rcal-tentative-bg',
        default: 'var(--sg-color-primary-bg)',
        description: t.cssTentativeBg,
      },
      {
        name: 'sg-rcal-tentative-border',
        default: 'var(--sg-color-primary)',
        description: t.cssTentativeBorder,
      },
      {
        name: 'sg-rcal-confirmed-bg',
        default: 'var(--sg-color-primary)',
        description: t.cssConfirmedBg,
      },
      {
        name: 'sg-rcal-confirmed-text',
        default: 'var(--sg-color-white)',
        description: t.cssConfirmedText,
      },
      {
        name: 'sg-rcal-marker-size',
        default: '10px',
        description: t.cssMarkerSize,
      },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbResourceCalendar]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicResourceCalendar />
      </DemoBox>

      <DemoBox
        title={t.demoCapacityTitle}
        description={t.demoCapacityDesc}
        code={WithCapacitySource}
      >
        <WithCapacityResourceCalendar />
      </DemoBox>

      <PropsTable title={t.tableResourceCalendarApi} data={calendarProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={calendarCssVars} />
    </ComponentDoc>
  )
}
