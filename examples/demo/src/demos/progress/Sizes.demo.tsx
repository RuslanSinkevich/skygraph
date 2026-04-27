import { Progress } from '@skygraph/react'

/**
 * `size="small"` thins the line bar (6px default vs 8px). Override
 * `strokeWidth` for any bespoke thickness independent of size.
 */
export function SizesProgress() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <Progress size="small" percent={40} />
      <Progress percent={40} />
      <Progress percent={40} strokeWidth={14} />
    </div>
  )
}
