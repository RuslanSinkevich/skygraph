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
  // The TimePicker trigger is a non-focusable `div[role=combobox]`, so the
  // wrapper's focus events never fire and the label can't float on focus.
  // Track the dropdown's open state instead so the label lifts the moment the
  // picker opens — otherwise it sits stranded in the middle of the field.
  const [open, setOpen] = useState(false)
  return (
    <div style={{ maxWidth: 220 }}>
      <FloatingFieldStyles />
      <FloatingField label={t.time} filled={value !== '' || open}>
        <TimePicker value={value} onChange={setValue} onOpenChange={setOpen} placeholder="" />
      </FloatingField>
    </div>
  )
}
