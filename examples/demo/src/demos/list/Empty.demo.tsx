import { List } from '@skygraph/react'

/**
 * An empty `dataSource` renders the built-in Empty component
 * with `locale.emptyText` as the description — override it for
 * your own copy.
 */
export function EmptyList() {
  return (
    <List
      bordered
      dataSource={[]}
      locale={{ emptyText: 'No notifications yet — you are all caught up.' }}
      renderItem={() => null}
    />
  )
}
