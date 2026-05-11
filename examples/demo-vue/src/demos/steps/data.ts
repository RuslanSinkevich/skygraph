import type { StepItem } from '@skygraph/vue'

/**
 * Shared step lists for the Vue demos.
 *
 * `StepItem` exposes `icon?: string` for simple emoji/text icons, or
 * use the named `icon` slot for richer content (see CustomIcon doc).
 */
export const basicSteps: StepItem[] = [
  { title: 'Finished', description: 'Kick-off meeting complete.' },
  { title: 'In Progress', description: 'Design review in flight.' },
  { title: 'Waiting', description: 'Deployment pending approval.' },
]

export const checkoutSteps: StepItem[] = [
  { title: 'Cart' },
  { title: 'Shipping' },
  { title: 'Payment' },
  { title: 'Review' },
]
