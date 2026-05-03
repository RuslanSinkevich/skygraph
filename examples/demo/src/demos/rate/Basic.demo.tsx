import { useState } from 'react'
import { Rate } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    valuePrefix: 'value:',
  },
  ru: {
    valuePrefix: 'значение:',
  },
} as const

/**
 * Controlled star rating. Clicking the currently-selected star clears
 * the value (toggles back to 0) — a common UX pattern for "undo".
 */
export function BasicRate() {
  const t = useDemoStrings(STRINGS)
  const [value, setValue] = useState(3)
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Rate value={value} onChange={setValue} />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {t.valuePrefix} {value}
      </span>
    </div>
  )
}
