import { Slider } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-primary': '#60a5fa',
  '--sg-color-border': '#475569',
} as CSSProperties

export function TokensOverrideSlider() {
  return (
    <div style={dark}>
      <Slider defaultValue={60} />
    </div>
  )
}
