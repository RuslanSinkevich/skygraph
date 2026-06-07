import { EventTimeline } from '@skygraph/react'
import type { TimelineEvent } from '@skygraph/react'
import { useI18n } from '../../i18n'

const RELEASES = {
  en: [
    { id: 'v01', date: Date.UTC(2025, 9, 1), title: 'v0.1', description: 'Engines + hooks' },
    { id: 'v02', date: Date.UTC(2025, 11, 5), title: 'v0.2', description: 'Tests + a11y' },
    { id: 'v03', date: Date.UTC(2026, 1, 10), title: 'v0.3', description: 'Demo docs' },
    { id: 'v04', date: Date.UTC(2026, 3, 1), title: 'v0.4', description: 'GraphEngine' },
    { id: 'v05', date: Date.UTC(2026, 4, 1), title: 'v0.5', description: 'Charts + Dashboard' },
  ],
  ru: [
    { id: 'v01', date: Date.UTC(2025, 9, 1), title: 'v0.1', description: 'Engines + hooks' },
    { id: 'v02', date: Date.UTC(2025, 11, 5), title: 'v0.2', description: 'Тесты + a11y' },
    { id: 'v03', date: Date.UTC(2026, 1, 10), title: 'v0.3', description: 'Документация demo' },
    { id: 'v04', date: Date.UTC(2026, 3, 1), title: 'v0.4', description: 'GraphEngine' },
    { id: 'v05', date: Date.UTC(2026, 4, 1), title: 'v0.5', description: 'Charts + Dashboard' },
  ],
} as const satisfies Record<string, readonly TimelineEvent[]>

/**
 * Horizontal track grouped by year — useful for compact release / changelog
 * views where months provide enough context. `renderEvent` overrides the
 * default body to render a small card.
 */
export function HorizontalTimeline() {
  const { locale } = useI18n()
  const releases = RELEASES[locale] ?? RELEASES.en
  return (
    <EventTimeline
      events={releases}
      orientation="horizontal"
      groupBy="year"
      renderEvent={(ev) => (
        <div
          style={{
            border: '1px solid var(--sg-color-border-secondary)',
            borderRadius: 'var(--sg-border-radius)',
            padding: '8px 12px',
            background: 'var(--sg-color-bg-container)',
            minWidth: 160,
            boxShadow: 'var(--sg-shadow-sm)',
          }}
        >
          <strong style={{ color: 'var(--sg-color-text)' }}>{ev.title}</strong>
          {ev.description && (
            <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)', marginTop: 4 }}>
              {ev.description}
            </div>
          )}
        </div>
      )}
    />
  )
}
