import { Calendar } from '@skygraph/react'

/**
 * `fullscreen={false}` swaps the roomy desktop layout for a compact card
 * — ideal as a widget inside a sidebar or a popover.
 */
export function CardCalendar() {
  return (
    <div style={{ maxWidth: 320 }}>
      <Calendar fullscreen={false} />
    </div>
  )
}
