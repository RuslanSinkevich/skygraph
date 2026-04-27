import { useState } from 'react'
import { Button, Modal } from '@skygraph/react'

/** Minimal dialog — title, body, two footer buttons. */
export function BasicModal() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create project"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setOpen(false)}>
              Create
            </Button>
          </>
        }
      >
        <p>
          Press <kbd>Esc</kbd>, click the mask, or use the close button to
          dismiss.
        </p>
      </Modal>
    </>
  )
}
