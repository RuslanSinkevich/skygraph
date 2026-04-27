import { Descriptions } from '@skygraph/react'
import { userItems } from './data'

/**
 * Two visual sizes — `small` (compact padding, `--sg-font-size-
 * sm`) and default. `middle` / `large` share the default
 * preset.
 */
export function SizesDescriptions() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Descriptions size="small" bordered title="Small" items={userItems} />
      <Descriptions size="middle" bordered title="Middle" items={userItems} />
    </div>
  )
}
