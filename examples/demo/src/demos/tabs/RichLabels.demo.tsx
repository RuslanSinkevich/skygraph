import { Tabs, Badge } from '@skygraph/react'

/**
 * `label` is a ReactNode — you can embed icons, badges, status dots, or
 * custom layouts. Keep the label width consistent to avoid jitter when
 * a badge count changes.
 */
export function RichLabelsTabs() {
  return (
    <div style={{ width: '100%' }}>
      <Tabs
        items={[
          {
            key: 'inbox',
            label: (
              <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                Inbox <Badge count={12} />
              </span>
            ),
            children: <p>12 new messages</p>,
          },
          {
            key: 'flagged',
            label: (
              <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--sg-color-warning)',
                  }}
                />
                Flagged
              </span>
            ),
            children: <p>Items needing attention</p>,
          },
          { key: 'archive', label: 'Archive', children: <p>Archived conversations</p> },
        ]}
      />
    </div>
  )
}
