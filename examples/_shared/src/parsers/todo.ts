import type { TodoItem, TodoSection, TodoStatus } from '../types/todo'

/**
 * Parse the repository's `TODO.md` into a structured tree.
 *
 * Recognised headings:
 *   - `## 1. Большие задачи (отдельные стримы)`  → `TodoSection`
 *   - `### 1.1 ✅ Gantt / EventTimeline ...`     → `TodoItem`
 *   - `### 1.2 SchemaForm ...` (no ✅)           → open item
 *
 * Heading parser is permissive about the `Section.Item` numeric
 * prefix — sections without a number still get captured (with empty
 * `id`), and a leading `✅` anywhere in the first 3 chars after the
 * number marks the item as `closed`. Bodies preserve markdown.
 *
 * Returned arrays mirror file order so consumers can render the tree
 * top-to-bottom. Use `flattenTodos(...)` if you need a single flat
 * `TodoItem[]` for a timeline.
 */
export function parseTodo(md: string): TodoSection[] {
  const lines = md.split(/\r?\n/)
  const sections: TodoSection[] = []

  let section: TodoSection | null = null
  let item: TodoItem | null = null

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '')
    const trimmed = line.trim()

    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      const meta = parseSectionTitle(trimmed.slice(3).trim())
      section = { id: meta.id, title: meta.title, items: [] }
      item = null
      sections.push(section)
      continue
    }

    if (trimmed.startsWith('### ') && !trimmed.startsWith('#### ')) {
      const meta = parseItemTitle(trimmed.slice(4).trim())
      item = {
        id: meta.id,
        title: meta.title,
        status: meta.status,
        body: [],
      }
      if (!section) {
        section = { id: '', title: '', items: [] }
        sections.push(section)
      }
      section.items.push(item)
      continue
    }

    if (item) {
      item.body.push(line)
    }
  }

  for (const s of sections) {
    for (const i of s.items) {
      i.body = trimEdgeBlanks(i.body)
    }
  }

  return sections.filter((s) => s.items.length > 0)
}

/**
 * Flatten a parsed `TodoSection[]` into a single `TodoItem[]` list, in
 * file order. Useful for chronological surfaces (the Roadmap timeline
 * doesn't care which section an item belongs to once everything is
 * grouped by status / id).
 */
export function flattenTodos(sections: readonly TodoSection[]): TodoItem[] {
  const out: TodoItem[] = []
  for (const s of sections) {
    for (const i of s.items) out.push(i)
  }
  return out
}

/** Split `"1. Большие задачи (отдельные стримы)"` → id `"1"` + title. */
function parseSectionTitle(raw: string): { id: string; title: string } {
  const m = raw.match(/^(\d+)\.\s*(.+)$/)
  if (m) return { id: m[1], title: m[2].trim() }
  return { id: '', title: raw }
}

/**
 * Split `"1.1 ✅ Gantt / EventTimeline / ResourceCalendar"` →
 *   id `"1.1"`, title `"Gantt / EventTimeline / ResourceCalendar"`,
 *   status `"closed"`.
 */
function parseItemTitle(raw: string): {
  id: string
  title: string
  status: TodoStatus
} {
  let rest = raw
  let id = ''
  const m = rest.match(/^(\d+(?:\.\d+)*)\s+(.+)$/)
  if (m) {
    id = m[1]
    rest = m[2].trim()
  }
  let status: TodoStatus = 'open'
  if (rest.startsWith('✅')) {
    status = 'closed'
    rest = rest.slice(1).trim()
  }
  // Normalise the strikethrough marker some closed items use
  // (`~~Title~~`) — the Roadmap renders the status visually so the
  // markup adds noise.
  rest = rest.replace(/^~~(.+?)~~/, '$1')
  return { id, title: rest, status }
}

function trimEdgeBlanks(lines: string[]): string[] {
  let start = 0
  let end = lines.length
  while (start < end && lines[start].trim() === '') start++
  while (end > start && lines[end - 1].trim() === '') end--
  return lines.slice(start, end)
}
