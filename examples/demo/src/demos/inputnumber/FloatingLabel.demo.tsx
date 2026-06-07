import { useState } from 'react'
import { InputNumber } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { FloatingField, FloatingFieldStyles } from '../_shared/FloatingField'

/**
 * Floating label on the InputNumber field. The label floats on focus or once
 * a value is present; the stepper buttons keep working underneath.
 */
const STRINGS = {
  en: { amount: 'Amount', quantity: 'Quantity' },
  ru: { amount: 'Сумма', quantity: 'Количество' },
} as const

export function FloatingLabelInputNumber() {
  const t = useDemoStrings(STRINGS)
  const [amount, setAmount] = useState<number | null>(null)
  const [qty, setQty] = useState<number | null>(null)
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 220px))',
        gap: 24,
        maxWidth: 480,
      }}
    >
      <FloatingFieldStyles />
      <FloatingField label={t.amount} filled={amount !== null}>
        <InputNumber
          value={amount ?? undefined}
          onChange={setAmount}
          min={0}
          step={0.5}
          precision={2}
          placeholder=" "
        />
      </FloatingField>
      <FloatingField label={t.quantity} filled={qty !== null}>
        <InputNumber value={qty ?? undefined} onChange={setQty} min={0} max={99} placeholder=" " />
      </FloatingField>
    </div>
  )
}
