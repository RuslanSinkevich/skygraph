import { useState } from 'react'
import { Button, Modal } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const modalProps: PropDef[] = [
  { name: 'open', description: 'Whether the modal is visible', type: 'boolean', default: 'false' },
  { name: 'onClose', description: 'Callback when modal is closed', type: '() => void' },
  { name: 'title', description: 'Title of the modal', type: 'ReactNode' },
  { name: 'footer', description: 'Footer content (buttons etc.)', type: 'ReactNode' },
  { name: 'children', description: 'Modal body content', type: 'ReactNode' },
  { name: 'width', description: 'Width of the modal dialog', type: 'string | number', default: '520' },
  { name: 'closable', description: 'Show close icon', type: 'boolean', default: 'true' },
  { name: 'maskClosable', description: 'Close on mask click', type: 'boolean', default: 'true' },
  { name: 'centered', description: 'Center modal vertically', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Additional CSS class', type: 'string' },
  { name: 'style', description: 'Inline styles for the modal dialog', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Remove all built-in styles', type: 'boolean', default: 'false' },
]

export function ModalDemo() {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [openWide, setOpenWide] = useState(false)
  const [openBrand, setOpenBrand] = useState(false)
  const [openUnstyled, setOpenUnstyled] = useState(false)

  return (
    <ComponentDoc
      title="Modal"
      badge="Feedback"
      crumbs={['Feedback', 'Modal']}
      description="Modal dialogs for user interactions that require attention. Fully unstyled-capable and brand-scoped."
      whenToUse={[
        'When requiring users to interact with the application without jumping to a new page.',
        'When you need to show additional information or confirmation.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Basic modal dialog with title, content, and footer buttons."
        code={`const [open, setOpen] = useState(false)

<Button type="primary" onClick={() => setOpen(true)}>
  Open Modal
</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="SkyGraph Modal"
  footer={<>
    <Button onClick={() => setOpen(false)}>Cancel</Button>
    <Button type="primary" onClick={() => setOpen(false)}>OK</Button>
  </>}
>
  <p>Modal content goes here.</p>
</Modal>`}
      >
        <Button type="primary" onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="SkyGraph Modal"
          footer={
            <>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="primary" onClick={() => setOpen(false)}>OK</Button>
            </>
          }
        >
          <p>Modal content. Press Esc or click outside to close.</p>
        </Modal>
      </DemoBox>

      <DemoBox
        title="Loading in footer"
        description="Button with loading state in the modal footer for async operations."
        code={`<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Saving..."
  footer={<>
    <Button onClick={() => setOpen(false)}>Cancel</Button>
    <Button type="primary" loading>Saving...</Button>
  </>}
>
  <p>Please wait while saving...</p>
</Modal>`}
      >
        <Button onClick={() => setOpen2(true)}>Open with loading</Button>
        <Modal
          open={open2}
          onClose={() => setOpen2(false)}
          title="Saving..."
          footer={
            <>
              <Button onClick={() => setOpen2(false)}>Cancel</Button>
              <Button type="primary" loading onClick={() => setOpen2(false)}>Saving...</Button>
            </>
          }
        >
          <p>Please wait while saving...</p>
        </Modal>
      </DemoBox>

      <DemoBox
        title="Custom width"
        description="Control the dialog width."
        code={`<Modal open={open} width={720} title="Wide modal" />`}
      >
        <Button onClick={() => setOpenWide(true)}>Open 720px modal</Button>
        <Modal
          open={openWide}
          onClose={() => setOpenWide(false)}
          title="Wide 720px"
          width={720}
          footer={<Button onClick={() => setOpenWide(false)}>Close</Button>}
        >
          <p>Use width to fit dense layouts — tables, forms, previews.</p>
        </Modal>
      </DemoBox>

      <DemoBox
        title="Scoped brand"
        description="Wrap Modal in a themed container to re-skin it without touching CSS."
        code={`<div style={{ ['--sg-color-primary' as any]: '#7c3aed', ['--sg-border-radius' as any]: '14px' }}>
  <Modal ... />
</div>`}
      >
        <Button type="primary" onClick={() => setOpenBrand(true)}>
          Open themed modal
        </Button>
        <div
          style={{
            ['--sg-color-primary' as never]: '#7c3aed',
            ['--sg-color-primary-hover' as never]: '#6d28d9',
            ['--sg-color-primary-bg' as never]: '#f3e8ff',
            ['--sg-border-radius' as never]: '14px',
          }}
        >
          <Modal
            open={openBrand}
            onClose={() => setOpenBrand(false)}
            title="Themed brand"
            footer={
              <>
                <Button onClick={() => setOpenBrand(false)}>Cancel</Button>
                <Button type="primary" onClick={() => setOpenBrand(false)}>
                  Confirm
                </Button>
              </>
            }
          >
            <p>Every button inside the modal picks up the scoped tokens. No component change.</p>
          </Modal>
        </div>
      </DemoBox>

      <DemoBox
        title="Unstyled modal"
        description="Drop SkyGraph CSS — keep semantics (role=dialog, aria-modal, focus trap)."
        code={`<Modal unstyled open={open} className="my-dialog" />`}
      >
        <Button onClick={() => setOpenUnstyled(true)}>Open unstyled</Button>
        <Modal
          unstyled
          open={openUnstyled}
          onClose={() => setOpenUnstyled(false)}
          title="Custom dialog"
          className="demo-unstyled-card"
        >
          <div style={{ padding: 14, fontSize: 13 }}>
            SkyGraph ships no CSS for this dialog. The backdrop and centering
            are from your own styles.
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10 }}>
            <Button unstyled className="demo-unstyled-btn" onClick={() => setOpenUnstyled(false)}>
              Close
            </Button>
          </div>
        </Modal>
      </DemoBox>

      <PropsTable data={modalProps} />
    </ComponentDoc>
  )
}
