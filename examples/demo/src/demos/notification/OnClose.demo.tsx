import { useState } from 'react'
import { notification, Button } from '@skygraph/react'

export function OnCloseNotification() {
  const [log, setLog] = useState<string[]>([])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button
        onClick={() =>
          notification.open({
            message: 'Close me',
            description: 'The parent receives a callback when this toast disappears.',
            duration: 2500,
            onClose: () => {
              setLog((prev) => [
                `closed at ${new Date().toLocaleTimeString()}`,
                ...prev,
              ].slice(0, 5))
            },
          })
        }
      >
        Fire + watch close
      </Button>
      <pre
        style={{
          margin: 0,
          padding: 12,
          background: 'var(--sg-color-bg-secondary)',
          borderRadius: 'var(--sg-border-radius)',
          fontSize: 12,
          minHeight: 60,
        }}
      >
        {log.length === 0 ? '// waiting for onClose…' : log.join('\n')}
      </pre>
    </div>
  )
}
