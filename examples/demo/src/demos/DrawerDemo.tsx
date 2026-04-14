import { Drawer, Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const drawerProps: PropDef[] = [
  { name: 'open', description: 'Whether the Drawer dialog is visible', type: 'boolean' },
  { name: 'onClose', description: 'Callback when Drawer is closed', type: '() => void' },
  { name: 'title', description: 'Title of the Drawer', type: 'ReactNode' },
  { name: 'placement', description: 'Placement of the Drawer', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'" },
  { name: 'width', description: 'Width of the Drawer (horizontal placement)', type: 'number | string', default: '378' },
  { name: 'height', description: 'Height of the Drawer (vertical placement)', type: 'number | string', default: '378' },
  { name: 'closable', description: 'Whether to show close button', type: 'boolean', default: 'true' },
  { name: 'mask', description: 'Whether to show mask', type: 'boolean', default: 'true' },
  { name: 'maskClosable', description: 'Close Drawer by clicking mask', type: 'boolean', default: 'true' },
  { name: 'footer', description: 'Footer content of the Drawer', type: 'ReactNode' },
]

function BasicDrawer() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Basic Drawer">
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}

function PlacementDrawer() {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('right')
  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['left', 'right', 'top', 'bottom'] as const).map((p) => (
          <Button key={p} onClick={() => { setPlacement(p); setOpen(true) }}>
            {p}
          </Button>
        ))}
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} title={`${placement} Drawer`} placement={placement}>
        <p>Drawer from the {placement}.</p>
      </Drawer>
    </>
  )
}

export function DrawerDemo() {
  return (
    <ComponentDoc
      title="Drawer"
      description="A panel which slides in from the edge of the screen."
      whenToUse={[
        'When you need a panel attached to the edge that provides supplementary content.',
        'Use when a Modal is too heavy and you want to keep context.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Basic drawer from the right."
        code={`import { Drawer, Button } from '@skygraph/react'

const [open, setOpen] = useState(false)

<Button type="primary" onClick={() => setOpen(true)}>Open Drawer</Button>
<Drawer open={open} onClose={() => setOpen(false)} title="Basic Drawer">
  <p>Some contents...</p>
</Drawer>`}
      >
        <BasicDrawer />
      </DemoBox>

      <DemoBox
        title="Placement"
        description="The Drawer can appear from any edge."
        code={`<Drawer placement="left" open={open} onClose={onClose} title="Left">
  <p>Content</p>
</Drawer>`}
      >
        <PlacementDrawer />
      </DemoBox>

      <PropsTable data={drawerProps} />
    </ComponentDoc>
  )
}
