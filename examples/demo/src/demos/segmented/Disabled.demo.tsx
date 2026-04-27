import { Segmented } from '@skygraph/react'

/**
 * Two axes of disablement — either the whole control (via the
 * top-level `disabled` prop, also inherited from
 * `ConfigProvider`) or individual options (`disabled` on the
 * option object).
 */
export function DisabledSegmented() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Segmented options={['Map', 'Transit', 'Satellite']} disabled />
      <Segmented
        defaultValue="Map"
        options={[
          { label: 'Map', value: 'Map' },
          { label: 'Transit', value: 'Transit', disabled: true },
          { label: 'Satellite', value: 'Satellite' },
        ]}
      />
    </div>
  )
}
