import { notification, Button } from '@skygraph/react'

export function BasicNotification() {
  return (
    <Button
      onClick={() => {
        console.log('[Notification] open')
        notification.open({
          message: 'Notification Title',
          description: 'This is the content of the notification.',
        })
      }}
    >
      Open notification
    </Button>
  )
}
