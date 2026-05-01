import { Calendar } from '@skygraph/react'
import { calendarEvents } from './data'
import { dateKey } from '../_shared'

const PRIORITY_COLOR: Record<string, string> = {
  critical: '#ff4d4f',
  high: '#faad14',
  medium: '#1677ff',
  low: '#bfbfbf',
}

export function CalendarTab() {
  return (
    <Calendar
      fullscreen={false}
      cellRender={(date) => {
        const key = dateKey(date)
        const evts = calendarEvents.filter(e => e.date === key)
        if (!evts.length) return null
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {evts.slice(0, 2).map((e, i) => (
              <div key={i} style={{
                fontSize: 10,
                padding: '0 4px',
                borderRadius: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                background: PRIORITY_COLOR[e.priority] + '22',
                borderLeft: `2px solid ${PRIORITY_COLOR[e.priority]}`,
              }}>
                {e.title}
              </div>
            ))}
            {evts.length > 2 && (
              <div style={{ fontSize: 10, color: 'var(--sg-color-text-secondary)' }}>
                +{evts.length - 2} more
              </div>
            )}
          </div>
        )
      }}
    />
  )
}
