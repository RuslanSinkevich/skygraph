import { useState } from 'react'
import { Button, Modal, Spin } from '@skygraph/react'

export function ModalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <section>
      <h2>Modal</h2>
      <Button type="primary" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="SkyGraph Modal"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" loading onClick={() => setOpen(false)}>Saving...</Button>
          </>
        }
      >
        <p>Modal content. Press Esc or click outside to close.</p>
        <p>Loading on the button, not on the modal.</p>
      </Modal>
    </section>
  )
}
