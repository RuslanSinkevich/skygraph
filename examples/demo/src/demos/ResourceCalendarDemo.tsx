import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicResourceCalendar } from './resource-calendar/Basic.demo'
import BasicSource from './resource-calendar/Basic.demo?raw'
import { WithCapacityResourceCalendar } from './resource-calendar/WithCapacity.demo'
import WithCapacitySource from './resource-calendar/WithCapacity.demo?raw'

const calendarProps: PropDef[] = [
  { name: 'resources', description: 'Lanes rendered along the left rail (one row each)', type: 'readonly Resource[]' },
  { name: 'assignments', description: 'Time-anchored bookings positioned inside the lanes', type: 'readonly Assignment[]' },
  { name: 'rules', description: 'Optional availability windows (HH:MM, optional dayOfWeek)', type: 'readonly AvailabilityRule[]' },
  { name: 'scale', description: 'Time-axis granularity. Drives header ticks AND drag/resize snap', type: "'day' | 'week' | 'month'", default: "'week'" },
  { name: 'range', description: 'Visible window. Auto-derived from min(start)/max(end) when omitted', type: '{ from: Date; to: Date }' },
  { name: 'columnWidth', description: 'Pixel width of one scale step', type: 'number', default: '120' },
  { name: 'rowHeight', description: 'Lane height in pixels', type: 'number', default: '56' },
  { name: 'sidebarWidth', description: 'Width of the left rail', type: 'number', default: '200' },
  { name: 'draggable', description: 'Enable click-and-drag to move blocks along the time axis', type: 'boolean', default: 'false' },
  { name: 'resizable', description: 'Enable left/right edge handles to resize blocks', type: 'boolean', default: 'false' },
  { name: 'onAssignmentChange', description: 'Fires after a move or resize with the patched assignment', type: '(next: Assignment) => void' },
  { name: 'onConflict', description: 'Fires whenever the detected Conflict[] changes', type: '(conflicts: Conflict[]) => void' },
  { name: 'unstyled', description: 'Drop SkyGraph classes (headless mode)', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
]

const calendarCssVars: CssVarDef[] = [
  {
    name: 'sg-rcal-availability-off-bg',
    default: 'var(--sg-color-bg-disabled)',
    description: 'Background colour of "outside availability" stripe bands',
  },
  {
    name: 'sg-rcal-conflict-color',
    default: 'var(--sg-color-error)',
    description: 'Border + hatch colour for conflict blocks',
  },
  {
    name: 'sg-rcal-conflict-bg',
    default: 'var(--sg-color-error-bg)',
    description: 'Background colour for conflict blocks',
  },
  {
    name: 'sg-rcal-tentative-bg',
    default: 'var(--sg-color-primary-bg)',
    description: 'Background of tentative (default) assignment blocks',
  },
  {
    name: 'sg-rcal-tentative-border',
    default: 'var(--sg-color-primary)',
    description: 'Dashed border of tentative blocks',
  },
  {
    name: 'sg-rcal-confirmed-bg',
    default: 'var(--sg-color-primary)',
    description: 'Solid background of confirmed blocks',
  },
  {
    name: 'sg-rcal-confirmed-text',
    default: 'var(--sg-color-white)',
    description: 'Text colour inside confirmed blocks',
  },
  {
    name: 'sg-rcal-marker-size',
    default: '10px',
    description: 'Diameter of the colour dot next to each resource label',
  },
]

export function ResourceCalendarDemo() {
  return (
    <ComponentDoc
      title="Resource Calendar"
      description="Per-resource lane planner with drag, resize, and live conflict detection (overlap, capacity, availability). Domain logic lives in `@skygraph/core/calendar`; this is the React adapter."
      whenToUse={[
        'Schedule shifts, bookings, or appointments per resource (people, rooms, machines).',
        'Surface scheduling conflicts visually without building bespoke clash logic.',
        'Pair with availability rules to prevent off-hours work.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Four resources, one week, six bookings — two intentionally overlap on Bob to surface the conflict overlay. Drag to move, edge-drag to resize."
        code={BasicSource}
      >
        <BasicResourceCalendar />
      </DemoBox>

      <DemoBox
        title="Capacity per slot"
        description="One room with `capacityPerSlot=2` and three concurrent bookings on day 1 → all three flag as `over-capacity`. The panel below mirrors `onConflict`."
        code={WithCapacitySource}
      >
        <WithCapacityResourceCalendar />
      </DemoBox>

      <PropsTable title="ResourceCalendar API" data={calendarProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="All locals live on `.sg-rcal` and route through `--sg-color-*` global tokens. Override the conflict / tentative colours per-instance to rebrand."
        data={calendarCssVars}
      />
    </ComponentDoc>
  )
}
