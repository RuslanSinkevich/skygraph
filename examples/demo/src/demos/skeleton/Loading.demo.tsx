import { useState } from 'react'
import { Skeleton, Button } from '@skygraph/react'

/**
 * `loading={false}` swaps the placeholder for `children` without
 * remounting its parent — perfect for cards that fetch their own
 * data. Toggle the button to flip between states.
 */
export function LoadingSkeleton() {
  const [loading, setLoading] = useState(true)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <Button onClick={() => setLoading((v) => !v)}>
          {loading ? 'Load content' : 'Show skeleton'}
        </Button>
      </div>
      <div
        style={{
          padding: 16,
          border: '1px solid var(--sg-color-border)',
          borderRadius: 'var(--sg-border-radius)',
          background: 'var(--sg-color-bg-container)',
        }}
      >
        <Skeleton loading={loading} avatar active>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--sg-color-primary)',
              }}
            />
            <div>
              <h4 style={{ margin: 0 }}>John Doe</h4>
              <p style={{ margin: 0, color: 'var(--sg-color-text-secondary)' }}>
                Software Engineer at Acme Corp
              </p>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  )
}
