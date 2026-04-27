import { notification, NotificationContainer, Button } from '@skygraph/react'

export function UnstyledNotification() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
        Drop all <code>sg-notification-*</code> classes from cards and the container.
        Bring your own layout / animation. A dedicated headless container is mounted at
        <code> bottomLeft</code> below — fire a toast with that placement to see it.
      </p>
      <div
        style={{
          position: 'relative',
          padding: 12,
          borderRadius: 8,
          border: '1px dashed var(--sg-color-border)',
          minHeight: 120,
        }}
      >
        <NotificationContainer placement="bottomLeft" unstyled />
      </div>
      <div>
        <Button
          onClick={() =>
            notification.open({
              type: 'info',
              placement: 'bottomLeft',
              message: 'Headless toast',
              description: 'No sg-* classes on card or container.',
              duration: 3000,
            })
          }
        >
          Fire headless toast
        </Button>
      </div>
    </div>
  )
}
