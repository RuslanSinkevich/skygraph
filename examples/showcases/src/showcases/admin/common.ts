import type { UserRole, UserStatus } from './data'

export const roleColors: Record<UserRole, string> = {
  admin: 'error', editor: 'processing', viewer: 'default', moderator: 'warning', support: 'success',
}

export const statusColors: Record<UserStatus, string> = {
  active: 'success', suspended: 'error', pending: 'warning', deactivated: 'default',
}

export const severityColors: Record<string, string> = {
  info: 'default', warning: 'warning', critical: 'error',
}
