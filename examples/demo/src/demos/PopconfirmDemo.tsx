import { Button, Popconfirm, notification, NotificationContainer } from '@skygraph/react'

export function PopconfirmDemo() {
  return (
    <section>
      <h2>Popconfirm</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        Confirmation popup before an action. Click outside to dismiss.
      </p>
      <NotificationContainer />
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Popconfirm
          title="Delete this item?"
          description="This action cannot be undone."
          onConfirm={() => notification.success('Deleted')}
          onCancel={() => notification.info('Cancelled')}
        >
          <Button type="primary">Delete</Button>
        </Popconfirm>

        <Popconfirm
          title="Are you sure?"
          placement="bottom"
          okText="Confirm"
          cancelText="Nope"
          onConfirm={() => notification.success('Confirmed')}
        >
          <Button>Bottom placement</Button>
        </Popconfirm>

        <Popconfirm title="Disabled" disabled>
          <Button disabled>Disabled</Button>
        </Popconfirm>
      </div>
    </section>
  )
}
