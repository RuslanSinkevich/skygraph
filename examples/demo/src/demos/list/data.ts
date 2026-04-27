export const shortData = [
  'Racing car sprints forward with a roaring engine.',
  'A gentle breeze sweeps over the peaceful countryside.',
  'The morning sun cast golden rays over the horizon.',
  'Quiet footsteps echo through the empty hallway.',
]

export type User = {
  id: number
  name: string
  role: string
  status: 'success' | 'warning' | 'default'
}

export const users: User[] = [
  { id: 1, name: 'Alice', role: 'Frontend engineer', status: 'success' },
  { id: 2, name: 'Bob', role: 'Designer', status: 'warning' },
  { id: 3, name: 'Charlie', role: 'PM', status: 'default' },
]

export const cards = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta']

export type Task = {
  id: number
  title: string
  pinned: boolean
}

export const tasks: Task[] = [
  { id: 1, title: 'Ship 0.4 release', pinned: true },
  { id: 2, title: 'Triage issues', pinned: false },
  { id: 3, title: 'Update docs', pinned: true },
  { id: 4, title: 'Rework benchmarks', pinned: false },
]
