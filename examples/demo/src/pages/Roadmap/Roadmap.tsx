import { useMemo } from 'react'
import { EventTimeline } from '@skygraph/react'
import type { TimelineEvent } from '@skygraph/react'
import { parseTodo } from '@skygraph-examples/shared'
import type { TodoItem, TodoSection } from '@skygraph-examples/shared'
import todoMd from '../../../../../TODO.md?raw'
import { useI18n } from '../../i18n'
import './roadmap.css'

interface RoadmapProps {
  /** Click handler for hash-based navigation (currently unused — kept symmetrical with other pages). */
  onNavigate?: (key: string) => void
}

interface DecoratedItem {
  item: TodoItem
  section: TodoSection
}

export function Roadmap(_props: RoadmapProps) {
  const { t } = useI18n()

  const sections = useMemo(() => parseTodo(todoMd), [])

  const decorated = useMemo<DecoratedItem[]>(() => {
    const out: DecoratedItem[] = []
    for (const section of sections) {
      for (const item of section.items) out.push({ item, section })
    }
    return out
  }, [sections])

  const stats = useMemo(() => {
    let closed = 0
    let open = 0
    for (const { item } of decorated) {
      if (item.status === 'closed') closed++
      else open++
    }
    return { closed, open, total: decorated.length }
  }, [decorated])

  // Sort: open items first (the live work), then closed items by id.
  // Use a stable date-encoded id so EventTimeline can sort by it
  // (closed = older, open = newer — produces a "what's next" tail).
  const events = useMemo<TimelineEvent[]>(() => {
    const baseTime = new Date('2026-01-01T00:00:00Z').getTime()
    const sorted = [...decorated].sort((a, b) => {
      // Open items go to the bottom (rendered last in vertical timeline).
      if (a.item.status !== b.item.status) {
        return a.item.status === 'closed' ? -1 : 1
      }
      // Within a status, order by id ascending.
      return compareIds(a.item.id, b.item.id)
    })
    return sorted.map((d, idx) => ({
      id: `${d.section.id}-${d.item.id || idx}`,
      date: baseTime + idx * 86_400_000,
      title: <RoadmapTitle item={d.item} section={d.section} t={t} />,
      description: <RoadmapBody item={d.item} />,
      color: d.item.status === 'closed' ? 'var(--sg-color-success)' : undefined,
    }))
  }, [decorated, t])

  return (
    <div className="roadmap">
      <header className="roadmap-header">
        <h1 className="roadmap-title">{t.roadmap.title}</h1>
        <p className="roadmap-lead">{t.roadmap.lead}</p>
      </header>

      <div className="roadmap-stats" role="list" aria-label="Roadmap stats">
        <span className="roadmap-stat roadmap-stat--closed" role="listitem">
          <span className="roadmap-stat-dot" aria-hidden="true" />
          {stats.closed} {t.roadmap.statClosed}
        </span>
        <span className="roadmap-stat roadmap-stat--open" role="listitem">
          <span className="roadmap-stat-dot" aria-hidden="true" />
          {stats.open} {t.roadmap.statOpen}
        </span>
        <span className="roadmap-stat roadmap-stat--total" role="listitem">
          <span className="roadmap-stat-dot" aria-hidden="true" />
          {stats.total} {t.roadmap.statTotal}
        </span>
      </div>

      <div className="roadmap-source">{t.roadmap.sourceLabel}</div>

      {events.length === 0 ? (
        <div className="roadmap-empty">{t.roadmap.emptyLabel}</div>
      ) : (
        <EventTimeline
          events={events}
          orientation="vertical"
          renderMarker={(ev) => (
            <span
              className={
                ev.color
                  ? 'roadmap-marker roadmap-marker--closed'
                  : 'roadmap-marker roadmap-marker--open'
              }
              aria-hidden="true"
            />
          )}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------

function RoadmapTitle({
  item,
  section,
  t,
}: {
  item: TodoItem
  section: TodoSection
  t: ReturnType<typeof useI18n>['t']
}) {
  const isClosed = item.status === 'closed'
  return (
    <>
      <div className="roadmap-event-title">
        {item.id && <span className="roadmap-event-id">§ {item.id}</span>}
        <span>{stripInline(item.title)}</span>
        <span
          className={
            isClosed
              ? 'roadmap-event-status roadmap-event-status--closed'
              : 'roadmap-event-status roadmap-event-status--open'
          }
        >
          {isClosed ? t.roadmap.statClosed : t.roadmap.statOpen}
        </span>
      </div>
      {section.title && (
        <div className="roadmap-event-section">
          {section.id && <>§{section.id} · </>}
          {section.title}
        </div>
      )}
    </>
  )
}

function RoadmapBody({ item }: { item: TodoItem }) {
  const summary = useMemo(() => {
    const lines = item.body
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .slice(0, 3)
      .map(stripInline)
    return lines.join('\n')
  }, [item])
  if (!summary) return null
  return <div className="roadmap-event-body">{summary}</div>
}

// ---------------------------------------------------------------------------

/** Numeric-aware comparator for ids like `"1.2"` vs `"1.10"`. */
function compareIds(a: string, b: string): number {
  const pa = a.split('.').map((s) => parseInt(s, 10) || 0)
  const pb = b.split('.').map((s) => parseInt(s, 10) || 0)
  const len = Math.max(pa.length, pb.length)
  for (let i = 0; i < len; i++) {
    const da = pa[i] ?? 0
    const db = pb[i] ?? 0
    if (da !== db) return da - db
  }
  return 0
}

function stripInline(line: string): string {
  return line
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^\s*[-*]\s+/, '· ')
    .replace(/^~~(.+?)~~/, '$1')
    .trim()
}
