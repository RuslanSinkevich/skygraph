import { useState } from 'react'
import { Checkbox } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    agree: 'I agree to the terms',
    statePrefix: 'state:',
    checked: 'checked',
    unchecked: 'unchecked',
  },
  ru: {
    agree: 'Я принимаю условия',
    statePrefix: 'состояние:',
    checked: 'отмечено',
    unchecked: 'не отмечено',
  },
} as const

/**
 * Controlled checkbox with label. `onChange` receives the new boolean
 * value; the native `accent-color` matches `--sg-color-primary`.
 */
export function BasicCheckbox() {
  const t = useDemoStrings(STRINGS)
  const [checked, setChecked] = useState(false)
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Checkbox checked={checked} onChange={setChecked}>
        {t.agree}
      </Checkbox>
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {t.statePrefix} {checked ? t.checked : t.unchecked}
      </span>
    </div>
  )
}
