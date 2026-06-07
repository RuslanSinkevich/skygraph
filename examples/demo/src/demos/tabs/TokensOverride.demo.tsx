import { Tabs } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Tabs reads `--sg-color-primary` for the active underline / label and the
 * surface tokens for the nav. Three scoped recipes — branded green, dark
 * field, glass pick — reskin the strip.
 */
const STRINGS = {
  en: { tab1: 'Overview', tab2: 'Activity', tab3: 'Settings', panel: 'Tab panel content.' },
  ru: { tab1: 'Обзор', tab2: 'Активность', tab3: 'Настройки', panel: 'Содержимое вкладки.' },
} as const

export function TokensOverrideTabs() {
  const t = useDemoStrings(STRINGS)
  const items = [
    { key: '1', label: t.tab1, children: <p style={{ margin: '8px 0 0' }}>{t.panel}</p> },
    { key: '2', label: t.tab2, children: <p style={{ margin: '8px 0 0' }}>{t.panel}</p> },
    { key: '3', label: t.tab3, children: <p style={{ margin: '8px 0 0' }}>{t.panel}</p> },
  ]
  return (
    <TokenScopeCards
      minCardWidth={360}
      extra={{
        brand: { ['--sg-color-bg-secondary' as never]: '#ecfdf5' },
        dark: {
          ['--sg-color-bg-secondary' as never]: '#1e293b',
          ['--sg-color-border-secondary' as never]: '#475569',
        },
        glass: {
          ['--sg-color-bg' as never]: 'rgba(255, 255, 255, 0.72)',
          ['--sg-color-bg-secondary' as never]: 'rgba(255, 255, 255, 0.48)',
          ['--sg-color-border-secondary' as never]: 'rgba(79, 70, 229, 0.18)',
        },
      }}
      render={() => <Tabs type="line" items={items} />}
    />
  )
}
