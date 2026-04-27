import { List, Tag } from '@skygraph/react'
import { tasks } from './data'

/**
 * `rowClassName` accepts either a static string or a function
 * `(item, index) => string`. Use it to highlight pinned,
 * featured or unread rows without touching `renderItem`.
 */
export function RowClassNameList() {
  return (
    <div>
      <style>{`
        .demo-list-row-featured { background: var(--sg-color-primary-bg); }
      `}</style>
      <List
        bordered
        dataSource={tasks}
        rowClassName={(t) => (t.pinned ? 'demo-list-row-featured' : '')}
        renderItem={(t) => (
          <List.Item extra={t.pinned ? <Tag color="processing">pinned</Tag> : null}>
            {t.title}
          </List.Item>
        )}
      />
    </div>
  )
}
