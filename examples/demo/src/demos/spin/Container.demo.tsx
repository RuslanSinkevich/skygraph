import { useState } from 'react'
import { Spin, Button } from '@skygraph/react'

/**
 * Wrap children with Spin and toggle `spinning` to mask them. The
 * wrapped content gets a dimmed overlay + `pointer-events: none`
 * while the spinner is visible.
 */
export function ContainerSpin() {
  const [loading, setLoading] = useState(true)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button onClick={() => setLoading((v) => !v)}>
        {loading ? 'Stop loading' : 'Start loading'}
      </Button>
      <Spin spinning={loading}>
        <div
          style={{
            padding: 24,
            border: '1px solid var(--sg-color-border)',
            borderRadius: 8,
            background: 'var(--sg-color-bg-container)',
          }}
        >
          <p style={{ marginTop: 0 }}>Some content that is being loaded.</p>
          <p style={{ marginBottom: 0 }}>It is blurred while the overlay is on.</p>
        </div>
      </Spin>
    </div>
  )
}
