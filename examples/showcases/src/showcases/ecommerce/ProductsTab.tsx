import { useState, useMemo } from 'react'
import {
  Tag, Button, Input, Select, Segmented, Drawer, Modal,
  Form, Field, InputNumber, Cascader, Switch, Carousel, Descriptions, Progress, Rate, notification,
} from '@skygraph/react'
import { products as initial, categories } from './data'
import type { Product } from './data'
import { useFilteredList, money, percent, statusColor } from '../_shared'
import { emojiForProduct } from './common'

/**
 * REPLACED: previously a 1k-line "mega table" duplicating Table-Kitchen-Sink.
 * Now a product gallery (cards + filters + drawer with image carousel) — a use-case
 * that genuinely showcases retail-style components instead of repeating the table demo.
 */
export function ProductsTab() {
  const [products] = useState(initial)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sort, setSort] = useState<string>('featured')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [detail, setDetail] = useState<Product | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  const filtered = useFilteredList(products, search, ['name', 'sku', 'brand'])

  const visible = useMemo(() => {
    let r = filtered
    if (category !== 'all') r = r.filter(p => p.category === category)
    if (statusFilter !== 'all') r = r.filter(p => p.status === statusFilter)
    return [...r].sort((a, b) => {
      if (sort === 'featured') {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        return b.sold - a.sold
      }
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return b.sold - a.sold
    })
  }, [filtered, category, statusFilter, sort])

  return (
    <>
      <div className="sc-toolbar" style={{ flexWrap: 'wrap', gap: 12 }}>
        <Input
          placeholder="Search products…"
          value={search}
          onChange={setSearch}
          style={{ width: 220 }}
        />
        <Select
          value={category}
          onChange={(v) => setCategory(String(v))}
          options={[
            { label: 'All categories', value: 'all' },
            { label: 'Electronics', value: 'Electronics' },
            { label: 'Clothing', value: 'Clothing' },
            { label: 'Home & Garden', value: 'Home & Garden' },
          ]}
          style={{ width: 180 }}
        />
        <Select
          value={statusFilter}
          onChange={(v) => setStatusFilter(String(v))}
          options={[
            { label: 'All status', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Draft', value: 'draft' },
            { label: 'Archived', value: 'archived' },
          ]}
          style={{ width: 140 }}
        />
        <Select
          value={sort}
          onChange={(v) => setSort(String(v))}
          options={[
            { label: 'Featured', value: 'featured' },
            { label: 'Top sellers', value: 'sold' },
            { label: 'Price ↑', value: 'price-asc' },
            { label: 'Price ↓', value: 'price-desc' },
            { label: 'Highest rated', value: 'rating' },
          ]}
          style={{ width: 150 }}
        />
        <div className="sc-toolbar-spacer" />
        <Segmented
          value={view}
          onChange={(v) => setView(v as 'grid' | 'list')}
          options={[
            { label: 'Grid', value: 'grid' },
            { label: 'List', value: 'list' },
          ]}
        />
        <Button type="primary" onClick={() => setCreateOpen(true)}>+ Add Product</Button>
      </div>

      <div style={{ marginTop: 8, marginBottom: 12, fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        Showing <strong>{visible.length}</strong> of {products.length} products
      </div>

      {view === 'grid' ? (
        <div className="prod-grid">
          {visible.map(p => (
            <div key={p.id} className="prod-card" onClick={() => setDetail(p)}>
              <div className="prod-card-img">
                {emojiForProduct(p.name, p.category)}
                {p.featured && <span className="prod-badge">★ Featured</span>}
                {p.tags.includes('sale') && <span className="prod-badge prod-badge--sale">SALE</span>}
              </div>
              <div className="prod-card-body">
                <div className="prod-card-name">{p.name}</div>
                <div className="prod-card-brand">{p.brand}</div>
                <div className="prod-card-price">
                  <strong>{money(p.price)}</strong>
                  <Tag color={statusColor(p.status)} style={{ fontSize: 10 }}>{p.status}</Tag>
                </div>
                <div className="prod-card-meta">
                  <span>⭐ {p.rating}</span>
                  <span>·</span>
                  <span>{p.sold.toLocaleString()} sold</span>
                  <span>·</span>
                  <span style={{ color: p.stock < 10 ? 'var(--sg-color-error)' : undefined }}>
                    {p.stock < 10 ? `Low stock (${p.stock})` : `${p.stock} in stock`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="prod-list">
          {visible.map(p => (
            <div key={p.id} className="prod-list-row" onClick={() => setDetail(p)}>
              <div className="prod-list-img">{emojiForProduct(p.name, p.category)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="prod-card-name">{p.name}</div>
                <div className="prod-card-meta">
                  {p.brand} · ⭐ {p.rating} · {p.sold.toLocaleString()} sold · {p.tags.join(', ')}
                </div>
              </div>
              <div style={{ width: 100, textAlign: 'right' }}>
                <div style={{ fontWeight: 600 }}>{money(p.price)}</div>
                <div style={{ fontSize: 11, color: 'var(--sg-color-text-secondary)' }}>{percent(p.margin)} margin</div>
              </div>
              <Tag color={statusColor(p.status)}>{p.status}</Tag>
            </div>
          ))}
        </div>
      )}

      <Drawer
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail?.name ?? ''}
        width={520}
      >
        {detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Carousel
              autoplay={false}
              dots
              style={{ background: 'var(--sg-color-bg-secondary)', borderRadius: 8 }}
            >
              <div className="prod-carousel-slide">{emojiForProduct(detail.name, detail.category)}</div>
              <div className="prod-carousel-slide">📦</div>
              <div className="prod-carousel-slide" style={{ fontSize: 36 }}>
                {detail.featured ? '★' : '🆕'}
              </div>
            </Carousel>

            <Descriptions
              items={[
                { label: 'SKU', children: detail.sku },
                { label: 'Brand', children: detail.brand },
                { label: 'Category', children: `${detail.category} → ${detail.subcategory}` },
                { label: 'Price', children: money(detail.price) },
                { label: 'Cost', children: money(detail.cost) },
                { label: 'Margin', children: percent(detail.margin) },
                { label: 'Stock / Reserved', children: `${detail.stock} / ${detail.reserved}` },
                { label: 'Available', children: String(detail.available) },
                { label: 'Status', children: <Tag color={statusColor(detail.status)}>{detail.status}</Tag> },
                { label: 'Rating', children: <Rate value={detail.rating} disabled allowHalf /> },
                { label: 'Sold', children: detail.sold.toLocaleString() },
                { label: 'Revenue', children: money(detail.revenue) },
              ]}
              column={2}
              size="small"
            />

            <h4>Tags</h4>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {detail.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>

            <h4>Stock Health</h4>
            <Progress
              percent={Math.min(100, Math.round((detail.stock / 200) * 100))}
              status={detail.stock < 10 ? 'error' : detail.stock < 30 ? 'active' : 'success'}
            />

            <h4>Description</h4>
            <p style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>{detail.description}</p>
          </div>
        )}
      </Drawer>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Add New Product" footer={null} width={560}>
        <Form onFinish={(values) => {
          notification.success('Product created (mock)', JSON.stringify(values, null, 2))
          setCreateOpen(false)
        }}>
          <Field name="name" label="Product Name" rules={[{ required: true }]}>
            <Input placeholder="Wireless Earbuds Pro" />
          </Field>
          <Field name="category" label="Category" rules={[{ required: true }]}>
            <Cascader options={categories} placeholder="Select category" style={{ width: '100%' }} />
          </Field>
          <Field name="brand" label="Brand">
            <Select
              options={['SkyTech', 'NeoBrand', 'CoreWave', 'PrimeGear', 'AlphaLine', 'ZenCraft'].map(b => ({ label: b, value: b }))}
              placeholder="Select brand"
            />
          </Field>
          <Field name="price" label="Price ($)" rules={[{ required: true }]}>
            <InputNumber placeholder="29.99" min={0} step={0.01} style={{ width: '100%' }} />
          </Field>
          <Field name="stock" label="Initial Stock" rules={[{ required: true }]}>
            <InputNumber placeholder="100" min={0} style={{ width: '100%' }} />
          </Field>
          <Field name="featured" label="Featured">
            <Switch />
          </Field>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Create Product</Button>
          </div>
        </Form>
      </Modal>

      <style>{productsStyles}</style>
    </>
  )
}

const productsStyles = `
.prod-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}
.prod-card {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 10px;
  background: var(--sg-color-bg);
  cursor: pointer;
  transition: all 0.15s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.prod-card:hover {
  border-color: var(--sg-color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.prod-card-img {
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  background: linear-gradient(135deg, var(--sg-color-bg-secondary), color-mix(in srgb, var(--sg-color-primary) 6%, transparent));
  position: relative;
}
.prod-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--sg-color-warning, gold);
  color: #fff;
}
.prod-badge--sale {
  left: auto;
  right: 8px;
  background: var(--sg-color-error, red);
}
.prod-card-body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.prod-card-name {
  font-weight: 500;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.prod-card-brand {
  font-size: 11px;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.prod-card-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  font-size: 14px;
}
.prod-card-meta {
  display: flex;
  gap: 6px;
  font-size: 11px;
  color: var(--sg-color-text-secondary);
  flex-wrap: wrap;
}

.prod-list {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 8px;
  overflow: hidden;
}
.prod-list-row {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  cursor: pointer;
  transition: background 0.12s;
}
.prod-list-row:last-child {
  border-bottom: none;
}
.prod-list-row:hover {
  background: var(--sg-color-bg-hover);
}
.prod-list-img {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--sg-color-bg-secondary);
  font-size: 28px;
  flex-shrink: 0;
}

.prod-carousel-slide {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
}
`
