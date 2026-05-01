import { useState, useMemo } from 'react'
import {
  Table, Badge, Button, Drawer, Descriptions, Rate, Progress,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { topProducts } from './data'
import type { ProductMetric } from './data'
import { money, num, percent } from '../_shared'

function productToRow(p: ProductMetric) {
  return { id: String(p.id), data: p as unknown as Record<string, unknown> }
}

export function ProductsTab() {
  const [detail, setDetail] = useState<ProductMetric | null>(null)
  const tableData = useMemo(() => topProducts.map(productToRow), [])

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Product', width: 220, sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>{String(val)}</span>,
    },
    {
      key: 'unitsSold', title: 'Units Sold', width: 100, sortable: true,
      render: (val) => num(Number(val)),
    },
    {
      key: 'revenue', title: 'Revenue', width: 110, sortable: true, align: 'right',
      render: (val) => money(Number(val)),
    },
    {
      key: 'rating', title: 'Rating', width: 180, sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Rate value={Number(val)} disabled allowHalf count={5} />
          <span style={{ fontSize: 12 }}>{String(val)}</span>
        </div>
      ),
    },
    {
      key: 'returnRate', title: 'Return Rate', width: 120, sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: Number(val) > 3 ? 'var(--sg-color-error)' : undefined }}>
            {percent(Number(val), 1)}
          </span>
          {Number(val) > 3 && <Badge count={1} color="red" />}
        </div>
      ),
    },
    {
      key: 'actions', title: '', width: 80,
      render: (_, row) => (
        <Button size="small" onClick={() => {
          const p = topProducts.find(x => String(x.id) === String(row.id))
          if (p) setDetail(p)
        }}>Details</Button>
      ),
    },
  ]

  return (
    <>
      <Table columns={columns} data={tableData} size="small" />

      <Drawer open={!!detail} onClose={() => setDetail(null)} title={detail?.name ?? ''} width={420}>
        {detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Descriptions
              items={[
                { label: 'Product', children: detail.name },
                { label: 'Units Sold', children: num(detail.unitsSold) },
                { label: 'Revenue', children: money(detail.revenue) },
                { label: 'Avg Price', children: money(detail.revenue / detail.unitsSold) },
                { label: 'Rating', children: `⭐ ${detail.rating}` },
                { label: 'Return Rate', children: percent(detail.returnRate, 1) },
              ]}
              column={1}
              size="small"
            />
            <h4>Rating</h4>
            <Rate value={detail.rating} disabled allowHalf count={5} />
            <h4>Return Rate Health</h4>
            <Progress
              percent={detail.returnRate * 10}
              status={detail.returnRate > 3 ? 'error' : detail.returnRate > 2 ? 'active' : 'success'}
            />
          </div>
        )}
      </Drawer>
    </>
  )
}
