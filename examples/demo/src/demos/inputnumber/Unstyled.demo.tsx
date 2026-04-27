import { InputNumber } from '@skygraph/react'

/**
 * `unstyled` keeps the stepper logic (`role="spinbutton"`, `+` / `−`
 * buttons, clamping) but removes every SkyGraph class. Ship your own
 * layout and borders.
 */
export function UnstyledInputNumber() {
  return (
    <InputNumber
      unstyled
      defaultValue={10}
      min={0}
      max={99}
      style={{
        display: 'inline-flex',
        gap: 4,
        padding: 4,
        border: '1px dashed var(--sg-color-border)',
        borderRadius: 6,
      }}
    />
  )
}
