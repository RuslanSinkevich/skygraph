export type UserRole = 'admin' | 'editor' | 'viewer' | 'moderator' | 'support'
export type UserStatus = 'active' | 'suspended' | 'pending' | 'deactivated'

export interface SystemUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatar: string
  department: string
  lastLogin: string
  createdAt: string
  twoFactor: boolean
  loginCount: number
}

export interface AuditEntry {
  id: string
  userId: string
  userName: string
  action: string
  target: string
  ip: string
  timestamp: string
  severity: 'info' | 'warning' | 'critical'
  details: string
}

export interface RoleDefinition {
  key: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

export interface SystemSetting {
  key: string
  label: string
  category: string
  value: string | boolean | number
  type: 'toggle' | 'text' | 'number' | 'select'
  options?: string[]
  description: string
}

const firstNames = ['Alex', 'Maria', 'James', 'Sophie', 'Liam', 'Emma', 'Noah', 'Olivia', 'Ivan', 'Anna', 'Daniel', 'Lisa', 'Tom', 'Kate', 'Ben', 'Sarah', 'Max', 'Julia', 'Chris', 'Elena', 'Raj', 'Priya', 'Yuki', 'Carlos', 'Lin', 'Omar', 'Victor', 'Diana', 'Paul', 'Nina']
const lastNames = ['Johnson', 'Smith', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Clark', 'Lewis', 'Walker', 'Hall', 'Young', 'King']
const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Support', 'Finance', 'HR', 'Operations', 'Legal']

const actions = [
  'user.login', 'user.logout', 'user.create', 'user.update', 'user.delete', 'user.suspend',
  'role.assign', 'role.revoke', 'settings.update', 'permission.grant', 'permission.revoke',
  'export.data', 'import.data', 'api_key.create', 'api_key.revoke', 'password.reset',
  'two_factor.enable', 'two_factor.disable', 'session.terminate', 'backup.create',
]

const targets = [
  'User #1042', 'User #3891', 'Role: Editor', 'Role: Admin', 'API Key: prod-***',
  'System Settings', 'Export: users.csv', 'Session: Chrome/Win', 'Backup: db-2025-01',
  'User #2156', 'Permission: manage_users', 'User #4521', 'Role: Support', 'API Key: dev-***',
]

const ips = ['192.168.1.42', '10.0.0.15', '172.16.0.88', '192.168.2.100', '10.0.1.55', '203.0.113.42', '198.51.100.7', '192.0.2.1']

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const systemUsers: SystemUser[] = Array.from({ length: 45 }, (_, i) => {
  const first = pick(firstNames)
  const last = pick(lastNames)
  const roles: UserRole[] = ['admin', 'editor', 'editor', 'viewer', 'viewer', 'viewer', 'moderator', 'support']
  const statuses: UserStatus[] = ['active', 'active', 'active', 'active', 'suspended', 'pending', 'deactivated']
  return {
    id: `u${i + 1}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@company.io`,
    role: pick(roles),
    status: pick(statuses),
    avatar: first[0] + last[0],
    department: pick(departments),
    lastLogin: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString().slice(0, 16).replace('T', ' '),
    createdAt: new Date(Date.now() - Math.random() * 365 * 86400000).toISOString().slice(0, 10),
    twoFactor: Math.random() > 0.4,
    loginCount: Math.floor(Math.random() * 500) + 1,
  }
})

export const auditLog: AuditEntry[] = Array.from({ length: 80 }, (_, i) => {
  const user = pick(systemUsers)
  const action = pick(actions)
  const severities: AuditEntry['severity'][] = ['info', 'info', 'info', 'info', 'warning', 'warning', 'critical']
  const severity = action.includes('delete') || action.includes('suspend') || action.includes('revoke')
    ? pick(['warning', 'critical'] as const)
    : pick(severities)
  return {
    id: `log${i + 1}`,
    userId: user.id,
    userName: user.name,
    action,
    target: pick(targets),
    ip: pick(ips),
    timestamp: new Date(Date.now() - Math.random() * 14 * 86400000).toISOString().slice(0, 19).replace('T', ' '),
    severity,
    details: `${action.replace('.', ': ')} performed on ${pick(targets)} from ${pick(ips)}`,
  }
}).sort((a, b) => b.timestamp.localeCompare(a.timestamp))

export const allPermissions = [
  'manage_users', 'view_users', 'manage_roles', 'view_roles',
  'manage_settings', 'view_settings', 'manage_content', 'edit_content', 'view_content',
  'manage_api_keys', 'view_audit_log', 'export_data', 'import_data',
  'manage_billing', 'view_billing', 'manage_integrations', 'view_analytics',
  'manage_backups', 'terminate_sessions', 'view_system_health',
]

export const roles: RoleDefinition[] = [
  {
    key: 'admin',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    permissions: allPermissions,
    userCount: systemUsers.filter(u => u.role === 'admin').length,
  },
  {
    key: 'editor',
    name: 'Editor',
    description: 'Can manage content and view users',
    permissions: ['view_users', 'manage_content', 'edit_content', 'view_content', 'view_settings', 'export_data', 'view_analytics'],
    userCount: systemUsers.filter(u => u.role === 'editor').length,
  },
  {
    key: 'moderator',
    name: 'Moderator',
    description: 'Can moderate content and manage basic user actions',
    permissions: ['view_users', 'manage_content', 'edit_content', 'view_content', 'view_audit_log', 'terminate_sessions'],
    userCount: systemUsers.filter(u => u.role === 'moderator').length,
  },
  {
    key: 'support',
    name: 'Support Agent',
    description: 'Can view users and handle support tickets',
    permissions: ['view_users', 'view_content', 'view_settings', 'view_audit_log', 'view_billing'],
    userCount: systemUsers.filter(u => u.role === 'support').length,
  },
  {
    key: 'viewer',
    name: 'Viewer',
    description: 'Read-only access to content and reports',
    permissions: ['view_users', 'view_content', 'view_settings', 'view_analytics'],
    userCount: systemUsers.filter(u => u.role === 'viewer').length,
  },
]

export const systemSettings: SystemSetting[] = [
  { key: 'site_name', label: 'Site Name', category: 'general', value: 'My Application', type: 'text', description: 'Public name of the application' },
  { key: 'maintenance_mode', label: 'Maintenance Mode', category: 'general', value: false, type: 'toggle', description: 'Enable maintenance mode for all users' },
  { key: 'registration', label: 'Allow Registration', category: 'general', value: true, type: 'toggle', description: 'Allow new users to register' },
  { key: 'default_role', label: 'Default Role', category: 'general', value: 'viewer', type: 'select', options: ['viewer', 'editor', 'support'], description: 'Default role for new users' },
  { key: 'session_timeout', label: 'Session Timeout (min)', category: 'security', value: 30, type: 'number', description: 'Inactive session timeout in minutes' },
  { key: 'max_login_attempts', label: 'Max Login Attempts', category: 'security', value: 5, type: 'number', description: 'Lock account after N failed attempts' },
  { key: 'require_2fa', label: 'Require 2FA', category: 'security', value: false, type: 'toggle', description: 'Force two-factor authentication for all users' },
  { key: 'password_min_length', label: 'Min Password Length', category: 'security', value: 8, type: 'number', description: 'Minimum password length requirement' },
  { key: 'ip_whitelist', label: 'IP Whitelist', category: 'security', value: '', type: 'text', description: 'Comma-separated list of allowed IPs (empty = all)' },
  { key: 'smtp_host', label: 'SMTP Host', category: 'email', value: 'smtp.company.io', type: 'text', description: 'Email server hostname' },
  { key: 'smtp_port', label: 'SMTP Port', category: 'email', value: 587, type: 'number', description: 'Email server port' },
  { key: 'email_from', label: 'From Address', category: 'email', value: 'noreply@company.io', type: 'text', description: 'Sender email address' },
  { key: 'send_welcome_email', label: 'Welcome Email', category: 'email', value: true, type: 'toggle', description: 'Send welcome email on user creation' },
  { key: 'backup_frequency', label: 'Backup Frequency', category: 'system', value: 'daily', type: 'select', options: ['hourly', 'daily', 'weekly'], description: 'Automatic backup schedule' },
  { key: 'log_retention', label: 'Log Retention (days)', category: 'system', value: 90, type: 'number', description: 'How long to keep audit logs' },
  { key: 'api_rate_limit', label: 'API Rate Limit (/min)', category: 'system', value: 100, type: 'number', description: 'Max API requests per minute per user' },
]

export function userToRow(u: SystemUser) {
  return { id: u.id, data: { ...u } as Record<string, unknown> }
}

export function auditToRow(a: AuditEntry) {
  return { id: a.id, data: { ...a } as Record<string, unknown> }
}
