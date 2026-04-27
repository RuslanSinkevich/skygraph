import { Calendar, Button } from '@skygraph/react'

/**
 * `headerRender` gives you full control of the chrome. We replace the
 * default select + arrows with a minimal "prev / title / next" layout.
 */
export function CustomHeaderCalendar() {
  return (
    <Calendar
      fullscreen={false}
      headerRender={({ value, onChange }) => {
        const shift = (months: number) => {
          const next = new Date(value)
          next.setMonth(next.getMonth() + months)
          onChange(next)
        }
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--sg-padding-sm) var(--sg-padding-md)',
              borderBottom: '1px solid var(--sg-color-border-secondary)',
            }}
          >
            <Button size="small" onClick={() => shift(-1)}>‹ Prev</Button>
            <strong>{value.toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</strong>
            <Button size="small" onClick={() => shift(1)}>Next ›</Button>
          </div>
        )
      }}
    />
  )
}
