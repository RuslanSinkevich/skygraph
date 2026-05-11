import { Empty } from '@skygraph/react'

/**
 * Swap the caption to match the context. Strings, ReactNodes, or
 * a mix are fine. Keep the message action-oriented when you can —
 * "No results for 'foo'" reads better than just "Empty".
 */
export function DescriptionEmpty() {
  return (
    <div
      style={{
        display: 'grid',
        gap: 24,
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        width: '100%',
      }}
    >
      <Empty description="No results found" />
      <Empty
        description={
          <span>
            No invoices matching <code>status=paid</code>
          </span>
        }
      />
    </div>
  )
}
