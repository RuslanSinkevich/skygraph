import { ConfigProvider, Table } from '@skygraph/react'

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'role', title: 'Role' },
  { key: 'status', title: 'Status' },
]

const data = [
  { id: '1', data: { name: 'Alice', role: 'Designer', status: 'Active' } },
  { id: '2', data: { name: 'Bob', role: 'Engineer', status: 'Away' } },
  { id: '3', data: { name: 'Carol', role: 'PM', status: 'Active' } },
]

export function BorderedConfigProvider() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
        Currently only <code>Table</code> reads <code>bordered</code> from the
        provider. Other components keep their own defaults.
      </p>
      <ConfigProvider bordered>
        <Table columns={columns} data={data} showPagination={false} />
      </ConfigProvider>
    </div>
  )
}
