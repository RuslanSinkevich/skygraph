import { Button, Tooltip } from '@skygraph/react'

export function TooltipDemo() {
  return (
    <section>
      <h2>Tooltip</h2>
      <div style={{ display: 'flex', gap: 16 }}>
        <Tooltip title="Top tooltip">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip title="Bottom tooltip" placement="bottom">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip title="Left tooltip" placement="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip title="Right tooltip" placement="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
    </section>
  )
}
