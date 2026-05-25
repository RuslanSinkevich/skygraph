/**
 * Roadmap page (`#/roadmap`).
 *
 * Redesigned to surface "what is shipping right now" first, with the long
 * history compressed into a digestible archive table:
 *
 *   1. Hero        — title + 4 KPI chips (components / engines / rounds / tests)
 *                    + overall progress bar (closed vs total TODO items).
 *   2. Latest      — focus card for the most recent round (subsections,
 *                    commit count, preview line, CTA to changelog).
 *   3. Filters     — Segmented selector + search (filters BOTH active streams
 *                    AND the round archive below).
 *   4. Active      — TODO sections with progress bars; expandable item lists.
 *   5. Archive     — compact horizontal scroller of every round (topic count,
 *                    commit count, summary). Acts as a release log.
 *   6. Sidebar     — sticky "what's next" + jump-to-source links.
 *
 * Page eats its own dogfood: Progress, Collapse, Segmented, Input, Tag,
 * Steps, Tooltip, Empty.
 */
import { useMemo, useState } from 'react'
import { Collapse, Empty, Input, Progress, Segmented, Tag, Tooltip } from '@skygraph/react'
import type { CollapseItem } from '@skygraph/react'
import { GITHUB_URL, parseChangelog, parseTodo } from '@skygraph-examples/shared'
import type { ChangelogRound, TodoItem, TodoSection } from '@skygraph-examples/shared'
import todoMd from '../../../../../TODO.md?raw'
import changelogMd from '../../../../../CHANGELOG.md?raw'
import { useI18n } from '../../i18n'
import './roadmap.css'

interface RoadmapProps {
  onNavigate?: (key: string) => void
}

type Filter = 'all' | 'shipped' | 'planned'

const CHANGELOG_GITHUB_URL =
  'https://github.com/RuslanSinkevich/skygraph-public/blob/master/CHANGELOG.md'

