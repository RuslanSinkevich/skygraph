import { useState, useMemo } from 'react'
import {
  Avatar,
  Tag,
  Drawer,
  Descriptions,
  Progress,
  Rate,
  Button,
  Segmented,
} from '@skygraph/react'
import { performanceReviews } from './reviewsData'
import type { PerformanceReview } from './reviewsData'
import { Toolbar, statusColor, percent, renderRatingBar, useAppLocale } from '../_shared'

/** NEW tab: performance reviews. */
export function ReviewsTab() {
  const lc = useAppLocale('hrPortal')
  const r = lc.reviews
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<PerformanceReview | null>(null)

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? performanceReviews
        : performanceReviews.filter((rv) => rv.status === filter),
    [filter],
  )

  const avg = performanceReviews.reduce((s, rv) => s + rv.overall, 0) / performanceReviews.length

  return (
    <>
      <Toolbar
        filters={
          <Segmented
            value={filter}
            onChange={setFilter}
            options={[
              { label: r.filters.all, value: 'all' },
              { label: r.filters.pending, value: 'pending' },
              { label: r.filters.draft, value: 'draft' },
              { label: r.filters.completed, value: 'completed' },
            ]}
          />
        }
        actions={<Tag color="processing">{r.avgOverall(avg.toFixed(2))}</Tag>}
      />

      <div
        className="sc-card-grid"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
      >
        {filtered.map((rv) => (
          <div key={rv.id} className="sc-card sc-card--clickable" onClick={() => setSelected(rv)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar size="middle">{rv.employee.avatar}</Avatar>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{rv.employee.name}</div>
                <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                  {rv.employee.role} · {rv.period}
                </div>
              </div>
              <Tag
                color={statusColor(
                  rv.status === 'completed'
                    ? 'success'
                    : rv.status === 'pending'
                      ? 'warning'
                      : 'default',
                )}
              >
                {lc.reviewStatusLabel[rv.status] ?? rv.status}
              </Tag>
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                  {r.overall}
                </span>
                {renderRatingBar(rv.overall)}
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 6,
                marginTop: 6,
                fontSize: 11,
              }}
            >
              <span>
                {r.tech}: <strong>{rv.technical}</strong>
              </span>
              <span>
                {r.collab}: <strong>{rv.collaboration}</strong>
              </span>
              <span>
                {r.leadAbbr}: <strong>{rv.leadership}</strong>
              </span>
              <span>
                {r.delivery}: <strong>{rv.delivery}</strong>
              </span>
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'var(--sg-color-text-tertiary, var(--sg-color-text-secondary))',
              }}
            >
              {r.reviewer}: {rv.reviewerName}
            </div>
          </div>
        ))}
      </div>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.employee.name} — ${selected.period}` : ''}
        width={520}
      >
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar size="large">{selected.employee.avatar}</Avatar>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{selected.employee.name}</div>
                <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                  {selected.employee.role} · {selected.employee.department}
                </div>
              </div>
              <Tag
                color={statusColor(
                  selected.status === 'completed'
                    ? 'success'
                    : selected.status === 'pending'
                      ? 'warning'
                      : 'default',
                )}
              >
                {lc.reviewStatusLabel[selected.status] ?? selected.status}
              </Tag>
            </div>

            <Descriptions
              column={2}
              size="small"
              items={[
                { label: r.drawer.period, children: selected.period },
                { label: r.drawer.reviewer, children: selected.reviewerName },
                {
                  label: r.drawer.overall,
                  children: <Rate value={selected.overall} disabled allowHalf />,
                },
                { label: r.drawer.score, children: selected.overall.toFixed(2) },
              ]}
            />

            <h4 style={{ margin: 0 }}>{r.drawer.breakdown}</h4>
            {[
              [r.drawer.technical, selected.technical],
              [r.drawer.collaboration, selected.collaboration],
              [r.drawer.leadership, selected.leadership],
              [r.drawer.delivery, selected.delivery],
            ].map(([label, val]) => (
              <div key={label as string}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 13,
                    marginBottom: 2,
                  }}
                >
                  <span>{label}</span>
                  <span>{val}</span>
                </div>
                <Progress percent={(Number(val) / 5) * 100} showInfo={false} />
              </div>
            ))}

            <h4 style={{ margin: 0 }}>{r.drawer.goals}</h4>
            {selected.goals.map((g, i) => (
              <div key={i}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 13,
                    marginBottom: 2,
                  }}
                >
                  <span>{g.title}</span>
                  <span>{percent(g.progress, 0)}</span>
                </div>
                <Progress
                  percent={g.progress}
                  status={g.progress >= 100 ? 'success' : 'active'}
                  showInfo={false}
                />
              </div>
            ))}

            <div>
              <h4>{r.drawer.highlights}</h4>
              <p style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
                {selected.highlights}
              </p>
            </div>
            <div>
              <h4>{r.drawer.improvements}</h4>
              <p style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
                {selected.improvements}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button>{r.drawer.exportPdf}</Button>
              {selected.status !== 'completed' && (
                <Button type="primary">{r.drawer.complete}</Button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </>
  )
}
