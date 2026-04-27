import { InputNumber } from '@skygraph/react'

/**
 * Disabled blocks all interaction. Loading adds an inline spinner and
 * dims the control while a background request is in flight.
 */
export function StatesInputNumber() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <InputNumber disabled defaultValue={5} />
        <InputNumber disabled placeholder="no value" />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <InputNumber loading defaultValue={42} />
        <InputNumber loading placeholder="fetching…" />
      </div>
    </div>
  )
}
