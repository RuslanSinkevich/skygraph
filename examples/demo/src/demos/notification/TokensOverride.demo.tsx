import { notification, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Live toasts render in a portal at the document root, so a scoped wrapper
 * can't restyle them. Two complementary views:
 *   1. A static preview that renders the real `.sg-notification` markup inside
 *      each token scope so you can compare the cascade side by side.
 *   2. Buttons that fire genuine toasts, each carrying a per-toast token
 *      override via the new `style` config (CSS custom properties).
 */
const STRINGS = {
  en: {
    title: 'Backup complete',
    desc: 'Tint follows --sg-color-success.',
    fire: 'Fire toast',
  },
  ru: {
    title: 'Бэкап завершён',
    desc: 'Оттенок следует за --sg-color-success.',
    fire: 'Показать тост',
  },
} as const

const RECIPES = [
  { key: 'brand', label: 'Brand green', accent: '#059669' },
  { key: 'dark', label: 'Mint', accent: '#34d399' },
  { key: 'glass', label: 'Indigo', accent: '#6366f1' },
] as const

function FauxToast({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      className="sg-notification sg-notification-success"
      style={{ position: 'static', animation: 'none', minWidth: 200 }}
    >
      <span className="sg-notification-icon">✓</span>
      <div className="sg-notification-content">
        <div className="sg-notification-message">{title}</div>
        <div className="sg-notification-description">{desc}</div>
      </div>
    </div>
  )
}

export function TokensOverrideNotification() {
  const t = useDemoStrings(STRINGS)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {RECIPES.map((r) => (
          <Button
            key={r.key}
            onClick={() =>
              notification.open({
                type: 'success',
                message: t.title,
                description: t.desc,
                style: { ['--sg-color-success' as never]: r.accent },
              })
            }
          >
            {t.fire}: {r.label}
          </Button>
        ))}
      </div>
      <TokenScopeCards
        extra={{
          brand: { ['--sg-color-success' as never]: '#059669' },
          dark: { ['--sg-color-success' as never]: '#34d399' },
          glass: { ['--sg-color-success' as never]: '#6366f1' },
        }}
        render={() => <FauxToast title={t.title} desc={t.desc} />}
      />
    </div>
  )
}
