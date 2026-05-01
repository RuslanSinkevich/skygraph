import { useI18n } from './I18nContext'
import { SUPPORTED_LOCALES } from './types'
import type { Locale } from './types'

export function LanguageSwitch() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t.language.switcherLabel}
      className="demo-lang-switch"
      style={{
        display: 'inline-flex',
        gap: 4,
        padding: 2,
        borderRadius: 6,
        border: '1px solid var(--sg-color-border)',
      }}
    >
      {SUPPORTED_LOCALES.map((code) => {
        const active = code === locale
        const label = code.toUpperCase()
        const fullName = code === 'en' ? t.language.en : t.language.ru
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code as Locale)}
            aria-pressed={active}
            title={fullName}
            style={{
              padding: '2px 8px',
              fontSize: 11,
              borderRadius: 4,
              border: 'none',
              cursor: active ? 'default' : 'pointer',
              background: active
                ? 'var(--sg-color-primary)'
                : 'transparent',
              color: active
                ? 'var(--sg-color-white)'
                : 'var(--sg-color-text-secondary)',
              fontWeight: active ? 600 : 400,
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
