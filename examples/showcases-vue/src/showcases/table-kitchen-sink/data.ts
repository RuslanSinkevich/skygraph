export interface Employee {
  id: string
  name: string
  department: string
  role: string
  salary: number
  experience: number
  rating: number
  status: 'active' | 'on-leave' | 'remote' | 'terminated'
  email: string
  location: string
  hireDate: string
  projects: number
  overtime: number
}

const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Support']
const roles = ['Junior', 'Middle', 'Senior', 'Lead', 'Manager', 'Director']
const locations = ['New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Singapore', 'Sydney']
const statuses: Employee['status'][] = ['active', 'on-leave', 'remote', 'terminated']
const firstNames = [
  'Alice',
  'Bob',
  'Charlie',
  'Diana',
  'Edward',
  'Fiona',
  'George',
  'Hannah',
  'Ivan',
  'Julia',
  'Kevin',
  'Laura',
  'Michael',
  'Nina',
  'Oscar',
  'Patricia',
  'Quinn',
  'Rachel',
  'Samuel',
  'Tina',
  'Uma',
  'Victor',
  'Wendy',
  'Xavier',
  'Yuki',
  'Zara',
  'Alex',
  'Brenda',
  'Carlos',
  'Daria',
]
const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Gonzalez',
  'Wilson',
  'Anderson',
  'Thomas',
  'Taylor',
  'Moore',
  'Jackson',
  'Martin',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateEmployees(count: number): Employee[] {
  const result: Employee[] = []
  for (let i = 0; i < count; i++) {
    const name = `${pick(firstNames)} ${pick(lastNames)}`
    const exp = rand(1, 20)
    result.push({
      id: `emp-${i + 1}`,
      name,
      department: pick(departments),
      role: pick(roles),
      salary: rand(40, 180) * 1000,
      experience: exp,
      rating: Math.round((rand(25, 50) / 10) * 10) / 10,
      status: pick(statuses),
      email: `${name.toLowerCase().replace(' ', '.')}@company.com`,
      location: pick(locations),
      hireDate: `${rand(2015, 2024)}-${String(rand(1, 12)).padStart(2, '0')}-${String(rand(1, 28)).padStart(2, '0')}`,
      projects: rand(1, 15),
      overtime: rand(0, 40),
    })
  }
  return result
}

export const employees = generateEmployees(200)

export const treeEmployees = [
  {
    id: 'eng',
    data: {
      name: 'Engineering Department',
      department: 'Engineering',
      role: '-',
      salary: 0,
      experience: 0,
      rating: 0,
      status: 'active',
      children: [
        {
          id: 'eng-fe',
          data: {
            name: 'Frontend Team',
            department: 'Engineering',
            role: 'Team',
            salary: 0,
            experience: 0,
            rating: 0,
            status: 'active',
            children: employees.slice(0, 5).map((e) => ({
              id: e.id,
              data: { ...e } as Record<string, unknown>,
            })),
          },
        },
        {
          id: 'eng-be',
          data: {
            name: 'Backend Team',
            department: 'Engineering',
            role: 'Team',
            salary: 0,
            experience: 0,
            rating: 0,
            status: 'active',
            children: employees.slice(5, 10).map((e) => ({
              id: e.id,
              data: { ...e } as Record<string, unknown>,
            })),
          },
        },
      ],
    },
  },
  {
    id: 'design',
    data: {
      name: 'Design Department',
      department: 'Design',
      role: '-',
      salary: 0,
      experience: 0,
      rating: 0,
      status: 'active',
      children: employees.slice(10, 15).map((e) => ({
        id: e.id,
        data: { ...e } as Record<string, unknown>,
      })),
    },
  },
]

export const statusColors: Record<string, string> = {
  active: '#52c41a',
  'on-leave': '#faad14',
  remote: '#1890ff',
  terminated: '#ff4d4f',
}
