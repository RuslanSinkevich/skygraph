import { Tag } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Tag has no component-specific tokens — it composes the globals. The
 * `processing` preset follows `--sg-color-primary`, the radius follows
 * `--sg-border-radius-sm`. Three scoped recipes — branded green, dark field,
 * glass pick — rebrand the pills.
 */
const STRINGS = {
  en: { default: 'default', active: 'active' },
  ru: { default: 'обычный', active: 'активный' },
} as const

export function TokensOverrideTag() {
  const t = useDemoStrings(STRINGS)
  return (
    <TokenScopeCards
      render={() => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag>{t.default}</Tag>
          <Tag color="processing">{t.active}</Tag>
        </div>
      )}
    />
  )
}
