import { Tabs } from '@skygraph/react'

/**
 * Three panels, no controlled state — Tabs remembers the active key on
 * its own and activates the first tab by default. Default `type` is
 * `card` (bordered classic tabs); use `type="line"` for the underline-only strip.
 */
export function BasicTabs() {
  return (
    <div style={{ width: '100%' }}>
      <Tabs
        items={[
          { key: 'overview', label: 'Overview', children: <p>High-level summary of the resource.</p> },
          { key: 'activity', label: 'Activity', children: <p>Recent events and audit log.</p> },
          { key: 'settings', label: 'Settings', children: <p>Configuration options.</p> },
        ]}
      />
    </div>
  )
}
