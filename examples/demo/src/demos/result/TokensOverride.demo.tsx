import { Result, Button } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-success': '#34d399',
  '--sg-color-primary': '#60a5fa',
} as CSSProperties

export function TokensOverrideResult() {
  return (
    <div style={dark}>
      <Result
        status="success"
        title="All good"
        subTitle="Scoped via tokens"
        extra={<Button type="primary">Continue</Button>}
      />
    </div>
  )
}
