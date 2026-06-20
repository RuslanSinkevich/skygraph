import { notification, Button } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-warning-bg': 'rgba(251, 191, 36, 0.16)',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  padding: 24,
  borderRadius: 12,
  '--sg-color-primary': '#60a5fa',
} as CSSProperties

const darkToast = {
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-success': '#34d399',
  '--sg-color-success-bg': 'rgba(52, 211, 153, 0.16)',
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
