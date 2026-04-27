import { Carousel } from '@skygraph/react'
import { slideBase, paletteColors } from './data'

/**
 * `dots={false}` hides the indicator strip — use it when the
 * carousel is decorative (background hero) and users don't
 * need explicit navigation.
 */
export function HiddenDotsCarousel() {
  return (
    <Carousel dots={false} autoplay>
      {paletteColors.map((bg, i) => (
        <div key={i} style={{ ...slideBase, background: bg }}>Clean {i + 1}</div>
      ))}
    </Carousel>
  )
}
