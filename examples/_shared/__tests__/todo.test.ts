import { describe, expect, it } from 'vitest'
import { flattenTodos, parseTodo } from '../src/parsers/todo'

const FIXTURE = `# SkyGraph — TODO

> Реальные хвосты после round 1..9.

---

## 1. Большие задачи (отдельные стримы)

### 1.1 ✅ Gantt / EventTimeline / ResourceCalendar
- Tab A round 9: \`Gantt\` (drag/resize/dependencies/resources).
- Round 11 (\`f9b7af2\`): \`ResourceCalendar\`.

### 1.2 SchemaForm визуальный редактор
Заглушка.

### 1.3 ✅ Print / PDF
Закрыто round 11.

## 2. Функциональные расширения

### 2.1 ✅ TableEngine — pro закрыт
- ✅ ~~Расширенные фильтры~~ (round 8 Tab C).

### 2.2 Новая фича в работе
- бойлер
`

describe('parseTodo', () => {
  const sections = parseTodo(FIXTURE)

  it('returns one section per ## heading', () => {
    expect(sections).toHaveLength(2)
    expect(sections[0].id).toBe('1')
    expect(sections[0].title).toBe('Большие задачи (отдельные стримы)')
    expect(sections[1].id).toBe('2')
  })

  it('captures items with status open/closed', () => {
    const s1 = sections[0]
    expect(s1.items).toHaveLength(3)
    expect(s1.items[0].status).toBe('closed')
    expect(s1.items[1].status).toBe('open')
    expect(s1.items[2].status).toBe('closed')
  })

  it('strips ✅ from the title and keeps numeric id intact', () => {
    const item = sections[0].items[0]
    expect(item.id).toBe('1.1')
    expect(item.title).toBe('Gantt / EventTimeline / ResourceCalendar')
  })

  it('preserves body markdown verbatim', () => {
    const item = sections[0].items[0]
    expect(item.body[0]).toContain('Tab A round 9')
    expect(item.body[1]).toContain('ResourceCalendar')
  })

  it('treats a heading without ✅ as open', () => {
    const item = sections[0].items[1]
    expect(item.status).toBe('open')
    expect(item.title).toBe('SchemaForm визуальный редактор')
  })

  it('strips ~~strikethrough~~ from the title', () => {
    const out = parseTodo('## 1. Test\n### 1.1 ~~Title~~\n')
    expect(out[0].items[0].title).toBe('Title')
  })

  it('returns an empty array on empty input', () => {
    expect(parseTodo('')).toEqual([])
  })

  it('flattens sections in file order', () => {
    const flat = flattenTodos(sections)
    expect(flat).toHaveLength(5)
    expect(flat.map((i) => i.id)).toEqual(['1.1', '1.2', '1.3', '2.1', '2.2'])
  })

  it('tolerates an item before any section heading', () => {
    const out = parseTodo('### 1.1 ✅ Stray\n- body\n')
    expect(out).toHaveLength(1)
    expect(out[0].id).toBe('')
    expect(out[0].items[0].id).toBe('1.1')
  })

  it('drops sections that have no items', () => {
    const out = parseTodo('## 1. Empty section\n## 2. Real\n### 2.1 ✅ A\n')
    expect(out.map((s) => s.id)).toEqual(['2'])
    expect(out[0].items).toHaveLength(1)
  })
})
