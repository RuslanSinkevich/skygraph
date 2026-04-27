/** Row shape accepted by `Table`: an id plus an arbitrary data record. */
export interface DemoRow {
  id: string
  data: Record<string, unknown>
}

/** Sample employee dataset reused by most Table demos. */
export const people: DemoRow[] = Array.from({ length: 12 }, (_, i) => ({
  id: `r${i}`,
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
    ][i],
    age: 22 + (i * 3) % 30,
    email: `user${i}@example.com`,
    city: ['Moscow', 'Berlin', 'Tokyo', 'London', 'Paris', 'New York'][i % 6],
    role: ['Developer', 'Designer', 'Manager', 'QA'][i % 4],
    salary: 3000 + i * 500,
    status: i % 3 === 0 ? 'active' : 'inactive',
  },
}))

/** Org-chart style hierarchical data for Tree demos. */
export const treeData: DemoRow[] = [
  {
    id: 'org',
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

/** Financial "portfolio" dataset for FinanceStyle demo (deltas, %). */
export const portfolio: DemoRow[] = [
  { id: 'p1', data: { ticker: 'AAPL',  name: 'Apple Inc.',         price: 182.31, delta: +2.41, pct: +1.34, volume: 58_300_000 } },
  { id: 'p2', data: { ticker: 'MSFT',  name: 'Microsoft Corp.',    price: 411.22, delta: +5.12, pct: +1.26, volume: 22_100_000 } },
  { id: 'p3', data: { ticker: 'GOOGL', name: 'Alphabet Inc.',      price: 141.87, delta: -0.65, pct: -0.46, volume: 19_800_000 } },
  { id: 'p4', data: { ticker: 'AMZN',  name: 'Amazon.com Inc.',    price: 176.04, delta: -1.32, pct: -0.74, volume: 35_400_000 } },
  { id: 'p5', data: { ticker: 'TSLA',  name: 'Tesla Inc.',         price: 177.58, delta: +4.89, pct: +2.83, volume: 91_700_000 } },
  { id: 'p6', data: { ticker: 'NVDA',  name: 'NVIDIA Corp.',       price: 878.37, delta: +12.05, pct: +1.39, volume: 45_900_000 } },
  { id: 'p7', data: { ticker: 'META',  name: 'Meta Platforms.',    price: 504.22, delta: -3.11, pct: -0.61, volume: 16_200_000 } },
  { id: 'p8', data: { ticker: 'NFLX',  name: 'Netflix Inc.',       price: 632.18, delta: +0.94, pct: +0.15, volume:  3_100_000 } },
]

/** "Project utilisation" dataset for ProgressCells demo. */
export const projects: DemoRow[] = [
  { id: 'prj1', data: { name: 'Website redesign',     owner: 'Alice',   progress: 92, budgetUsed: 78, deadline: '2026-05-10' } },
  { id: 'prj2', data: { name: 'Mobile app v2',        owner: 'Bob',     progress: 64, budgetUsed: 71, deadline: '2026-06-02' } },
  { id: 'prj3', data: { name: 'Backend migration',    owner: 'Charlie', progress: 38, budgetUsed: 44, deadline: '2026-07-15' } },
  { id: 'prj4', data: { name: 'Analytics platform',   owner: 'Diana',   progress: 12, budgetUsed: 22, deadline: '2026-09-01' } },
  { id: 'prj5', data: { name: 'Payment integration',  owner: 'Eve',     progress: 100, budgetUsed: 95, deadline: '2026-04-20' } },
]
