import type { TransferItem } from '@skygraph/react'

export const mockData: TransferItem[] = Array.from({ length: 12 }, (_, i) => ({
  key: `${i}`,
  title: `Content ${i + 1}`,
  description: `Description for content ${i + 1}`,
}))

export const rolePermissions: TransferItem[] = [
  { key: 'users.read', title: 'Read users', description: 'View user profiles and lists' },
  { key: 'users.write', title: 'Write users', description: 'Create, edit, delete users' },
  { key: 'billing.read', title: 'Read billing', description: 'View invoices and plans' },
  { key: 'billing.write', title: 'Write billing', description: 'Change plan / payment methods', disabled: true },
  { key: 'audit.read', title: 'Read audit log' },
  { key: 'audit.export', title: 'Export audit log' },
]
