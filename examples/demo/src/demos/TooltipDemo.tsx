import { Tooltip, Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const tooltipProps: PropDef[] = [
  { name: 'title', description: 'The text shown in the tooltip', type: 'ReactNode' },
  { name: 'placement', description: 'Position of the tooltip relative to the target', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'" },
  { name: 'children', description: 'The element that triggers the tooltip', type: 'ReactElement' },
]

export function TooltipDemo() {
  return (
    <ComponentDoc
      title="Tooltip"
      description="A simple text popup tip."
      whenToUse={[
        'The tip is shown on mouse enter, and hidden on mouse leave.',
        'Use when you want to provide additional context for a UI element on hover.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The simplest usage."
        code={`import { Tooltip, Button } from '@skygraph/react'

<Tooltip title="Prompt text">
  <Button>Hover me</Button>
</Tooltip>`}
      >
        <Tooltip title="Prompt text">
          <Button>Hover me</Button>
        </Tooltip>
      </DemoBox>

      <DemoBox
        title="Placement"
        description="There are 4 placement options."
        code={`<Tooltip title="Top" placement="top"><Button>Top</Button></Tooltip>
<Tooltip title="Bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
<Tooltip title="Left" placement="left"><Button>Left</Button></Tooltip>
<Tooltip title="Right" placement="right"><Button>Right</Button></Tooltip>`}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <Tooltip title="Top" placement="top"><Button>Top</Button></Tooltip>
          <Tooltip title="Bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
          <Tooltip title="Left" placement="left"><Button>Left</Button></Tooltip>
          <Tooltip title="Right" placement="right"><Button>Right</Button></Tooltip>
        </div>
      </DemoBox>

      <PropsTable data={tooltipProps} />
    </ComponentDoc>
  )
}
