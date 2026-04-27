import { notification, Button } from '@skygraph/react'

export function DestroyAllNotification() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button
        onClick={() => {
          notification.info('Batch 1', 'First toast')
          notification.success('Batch 2', 'Second toast')
          notification.warning('Batch 3', 'Third toast')
        }}
      >
        Fire 3 toasts
      </Button>
      <Button onClick={() => notification.destroy()}>
        Destroy all
      </Button>
    </div>
  )
}
