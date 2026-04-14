import { useState, useMemo } from 'react'
import {
  Table, Tabs, Tag, Button, Input, Badge, Steps,
  Modal, Descriptions, Cascader, notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn, TabItem } from '@skygraph/react'
import { products, orders, categories, orderStatusStep, productToRow, orderToRow } from './data'
import type { Product, Order } from './data'

const statusColors: Record<string, string> = {
  active: 'success', draft: 'warning', archived: 'default',
  pending: 'warning', paid: 'processing', shipped: 'processing', delivered: 'success', cancelled: 'error',
}

function ProductsTab() {
  const [data, setData] = useState(products)

  const tableData = useMemo(() => data.map(productToRow), [data])

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Product', width: 240, sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>📦 {String(val)}</span>,
    },
    { key: 'category', title: 'Category', width: 140, sortable: true },
    {
      key: 'price', title: 'Price', width: 100, sortable: true, align: 'right',
      editable: true,
      render: (val) => `$${Number(val).toFixed(2)}`,
    },
    {
      key: 'stock', title: 'Stock', width: 80, sortable: true, align: 'center',
      editable: true,
      render: (val) => {
        const n = Number(val)
        return <span style={{ color: n < 10 ? 'var(--sg-color-error)' : undefined }}>{n} {n < 10 ? '⚠️' : ''}</span>
      },
    },
    {
      key: 'status', title: 'Status', width: 100,
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Draft', value: 'draft' },
        { text: 'Archived', value: 'archived' },
      ],
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColors[String(val)]}>{String(val)}</Tag>,
    },
    {
      key: 'rating', title: 'Rating', width: 80, sortable: true,
      render: (val) => `⭐ ${val}`,
    },
  ]

  return (
    <>
      <div className="sc-toolbar">
        <Input placeholder="Search products..." style={{ width: 240 }} />
        <Cascader options={categories} placeholder="Category" style={{ width: 220 }} />
        <div className="sc-toolbar-spacer" />
        <Button type="primary" onClick={() => notification.info('Add product dialog (mock)')}>
          + Add Product
        </Button>
      </div>
      <Table
        columns={columns}
        data={tableData}
        pageSize={10}
        size="small"
        onCellEdit={(id, col, val) => {
          setData(prev => prev.map(p =>
            p.id === id ? { ...p, [col]: col === 'price' ? Number(val) : Number(val) } : p
          ))
          notification.success('Product updated')
        }}
      />
    </>
  )
}

function OrdersTab() {
  const [orderDetail, setOrderDetail] = useState<Order | null>(null)

  const tableData = useMemo(() => orders.map(orderToRow), [])

  const columns: TableColumn[] = [
    {
      key: 'id', title: 'Order', width: 120,
      render: (val) => <span style={{ fontWeight: 500, fontFamily: 'monospace' }}>{String(val)}</span>,
    },
    { key: 'customer', title: 'Customer', width: 140, sortable: true },
    {
      key: 'total', title: 'Total', width: 100, sortable: true, align: 'right',
      render: (val) => `$${Number(val).toFixed(2)}`,
    },
    {
      key: 'status', title: 'Status', width: 110,
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Paid', value: 'paid' },
        { text: 'Shipped', value: 'shipped' },
        { text: 'Delivered', value: 'delivered' },
        { text: 'Cancelled', value: 'cancelled' },
      ],
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColors[String(val)]}>{String(val)}</Tag>,
    },
    { key: 'date', title: 'Date', width: 110, sortable: true },
    {
      key: 'itemCount', title: 'Items', width: 70, align: 'center',
      render: (val) => <Badge count={Number(val)} />,
    },
    {
      key: 'actions', title: '', width: 80,
      render: (_, row) => (
        <Button size="small" onClick={() => {
          const o = orders.find(x => x.id === String(row.id))
          if (o) setOrderDetail(o)
        }}>Details</Button>
      ),
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        data={tableData}
        pageSize={10}
        size="small"
        expandable={{
          expandedRowRender: (row) => {
            const o = orders.find(x => x.id === String(row.id))
            if (!o) return null
            return (
              <div style={{ padding: '8px 0' }}>
                {o.items.map((it, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
                    <span>{it.name} × {it.qty}</span>
                    <span>${(it.price * it.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )
          },
        }}
      />

      <Modal
        open={!!orderDetail}
        onClose={() => setOrderDetail(null)}
        title={`Order ${orderDetail?.id}`}
        footer={<Button onClick={() => setOrderDetail(null)}>Close</Button>}
        width={560}
      >
        {orderDetail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {orderDetail.status !== 'cancelled' ? (
              <Steps
                current={orderStatusStep[orderDetail.status]}
                items={[
                  { title: 'Pending' },
                  { title: 'Paid' },
                  { title: 'Shipped' },
                  { title: 'Delivered' },
                ]}
                size="small"
              />
            ) : (
              <Tag color="error">Cancelled</Tag>
            )}
            <Descriptions
              items={[
                { label: 'Customer', children: orderDetail.customer },
                { label: 'Email', children: orderDetail.email },
                { label: 'Address', children: orderDetail.address },
                { label: 'Date', children: orderDetail.date },
                { label: 'Total', children: `$${orderDetail.total.toFixed(2)}` },
              ]}
              column={1}
              size="small"
            />
            <h4>Items</h4>
            {orderDetail.items.map((it, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span>{it.name} × {it.qty}</span>
                <span>${(it.price * it.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  )
}

function StatsRow() {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const pending = orders.filter(o => o.status === 'pending').length
  const activeProducts = products.filter(p => p.status === 'active').length
  const lowStock = products.filter(p => p.stock < 10).length
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-card-label">Total Revenue</div>
        <div className="stat-card-value">${(totalRevenue / 1000).toFixed(1)}k</div>
        <div className="stat-card-sub">{orders.length} orders</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Pending Orders</div>
        <div className="stat-card-value">{pending}</div>
        <div className="stat-card-sub">needs processing</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Active Products</div>
        <div className="stat-card-value">{activeProducts}</div>
        <div className="stat-card-sub">of {products.length} total</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Low Stock</div>
        <div className="stat-card-value" style={{ color: lowStock > 0 ? 'var(--sg-color-error)' : undefined }}>{lowStock}</div>
        <div className="stat-card-sub">below 10 units</div>
      </div>
    </div>
  )
}

export function EcommerceApp() {
  const [activeTab, setActiveTab] = useState('products')

  const tabs: TabItem[] = [
    { key: 'products', label: 'Products', children: <ProductsTab /> },
    { key: 'orders', label: 'Orders', children: <OrdersTab /> },
  ]

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <StatsRow />
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  )
}
