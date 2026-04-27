import { useState } from 'react'
import { Collapse, Button } from '@skygraph/react'
import { sampleItems } from './data'

/**
 * Controlled mode — pass `activeKey` + `onChange` to own the open
 * set. Great for URL-persisted state or "expand all / collapse all"
 * toolbars like this one.
 */
export function ControlledCollapse() {
  const [active, setActive] = useState<string[]>(['1'])
  const allKeys = sampleItems.map((item) => item.key)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button size="small" onClick={() => setActive(allKeys)}>Expand all</Button>
        <Button size="small" onClick={() => setActive([])}>Collapse all</Button>
      </div>
      <Collapse items={sampleItems} activeKey={active} onChange={setActive} />
    </div>
  )
}
