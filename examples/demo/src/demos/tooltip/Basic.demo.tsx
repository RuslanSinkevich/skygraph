import { Tooltip, Button } from '@skygraph/react'

/**
 * The simplest Tooltip. Hover the child to reveal; leave to hide.
 * `aria-describedby` is wired up automatically so screen readers
 * read the tip once the child is focused.
 */
export function BasicTooltip() {
  return (
    <Tooltip title="Prompt text">
      <Button>Hover me</Button>
    </Tooltip>
  )
}
