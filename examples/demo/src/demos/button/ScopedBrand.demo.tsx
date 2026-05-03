import type { CSSProperties } from 'react'
import { Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    primaryGreen: 'Primary (green)',
    default: 'Default',
    link: 'Link',
  },
  ru: {
    primaryGreen: 'Основная (зелёная)',
    default: 'Обычная',
    link: 'Ссылка',
  },
} as const

/**
 * Every variant reads the semantic primary palette. Override
 * `--sg-color-primary*` on a wrapper to rebrand a whole subtree
 * without touching the Button itself — Link and Primary both
 * follow along.
 */
const greenScope: CSSProperties = {
  ['--sg-color-primary' as never]: '#16a34a',
  ['--sg-color-primary-hover' as never]: '#15803d',
  ['--sg-color-primary-active' as never]: '#14532d',
  ['--sg-color-primary-bg' as never]: '#dcfce7',
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap',
}

export function ScopedBrandButton() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={greenScope}>
      <Button type="primary">{t.primaryGreen}</Button>
      <Button>{t.default}</Button>
      <Button type="link">{t.link}</Button>
    </div>
  )
}
