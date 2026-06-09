import { useState } from 'react'
import { Popconfirm, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    title: 'Are you sure you want to delete this?',
    deleted: 'Deleted ✓',
    cancelled: 'Cancelled',
    button: 'Delete',
  },
  ru: {
    title: 'Точно удалить?',
    deleted: 'Удалено ✓',
    cancelled: 'Отменено',
    button: 'Удалить',
  },
} as const

/**
 * Click-triggered confirm bubble. `onConfirm` fires when the user
 * hits the primary button; `onCancel` fires on the secondary button
 * (outside-click just dismisses silently).
 */
export function BasicPopconfirm() {
  const t = useDemoStrings(STRINGS)
  const [status, setStatus] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Popconfirm
        title={t.title}
        onConfirm={() => {
          console.log('[Popconfirm] confirm')
          setStatus(t.deleted)
        }}
        onCancel={() => {
          console.log('[Popconfirm] cancel')
          setStatus(t.cancelled)
        }}
      >
        <Button
          type="primary"
          style={{
            background: 'var(--sg-color-error)',
            borderColor: 'var(--sg-color-error)',
          }}
        >
          {t.button}
        </Button>
      </Popconfirm>
      {status && (
        <span style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>{status}</span>
      )}
    </div>
  )
}
