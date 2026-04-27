import { Skeleton } from '@skygraph/react'

/**
 * Compose multiple Skeletons to mirror the final card / list
 * layout. The closer the shape, the less the layout will jump
 * when the real content arrives.
 */
export function CardSkeleton() {
  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            padding: 16,
            border: '1px solid var(--sg-color-border)',
            borderRadius: 'var(--sg-border-radius)',
            background: 'var(--sg-color-bg-container)',
          }}
        >
          <Skeleton active avatar title paragraph={{ rows: 3 }} />
        </div>
      ))}
    </div>
  )
}
