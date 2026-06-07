import { Segmented } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Segmented composes the global scale — `--sg-color-bg-secondary` for the
 * track, `--sg-color-bg-container` for the selected thumb. Three scoped
 * recipes — branded green, dark field, glass pick — repaint the control.
 */
export function TokensOverrideSegmented() {
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-color-bg-secondary' as never]: '#d1fae5' },
        dark: { ['--sg-color-bg-container' as never]: '#334155' },
        glass: { ['--sg-color-bg-container' as never]: 'rgba(255, 255, 255, 0.85)' },
      }}
      render={() => <Segmented defaultValue="B" options={['A', 'B', 'C', 'D']} />}
    />
  )
}
