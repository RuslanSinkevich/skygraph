import type { CSSProperties } from 'react'
import { notification, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    intro:
      'Toasts read global tokens when they mount, so override them on :root (or a wrapper that also hosts <NotificationContainer/>). The preview below shows the same toast markup with a scoped token override applied.',
    previewLabel: 'Scoped preview',
    successTitle: 'Backup complete',
    successDesc: 'Success tint follows --sg-color-success.',
    errorTitle: 'Upload failed',
    errorDesc: 'Error tint follows --sg-color-error.',
    liveLabel: 'Live toasts (read :root)',
    fireSuccess: 'Fire success',
    fireError: 'Fire error',
    toastSuccessTitle: 'Cascade check',
    toastSuccessDesc: 'Success tint reflects the current theme.',
    toastErrorTitle: 'Cascade check',
    toastErrorDesc: 'Error tint reflects the current theme.',
  },
  ru: {
    intro:
      'Тосты читают глобальные токены в момент монтирования, поэтому переопределяйте их на :root (или на обёртке, где также находится <NotificationContainer/>). Ниже — та же разметка тоста со скоупным переопределением токенов.',
    previewLabel: 'Предпросмотр в скоупе',
    successTitle: 'Бэкап завершён',
    successDesc: 'Зелёный оттенок следует за --sg-color-success.',
    errorTitle: 'Ошибка загрузки',
    errorDesc: 'Красный оттенок следует за --sg-color-error.',
    liveLabel: 'Живые тосты (читают :root)',
    fireSuccess: 'Показать success',
    fireError: 'Показать error',
    toastSuccessTitle: 'Проверка каскада',
    toastSuccessDesc: 'Оттенок success отражает текущую тему.',
    toastErrorTitle: 'Проверка каскада',
    toastErrorDesc: 'Оттенок error отражает текущую тему.',
  },
} as const

/**
 * Notifications render in a portal at the document root, so a scoped wrapper
 * can't restyle a live toast. To still *show* the effect of an override, the
 * preview below renders the real `.sg-notification` markup inside a wrapper
 * that re-maps the relevant tokens — the live buttons fire actual toasts that
 * read the page-level `:root` cascade.
 */
const scope: CSSProperties = {
  ['--sg-color-success' as never]: '#7c3aed',
  ['--sg-color-success-bg' as never]: 'rgba(124, 58, 237, 0.14)',
  ['--sg-color-error' as never]: '#db2777',
  ['--sg-color-error-bg' as never]: 'rgba(219, 39, 119, 0.14)',
  ['--sg-border-radius-lg' as never]: '14px',
  ['--sg-shadow-lg' as never]: '0 16px 40px -12px rgba(88, 28, 135, 0.45)',
}

export function TokensOverrideNotification() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>{t.intro}</p>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--sg-color-text-tertiary)',
          }}
        >
          {t.previewLabel}
        </span>
        <div style={{ ...scope, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <FauxToast type="success" icon="✓" title={t.successTitle} desc={t.successDesc} />
          <FauxToast type="error" icon="!" title={t.errorTitle} desc={t.errorDesc} />
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--sg-color-text-tertiary)',
          }}
        >
          {t.liveLabel}
        </span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button onClick={() => notification.success(t.toastSuccessTitle, t.toastSuccessDesc)}>
            {t.fireSuccess}
          </Button>
          <Button onClick={() => notification.error(t.toastErrorTitle, t.toastErrorDesc)}>
            {t.fireError}
          </Button>
        </div>
      </section>
    </div>
  )
}

function FauxToast({
  type,
  icon,
  title,
  desc,
}: {
  type: 'success' | 'error'
  icon: string
  title: string
  desc: string
}) {
  return (
    <div
      className={`sg-notification sg-notification-${type}`}
      style={{ position: 'static', animation: 'none', minWidth: 260 }}
    >
      <span className="sg-notification-icon">{icon}</span>
      <div className="sg-notification-content">
        <div className="sg-notification-message">{title}</div>
        <div className="sg-notification-description">{desc}</div>
      </div>
    </div>
  )
}
