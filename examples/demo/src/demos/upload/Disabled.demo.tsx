import { Upload } from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'

const files: UploadFile[] = [
  { uid: 'x', name: 'locked.pdf', size: 90_000, status: 'done' },
  { uid: 'y', name: 'pending.dat', size: 1_500_000, status: 'uploading' },
]

/**
 * `disabled` blocks the trigger; `loading` swaps the button for a spinner
 * — useful while the server side of the upload is still processing.
 */
export function DisabledUpload() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Upload disabled fileList={files} />
      <Upload loading />
    </div>
  )
}