export function Roadmap(_props: RoadmapProps) {
  const { t } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const sections = useMemo(() => parseTodo(todoMd), [])
  const rounds = useMemo(() => parseRounds(changelogMd), [])
  const latestRound = rounds[rounds.length - 1] ?? null

  const stats = useMemo(() => {
    let closed = 0
    let open = 0
    for (const s of sections) {
      for (const i of s.items) {
        if (i.status === 'closed') closed++
        else open++
      }
    }
    const total = closed + open
    const pct = total === 0 ? 0 : Math.round((closed / total) * 100)
    return { closed, open, total, pct }
  }, [sections])

  const filteredSections = useMemo<TodoSection[]>(() => {
    const q = query.trim().toLowerCase()
    const out: TodoSection[] = []
    for (const s of sections) {
      const items = s.items.filter((it) => {
        if (filter === 'shipped' && it.status !== 'closed') return false
        if (filter === 'planned' && it.status !== 'open') return false
        if (!q) return true
        return (
          it.title.toLowerCase().includes(q) || it.body.some((l) => l.toLowerCase().includes(q))
        )
      })
      if (items.length > 0) out.push({ ...s, items })
    }
    return out
  }, [sections, filter, query])

  const filteredRounds = useMemo<RoundMeta[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rounds
    return rounds.filter(
      (r) => r.summary.toLowerCase().includes(q) || r.preview.toLowerCase().includes(q),
    )
  }, [rounds, query])

  const openItems = useMemo<Array<{ item: TodoItem; section: TodoSection }>>(() => {
    const out: Array<{ item: TodoItem; section: TodoSection }> = []
    for (const s of sections) {
      for (const it of s.items) {
        if (it.status === 'open') out.push({ item: it, section: s })
      }
    }
    return out.sort((a, b) => compareIds(a.item.id, b.item.id))
  }, [sections])

  const sectionCollapseItems = useMemo<CollapseItem[]>(
    () =>
      filteredSections.map((section, idx) => {
        const closed = section.items.filter((i) => i.status === 'closed').length
        const total = section.items.length
        const pct = total === 0 ? 0 : Math.round((closed / total) * 100)
        return {
          key: section.id || section.title || `section-${idx}`,
          label: <SectionHeader section={section} closed={closed} total={total} pct={pct} t={t} />,
          children: <SectionBody items={section.items} t={t} />,
        }
      }),
    [filteredSections, t],
  )

  const filterOptions = useMemo(
    () => [
      { value: 'all', label: t.roadmap.filterAll },
      { value: 'shipped', label: t.roadmap.filterShipped },
      { value: 'planned', label: t.roadmap.filterPlanned },
    ],
    [t],
  )

  return (
    <div className="roadmap">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header className="roadmap-hero">
        <div className="roadmap-hero-text">
          <div className="roadmap-eyebrow">{t.roadmap.sourceLabel}</div>
          <h1 className="roadmap-title">{t.roadmap.title}</h1>
          <p className="roadmap-lead">{t.roadmap.lead}</p>
        </div>
        <div className="roadmap-hero-progress">
          <div className="roadmap-hero-progress-head">
            <span className="roadmap-hero-progress-label">
              {t.roadmap.overallProgressLabel ?? 'Overall progress'}
            </span>
            <span className="roadmap-hero-progress-pct">{stats.pct}%</span>
          </div>
          <Progress
            percent={stats.pct}
            status={stats.pct === 100 ? 'success' : 'active'}
            showInfo={false}
          />
          <div className="roadmap-hero-progress-foot">
            <span>
              <strong>{stats.closed}</strong> {t.roadmap.statClosed}
            </span>
            <span>·</span>
            <span>
              <strong>{stats.open}</strong> {t.roadmap.statOpen}
            </span>
            <span>·</span>
            <span>
              <strong>{stats.total}</strong> {t.roadmap.statTotal}
            </span>
          </div>
        </div>
      </header>

      <div className="roadmap-metrics" role="list">
        <MetricChip
          value={rounds.length.toString()}
          label={t.roadmap.metricRounds}
          tone="primary"
        />
        <MetricChip value={stats.closed.toString()} label={t.roadmap.statClosed} tone="success" />
        <MetricChip value={stats.open.toString()} label={t.roadmap.statOpen} tone="warning" />
      </div>

      {/* ── Latest round focus card ──────────────────────────────────── */}
      {latestRound && (
        <section className="roadmap-latest">
          <div className="roadmap-latest-head">
            <div className="roadmap-latest-eyebrow">
              {t.roadmap.latestEyebrow ?? 'Latest release'}
            </div>
            <h2 className="roadmap-latest-title">
              <span className="roadmap-latest-tag">
                {t.roadmap.roundLabel} {latestRound.number}
              </span>
              {latestRound.summary && (
                <span className="roadmap-latest-summary">{latestRound.summary}</span>
              )}
            </h2>
            {latestRound.preview && <p className="roadmap-latest-preview">{latestRound.preview}</p>}
          </div>
          <div className="roadmap-latest-meta">
            <div className="roadmap-latest-stat">
              <span className="roadmap-latest-stat-value">{latestRound.subsectionCount}</span>
              <span className="roadmap-latest-stat-label">
                {latestRound.subsectionCount === 1
                  ? (t.roadmap.topicSingular ?? 'topic')
                  : (t.roadmap.topicPlural ?? 'topics')}
              </span>
            </div>
            <div className="roadmap-latest-stat">
              <span className="roadmap-latest-stat-value">{latestRound.shaCount}</span>
              <span className="roadmap-latest-stat-label">
                {latestRound.shaCount === 1
                  ? (t.roadmap.commitSingular ?? 'commit')
                  : (t.roadmap.commitPlural ?? 'commits')}
              </span>
            </div>
            <a
              className="roadmap-latest-link"
              href={CHANGELOG_GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t.roadmap.changelogLink ?? 'Read full changelog →'}
            </a>
          </div>
        </section>
      )}

      {/* ── Filter bar ──────────────────────────────────────────────── */}
      <div className="roadmap-filter">
        <Segmented
          options={filterOptions}
          value={filter}
          onChange={(v) => setFilter(v as Filter)}
        />
        <span className="roadmap-search-wrap">
          <Input
            className="roadmap-search"
            placeholder={t.roadmap.searchPlaceholder}
            value={query}
            onChange={(value) => setQuery(value)}
          />
        </span>
      </div>

      {/* ── Two-column: sections + sidebar ──────────────────────────── */}
      <div className="roadmap-columns">
        <section className="roadmap-block roadmap-col-main">
          <div className="roadmap-block-header">
            <h2 className="roadmap-block-title">{t.roadmap.sectionsHeading}</h2>
            <p className="roadmap-block-lead">{t.roadmap.sectionsLead}</p>
          </div>

          {sectionCollapseItems.length === 0 ? (
            <Empty description={t.roadmap.emptyLabel} />
          ) : (
            <Collapse
              items={sectionCollapseItems}
              defaultActiveKey={sectionCollapseItems.filter((_, idx) => idx < 2).map((c) => c.key)}
              expandIconPosition="end"
              ghost
            />
          )}
        </section>

        <aside className="roadmap-block roadmap-col-side">
          <div className="roadmap-block-header">
            <h2 className="roadmap-block-title">{t.roadmap.nextHeading}</h2>
            <p className="roadmap-block-lead">{t.roadmap.nextLead}</p>
          </div>

          {openItems.length === 0 ? (
            <div className="roadmap-empty roadmap-empty--small">{t.roadmap.nextEmpty}</div>
          ) : (
            <ul className="roadmap-next-list">
              {openItems.slice(0, 8).map(({ item, section }) => (
                <li key={`${section.id}-${item.id}`} className="roadmap-next-item">
                  <div className="roadmap-next-title">
                    {item.id && <span className="roadmap-next-id">§ {item.id}</span>}
                    <span>{stripInline(item.title)}</span>
                  </div>
                  {section.title && (
                    <div className="roadmap-next-section">
                      {section.id && <>§{section.id} · </>}
                      {section.title}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {openItems.length > 8 && (
            <div className="roadmap-next-more">
              + {openItems.length - 8} {t.roadmap.moreLabel ?? 'more'}
            </div>
          )}

          <a
            className="roadmap-source-link"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub →
          </a>
        </aside>
      </div>

      {/* ── Round archive ───────────────────────────────────────────── */}
      {filteredRounds.length > 0 && (
        <section className="roadmap-block">
          <div className="roadmap-block-header">
            <h2 className="roadmap-block-title">{t.roadmap.timelineHeading}</h2>
            <p className="roadmap-block-lead">{t.roadmap.timelineLead}</p>
          </div>

          <ol className="roadmap-rounds-grid">
            {[...filteredRounds].reverse().map((r) => (
              <li key={r.number} className="roadmap-round-card">
                <div className="roadmap-round-card-head">
                  <span className="roadmap-round-card-num">#{r.number}</span>
                  <span className="roadmap-round-card-meta">
                    {r.subsectionCount > 0 && (
                      <Tooltip
                        title={`${r.subsectionCount} ${
                          r.subsectionCount === 1
                            ? (t.roadmap.topicSingular ?? 'topic')
                            : (t.roadmap.topicPlural ?? 'topics')
                        }`}
                      >
                        <Tag color="default">⊞ {r.subsectionCount}</Tag>
                      </Tooltip>
                    )}
                    {r.shaCount > 0 && (
                      <Tooltip
                        title={`${r.shaCount} ${
                          r.shaCount === 1
                            ? (t.roadmap.commitSingular ?? 'commit')
                            : (t.roadmap.commitPlural ?? 'commits')
                        }`}
                      >
                        <Tag color="processing">◆ {r.shaCount}</Tag>
                      </Tooltip>
                    )}
                  </span>
                </div>
                {r.summary && <div className="roadmap-round-card-title">{r.summary}</div>}
                {r.preview && <p className="roadmap-round-card-preview">{r.preview}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="roadmap-footnote">
        <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
          GitHub →
        </a>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------

function MetricChip({
  value,
  label,
  tone,
}: {
  value: string
  label: string
  tone: 'primary' | 'success' | 'warning' | 'info' | 'muted'
}) {
  return (
    <div role="listitem" className={`roadmap-metric roadmap-metric--${tone}`}>
      <span className="roadmap-metric-value">{value}</span>
      <span className="roadmap-metric-label">{label}</span>
    </div>
  )
}

function SectionHeader({
  section,
  closed,
  total,
  pct,
  t,
}: {
  section: TodoSection
  closed: number
  total: number
  pct: number
  t: ReturnType<typeof useI18n>['t']
}) {
  const isComplete = closed === total
  return (
    <div className="roadmap-section-header">
      <div className="roadmap-section-title">
        {section.id && <span className="roadmap-section-id">§ {section.id}</span>}
        <span>{section.title}</span>
        <Tag color={isComplete ? 'success' : 'warning'}>
          {isComplete ? t.roadmap.sectionStatusComplete : t.roadmap.sectionStatusActive}
        </Tag>
      </div>
      <div className="roadmap-section-progress">
        <Progress
          percent={pct}
          size="small"
          status={isComplete ? 'success' : 'active'}
          showInfo={false}
        />
        <span className="roadmap-section-progress-text">
          {format(t.roadmap.sectionProgressCount, {
            closed: closed.toString(),
            total: total.toString(),
          })}
        </span>
      </div>
    </div>
  )
}

function SectionBody({ items, t }: { items: TodoItem[]; t: ReturnType<typeof useI18n>['t'] }) {
  return (
    <ul className="roadmap-items">
      {items.map((item) => {
        const isClosed = item.status === 'closed'
        const round = detectRound(item.body)
        return (
          <li
            key={`${item.id || ''}-${item.title}`}
            className={
              isClosed ? 'roadmap-item roadmap-item--closed' : 'roadmap-item roadmap-item--open'
            }
          >
            <span
              className={
                isClosed
                  ? 'roadmap-item-marker roadmap-item-marker--closed'
                  : 'roadmap-item-marker roadmap-item-marker--open'
              }
              aria-hidden="true"
            />
            <div className="roadmap-item-body">
              <div className="roadmap-item-title">
                {item.id && <span className="roadmap-item-id">§ {item.id}</span>}
                <span>{stripInline(item.title)}</span>
                <Tag color={isClosed ? 'success' : 'warning'}>
                  {isClosed ? t.roadmap.itemBadgeShipped : t.roadmap.itemBadgePlanned}
                </Tag>
                {round !== null && (
                  <Tag color="processing">
                    {format(t.roadmap.itemRound, { n: round.toString() })}
                  </Tag>
                )}
              </div>
              {summarize(item) && <div className="roadmap-item-summary">{summarize(item)}</div>}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

// ---------------------------------------------------------------------------
// Parsing helpers (port of the previous design — same outputs, different UI).

interface RoundMeta {
  number: number
  summary: string
  preview: string
  subsectionCount: number
  shaCount: number
}

function parseRounds(md: string): RoundMeta[] {
  const entries = parseChangelog(md)
  const flat: RoundMeta[] = []
  for (const entry of entries) {
    for (const round of entry.rounds) {
      const meta = roundMeta(round)
      if (meta) flat.push(meta)
    }
  }
  return flat.sort((a, b) => a.number - b.number)
}

function roundMeta(round: ChangelogRound): RoundMeta | null {
  const m = round.title.match(/^Round\s+(\d+(?:\.\d+)?)/i)
  if (!m) return null
  const number = parseFloat(m[1])
  const summary = round.title.replace(/^Round\s+\d+(?:\.\d+)?\s*[—\-–]\s*/i, '').trim()
  const preview = pickPreview(round)
  const allText = [...round.body, ...round.subsections.flatMap((s) => s.body)]
  const shaSet = new Set<string>()
  for (const line of allText) {
    const matches = line.match(/`([0-9a-f]{7})`/g)
    if (matches) for (const sha of matches) shaSet.add(sha)
  }
  return {
    number,
    summary,
    preview,
    subsectionCount: round.subsections.length,
    shaCount: shaSet.size,
  }
}

function pickPreview(round: ChangelogRound): string {
  const lines = round.body.length > 0 ? round.body : (round.subsections[0]?.body ?? [])
  for (const raw of lines) {
    const line = stripInline(raw)
    if (line.length === 0) continue
    return line.length > 200 ? line.slice(0, 197) + '…' : line
  }
  return ''
}

function detectRound(body: string[]): number | null {
  let best: number | null = null
  for (const line of body) {
    const re = /round\s+(\d+)/gi
    let m: RegExpExecArray | null
    while ((m = re.exec(line)) !== null) {
      const n = parseInt(m[1], 10)
      if (!Number.isNaN(n) && (best === null || n > best)) best = n
    }
  }
  return best
}

function compareIds(a: string, b: string): number {
  const pa = a.split('.').map((s) => parseInt(s, 10) || 0)
  const pb = b.split('.').map((s) => parseInt(s, 10) || 0)
  const len = Math.max(pa.length, pb.length)
  for (let i = 0; i < len; i++) {
    const da = pa[i] ?? 0
    const db = pb[i] ?? 0
    if (da !== db) return da - db
  }
  return 0
}

function stripInline(line: string): string {
  return line
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^\s*[-*]\s+/, '· ')
    .replace(/^~~(.+?)~~/, '$1')
    .trim()
}

function summarize(item: TodoItem): string {
  return item.body
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .slice(0, 2)
    .map(stripInline)
    .join(' ')
}

function format(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')
}
