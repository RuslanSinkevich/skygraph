import { Spin } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Spin reads `--sg-spin-color` for the ring (defaulting to the primary
 * palette) and `--sg-spin-overlay-bg` for the backdrop. Three scoped recipes —
 * branded green, dark field, glass pick — recolour the spinner.
 */
export function TokensOverrideSpin() {
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-spin-color' as never]: '#059669' },
        dark: { ['--sg-spin-color' as never]: '#60a5fa' },
        glass: { ['--sg-spin-color' as never]: '#6366f1' },
      }}
      render={() => (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
          <Spin spinning size="large" />
        </div>
      )}
    />
  )
}
