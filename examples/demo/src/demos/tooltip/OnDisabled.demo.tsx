import { Tooltip, Button } from '@skygraph/react'

/**
 * Tooltip attaches its hover listeners to its own wrapper, not the
 * child — so a disabled Button underneath still reveals the tip
 * when the pointer enters the wrapper area.
 */
export function OnDisabledTooltip() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Tooltip title="Button is disabled — hover still works">
        <Button disabled>Disabled</Button>
      </Tooltip>
      <Tooltip title="Icon explains the disabled state">
        <Button disabled>🔒 Locked</Button>
      </Tooltip>
    </div>
  )
}
