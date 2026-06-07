import { useState } from 'react'
import { AutoComplete } from '@skygraph/react'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'
import { FloatingField, FloatingFieldStyles } from '../_shared/FloatingField'

/**
 * Floating label on the AutoComplete field. Same pure-CSS float as Input —
 * the label rests over the inner `<input>` and rises on focus or once typed.
 */
const STRINGS = {
  en: { framework: 'Framework' },
  ru: { framework: 'Фреймворк' },
} as const

export function FloatingLabelAutoComplete() {
  const t = useDemoStrings(STRINGS)
  const [value, setValue] = useState('')
  return (
    <div style={{ maxWidth: 280 }}>
      <FloatingFieldStyles />
      <FloatingField label={t.framework} filled={value !== ''}>
        <AutoComplete
          value={value}
          onChange={setValue}
          options={frameworkOptions}
          placeholder=" "
        />
      </FloatingField>
    </div>
  )
}
