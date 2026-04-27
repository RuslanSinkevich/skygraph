import { useState } from 'react'
import { Drawer, Button } from '@skygraph/react'

/**
 * Simplest Drawer. The component is always mounted — toggle `open`
 * to slide in. ESC and clicking the mask call `onClose`; the focus
 * is trapped inside the panel while it's visible.
 */
export function BasicDrawer() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Basic Drawer">
        <p>Some supplementary content lives here.</p>
        <p>Close with ESC, the × button, or by clicking the mask.</p>
      </Drawer>
    </>
  )
}
