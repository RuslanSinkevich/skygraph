import { Spin } from '@skygraph/react'

/**
 * `tip` adds a small caption below the spinner. It inherits
 * `--sg-color-primary` by default so it reads as a "working on it"
 * status message.
 */
export function TipSpin() {
  return (
    <Spin tip="Loading dashboard data..." spinning>
      <div
        style={{
          padding: 24,
          border: '1px solid var(--sg-color-border)',
          borderRadius: 8,
          background: 'var(--sg-color-bg-container)',
        }}
      >
        <p>Dashboard content will appear here.</p>
      </div>
    </Spin>
  )
}
