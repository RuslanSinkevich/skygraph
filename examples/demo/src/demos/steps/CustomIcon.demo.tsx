import { Steps } from '@skygraph/react'

/**
 * Override the auto-generated number/check with your own node.
 * Custom icons render at `--sg-font-size-lg` and still sit
 * inside the 32-px status ring, so colour follows the step
 * status automatically.
 */
export function CustomIconSteps() {
  return (
    <Steps
      current={1}
      items={[
        { title: 'Login', icon: <span aria-hidden>🔑</span> },
        { title: 'Verify', icon: <span aria-hidden>✉️</span> },
        { title: 'Pay', icon: <span aria-hidden>💳</span> },
        { title: 'Done', icon: <span aria-hidden>🎉</span> },
      ]}
    />
  )
}
