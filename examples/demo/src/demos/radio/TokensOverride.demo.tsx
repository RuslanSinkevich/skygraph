import { RadioGroup } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Radio exposes `--sg-radio-*` paint tokens on top of the globals. Three
 * scoped recipes — branded green, dark field, glass pick — recolour the dot.
 */
const STRINGS = {
  en: { a: 'Brand A', b: 'Brand B', c: 'Brand C' },
  ru: { a: 'Бренд A', b: 'Бренд B', c: 'Бренд C' },
} as const

export function TokensOverrideRadio() {
  const t = useDemoStrings(STRINGS)
  const options = [
    { label: t.a, value: 'a' },
    { label: t.b, value: 'b' },
    { label: t.c, value: 'c' },
  ]
  return (
    <TokenScopeCards
      extra={{
        brand: {
          ['--sg-radio-bg-checked' as never]: '#059669',
          ['--sg-radio-border-hover' as never]: '#059669',
        },
        dark: {
          ['--sg-radio-bg-checked' as never]: '#60a5fa',
          ['--sg-radio-border-hover' as never]: '#60a5fa',
        },
        glass: {
          ['--sg-radio-bg-checked' as never]: '#6366f1',
          ['--sg-radio-border-hover' as never]: '#6366f1',
        },
      }}
      render={() => <RadioGroup defaultValue="b" options={options} />}
    />
  )
}
