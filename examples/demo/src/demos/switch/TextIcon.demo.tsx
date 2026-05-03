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
 * `checkedChildren` / `unCheckedChildren` render a tiny label inside
 * the track. Keep it to 1–3 chars so the thumb stays aligned.
 */
export function TextIconSwitch() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch defaultChecked checkedChildren={t.on} unCheckedChildren={t.off} />
      <Switch checkedChildren="1" unCheckedChildren="0" />
      <Switch defaultChecked checkedChildren="✓" unCheckedChildren="✕" />
    </div>
  )
}
