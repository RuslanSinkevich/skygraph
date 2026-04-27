import { RadioGroup } from '@skygraph/react'

/**
 * `direction="vertical"` stacks options — ideal for longer labels or
 * settings screens where each choice has extra description text.
 */
export function VerticalRadio() {
  return (
    <RadioGroup
      direction="vertical"
      defaultValue="card"
      options={[
        { label: 'Pay by card', value: 'card' },
        { label: 'PayPal', value: 'paypal' },
        { label: 'Bank transfer', value: 'bank' },
        { label: 'Cash on delivery', value: 'cash' },
      ]}
    />
  )
}
