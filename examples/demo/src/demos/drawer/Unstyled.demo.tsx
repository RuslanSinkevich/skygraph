import { useState } from 'react'
import { Drawer, Button } from '@skygraph/react'

/**
 * `unstyled` drops the slide animation, mask, and every sg-drawer-*
 * class — you keep the focus trap, ESC handler, and ARIA dialog
 * wiring. Useful when you need to render into a custom portal.
 */
export function UnstyledDrawer() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open unstyled</Button>
      <Drawer
        unstyled
        open={open}
        onClose={() => setOpen(false)}
        title="Unstyled"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 320,
          padding: 24,
          background: '#fff',
          boxShadow: '-8px 0 24px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <p>Behaviour + a11y stay, painting is yours.</p>
      </Drawer>
    </>
  )
}
