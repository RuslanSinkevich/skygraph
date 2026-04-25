import { Popconfirm, Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const popconfirmProps: PropDef[] = [
  { name: 'title', description: 'The title of the confirmation box', type: 'ReactNode' },
  { name: 'description', description: 'Additional description', type: 'ReactNode' },
  { name: 'onConfirm', description: 'Callback when confirm button is clicked', type: '() => void' },
  { name: 'onCancel', description: 'Callback when cancel button is clicked', type: '() => void' },
  { name: 'okText', description: 'Text of the Confirm button', type: 'string', default: "'Yes'" },
  { name: 'cancelText', description: 'Text of the Cancel button', type: 'string', default: "'No'" },
  { name: 'placement', description: 'Placement of the popconfirm', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'" },
  { name: 'disabled', description: 'Whether the popconfirm is disabled', type: 'boolean', default: 'false' },
]

export function PopconfirmDemo() {
  return (
    <ComponentDoc
      title="Popconfirm"
      description="A simple and compact confirmation dialog of an action."
      whenToUse={[
        'When a simple confirmation is needed before an action, like deleting an item.',
        'Compared with Modal.confirm, Popconfirm is lighter and more contextual.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The basic example."
        code={`import { Popconfirm, Button } from '@skygraph/react'

<Popconfirm
  title="Are you sure?"
  onConfirm={() => console.log('Confirmed')}
>
  <Button>Delete</Button>
</Popconfirm>`}
      >
        <Popconfirm
          title="Are you sure you want to delete this?"
          onConfirm={() => console.log('Confirmed')}
          onCancel={() => console.log('Cancelled')}
        >
          <Button type="primary" style={{ background: 'var(--sg-color-error)', borderColor: 'var(--sg-color-error)' }}>Delete</Button>
        </Popconfirm>
      </DemoBox>

      <DemoBox
        title="With Description"
        description="Adding a description for more context."
        code={`<Popconfirm
  title="Delete the task"
  description="This action cannot be undone."
  okText="Delete"
  cancelText="Cancel"
>
  <Button danger>Delete</Button>
</Popconfirm>`}
      >
        <Popconfirm
          title="Delete the task"
          description="This action cannot be undone."
          okText="Delete"
          cancelText="Cancel"
        >
          <Button type="primary" style={{ background: 'var(--sg-color-error)', borderColor: 'var(--sg-color-error)' }}>Delete Task</Button>
        </Popconfirm>
      </DemoBox>

      <DemoBox
        title="Placement"
        description="Four placements."
        code={`<Popconfirm title="Sure?" placement="bottom">
  <Button>Bottom</Button>
</Popconfirm>`}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <Popconfirm title="Sure?" placement="top"><Button>Top</Button></Popconfirm>
          <Popconfirm title="Sure?" placement="bottom"><Button>Bottom</Button></Popconfirm>
          <Popconfirm title="Sure?" placement="left"><Button>Left</Button></Popconfirm>
          <Popconfirm title="Sure?" placement="right"><Button>Right</Button></Popconfirm>
        </div>
      </DemoBox>

      <DemoBox
        title="Disabled"
        description="When disabled, Popconfirm becomes a no-op and the trigger fires as usual."
        code={`<Popconfirm disabled title="Never shown">
  <Button>Disabled</Button>
</Popconfirm>`}
      >
        <Popconfirm disabled title="Never shown">
          <Button>Disabled popconfirm</Button>
        </Popconfirm>
      </DemoBox>

      <DemoBox
        title="Scoped brand"
        description="OK button follows --sg-color-primary. Override per scope to match destructive theme."
        code={`<div style={{ ['--sg-color-primary' as any]: '#ef4444' }}>
  <Popconfirm title="Delete row?" okText="Delete">
    <Button>Delete</Button>
  </Popconfirm>
</div>`}
      >
        <div style={{ ['--sg-color-primary' as never]: '#ef4444' }}>
          <Popconfirm title="Delete row?" okText="Delete">
            <Button type="primary">Delete</Button>
          </Popconfirm>
        </div>
      </DemoBox>

      <PropsTable data={popconfirmProps} />
    </ComponentDoc>
  )
}
