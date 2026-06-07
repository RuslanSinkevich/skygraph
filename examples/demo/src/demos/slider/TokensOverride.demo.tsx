import { Slider } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Slider uses only global tokens — the fill and handle follow
 * `--sg-color-primary`, the rail follows `--sg-color-border`. Three scoped
 * recipes — branded green, dark field, glass pick — rebrand the control.
 */
export function TokensOverrideSlider() {
  return <TokenScopeCards render={() => <Slider defaultValue={60} />} />
}
