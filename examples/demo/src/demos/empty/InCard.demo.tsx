import { Empty, Button } from '@skygraph/react'

/**
 * Canonical usage inside a Table / List / Card — wrap Empty in a
 * bordered container so it visually owns the row region. The
 * action button lets users recover from the empty state.
 */
export function InCardEmpty() {
  return (
    <div
      style={{
        border: '1px solid var(--sg-color-border)',
        borderRadius: 'var(--sg-border-radius)',
        padding: 24,
        background: 'var(--sg-color-bg-container)',
      }}
    >
      <Empty description="No rows match your filters">
        <Button size="small">Reset filters</Button>
      </Empty>
    </div>
  )
}
