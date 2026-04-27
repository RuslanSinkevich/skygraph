import { Calendar } from '@skygraph/react'

/**
 * `unstyled` keeps the accessibility tree (table, grid, buttons) but
 * drops every SkyGraph class. Perfect when embedding inside a custom
 * design system.
 */
export function UnstyledCalendar() {
  return (
    <div style={{ maxWidth: 320 }}>
      <Calendar fullscreen={false} unstyled />
    </div>
  )
}
