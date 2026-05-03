import { EventTimeline } from '@skygraph/react'
import type { TimelineEvent } from '@skygraph/react'

const events: TimelineEvent[] = [
  {
    id: 'kickoff',
    date: Date.UTC(2026, 0, 12),
    title: 'Project kickoff',
    description: 'Stakeholders aligned, scope locked.',
    color: '#52c41a',
  },
  {
    id: 'design',
    date: Date.UTC(2026, 0, 25),
    title: 'Design review',
    description: 'Mocks signed off; component inventory ready.',
  },
  {
    id: 'alpha',
    date: Date.UTC(2026, 1, 10),
    title: 'Alpha release',
    description: 'Internal users start dogfooding.',
    color: '#1677ff',
  },
  {
    id: 'beta',
    date: Date.UTC(2026, 2, 5),
    title: 'Beta opens',
    description: 'External waiting list invited.',
    color: '#722ed1',
  },
  {
    id: 'launch',
    date: Date.UTC(2026, 3, 1),
    title: 'GA launch',
    description: 'Public release with marketing push.',
    color: '#faad14',
  },
]

/**
 * Vertical event stream grouped by month. Each event has a colored dot,
 * title and description; dividers mark new month buckets.
 */
export function EventsTimeline() {
  return <EventTimeline events={events} groupBy="month" />
}
