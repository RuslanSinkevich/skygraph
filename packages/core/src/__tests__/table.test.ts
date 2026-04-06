import { describe, it, expect, vi } from 'vitest'
import { createCore } from '../Core'
import { createTable } from '../engines/table/TableEngine'

describe('TableEngine: basic CRUD', () => {
  it('adds a row and retrieves it', () => {
    const core = createCore()
    const table = createTable(core)

    table.addRow('r1', { name: 'Alice', age: 30 })
    expect(table.getRow('r1')).toEqual({ name: 'Alice', age: 30 })
  })

  it('adds multiple rows at once', () => {
    const core = createCore()
    const table = createTable(core)

    table.addRows([
      { id: 'r1', data: { name: 'Alice' } },
      { id: 'r2', data: { name: 'Bob' } },
      { id: 'r3', data: { name: 'Charlie' } },
    ])

    expect(table.getAllRowIds()).toEqual(['r1', 'r2', 'r3'])
    expect(table.getTableState().totalRows).toBe(3)
  })

  it('removes a row', () => {
    const core = createCore()
    const table = createTable(core)

    table.addRow('r1', { name: 'Alice' })
    table.addRow('r2', { name: 'Bob' })
    table.removeRow('r1')

    expect(table.getAllRowIds()).toEqual(['r2'])
    expect(table.getTableState().totalRows).toBe(1)
  })

  it('updates a cell', () => {
    const core = createCore()
    const table = createTable(core)

    table.addRow('r1', { name: 'Alice', age: 30 })
    table.updateCell('r1', 'age', 31)

    expect(table.getCell('r1', 'age')).toBe(31)
    expect(table.getRow('r1')).toEqual({ name: 'Alice', age: 31 })
  })

  it('cell updates reflect in getCell', () => {
    const core = createCore()
    const table = createTable(core)

    table.addRow('r1', { name: 'Alice' })
    expect(table.getCell('r1', 'name')).toBe('Alice')

    table.updateCell('r1', 'name', 'Alicia')
    expect(table.getCell('r1', 'name')).toBe('Alicia')
    expect(table.getRow('r1')?.name).toBe('Alicia')
  })
})

describe('TableEngine: pagination', () => {
  function createLargeTable(size: number) {
    const core = createCore()
    const table = createTable(core, { pageSize: 10 })

    const rows = Array.from({ length: size }, (_, i) => ({
      id: `r${i}`,
      data: { name: `User ${i}`, value: i },
    }))
    table.addRows(rows)
    return { core, table }
  }

  it('returns first page by default', () => {
    const { table } = createLargeTable(100)
    const visible = table.getVisibleRows()

    expect(visible.length).toBe(10)
    expect(visible[0].id).toBe('r0')
    expect(visible[9].id).toBe('r9')
  })

  it('navigates to page 2', () => {
    const { table } = createLargeTable(100)
    table.setPage(2)

    const visible = table.getVisibleRows()
    expect(visible[0].id).toBe('r10')
    expect(visible[9].id).toBe('r19')
  })

  it('nextPage / prevPage', () => {
    const { table } = createLargeTable(30)

    table.nextPage()
    expect(table.getTableState().page).toBe(2)

    table.nextPage()
    expect(table.getTableState().page).toBe(3)

    table.nextPage()
    expect(table.getTableState().page).toBe(3) // clamped

    table.prevPage()
    expect(table.getTableState().page).toBe(2)
  })

  it('reports correct totalPages', () => {
    const { table } = createLargeTable(25)
    expect(table.getTableState().totalPages).toBe(3)
  })

  it('last page has correct row count', () => {
    const { table } = createLargeTable(25)
    table.setPage(3)
    expect(table.getVisibleRows().length).toBe(5)
  })
})

describe('TableEngine: sorting', () => {
  it('sorts ascending', () => {
    const core = createCore()
    const table = createTable(core, { pageSize: 100 })

    table.addRows([
      { id: 'r1', data: { name: 'Charlie' } },
      { id: 'r2', data: { name: 'Alice' } },
      { id: 'r3', data: { name: 'Bob' } },
    ])

    table.setSort('name', 'asc')
    const rows = table.getVisibleRows()
    expect(rows.map((r) => r.data.name)).toEqual(['Alice', 'Bob', 'Charlie'])
  })

  it('sorts descending', () => {
    const core = createCore()
    const table = createTable(core, { pageSize: 100 })

    table.addRows([
      { id: 'r1', data: { value: 10 } },
      { id: 'r2', data: { value: 30 } },
      { id: 'r3', data: { value: 20 } },
    ])

    table.setSort('value', 'desc')
    const rows = table.getVisibleRows()
    expect(rows.map((r) => r.data.value)).toEqual([30, 20, 10])
  })

  it('clearSort restores original order', () => {
    const core = createCore()
    const table = createTable(core, { pageSize: 100 })

    table.addRows([
      { id: 'r1', data: { name: 'Charlie' } },
      { id: 'r2', data: { name: 'Alice' } },
      { id: 'r3', data: { name: 'Bob' } },
    ])

    table.setSort('name', 'asc')
    table.clearSort()

    const rows = table.getVisibleRows()
    expect(rows.map((r) => r.id)).toEqual(['r1', 'r2', 'r3'])
  })
})

