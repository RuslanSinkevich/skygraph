import { useState, useMemo } from 'react'
import {
  Tag,
  Button,
  Input,
  Select,
  Segmented,
  Drawer,
  Modal,
  Form,
  Field,
  InputNumber,
  Cascader,
  Switch,
  Carousel,
  Descriptions,
  Progress,
  Rate,
  notification,
} from '@skygraph/react'
import { products as initial, categories } from './data'
import type { Product } from './data'
import { useFilteredList, money, percent, statusColor, useAppLocale } from '../_shared'
import { emojiForProduct } from './common'

/**
 * REPLACED: previously a 1k-line "mega table" duplicating Table-Kitchen-Sink.
 * Now a product gallery (cards + filters + drawer with image carousel) — a use-case
 * that genuinely showcases retail-style components instead of repeating the table demo.
 */
export function ProductsTab() {
  const lc = useAppLocale('ecommerce')
  const p = lc.products
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
    if (category !== 'all') r = r.filter((p) => p.category === category)
    if (statusFilter !== 'all') r = r.filter((p) => p.status === statusFilter)
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
          placeholder={p.searchPlaceholder}
          value={search}
          onChange={setSearch}
          style={{ width: 220 }}
        />
        <Select
          value={category}
          onChange={(v) => setCategory(String(v))}
          options={[
            { label: p.categoryAll, value: 'all' },
            { label: p.categoryOptions.electronics, value: 'Electronics' },
            { label: p.categoryOptions.clothing, value: 'Clothing' },
            { label: p.categoryOptions.homeGarden, value: 'Home & Garden' },
          ]}
          style={{ width: 180 }}
        />
        <Select
          value={statusFilter}
          onChange={(v) => setStatusFilter(String(v))}
          options={[
            { label: p.statusAll, value: 'all' },
            { label: p.statusOptions.active, value: 'active' },
            { label: p.statusOptions.draft, value: 'draft' },
            { label: p.statusOptions.archived, value: 'archived' },
          ]}
          style={{ width: 140 }}
        />
        <Select
          value={sort}
          onChange={(v) => setSort(String(v))}
          options={[
            { label: p.sortOptions.featured, value: 'featured' },
            { label: p.sortOptions.sold, value: 'sold' },
            { label: p.sortOptions.priceAsc, value: 'price-asc' },
            { label: p.sortOptions.priceDesc, value: 'price-desc' },
            { label: p.sortOptions.rating, value: 'rating' },
          ]}
          style={{ width: 150 }}
        />
        <div className="sc-toolbar-spacer" />
        <Segmented
          value={view}
          onChange={(v) => setView(v as 'grid' | 'list')}
          options={[
            { label: p.views.grid, value: 'grid' },
            { label: p.views.list, value: 'list' },
          ]}
        />
        <Button type="primary" onClick={() => setCreateOpen(true)}>
          {p.addBtn}
        </Button>
      </div>

      <div
        style={{
          marginTop: 8,
          marginBottom: 12,
          fontSize: 12,
          color: 'var(--sg-color-text-secondary)',
        }}
      >
        {p.showing(visible.length, products.length)}
      </div>

      {view === 'grid' ? (
        <div className="prod-grid">
          {visible.map((prod) => (
            <div key={prod.id} className="prod-card" onClick={() => setDetail(prod)}>
              <div className="prod-card-img">
                {emojiForProduct(prod.name, prod.category)}
                {prod.featured && <span className="prod-badge">★ {p.featured}</span>}
                {prod.tags.includes('sale') && (
                  <span className="prod-badge prod-badge--sale">{p.sale}</span>
                )}
              </div>
              <div className="prod-card-body">
                <div className="prod-card-name">{prod.name}</div>
                <div className="prod-card-brand">{prod.brand}</div>
                <div className="prod-card-price">
                  <strong>{money(prod.price)}</strong>
                  <Tag color={statusColor(prod.status)} style={{ fontSize: 10 }}>
                    {lc.products.statusOptions[
                      prod.status as keyof typeof lc.products.statusOptions
                    ] ?? prod.status}
                  </Tag>
                </div>
                <div className="prod-card-meta">
                  <span>⭐ {prod.rating}</span>
                  <span>·</span>
                  <span>
                    {prod.sold.toLocaleString()} {p.soldSuffix}
                  </span>
                  <span>·</span>
                  <span style={{ color: prod.stock < 10 ? 'var(--sg-color-error)' : undefined }}>
                    {prod.stock < 10 ? p.lowStockBadge(prod.stock) : p.inStock(prod.stock)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="prod-list">
          {visible.map((prod) => (
            <div key={prod.id} className="prod-list-row" onClick={() => setDetail(prod)}>
              <div className="prod-list-img">{emojiForProduct(prod.name, prod.category)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="prod-card-name">{prod.name}</div>
                <div className="prod-card-meta">
                  {prod.brand} · ⭐ {prod.rating} · {prod.sold.toLocaleString()} {p.soldSuffix} ·{' '}
                  {prod.tags.join(', ')}
                </div>
              </div>
              <div style={{ width: 100, textAlign: 'right' }}>
                <div style={{ fontWeight: 600 }}>{money(prod.price)}</div>
                <div style={{ fontSize: 11, color: 'var(--sg-color-text-secondary)' }}>
                  {percent(prod.margin)} {p.marginSuffix}
                </div>
              </div>
              <Tag color={statusColor(prod.status)}>
                {lc.products.statusOptions[prod.status as keyof typeof lc.products.statusOptions] ??
                  prod.status}
              </Tag>
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
              <div className="prod-carousel-slide">
                {emojiForProduct(detail.name, detail.category)}
              </div>
              <div className="prod-carousel-slide">📦</div>
              <div className="prod-carousel-slide" style={{ fontSize: 36 }}>
                {detail.featured ? '★' : '🆕'}
              </div>
            </Carousel>

            <Descriptions
              items={[
                { label: p.drawer.sku, children: detail.sku },
                { label: p.drawer.brand, children: detail.brand },
                {
                  label: p.drawer.category,
                  children: `${detail.category} → ${detail.subcategory}`,
                },
                { label: p.drawer.price, children: money(detail.price) },
                { label: p.drawer.cost, children: money(detail.cost) },
                { label: p.drawer.margin, children: percent(detail.margin) },
                { label: p.drawer.stockReserved, children: `${detail.stock} / ${detail.reserved}` },
                { label: p.drawer.available, children: String(detail.available) },
                {
                  label: p.drawer.status,
                  children: (
                    <Tag color={statusColor(detail.status)}>
                      {lc.products.statusOptions[
                        detail.status as keyof typeof lc.products.statusOptions
                      ] ?? detail.status}
                    </Tag>
                  ),
                },
                {
                  label: p.drawer.rating,
                  children: <Rate value={detail.rating} disabled allowHalf />,
                },
                { label: p.drawer.sold, children: detail.sold.toLocaleString() },
                { label: p.drawer.revenue, children: money(detail.revenue) },
              ]}
              column={2}
              size="small"
            />

            <h4>{p.drawer.tagsHeading}</h4>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {detail.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <h4>{p.drawer.stockHealth}</h4>
            <Progress
              percent={Math.min(100, Math.round((detail.stock / 200) * 100))}
              status={detail.stock < 10 ? 'error' : detail.stock < 30 ? 'active' : 'success'}
            />

            <h4>{p.drawer.descriptionHeading}</h4>
            <p style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
              {detail.description}
            </p>
          </div>
        )}
      </Drawer>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title={p.createTitle}
        footer={null}
        width={560}
      >
        <Form
          onFinish={(values) => {
            notification.success(p.createdToast, JSON.stringify(values, null, 2))
            setCreateOpen(false)
          }}
        >
          <Field name="name" label={p.fields.name} rules={[{ required: true }]}>
            <Input placeholder={p.fields.namePh} />
          </Field>
          <Field name="category" label={p.fields.category} rules={[{ required: true }]}>
            <Cascader
              options={categories}
              placeholder={p.fields.categoryPh}
              style={{ width: '100%' }}
            />
          </Field>
          <Field name="brand" label={p.fields.brand}>
            <Select
              options={[
                'SkyTech',
                'NeoBrand',
                'CoreWave',
                'PrimeGear',
                'AlphaLine',
                'ZenCraft',
              ].map((b) => ({ label: b, value: b }))}
              placeholder={p.fields.brandPh}
            />
          </Field>
          <Field name="price" label={p.fields.price} rules={[{ required: true }]}>
            <InputNumber
              placeholder={p.fields.pricePh}
              min={0}
              step={0.01}
              style={{ width: '100%' }}
            />
          </Field>
          <Field name="stock" label={p.fields.stock} rules={[{ required: true }]}>
            <InputNumber placeholder={p.fields.stockPh} min={0} style={{ width: '100%' }} />
          </Field>
          <Field name="featured" label={p.fields.featured}>
            <Switch />
          </Field>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setCreateOpen(false)}>{p.cancel}</Button>
            <Button type="primary" htmlType="submit">
              {p.create}
            </Button>
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
