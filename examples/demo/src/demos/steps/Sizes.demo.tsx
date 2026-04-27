import { Steps } from '@skygraph/react'
import { basicSteps } from './data'

/**
 * Two visual sizes — `small` uses a 24-px icon ring and smaller
 * fonts; anything else (`middle` / `large`) falls back to the
 * 32-px `default` preset.
 */
export function SizesSteps() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Steps size="small" current={1} items={basicSteps} />
      <Steps current={1} items={basicSteps} />
    </div>
  )
}
