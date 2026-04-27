import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Drawer, Button } from '@skygraph/react'

/**
 * Drawer has no component-specific tokens — it composes `--sg-color-
 * bg-elevated` for the panel, `--sg-color-overlay` for the mask, and
 * `--sg-shadow-lg` for the lift. Override those on a wrapper to
 * rebrand every drawer inside it.
 */
const scoped: CSSProperties = {
  ['--sg-color-bg-elevated' as never]: '#0f172a',
  ['--sg-color-border-secondary' as never]: 'rgba(148, 163, 184, 0.15)',
  ['--sg-color-text' as never]: '#e2e8f0',
  ['--sg-color-text-tertiary' as never]: '#94a3b8',
  ['--sg-color-overlay' as never]: 'rgba(2, 6, 23, 0.7)',
  ['--sg-shadow-lg' as never]: '0 18px 40px rgba(2, 6, 23, 0.5)',
}

export function TokensOverrideDrawer() {
  const [open, setOpen] = useState(false)
  return (
    <div style={scoped}>
      <Button onClick={() => setOpen(true)}>Open dark drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Dark theme">
        <p style={{ color: 'inherit' }}>
          Panel, mask, and shadow all follow the scoped tokens — drop this
          wrapper higher in the tree for a theme-wide dark drawer.
        </p>
      </Drawer>
    </div>
  )
}
