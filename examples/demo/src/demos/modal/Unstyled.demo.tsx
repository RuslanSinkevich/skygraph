import { useState } from 'react'
import { Button, Modal } from '@skygraph/react'

/**
 * `unstyled` strips SkyGraph's styles but keeps all semantics:
 * `role="dialog"`, focus trap, `Escape` handling. Bring your own visuals.
 */
export function UnstyledModal() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open headless dialog</Button>
      <Modal
        unstyled
        open={open}
        onClose={() => setOpen(false)}
        title="Headless"
        className="demo-unstyled-dialog"
      >
        <div style={{ padding: 16 }}>
          <p style={{ marginTop: 0 }}>
            No SkyGraph styles. Backdrop, centering, radii, colors are all
            yours via <code>className</code>.
          </p>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Modal>
    </>
  )
}
