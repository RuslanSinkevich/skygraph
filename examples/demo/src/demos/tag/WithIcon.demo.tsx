import { Tag } from '@skygraph/react'

/**
 * Tag's `children` is a `ReactNode` — drop an icon + text combo for
 * a status pill. The gap between inline children is already 4px.
 */
export function WithIconTag() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag color="success">
        <span aria-hidden="true">✓</span> Verified
      </Tag>
      <Tag color="processing">
        <span aria-hidden="true">⟳</span> Syncing…
      </Tag>
      <Tag color="warning">
        <span aria-hidden="true">⚠</span> Review
      </Tag>
      <Tag color="error">
        <span aria-hidden="true">✕</span> Failed
      </Tag>
    </div>
  )
}
