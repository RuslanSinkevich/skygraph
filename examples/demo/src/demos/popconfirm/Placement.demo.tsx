import { Popconfirm, Button } from '@skygraph/react'

/**
 * Four sides, anchored to the centre of the trigger. No auto-flip —
 * choose a placement that has room to open.
 */
export function PlacementPopconfirm() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gap: 12,
        padding: 60,
        justifyContent: 'start',
      }}
    >
      <Popconfirm title="Top placement" placement="top">
        <Button>Top</Button>
      </Popconfirm>
      <Popconfirm title="Bottom placement" placement="bottom">
        <Button>Bottom</Button>
      </Popconfirm>
      <Popconfirm title="Left placement" placement="left">
        <Button>Left</Button>
      </Popconfirm>
      <Popconfirm title="Right placement" placement="right">
        <Button>Right</Button>
      </Popconfirm>
    </div>
  )
}
