import { useState, useMemo } from 'react'
import {
  Table, Tag, Badge, Button, Select, Descriptions, notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { auditLog, auditToRow } from './data'
import { Toolbar } from '../_shared'
import { severityColors } from './common'

export function AuditTab() {
  const [severity, setSeverity] = useState<string>('all')

  const filtered = useMemo(
    () => severity === 'all' ? auditLog : auditLog.filter(l => l.severity === severity),
    [severity],
  )

  const tableData = useMemo(() => filtered.map(auditToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'severity', title: '', width: 40, align: 'center',
      render: (val) => (
        <span
          style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            lineHeight: '16px',
            textAlign: 'center',
            fontSize: 11,
            color: '#fff',
            background: val === 'critical' ? 'var(--sg-color-error, red)' : val === 'warning' ? 'var(--sg-color-warning, orange)' : 'var(--sg-color-text-tertiary, gray)',
            borderRadius: 8,
          }}
        >
          {val === 'critical' ? '!' : val === 'warning' ? '⚠' : '·'}
        </span>
      ),
    },
    { key: 'timestamp', title: 'Time', width: 160, sortable: true },
    {
      key: 'userName', title: 'User', width: 140, sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>{String(val)}</span>,
    },
    {
      key: 'action', title: 'Action', width: 170, sortable: true,
      render: (val) => (
        <code style={{ fontSize: 12, background: 'var(--sg-color-bg-secondary)', padding: '2px 6px', borderRadius: 3 }}>
          {String(val)}
        </code>
      ),
    },
    { key: 'target', title: 'Target', width: 160 },
    {
      key: 'ip', title: 'IP Address', width: 130,
      render: (val) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{String(val)}</span>,
    },
  ]

  return (
    <>
      <Toolbar
        filters={
          <Select
            value={severity}
            onChange={(v) => setSeverity(String(v))}
            options={[
              { label: 'All Severity', value: 'all' },
              { label: 'Info', value: 'info' },
              { label: 'Warning', value: 'warning' },
              { label: 'Critical', value: 'critical' },
            ]}
            style={{ width: 160 }}
          />
        }
        actions={<Button size="small" onClick={() => notification.info('Export audit log (mock)')}>Export CSV</Button>}
      />
      <Table
        columns={columns}
        data={tableData}
        pageSize={12}
        size="small"
        expandable={{
          expandedRowRender: (row) => (
            <div style={{ padding: '8px 0', fontSize: 13 }}>
              <Descriptions
                items={[
                  { label: 'Details', children: String(row.details) },
                  { label: 'Severity', children: <Tag color={severityColors[String(row.severity)]}>{String(row.severity)}</Tag> },
                  { label: 'IP', children: String(row.ip) },
                  { label: 'Timestamp', children: String(row.timestamp) },
                ]}
                column={2}
                size="small"
              />
            </div>
          ),
        }}
      />
    </>
  )
}
