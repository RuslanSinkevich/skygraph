import type { CSSProperties } from 'react'
import { notification, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards, type TokenScopeKey } from '../_shared/TokenScopeCards'

/**
 * Notification cards render in a global container, so the demo passes the
 * scoped recipe as per-toast CSS variables. Click each card's button to see
 * the real popup styled with that recipe.
 */
const STRINGS = {
  en: {
    title: 'Backup complete',
    desc: 'Tint follows --sg-color-success.',
    fire: 'Open styled toast',
  },
  ru: {
    title: 'Бэкап завершён',
    desc: 'Оттенок следует за --sg-color-success.',
    fire: 'Открыть styled toast',
  },
} as const

const TOAST_SCOPE: Record<TokenScopeKey, CSSProperties> = {
  brand: {
    ['--sg-color-success' as never]: '#059669',
    ['--sg-color-success-bg' as never]: '#d1fae5',
  },
  dark: {
    ['--sg-color-bg-elevated' as never]: '#1f2937',
    ['--sg-color-border-secondary' as never]: '#475569',
    ['--sg-color-text' as never]: '#f8fafc',
    ['--sg-color-text-secondary' as never]: '#cbd5e1',
    ['--sg-color-text-tertiary' as never]: '#94a3b8',
    ['--sg-color-success' as never]: '#34d399',
    ['--sg-color-success-bg' as never]: 'rgba(52, 211, 153, 0.18)',
    ['--sg-shadow-lg' as never]: '0 18px 38px -16px rgba(0, 0, 0, 0.55)',
  },
  glass: {
    ['--sg-color-bg-elevated' as never]: 'rgba(255, 255, 255, 0.9)',
    ['--sg-color-border-secondary' as never]: 'rgba(79, 70, 229, 0.18)',
    ['--sg-color-success' as never]: '#6366f1',
    ['--sg-color-success-bg' as never]: 'rgba(99, 102, 241, 0.16)',
    ['--sg-shadow-lg' as never]: '0 18px 38px -16px rgba(15, 23, 42, 0.4)',
  },
}

export function TokensOverrideNotification() {
  const t = useDemoStrings(STRINGS)

  return (
    <TokenScopeCards
      extra={TOAST_SCOPE}
      render={(scope) => (
        <Button
          type="primary"
          onClick={() =>
            notification.open({
              type: 'success',
              message: t.title,
              description: t.desc,
              style: TOAST_SCOPE[scope],
            })
          }
        >
          {t.fire}
        </Button>
      )}
    />
  )
}
