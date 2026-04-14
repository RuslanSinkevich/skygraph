export interface Employee {
  id: number
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
}

export interface LeaveRecord {
  id: number
  employeeId: number
  type: 'vacation' | 'sick' | 'personal' | 'remote'
  startDate: string
  endDate: string
  status: 'approved' | 'pending' | 'rejected'
}

const firstNames = ['Elena', 'Marcus', 'Priya', 'Tom', 'Yuki', 'Carlos', 'Anna', 'Ben', 'Sarah', 'Dmitri', 'Lin', 'Omar', 'Kate', 'James', 'Mei', 'Raj']
const lastNames = ['Chen', 'Garcia', 'Patel', 'Kim', 'Müller', 'Santos', 'Ivanova', 'Williams', 'Tanaka', 'Lee', 'Brown', 'Singh', 'Taylor', 'Suzuki', 'Ali', 'Anderson']
const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance']
const roles: Record<string, string[]> = {
  Engineering: ['Frontend Dev', 'Backend Dev', 'DevOps Engineer', 'QA Engineer', 'Tech Lead'],
  Design: ['UI Designer', 'UX Researcher', 'Design Lead', 'Graphic Designer'],
  Product: ['Product Manager', 'Product Analyst', 'Scrum Master'],
  Marketing: ['Marketing Manager', 'Content Writer', 'SEO Specialist'],
  Sales: ['Account Executive', 'Sales Manager', 'BDR'],
  HR: ['HR Manager', 'Recruiter', 'People Ops'],
  Finance: ['Accountant', 'Financial Analyst', 'CFO'],
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const employees: Employee[] = Array.from({ length: 30 }, (_, i) => {
  const first = pick(firstNames)
  const last = pick(lastNames)
  const dept = pick(departments)
  return {
    id: i + 1,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@company.com`,
    department: dept,
    role: pick(roles[dept]),
    startDate: new Date(Date.now() - (180 + Math.random() * 1800) * 86400000).toISOString().slice(0, 10),
    status: pick(['active', 'active', 'active', 'active', 'on-leave', 'remote', 'remote']),
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

export const leaveRecords: LeaveRecord[] = Array.from({ length: 20 }, (_, i) => {
  const start = new Date(Date.now() + (Math.random() * 60 - 10) * 86400000)
  const end = new Date(start.getTime() + (1 + Math.floor(Math.random() * 10)) * 86400000)
  return {
    id: i + 1,
    employeeId: pick(employees).id,
    type: pick(['vacation', 'vacation', 'sick', 'personal', 'remote']),
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
    status: pick(['approved', 'approved', 'pending', 'rejected']),
  }
})

export const transferSource = employees.map(e => ({
  key: String(e.id),
  title: e.name,
  description: `${e.department} — ${e.role}`,
}))

export const onboardingSchema = {
  type: 'object' as const,
  properties: {
    fullName: { type: 'string' as const, title: 'Full Name' },
    email: { type: 'string' as const, title: 'Email', format: 'email' },
    department: {
      type: 'string' as const,
      title: 'Department',
      enum: departments,
    },
    role: { type: 'string' as const, title: 'Role' },
    startDate: { type: 'string' as const, title: 'Start Date', format: 'date' },
    salary: { type: 'number' as const, title: 'Salary' },
  },
  required: ['fullName', 'email', 'department', 'role'],
}
