import { useState } from 'react'
import { Calendar } from '@skygraph/react'

/**
 * `mode="year"` shows a 12-month grid. Great for scheduling views with
 * monthly granularity (fiscal plans, OKRs). Combine with `onPanelChange`
 * to sync the panel with a parent filter.
 */
export function YearModeCalendar() {
  const [mode, setMode] = useState<'month' | 'year'>('year')

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>Current mode: {mode}</div>
      <Calendar
        mode={mode}
        onPanelChange={(_, m) => setMode(m)}
      />
    </div>
  )
}
