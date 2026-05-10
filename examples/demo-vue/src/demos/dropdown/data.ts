import type { DropdownItem } from '@skygraph/vue'

/** Reusable action set for dropdown demos (string labels — see findings). */
export function makeActionItems(t: {
  edit: string
  duplicate: string
  archive: string
  delete: string
}): DropdownItem[] {
  return [
    { key: '1', label: t.edit },
    { key: '2', label: t.duplicate },
    { key: '3', label: t.archive, disabled: true },
    { key: 'd1', label: '', divider: true },
    { key: '4', label: t.delete, danger: true },
  ]
}
