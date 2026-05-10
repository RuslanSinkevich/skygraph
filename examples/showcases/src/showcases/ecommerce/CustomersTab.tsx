import { useState, useMemo } from 'react'
import {
  Table,
  Tag,
  Avatar,
  Button,
  Drawer,
  Descriptions,
  Badge,
  notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { customerList, customerToRow, orders } from './data'
import type { Customer } from './data'
import {
  Toolbar,
  useFilteredList,
  money,
  statusColor,
  initials,
  colorFromString,
  useAppLocale,
} from '../_shared'

export function CustomersTab() {
  const lc = useAppLocale('ecommerce')
  const c = lc.customers
  const orderStatusLabel = (s: string) => lc.orders.statusLabel[s] ?? s
  const [search, setSearch] = useState('')
  const [drawer, setDrawer] = useState<Customer | null>(null)

  const filtered = useFilteredList(customerList, search, ['name', 'email'])
  const tableData = useMemo(() => filtered.map(customerToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: c.columns.customer,
      width: 200,
      sortable: true,
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar size="small" style={{ background: colorFromString(String(val)) }}>
            {initials(String(val))}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{String(val)}</div>
            <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
              {String(row.email)}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      title: c.columns.status,
      width: 80,
      render: (val) => (
        <Tag color={statusColor(String(val))}>
          {String(val) === 'vip' ? `⭐ ${c.vipBadge}` : (c.statusLabel[String(val)] ?? String(val))}
        </Tag>
      ),
    },
    {
      key: 'totalOrders',
      title: c.columns.orders,
      width: 80,
      sortable: true,
      align: 'center',
      render: (val) => <Badge count={Number(val)} />,
    },
    {
      key: 'totalSpent',
      title: c.columns.totalSpent,
      width: 120,
      sortable: true,
      align: 'right',
      render: (val) => money(Number(val)),
    },
    {
      key: 'avgOrderValue',
      title: c.columns.aov,
      width: 90,
      sortable: true,
      align: 'right',
      render: (val) => money(Number(val)),
    },
    { key: 'lastOrder', title: c.columns.lastOrder, width: 110, sortable: true },
    { key: 'registeredAt', title: c.columns.registered, width: 110, sortable: true },
    {
      key: 'actions',
      title: '',
      width: 80,
      render: (_, row) => (
        <Button
          size="small"
          onClick={() => {
            const cu = customerList.find((x) => x.id === String(row.id))
            if (cu) setDrawer(cu)
          }}
        >
          {c.viewBtn}
        </Button>
      ),
    },
  ]

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: c.searchPlaceholder }}
        actions={
          <Button size="small" onClick={() => notification.info(c.exportToast)}>
            {c.exportBtn}
          </Button>
        }
      />
      <Table
        columns={columns}
        data={tableData}
        pageSize={10}
        size="small"
        striped
        highlightOnHover
      />

      <Drawer
        open={!!drawer}
        onClose={() => setDrawer(null)}
        title={drawer?.name ?? ''}
        width={480}
      >
        {drawer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar size="large" style={{ background: colorFromString(drawer.name) }}>
                {initials(drawer.name)}
              </Avatar>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{drawer.name}</div>
                <Tag color={statusColor(drawer.status)}>
                  {drawer.status === 'vip'
                    ? `⭐ ${c.vipBadge}`
                    : (c.statusLabel[drawer.status] ?? drawer.status)}
                </Tag>
              </div>
            </div>
            <Descriptions
              items={[
                { label: c.drawer.email, children: drawer.email },
                { label: c.drawer.registered, children: drawer.registeredAt },
                { label: c.drawer.totalOrders, children: String(drawer.totalOrders) },
                { label: c.drawer.totalSpent, children: money(drawer.totalSpent) },
                { label: c.drawer.aov, children: money(drawer.avgOrderValue) },
                { label: c.drawer.lastOrder, children: drawer.lastOrder },
              ]}
              column={1}
              size="small"
            />
            <h4>{c.drawer.orderHistoryHeading}</h4>
            {orders
              .filter((o) => o.customer === drawer.name)
              .slice(0, 8)
              .map((o) => (
                <div
                  key={o.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 0',
                    borderBottom: '1px solid var(--sg-color-border-secondary)',
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontFamily: 'monospace' }}>{o.id}</span>
                  <span>{money(o.total)}</span>
                  <Tag color={statusColor(o.status)}>{orderStatusLabel(o.status)}</Tag>
                  <span style={{ color: 'var(--sg-color-text-secondary)' }}>{o.date}</span>
                </div>
              ))}
          </div>
        )}
      </Drawer>
    </>
  )
}
