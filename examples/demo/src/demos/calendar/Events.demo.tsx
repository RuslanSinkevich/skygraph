import { Calendar } from '@skygraph/react'
import type { CalendarEvent } from '@skygraph/react'

const today = new Date()
const d = (delta: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + delta)

const events: CalendarEvent[] = [
  { key: 'standup', date: d(0), title: 'Standup', color: 'var(--sg-color-primary)' },
  { key: 'review', date: d(0), title: 'Design review', color: 'var(--sg-color-warning)' },
  { key: 'release', date: d(1), title: 'Release v0.4', color: 'var(--sg-color-success)' },
  { key: 'onboard', date: d(1), title: 'New hire onboarding', color: 'var(--sg-color-success)' },
  { key: 'q-plan', date: d(3), title: 'Quarter planning', color: 'var(--sg-color-error)' },
  { key: 'sync', date: d(-2), title: 'Customer sync', color: 'var(--sg-color-primary)' },
]

/**
 * Pass an `events` array — Calendar renders up to `maxEvents` colored
 * chips per cell and collapses the rest into "+N more". Good enough for
 * dashboards and project trackers without pulling in a full scheduler.
 */
export function EventsCalendar() {
  return <Calendar events={events} maxEvents={2} />
}
