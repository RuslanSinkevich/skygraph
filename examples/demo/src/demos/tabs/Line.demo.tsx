import { Tabs } from '@skygraph/react'

/**
 * Underline-only tab strip — the previous default look. Use `type="line"`
 * when you want a flatter chrome (e.g. dense toolbars or nested navigation).
 */
export function LineTabs() {
  return (
    <div style={{ width: '100%' }}>
      <Tabs
        type="line"
        items={[
          { key: 'overview', label: 'Overview', children: <p>High-level summary of the resource.</p> },
          { key: 'activity', label: 'Activity', children: <p>Recent events and audit log.</p> },
          { key: 'settings', label: 'Settings', children: <p>Configuration options.</p> },
        ]}
      />
    </div>
  )
}
