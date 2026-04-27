import { List, Avatar, Button, Tag } from '@skygraph/react'
import { users } from './data'

/**
 * `List.Item` splits a row into main / actions / extra columns;
 * `List.Item.Meta` provides a conventional avatar + title +
 * description block. Actions render as a `<ul>` with hairline
 * dividers.
 */
export function WithMetaList() {
  return (
    <List
      bordered
      dataSource={users}
      renderItem={(u) => (
        <List.Item
          actions={[
            <Button key="edit" type="link">Edit</Button>,
            <Button key="del" type="link">Delete</Button>,
          ]}
          extra={<Tag color={u.status}>{u.status}</Tag>}
        >
          <List.Item.Meta
            avatar={<Avatar>{u.name[0]}</Avatar>}
            title={u.name}
            description={u.role}
          />
        </List.Item>
      )}
    />
  )
}
