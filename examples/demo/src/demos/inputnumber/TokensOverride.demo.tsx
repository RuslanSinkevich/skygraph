import { InputNumber } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * InputNumber composes the global form tokens (border, radius, background,
 * text). Three scoped recipes — branded green, dark field, glass pick —
 * reskin the same control; the stepper keeps working.
 */
export function TokensOverrideInputNumber() {
  return (
    <TokenScopeCards
      extra={{
        dark: { ['--sg-color-bg-secondary' as never]: '#1e293b' },
        glass: { ['--sg-color-bg-secondary' as never]: 'rgba(255, 255, 255, 0.4)' },
      }}
      render={() => <InputNumber defaultValue={7} min={0} max={20} />}
    />
  )
}
