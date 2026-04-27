import { useState } from 'react'
import { Drawer, Button } from '@skygraph/react'

/**
 * `footer` renders a sticky region under the scrolling body — the
 * body has `flex: 1`, so long forms scroll while the actions stay
 * pinned.
 */
export function FooterDrawer() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit record</Button>
      <Drawer
        open={open}
        onClose={close}
        title="Edit record"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={close}>Cancel</Button>
            <Button type="primary" onClick={close}>Save</Button>
          </div>
        }
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <p key={i}>Form row {i + 1} — scroll the body while the footer stays pinned.</p>
        ))}
      </Drawer>
    </>
  )
}
