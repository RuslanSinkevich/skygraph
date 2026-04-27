import { List } from '@skygraph/react'

/**
 * `virtual` windowing renders only the rows currently visible.
 * `itemHeight` must be constant for every row — measure the
 * actual height once and hardcode it.
 */
export function VirtualList() {
  const bigDataSet = Array.from({ length: 10_000 }, (_, i) => `Row ${i + 1}`)
  return (
    <List
      bordered
      dataSource={bigDataSet}
      virtual={{ itemHeight: 48, height: 320, overscan: 4 }}
      renderItem={(row) => <List.Item>{row}</List.Item>}
    />
  )
}
