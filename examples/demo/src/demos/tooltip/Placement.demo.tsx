import { Tooltip, Button } from '@skygraph/react'

/**
 * Four sides are supported; the arrow anchors to the centre of the
 * trigger. There's no auto-flip — pick a side that fits your layout.
 */
export function PlacementTooltip() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gap: 12,
        padding: 40,
        justifyContent: 'start',
      }}
    >
      <Tooltip title="Top" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip title="Bottom" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip title="Left" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip title="Right" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  )
}
