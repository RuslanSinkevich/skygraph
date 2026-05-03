import { useState } from 'react'
import { Switch } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    on: 'On',
    off: 'Off',
  },
  ru: {
    on: 'Вкл',
    off: 'Выкл',
  },
} as const

/**
 * Controlled toggle. `onChange` gives you the next boolean so you can
 * persist it, sync it, or derive UI state from it.
 */
export function BasicSwitch() {
  const t = useDemoStrings(STRINGS)
  const [checked, setChecked] = useState(false)
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Switch checked={checked} onChange={setChecked} />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {checked ? t.on : t.off}
      </span>
    </div>
  )
}
