import { Carousel } from '@skygraph/react'
import { slideBase, paletteColors } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * The active dot reads `--sg-color-primary`, idle dots read
 * `--sg-color-text-disabled`. Three scoped recipes — branded green, dark
 * field, glass pick — rebrand the indicators.
 */
export function TokensOverrideCarousel() {
  return (
    <TokenScopeCards
      render={() => (
        <Carousel>
          {paletteColors.map((bg, i) => (
            <div key={i} style={{ ...slideBase, background: bg }}>
              {i + 1}
            </div>
          ))}
        </Carousel>
      )}
    />
  )
}
