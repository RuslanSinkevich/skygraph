import { Badge } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Badge has no component-specific tokens — the count pulls `--sg-color-error`,
 * the status dot pulls the primary palette. Three scoped recipes — branded
 * green, dark field, glass pick — rebrand the counters.
 */
const box = {
  width: 36,
  height: 36,
  borderRadius: 8,
  background: 'rgba(148, 163, 184, 0.35)',
  display: 'inline-block',
}

export function TokensOverrideBadge() {
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-color-error' as never]: '#059669' },
        dark: { ['--sg-color-error' as never]: '#60a5fa' },
        glass: { ['--sg-color-error' as never]: '#6366f1' },
      }}
      render={() => (
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Badge count={5}>
            <span style={box} />
          </Badge>
          <Badge dot>
            <span style={box} />
          </Badge>
        </div>
      )}
    />
  )
}
