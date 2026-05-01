/**
 * Single source of truth for semantic status → tag colour mapping.
 * Used by every showcase to keep visual language consistent.
 */

export type SemanticStatus =
  // Generic
  | 'success' | 'warning' | 'error' | 'info' | 'default'
  // People / users
  | 'active' | 'on-leave' | 'remote' | 'terminated'
  | 'suspended' | 'pending' | 'deactivated'
  | 'vip' | 'inactive'
  // Pipelines / orders
  | 'lead' | 'customer' | 'churned' | 'prospect'
  | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  // Tasks
  | 'todo' | 'in-progress' | 'review' | 'done' | 'blocked'
  | 'critical' | 'high' | 'medium' | 'low'
  // Tickets
  | 'open' | 'resolved' | 'closed' | 'escalated'

export const TAG_COLOR: Record<SemanticStatus, string> = {
  success: 'success', warning: 'warning', error: 'error', info: 'processing', default: 'default',

  active: 'success', 'on-leave': 'warning', remote: 'processing', terminated: 'error',
  suspended: 'error', pending: 'warning', deactivated: 'default',
  vip: 'error', inactive: 'default',

  lead: 'processing', customer: 'success', churned: 'error', prospect: 'warning',
  qualification: 'default', proposal: 'processing', negotiation: 'warning',
  'closed-won': 'success', 'closed-lost': 'error',

  paid: 'processing', shipped: 'processing', delivered: 'success', cancelled: 'error',

  todo: 'default', 'in-progress': 'processing', review: 'warning', done: 'success', blocked: 'error',
  critical: 'error', high: 'warning', medium: 'processing', low: 'default',

  open: 'processing', resolved: 'success', closed: 'default', escalated: 'error',
}

export function statusColor(s: string): string {
  return TAG_COLOR[s as SemanticStatus] ?? 'default'
}

/** CSS variables for ad-hoc use (charts, progress bars). */
export const SEMANTIC_HEX: Record<string, string> = {
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  processing: '#1677ff',
  default: '#8c8c8c',
}
