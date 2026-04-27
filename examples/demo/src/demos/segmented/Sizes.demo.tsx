import { Segmented } from '@skygraph/react'

/**
 * `size` controls item height, padding and font size together.
 * Use `small` inside toolbars / cards, `large` for landing or
 * onboarding screens.
 */
export function SizesSegmented() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Segmented size="small" options={['Small', 'Middle', 'Large']} />
      <Segmented options={['Small', 'Middle', 'Large']} />
      <Segmented size="large" options={['Small', 'Middle', 'Large']} />
    </div>
  )
}
