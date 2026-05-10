/**
 * Shared dataset utilities for Table demos.
 */
import type { TableColumn, RowId } from '@skygraph/vue'

export interface UserRow {
  name: string
  role: string
  team: string
  status: 'active' | 'paused' | 'archived'
  progress: number
}

const NAMES = ['Anna', 'Boris', 'Clara', 'Dmitry', 'Elena', 'Fyodor', 'Greta', 'Hans', 'Ivan', 'Julia']
const ROLES = ['Admin', 'Editor', 'Viewer']
const TEAMS = ['Apollo', 'Hermes', 'Zeus', 'Hera', 'Athena']
const STATUSES: UserRow['status'][] = ['active', 'paused', 'archived']

export function makeUserRows(count: number) {
  return Array.from({ length: count }).map((_, i) => ({
    id: String(i + 1) as RowId,
    data: {
      name: `${NAMES[i % NAMES.length]} ${i + 1}`,
      role: ROLES[i % ROLES.length],
      team: TEAMS[i % TEAMS.length],
      status: STATUSES[i % STATUSES.length],
      progress: ((i * 17) % 100) + 1,
    } satisfies UserRow as Record<string, unknown>,
  }))
}

export const userColumns: TableColumn[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'role', title: 'Role' },
  { key: 'team', title: 'Team', sortable: true },
  { key: 'status', title: 'Status', align: 'center' },
]
