import { Upload, Button } from '@skygraph/react'

/**
 * Any child becomes the click target — use it for branded buttons, icon
 * tiles, or drop-zone looking wrappers. The hidden `<input>` is opened via
 * the wrapping `div`, so keep children interactive (buttons, links).
 */
export function CustomTriggerUpload() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Upload>
        <Button type="dashed">Pick files…</Button>
      </Upload>

      <Upload>
        <div
          style={{
            width: 160,
            height: 120,
            border: '1px dashed var(--sg-color-border)',
            borderRadius: 8,
            display: 'grid',
            placeItems: 'center',
            color: 'var(--sg-color-text-secondary)',
            cursor: 'pointer',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24 }}>+</div>
            <div style={{ fontSize: 12 }}>Click to upload</div>
          </div>
        </div>
      </Upload>
    </div>
  )
}
