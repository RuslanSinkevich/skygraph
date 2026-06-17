import { notification, Button } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-primary': '#60a5fa',
} as CSSProperties

const darkToast = {
  '--sg-color-bg-elevated': '#1f2937',
  '--sg-color-border-secondary': '#475569',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-success': '#34d399',
  '--sg-color-success-bg': 'rgba(52, 211, 153, 0.18)',
  '--sg-shadow-lg': '0 18px 38px -16px rgba(0, 0, 0, 0.55)',
} as CSSProperties

export function TokensOverrideNotification() {
  return (
    <div style={dark}>
      <Button
        type="primary"
        onClick={() =>
          notification.open({
            type: 'success',
            message: 'Backup complete',
            description: 'Tint follows --sg-color-success.',
            style: darkToast,
          })
        }
      >
        Open styled toast
      </Button>
    </div>
  )
}
