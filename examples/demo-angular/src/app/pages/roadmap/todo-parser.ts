/**
 * Local copy of the TODO.md parser from `examples/_shared/src/parsers/todo.ts`.
 *
 * Inlined here because demo-angular doesn't depend on the
 * `@skygraph-examples/shared` workspace package (the demo would have
 * to add it as a peer; the task spec disallows mutating the lockfile).
 * Keep behaviour byte-identical with the shared version — when the
 * shared package's parser changes, sync this file by hand.
 */

export type TodoStatus = 'open' | 'closed'

export interface TodoItem {
  id: string
  title: string
  status: TodoStatus
  body: string[]
}

export interface TodoSection {
  id: string
  title: string
  items: TodoItem[]
}

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
      item = { id: meta.id, title: meta.title, status: meta.status, body: [] }
      if (!section) {
        section = { id: '', title: '', items: [] }
        sections.push(section)
      }
      section.items.push(item)
      continue
    }

    if (item) item.body.push(line)
  }

  for (const s of sections) {
    for (const i of s.items) i.body = trimEdgeBlanks(i.body)
  }

  return sections.filter((s) => s.items.length > 0)
}

function parseSectionTitle(raw: string): { id: string; title: string } {
  const m = raw.match(/^(\d+)\.\s*(.+)$/)
  if (m) return { id: m[1], title: m[2].trim() }
  return { id: '', title: raw }
}

function parseItemTitle(raw: string): { id: string; title: string; status: TodoStatus } {
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

export function stripInlineMarkdown(line: string): string {
  return line
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^\s*[-*]\s+/, '· ')
    .replace(/^~~(.+?)~~/, '$1')
    .trim()
}

/** Numeric-aware id comparator for `"1.2"` vs `"1.10"`. */
export function compareIds(a: string, b: string): number {
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

export function summarizeBody(item: TodoItem): string {
  return item.body
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .slice(0, 3)
    .map(stripInlineMarkdown)
    .join('\n')
}
