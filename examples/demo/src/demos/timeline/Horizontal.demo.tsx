import { EventTimeline } from '@skygraph/react'
import type { TimelineEvent } from '@skygraph/react'

const releases: TimelineEvent[] = [
  { id: 'v01', date: Date.UTC(2025, 9, 1), title: 'v0.1', description: 'Engines + hooks' },
  { id: 'v02', date: Date.UTC(2025, 11, 5), title: 'v0.2', description: 'Tests + a11y' },
  { id: 'v03', date: Date.UTC(2026, 1, 10), title: 'v0.3', description: 'Demo docs' },
  { id: 'v04', date: Date.UTC(2026, 3, 1), title: 'v0.4', description: 'GraphEngine' },
  { id: 'v05', date: Date.UTC(2026, 4, 1), title: 'v0.5', description: 'Charts + Dashboard' },
]

/**
 * Horizontal track grouped by year — useful for compact release / changelog
 * views where months provide enough context. `renderEvent` overrides the
 * default body to render a small card.
 */
export function HorizontalTimeline() {
  return (
    <EventTimeline
      events={releases}
      orientation="horizontal"
      groupBy="year"
      renderEvent={(ev) => (
        <div
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: 6,
            padding: '8px 12px',
            background: '#fafafa',
            minWidth: 160,
          }}
        >
          <strong>{ev.title}</strong>
          {ev.description && (
            <div style={{ fontSize: 12, color: '#595959', marginTop: 4 }}>
              {ev.description}
            </div>
          )}
        </div>
      )}
    />
  )
}
