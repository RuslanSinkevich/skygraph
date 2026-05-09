import { useState, useMemo } from 'react'
import {
  Table, Tag, Button, Modal, Steps, Form, Field, Select, InputNumber, Descriptions, Badge, notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { orders, orderToRow, orderStatusStep } from './data'
import type { Order } from './data'
import { Toolbar, useFilteredList, money, statusColor } from '../_shared'

export function OrdersTab() {
  const [search, setSearch] = useState('')
  const [orderDetail, setOrderDetail] = useState<Order | null>(null)
  const [refundModal, setRefundModal] = useState<Order | null>(null)

  const filtered = useFilteredList(orders, search, ['id', 'customer', 'email'])
  const tableData = useMemo(() => filtered.map(orderToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'id', title: 'Order', width: 120, fixed: 'left' as const,
      render: (val) => <span style={{ fontWeight: 500, fontFamily: 'monospace' }}>{String(val)}</span>,
    },
    { key: 'customer', title: 'Customer', width: 140, sortable: true },
    {
      key: 'total', title: 'Total', width: 110, sortable: true, align: 'right',
      filterMode: 'advanced' as const,
      advancedFilterType: 'number' as const,
      onFilter: (value, row) => Number(row.total) >= Number(value),
      render: (val) => money(Number(val)),
      aggregate: 'sum' as const,
    },
    {
      key: 'status', title: 'Status', width: 110,
      filters: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'].map(v => ({ text: v, value: v })),
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColor(String(val))}>{String(val)}</Tag>,
    },
    { key: 'date', title: 'Date', width: 110, sortable: true },
    {
      key: 'itemCount', title: 'Items', width: 70, align: 'center',
      render: (val) => <Badge count={Number(val)} />,
    },
    {
      key: 'actions', title: '', width: 130,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button size="small" onClick={() => {
            const o = orders.find(x => x.id === String(row.id))
            if (o) setOrderDetail(o)
          }}>Details</Button>
          {(row.status === 'paid' || row.status === 'delivered') && (
            <Button size="small" onClick={() => {
              const o = orders.find(x => x.id === String(row.id))
              if (o) setRefundModal(o)
            }}>Refund</Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search orders…' }}
        actions={<Button size="small" onClick={() => notification.info('Export orders (mock)')}>Export CSV</Button>}
      />
      <Table
        columns={columns}
        data={tableData}
        pageSize={10}
        size="small"
        bordered
        striped
        highlightOnHover
        sticky
        columnPinning
        densityToggle
        groupByOptions={[
          { key: 'status', label: 'Status' },
          { key: 'customer', label: 'Customer' },
        ]}
        expandable={{
          expandedRowRender: (row) => {
            const o = orders.find(x => x.id === String(row.id))
            if (!o) return null
            return (
              <div style={{ padding: '8px 0' }}>
                {o.items.map((it, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
                    <span>{it.name} × {it.qty}</span>
                    <span>{money(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>
            )
          },
        }}
        summary={(rows) => {
          const total = rows.reduce((s, r) => s + (Number(r.data.total) || 0), 0)
          const items = rows.reduce((s, r) => s + (Number(r.data.itemCount) || 0), 0)
          return [[
            { content: 'Page Total' },
            { content: '' },
            { content: money(total), align: 'right' as const },
            { content: '' },
            { content: '' },
            { content: String(items), align: 'center' as const },
            { content: '' },
          ]]
        }}
      />

      <Modal
        open={!!orderDetail}
        onClose={() => setOrderDetail(null)}
        title={`Order ${orderDetail?.id}`}
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={() => setOrderDetail(null)}>Close</Button>
            {orderDetail && orderDetail.status === 'pending' && (
              <Button type="primary" onClick={() => {
                notification.success(`Order ${orderDetail.id} marked as paid (mock)`)
                setOrderDetail(null)
              }}>Mark as Paid</Button>
            )}
          </div>
        }
        width={600}
      >
        {orderDetail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {orderDetail.status !== 'cancelled' ? (
              <Steps
                current={orderStatusStep[orderDetail.status]}
                items={[{ title: 'Pending' }, { title: 'Paid' }, { title: 'Shipped' }, { title: 'Delivered' }]}
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
                { label: 'Total', children: money(orderDetail.total) },
                { label: 'Items', children: String(orderDetail.items.length) },
              ]}
              column={2}
              size="small"
            />
            <h4>Order Items</h4>
            <div style={{ border: '1px solid var(--sg-color-border-secondary)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ display: 'flex', padding: '8px 12px', background: 'var(--sg-color-bg-secondary)', fontSize: 12, fontWeight: 600 }}>
                <span style={{ flex: 1 }}>Product</span>
                <span style={{ width: 60, textAlign: 'center' }}>Qty</span>
                <span style={{ width: 80, textAlign: 'right' }}>Price</span>
                <span style={{ width: 80, textAlign: 'right' }}>Subtotal</span>
              </div>
              {orderDetail.items.map((it, i) => (
                <div key={i} style={{ display: 'flex', padding: '8px 12px', borderTop: '1px solid var(--sg-color-border-secondary)', fontSize: 13 }}>
                  <span style={{ flex: 1 }}>{it.name}</span>
                  <span style={{ width: 60, textAlign: 'center' }}>{it.qty}</span>
                  <span style={{ width: 80, textAlign: 'right' }}>{money(it.price)}</span>
                  <span style={{ width: 80, textAlign: 'right', fontWeight: 500 }}>{money(it.price * it.qty)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!refundModal}
        onClose={() => setRefundModal(null)}
        title={`Refund — ${refundModal?.id}`}
        footer={null}
        width={440}
      >
        {refundModal && (
          <Form onFinish={(values) => {
            notification.success(`Refund of $${values.amount} issued for ${refundModal.id} (mock)`)
            setRefundModal(null)
          }}>
            <Descriptions
              items={[
                { label: 'Order', children: refundModal.id },
                { label: 'Customer', children: refundModal.customer },
                { label: 'Order Total', children: money(refundModal.total) },
              ]}
              column={1}
              size="small"
              style={{ marginBottom: 16 }}
            />
            <Field name="amount" label="Refund Amount ($)" rules={[{ required: true }]}>
              <InputNumber min={0} max={refundModal.total} step={0.01} style={{ width: '100%' }} />
            </Field>
            <Field name="reason" label="Reason" rules={[{ required: true }]}>
              <Select
                options={[
                  { label: 'Defective product', value: 'defective' },
                  { label: 'Wrong item', value: 'wrong_item' },
                  { label: 'Customer request', value: 'customer_request' },
                  { label: 'Shipping damage', value: 'shipping_damage' },
                  { label: 'Other', value: 'other' },
                ]}
                placeholder="Select reason"
              />
            </Field>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
              <Button onClick={() => setRefundModal(null)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Issue Refund</Button>
            </div>
          </Form>
        )}
      </Modal>
    </>
  )
}
