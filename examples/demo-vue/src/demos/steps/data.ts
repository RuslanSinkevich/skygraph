import type { StepItem } from '@skygraph/vue'

/**
 * Shared step lists for the Vue demos.
 *
 * Vue-side delta vs React: `StepItem` has no `icon` field — see the
 * doc strings for the omitted `CustomIcon` example.
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
