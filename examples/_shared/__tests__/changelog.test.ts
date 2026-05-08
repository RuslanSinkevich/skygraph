import { describe, expect, it } from 'vitest'
import { parseChangelog } from '../src/parsers/changelog'

const FIXTURE = `# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Round 11 — UX полишинг

После round 9.1 на master приехали 15 коммитов.

#### Charts UX (\`6bad1f9\`) — таб A

- **\`useChartSize\`** — измеряет контейнер через \`ResizeObserver\`.
- **\`ChartHoverToolbar\`** — floating-панель в правом верхнем углу.

#### Diagram UX (\`ef617a6\`) — таб B

- **Context menu** — \`onNodeContextMenu(node, ev)\`.

### Round 10 — что-то ранее

Round 10 body intro.

## [0.4.0] — 2026-04-30

### Round 9 — Gantt + EventTimeline

#### Components

- **\`Gantt\`** — task-as-bar chart.
`

describe('parseChangelog', () => {
  const entries = parseChangelog(FIXTURE)

  it('returns one entry per ## heading', () => {
    expect(entries).toHaveLength(2)
    expect(entries[0].title).toBe('[Unreleased]')
    expect(entries[1].title).toBe('[0.4.0] — 2026-04-30')
  })

  it('extracts the version label from the bracket prefix', () => {
    expect(entries[0].version).toBe('Unreleased')
    expect(entries[1].version).toBe('0.4.0')
  })

  it('extracts the date suffix when present', () => {
    expect(entries[0].date).toBeNull()
    expect(entries[1].date).toBe('2026-04-30')
  })

  it('groups rounds under each entry', () => {
    expect(entries[0].rounds).toHaveLength(2)
    expect(entries[0].rounds[0].title).toBe('Round 11 — UX полишинг')
    expect(entries[0].rounds[1].title).toBe('Round 10 — что-то ранее')
    expect(entries[1].rounds).toHaveLength(1)
  })

  it('groups subsections under their round and preserves body bullets', () => {
    const r11 = entries[0].rounds[0]
    expect(r11.subsections.map((s) => s.title)).toEqual([
      'Charts UX (`6bad1f9`) — таб A',
      'Diagram UX (`ef617a6`) — таб B',
    ])
    expect(r11.subsections[0].body[0]).toContain('useChartSize')
    expect(r11.subsections[0].body[1]).toContain('ChartHoverToolbar')
  })

  it('captures round-level body text before the first subsection', () => {
    const r11 = entries[0].rounds[0]
    expect(r11.body.join('\n')).toMatch(/15 коммитов/)
  })

  it('skips the document title and prose before the first ## heading', () => {
    expect(entries[0].body.some((l) => l.includes('# Changelog'))).toBe(false)
    expect(
      entries[0].body.some((l) => l.includes('All notable changes')),
    ).toBe(false)
  })

  it('returns an empty array on empty input', () => {
    expect(parseChangelog('')).toEqual([])
  })

  it('tolerates a round before any version heading', () => {
    const out = parseChangelog('### Round 99 — synthetic\n- one bullet\n')
    expect(out).toHaveLength(1)
    expect(out[0].title).toBe('')
    expect(out[0].rounds).toHaveLength(1)
    expect(out[0].rounds[0].title).toBe('Round 99 — synthetic')
  })

  it('tolerates a subsection before any round heading', () => {
    const out = parseChangelog(
      '## [Unreleased]\n#### Orphan section\n- bullet\n',
    )
    expect(out).toHaveLength(1)
    expect(out[0].rounds).toHaveLength(1)
    expect(out[0].rounds[0].subsections).toHaveLength(1)
    expect(out[0].rounds[0].subsections[0].title).toBe('Orphan section')
  })
})
