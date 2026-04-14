import { notification, Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const notificationProps: PropDef[] = [
  { name: 'type', description: 'Type of notification', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'" },
  { name: 'message', description: 'The title of notification', type: 'ReactNode' },
  { name: 'description', description: 'Additional content of notification', type: 'ReactNode' },
  { name: 'duration', description: 'Auto-close time in ms, 0 means never', type: 'number', default: '4500' },
  { name: 'placement', description: 'Position of notification', type: "'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'", default: "'topRight'" },
  { name: 'onClose', description: 'Callback when notification is closed', type: '() => void' },
  { name: 'key', description: 'Unique identifier for the notification', type: 'string' },
]

export function NotificationDemo() {
  return (
    <ComponentDoc
      title="Notification"
      description="Display a notification message globally."
      whenToUse={[
        'To display a notification message at the corner of the page.',
        'Use for system-level notifications that need more content than a simple message.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The simplest usage that closes automatically."
        code={`import { notification, Button } from '@skygraph/react'

<Button onClick={() => notification.open({
  message: 'Notification Title',
  description: 'This is the content of the notification.',
})}>
  Open Notification
</Button>`}
      >
        <Button onClick={() => notification.open({
          message: 'Notification Title',
          description: 'This is the content of the notification.',
        })}>
          Open Notification
        </Button>
      </DemoBox>

      <DemoBox
        title="Type"
        description="Notifications with different types."
        code={`notification.success('Success', 'Operation completed.')
notification.error('Error', 'Something went wrong.')
notification.warning('Warning', 'Please be careful.')
notification.info('Info', 'Here is some info.')`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button onClick={() => notification.success('Success', 'Operation completed successfully.')}>
            Success
          </Button>
          <Button onClick={() => notification.error('Error', 'Something went wrong.')}>
            Error
          </Button>
          <Button onClick={() => notification.warning('Warning', 'Please be careful.')}>
            Warning
          </Button>
          <Button onClick={() => notification.info('Info', 'Here is some information.')}>
            Info
          </Button>
        </div>
      </DemoBox>

      <DemoBox
        title="Custom Duration"
        description="Notification that never closes automatically."
        code={`notification.open({
  message: 'Persistent',
  description: 'This will not close automatically.',
  duration: 0,
})`}
      >
        <Button onClick={() => notification.open({
          message: 'Persistent',
          description: 'This notification will not close automatically. Close it manually.',
          duration: 0,
        })}>
          No Auto Close
        </Button>
      </DemoBox>

      <PropsTable title="notification.open(config)" data={notificationProps} />
    </ComponentDoc>
  )
}
