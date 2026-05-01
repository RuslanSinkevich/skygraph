import { useState, useMemo } from 'react'
import {
  Avatar, Tag, Drawer, Descriptions, Progress, Rate, Button, Segmented,
} from '@skygraph/react'
import { performanceReviews } from './reviewsData'
import type { PerformanceReview } from './reviewsData'
import { Toolbar, statusColor, percent, renderRatingBar } from '../_shared'

/** NEW tab: performance reviews. */
export function ReviewsTab() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<PerformanceReview | null>(null)

  const filtered = useMemo(
    () => filter === 'all'
      ? performanceReviews
      : performanceReviews.filter(r => r.status === filter),
    [filter],
  )

  const avg = performanceReviews.reduce((s, r) => s + r.overall, 0) / performanceReviews.length

  return (
    <>
      <Toolbar
        filters={
          <Segmented
            value={filter}
            onChange={setFilter}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Draft', value: 'draft' },
              { label: 'Completed', value: 'completed' },
            ]}
          />
        }
        actions={<Tag color="processing">Avg overall: {avg.toFixed(2)}</Tag>}
      />

      <div className="sc-card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {filtered.map(r => (
          <div
            key={r.id}
            className="sc-card sc-card--clickable"
            onClick={() => setSelected(r)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar size="middle">{r.employee.avatar}</Avatar>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{r.employee.name}</div>
                <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                  {r.employee.role} · {r.period}
                </div>
              </div>
              <Tag color={statusColor(r.status === 'completed' ? 'success' : r.status === 'pending' ? 'warning' : 'default')}>
                {r.status}
              </Tag>
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>Overall</span>
                {renderRatingBar(r.overall)}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6, marginTop: 6, fontSize: 11 }}>
              <span>Tech: <strong>{r.technical}</strong></span>
              <span>Collab: <strong>{r.collaboration}</strong></span>
              <span>Lead: <strong>{r.leadership}</strong></span>
              <span>Delivery: <strong>{r.delivery}</strong></span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--sg-color-text-tertiary, var(--sg-color-text-secondary))' }}>
              Reviewer: {r.reviewerName}
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
              <Tag color={statusColor(selected.status === 'completed' ? 'success' : selected.status === 'pending' ? 'warning' : 'default')}>
                {selected.status}
              </Tag>
            </div>

            <Descriptions
              column={2}
              size="small"
              items={[
                { label: 'Period', children: selected.period },
                { label: 'Reviewer', children: selected.reviewerName },
                { label: 'Overall', children: <Rate value={selected.overall} disabled allowHalf /> },
                { label: 'Score', children: selected.overall.toFixed(2) },
              ]}
            />

            <h4 style={{ margin: 0 }}>Competency Breakdown</h4>
            {[
              ['Technical Skill', selected.technical],
              ['Collaboration', selected.collaboration],
              ['Leadership', selected.leadership],
              ['Delivery', selected.delivery],
            ].map(([label, val]) => (
              <div key={label as string}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 2 }}>
                  <span>{label}</span>
                  <span>{val}</span>
                </div>
                <Progress percent={(Number(val) / 5) * 100} showInfo={false} />
              </div>
            ))}

            <h4 style={{ margin: 0 }}>Goals</h4>
            {selected.goals.map((g, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 2 }}>
                  <span>{g.title}</span>
                  <span>{percent(g.progress, 0)}</span>
                </div>
                <Progress percent={g.progress} status={g.progress >= 100 ? 'success' : 'active'} showInfo={false} />
              </div>
            ))}

            <div>
              <h4>Highlights</h4>
              <p style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>{selected.highlights}</p>
            </div>
            <div>
              <h4>Areas for Improvement</h4>
              <p style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>{selected.improvements}</p>
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button>Export PDF</Button>
              {selected.status !== 'completed' && (
                <Button type="primary">Complete Review</Button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </>
  )
}
