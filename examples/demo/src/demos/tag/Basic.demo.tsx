import { Tag } from '@skygraph/react'

/**
 * Default Tag renders as a neutral pill using `--sg-color-bg-secondary`
 * for the background and `--sg-color-border` for the edge.
 */
export function BasicTag() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag>Tag 1</Tag>
      <Tag>Tag 2</Tag>
      <Tag>Neutral label</Tag>
    </div>
  )
}
