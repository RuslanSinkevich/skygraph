import type { MenuItem } from '@skygraph/vue'

/**
 * Shared item sets used across the Menu examples.
 * Mirrors `examples/demo/src/demos/menu/data.ts` 1:1, minus the
 * `icon` props (Vue `MenuItem` does not have `icon` — see findings).
 */
export const sidebarItems: MenuItem[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'projects', label: 'Projects' },
  {
    key: 'team',
    label: 'Team',
    children: [
      { key: 'members', label: 'Members' },
      { key: 'roles', label: 'Roles' },
      { key: 'invites', label: 'Invites' },
    ],
  },
  {
    key: 'settings',
    label: 'Settings',
    children: [
      { key: 'billing', label: 'Billing' },
      { key: 'security', label: 'Security' },
      { key: 'integrations', label: 'Integrations' },
    ],
  },
  { key: 'logs', label: 'Audit log', disabled: true },
]

export const topItems: MenuItem[] = [
  { key: 'mail', label: 'Mail' },
  { key: 'app', label: 'App Center' },
  {
    key: 'workspace',
    label: 'Workspace',
    children: [
      { key: 'general', label: 'General' },
      { key: 'advanced', label: 'Advanced' },
      { key: 'experimental', label: 'Experimental' },
    ],
  },
  { key: 'help', label: 'Help' },
]

export const groupedItems: MenuItem[] = [
  {
    key: 'nav',
    type: 'group',
    label: 'Navigation',
    children: [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'projects', label: 'Projects' },
    ],
  },
  { key: 'div-1', type: 'divider', label: '' },
  {
    key: 'admin',
    type: 'group',
    label: 'Admin',
    children: [
      { key: 'billing', label: 'Billing' },
      { key: 'security', label: 'Security' },
      { key: 'danger', label: 'Delete workspace', danger: true },
    ],
  },
]

export const collapseItems: MenuItem[] = [
  { key: 'home', label: 'Home' },
  { key: 'mail', label: 'Mail' },
  { key: 'calendar', label: 'Calendar' },
  {
    key: 'settings',
    label: 'Settings',
    children: [
      { key: 'general', label: 'General' },
      { key: 'team', label: 'Team' },
    ],
  },
]
