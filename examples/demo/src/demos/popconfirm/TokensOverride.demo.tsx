import { Popconfirm, Button } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-elevated': '#1f2937',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-hover': '#93c5fd',
} as CSSProperties

export function TokensOverridePopconfirm() {
  return (
    <div style={dark}>
      <Popconfirm title="Reset preferences?" okText="Reset">
        <Button>Reset</Button>
      </Popconfirm>
    </div>
  )
}
