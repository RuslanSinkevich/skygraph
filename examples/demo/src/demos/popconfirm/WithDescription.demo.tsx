import { Popconfirm, Button } from '@skygraph/react'

/**
 * Adds a second line under the title. The title gets the ⚠ icon and
 * bold weight; the description lines up beside it in secondary text.
 */
export function WithDescriptionPopconfirm() {
  return (
    <Popconfirm
      title="Delete the task"
      description="This action cannot be undone."
      okText="Delete"
      cancelText="Keep"
    >
      <Button
        type="primary"
        style={{
          background: 'var(--sg-color-error)',
          borderColor: 'var(--sg-color-error)',
        }}
      >
        Delete task
      </Button>
    </Popconfirm>
  )
}
