import { notification, Button } from '@skygraph/react'

const placements = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const

export function PlacementNotification() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {placements.map((p) => (
        <Button
          key={p}
          onClick={() =>
            notification.open({
              message: p,
              description: `Notification pinned at ${p}.`,
              placement: p,
            })
          }
        >
          {p}
        </Button>
      ))}
    </div>
  )
}
