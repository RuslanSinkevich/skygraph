import type { CSSProperties } from 'react'
import { Calendar } from '@skygraph/react'

/**
 * Calendar has no component-scoped tokens — it is driven by the global
 * palette. Override them on a scoped wrapper to re-skin a single
 * instance (e.g. a "holiday" view).
 */
const scoped: CSSProperties = {
  ['--sg-color-primary' as never]: 'var(--sg-green-6)',
  ['--sg-color-primary-bg' as never]: 'var(--sg-green-1)',
  ['--sg-border-radius-lg' as never]: '16px',
  ['--sg-border-radius-sm' as never]: '999px',
}

export function TokensOverrideCalendar() {
  return (
    <div style={{ ...scoped, maxWidth: 320 }}>
      <Calendar fullscreen={false} />
    </div>
  )
}
