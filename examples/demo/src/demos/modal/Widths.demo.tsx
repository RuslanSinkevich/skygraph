import { useState } from 'react'
import { Button, Modal } from '@skygraph/react'

/**
 * `width` accepts a number (pixels) or any CSS length. Use `'90vw'` to
 * build a responsive fullscreen-ish dialog.
 */
export function WidthsModal() {
  const [narrow, setNarrow] = useState(false)
  const [wide, setWide] = useState(false)
  const [full, setFull] = useState(false)

  return (
    <>
      <Button onClick={() => setNarrow(true)}>360 px</Button>
      <Button onClick={() => setWide(true)}>720 px</Button>
      <Button onClick={() => setFull(true)}>90 vw</Button>

      <Modal open={narrow} onClose={() => setNarrow(false)} title="Narrow" width={360}>
        <p>Small dialog for short confirmations.</p>
      </Modal>
      <Modal open={wide} onClose={() => setWide(false)} title="Wide" width={720}>
        <p>Use wider modals for dense forms, tables, or side-by-side layouts.</p>
      </Modal>
      <Modal open={full} onClose={() => setFull(false)} title="Responsive" width="90vw">
        <p>CSS lengths work too — <code>90vw</code>, <code>min(720px, 90vw)</code>, etc.</p>
      </Modal>
    </>
  )
}
