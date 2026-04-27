import { Carousel } from '@skygraph/react'
import { slideBase, paletteColors } from './data'

/**
 * Dots can dock on any edge. Left / right switch the carousel
 * to a vertical layout and rotate the dot shape to match.
 */
export function DotPositionCarousel() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <Carousel dotPosition="top">
        {paletteColors.map((bg, i) => (
          <div key={i} style={{ ...slideBase, background: bg }}>Top {i + 1}</div>
        ))}
      </Carousel>
      <Carousel dotPosition="right">
        {paletteColors.map((bg, i) => (
          <div key={i} style={{ ...slideBase, background: bg }}>Right {i + 1}</div>
        ))}
      </Carousel>
    </div>
  )
}
