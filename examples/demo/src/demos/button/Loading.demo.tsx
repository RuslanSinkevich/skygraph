import { useState } from 'react'
import { Button } from '@skygraph/react'

/**
 * `loading` swaps in a Spin and sets `aria-busy`, `disabled` and
 * pointer-events so a second click is impossible while work is
 * in flight. The controlled variant below shows the typical
 * submit → done pattern.
 */
export function LoadingButton() {
  const [saving, setSaving] = useState(false)

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <Button loading>Default loading</Button>
      <Button type="primary" loading>Primary loading</Button>
      <Button type="dashed" loading>Dashed loading</Button>
      <Button
        type="primary"
        loading={saving}
        onClick={() => {
          setSaving(true)
          setTimeout(() => setSaving(false), 1500)
        }}
      >
        {saving ? 'Saving…' : 'Click me'}
      </Button>
    </div>
  )
}
