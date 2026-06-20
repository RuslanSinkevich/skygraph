import { Popconfirm, Button } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text-secondary': '#cbd5e1',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-elevated': '#1e293b',
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
