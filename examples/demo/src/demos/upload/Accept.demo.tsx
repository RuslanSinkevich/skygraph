import { Upload } from '@skygraph/react'

/**
 * Passed straight to the native `<input accept>`. Mixing MIME and extension
 * groups ("image/*, .pdf") is the most reliable across browsers.
 */
export function AcceptUpload() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Upload accept="image/*" />
      <Upload accept=".pdf,.doc,.docx" />
      <Upload accept="video/mp4" />
    </div>
  )
}
