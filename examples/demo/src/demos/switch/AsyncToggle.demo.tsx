import { useState } from 'react'
import { Switch } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    labelPrefix: 'Notifications:',
    on: 'on',
    off: 'off',
  },
  ru: {
    labelPrefix: 'Уведомления:',
    on: 'вкл',
    off: 'выкл',
  },
} as const

/**
 * Real-world pattern: flip optimistically, show a spinner while the
 * request is in flight, and roll back if the backend rejects the
 * update.
 */
export function AsyncToggleSwitch() {
  const t = useDemoStrings(STRINGS)
  const [enabled, setEnabled] = useState(false)
  const [pending, setPending] = useState(false)

  const onChange = async (next: boolean) => {
    setPending(true)
    setEnabled(next)
    try {
      await new Promise((r) => setTimeout(r, 700))
      if (Math.random() < 0.25) throw new Error('rate limited')
    } catch {
      setEnabled(!next)
    } finally {
      setPending(false)
    }
  }

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Switch checked={enabled} onChange={onChange} loading={pending} />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {t.labelPrefix} {enabled ? t.on : t.off}
      </span>
    </div>
  )
}
