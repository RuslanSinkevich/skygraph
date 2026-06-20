import { Carousel } from '@skygraph/react'
import { slideBase, paletteColors } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-text-tertiary': '#94a3b8',
  padding: 24,
  borderRadius: 12,
  '--sg-color-primary': '#60a5fa',
  '--sg-color-text-disabled': '#64748b',
} as CSSProperties

export function TokensOverrideCarousel() {
  return (
    <div style={dark}>
      <Carousel>
        {paletteColors.map((bg, i) => (
          <div key={i} style={{ ...slideBase, background: bg }}>
            {i + 1}
          </div>
        ))}
      </Carousel>
    </div>
  )
}
