import { useState } from 'react'
import { Spin, Button } from '@skygraph/react'

/**
 * `delay` in ms — wait that long before actually showing the
 * spinner. Great for fast requests that usually finish before
 * the spinner is worth showing, to avoid the flicker.
 */
export function DelaySpin() {
  const [loading, setLoading] = useState(false)

  const simulate = (ms: number) => {
    setLoading(true)
    setTimeout(() => setLoading(false), ms)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={() => simulate(200)}>Finish in 200ms (spinner skipped)</Button>
        <Button onClick={() => simulate(2500)}>Finish in 2500ms (spinner appears)</Button>
      </div>
      <Spin spinning={loading} delay={400}>
        <div
          style={{
            padding: 24,
            border: '1px solid var(--sg-color-border)',
            borderRadius: 8,
            background: 'var(--sg-color-bg-container)',
          }}
        >
          <p>The spinner only appears if loading lasts longer than 400ms.</p>
        </div>
      </Spin>
    </div>
  )
}
