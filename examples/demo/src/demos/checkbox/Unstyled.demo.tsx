import { Checkbox } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    checked: 'Unstyled checked',
    indeterminate: 'Unstyled indeterminate',
    disabled: 'Unstyled disabled',
  },
  ru: {
    checked: 'Без стилей, отмечено',
    indeterminate: 'Без стилей, промежуточное',
    disabled: 'Без стилей, отключено',
  },
} as const

/**
 * `unstyled` removes SkyGraph classes — you get the native checkbox +
 * label wrapper. Use it inside a larger design-system wrapper.
 */
export function UnstyledCheckbox() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <Checkbox unstyled defaultChecked>{t.checked}</Checkbox>
      <Checkbox unstyled indeterminate>{t.indeterminate}</Checkbox>
      <Checkbox unstyled disabled>{t.disabled}</Checkbox>
    </div>
  )
}
