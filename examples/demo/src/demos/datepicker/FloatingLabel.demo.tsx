import { useState } from 'react'
import { DatePicker } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { FloatingField, FloatingFieldStyles } from '../_shared/FloatingField'

/**
 * Floating label on the DatePicker trigger. The label rises on focus or once a
 * date is picked — driven by the controlled value, no core changes.
 */
const STRINGS = {
  en: { date: 'Start date' },
  ru: { date: 'Дата начала' },
} as const

export function FloatingLabelDatePicker() {
  const t = useDemoStrings(STRINGS)
  const [value, setValue] = useState<Date | null>(null)
  return (
    <div style={{ maxWidth: 260 }}>
      <FloatingFieldStyles />
      <FloatingField label={t.date} filled={value !== null}>
        <DatePicker value={value} onChange={setValue} placeholder="" allowClear />
      </FloatingField>
    </div>
  )
}
