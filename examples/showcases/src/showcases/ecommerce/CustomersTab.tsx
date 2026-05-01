import { useState, useMemo } from 'react'
import {
  Table, Tag, Avatar, Button, Drawer, Descriptions, Badge, notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { customerList, customerToRow, orders } from './data'
import type { Customer } from './data'
import { Toolbar, useFilteredList, money, statusColor, initials, colorFromString } from '../_shared'

export function CustomersTab() {
  const [search, setSearch] = useState('')
  const [drawer, setDrawer] = useState<Customer | null>(null)

  const filtered = useFilteredList(customerList, search, ['name', 'email'])
  const tableData = useMemo(() => filtered.map(customerToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Customer', width: 200, sortable: true,
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar size="small" style={{ background: colorFromString(String(val)) }}>
            {initials(String(val))}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{String(val)}</div>
            <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{String(row.email)}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'status', title: 'Status', width: 80,
      render: (val) => (
        <Tag color={statusColor(String(val))}>
          {String(val) === 'vip' ? '⭐ VIP' : String(val)}
        </Tag>
      ),
    },
    {
      key: 'totalOrders', title: 'Orders', width: 80, sortable: true, align: 'center',
      render: (val) => <Badge count={Number(val)} />,
    },
    {
      key: 'totalSpent', title: 'Total Spent', width: 120, sortable: true, align: 'right',
      render: (val) => money(Number(val)),
    },
    {
      key: 'avgOrderValue', title: 'AOV', width: 90, sortable: true, align: 'right',
      render: (val) => money(Number(val)),
    },
    { key: 'lastOrder', title: 'Last Order', width: 110, sortable: true },
    { key: 'registeredAt', title: 'Registered', width: 110, sortable: true },
    {
      key: 'actions', title: '', width: 80,
      render: (_, row) => (
        <Button size="small" onClick={() => {
          const c = customerList.find(x => x.id === String(row.id))
          if (c) setDrawer(c)
        }}>View</Button>
      ),
    },
  ]

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search customers…' }}
        actions={<Button size="small" onClick={() => notification.info('Export customers (mock)')}>Export</Button>}
      />
      <Table columns={columns} data={tableData} pageSize={10} size="small" striped highlightOnHover />

      <Drawer open={!!drawer} onClose={() => setDrawer(null)} title={drawer?.name ?? ''} width={480}>
        {drawer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar size="large" style={{ background: colorFromString(drawer.name) }}>
                {initials(drawer.name)}
              </Avatar>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{drawer.name}</div>
                <Tag color={statusColor(drawer.status)}>
                  {drawer.status === 'vip' ? '⭐ VIP' : drawer.status}
                </Tag>
              </div>
            </div>
            <Descriptions
              items={[
                { label: 'Email', children: drawer.email },
                { label: 'Registered', children: drawer.registeredAt },
                { label: 'Total Orders', children: String(drawer.totalOrders) },
                { label: 'Total Spent', children: money(drawer.totalSpent) },
                { label: 'Avg Order Value', children: money(drawer.avgOrderValue) },
                { label: 'Last Order', children: drawer.lastOrder },
              ]}
              column={1}
              size="small"
            />
            <h4>Order History</h4>
            {orders.filter(o => o.customer === drawer.name).slice(0, 8).map(o => (
              <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--sg-color-border-secondary)', fontSize: 13 }}>
                <span style={{ fontFamily: 'monospace' }}>{o.id}</span>
                <span>{money(o.total)}</span>
                <Tag color={statusColor(o.status)}>{o.status}</Tag>
                <span style={{ color: 'var(--sg-color-text-secondary)' }}>{o.date}</span>
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </>
  )
}
