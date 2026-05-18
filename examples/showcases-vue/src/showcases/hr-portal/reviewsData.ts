import { employees, type Employee } from './data'

export interface PerformanceReview {
  id: string
  employee: Employee
  period: string
  overall: number
  technical: number
  collaboration: number
  leadership: number
  delivery: number
  reviewerName: string
  status: 'draft' | 'pending' | 'completed'
  goals: { title: string; progress: number }[]
  highlights: string
  improvements: string
}

const reviewers = ['Elena Chen', 'Marcus Garcia', 'Priya Patel', 'Tom Kim', 'Sarah Williams']
const goalTitles = [
  'Ship feature X to production',
  'Mentor junior team members',
  'Lead architecture redesign',
  'Improve team velocity by 20%',
  'Complete certification',
  'Reduce production incidents',
  'Onboard new hires',
  'Drive customer satisfaction up',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

function rate(): number {
  return Math.round((2.5 + Math.random() * 2.5) * 10) / 10
}

export const performanceReviews: PerformanceReview[] = employees.slice(0, 20).map((e, i) => {
  const overall = rate()
  return {
    id: `r${i + 1}`,
    employee: e,
    period: i % 3 === 0 ? 'Q4 2025' : i % 3 === 1 ? 'Q3 2025' : 'Q2 2025',
    overall,
    technical: rate(),
    collaboration: rate(),
    leadership: rate(),
    delivery: rate(),
    reviewerName: pick(reviewers),
    status: i < 5 ? 'pending' : i < 8 ? 'draft' : 'completed',
    goals: Array.from({ length: 2 + Math.floor(Math.random() * 2) }, () => ({
      title: pick(goalTitles),
      progress: Math.floor(Math.random() * 100),
    })),
    highlights: 'Consistently delivers high quality work with strong technical execution.',
    improvements: 'Continue building cross-team relationships and mentorship.',
  }
})
