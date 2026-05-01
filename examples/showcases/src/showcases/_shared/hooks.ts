import { useMemo } from 'react'
import type { RowId } from '@skygraph/react'

/** Generic case-insensitive multi-field text filter. */
export function useFilteredList<T>(
  list: T[],
  query: string,
  fields: (keyof T)[],
): T[] {
  return useMemo(() => {
    if (!query.trim()) return list
    const q = query.toLowerCase()
    return list.filter((item) =>
      fields.some((f) => String(item[f] ?? '').toLowerCase().includes(q)),
    )
  }, [list, query, fields])
}

/** Convert a flat record into the `{ id, data }` shape Table expects. */
export function toTableRows<T extends { id: string | number }>(items: T[]): Array<{ id: RowId; data: Record<string, unknown> }> {
  return items.map((it) => ({ id: it.id as RowId, data: { ...it } as Record<string, unknown> }))
}

/** Memoised version of the above. */
export function useTableRows<T extends { id: string | number }>(items: T[]): Array<{ id: RowId; data: Record<string, unknown> }> {
  return useMemo(() => toTableRows(items), [items])
}
