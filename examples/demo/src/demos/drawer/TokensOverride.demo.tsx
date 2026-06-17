import { useState } from 'react'
import { Drawer, Button } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
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
