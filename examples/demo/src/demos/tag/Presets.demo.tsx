import { Tag } from '@skygraph/react'

/**
 * Five semantic presets map directly to palette tokens:
 * `success`, `error`, `warning`, `processing`, and `default`. These
 * are the *only* strings that resolve to tokens — anything else is
 * treated as a raw CSS colour (see Custom demo).
 */
export function PresetsTag() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag color="default">default</Tag>
      <Tag color="success">success</Tag>
      <Tag color="processing">processing</Tag>
      <Tag color="warning">warning</Tag>
      <Tag color="error">error</Tag>
    </div>
  )
}
