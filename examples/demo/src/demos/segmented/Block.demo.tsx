import { Segmented } from '@skygraph/react'

/**
 * `block` stretches the control to fill its container and makes
 * every segment equal width — ideal for full-width toolbars on
 * mobile or inside cards.
 */
export function BlockSegmented() {
  return <Segmented block options={['Option A', 'Option B', 'Option C']} />
}
