import { useMemo, useState } from 'react'
import { Table, Avatar, Button } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { generateMessages } from './_data/generators'

/**
 * Virtualised message log with **dynamic** row heights — short / long
 * messages alternate, so the engine asks `rowHeight(row)` for each one and
 * uses `estimateRowHeight()` for off-screen rows it has not measured yet.
 *
 * `Load more` appends another batch of 1000 rows; virtualisation keeps the
 * mounted-DOM count flat (≈ visible viewport + overscan) while the
 * underlying dataset grows past 4000.
 */
export function VirtualDynamicTable() {
  const [data, setData] = useState(() => generateMessages(3000, 0))

  const columns: TableColumn[] = useMemo(
    () => [
      { key: 'id', title: '#', width: 80, align: 'right' },
      {
        key: 'author',
        title: 'Author',
        width: 200,
        render: (v) => (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Avatar size={28} aria-label={String(v)}>
              {String(v).slice(0, 1).toUpperCase()}
            </Avatar>
            <span>{String(v)}</span>
          </span>
        ),
      },
      {
        key: 'preview',
        title: 'Preview',
        // No width = takes remaining horizontal space; cell wraps freely.
        render: (v, row) => (
          <span
            style={{
              display: 'block',
              whiteSpace: 'normal',
              lineHeight: 1.45,
              color: row.long
                ? 'var(--sg-color-text)'
                : 'var(--sg-color-text-secondary)',
            }}
          >
            {String(v)}
          </span>
        ),
      },
      { key: 'timestamp', title: 'Time', width: 150, align: 'right' },
    ],
    [],
  )

  const loadMore = () => {
    setData((prev) => [
      ...prev,
      ...generateMessages(1000, prev.length, 0x123456),
    ])
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 12,
        }}
      >
        <Button size="small" type="primary" onClick={loadMore}>
          Load more (+1000)
        </Button>
        <span style={{ color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
          Total rows: <strong>{data.length}</strong>. Mounted DOM stays
          ≈viewport + overscan thanks to virtualisation.
        </span>
      </div>
      <Table
        columns={columns}
        data={data}
        pageSize={data.length}
        showPagination={false}
        bordered
        virtual={{
          rowHeight: (row) => (row.long ? 120 : 48),
          estimateRowHeight: () => 64,
          height: 600,
          overscan: 5,
        }}
      />
    </div>
  )
}
