import { RadioGroup } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    first: 'First',
    second: 'Second',
    third: 'Third',
  },
  ru: {
    first: 'Первый',
    second: 'Второй',
    third: 'Третий',
  },
} as const

/**
 * `unstyled` keeps the semantics (radiogroup + native inputs) but drops
 * every SkyGraph class. Paint with your own CSS.
 */
export function UnstyledRadio() {
  const t = useDemoStrings(STRINGS)
  return (
    <RadioGroup
      unstyled
      defaultValue="first"
      options={[
        { label: t.first, value: 'first' },
        { label: t.second, value: 'second' },
        { label: t.third, value: 'third' },
      ]}
    />
  )
}
