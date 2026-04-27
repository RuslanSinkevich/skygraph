import { useState } from 'react'
import { Drawer, Button } from '@skygraph/react'

/**
 * Turn off the mask for "lightweight" side panels that don't take
 * focus away from the rest of the page — e.g. a persistent filter
 * palette. `maskClosable={false}` keeps the mask but forces the user
 * to use the close button.
 */
export function NoMaskDrawer() {
  const [mode, setMode] = useState<null | 'no-mask' | 'sticky'>(null)

  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button onClick={() => setMode('no-mask')}>Open without mask</Button>
        <Button onClick={() => setMode('sticky')}>Mask, but not closable</Button>
      </div>
      <Drawer
        open={mode === 'no-mask'}
        onClose={() => setMode(null)}
        title="No mask"
        mask={false}
        width={320}
      >
        <p>The background stays interactive.</p>
      </Drawer>
      <Drawer
        open={mode === 'sticky'}
        onClose={() => setMode(null)}
        title="Mask but not closable"
        maskClosable={false}
        width={320}
      >
        <p>Mask is dim, clicks on it do nothing — use the × or ESC.</p>
      </Drawer>
    </>
  )
}
