import { List } from '@skygraph/react'
import { shortData } from './data'

/**
 * Three vertical-padding presets. `size` here is independent
 * from `ConfigProvider` because List uses its own `small |
 * default | large` vocabulary.
 */
export function SizesList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <List size="small" bordered header="Small" dataSource={shortData}
        renderItem={(it) => <div>{it}</div>} />
      <List bordered header="Default" dataSource={shortData}
        renderItem={(it) => <div>{it}</div>} />
      <List size="large" bordered header="Large" dataSource={shortData}
        renderItem={(it) => <div>{it}</div>} />
    </div>
  )
}
