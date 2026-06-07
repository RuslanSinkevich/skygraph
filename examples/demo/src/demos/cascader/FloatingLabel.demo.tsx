import { useState } from 'react'
import { Cascader } from '@skygraph/react'
import { regionOptions } from './data'
import { useDemoStrings } from '../../i18n'
import { FloatingField, FloatingFieldStyles } from '../_shared/FloatingField'

/**
 * Floating label on the Cascader trigger. The label floats on focus or once a
 * path is selected.
 */
const STRINGS = {
  en: { region: 'Region' },
  ru: { region: 'Регион' },
} as const

export function FloatingLabelCascader() {
  const t = useDemoStrings(STRINGS)
  const [value, setValue] = useState<(string | number)[]>([])
  return (
    <div style={{ maxWidth: 280 }}>
      <FloatingFieldStyles />
      <FloatingField label={t.region} filled={value.length > 0}>
        <Cascader
          options={regionOptions}
          value={value}
          onChange={(v) => setValue(v)}
          placeholder=""
        />
      </FloatingField>
    </div>
  )
}
