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
  return <TokenScopeCards render={() => <Tabs type="line" items={items} />} />
}
