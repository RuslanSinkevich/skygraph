/**
 * Shared dataset utilities for Table demos. Mirrors the React-side
 * `examples/demo/src/demos/table/data.ts` so demos can stay 1:1 with
 * `@skygraph/react`'s Table page.
 */
import type { TableColumn, RowId } from '@skygraph/vue'

export interface DemoRow {
  id: RowId
  data: Record<string, unknown>
}

/** Sample employee dataset reused by most Table demos. */
export const people: DemoRow[] = Array.from({ length: 12 }, (_, i) => ({
  id: `r${i}` as RowId,
  data: {
    name: [
      'Alice Johnson',
      'Bob Smith',
      'Charlie Brown',
      'Diana Prince',
      'Eve Davis',
      'Frank Miller',
      'Grace Lee',
      'Henry Ford',
      'Ivy Chen',
      'Jack Black',
      'Kate Young',
      'Leo Walker',
    ][i]!,
    age: 22 + ((i * 3) % 30),
    email: `user${i}@example.com`,
    city: ['Moscow', 'Berlin', 'Tokyo', 'London', 'Paris', 'New York'][i % 6]!,
    role: ['Developer', 'Designer', 'Manager', 'QA'][i % 4]!,
    salary: 3000 + i * 500,
    status: i % 3 === 0 ? 'active' : 'inactive',
  },
}))

/** Financial portfolio dataset for FinanceStyle / Realtime demos. */
export const portfolio: DemoRow[] = [
  {
    id: 'p1',
    data: {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      price: 182.31,
      delta: +2.41,
      pct: +1.34,
      volume: 58_300_000,
    },
  },
  {
    id: 'p2',
    data: {
      ticker: 'MSFT',
      name: 'Microsoft Corp.',
      price: 411.22,
      delta: +5.12,
      pct: +1.26,
      volume: 22_100_000,
    },
  },
  {
    id: 'p3',
    data: {
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 141.87,
      delta: -0.65,
      pct: -0.46,
      volume: 19_800_000,
    },
  },
  {
    id: 'p4',
    data: {
      ticker: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 176.04,
      delta: -1.32,
      pct: -0.74,
      volume: 35_400_000,
    },
  },
  {
    id: 'p5',
    data: {
      ticker: 'TSLA',
      name: 'Tesla Inc.',
      price: 177.58,
      delta: +4.89,
      pct: +2.83,
      volume: 91_700_000,
    },
  },
  {
    id: 'p6',
    data: {
      ticker: 'NVDA',
      name: 'NVIDIA Corp.',
      price: 878.37,
      delta: +12.05,
      pct: +1.39,
      volume: 45_900_000,
    },
  },
  {
    id: 'p7',
    data: {
      ticker: 'META',
      name: 'Meta Platforms.',
      price: 504.22,
      delta: -3.11,
      pct: -0.61,
      volume: 16_200_000,
    },
  },
  {
    id: 'p8',
    data: {
      ticker: 'NFLX',
      name: 'Netflix Inc.',
      price: 632.18,
      delta: +0.94,
      pct: +0.15,
      volume: 3_100_000,
    },
  },
]

/** Project utilisation dataset for ProgressCells demo. */
export const projects: DemoRow[] = [
  {
    id: 'prj1',
    data: {
      name: 'Website redesign',
      owner: 'Alice',
      progress: 92,
      budgetUsed: 78,
      deadline: '2026-05-10',
    },
  },
  {
    id: 'prj2',
    data: {
      name: 'Mobile app v2',
      owner: 'Bob',
      progress: 64,
      budgetUsed: 71,
      deadline: '2026-06-02',
    },
  },
  {
    id: 'prj3',
    data: {
      name: 'Backend migration',
      owner: 'Charlie',
      progress: 38,
      budgetUsed: 44,
      deadline: '2026-07-15',
    },
  },
  {
    id: 'prj4',
    data: {
      name: 'Analytics platform',
      owner: 'Diana',
      progress: 12,
      budgetUsed: 22,
      deadline: '2026-09-01',
    },
  },
  {
    id: 'prj5',
    data: {
      name: 'Payment integration',
      owner: 'Eve',
      progress: 100,
      budgetUsed: 95,
      deadline: '2026-04-20',
    },
  },
]

