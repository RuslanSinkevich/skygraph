import { useState } from 'react'
import { Tag, Modal, Button, Descriptions, Progress, notification } from '@skygraph/react'
import { contacts as initialContacts } from './data'
import type { Deal } from './data'
import { Kanban, money, statusColor, useAppLocale } from '../_shared'
import { pipelineStages } from './common'
import { deals as initialDeals } from './data'

/**
 * NEW: Kanban-style pipeline. Drag cards between stages.
 * Replaces the previous read-only progress-bar list.
 */
export function PipelineTab() {
  const lc = useAppLocale('crm')
  const p = lc.pipeline
  const stageLabel = (s: string) => lc.stageLabel[s] ?? s
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [detail, setDetail] = useState<Deal | null>(null)

  const columns = pipelineStages.map((stage) => {
    const stageDeals = deals.filter((d) => d.stage === stage)
    const total = stageDeals.reduce((s, d) => s + d.value, 0)
    return {
      key: stage,
      title: stageLabel(stage),
      color:
        statusColor(stage) === 'success'
          ? '#52c41a'
          : statusColor(stage) === 'error'
            ? '#ff4d4f'
            : statusColor(stage) === 'warning'
              ? '#faad14'
              : statusColor(stage) === 'processing'
                ? '#1677ff'
                : '#bfbfbf',
      items: stageDeals,
      meta: (
        <span>
          {stageDeals.length} · <strong>{money(total, { compact: true })}</strong>
        </span>
      ),
    }
  })

  const handleDrop = (id: string | number, _from: string, to: string) => {
    setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, stage: to as Deal['stage'] } : d)))
    notification.success(p.movedToast(stageLabel(to)))
  }

  return (
    <>
      <p style={{ color: 'var(--sg-color-text-secondary)', fontSize: 13, marginBottom: 12 }}>
        {p.intro}
      </p>
      <Kanban<Deal>
        columns={columns}
        onDrop={handleDrop}
        onCardClick={setDetail}
        renderCard={(d) => {
          const contact = initialContacts.find((c) => c.id === d.contactId)
          return (
            <>
              <div style={{ fontWeight: 500, marginBottom: 4 }}>{d.title}</div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                  {contact?.name ?? '—'}
                </span>
                <span style={{ fontWeight: 600 }}>{money(d.value, { compact: true })}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11 }}>
                <Tag
                  color={
                    d.probability >= 70 ? 'success' : d.probability >= 40 ? 'warning' : 'default'
                  }
                >
                  {d.probability}%
                </Tag>
                <span
                  style={{ color: 'var(--sg-color-text-tertiary, var(--sg-color-text-secondary))' }}
                >
                  {d.createdAt}
                </span>
              </div>
            </>
          )
        }}
      />

      <Modal
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail?.title ?? ''}
        width={520}
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={() => setDetail(null)}>{p.drawer.close}</Button>
            {detail && detail.stage !== 'closed-won' && detail.stage !== 'closed-lost' && (
              <>
                <Button
                  onClick={() => {
                    if (detail) {
                      setDeals((prev) =>
                        prev.map((d) => (d.id === detail.id ? { ...d, stage: 'closed-won' } : d)),
                      )
                      notification.success(p.drawer.wonToast)
                    }
                    setDetail(null)
                  }}
                  type="primary"
                >
                  {p.drawer.markWon}
                </Button>
                <Button
                  onClick={() => {
                    if (detail) {
                      setDeals((prev) =>
                        prev.map((d) => (d.id === detail.id ? { ...d, stage: 'closed-lost' } : d)),
                      )
                      notification.error(p.drawer.lostToast)
                    }
                    setDetail(null)
                  }}
                >
                  {p.drawer.markLost}
                </Button>
              </>
            )}
          </div>
        }
      >
        {detail &&
          (() => {
            const contact = initialContacts.find((c) => c.id === detail.contactId)
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Tag color={statusColor(detail.stage)}>{stageLabel(detail.stage)}</Tag>
                <Descriptions
                  items={[
                    { label: p.drawer.value, children: money(detail.value) },
                    { label: p.drawer.probability, children: `${detail.probability}%` },
                    { label: p.drawer.created, children: detail.createdAt },
                    { label: p.drawer.contact, children: contact?.name ?? '—' },
                    { label: p.drawer.company, children: contact?.company ?? '—' },
                    { label: p.drawer.email, children: contact?.email ?? '—' },
                  ]}
                  column={2}
                  size="small"
                />
                <h4>{p.drawer.winProbability}</h4>
                <Progress
                  percent={detail.probability}
                  status={
                    detail.stage === 'closed-won'
                      ? 'success'
                      : detail.stage === 'closed-lost'
                        ? 'error'
                        : 'active'
                  }
                />
              </div>
            )
          })()}
      </Modal>
    </>
  )
}
