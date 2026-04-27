import { Tabs } from '@skygraph/react'

const items = [
  { key: '1', label: 'Overview', children: <p>First panel</p> },
  { key: '2', label: 'Members', children: <p>Second panel</p> },
  { key: '3', label: 'Settings', children: <p>Third panel</p> },
]

/** Three sizes — small, middle (default), large. */
export function SizesTabs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Tabs size="small" items={items} />
      <Tabs items={items} />
      <Tabs size="large" items={items} />
    </div>
  )
}
