import { Popconfirm, Button } from '@skygraph/react'

/**
 * `unstyled` removes every `sg-popconfirm-*` class and renders a
 * minimal alertdialog with native buttons. Focus trap, outside-click
 * handling, and ARIA wiring stay — the painting is yours.
 */
export function UnstyledPopconfirm() {
  return (
    <Popconfirm unstyled title="Proceed?" okText="Yes" cancelText="No">
      <Button>Click me</Button>
    </Popconfirm>
  )
}
