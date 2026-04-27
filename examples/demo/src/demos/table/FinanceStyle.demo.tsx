import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { portfolio } from './data'
import './styles.css'

/**
 * "Stock terminal" look built purely from public props:
 *   - `classNames.root` enables tabular-num font + denser padding
 *   - ticker cell is a monospaced chip via `render`
 *   - delta / percent cells get green or red class based on sign
 *   - numbers are right-aligned and formatted with Intl.NumberFormat
 *
 * No CSS overrides on internal selectors — everything is slots + render.
 */
const priceFmt = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const volumeFmt = new Intl.NumberFormat('en-US', { notation: 'compact' })

export function FinanceStyleTable() {
  const columns: TableColumn[] = [
    {
      key: 'ticker',
      title: 'Ticker',
      width: 110,
      render: (v) => <span className="demo-ticker">{String(v)}</span>,
    },
    { key: 'name', title: 'Company', width: 200 },
    {
      key: 'price',
      title: 'Last',
      width: 100,
      align: 'right',
      sortable: true,
      render: (v) => priceFmt.format(Number(v)),
    },
    {
      key: 'delta',
      title: 'Change',
      width: 110,
      align: 'right',
      sortable: true,
      render: (v) => {
        const n = Number(v)
        const cls = n >= 0 ? 'demo-delta-up' : 'demo-delta-down'
        return <span className={cls}>{priceFmt.format(Math.abs(n))}</span>
      },
    },
    {
      key: 'pct',
      title: '%',
      width: 100,
      align: 'right',
      sortable: true,
      render: (v) => {
        const n = Number(v)
        const cls = n >= 0 ? 'demo-delta-up' : 'demo-delta-down'
        return <span className={cls}>{priceFmt.format(Math.abs(n))}%</span>
      },
    },
    {
      key: 'volume',
      title: 'Volume',
      width: 110,
      align: 'right',
      sortable: true,
      render: (v) => volumeFmt.format(Number(v)),
    },
  ]

  return (
    <Table
      columns={columns}
      data={portfolio}
      showPagination={false}
      classNames={{ root: 'demo-finance-root' }}
    />
  )
}
