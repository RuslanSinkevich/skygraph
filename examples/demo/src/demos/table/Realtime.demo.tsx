import { useEffect, useRef, useState } from 'react'
import { Table, Tag } from '@skygraph/react'
import type { TableColumn, RowId } from '@skygraph/react'
import { generateTickers, mulberry32 } from './_data/generators'
import './styles.css'

type TickerRow = { id: RowId; data: Record<string, unknown> }

/**
 * 100 ticker rows mutated every 1.5s — 3 to 5 rows pick up a fresh price
 * and (occasionally) a new status. The price cell re-keys per value, so
 * the CSS keyframe `demo-rt-flash-up` / `down` plays once on each change.
 *
 * Sorting and filtering live inside the table; updating `data` doesn't
 * reset them because the engine keys rows by id and only swaps cell
 * contents.
 */
export function RealtimeTable() {
  const [data, setData] = useState<TickerRow[]>(() => generateTickers(100))
  // Last-seen price per row so we can colour the flash up vs. down.
  const prevPriceRef = useRef<Record<string, number>>({})

  useEffect(() => {
    const rng = mulberry32(0xfeedfa)
    const interval = window.setInterval(() => {
      setData((rows) => {
        const updateCount = 3 + Math.floor(rng() * 3)
        const indices = new Set<number>()
        while (indices.size < updateCount) {
          indices.add(Math.floor(rng() * rows.length))
        }
        return rows.map((row, i) => {
          if (!indices.has(i)) return row
          const prev = Number(row.data.price)
          prevPriceRef.current[String(row.id)] = prev
          const drift = rng() * 6 - 3
          const next = Math.max(1, Math.round((prev + drift) * 100) / 100)
          const flipStatus = rng() < 0.18
          const nextStatus = flipStatus
            ? rng() < 0.5
              ? 'active'
              : rng() < 0.5
                ? 'paused'
                : 'halted'
            : row.data.status
          return {
            ...row,
            data: { ...row.data, price: next, status: nextStatus },
          }
        })
      })
    }, 1500)
    return () => window.clearInterval(interval)
  }, [])

  const columns: TableColumn[] = [
    { key: 'id', title: '#', width: 70, align: 'right', sortable: true },
    { key: 'ticker', title: 'Ticker', width: 120, sortable: true },
    {
      key: 'price',
      title: 'Price',
      width: 140,
      align: 'right',
      sortable: true,
      filterMode: 'advanced',
      advancedFilterType: 'number',
      advancedFilterOperators: ['lt', 'lte', 'gt', 'gte', 'between'],
      render: (v, row) => {
        const value = Number(v)
        const prev = prevPriceRef.current[String(row.id)] ?? value
        const dir = value > prev ? 'up' : value < prev ? 'down' : null
        return (
          <span
            key={value}
            className={dir ? `demo-rt-price demo-rt-price-${dir}` : 'demo-rt-price'}
          >
            ${value.toFixed(2)}
          </span>
        )
      },
    },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      filters: [
        { text: 'active', value: 'active' },
        { text: 'paused', value: 'paused' },
        { text: 'halted', value: 'halted' },
      ],
      onFilter: (v, row) => row.status === v,
      render: (v) => (
        <Tag
          color={
            v === 'active' ? 'success' : v === 'paused' ? 'warning' : 'error'
          }
        >
          {String(v)}
        </Tag>
      ),
    },
    {
      key: 'volume',
      title: 'Volume',
      width: 140,
      align: 'right',
      sortable: true,
      render: (v) => Number(v).toLocaleString(),
    },
  ]

  return (
    <Table
      columns={columns}
      data={data}
      pageSize={data.length}
      showPagination={false}
      bordered
      sticky
      virtual={{ rowHeight: 40, height: 480 }}
    />
  )
}