/** Org-chart style hierarchical data for TreeData demo. */
export const treeData: DemoRow[] = [
  {
    id: 'org' as RowId,
    data: {
      name: 'Acme Corporation',
      head: 'CEO — John Doe',
      budget: 2000000,
      employees: 340,
      children: [
        {
          id: 'dept-eng',
          data: {
            name: 'Engineering',
            head: 'VP — Alice Johnson',
            budget: 800000,
            employees: 120,
            children: [
              {
                id: 'team-frontend',
                data: {
                  name: 'Frontend',
                  head: 'Lead — Bob Smith',
                  budget: 350000,
                  employees: 50,
                },
              },
              {
                id: 'team-backend',
                data: {
                  name: 'Backend',
                  head: 'Lead — Julia Chen',
                  budget: 300000,
                  employees: 45,
                },
              },
              {
                id: 'team-qa',
                data: {
                  name: 'QA',
                  head: 'Lead — Nancy Black',
                  budget: 150000,
                  employees: 25,
                },
              },
            ],
          },
        },
        {
          id: 'dept-design',
          data: {
            name: 'Design',
            head: 'VP — Oscar Gray',
            budget: 400000,
            employees: 60,
          },
        },
        {
          id: 'dept-product',
          data: {
            name: 'Product',
            head: 'VP — Tina Copper',
            budget: 300000,
            employees: 40,
          },
        },
      ],
    },
  },
]

/** Lazy-loaded large dataset for Virtual demo. */
export function makeEmployees(count: number): DemoRow[] {
  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance']
  const roles = ['Developer', 'Manager', 'Analyst', 'Director']
  const statuses = ['Active', 'On Leave', 'Terminated']
  return Array.from({ length: count }, (_, i) => ({
    id: `v-${i}` as RowId,
    data: {
      id: i + 1,
      name: `Employee ${i + 1}`,
      department: departments[i % departments.length]!,
      role: roles[i % roles.length]!,
      salary: 50000 + i * 100,
      status: statuses[i % statuses.length]!,
    },
  }))
}

/** Mixed short/long messages for VirtualDynamic demo. */
export function makeMessages(count: number, startIndex = 0): DemoRow[] {
  const authors = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
  const short = 'Quick update.'
  const long =
    'Quarterly retrospective notes — we shipped four major features, paid down significant tech debt and the team morale is at a multi-year high. Big thanks to everyone involved!'
  return Array.from({ length: count }, (_, i) => {
    const idx = startIndex + i
    const isLong = idx % 4 === 0
    return {
      id: `m-${idx}` as RowId,
      data: {
        id: idx + 1,
        author: authors[idx % authors.length]!,
        long: isLong,
        preview: isLong ? `${long} (#${idx + 1})` : `${short} (#${idx + 1})`,
        timestamp: new Date(2026, 0, 1, (idx * 7) % 24, idx % 60).toISOString().slice(11, 16),
      },
    }
  })
}

/** Sales rows used by Grouping/Footer demos. */
export function makeSales(count: number): DemoRow[] {
  const regions = ['EU', 'APAC', 'NA', 'LATAM']
  const products = ['Alpha', 'Beta', 'Gamma', 'Delta']
  const sellers = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']
  return Array.from({ length: count }, (_, i) => ({
    id: `s-${i}` as RowId,
    data: {
      region: regions[i % regions.length]!,
      product: products[(i * 3) % products.length]!,
      salesperson: sellers[(i * 5) % sellers.length]!,
      amount: Math.round(((i * 137) % 2000) + 100 + Math.random() * 100),
      units: ((i * 11) % 50) + 1,
      date: new Date(2025, 11, ((i * 7) % 28) + 1).toISOString().slice(0, 10),
    },
  }))
}

// ── Legacy data (used by Vue-only demos that don't have a React analog) ────

export interface UserRow {
  name: string
  role: string
  team: string
  status: 'active' | 'paused' | 'archived'
  progress: number
}

const NAMES = [
  'Anna',
  'Boris',
  'Clara',
  'Dmitry',
  'Elena',
  'Fyodor',
  'Greta',
  'Hans',
  'Ivan',
  'Julia',
]
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
