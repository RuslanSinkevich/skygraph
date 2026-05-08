import type {
  ChangelogEntry,
  ChangelogRound,
  ChangelogSubsection,
} from '../types/changelog'

/**
 * Parse the repository's `CHANGELOG.md` into a structured tree.
 *
 * Recognised headings:
 *   - `## [Unreleased]` / `## [0.4.0] — 2026-04-30`  → `ChangelogEntry`
 *   - `### Round N — ...`                            → `ChangelogRound`
 *   - `#### <Subsection title>`                      → `ChangelogSubsection`
 *
 * Anything that is not a heading is appended to the body of whatever
 * level is currently open. Body lines retain their original markdown
 * (so `**bold**`, `` `code` ``, list bullets are preserved verbatim and
 * the consumer decides whether to render them as plain text or run a
 * markdown renderer).
 *
 * The parser is intentionally tolerant: malformed sections degrade
 * gracefully into the most recent valid container instead of throwing.
 */
export function parseChangelog(md: string): ChangelogEntry[] {
  const lines = md.split(/\r?\n/)
  const entries: ChangelogEntry[] = []

  let entry: ChangelogEntry | null = null
  let round: ChangelogRound | null = null
  let subsection: ChangelogSubsection | null = null

  const pushBody = (line: string) => {
    if (subsection) {
      subsection.body.push(line)
    } else if (round) {
      round.body.push(line)
    } else if (entry) {
      entry.body.push(line)
    }
  }

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '')
    const trimmed = line.trim()

    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      const title = trimmed.slice(3).trim()
      const meta = extractVersion(title)
      entry = {
        title,
        version: meta.version,
        date: meta.date,
        body: [],
        rounds: [],
      }
      round = null
      subsection = null
      entries.push(entry)
      continue
    }

    if (trimmed.startsWith('### ') && !trimmed.startsWith('#### ')) {
      const title = trimmed.slice(4).trim()
      round = { title, body: [], subsections: [] }
      subsection = null
      if (!entry) {
        // Round before any `## [version]` — start a synthetic top-level
        // entry so we still surface it.
        entry = {
          title: '',
          version: null,
          date: null,
          body: [],
          rounds: [],
        }
        entries.push(entry)
      }
      entry.rounds.push(round)
      continue
    }

    if (trimmed.startsWith('#### ')) {
      const title = trimmed.slice(5).trim()
      subsection = { title, body: [] }
      if (!round) {
        // Subsection before any `### Round N` — synthesise a nameless
        // round so the subsection has somewhere to live.
        round = { title: '', body: [], subsections: [] }
        if (!entry) {
          entry = {
            title: '',
            version: null,
            date: null,
            body: [],
            rounds: [],
          }
          entries.push(entry)
        }
        entry.rounds.push(round)
      }
      round.subsections.push(subsection)
      continue
    }

    // Skip the document title (`# Changelog`) and the leading prose
    // before the first `## [version]` heading — that material is not
    // round-specific and the demo's "What's new" surface doesn't need
    // it.
    if (entry === null) continue

    pushBody(line)
  }

  for (const e of entries) {
    e.body = trimEdgeBlanks(e.body)
    for (const r of e.rounds) {
      r.body = trimEdgeBlanks(r.body)
      for (const s of r.subsections) {
        s.body = trimEdgeBlanks(s.body)
      }
    }
  }

  return entries
}

/**
 * Extract `[version]` and optional ISO date from a `## ` heading title.
 *
 * Examples:
 *   "[Unreleased]"               → { version: 'Unreleased', date: null }
 *   "[0.4.0] — 2026-04-30"       → { version: '0.4.0',      date: '2026-04-30' }
 *   "[0.4.0] - 2026-04-30"       → { version: '0.4.0',      date: '2026-04-30' }
 *   "Released"                   → { version: null,         date: null }
 */
function extractVersion(title: string): {
  version: string | null
  date: string | null
} {
  const m = title.match(/^\[([^\]]+)\]\s*(?:[—\-–]\s*([\d-]+))?\s*$/)
  if (!m) return { version: null, date: null }
  return { version: m[1] ?? null, date: m[2] ?? null }
}

/**
 * Drop leading / trailing blank lines so consumers can render bodies
 * without extra padding without having to trim themselves.
 */
function trimEdgeBlanks(lines: string[]): string[] {
  let start = 0
  let end = lines.length
  while (start < end && lines[start].trim() === '') start++
  while (end > start && lines[end - 1].trim() === '') end--
  return lines.slice(start, end)
}
