import { Collapse } from '@skygraph/react'
import { sampleItems } from './data'

/**
 * Three sizes change header padding, min-height, and (for `large`)
 * header font size. Pair with ConfigProvider to broadcast the same
 * size to siblings.
 */
export function SizesCollapse() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Collapse size="small" items={sampleItems} defaultActiveKey={['1']} />
      <Collapse items={sampleItems} defaultActiveKey={['1']} />
      <Collapse size="large" items={sampleItems} defaultActiveKey={['1']} />
    </div>
  )
}
