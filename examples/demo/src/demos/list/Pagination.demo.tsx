import { List } from '@skygraph/react'

/**
 * Pass a `pagination` config to enable the built-in Pagination
 * in the footer area. When `total` is omitted the list uses
 * `dataSource.length` and pages through the array in memory.
 */
export function PaginationList() {
  const dataSource = Array.from({ length: 9 }, (_, i) => `Row ${i + 1}`)
  return (
    <List
      bordered
      dataSource={dataSource}
      pagination={{ pageSize: 3 }}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  )
}
