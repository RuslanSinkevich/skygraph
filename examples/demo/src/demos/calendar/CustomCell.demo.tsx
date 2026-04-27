import { Calendar } from '@skygraph/react'

/**
 * `cellRender` lets you inject arbitrary content under the day number —
 * here we draw colored "load" dots for each day to mimic a team capacity
 * view.
 */
export function CustomCellCalendar() {
  return (
    <Calendar
      fullscreen={false}
      cellRender={(date, info) => {
        if (info.type !== 'date') return null
        const load = (date.getDate() * 13) % 5
        return (
          <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginTop: 2 }}>
            {Array.from({ length: load }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 999,
                  background:
                    load >= 4
                      ? 'var(--sg-color-error)'
                      : load >= 2
                      ? 'var(--sg-color-warning)'
                      : 'var(--sg-color-success)',
                }}
              />
            ))}
          </div>
        )
      }}
    />
  )
}
