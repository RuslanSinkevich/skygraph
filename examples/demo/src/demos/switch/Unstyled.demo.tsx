import { Switch } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    on: 'On',
    off: 'Off',
  },
  ru: {
    on: 'Вкл',
    off: 'Выкл',
  },
} as const

/**
 * `unstyled` drops every SkyGraph class and the visual track. Semantics
 * stay (`role="switch"`, `aria-checked`) — style it yourself, or use
 * `checkedChildren` / `unCheckedChildren` for the on/off labels.
 */
export function UnstyledSwitch() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Switch
        unstyled
        defaultChecked
        checkedChildren={t.on}
        unCheckedChildren={t.off}
        style={{
          padding: '4px 10px',
          border: '1px solid var(--sg-color-border)',
          borderRadius: 999,
          background: 'transparent',
        }}
      />
      <Switch
        unstyled
        checkedChildren={t.on}
        unCheckedChildren={t.off}
        style={{
          padding: '4px 10px',
          border: '1px solid var(--sg-color-border)',
          borderRadius: 999,
          background: 'transparent',
        }}
      />
    </div>
  )
}
