import { Carousel } from '@skygraph/react'
import { slideBase, paletteColors } from './data'

/**
 * `autoplay` advances every `autoplaySpeed` ms (default 3000).
 * The timer pauses while the tab is inactive — it's a plain
 * `setInterval`, so don't rely on it for exact cadence.
 */
export function AutoplayCarousel() {
  return (
    <Carousel autoplay autoplaySpeed={2500}>
      {paletteColors.map((bg, i) => (
        <div key={i} style={{ ...slideBase, background: bg }}>
          Auto {i + 1}
        </div>
      ))}
    </Carousel>
  )
}
