import { useState, useMemo, useCallback } from 'react'
import {
  Table, Tabs, Tag, Button, Input, Badge, Steps, InputNumber, Select,
  Modal, Drawer, Descriptions, Cascader, Form, Field, Popconfirm,
  Progress, Avatar, Dropdown, Switch,
  notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn, TabItem, SummaryCell } from '@skygraph/react'
import {
  products as rawProducts, orders, categories, customerList,
  orderStatusStep, productToRow, orderToRow, customerToRow,
} from './data'
import type { Product, Order, Customer } from './data'

const statusColors: Record<string, string> = {
  active: 'success', draft: 'warning', archived: 'default',
  pending: 'warning', paid: 'processing', shipped: 'processing', delivered: 'success', cancelled: 'error',
  vip: 'error', inactive: 'default',
}

// ---------------------------------------------------------------------------
// Products Tab — POWER TABLE showcasing every Table prop
// ---------------------------------------------------------------------------
function ProductsTab() {
  const [data, setData] = useState(rawProducts)
  const [search, setSearch] = useState('')
  const [createModal, setCreateModal] = useState(false)
  const [detailDrawer, setDetailDrawer] = useState<Product | null>(null)
  const [selected, setSelected] = useState<string[]>([])

  const [hiddenCols, setHiddenCols] = useState<string[]>(['description', 'sku', 'weight', 'cost', 'reserved'])
  const [columnOrder, setColumnOrder] = useState<string[] | null>(null)
  const [sorts, setSorts] = useState<Array<{ key: string; direction: 'asc' | 'desc' }>>([])
  const [groupBy, setGroupBy] = useState<string | undefined>(undefined)

  const filtered = useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    )
  }, [search, data])

  const tableData = useMemo(() => filtered.map(productToRow), [filtered])

  const pinnedTop = useMemo(() =>
    data.filter(p => p.featured && p.status === 'active').slice(0, 2).map(p => p.id),
  [data])

  const columns: TableColumn[] = useMemo(() => [
    {
      key: 'name',
      title: 'Product',
      width: 260,
      sortable: true,
      resizable: true,
      fixed: 'left' as const,
      ellipsis: true,
      tooltip: 'Product name and featured status',
      copyable: true,
      cellClassName: (_val: unknown, row: Record<string, unknown>) =>
        row.featured ? 'featured-product-cell' : '',
      render: (val: unknown, row: Record<string, unknown>) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 500 }}>📦 {String(val)}</span>
          {row.featured && <Badge count="★" color="gold" />}
        </div>
      ),
    },
    {
      key: 'sku',
      title: 'SKU',
      width: 120,
      sortable: true,
      copyable: true,
      render: (val: unknown) => <code style={{ fontSize: 11 }}>{String(val)}</code>,
    },
    {
      key: 'description',
      title: 'Description',
      width: 200,
      ellipsis: true,
      tooltip: 'Product description',
    },
    {
      key: 'category',
      title: 'Category',
      children: [
        {
          key: 'category',
          title: 'Main',
          width: 130,
          sortable: true,
          resizable: true,
          filters: [
            { text: 'Electronics', value: 'Electronics' },
            { text: 'Clothing', value: 'Clothing' },
            { text: 'Home & Garden', value: 'Home & Garden' },
          ],
          onFilter: (value: unknown, row: Record<string, unknown>) => row.category === value,
          filterMultiple: true,
          filterSearch: true,
        },
        {
          key: 'subcategory',
          title: 'Sub',
          width: 100,
          sortable: true,
        },
      ],
    },
    {
      key: 'brand',
      title: 'Brand',
      width: 110,
      sortable: true,
      resizable: true,
      filters: ['SkyTech', 'NeoBrand', 'CoreWave', 'PrimeGear', 'AlphaLine', 'ZenCraft', 'VoltEdge', 'ProAxis']
        .map(b => ({ text: b, value: b })),
      onFilter: (value: unknown, row: Record<string, unknown>) => row.brand === value,
      filterMultiple: true,
      filterSearch: true,
      filterMode: 'search' as const,
    },
    {
      key: 'pricing',
      title: 'Pricing',
      children: [
        {
          key: 'price',
          title: 'Price',
          width: 100,
          sortable: true,
          align: 'right' as const,
          editable: true,
          resizable: true,
          aggregate: 'avg' as const,
          render: (val: unknown) => `$${Number(val).toFixed(2)}`,
        },
        {
          key: 'cost',
          title: 'Cost',
          width: 90,
          sortable: true,
          align: 'right' as const,
          editable: true,
          aggregate: 'avg' as const,
          render: (val: unknown) => `$${Number(val).toFixed(2)}`,
        },
        {
          key: 'margin',
          title: 'Margin',
          width: 100,
          sortable: true,
          align: 'center' as const,
          render: (val: unknown) => {
            const n = Number(val)
            const color = n > 60 ? 'var(--sg-color-success)' : n > 40 ? undefined : 'var(--sg-color-error)'
            return <span style={{ color, fontWeight: 500 }}>{n.toFixed(1)}%</span>
          },
        },
      ],
    },
    {
      key: 'inventory',
      title: 'Inventory',
      children: [
        {
          key: 'stock',
          title: 'Stock',
          width: 80,
          sortable: true,
          align: 'center' as const,
          editable: true,
          aggregate: 'sum' as const,
          render: (val: unknown) => {
            const n = Number(val)
            return <span style={{ color: n < 10 ? 'var(--sg-color-error)' : n < 30 ? 'var(--sg-color-warning, orange)' : undefined }}>{n}{n < 10 ? ' ⚠️' : ''}</span>
          },
        },
        {
          key: 'reserved',
          title: 'Reserved',
          width: 80,
          sortable: true,
          align: 'center' as const,
          aggregate: 'sum' as const,
        },
        {
          key: 'available',
          title: 'Avail.',
          width: 80,
          sortable: true,
          align: 'center' as const,
          aggregate: 'sum' as const,
          render: (val: unknown) => {
            const n = Number(val)
            return <span style={{ fontWeight: n < 5 ? 700 : 400, color: n < 5 ? 'var(--sg-color-error)' : undefined }}>{n}</span>
          },
        },
      ],
    },
    {
      key: 'status',
      title: 'Status',
      width: 100,
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Draft', value: 'draft' },
        { text: 'Archived', value: 'archived' },
      ],
      onFilter: (value: unknown, row: Record<string, unknown>) => row.status === value,
      render: (val: unknown) => <Tag color={statusColors[String(val)]}>{String(val)}</Tag>,
    },
    {
      key: 'performance',
      title: 'Performance',
      children: [
        {
          key: 'rating',
          title: 'Rating',
          width: 80,
          sortable: true,
          align: 'center' as const,
          aggregate: 'avg' as const,
          render: (val: unknown) => {
            const n = Number(val)
            return <span style={{ color: n >= 4.5 ? 'var(--sg-color-success)' : undefined }}>⭐ {n}</span>
          },
        },
        {
          key: 'reviews',
          title: 'Reviews',
          width: 80,
          sortable: true,
          align: 'center' as const,
          aggregate: 'sum' as const,
          render: (val: unknown) => Number(val).toLocaleString(),
        },
        {
          key: 'sold',
          title: 'Sold',
          width: 80,
          sortable: true,
          align: 'center' as const,
          aggregate: 'sum' as const,
          render: (val: unknown) => Number(val).toLocaleString(),
        },
        {
          key: 'revenue',
          title: 'Revenue',
          width: 120,
          sortable: true,
          align: 'right' as const,
          aggregate: 'sum' as const,
          render: (val: unknown) => `$${Number(val).toLocaleString()}`,
        },
      ],
    },
    {
      key: 'weight',
      title: 'Weight (kg)',
      width: 100,
      sortable: true,
      align: 'right' as const,
      aggregate: 'avg' as const,
      render: (val: unknown) => `${Number(val).toFixed(2)} kg`,
    },
    {
      key: 'tags',
      title: 'Tags',
      width: 180,
      ellipsis: true,
      render: (val: unknown) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {(val as string[])?.map((t: string) => (
            <Tag key={t} color={t === 'bestseller' ? 'success' : t === 'sale' ? 'error' : t === 'new' ? 'processing' : 'default'}
              style={{ fontSize: 10 }}>{t}</Tag>
          ))}
        </div>
      ),
    },
    {
      key: 'dates',
      title: 'Dates',
      children: [
        {
          key: 'createdAt',
          title: 'Created',
          width: 110,
          sortable: true,
        },
        {
          key: 'updatedAt',
          title: 'Updated',
          width: 110,
          sortable: true,
        },
      ],
    },
    {
      key: 'actions',
      title: '',
      width: 100,
      fixed: 'right' as const,
      render: (_: unknown, row: Record<string, unknown>) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button size="small" onClick={() => {
            const p = data.find(x => x.id === String(row.id))
            if (p) setDetailDrawer(p)
          }}>View</Button>
          <Dropdown
            items={[
              { key: 'duplicate', label: 'Duplicate' },
              { key: 'archive', label: 'Archive' },
              { key: 'delete', label: 'Delete', danger: true },
            ]}
            onSelect={(key) => notification.info(`${key}: ${row.name}`)}
          >
            <Button size="small">⋯</Button>
          </Dropdown>
        </div>
      ),
    },
  ], [data])

  const handleCellEdit = useCallback((id: string | number, col: string, val: unknown) => {
    setData(prev => prev.map(p => {
      if (p.id !== id) return p
      const updated = { ...p, [col]: Number(val) }
      if (col === 'price' || col === 'cost') {
        updated.margin = Math.round((1 - updated.cost / updated.price) * 10000) / 100
      }
      if (col === 'stock') {
        updated.available = updated.stock - updated.reserved
      }
      return updated
    }))
    notification.success(`Updated ${col}`)
  }, [])

  const handleRowOrderChange = useCallback((from: number, to: number) => {
    setData(prev => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }, [])

  const summaryFn = useCallback((rows: Array<{ id: string | number; data: Record<string, unknown> }>): SummaryCell[][] => {
    const totalRevenue = rows.reduce((s, r) => s + (Number(r.data.revenue) || 0), 0)
    const totalSold = rows.reduce((s, r) => s + (Number(r.data.sold) || 0), 0)
    const totalStock = rows.reduce((s, r) => s + (Number(r.data.stock) || 0), 0)
    const avgPrice = rows.length ? rows.reduce((s, r) => s + (Number(r.data.price) || 0), 0) / rows.length : 0
    const avgRating = rows.length ? rows.reduce((s, r) => s + (Number(r.data.rating) || 0), 0) / rows.length : 0
    return [[
      { content: `${rows.length} products` },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: `avg $${avgPrice.toFixed(2)}`, align: 'right' },
      { content: '' },
      { content: '' },
      { content: String(totalStock), align: 'center' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: `⭐ ${avgRating.toFixed(1)}`, align: 'center' },
      { content: '' },
      { content: totalSold.toLocaleString(), align: 'center' },
      { content: `$${totalRevenue.toLocaleString()}`, align: 'right' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
    ]]
  }, [])

  return (
    <>
      <div className="sc-toolbar">
        <Input placeholder="Search products..." value={search} onChange={setSearch} style={{ width: 220 }} />
        <Cascader options={categories} placeholder="Category" style={{ width: 200 }} />
        <Select
          value={groupBy ?? '__none__'}
          onChange={(v) => setGroupBy(v === '__none__' ? undefined : v)}
          options={[
            { label: 'No grouping', value: '__none__' },
            { label: 'By Category', value: 'category' },
            { label: 'By Brand', value: 'brand' },
            { label: 'By Status', value: 'status' },
          ]}
          style={{ width: 150 }}
          placeholder="Group by..."
        />
        <div className="sc-toolbar-spacer" />
        {selected.length > 0 && (
          <Tag color="processing">{selected.length} selected</Tag>
        )}
        <Button type="primary" onClick={() => setCreateModal(true)}>+ Add Product</Button>
      </div>

      <Table
        columns={columns}
        data={tableData}

        /* Sizing & appearance */
        size="small"
        bordered
        striped
        highlightOnHover
        sticky

        /* Pagination */
        pageSize={15}
        showPagination
        showSizeChanger
        pageSizeOptions={[10, 15, 25, 50]}
        showQuickJumper
        showTotal={(total, range) => <span style={{ fontSize: 12 }}>{range[0]}–{range[1]} of {total}</span>}

        /* Row numbering */
        showRowNumber={{ title: '#', width: 50, fixed: 'left' }}

        /* Row selection */
        rowSelection={{
          selectedKeys: selected,
          onChange: (keys) => setSelected(keys as string[]),
          type: 'checkbox',
        }}
        selectionSummary
        selectionActions={[
          { key: 'archive', label: 'Archive selected', onClick: () => notification.success(`Archived ${selected.length} products (mock)`) },
          { key: 'delete', label: 'Delete selected', onClick: () => notification.error(`Deleted ${selected.length} products (mock)`), danger: true },
        ]}

        /* Sorting (multi-sort, controlled) */
        multiSort
        sorts={sorts}
        onSortsChange={setSorts}

        /* Inline editing */
        onCellEdit={handleCellEdit}

        /* Expandable rows */
        expandable={{
          expandedRowRender: (row) => {
            const p = data.find(x => x.id === String(row.id))
            if (!p) return null
            return (
              <div style={{ padding: '8px 16px', display: 'flex', gap: 24, fontSize: 13 }}>
                <Descriptions
                  items={[
                    { label: 'SKU', children: p.sku },
                    { label: 'Description', children: p.description },
                    { label: 'Brand', children: p.brand },
                    { label: 'Weight', children: `${p.weight} kg` },
                    { label: 'Featured', children: p.featured ? 'Yes ★' : 'No' },
                    { label: 'Margin', children: `${p.margin.toFixed(1)}%` },
                  ]}
                  column={3}
                  size="small"
                />
              </div>
            )
          },
        }}

        /* Column reorder via drag */
        draggable
        onColumnOrderChange={(order) => setColumnOrder(order)}

        /* Row drag & drop reorder */
        rowDraggable
        onRowOrderChange={handleRowOrderChange}

        /* Column visibility toggle */
        columnVisibility
        hiddenColumns={hiddenCols}
        onHiddenColumnsChange={setHiddenCols}

        /* Column pinning */
        columnPinning

        /* Scroll */
        scroll={{ x: 2200 }}

        /* Summary row */
        summary={summaryFn}

        /* Footer with aggregates */
        footer

        /* Grouping */
        groupBy={groupBy}
        defaultGroupExpanded

        /* Row click */
        onRowClick={(id) => {
          const p = data.find(x => x.id === String(id))
          if (p) setDetailDrawer(p)
        }}

        /* Row styling */
        rowClassName={(row) =>
          Number(row.stock) < 5 ? 'low-stock-row' : row.featured ? 'featured-row' : ''
        }

        /* Pinned rows (featured at top) */
        pinnedRows={{ top: pinnedTop }}

        /* Context menus */
        headerContextMenu={(col) => [
          { key: 'sort-asc', label: `Sort ${col.title} ↑`, onClick: () => notification.info(`Sort ${String(col.title)} ascending`) },
          { key: 'sort-desc', label: `Sort ${col.title} ↓`, onClick: () => notification.info(`Sort ${String(col.title)} descending`) },
          { key: 'div1', label: '', divider: true },
          { key: 'hide', label: `Hide column`, onClick: () => setHiddenCols(prev => [...prev, col.key]) },
        ]}
        cellContextMenu={(id, column, cellData) => [
          { key: 'copy', label: 'Copy value', onClick: () => notification.info(`Copied: ${String(cellData[column])}`) },
          { key: 'filter', label: `Filter by "${String(cellData[column])}"`, onClick: () => notification.info('Filter applied (mock)') },
          { key: 'div', label: '', divider: true },
          { key: 'view', label: 'View product', onClick: () => {
            const p = data.find(x => x.id === String(id))
            if (p) setDetailDrawer(p)
          }},
        ]}

        /* Toolbar features */
        searchable
        exportable
        printable
        exportJSON
        fullscreenable
        densityToggle
        keyboardNavigation
        columnAutoResize

        /* Empty state */
        emptyContent={<div style={{ padding: 40, textAlign: 'center', color: 'var(--sg-color-text-secondary)' }}>No products match your criteria</div>}

        /* Locale */
        locale={{
          search: 'Search in table...',
          filterConfirm: 'Apply',
          filterReset: 'Reset',
          sortAsc: 'Sort ascending',
          sortDesc: 'Sort descending',
          cancelSort: 'Cancel sort',
          emptyText: 'No data',
          selectAll: 'Select all',
          selectInvert: 'Invert',
          selectionAll: 'All data',
          expand: 'Expand',
          collapse: 'Collapse',
          triggerAsc: 'Click to sort ascending',
          triggerDesc: 'Click to sort descending',
          cancelTrigger: 'Click to cancel sort',
          columns: 'Columns',
          density: 'Density',
          densityDefault: 'Default',
          densityMiddle: 'Medium',
          densitySmall: 'Compact',
          fullscreen: 'Fullscreen',
          exitFullscreen: 'Exit fullscreen',
          reload: 'Reload',
          export: 'Export',
          exportCSV: 'Export CSV',
          exportJSON: 'Export JSON',
          print: 'Print',
          pinLeft: 'Pin left',
          pinRight: 'Pin right',
          unpin: 'Unpin',
          sum: 'Sum',
          avg: 'Avg',
          count: 'Count',
          min: 'Min',
          max: 'Max',
          totalRows: (total: number) => `${total} rows`,
          selectedRows: (count: number) => `${count} selected`,
        }}
      />

      {/* Product Detail Drawer */}
      <Drawer
        open={!!detailDrawer}
        onClose={() => setDetailDrawer(null)}
        title={detailDrawer?.name ?? ''}
        width={500}
      >
        {detailDrawer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ textAlign: 'center', fontSize: 48 }}>📦</div>
            <Descriptions
              items={[
                { label: 'SKU', children: detailDrawer.sku },
                { label: 'Brand', children: detailDrawer.brand },
                { label: 'Category', children: `${detailDrawer.category} → ${detailDrawer.subcategory}` },
                { label: 'Price', children: `$${detailDrawer.price.toFixed(2)}` },
                { label: 'Cost', children: `$${detailDrawer.cost.toFixed(2)}` },
                { label: 'Margin', children: `${detailDrawer.margin.toFixed(1)}%` },
                { label: 'Stock / Reserved', children: `${detailDrawer.stock} / ${detailDrawer.reserved}` },
                { label: 'Available', children: String(detailDrawer.available) },
                { label: 'Status', children: <Tag color={statusColors[detailDrawer.status]}>{detailDrawer.status}</Tag> },
                { label: 'Rating', children: `⭐ ${detailDrawer.rating} (${detailDrawer.reviews} reviews)` },
                { label: 'Sold', children: detailDrawer.sold.toLocaleString() },
                { label: 'Revenue', children: `$${detailDrawer.revenue.toLocaleString()}` },
                { label: 'Weight', children: `${detailDrawer.weight} kg` },
                { label: 'Featured', children: detailDrawer.featured ? 'Yes ★' : 'No' },
                { label: 'Created', children: detailDrawer.createdAt },
                { label: 'Updated', children: detailDrawer.updatedAt },
              ]}
              column={2}
              size="small"
            />
            <h4>Tags</h4>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {detailDrawer.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
            <h4>Stock Health</h4>
            <Progress
              percent={Math.min(100, Math.round((detailDrawer.stock / 200) * 100))}
              status={detailDrawer.stock < 10 ? 'error' : detailDrawer.stock < 30 ? 'active' : 'success'}
            />
            <h4>Description</h4>
            <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>{detailDrawer.description}</div>
          </div>
        )}
      </Drawer>

      {/* Create Product Modal */}
      <Modal
        open={createModal}
        onClose={() => setCreateModal(false)}
        title="Add New Product"
        footer={null}
        width={560}
      >
        <Form onFinish={(values) => {
          notification.success('Product created (mock)', JSON.stringify(values, null, 2))
          setCreateModal(false)
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
          <Field name="cost" label="Cost ($)">
            <InputNumber placeholder="12.00" min={0} step={0.01} style={{ width: '100%' }} />
          </Field>
          <Field name="stock" label="Initial Stock" rules={[{ required: true }]}>
            <InputNumber placeholder="100" min={0} style={{ width: '100%' }} />
          </Field>
          <Field name="status" label="Status">
            <Select
              options={[{ label: 'Active', value: 'active' }, { label: 'Draft', value: 'draft' }]}
              placeholder="Select status"
            />
          </Field>
          <Field name="featured" label="Featured">
            <Switch />
          </Field>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setCreateModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Create Product</Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}

// ---------------------------------------------------------------------------
// Orders Tab
// ---------------------------------------------------------------------------
function OrdersTab() {
  const [orderDetail, setOrderDetail] = useState<Order | null>(null)
  const [refundModal, setRefundModal] = useState<Order | null>(null)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return orders
    const q = search.toLowerCase()
    return orders.filter(o => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q))
  }, [search])

  const tableData = useMemo(() => filtered.map(orderToRow), [filtered])

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
      <div className="sc-toolbar">
        <Input placeholder="Search orders..." value={search} onChange={setSearch} style={{ width: 240 }} />
        <div className="sc-toolbar-spacer" />
        <Button size="small" onClick={() => notification.info('Export orders (mock)')}>Export CSV</Button>
      </div>
      <Table
        columns={columns}
        data={tableData}
        pageSize={10}
        size="small"
        bordered
        striped
        highlightOnHover
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
        summary={(rows) => {
          const totalRev = rows.reduce((s, r) => s + (Number(r.data.total) || 0), 0)
          const totalItems = rows.reduce((s, r) => s + (Number(r.data.itemCount) || 0), 0)
          return [[
            { content: 'Page Total' },
            { content: '' },
            { content: `$${totalRev.toFixed(2)}`, align: 'right' as const },
            { content: '' },
            { content: '' },
            { content: String(totalItems), align: 'center' as const },
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
                { label: 'Total', children: `$${orderDetail.total.toFixed(2)}` },
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
                  <span style={{ width: 80, textAlign: 'right' }}>${it.price.toFixed(2)}</span>
                  <span style={{ width: 80, textAlign: 'right', fontWeight: 500 }}>${(it.price * it.qty).toFixed(2)}</span>
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
                { label: 'Order Total', children: `$${refundModal.total.toFixed(2)}` },
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

// ---------------------------------------------------------------------------
// Customers Tab
// ---------------------------------------------------------------------------
function CustomersTab() {
  const [search, setSearch] = useState('')
  const [customerDrawer, setCustomerDrawer] = useState<Customer | null>(null)

  const filtered = useMemo(() => {
    if (!search) return customerList
    const q = search.toLowerCase()
    return customerList.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
  }, [search])

  const tableData = useMemo(() => filtered.map(customerToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Customer', width: 200, sortable: true,
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar size="small">{String(val).split(' ').map(w => w[0]).join('')}</Avatar>
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
        <Tag color={statusColors[String(val)]}>
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
      render: (val) => `$${Number(val).toLocaleString()}`,
    },
    {
      key: 'avgOrderValue', title: 'AOV', width: 90, sortable: true, align: 'right',
      render: (val) => `$${Number(val).toFixed(0)}`,
    },
    { key: 'lastOrder', title: 'Last Order', width: 110, sortable: true },
    { key: 'registeredAt', title: 'Registered', width: 110, sortable: true },
    {
      key: 'actions', title: '', width: 80,
      render: (_, row) => (
        <Button size="small" onClick={() => {
          const c = customerList.find(x => x.id === String(row.id))
          if (c) setCustomerDrawer(c)
        }}>View</Button>
      ),
    },
  ]

  return (
    <>
      <div className="sc-toolbar">
        <Input placeholder="Search customers..." value={search} onChange={setSearch} style={{ width: 240 }} />
        <div className="sc-toolbar-spacer" />
        <Button size="small" onClick={() => notification.info('Export customers (mock)')}>Export</Button>
      </div>
      <Table columns={columns} data={tableData} pageSize={10} size="small" striped highlightOnHover />

      <Drawer
        open={!!customerDrawer}
        onClose={() => setCustomerDrawer(null)}
        title={customerDrawer?.name ?? ''}
        width={480}
      >
        {customerDrawer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar size="large">{customerDrawer.name.split(' ').map(w => w[0]).join('')}</Avatar>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{customerDrawer.name}</div>
                <Tag color={statusColors[customerDrawer.status]}>
                  {customerDrawer.status === 'vip' ? '⭐ VIP' : customerDrawer.status}
                </Tag>
              </div>
            </div>
            <Descriptions
              items={[
                { label: 'Email', children: customerDrawer.email },
                { label: 'Registered', children: customerDrawer.registeredAt },
                { label: 'Total Orders', children: String(customerDrawer.totalOrders) },
                { label: 'Total Spent', children: `$${customerDrawer.totalSpent.toLocaleString()}` },
                { label: 'Avg Order Value', children: `$${customerDrawer.avgOrderValue.toFixed(0)}` },
                { label: 'Last Order', children: customerDrawer.lastOrder },
              ]}
              column={1}
              size="small"
            />
            <h4>Order History</h4>
            {orders.filter(o => o.customer === customerDrawer.name).slice(0, 8).map(o => (
              <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--sg-color-border-secondary)', fontSize: 13 }}>
                <span style={{ fontFamily: 'monospace' }}>{o.id}</span>
                <span>${o.total.toFixed(2)}</span>
                <Tag color={statusColors[o.status]}>{o.status}</Tag>
                <span style={{ color: 'var(--sg-color-text-secondary)' }}>{o.date}</span>
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </>
  )
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
function StatsRow() {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const pending = orders.filter(o => o.status === 'pending').length
  const activeProducts = rawProducts.filter(p => p.status === 'active').length
  const lowStock = rawProducts.filter(p => p.stock < 10).length
  const vipCustomers = customerList.filter(c => c.status === 'vip').length
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
        <div className="stat-card-sub">of {rawProducts.length} total</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Low Stock</div>
        <div className="stat-card-value" style={{ color: lowStock > 0 ? 'var(--sg-color-error)' : undefined }}>{lowStock}</div>
        <div className="stat-card-sub">below 10 units</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">VIP Customers</div>
        <div className="stat-card-value">{vipCustomers}</div>
        <div className="stat-card-sub">of {customerList.length} total</div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
export function EcommerceApp() {
  const [activeTab, setActiveTab] = useState('products')

  const tabs: TabItem[] = [
    { key: 'products', label: 'Products', children: <ProductsTab /> },
    { key: 'orders', label: 'Orders', children: <OrdersTab /> },
    { key: 'customers', label: 'Customers', children: <CustomersTab /> },
  ]

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <StatsRow />
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  )
}
