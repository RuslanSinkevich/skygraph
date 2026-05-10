import { useState, useMemo } from 'react'
import {
  Table,
  Tag,
  Button,
  Modal,
  Steps,
  Form,
  Field,
  Select,
  InputNumber,
  Descriptions,
  Badge,
  notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { orders, orderToRow, orderStatusStep } from './data'
import type { Order } from './data'
import { Toolbar, useFilteredList, money, statusColor, useAppLocale } from '../_shared'

export function OrdersTab() {
  const o = useAppLocale('ecommerce').orders
  const [search, setSearch] = useState('')
  const [orderDetail, setOrderDetail] = useState<Order | null>(null)
  const [refundModal, setRefundModal] = useState<Order | null>(null)

  const filtered = useFilteredList(orders, search, ['id', 'customer', 'email'])
  const tableData = useMemo(() => filtered.map(orderToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'id',
      title: o.columns.order,
      width: 120,
      fixed: 'left' as const,
      render: (val) => (
        <span style={{ fontWeight: 500, fontFamily: 'monospace' }}>{String(val)}</span>
      ),
    },
    { key: 'customer', title: o.columns.customer, width: 140, sortable: true },
    {
      key: 'total',
      title: o.columns.total,
      width: 110,
      sortable: true,
      align: 'right',
      filterMode: 'advanced' as const,
      advancedFilterType: 'number' as const,
      onFilter: (value, row) => Number(row.total) >= Number(value),
      render: (val) => money(Number(val)),
      aggregate: 'sum' as const,
    },
    {
      key: 'status',
      title: o.columns.status,
      width: 110,
      filters: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'].map((v) => ({
        text: o.statusLabel[v] ?? v,
        value: v,
      })),
      onFilter: (value, row) => row.status === value,
      render: (val) => (
        <Tag color={statusColor(String(val))}>{o.statusLabel[String(val)] ?? String(val)}</Tag>
      ),
    },
    { key: 'date', title: o.columns.date, width: 110, sortable: true },
    {
      key: 'itemCount',
      title: o.columns.items,
      width: 70,
      align: 'center',
      render: (val) => <Badge count={Number(val)} />,
    },
    {
      key: 'actions',
      title: '',
      width: 130,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button
            size="small"
            onClick={() => {
              const ord = orders.find((x) => x.id === String(row.id))
              if (ord) setOrderDetail(ord)
            }}
          >
            {o.actions.details}
          </Button>
          {(row.status === 'paid' || row.status === 'delivered') && (
            <Button
              size="small"
              onClick={() => {
                const ord = orders.find((x) => x.id === String(row.id))
                if (ord) setRefundModal(ord)
              }}
            >
              {o.actions.refund}
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: o.searchPlaceholder }}
        actions={
          <Button size="small" onClick={() => notification.info(o.exportToast)}>
            {o.exportBtn}
          </Button>
        }
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
          { key: 'status', label: o.columns.status },
          { key: 'customer', label: o.columns.customer },
        ]}
        expandable={{
          expandedRowRender: (row) => {
            const o = orders.find((x) => x.id === String(row.id))
            if (!o) return null
            return (
              <div style={{ padding: '8px 0' }}>
                {o.items.map((it, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '4px 0',
                      fontSize: 13,
                    }}
                  >
                    <span>
                      {it.name} × {it.qty}
                    </span>
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
          return [
            [
              { content: o.summaryPageTotal },
              { content: '' },
              { content: money(total), align: 'right' as const },
              { content: '' },
              { content: '' },
              { content: String(items), align: 'center' as const },
              { content: '' },
            ],
          ]
        }}
      />

      <Modal
        open={!!orderDetail}
        onClose={() => setOrderDetail(null)}
        title={o.detailTitle(orderDetail?.id ?? '')}
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={() => setOrderDetail(null)}>{o.close}</Button>
            {orderDetail && orderDetail.status === 'pending' && (
              <Button
                type="primary"
                onClick={() => {
                  notification.success(o.markPaidToast(orderDetail.id))
                  setOrderDetail(null)
                }}
              >
                {o.markPaid}
              </Button>
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
                items={[
                  { title: o.steps.pending },
                  { title: o.steps.paid },
                  { title: o.steps.shipped },
                  { title: o.steps.delivered },
                ]}
                size="small"
              />
            ) : (
              <Tag color="error">{o.steps.cancelled}</Tag>
            )}
            <Descriptions
              items={[
                { label: o.descriptions.customer, children: orderDetail.customer },
                { label: o.descriptions.email, children: orderDetail.email },
                { label: o.descriptions.address, children: orderDetail.address },
                { label: o.descriptions.date, children: orderDetail.date },
                { label: o.descriptions.total, children: money(orderDetail.total) },
                { label: o.descriptions.items, children: String(orderDetail.items.length) },
              ]}
              column={2}
              size="small"
            />
            <h4>{o.itemsHeading}</h4>
            <div
              style={{
                border: '1px solid var(--sg-color-border-secondary)',
                borderRadius: 6,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  padding: '8px 12px',
                  background: 'var(--sg-color-bg-secondary)',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                <span style={{ flex: 1 }}>{o.itemsTable.product}</span>
                <span style={{ width: 60, textAlign: 'center' }}>{o.itemsTable.qty}</span>
                <span style={{ width: 80, textAlign: 'right' }}>{o.itemsTable.price}</span>
                <span style={{ width: 80, textAlign: 'right' }}>{o.itemsTable.subtotal}</span>
              </div>
              {orderDetail.items.map((it, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    padding: '8px 12px',
                    borderTop: '1px solid var(--sg-color-border-secondary)',
                    fontSize: 13,
                  }}
                >
                  <span style={{ flex: 1 }}>{it.name}</span>
                  <span style={{ width: 60, textAlign: 'center' }}>{it.qty}</span>
                  <span style={{ width: 80, textAlign: 'right' }}>{money(it.price)}</span>
                  <span style={{ width: 80, textAlign: 'right', fontWeight: 500 }}>
                    {money(it.price * it.qty)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!refundModal}
        onClose={() => setRefundModal(null)}
        title={o.refundTitle(refundModal?.id ?? '')}
        footer={null}
        width={440}
      >
        {refundModal && (
          <Form
            onFinish={(values) => {
              notification.success(o.refundToast(`$${values.amount}`, refundModal.id))
              setRefundModal(null)
            }}
          >
            <Descriptions
              items={[
                { label: o.refundFields.order, children: refundModal.id },
                { label: o.refundFields.customer, children: refundModal.customer },
                { label: o.refundFields.orderTotal, children: money(refundModal.total) },
              ]}
              column={1}
              size="small"
              style={{ marginBottom: 16 }}
            />
            <Field name="amount" label={o.refundFields.amount} rules={[{ required: true }]}>
              <InputNumber min={0} max={refundModal.total} step={0.01} style={{ width: '100%' }} />
            </Field>
            <Field name="reason" label={o.refundFields.reason} rules={[{ required: true }]}>
              <Select
                options={[
                  { label: o.refundFields.reasonOptions.defective, value: 'defective' },
                  { label: o.refundFields.reasonOptions.wrongItem, value: 'wrong_item' },
                  { label: o.refundFields.reasonOptions.request, value: 'customer_request' },
                  { label: o.refundFields.reasonOptions.damage, value: 'shipping_damage' },
                  { label: o.refundFields.reasonOptions.other, value: 'other' },
                ]}
                placeholder={o.refundFields.reasonPh}
              />
            </Field>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
              <Button onClick={() => setRefundModal(null)}>{o.cancel}</Button>
              <Button type="primary" htmlType="submit">
                {o.issueRefund}
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </>
  )
}
