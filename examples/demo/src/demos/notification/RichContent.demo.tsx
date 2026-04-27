import { notification, Button } from '@skygraph/react'

export function RichContentNotification() {
  return (
    <Button
      onClick={() =>
        notification.open({
          type: 'info',
          duration: 0,
          message: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--sg-color-primary)',
                }}
              />
              New release available
            </span>
          ),
          description: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span>Version 2.4.0 — performance wins + a new token system.</span>
              <a
                href="#/components/notification"
                style={{ color: 'var(--sg-color-primary)', fontWeight: 500 }}
                onClick={(e) => e.preventDefault()}
              >
                View changelog →
              </a>
            </div>
          ),
        })
      }
    >
      Open rich toast
    </Button>
  )
}
