import { Switch } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Switch exposes `--sg-switch-bg-checked` for the on-state track. Three scoped
 * recipes — branded green, dark field, glass pick — recolour the control.
 */
const STRINGS = {
  en: { on: 'ON', off: 'OFF' },
  ru: { on: 'ВКЛ', off: 'ВЫКЛ' },
} as const

export function TokensOverrideSwitch() {
  const t = useDemoStrings(STRINGS)
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-switch-bg-checked' as never]: '#059669' },
        dark: {
          ['--sg-switch-bg' as never]: '#475569',
          ['--sg-switch-bg-checked' as never]: '#60a5fa',
        },
        glass: {
          ['--sg-switch-bg' as never]: 'rgba(30, 41, 59, 0.34)',
          ['--sg-switch-bg-checked' as never]: '#6366f1',
        },
      }}
      render={() => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Switch defaultChecked />
          <Switch defaultChecked checkedChildren={t.on} unCheckedChildren={t.off} />
        </div>
      )}
    />
  )
}
