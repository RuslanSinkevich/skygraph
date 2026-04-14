import { useState } from 'react'
import {
  Table, Tabs, Tag, Button, Input, InputNumber, Badge, Steps,
  Modal, Descriptions, Cascader, notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn, TabItem } from '@skygraph/react'
import { products, orders, categories, orderStatusStep } from './data'
import type { Product, Order } from './data'

const statusColors: Record<string, string> = {
  active: 'green',
  draft: 'orange',
  archived: 'gray',
  pending: 'orange',
  paid: 'blue',
  shipped: 'cyan',
  delivered: 'green',
  cancelled: 'red',
}

function ProductsTab() {
  const [data, setData] = useState(products)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editPrice, setEditPrice] = useState(0)
  const [editStock, setEditStock] = useState(0)

  const startEdit = (record: Product) => {
    setEditingId(record.id)
    setEditPrice(record.price)
    setEditStock(record.stock)
  }

  const saveEdit = () => {
    setData(prev => prev.map(p =>
      p.id === editingId ? { ...p, price: editPrice, stock: editStock } : p
    ))
    setEditingId(null)
    notification.success({ message: 'Product updated' })
  }

  const columns: TableColumn<Product>[] = [
    {
      key: 'name',
      title: 'Product',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, r) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>{r.image}</span>
          <span style={{ fontWeight: 500 }}>{r.name}</span>
        </div>
      ),
    },
    {
      key: 'price',
      title: 'Price',
      sorter: (a, b) => a.price - b.price,
      render: (_, r) =>
        editingId === r.id ? (
          <InputNumber value={editPrice} onChange={v => setEditPrice(v ?? 0)} size="small" min={0} step={0.01} style={{ width: 100 }} />
        ) : (
          `$${r.price.toFixed(2)}`
        ),
    },
    {
      key: 'stock',
      title: 'Stock',
      sorter: (a, b) => a.stock - b.stock,
      render: (_, r) =>
        editingId === r.id ? (
          <InputNumber value={editStock} onChange={v => setEditStock(v ?? 0)} size="small" min={0} style={{ width: 80 }} />
        ) : (
          <span style={{ color: r.stock < 10 ? 'var(--sg-color-error)' : undefined }}>
            {r.stock} {r.stock < 10 && '⚠️'}
          </span>
        ),
    },
    {
      key: 'status',
      title: 'Status',
      filters: [
        { label: 'Active', value: 'active' },
        { label: 'Draft', value: 'draft' },
        { label: 'Archived', value: 'archived' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, r) => <Tag color={statusColors[r.status]}>{r.status}</Tag>,
    },
    {
      key: 'rating',
      title: 'Rating',
      sorter: (a, b) => a.rating - b.rating,
      render: (_, r) => `⭐ ${r.rating}`,
    },
    {
      key: 'actions',
      title: '',
      render: (_, r) =>
        editingId === r.id ? (
          <div style={{ display: 'flex', gap: 4 }}>
            <Button size="small" type="primary" onClick={saveEdit}>Save</Button>
            <Button size="small" onClick={() => setEditingId(null)}>Cancel</Button>
          </div>
        ) : (
          <Button size="small" onClick={() => startEdit(r)}>Edit</Button>
        ),
    },
  ]

  return (
    <>
      <div className="sc-toolbar">
        <Input placeholder="Search products..." style={{ width: 240 }} />
        <Cascader options={categories} placeholder="Category" style={{ width: 220 }} />
        <div className="sc-toolbar-spacer" />
        <Button type="primary" onClick={() => notification.info({ message: 'Add product dialog (mock)' })}>
          + Add Product
        </Button>
      </div>
      <Table<Product> columns={columns} dataSource={data} rowKey="id" size="small" pagination={{ pageSize: 8 }} />
    </>
  )
}

function OrdersTab() {
  const [orderDetail, setOrderDetail] = useState<Order | null>(null)

  const columns: TableColumn<Order>[] = [
    {
      key: 'id',
      title: 'Order',
      render: (_, r) => <span style={{ fontWeight: 500, fontFamily: 'monospace' }}>{r.id}</span>,
    },
    {
      key: 'customer',
      title: 'Customer',
      sorter: (a, b) => a.customer.localeCompare(b.customer),
    },
    {
      key: 'total',
      title: 'Total',
      sorter: (a, b) => a.total - b.total,
      render: (_, r) => `$${r.total.toFixed(2)}`,
    },
    {
      key: 'status',
      title: 'Status',
      filters: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, r) => <Tag color={statusColors[r.status]}>{r.status}</Tag>,
    },
    { key: 'date', title: 'Date', sorter: (a, b) => a.date.localeCompare(b.date) },
    {
      key: 'items_count',
      title: 'Items',
      render: (_, r) => <Badge count={r.items.length} />,
    },
    {
      key: 'actions',
      title: '',
      render: (_, r) => <Button size="small" onClick={() => setOrderDetail(r)}>Details</Button>,
    },
  ]

  const stepItems = [
    { title: 'Pending' },
    { title: 'Paid' },
    { title: 'Shipped' },
    { title: 'Delivered' },
  ]

  return (
    <>
      <Table<Order>
        columns={columns}
        dataSource={orders}
        rowKey="id"
        size="small"
        pagination={{ pageSize: 8 }}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ padding: '8px 0' }}>
              {record.items.map((it, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
                  <span>{it.name} × {it.qty}</span>
                  <span>${(it.price * it.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
          ),
        }}
      />

      <Modal
        open={!!orderDetail}
        onCancel={() => setOrderDetail(null)}
        title={`Order ${orderDetail?.id}`}
        footer={<Button onClick={() => setOrderDetail(null)}>Close</Button>}
        width={560}
      >
        {orderDetail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {orderDetail.status !== 'cancelled' ? (
              <Steps
                current={orderStatusStep[orderDetail.status]}
                items={stepItems}
                size="small"
              />
            ) : (
              <Tag color="red" style={{ alignSelf: 'flex-start' }}>Cancelled</Tag>
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
  const tabs: TabItem[] = [
    { key: 'products', label: 'Products' },
    { key: 'orders', label: 'Orders' },
  ]
  const [activeTab, setActiveTab] = useState('products')

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <StatsRow />
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
      <div style={{ marginTop: 16 }}>
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'orders' && <OrdersTab />}
      </div>
    </div>
  )
}
