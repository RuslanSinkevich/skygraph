import { useMemo, useState } from 'react'
import { ResourceCalendar, Tag, Empty } from '@skygraph/react'
import type { Assignment, Conflict, Resource } from '@skygraph/react'
import { activities, contacts, deals } from './data'
import { stageLabels } from './common'
import { money, statusColor } from '../_shared'

const PALETTE = [
  '#3b82f6',
  '#f97316',
  '#10b981',
  '#a855f7',
  '#ef4444',
  '#0ea5e9',
  '#eab308',
  '#22c55e',
]

const DAY_MS = 86_400_000

function dateMs(s: string): number {
  return new Date(s + 'T00:00:00Z').getTime()
}

function buildAssignments(resourceFor: (contactId: string) => string | null): Assignment[] {
  const items: Assignment[] = []
  let n = 0
  for (const a of activities) {
    const rid = resourceFor(a.contactId)
    if (!rid) continue
    const start = dateMs(a.date)
    items.push({
      id: `act-${a.id}`,
      resourceId: rid,
      title: `${a.type}: ${a.description}`,
      start,
      end: start + DAY_MS,
      status: 'tentative',
    })
    if (++n > 80) break
  }
  for (const d of deals) {
    if (d.stage === 'closed-won' || d.stage === 'closed-lost') continue
    const rid = resourceFor(d.contactId)
    if (!rid) continue
    const created = dateMs(d.createdAt)
    const target = created + Math.round((100 - d.probability) * 0.6 + 14) * DAY_MS
    items.push({
      id: `deal-${d.id}`,
      resourceId: rid,
      title: `${stageLabels[d.stage]} · ${d.title} (${money(d.value, { compact: true })})`,
      start: target - 2 * DAY_MS,
      end: target + 2 * DAY_MS,
      status: d.probability >= 70 ? 'confirmed' : 'tentative',
    })
  }
  return items
}

export function DeadlinesTab() {
  const { resources, assignments: seed } = useMemo(() => {
    const byCompany = new Map<string, typeof contacts>()
    for (const c of contacts) {
      const list = byCompany.get(c.company) ?? []
      list.push(c)
      byCompany.set(c.company, list)
    }
    const top = [...byCompany.entries()]
      .sort((a, b) => {
        const sa = a[1].reduce((s, c) => s + c.revenue, 0)
        const sb = b[1].reduce((s, c) => s + c.revenue, 0)
        return sb - sa
      })
      .slice(0, 8)
    const rs: Resource[] = top.map(([company], i) => ({
      id: `co:${company}`,
      name: company,
      color: PALETTE[i % PALETTE.length]!,
      capacityPerSlot: 2,
    }))
    const lookup = new Map<string, string>()
    for (const [company, list] of top) {
      for (const c of list) lookup.set(c.id, `co:${company}`)
    }
    const assignments = buildAssignments((cid) => lookup.get(cid) ?? null)
    return { resources: rs, assignments }
  }, [])

  const [assignments, setAssignments] = useState(seed)
  const [conflicts, setConflicts] = useState<Conflict[]>([])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ color: 'var(--sg-color-text-secondary)', fontSize: 13, margin: 0 }}>
        Top 8 accounts as resource lanes. Activities (1d) and active deals (~5d window around predicted close) are
        assignments. Each lane has <code>capacityPerSlot=2</code> — over-capacity weeks surface as conflicts.
        Drag to move, edge-drag to resize.
      </p>
      <div style={{ overflowX: 'auto', border: '1px solid var(--sg-color-border-secondary)', borderRadius: 8 }}>
        <ResourceCalendar
          resources={resources}
          assignments={assignments}
          scale="week"
          columnWidth={100}
          rowHeight={56}
          sidebarWidth={180}
          draggable
          resizable
          onAssignmentChange={(next) =>
            setAssignments((prev) => prev.map((a) => (a.id === next.id ? { ...a, ...next } : a)))
          }
          onConflict={setConflicts}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 13 }}>Conflicts:</strong>
        {conflicts.length === 0 ? (
          <span style={{ fontSize: 13, color: 'var(--sg-color-success)' }}>none</span>
        ) : (
          conflicts.slice(0, 8).map((c) => (
            <Tag key={c.id} color={statusColor(c.reason === 'overlap' ? 'warning' : 'error')}>
              {c.reason} · {c.assignmentIds.length}
            </Tag>
          ))
        )}
      </div>
      {assignments.length === 0 && <Empty description="No upcoming activities" />}
    </div>
  )
}
