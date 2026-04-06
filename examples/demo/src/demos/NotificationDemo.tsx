import { Button, notification, NotificationContainer } from '@skygraph/react'

export function NotificationDemo() {
  return (
    <section>
      <h2>Notification</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        Toast notifications with different types and auto-dismiss.
      </p>
      <NotificationContainer />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button onClick={() => notification.success('Operation completed', 'Your changes have been saved.')}>
          Success
        </Button>
        <Button onClick={() => notification.error('Something went wrong', 'Please try again later.')}>
          Error
        </Button>
        <Button onClick={() => notification.warning('Attention', 'This action cannot be undone.')}>
          Warning
        </Button>
        <Button onClick={() => notification.info('New update', 'Version 2.0 is now available.')}>
          Info
        </Button>
        <Button onClick={() => notification.open({ message: 'Custom', description: 'With 10s duration', duration: 10000 })}>
          Custom (10s)
        </Button>
      </div>
    </section>
  )
}
