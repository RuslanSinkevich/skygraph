import { useState } from 'react'
import { Button, Modal } from '@skygraph/react'

/**
 * Pass `footer={null}` (or leave `onOk` unset) to drop the footer area entirely —
 * useful for purely informational modals (previews, images, detail panes).
 */
export function NoFooterModal() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Show details</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Release 1.4.0"
        footer={null}
      >
        <ul style={{ margin: '4px 0 0 18px', lineHeight: 1.7 }}>
          <li>Table now exposes <code>--sg-table-cell-solid-bg</code></li>
          <li>DatePicker accepts <code>DatePreset[]</code> for sidebar shortcuts</li>
          <li>FormList gains a <code>move()</code> action</li>
        </ul>
      </Modal>
    </>
  )
}
