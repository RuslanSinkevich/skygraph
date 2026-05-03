import { RadioGroup } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'Small',
    mediumSoldOut: 'Medium (sold out)',
    large: 'Large',
    yes: 'Yes',
    no: 'No',
    optionA: 'Option A',
    optionB: 'Option B',
  },
  ru: {
    small: 'Маленький',
    mediumSoldOut: 'Средний (нет в наличии)',
    large: 'Большой',
    yes: 'Да',
    no: 'Нет',
    optionA: 'Вариант A',
    optionB: 'Вариант B',
  },
} as const

/**
 * `disabled` on the group blocks every option. Disable individual options
 * via `options[].disabled`. `loading` renders an inline spinner next to
 * the group.
 */
export function DisabledStatesRadio() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <RadioGroup
        defaultValue="small"
        options={[
          { label: t.small, value: 'small' },
          { label: t.mediumSoldOut, value: 'medium', disabled: true },
          { label: t.large, value: 'large' },
        ]}
      />
      <RadioGroup
        disabled
        defaultValue="yes"
        options={[
          { label: t.yes, value: 'yes' },
          { label: t.no, value: 'no' },
        ]}
      />
      <RadioGroup
        loading
        defaultValue="a"
        options={[
          { label: t.optionA, value: 'a' },
          { label: t.optionB, value: 'b' },
        ]}
      />
    </div>
  )
}
