import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Live toasts render in a portal at the document root, so a scoped wrapper
 * can't restyle them. The preview below renders the real `.sg-notification`
 * markup inside each scope so you can see how the tokens cascade. Three recipes
 * — branded green, dark field, glass pick.
 */
const STRINGS = {
  en: { title: 'Backup complete', desc: 'Tint follows --sg-color-success.' },
  ru: { title: 'Бэкап завершён', desc: 'Оттенок следует за --sg-color-success.' },
} as const

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
    <TokenScopeCards
      extra={{
        brand: { ['--sg-color-success' as never]: '#059669' },
        dark: { ['--sg-color-success' as never]: '#34d399' },
        glass: { ['--sg-color-success' as never]: '#6366f1' },
      }}
      render={() => <FauxToast title={t.title} desc={t.desc} />}
    />
  )
}
