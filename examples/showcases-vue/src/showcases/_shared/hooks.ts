import { computed, type Ref } from 'vue'
import type { RowId } from '@skygraph/vue'

/** Generic case-insensitive multi-field text filter (Vue composable). */
export function useFilteredList<T>(list: Ref<T[]> | T[], query: Ref<string>, fields: (keyof T)[]) {
  return computed(() => {
    const src = Array.isArray(list) ? list : list.value
    const q = query.value.trim().toLowerCase()
    if (!q) return src
    return src.filter((item) =>
      fields.some((f) =>
        String(item[f] ?? '')
          .toLowerCase()
          .includes(q),
      ),
    )
  })
}

/** Convert flat records into the `{ id, data }` shape Table expects. */
export function toTableRows<T extends { id: string | number }>(
  items: T[],
): Array<{ id: RowId; data: Record<string, unknown> }> {
  return items.map((it) => ({ id: it.id as RowId, data: { ...it } as Record<string, unknown> }))
}
