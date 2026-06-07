import { useEffect, useState } from 'react'
import { ResourceCalendar } from '@skygraph/react'
import type { Assignment, Conflict, Resource } from '@skygraph/react'
import { useDemoStrings, useI18n } from '../../i18n'

// Capacity = 2 ⇒ this resource tolerates two concurrent bookings per
// day-slot but flags the third as `over-capacity`.
const RESOURCES = {
  en: [{ id: 'room-a', name: 'Meeting Room A', color: '#0ea5e9', capacityPerSlot: 2 }],
  ru: [{ id: 'room-a', name: 'Переговорная A', color: '#0ea5e9', capacityPerSlot: 2 }],
} as const satisfies Record<string, readonly Resource[]>

const INITIAL = {
  en: [
    {
      id: 'a1',
      resourceId: 'room-a',
      title: 'Standup',
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 6),
    },
    {
      id: 'a2',
      resourceId: 'room-a',
      title: 'Design crit',
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 7),
    },
    {
      id: 'a3',
      resourceId: 'room-a',
      title: '1:1',
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 6),
    },
  ],
  ru: [
    {
      id: 'a1',
      resourceId: 'room-a',
      title: 'Standup',
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 6),
    },
    {
      id: 'a2',
      resourceId: 'room-a',
      title: 'Дизайн-критика',
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 7),
    },
    {
      id: 'a3',
      resourceId: 'room-a',
      title: '1:1',
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 6),
    },
  ],
} as const satisfies Record<string, readonly Assignment[]>

const STRINGS = {
  en: { conflicts: 'Conflicts' },
  ru: { conflicts: 'Конфликты' },
} as const

/**
 * `capacityPerSlot=2` for the room. Three concurrent bookings on
 * 2026-01-05 trip the `over-capacity` rule — the engine emits a
 * conflict naming all three, and the panel below mirrors the live
 * `Conflict[]` from `onConflict`.
 */
export function WithCapacityResourceCalendar() {
  const { locale } = useI18n()
  const resources = RESOURCES[locale] ?? RESOURCES.en
  const initial = INITIAL[locale] ?? INITIAL.en
  const t = useDemoStrings(STRINGS)
  const [assignments, setAssignments] = useState<Assignment[]>(() => [...initial])
  const [conflicts, setConflicts] = useState<Conflict[]>([])
  useEffect(() => setAssignments([...initial]), [initial])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ResourceCalendar
        resources={resources}
        assignments={assignments}
        scale="day"
        columnWidth={64}
        rowHeight={48}
        sidebarWidth={180}
        draggable
        resizable
        range={{ from: new Date(Date.UTC(2026, 0, 5)), to: new Date(Date.UTC(2026, 0, 10)) }}
        onAssignmentChange={(next) =>
          setAssignments((prev) => prev.map((a) => (a.id === next.id ? { ...a, ...next } : a)))
        }
        onConflict={setConflicts}
      />
      <div
        style={{
          background: 'var(--sg-color-bg-elevated)',
          border: '1px solid var(--sg-color-border)',
          borderRadius: 6,
          padding: 12,
          fontSize: 13,
          color: 'var(--sg-color-text)',
        }}
      >
        <strong>
          {t.conflicts} ({conflicts.length}):
        </strong>
        <ul style={{ margin: '6px 0 0', paddingLeft: 20 }}>
          {conflicts.map((c) => (
            <li key={c.id}>
              <code>{c.reason}</code> — {c.assignmentIds.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
