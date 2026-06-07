import { Avatar } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Avatar has no component-specific tokens — corners follow
 * `--sg-border-radius` and the fallback background follows the colour palette.
 * Three scoped recipes — branded green, dark field, glass pick — reshape and
 * recolour the avatars.
 */
export function TokensOverrideAvatar() {
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-color-text-disabled' as never]: '#059669' },
        dark: { ['--sg-color-text-disabled' as never]: '#3b82f6' },
        glass: { ['--sg-color-text-disabled' as never]: '#6366f1' },
      }}
      render={() => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Avatar size="large">A</Avatar>
          <Avatar size="large" shape="square">
            B
          </Avatar>
        </div>
      )}
    />
  )
}
