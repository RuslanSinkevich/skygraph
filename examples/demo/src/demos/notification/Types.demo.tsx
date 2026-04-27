import { notification, Button } from '@skygraph/react'

export function TypesNotification() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button onClick={() => notification.success('Success', 'Operation completed successfully.')}>
        Success
      </Button>
      <Button onClick={() => notification.error('Error', 'Something went wrong.')}>
        Error
      </Button>
      <Button onClick={() => notification.warning('Warning', 'Double-check your input.')}>
        Warning
      </Button>
      <Button onClick={() => notification.info('Info', 'Here is some information for you.')}>
        Info
      </Button>
    </div>
  )
}
