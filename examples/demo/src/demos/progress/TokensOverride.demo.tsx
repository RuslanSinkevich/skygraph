import { Progress } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Progress has no component-private tokens — bars and rings read
 * `--sg-color-primary`, `--sg-color-bg-hover` and `--sg-color-success/error`.
 * Three scoped recipes — branded green, dark field, glass pick — rebrand them.
 */
export function TokensOverrideProgress() {
  return (
    <TokenScopeCards
      render={() => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Progress percent={35} />
          <Progress percent={75} status="active" />
        </div>
      )}
    />
  )
}
