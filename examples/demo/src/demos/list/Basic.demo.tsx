import { List } from '@skygraph/react'
import { shortData } from './data'

/**
 * The minimum List setup — `dataSource` + `renderItem`. `header`
 * and `footer` pick up the secondary background and sit on
 * either end; `bordered` wraps it in a card.
 */
export function BasicList() {
  return (
    <List
      header="Header"
      footer="Footer"
      bordered
      dataSource={shortData}
      renderItem={(item) => <div style={{ padding: '8px 0' }}>{item}</div>}
    />
  )
}
