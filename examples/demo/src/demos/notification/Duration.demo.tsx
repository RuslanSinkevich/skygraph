import { notification, Button } from '@skygraph/react'

export function DurationNotification() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button
        onClick={() =>
          notification.open({
            message: 'Quick toast',
            description: 'Closes after 1.5s.',
            duration: 1500,
          })
        }
      >
        Short (1.5s)
      </Button>
      <Button
        onClick={() =>
          notification.open({
            message: 'Persistent',
            description: 'This notification will not close automatically. Use the × button.',
            duration: 0,
          })
        }
      >
        No auto-close (duration: 0)
      </Button>
    </div>
  )
}
