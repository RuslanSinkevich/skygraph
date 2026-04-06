import { useState } from 'react'
import { Skeleton } from '../../../../packages/react/src/components/ui/Skeleton'
import { Button } from '../../../../packages/react/src/components/ui/Button'

export function SkeletonDemo() {
  const [loading, setLoading] = useState(true)

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2>Skeleton</h2>

      <section>
        <h3>Basic</h3>
        <Skeleton loading title paragraph={{ rows: 2 }} />
      </section>

      <section>
        <h3>Active (shimmer)</h3>
        <Skeleton active title paragraph={{ rows: 3 }} />
      </section>

      <section>
        <h3>Avatar + text (circle)</h3>
        <Skeleton
          avatar={{ size: 48, shape: 'circle' }}
          title={{ width: '40%' }}
          paragraph={{ rows: 2, width: ['100%', '80%'] }}
        />
      </section>

      <section>
        <h3>Avatar square</h3>
        <Skeleton
          avatar={{ size: 56, shape: 'square' }}
          title={{ width: '55%' }}
          paragraph={{ rows: 1 }}
        />
      </section>

      <section>
        <h3>Paragraph rows only</h3>
        <Skeleton title={false} paragraph={{ rows: 5, width: ['100%', '100%', '60%', '100%', '40%'] }} />
      </section>

      <section>
        <h3>Loading toggle (reveals children)</h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <Button size="small" onClick={() => setLoading((v) => !v)}>
            {loading ? 'Show content' : 'Show skeleton'}
          </Button>
        </div>
        <Skeleton loading={loading} active avatar paragraph={{ rows: 3 }}>
          <div style={{ padding: 8, border: '1px solid var(--sg-color-border-secondary)', borderRadius: 8 }}>
            <strong>Loaded content</strong>
            <p style={{ margin: '8px 0 0' }}>This block appears when loading is false.</p>
          </div>
        </Skeleton>
      </section>

      <section>
        <h3>Title only</h3>
        <Skeleton paragraph={false} title={{ width: '72%' }} />
      </section>

      <section>
        <h3>Static (no active pulse)</h3>
        <Skeleton active={false} avatar paragraph={{ rows: 4 }} />
      </section>

      <section>
        <h3>Narrow container</h3>
        <div style={{ maxWidth: 220 }}>
          <Skeleton title paragraph={{ rows: 2 }} />
        </div>
      </section>

      <section>
        <h3>Card placeholder composition</h3>
        <div
          style={{
            border: '1px solid var(--sg-color-border-secondary)',
            borderRadius: 8,
            padding: 16,
            maxWidth: 360,
          }}
        >
          <Skeleton active avatar={{ size: 36, shape: 'circle' }} title={{ width: '50%' }} paragraph={{ rows: 3 }} />
        </div>
      </section>

      <section>
        <h3>Paragraph width array</h3>
        <Skeleton
          title={false}
          paragraph={{
            rows: 4,
            width: ['100%', '92%', '100%', '40%'],
          }}
        />
      </section>
    </section>
  )
}
