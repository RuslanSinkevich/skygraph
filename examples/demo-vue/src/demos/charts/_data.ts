/**
 * Deterministic chart data generators for demo pages (Vue port of
 * `examples/demo/src/demos/charts/_data/index.ts`).
 *
 * `Math.random()` would re-roll on every reload and make snapshot tests
 * pointless; a seeded `mulberry32` keeps demos stable.
 */

function mulberry32(seed: number): () => number {
  let s = seed >>> 0
  return function () {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export interface DemoSeries {
  id: string
  label: string
  values: number[]
}

export interface DemoDataset {
  categories: string[]
  series: DemoSeries[]
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function monthlyRevenue(seed = 7): DemoDataset {
  const rnd = mulberry32(seed)
  return {
    categories: MONTHS,
    series: [
      {
        id: 'revenue',
        label: 'Revenue',
        values: MONTHS.map((_, i) => Math.round(800 + i * 55 + rnd() * 220)),
      },
      {
        id: 'cost',
        label: 'Cost',
        values: MONTHS.map((_, i) => Math.round(520 + i * 35 + rnd() * 160)),
      },
    ],
  }
}

export function quarterlyMarkets(seed = 11): DemoDataset {
  const rnd = mulberry32(seed)
  const cats = ['Q1', 'Q2', 'Q3', 'Q4']
  return {
    categories: cats,
    series: [
      { id: 'eu', label: 'EU', values: cats.map(() => Math.round(120 + rnd() * 180)) },
      { id: 'us', label: 'US', values: cats.map(() => Math.round(140 + rnd() * 200)) },
      { id: 'asia', label: 'Asia', values: cats.map(() => Math.round(90 + rnd() * 220)) },
    ],
  }
}

export function weeklyTrafficByDevice(seed = 19): DemoDataset {
  const rnd = mulberry32(seed)
  return {
    categories: DAYS,
    series: [
      {
        id: 'mobile',
        label: 'Mobile',
        values: DAYS.map((_, i) => Math.round(120 + i * 8 + rnd() * 70)),
      },
      {
        id: 'desktop',
        label: 'Desktop',
        values: DAYS.map((_, i) => Math.round(80 + i * 4 + rnd() * 50)),
      },
      {
        id: 'tablet',
        label: 'Tablet',
        values: DAYS.map((_, i) => Math.round(30 + i * 2 + rnd() * 28)),
      },
    ],
  }
}

export function fivePalettes(seed = 31): DemoDataset {
  const rnd = mulberry32(seed)
  const cats = Array.from({ length: 12 }, (_, i) => `${i + 1}`)
  const labels = ['Auth', 'Search', 'Checkout', 'Profile', 'Settings']
  return {
    categories: cats,
    series: labels.map((label, sIdx) => ({
      id: label.toLowerCase(),
      label,
      values: cats.map((_, i) => Math.round(40 + sIdx * 15 + i * 4 + rnd() * 60)),
    })),
  }
}

export function cpuTrace(seed = 41): { categories: string[]; values: number[] } {
  const rnd = mulberry32(seed)
  const n = 60
  const cats = Array.from({ length: n }, (_, i) => String(i))
  const values: number[] = []
  let v = 40
  for (let i = 0; i < n; i++) {
    v += (rnd() - 0.5) * 14
    if (v < 5) v = 5
    if (v > 95) v = 95
    values.push(Math.round(v))
  }
  return { categories: cats, values }
}

export function preStackSeries(input: DemoSeries[]): DemoSeries[] {
  const out: DemoSeries[] = []
  const totals = input[0] ? new Array(input[0].values.length).fill(0) : []
  for (const s of input) {
    const next: number[] = []
    s.values.forEach((v, i) => {
      totals[i] += v
      next.push(totals[i])
    })
    out.push({ id: `${s.id}-stack`, label: s.label, values: next })
  }
  return out
}

export function toCsv(dataset: DemoDataset): string {
  const head = ['category', ...dataset.series.map((s) => s.label)].join(',')
  const rows = dataset.categories.map((cat, i) => {
    const row = [String(cat)]
    for (const s of dataset.series) row.push(String(s.values[i] ?? ''))
    return row.join(',')
  })
  return [head, ...rows].join('\n')
}
