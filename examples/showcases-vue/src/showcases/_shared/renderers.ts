import { statusColor } from './statusColors'
import { initials, colorFromString } from './formatters'

/**
 * Reusable cell-renderer helpers for `<SgTable>` columns.
 *
 * Vue tables accept either:
 *   - a `render` function returning a VNode/string, OR
 *   - column slots (`#cell:status`).
 *
 * To keep things light we return descriptor objects that callers turn into
 * scoped-slot templates inside `.vue` files. Helpers below are pure
 * computations only (string formatting, initials, color hash). See
 * `_shared/RendererSlots.vue` for shared scoped-slot fragments.
 */

export function statusTagColor(value: unknown): string {
  return statusColor(String(value ?? ''))
}

export function userCellAvatar(name: string): { initials: string; color: string } {
  return { initials: initials(name), color: colorFromString(name) }
}

export function ratingBarTone(value: number, max = 5): string {
  return value >= max * 0.8 ? '#52c41a' : value >= max * 0.6 ? '#faad14' : '#ff4d4f'
}

export function trendTag(value: unknown): { label: string; color: string } {
  const t = String(value)
  if (t === 'up') return { label: '↑ Up', color: 'success' }
  if (t === 'down') return { label: '↓ Down', color: 'error' }
  return { label: '→ Flat', color: 'default' }
}
