import { h, type VNodeChild } from 'vue'
import type { MenuItem } from '@skygraph/vue'

/**
 * Shared item sets used across the Menu examples.
 * Mirrors `examples/demo/src/demos/menu/data.ts` 1:1; `MenuItem.icon`
 * accepts any VNode produced via `h()`.
 */

const dot = (bg: string): VNodeChild =>
  h('span', {
    style: {
      display: 'inline-block',
      width: '8px',
      height: '8px',
      borderRadius: '999px',
      background: bg,
    },
  })

export const iconItems: MenuItem[] = [
  { key: 'inbox', label: 'Inbox', icon: dot('var(--sg-color-primary)') },
  { key: 'starred', label: 'Starred', icon: dot('var(--sg-color-warning)') },
  { key: 'archive', label: 'Archive', icon: dot('var(--sg-color-text-tertiary)') },
  {
    key: 'labels',
    label: 'Labels',
    icon: dot('var(--sg-color-success)'),
    children: [
      { key: 'work', label: 'Work', icon: dot('var(--sg-blue-5)') },
      { key: 'personal', label: 'Personal', icon: dot('var(--sg-magenta-5)') },
    ],
  },
]

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
