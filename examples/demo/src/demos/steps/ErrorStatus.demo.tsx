import { Steps } from '@skygraph/react'

/**
 * Per-item `status` overrides the one derived from `current` —
 * use it to freeze an error in the wizard and prevent auto-
 * advancement.
 */
export function ErrorStatusSteps() {
  return (
    <Steps
      current={1}
      items={[
        { title: 'Finished', description: 'User account verified.' },
        { title: 'Payment failed', description: 'Card declined — retry below.', status: 'error' },
        { title: 'Confirmation' },
      ]}
    />
  )
}
