import { useState, useMemo } from 'react'
import {
  Table, Tag, Button, Modal, Form, Field, InputNumber, Select, Segmented, Progress, notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { products as initial } from './data'
import type { Product } from './data'
import { Toolbar, useFilteredList, money, statusColor } from '../_shared'
import { emojiForProduct } from './common'

type StockBucket = 'all' | 'out' | 'low' | 'healthy'

function bucketOf(p: Product): Exclude<StockBucket, 'all'> {
  if (p.stock <= 0) return 'out'
  if (p.stock < 10) return 'low'
  return 'healthy'
}

function bucketColor(b: Exclude<StockBucket, 'all'>): string {
  return b === 'out' ? 'error' : b === 'low' ? 'warning' : 'success'
}

export function InventoryTab() {
  const [products, setProducts] = useState(initial)
  const [search, setSearch] = useState('')
  const [bucket, setBucket] = useState<StockBucket>('all')
  const [restock, setRestock] = useState<Product | null>(null)

  const buckets = useMemo(() => {
    const out = products.filter(p => bucketOf(p) === 'out').length
    const low = products.filter(p => bucketOf(p) === 'low').length
    const healthy = products.filter(p => bucketOf(p) === 'healthy').length
    return { out, low, healthy, total: products.length }
  }, [products])

  const visible = useMemo(
    () => products.filter(p => bucket === 'all' || bucketOf(p) === bucket),
    [products, bucket],
  )

  const filtered = useFilteredList(visible, search, ['name', 'sku', 'brand'])

  const tableData = useMemo(
    () => filtered.map(p => ({ id: p.id, data: p as unknown as Record<string, unknown> })),
    [filtered],
  )

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Product', width: 280, sortable: true,
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>{emojiForProduct(String(val), String(row.category))}</span>
          <div>
            <div style={{ fontWeight: 500 }}>{String(val)}</div>
            <div style={{ fontSize: 11, color: 'var(--sg-color-text-secondary)', fontFamily: 'monospace' }}>
              {String(row.sku)}
            </div>
          </div>
        </div>
      ),
    },
    { key: 'brand', title: 'Brand', width: 120, sortable: true },
    { key: 'category', title: 'Category', width: 130, sortable: true },
    {
      key: 'stock', title: 'On Hand', width: 100, sortable: true, align: 'right',
      render: (val, row) => {
        const b = bucketOf(row as unknown as Product)
        return <Tag color={bucketColor(b)}>{Number(val)}</Tag>
      },
    },
    {
      key: 'reserved', title: 'Reserved', width: 100, sortable: true, align: 'right',
      render: (val) => Number(val).toLocaleString(),
    },
    {
      key: 'available', title: 'Available', width: 110, sortable: true, align: 'right',
      render: (val) => <strong>{Number(val).toLocaleString()}</strong>,
    },
    {
      key: 'health', title: 'Health', width: 130,
      render: (_, row) => {
        const stock = Number(row.stock)
        const pct = Math.min(100, Math.round((stock / 100) * 100))
        const status = stock <= 0 ? 'error' : stock < 10 ? 'active' : 'success'
        return <Progress percent={pct} size="small" status={status} showInfo={false} />
      },
    },
    {
      key: 'status', title: 'Status', width: 100,
      render: (val) => <Tag color={statusColor(String(val))}>{String(val)}</Tag>,
    },
    {
      key: 'actions', title: '', width: 100,
      render: (_, row) => (
        <Button size="small" onClick={() => {
          const p = products.find(x => x.id === String(row.id))
          if (p) setRestock(p)
        }}>Restock</Button>
      ),
    },
  ]

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12,
        marginBottom: 16,
      }}>
        <div className="inv-card">
          <div className="inv-card-label">Out of stock</div>
          <div className="inv-card-value" style={{ color: 'var(--sg-color-error)' }}>{buckets.out}</div>
        </div>
        <div className="inv-card">
          <div className="inv-card-label">Low stock (&lt; 10)</div>
          <div className="inv-card-value" style={{ color: 'var(--sg-color-warning)' }}>{buckets.low}</div>
        </div>
        <div className="inv-card">
          <div className="inv-card-label">Healthy</div>
          <div className="inv-card-value" style={{ color: 'var(--sg-color-success)' }}>{buckets.healthy}</div>
        </div>
        <div className="inv-card">
          <div className="inv-card-label">Total SKUs</div>
          <div className="inv-card-value">{buckets.total}</div>
        </div>
      </div>

      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search by name, SKU or brand…' }}
        filters={
          <Segmented
            value={bucket}
            onChange={(v) => setBucket(v as StockBucket)}
            options={[
              { label: `All (${buckets.total})`, value: 'all' },
              { label: `Out (${buckets.out})`, value: 'out' },
              { label: `Low (${buckets.low})`, value: 'low' },
              { label: `Healthy (${buckets.healthy})`, value: 'healthy' },
            ]}
          />
        }
        actions={
          <Button size="small" onClick={() => notification.info('Reorder report exported (mock)')}>
            Export Reorder Report
          </Button>
        }
      />
      <Table columns={columns} data={tableData} pageSize={12} size="small" striped highlightOnHover />

      <Modal
        open={!!restock}
        onClose={() => setRestock(null)}
        title={restock ? `Restock — ${restock.name}` : ''}
        footer={null}
        width={420}
      >
        {restock && (
          <Form
            initialValues={{ quantity: 50, supplier: 'primary' }}
            onFinish={(values) => {
              const qty = Number(values.quantity ?? 0)
              setProducts(prev => prev.map(p => p.id === restock.id
                ? { ...p, stock: p.stock + qty, available: p.available + qty }
                : p))
              notification.success(`Added ${qty} units to ${restock.name}`)
              setRestock(null)
            }}
          >
            <Field name="quantity" label="Quantity" rules={[{ required: true }]}>
              <InputNumber min={1} max={1000} style={{ width: '100%' }} />
            </Field>
            <Field name="supplier" label="Supplier">
              <Select options={[
                { label: 'Primary supplier', value: 'primary' },
                { label: 'Backup supplier', value: 'backup' },
                { label: 'Local supplier', value: 'local' },
              ]} />
            </Field>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
              <Button onClick={() => setRestock(null)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Order Restock</Button>
            </div>
          </Form>
        )}
      </Modal>

      <style>{inventoryStyles}</style>
    </>
  )
}

const inventoryStyles = `
.inv-card {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius);
  padding: 12px 14px;
  background: var(--sg-color-bg-container);
}
.inv-card-label {
  font-size: 12px;
  color: var(--sg-color-text-secondary);
  margin-bottom: 4px;
}
.inv-card-value {
  font-size: 22px;
  font-weight: 600;
}
`
