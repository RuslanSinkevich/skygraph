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

  return (
    <ComponentDoc
      title="Modal"
      description="Modal dialogs for user interactions that require attention."
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

      <PropsTable data={modalProps} />
    </ComponentDoc>
  )
}
