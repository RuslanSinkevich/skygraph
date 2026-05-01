export interface Employee {
  id: string
  name: string
  email: string
  department: string
  role: string
  startDate: string
  status: 'active' | 'on-leave' | 'remote' | 'terminated'
  avatar: string
  salary: number
}

export interface OrgNode {
  key: string
  title: string
  children?: OrgNode[]
  [field: string]: unknown
}

export interface LeaveRecord {
  id: string
  employeeId: string
  employeeName: string
  type: 'vacation' | 'sick' | 'personal' | 'remote'
  startDate: string
  endDate: string
  status: 'approved' | 'pending' | 'rejected'
}

const firstNames = ['Elena', 'Marcus', 'Priya', 'Tom', 'Yuki', 'Carlos', 'Anna', 'Ben', 'Sarah', 'Dmitri', 'Lin', 'Omar', 'Kate', 'James', 'Mei', 'Raj', 'Sophie', 'Noah', 'Emma', 'Liam', 'Olivia', 'Alex', 'Lisa', 'Daniel']
const lastNames = ['Chen', 'Garcia', 'Patel', 'Kim', 'Müller', 'Santos', 'Ivanova', 'Williams', 'Tanaka', 'Lee', 'Brown', 'Singh', 'Taylor', 'Suzuki', 'Ali', 'Anderson', 'Clark', 'White', 'Hall', 'Young']
const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance']
const roles: Record<string, string[]> = {
  Engineering: ['Frontend Dev', 'Backend Dev', 'DevOps Engineer', 'QA Engineer', 'Tech Lead', 'Staff Engineer', 'Principal Engineer'],
  Design: ['UI Designer', 'UX Researcher', 'Design Lead', 'Graphic Designer', 'Motion Designer'],
  Product: ['Product Manager', 'Product Analyst', 'Scrum Master', 'Product Owner'],
  Marketing: ['Marketing Manager', 'Content Writer', 'SEO Specialist', 'Growth Lead'],
  Sales: ['Account Executive', 'Sales Manager', 'BDR', 'Sales Engineer'],
  HR: ['HR Manager', 'Recruiter', 'People Ops', 'L&D Specialist'],
  Finance: ['Accountant', 'Financial Analyst', 'Controller', 'Payroll Specialist'],
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const employees: Employee[] = Array.from({ length: 50 }, (_, i) => {
  const first = pick(firstNames)
  const last = pick(lastNames)
  const dept = pick(departments)
  return {
    id: `e${i + 1}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@company.com`,
    department: dept,
    role: pick(roles[dept]),
    startDate: new Date(Date.now() - (180 + Math.random() * 1800) * 86400000).toISOString().slice(0, 10),
    status: pick(['active', 'active', 'active', 'active', 'on-leave', 'remote', 'remote'] as const),
    avatar: first[0] + last[0],
    salary: Math.floor(50000 + Math.random() * 120000),
  }
})

export const orgTree: OrgNode[] = [
  {
    key: 'company',
    title: 'TechCo Inc.',
    children: departments.map(dept => ({
      key: dept.toLowerCase(),
      title: `${dept} (${employees.filter(e => e.department === dept).length})`,
      children: employees
        .filter(e => e.department === dept)
        .map(e => ({
          key: `emp-${e.id}`,
          title: `${e.name} — ${e.role}`,
        })),
    })),
  },
]

export const leaveRecords: LeaveRecord[] = Array.from({ length: 30 }, (_, i) => {
  const start = new Date(Date.now() + (Math.random() * 60 - 10) * 86400000)
  const end = new Date(start.getTime() + (1 + Math.floor(Math.random() * 10)) * 86400000)
  const emp = pick(employees)
  return {
    id: `l${i + 1}`,
    employeeId: emp.id,
    employeeName: emp.name,
    type: pick(['vacation', 'vacation', 'sick', 'personal', 'remote'] as const),
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
    status: pick(['approved', 'approved', 'pending', 'rejected'] as const),
  }
})

export const transferSource = employees.map(e => ({
  key: e.id,
  title: e.name,
  description: `${e.department} — ${e.role}`,
}))

export function employeeToRow(e: Employee) {
  return { id: e.id, data: { ...e } as Record<string, unknown> }
}

export function leaveToRow(l: LeaveRecord) {
  return { id: l.id, data: { ...l } as Record<string, unknown> }
}
