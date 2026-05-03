import { Rate } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    threeStars: '3 stars (bad / ok / great)',
    tenStars: '10 stars (NPS-like)',
  },
  ru: {
    threeStars: '3 звезды (плохо / ок / отлично)',
    tenStars: '10 звёзд (в духе NPS)',
  },
} as const

/**
 * `count` picks the number of symbols. Three for "quick sentiment",
 * ten for "NPS-ish" questions.
 */
export function CountRate() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Rate count={3} defaultValue={2} />
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{t.threeStars}</span>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Rate count={10} defaultValue={7} />
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{t.tenStars}</span>
      </div>
    </div>
  )
}
