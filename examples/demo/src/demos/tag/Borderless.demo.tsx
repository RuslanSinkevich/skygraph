import { Tag } from '@skygraph/react'

/**
 * `bordered={false}` removes the outline while keeping the tinted
 * background — handy for dense lists where borders feel noisy.
 */
export function BorderlessTag() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag bordered={false}>default</Tag>
      <Tag bordered={false} color="success">success</Tag>
      <Tag bordered={false} color="processing">processing</Tag>
      <Tag bordered={false} color="error">error</Tag>
    </div>
  )
}
