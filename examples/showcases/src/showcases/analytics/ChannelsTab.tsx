import { useState, useMemo } from 'react'
import {
  Table, Tag, Progress, Button, Drawer, Descriptions,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { channelMetrics } from './data'
import type { ChannelMetric } from './data'
import { money, num, percent, renderTrend } from '../_shared'

function channelToRow(c: ChannelMetric) {
  return { id: c.channel, data: c as unknown as Record<string, unknown> }
}

export function ChannelsTab() {
  const [detail, setDetail] = useState<ChannelMetric | null>(null)
  const tableData = useMemo(() => channelMetrics.map(channelToRow), [])

  const columns: TableColumn[] = [
    {
      key: 'channel', title: 'Channel', width: 160, sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>{String(val)}</span>,
    },
    {
      key: 'visitors', title: 'Visitors', width: 100, sortable: true,
      render: (val) => num(Number(val)),
    },
    {
      key: 'revenue', title: 'Revenue', width: 110, sortable: true, align: 'right',
      render: (val) => money(Number(val)),
    },
    {
      key: 'conversion', title: 'Conversion', width: 160, sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Progress percent={Number(val) * 15} showInfo={false} style={{ width: 80 }}
            status={Number(val) >= 4 ? 'success' : 'active'} />
          <span>{percent(Number(val), 1)}</span>
        </div>
      ),
    },
    { key: 'trend', title: 'Trend', width: 120, render: (val) => <>{renderTrend(val)}</> },
    {
      key: 'actions', title: '', width: 80,
      render: (_, row) => (
        <Button size="small" onClick={() => {
          const c = channelMetrics.find(x => x.channel === String(row.channel))
          if (c) setDetail(c)
        }}>Details</Button>
      ),
    },
  ]

  const totalVisitors = channelMetrics.reduce((s, c) => s + c.visitors, 0)
  const totalRevenue = channelMetrics.reduce((s, c) => s + c.revenue, 0)

  return (
    <>
      <Descriptions
        title="Channel Summary"
        items={[
          { label: 'Total Visitors', children: num(totalVisitors) },
          { label: 'Total Revenue', children: money(totalRevenue) },
          { label: 'Top Channel', children: 'Organic Search' },
          { label: 'Best Conversion', children: 'Email (5.2%)' },
        ]}
        column={2}
        size="small"
        style={{ marginBottom: 20 }}
      />
      <Table columns={columns} data={tableData} size="small" />

      <Drawer open={!!detail} onClose={() => setDetail(null)} title={detail?.channel ?? ''} width={400}>
        {detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Descriptions
              items={[
                { label: 'Channel', children: detail.channel },
                { label: 'Visitors', children: num(detail.visitors) },
                { label: 'Revenue', children: money(detail.revenue) },
                { label: 'Conversion', children: percent(detail.conversion, 1) },
                { label: 'Trend', children: <Tag color={detail.trend === 'up' ? 'success' : detail.trend === 'down' ? 'error' : 'default'}>{detail.trend}</Tag> },
                { label: 'Revenue/Visitor', children: money(detail.revenue / detail.visitors) },
              ]}
              column={1}
              size="small"
            />
            <h4>Traffic Share</h4>
            <Progress percent={Math.round((detail.visitors / totalVisitors) * 100)} status="active" />
            <h4>Revenue Share</h4>
            <Progress percent={Math.round((detail.revenue / totalRevenue) * 100)} status="success" />
          </div>
        )}
      </Drawer>
    </>
  )
}
