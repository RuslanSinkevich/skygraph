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
      minCardWidth={260}
      extra={{
        brand: { ['--sg-color-bg-secondary' as never]: '#ecfdf5' },
        dark: {
          ['--sg-color-bg-secondary' as never]: '#1e293b',
          ['--sg-color-primary-bg' as never]: 'rgba(96, 165, 250, 0.22)',
        },
        glass: {
          ['--sg-color-bg-secondary' as never]: 'rgba(255, 255, 255, 0.58)',
          ['--sg-color-border' as never]: 'rgba(79, 70, 229, 0.2)',
        },
      }}
      render={() => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag>{t.default}</Tag>
          <Tag color="processing">{t.active}</Tag>
        </div>
      )}
    />
  )
}
