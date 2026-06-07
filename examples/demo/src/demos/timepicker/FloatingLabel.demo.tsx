import { useState } from 'react'
import { TimePicker } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { FloatingField, FloatingFieldStyles } from '../_shared/FloatingField'

/**
 * Floating label on the TimePicker trigger. The label floats on focus or once
 * a time is selected.
 */
const STRINGS = {
  en: { time: 'Meeting time' },
  ru: { time: 'Время встречи' },
} as const

export function FloatingLabelTimePicker() {
  const t = useDemoStrings(STRINGS)
  const [value, setValue] = useState('')
  return (
    <div style={{ maxWidth: 220 }}>
      <FloatingFieldStyles />
      <FloatingField label={t.time} filled={value !== ''}>
        <TimePicker value={value} onChange={setValue} placeholder="" />
      </FloatingField>
    </div>
  )
}
