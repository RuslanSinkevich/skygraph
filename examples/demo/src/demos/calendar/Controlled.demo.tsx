import { useState } from 'react'
import { Calendar, Button } from '@skygraph/react'

/**
 * Controlled — parent owns the selected date. `onChange` fires on any
 * date pick. `onPanelChange` fires when the user navigates months/years.
 */
export function ControlledCalendar() {
  const [value, setValue] = useState<Date>(() => new Date())

  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 340 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ color: 'var(--sg-color-text-secondary)' }}>
          Selected: <strong>{value.toLocaleDateString()}</strong>
        </span>
        <Button size="small" onClick={() => setValue(new Date())}>Today</Button>
        <Button size="small" onClick={() => setValue(new Date(2030, 0, 1))}>Jan 1, 2030</Button>
      </div>
      <Calendar fullscreen={false} value={value} onChange={setValue} />
    </div>
  )
}
