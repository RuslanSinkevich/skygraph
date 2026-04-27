import { useState } from 'react'
import { List, Button } from '@skygraph/react'

/**
 * `loading` wraps the items area in a Spin overlay without
 * removing the current rows — good for "refresh" UX where you
 * want to signal work while keeping context.
 */
export function LoadingList() {
  const [loading, setLoading] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button
        onClick={() => {
          setLoading(true)
          setTimeout(() => setLoading(false), 1500)
        }}
      >
        Refresh
      </Button>
      <List
        bordered
        loading={loading}
        header="Inbox"
        dataSource={['Message 1', 'Message 2', 'Message 3']}
        renderItem={(it) => <List.Item>{it}</List.Item>}
      />
    </div>
  )
}
