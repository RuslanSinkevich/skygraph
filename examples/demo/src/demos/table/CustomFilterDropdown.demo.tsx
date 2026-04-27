import { Table, Button, Input } from '@skygraph/react'
import type { TableColumn, FilterDropdownProps } from '@skygraph/react'
import { people } from './data'

/**
 * `filterDropdown` lets you replace the entire filter popover with your own
 * UI. Receives helpers to read/write selection, confirm or clear. Pair with
 * `filterIcon` to match the state visually.
 */
export function CustomFilterDropdownTable() {
  const columns: TableColumn[] = [
    {
      key: 'name',
      title: 'Name',
      width: 200,
      filterDropdown: ({
        selectedKeys,
        setSelectedKeys,
        confirm,
        clearFilters,
      }: FilterDropdownProps) => (
        <div
          style={{
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            minWidth: 200,
          }}
        >
          <Input
            placeholder="Search name..."
            size="small"
            value={(selectedKeys[0] as string) ?? ''}
            onChange={(v) => setSelectedKeys(v ? [v] : [])}
          />
          <div
            style={{
              display: 'flex',
              gap: 4,
              justifyContent: 'space-between',
            }}
          >
            <Button size="small" onClick={clearFilters}>
              Reset
            </Button>
            <Button size="small" type="primary" onClick={confirm}>
              Search
            </Button>
          </div>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <span style={{ color: filtered ? 'var(--sg-color-primary)' : undefined }}>
          🔍
        </span>
      ),
      onFilter: (value, row) =>
        String(row.name).toLowerCase().includes(String(value).toLowerCase()),
    },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'city', title: 'City', width: 150 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return <Table columns={columns} data={people} pageSize={6} />
}
