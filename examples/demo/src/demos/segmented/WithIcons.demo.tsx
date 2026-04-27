import { Segmented } from '@skygraph/react'

/**
 * Pass objects with `icon` + `label` to mix graphics with text.
 * Leaving `label` out renders icon-only segments — handy for
 * view-switchers (grid / list) when space is tight.
 */
export function WithIconsSegmented() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Segmented
        defaultValue="List"
        options={[
          { label: 'List', value: 'List', icon: <span aria-hidden>☰</span> },
          { label: 'Kanban', value: 'Kanban', icon: <span aria-hidden>▤</span> },
          { label: 'Calendar', value: 'Calendar', icon: <span aria-hidden>🗓</span> },
        ]}
      />
      <Segmented
        defaultValue="grid"
        options={[
          { label: <span aria-label="Grid" role="img">▦</span>, value: 'grid' },
          { label: <span aria-label="List" role="img">☰</span>, value: 'list' },
          { label: <span aria-label="Card" role="img">▢</span>, value: 'card' },
        ]}
      />
    </div>
  )
}
