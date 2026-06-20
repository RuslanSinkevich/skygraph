import { useState } from 'react'
import { Drawer, Button } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-tertiary': '#94a3b8',
  padding: 24,
  borderRadius: 12,
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-hover': '#93c5fd',
} as CSSProperties

export function TokensOverrideDrawer() {
  const [open, setOpen] = useState(false)
  return (
    <div style={dark}>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Scoped drawer">
        <p>Panel, mask and shadow follow the scoped tokens.</p>
      </Drawer>
    </div>
  )
}
