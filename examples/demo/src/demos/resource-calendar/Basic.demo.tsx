import { useEffect, useState } from 'react'
import { ResourceCalendar } from '@skygraph/react'
import type { Assignment, Resource } from '@skygraph/react'
import { useI18n } from '../../i18n'

const RESOURCES = {
  en: [
    { id: 'alice', name: 'Alice', color: '#3b82f6' },
    { id: 'bob', name: 'Bob', color: '#f97316' },
    { id: 'carol', name: 'Carol', color: '#10b981' },
    { id: 'dave', name: 'Dave', color: '#a855f7' },
  ],
  ru: [
    { id: 'alice', name: 'Алиса', color: '#3b82f6' },
    { id: 'bob', name: 'Борис', color: '#f97316' },
    { id: 'carol', name: 'Карина', color: '#10b981' },
    { id: 'dave', name: 'Даниил', color: '#a855f7' },
  ],
} as const satisfies Record<string, readonly Resource[]>

// Two of these intentionally overlap on Bob → conflict overlay shows up
// out of the box. Drag any block to see the engine recompute live.
const INITIAL = {
  en: [
    {
      id: 'a1',
      resourceId: 'alice',
      title: 'Discovery',
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 8),
    },
    {
      id: 'a2',
      resourceId: 'alice',
      title: 'Design review',
      start: Date.UTC(2026, 0, 9),
      end: Date.UTC(2026, 0, 11),
    },
    {
      id: 'b1',
      resourceId: 'bob',
      title: 'Backend spike',
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 9),
    },
    {
      id: 'b2',
      resourceId: 'bob',
      title: 'API contract',
      start: Date.UTC(2026, 0, 7),
      end: Date.UTC(2026, 0, 10),
    },
    {
      id: 'c1',
      resourceId: 'carol',
      title: 'Onboarding',
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 11),
    },
    {
      id: 'd1',
      resourceId: 'dave',
      title: 'QA pass',
      start: Date.UTC(2026, 0, 9),
      end: Date.UTC(2026, 0, 12),
    },
  ],
  ru: [
    {
      id: 'a1',
      resourceId: 'alice',
      title: 'Discovery',
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 8),
    },
    {
      id: 'a2',
      resourceId: 'alice',
      title: 'Дизайн-ревью',
      start: Date.UTC(2026, 0, 9),
      end: Date.UTC(2026, 0, 11),
    },
    {
      id: 'b1',
      resourceId: 'bob',
      title: 'Backend spike',
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 9),
    },
    {
      id: 'b2',
      resourceId: 'bob',
      title: 'API-контракт',
      start: Date.UTC(2026, 0, 7),
      end: Date.UTC(2026, 0, 10),
    },
    {
      id: 'c1',
      resourceId: 'carol',
      title: 'Онбординг',
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 11),
    },
    {
      id: 'd1',
      resourceId: 'dave',
      title: 'QA-проверка',
      start: Date.UTC(2026, 0, 9),
      end: Date.UTC(2026, 0, 12),
    },
  ],
} as const satisfies Record<string, readonly Assignment[]>

/**
 * Drag a block to move it (snaps to the day step), drag the left/right
 * edges to resize. The two overlapping bookings on Bob will surface as
 * a hatched red `conflict` block until you separate them.
 */
export function BasicResourceCalendar() {
  const { locale } = useI18n()
  const resources = RESOURCES[locale] ?? RESOURCES.en
  const initial = INITIAL[locale] ?? INITIAL.en
  const [assignments, setAssignments] = useState<Assignment[]>(() => [...initial])
  useEffect(() => setAssignments([...initial]), [initial])
  return (
    <ResourceCalendar
      resources={resources}
      assignments={assignments}
      scale="day"
      columnWidth={48}
      rowHeight={48}
      sidebarWidth={140}
      draggable
      resizable
      onAssignmentChange={(next) =>
        setAssignments((prev) => prev.map((a) => (a.id === next.id ? { ...a, ...next } : a)))
      }
    />
  )
}