describe('TableEngine: filtering', () => {
  it('filters by exact value', () => {
    const core = createCore()
    const table = createTable(core, { pageSize: 100 })

    table.addRows([
      { id: 'r1', data: { city: 'Moscow', age: 25 } },
      { id: 'r2', data: { city: 'Berlin', age: 30 } },
      { id: 'r3', data: { city: 'Moscow', age: 35 } },
    ])

    table.addFilter({ column: 'city', value: 'Moscow' })
    const rows = table.getVisibleRows()

    expect(rows.length).toBe(2)
    expect(rows.map((r) => r.id)).toEqual(['r1', 'r3'])
  })

  it('filters by contains (string)', () => {
    const core = createCore()
    const table = createTable(core, { pageSize: 100 })

    table.addRows([
      { id: 'r1', data: { name: 'Alexander' } },
      { id: 'r2', data: { name: 'Bob' } },
      { id: 'r3', data: { name: 'Alex Jr' } },
    ])

    table.addFilter({ column: 'name', value: 'alex', operator: 'contains' })
    const rows = table.getVisibleRows()

    expect(rows.length).toBe(2)
    expect(rows.map((r) => r.id)).toEqual(['r1', 'r3'])
  })

  it('filters by numeric comparison', () => {
    const core = createCore()
    const table = createTable(core, { pageSize: 100 })

    table.addRows([
      { id: 'r1', data: { score: 50 } },
      { id: 'r2', data: { score: 80 } },
      { id: 'r3', data: { score: 70 } },
    ])

    table.addFilter({ column: 'score', value: 60, operator: 'gte' })
    const rows = table.getVisibleRows()

    expect(rows.length).toBe(2)
    expect(rows.map((r) => r.data.score)).toEqual([80, 70])
  })

  it('removeFilter restores rows', () => {
    const core = createCore()
    const table = createTable(core, { pageSize: 100 })

    table.addRows([
      { id: 'r1', data: { active: true } },
      { id: 'r2', data: { active: false } },
    ])

    table.addFilter({ column: 'active', value: true })
    expect(table.getVisibleRows().length).toBe(1)

    table.removeFilter('active')
    expect(table.getVisibleRows().length).toBe(2)
  })

  it('custom filterFn', () => {
    const core = createCore()
    const table = createTable(core, { pageSize: 100 })

    table.addRows([
      { id: 'r1', data: { x: 1, y: 2 } },
      { id: 'r2', data: { x: 5, y: 10 } },
      { id: 'r3', data: { x: 3, y: 4 } },
    ])

    table.setFilterFn((row) => (row.x as number) + (row.y as number) > 5)
    const rows = table.getVisibleRows()

    expect(rows.length).toBe(2)
    expect(rows.map((r) => r.id)).toEqual(['r2', 'r3'])
  })

  it('filter + sort combined', () => {
    const core = createCore()
    const table = createTable(core, { pageSize: 100 })

    table.addRows([
      { id: 'r1', data: { city: 'Moscow', name: 'Zara' } },
      { id: 'r2', data: { city: 'Berlin', name: 'Bob' } },
      { id: 'r3', data: { city: 'Moscow', name: 'Alice' } },
    ])

    table.addFilter({ column: 'city', value: 'Moscow' })
    table.setSort('name', 'asc')

    const rows = table.getVisibleRows()
    expect(rows.map((r) => r.data.name)).toEqual(['Alice', 'Zara'])
  })

  it('filter resets page to 1', () => {
    const core = createCore()
    const table = createTable(core, { pageSize: 2 })

    table.addRows([
      { id: 'r1', data: { x: 1 } },
      { id: 'r2', data: { x: 2 } },
      { id: 'r3', data: { x: 3 } },
      { id: 'r4', data: { x: 4 } },
    ])

    table.setPage(2)
    expect(table.getTableState().page).toBe(2)

    table.addFilter({ column: 'x', value: 1 })
    expect(table.getTableState().page).toBe(1)
  })
})

describe('TableEngine: state in core', () => {
  it('publishes table state to core', () => {
    const core = createCore()
    const table = createTable(core, { pageSize: 10 })

    table.addRows(
      Array.from({ length: 25 }, (_, i) => ({
        id: `r${i}`,
        data: { v: i },
      }))
    )

    const state = table.getTableState()
    expect(state.totalRows).toBe(25)
    expect(state.filteredRows).toBe(25)
    expect(state.totalPages).toBe(3)
    expect(state.page).toBe(1)
    expect(state.pageSize).toBe(10)
  })
})

describe('TableEngine: scalability', () => {
  it('handles 100k rows', () => {
    const core = createCore()
    const table = createTable(core, { pageSize: 50 })

    const start = performance.now()
    const rows = Array.from({ length: 100_000 }, (_, i) => ({
      id: `r${i}`,
      data: { name: `User ${i}`, value: Math.random() * 1000 },
    }))
    table.addRows(rows)
    const addTime = performance.now() - start

    const start2 = performance.now()
    const visible = table.getVisibleRows()
    const visibleTime = performance.now() - start2

    const start3 = performance.now()
    table.setSort('value', 'desc')
    const sortTime = performance.now() - start3

    const start4 = performance.now()
    table.addFilter({ column: 'value', value: 500, operator: 'gte' })
    const filterTime = performance.now() - start4

    console.log(
      `  100k addRows: ${addTime.toFixed(0)}ms, ` +
        `getVisible: ${visibleTime.toFixed(1)}ms, ` +
        `sort: ${sortTime.toFixed(0)}ms, ` +
        `filter: ${filterTime.toFixed(0)}ms`
    )

    expect(visible.length).toBe(50)
    expect(table.getTableState().totalRows).toBe(100_000)
    expect(addTime).toBeLessThan(10000)
  })
})
