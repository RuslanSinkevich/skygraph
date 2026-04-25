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

function FooterDrawer() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open with footer</Button>
      <Drawer
        open={open}
        onClose={close}
        title="Edit record"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={close}>Cancel</Button>
            <Button type="primary" onClick={close}>Save</Button>
          </div>
        }
      >
        <p>Form goes here…</p>
      </Drawer>
    </>
  )
}

function WideDrawer() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open wide (640)</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Wide drawer" width={640}>
        <p>width = 640</p>
      </Drawer>
    </>
  )
}

function ThemedDrawer() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ ['--sg-color-primary' as never]: '#0ea5e9' }}>
      <Button type="primary" onClick={() => setOpen(true)}>Open scoped</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Scoped brand">
        <p>Primary button inside drawer uses scoped token.</p>
        <Button type="primary">Save</Button>
      </Drawer>
    </div>
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

      <DemoBox
        title="With footer"
        description="Attach actions in a sticky footer."
        code={`<Drawer
  open={open}
  onClose={close}
  title="Edit record"
  footer={
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button onClick={close}>Cancel</Button>
      <Button type="primary" onClick={close}>Save</Button>
    </div>
  }
>
  <p>Form goes here</p>
</Drawer>`}
      >
        <FooterDrawer />
      </DemoBox>

      <DemoBox
        title="Custom size"
        description="Override width for horizontal drawers or height for vertical."
        code={`<Drawer width={640} ... />`}
      >
        <WideDrawer />
      </DemoBox>

      <DemoBox
        title="Scoped brand"
        description="Actions inside Drawer follow --sg-color-primary."
        code={`<div style={{ ['--sg-color-primary' as any]: '#0ea5e9' }}>
  <Drawer ... />
</div>`}
      >
        <ThemedDrawer />
      </DemoBox>

      <PropsTable data={drawerProps} />
    </ComponentDoc>
  )
}
