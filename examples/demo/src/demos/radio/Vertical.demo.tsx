import { RadioGroup } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    card: 'Pay by card',
    paypal: 'PayPal',
    bank: 'Bank transfer',
    cash: 'Cash on delivery',
  },
  ru: {
    card: 'Картой',
    paypal: 'PayPal',
    bank: 'Банковский перевод',
    cash: 'Наличными при получении',
  },
} as const

/**
 * `direction="vertical"` stacks options — ideal for longer labels or
 * settings screens where each choice has extra description text.
 */
export function VerticalRadio() {
  const t = useDemoStrings(STRINGS)
  return (
    <RadioGroup
      direction="vertical"
      defaultValue="card"
      options={[
        { label: t.card, value: 'card' },
        { label: t.paypal, value: 'paypal' },
        { label: t.bank, value: 'bank' },
        { label: t.cash, value: 'cash' },
      ]}
    />
  )
}
