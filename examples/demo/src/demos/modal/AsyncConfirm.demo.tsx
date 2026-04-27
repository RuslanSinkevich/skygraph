import { useState } from 'react'
import { Button, Modal } from '@skygraph/react'

/**
 * Keep the modal open while an async task runs; close it on success.
 * While saving, show `loading` on the primary button AND disable Cancel
 * so the user can't leave the dialog in a half-state.
 */
export function AsyncConfirmModal() {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1400))
    setSaving(false)
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Save…</Button>
      <Modal
        open={open}
        onClose={() => !saving && setOpen(false)}
        title="Save changes"
        footer={
          <>
            <Button disabled={saving} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="primary" loading={saving} onClick={handleSave}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </>
        }
      >
        <p>Simulated save — takes ~1.4s. While saving, Cancel is disabled.</p>
      </Modal>
    </>
  )
}
