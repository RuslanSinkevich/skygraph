import { Carousel } from '@skygraph/react'
import { slideBase, paletteColors } from './data'

/**
 * `effect="fade"` crossfades slides via opacity instead of
 * translating the track. Better for hero blocks where
 * horizontal motion would feel jarring.
 */
export function FadeCarousel() {
  return (
    <Carousel effect="fade" autoplay>
      {paletteColors.map((bg, i) => (
        <div key={i} style={{ ...slideBase, background: bg }}>
          Fade {i + 1}
        </div>
      ))}
    </Carousel>
  )
}
