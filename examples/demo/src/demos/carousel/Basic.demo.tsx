import { Carousel } from '@skygraph/react'
import { slideBase, paletteColors } from './data'

/**
 * Each direct child becomes a slide. Default transition is a
 * horizontal slide, dots sit at the bottom. No autoplay until
 * you ask for it.
 */
export function BasicCarousel() {
  return (
    <Carousel>
      {paletteColors.map((bg, i) => (
        <div key={i} style={{ ...slideBase, background: bg }}>
          Slide {i + 1}
        </div>
      ))}
    </Carousel>
  )
}
