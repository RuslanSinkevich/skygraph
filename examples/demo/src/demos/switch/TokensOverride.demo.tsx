import type { CSSProperties } from 'react'
import { Switch } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    on: 'ON',
    off: 'OFF',
  },
  ru: {
    on: 'ВКЛ',
    off: 'ВЫКЛ',
  },
} as const

/**
 * Switch has no component-specific tokens. The track uses
 * `--sg-color-text-disabled` (off) and `--sg-color-primary` (on),
 * so scoping those globals rebrands the group instantly.
 */
const scoped: CSSProperties = {
  ['--sg-color-primary' as never]: '#e11d48',
  ['--sg-color-text-disabled' as never]: 'rgba(225, 29, 72, 0.2)',
}

export function TokensOverrideSwitch() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', ...scoped }}>
      <Switch defaultChecked />
      <Switch defaultChecked checkedChildren={t.on} unCheckedChildren={t.off} />
      <Switch />
    </div>
  )
}
