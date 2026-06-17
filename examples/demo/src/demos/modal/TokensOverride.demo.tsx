import { useState } from 'react'
import { Button, Modal } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-hover': '#93c5fd',
} as CSSProperties

export function TokensOverrideModal() {
  const [open, setOpen] = useState(false)
  return (
    <div style={dark}>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Scoped tokens"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        <p>Primary palette is scoped here.</p>
      </Modal>
    </div>
  )
}
