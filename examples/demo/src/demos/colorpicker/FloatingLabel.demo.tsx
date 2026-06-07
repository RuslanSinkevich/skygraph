import { useState } from 'react'
import { ColorPicker } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { FloatingField, FloatingFieldStyles } from '../_shared/FloatingField'

/**
 * Floating label on the ColorPicker trigger. ColorPicker always carries a
 * colour, so the label stays floated as a caption above the swatch and lifts
 * its colour on focus.
 */
const STRINGS = {
  en: { brand: 'Brand colour' },
  ru: { brand: 'Цвет бренда' },
} as const

export function FloatingLabelColorPicker() {
  const t = useDemoStrings(STRINGS)
  const [value, setValue] = useState('#2563eb')
  return (
    <div style={{ maxWidth: 220, paddingTop: 6 }}>
      <FloatingFieldStyles />
      <FloatingField label={t.brand} filled>
        <ColorPicker value={value} onChange={setValue} showText />
      </FloatingField>
    </div>
  )
}
