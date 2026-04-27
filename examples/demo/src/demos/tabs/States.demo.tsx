import { Tabs } from '@skygraph/react'

/**
 * Per-item flags:
 * - `loading`   shows a spinner in the tab label and blocks activation
 * - `disabled`  greys out and blocks activation
 */
export function StatesTabs() {
  return (
    <div style={{ width: '100%' }}>
      <Tabs
        items={[
          { key: 'ready', label: 'Ready', children: <p>This tab works.</p> },
          {
            key: 'syncing',
            label: 'Syncing…',
            loading: true,
            children: <p>Loading content…</p>,
          },
          {
            key: 'deprecated',
            label: 'Deprecated',
            disabled: true,
            children: <p>Not selectable.</p>,
          },
        ]}
      />
    </div>
  )
}
