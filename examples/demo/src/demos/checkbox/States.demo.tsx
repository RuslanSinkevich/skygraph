import { Checkbox } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    unchecked: 'Unchecked',
    checked: 'Checked',
    indeterminate: 'Indeterminate',
    disabled: 'Disabled',
    disabledChecked: 'Disabled + checked',
    loading: 'Loading',
  },
  ru: {
    unchecked: 'Не отмечено',
    checked: 'Отмечено',
    indeterminate: 'Промежуточное',
    disabled: 'Отключено',
    disabledChecked: 'Отключено + отмечено',
    loading: 'Загрузка',
  },
} as const

/**
 * Every visual state in one place — use this to verify styling overrides
 * cover all cases when theming.
 */
export function StatesCheckbox() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <Checkbox>{t.unchecked}</Checkbox>
      <Checkbox defaultChecked>{t.checked}</Checkbox>
      <Checkbox indeterminate>{t.indeterminate}</Checkbox>
      <Checkbox disabled>{t.disabled}</Checkbox>
      <Checkbox disabled defaultChecked>{t.disabledChecked}</Checkbox>
      <Checkbox loading>{t.loading}</Checkbox>
    </div>
  )
}
