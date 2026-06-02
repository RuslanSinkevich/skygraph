/**
 * Local copy of the CHANGELOG.md parser from
 * `examples/_shared/src/parsers/changelog.ts`. Inlined here because
 * demo-angular doesn't depend on `@skygraph-examples/shared` (mirrors
 * the same decision as `todo-parser.ts` did before this refactor).
 *
 * Keep behaviour byte-identical with the shared version — when the
 * shared package's parser changes, sync this file by hand.
 */

export interface ChangelogSubsection {
  title: string
  body: string[]
}

export interface ChangelogRound {
  title: string
  body: string[]
  subsections: ChangelogSubsection[]
}

export interface ChangelogEntry {
  title: string
  version: string | null
  date: string | null
  body: string[]
  rounds: ChangelogRound[]
}

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
        entry = { title: '', version: null, date: null, body: [], rounds: [] }
        entries.push(entry)
      }
      entry.rounds.push(round)
      continue
    }

    if (trimmed.startsWith('#### ')) {
      const title = trimmed.slice(5).trim()
      subsection = { title, body: [] }
      if (!round) {
        round = { title: '', body: [], subsections: [] }
        if (!entry) {
          entry = { title: '', version: null, date: null, body: [], rounds: [] }
          entries.push(entry)
        }
        entry.rounds.push(round)
      }
      round.subsections.push(subsection)
      continue
    }

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

function extractVersion(title: string): {
  version: string | null
  date: string | null
} {
  const m = title.match(/^\[([^\]]+)\]\s*(?:[—\-–]\s*([\d-]+))?\s*$/)
  if (!m) return { version: null, date: null }
  return { version: m[1] ?? null, date: m[2] ?? null }
}

function trimEdgeBlanks(lines: string[]): string[] {
  let start = 0
  let end = lines.length
  while (start < end && lines[start].trim() === '') start++
  while (end > start && lines[end - 1].trim() === '') end--
  return lines.slice(start, end)
}
