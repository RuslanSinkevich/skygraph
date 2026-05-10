import { useState, useMemo } from 'react'
import { Table, Tag, Button, Select, Descriptions, notification } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { auditLog, auditToRow } from './data'
import { Toolbar, useAppLocale } from '../_shared'
import { severityColors } from './common'

export function AuditTab() {
  const a = useAppLocale('admin').audit
  const [severity, setSeverity] = useState<string>('all')

  const filtered = useMemo(
    () => (severity === 'all' ? auditLog : auditLog.filter((l) => l.severity === severity)),
    [severity],
  )

  const tableData = useMemo(() => filtered.map(auditToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'severity',
      title: '',
      width: 40,
      align: 'center',
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
            background:
              val === 'critical'
                ? 'var(--sg-color-error, red)'
                : val === 'warning'
                  ? 'var(--sg-color-warning, orange)'
                  : 'var(--sg-color-text-tertiary, gray)',
            borderRadius: 8,
          }}
        >
          {val === 'critical' ? '!' : val === 'warning' ? '⚠' : '·'}
        </span>
      ),
    },
    { key: 'timestamp', title: a.columns.time, width: 160, sortable: true },
    {
      key: 'userName',
      title: a.columns.user,
      width: 140,
      sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>{String(val)}</span>,
    },
    {
      key: 'action',
      title: a.columns.action,
      width: 170,
      sortable: true,
      render: (val) => (
        <code
          style={{
            fontSize: 12,
            background: 'var(--sg-color-bg-secondary)',
            padding: '2px 6px',
            borderRadius: 3,
          }}
        >
          {String(val)}
        </code>
      ),
    },
    { key: 'target', title: a.columns.target, width: 160 },
    {
      key: 'ip',
      title: a.columns.ip,
      width: 130,
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
              { label: a.severityAll, value: 'all' },
              { label: a.severityInfo, value: 'info' },
              { label: a.severityWarning, value: 'warning' },
              { label: a.severityCritical, value: 'critical' },
            ]}
            style={{ width: 160 }}
          />
        }
        actions={
          <Button size="small" onClick={() => notification.info(a.exportToast)}>
            {a.exportBtn}
          </Button>
        }
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
                  { label: a.expanded.details, children: String(row.details) },
                  {
                    label: a.expanded.severity,
                    children: (
                      <Tag color={severityColors[String(row.severity)]}>{String(row.severity)}</Tag>
                    ),
                  },
                  { label: a.expanded.ip, children: String(row.ip) },
                  { label: a.expanded.timestamp, children: String(row.timestamp) },
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
