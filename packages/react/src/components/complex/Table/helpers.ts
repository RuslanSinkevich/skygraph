import type { RowId } from '@skygraph/core'
import type { TableColumn, HeaderCell, FlatRow, CellSpan } from './types'

export function flattenLeafColumns(cols: TableColumn[]): TableColumn[] {
  const result: TableColumn[] = []
  for (const col of cols) {
    if (col.children && col.children.length > 0) {
      result.push(...flattenLeafColumns(col.children))
    } else {
      result.push(col)
    }
  }
  return result
}

export function buildHeaderRows(cols: TableColumn[]): HeaderCell[][] {
  function getDepth(c: TableColumn): number {
    if (!c.children || c.children.length === 0) return 1
    return 1 + Math.max(...c.children.map(getDepth))
  }

  const maxDepth = cols.length > 0 ? Math.max(...cols.map(getDepth)) : 1

  function getLeafCount(c: TableColumn): number {
    if (!c.children || c.children.length === 0) return 1
    return c.children.reduce((sum, ch) => sum + getLeafCount(ch), 0)
  }

  const rows: HeaderCell[][] = Array.from({ length: maxDepth }, () => [])

  function fill(list: TableColumn[], depth: number) {
    for (const c of list) {
      if (c.children && c.children.length > 0) {
        rows[depth].push({ col: c, colSpan: getLeafCount(c), rowSpan: 1 })
        fill(c.children, depth + 1)
      } else {
        rows[depth].push({ col: c, colSpan: 1, rowSpan: maxDepth - depth })
      }
    }
  }

  fill(cols, 0)
  return rows
}

export function flattenTreeRows(
  rows: Array<{ id: RowId; data: Record<string, unknown> }>,
  childrenKey: string,
  expandedSet: Set<RowId>,
  depth = 0,
): FlatRow[] {
  const result: FlatRow[] = []
  for (const row of rows) {
    const children = row.data[childrenKey] as Array<{ id: RowId; data: Record<string, unknown> }> | undefined
    const hasChildren = Array.isArray(children) && children.length > 0
    result.push({ id: row.id, data: row.data, depth, hasChildren })
    if (hasChildren && expandedSet.has(row.id)) {
      result.push(...flattenTreeRows(children!, childrenKey, expandedSet, depth + 1))
    }
  }
  return result
}

export function collectAllTreeIds(
  rows: Array<{ id: RowId; data: Record<string, unknown> }>,
  childrenKey: string,
): RowId[] {
  const ids: RowId[] = []
  for (const row of rows) {
    const children = row.data[childrenKey] as Array<{ id: RowId; data: Record<string, unknown> }> | undefined
    if (Array.isArray(children) && children.length > 0) {
      ids.push(row.id)
      ids.push(...collectAllTreeIds(children, childrenKey))
    }
  }
  return ids
}

export function computeSpanMap(
  columns: TableColumn[],
  flatRows: FlatRow[],
): Map<string, CellSpan> {
  const map = new Map<string, CellSpan>()
  const hasOnCell = columns.some((c) => c.onCell)
  if (!hasOnCell) return map
  flatRows.forEach((row, rowIndex) => {
    for (const col of columns) {
      if (col.onCell) {
        const span = col.onCell(row.data, rowIndex)
        if (span && (span.rowSpan !== undefined || span.colSpan !== undefined)) {
          map.set(`${row.id}:${col.key}`, span)
        }
      }
    }
  })
  return map
}

export function computeHiddenCells(
  columns: TableColumn[],
  flatRows: FlatRow[],
  spanMap: Map<string, CellSpan>,
): Set<string> {
  const hidden = new Set<string>()
  const hasOnCell = columns.some((c) => c.onCell)
  if (!hasOnCell) return hidden
  flatRows.forEach((row, rowIndex) => {
    for (let ci = 0; ci < columns.length; ci++) {
      const key = `${row.id}:${columns[ci].key}`
      const span = spanMap.get(key)
      if (!span) continue
      if (span.rowSpan === 0 || span.colSpan === 0) {
        hidden.add(key)
        continue
      }
      const rs = span.rowSpan ?? 1
      const cs = span.colSpan ?? 1
      for (let dr = 0; dr < rs; dr++) {
        for (let dc = 0; dc < cs; dc++) {
          if (dr === 0 && dc === 0) continue
          const targetRow = flatRows[rowIndex + dr]
          const targetCol = columns[ci + dc]
          if (targetRow && targetCol) {
            hidden.add(`${targetRow.id}:${targetCol.key}`)
          }
        }
      }
    }
  })
  return hidden
}

export function getFixedStyle(
  col: TableColumn,
  fixedLeftOffsets: Record<string, number>,
  fixedRightOffsets: Record<string, number>,
  isHeader?: boolean,
): React.CSSProperties {
  const s: React.CSSProperties = {}
  if (col.align) s.textAlign = col.align
  if (col.ellipsis) {
    s.overflow = 'hidden'
    s.textOverflow = 'ellipsis'
    s.whiteSpace = 'nowrap'
  }
  if (col.fixed === 'left') {
    s.position = 'sticky'
    s.left = fixedLeftOffsets[col.key]
    s.zIndex = isHeader ? 4 : 2
  }
  if (col.fixed === 'right') {
    s.position = 'sticky'
    s.right = fixedRightOffsets[col.key]
    s.zIndex = isHeader ? 4 : 2
  }
  return s
}
