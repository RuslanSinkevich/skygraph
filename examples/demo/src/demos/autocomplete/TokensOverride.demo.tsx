import { AutoComplete } from '@skygraph/react'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * AutoComplete reuses `--sg-input-*` for the field and global tokens for the
 * dropdown. Three scoped recipes — branded green, dark field, glass pick —
 * reskin the same control.
 */
const STRINGS = {
  en: { placeholder: 'Search framework…' },
  ru: { placeholder: 'Поиск фреймворка…' },
} as const

export function TokensOverrideAutoComplete() {
  const t = useDemoStrings(STRINGS)
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-input-border' as never]: '#6ee7b7' },
        dark: {
          ['--sg-input-bg' as never]: '#0f172a',
          ['--sg-input-color' as never]: '#e2e8f0',
          ['--sg-input-border' as never]: '#1e293b',
        },
        glass: {
          ['--sg-input-bg' as never]: 'rgba(255, 255, 255, 0.55)',
          ['--sg-input-border' as never]: 'rgba(15, 23, 42, 0.08)',
          ['--sg-input-radius' as never]: '12px',
        },
      }}
      render={() => <AutoComplete options={frameworkOptions} placeholder={t.placeholder} />}
    />
  )
}
