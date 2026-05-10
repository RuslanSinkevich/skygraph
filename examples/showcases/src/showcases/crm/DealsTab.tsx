import { useState, useMemo } from 'react'
import {
  Table,
  Tag,
  Button,
  Modal,
  Descriptions,
  Progress,
  Segmented,
  Dropdown,
  notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { deals as initialDeals, contacts } from './data'
import type { Deal } from './data'
import { Toolbar, useFilteredList, money, statusColor, shortDate, useAppLocale } from '../_shared'
import { pipelineStages } from './common'

type StageFilter = 'all' | Deal['stage']

export function DealsTab() {
  const lc = useAppLocale('crm')
  const dl = lc.deals
  const stageLabel = (s: string) => lc.stageLabel[s] ?? s
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState<StageFilter>('all')
  const [detail, setDetail] = useState<Deal | null>(null)
  const [deals, setDeals] = useState<Deal[]>(initialDeals)

  const enrichedDeals = useMemo(
    () =>
      deals.map((d) => ({
        ...d,
        contactName: contacts.find((c) => c.id === d.contactId)?.name ?? '—',
        company: contacts.find((c) => c.id === d.contactId)?.company ?? '—',
      })),
    [deals],
  )

  const filteredByStage = useMemo(
    () =>
      stageFilter === 'all' ? enrichedDeals : enrichedDeals.filter((d) => d.stage === stageFilter),
    [enrichedDeals, stageFilter],
  )

  const filtered = useFilteredList(filteredByStage, search, ['title', 'contactName', 'company'])

  const tableData = useMemo(
    () => filtered.map((d) => ({ id: d.id, data: d as unknown as Record<string, unknown> })),
    [filtered],
  )

  const columns: TableColumn[] = [
    {
      key: 'title',
      title: dl.columns.deal,
      width: 280,
      sortable: true,
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 500 }}>{String(val)}</div>
          <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
            {String(row.contactName)} · {String(row.company)}
          </div>
        </div>
      ),
    },
    {
      key: 'value',
      title: dl.columns.value,
      width: 120,
      sortable: true,
      align: 'right',
      render: (val) => <span style={{ fontWeight: 500 }}>{money(Number(val))}</span>,
    },
    {
      key: 'stage',
      title: dl.columns.stage,
      width: 130,
      sortable: true,
      filters: pipelineStages.map((s) => ({ text: stageLabel(s), value: s })),
      onFilter: (value, row) => row.stage === value,
      render: (val) => <Tag color={statusColor(String(val))}>{stageLabel(String(val))}</Tag>,
    },
    {
      key: 'probability',
      title: dl.columns.probability,
      width: 140,
      sortable: true,
      render: (val) => {
        const n = Number(val)
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Progress percent={n} size="small" showInfo={false} style={{ flex: 1 }} />
            <span style={{ fontSize: 12, minWidth: 32 }}>{n}%</span>
          </div>
        )
      },
    },
    {
      key: 'createdAt',
      title: dl.columns.created,
      width: 110,
      sortable: true,
      render: (v) => shortDate(String(v)),
    },
    {
      key: 'actions',
      title: '',
      width: 140,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button
            size="small"
            onClick={() => {
              const d = deals.find((x) => x.id === String(row.id))
              if (d) setDetail(d)
            }}
          >
            {dl.rowActions.details}
          </Button>
          <Dropdown
            items={[
              { key: 'won', label: dl.rowActions.markWon },
              { key: 'lost', label: dl.rowActions.markLost, danger: true },
              { key: 'reassign', label: dl.rowActions.reassign },
            ]}
            onSelect={(key) => {
              const id = String(row.id)
              if (key === 'won') {
                setDeals((prev) =>
                  prev.map((d) => (d.id === id ? { ...d, stage: 'closed-won' } : d)),
                )
                notification.success(dl.toasts.won)
              } else if (key === 'lost') {
                setDeals((prev) =>
                  prev.map((d) => (d.id === id ? { ...d, stage: 'closed-lost' } : d)),
                )
                notification.error(dl.toasts.lost)
              } else {
                notification.info(`${key}: ${row.title}`)
              }
            }}
          >
            <Button size="small">⋯</Button>
          </Dropdown>
        </div>
      ),
    },
  ]

  const totals = useMemo(() => {
    const open = deals.filter((d) => d.stage !== 'closed-won' && d.stage !== 'closed-lost')
    const won = deals.filter((d) => d.stage === 'closed-won')
    return {
      openValue: open.reduce((s, d) => s + d.value, 0),
      wonValue: won.reduce((s, d) => s + d.value, 0),
      weighted: open.reduce((s, d) => s + (d.value * d.probability) / 100, 0),
    }
  }, [deals])

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: dl.searchPlaceholder }}
        filters={
          <Segmented
            value={stageFilter}
            onChange={(v) => setStageFilter(v as StageFilter)}
            options={[
              { label: dl.filterAll(deals.length), value: 'all' },
              ...pipelineStages.map((s) => ({
                label: `${stageLabel(s)} (${deals.filter((d) => d.stage === s).length})`,
                value: s,
              })),
            ]}
          />
        }
        actions={
          <>
            <Tag color="processing">{dl.open(money(totals.openValue, { compact: true }))}</Tag>
            <Tag color="warning">{dl.weighted(money(totals.weighted, { compact: true }))}</Tag>
            <Tag color="success">{dl.won(money(totals.wonValue, { compact: true }))}</Tag>
          </>
        }
      />
      <Table
        columns={columns}
        data={tableData}
        pageSize={10}
        size="small"
        striped
        summary={(rows) => {
          const sum = rows.reduce((s, r) => s + (Number(r.data.value) || 0), 0)
          const avgProb = rows.length
            ? Math.round(rows.reduce((s, r) => s + Number(r.data.probability), 0) / rows.length)
            : 0
          return [
            [
              { content: dl.summary(rows.length, avgProb) },
              { content: money(sum), align: 'right' as const },
              { content: '' },
              { content: `${avgProb}%` },
              { content: '' },
              { content: '' },
            ],
          ]
        }}
      />

      <Modal
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail?.title ?? ''}
        width={520}
        footer={null}
      >
        {detail &&
          (() => {
            const contact = contacts.find((c) => c.id === detail.contactId)
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Tag color={statusColor(detail.stage)}>{stageLabel(detail.stage)}</Tag>
                <Descriptions
                  items={[
                    { label: dl.drawer.value, children: money(detail.value) },
                    { label: dl.drawer.probability, children: `${detail.probability}%` },
                    {
                      label: dl.drawer.weighted,
                      children: money((detail.value * detail.probability) / 100),
                    },
                    { label: dl.drawer.created, children: detail.createdAt },
                    { label: dl.drawer.contact, children: contact?.name ?? '—' },
                    { label: dl.drawer.company, children: contact?.company ?? '—' },
                  ]}
                  column={2}
                  size="small"
                />
              </div>
            )
          })()}
      </Modal>
    </>
  )
}
