/*
 * Deterministic dataset generators for the pro-feature Table demos.
 *
 * Goals:
 *   - Reproducible across renders (same `seed` → same rows). Avoids the
 *     "render flicker" you get from `Math.random()` inside React effects.
 *   - Cheap enough to call with `n = 10_000` on every dev hot-reload.
 *   - Self-contained: no imports from `@skygraph/*`, only TypeScript primitives.
 */

import type { RowId } from '@skygraph/react'

/** PRNG row shape produced by the generators below. */
export interface DemoRow {
  id: RowId
  data: Record<string, unknown>
}

/**
 * mulberry32 — small, fast, decent-quality 32-bit PRNG used to keep the
 * demos deterministic. Returns a `() => number` in `[0, 1)`.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)]
}

function randInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min
}

/* ── products (AdvancedFilters demo) ─────────────────────────────────── */

const PRODUCT_NAMES = [
  'Atlas Keyboard', 'Bravo Headset', 'Cobalt Monitor', 'Delta Mouse',
  'Echo Webcam', 'Fjord Lamp', 'Gamma Stand', 'Helix Hub',
  'Iris Speaker', 'Juno Mic', 'Kilo Pad', 'Lumen Strip',
  'Mira Cable', 'Nova Charger', 'Orbit Dock', 'Pulse Router',
  'Quartz Tablet', 'Rune SSD', 'Sirius Battery', 'Talon Grip',
]

const PRODUCT_TAGS = ['new', 'sale', 'pro', 'eco', 'kids', 'gaming', 'office', 'travel']
const PRODUCT_STATUS = ['active', 'paused', 'archived'] as const

/**
 * Catalogue rows with mixed numeric / string / enum / date / array fields.
 * Used by AdvancedFilters demo to exercise every operator class.
 */
export function generateProducts(n: number, seed = 0xa1b2c3): DemoRow[] {
  const rng = mulberry32(seed)
  const out: DemoRow[] = []
  for (let i = 0; i < n; i++) {
    const name = `${pick(rng, PRODUCT_NAMES)} ${randInt(rng, 1, 9)}`
    const tagCount = randInt(rng, 1, 3)
    const tags: string[] = []
    while (tags.length < tagCount) {
      const t = pick(rng, PRODUCT_TAGS)
      if (!tags.includes(t)) tags.push(t)
    }
    const year = 2023 + Math.floor(rng() * 3)
    const month = randInt(rng, 1, 12)
    const day = randInt(rng, 1, 28)
    out.push({
      id: `p-${i + 1}` as RowId,
      data: {
        id: i + 1,
        name,
        status: PRODUCT_STATUS[Math.floor(rng() * PRODUCT_STATUS.length)],
        price: Math.round((rng() * 990 + 10) * 100) / 100,
        created_at: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        tags,
      },
    })
  }
  return out
}

/* ── sales (Grouping demo) ───────────────────────────────────────────── */

const REGIONS = ['North', 'South', 'East', 'West', 'Central']
const SALES_PRODUCTS = ['Widget A', 'Widget B', 'Gadget X', 'Gadget Y', 'Tool Z', 'Service Pack']
const SALESPEOPLE = [
  'Alice Johnson', 'Bob Smith', 'Carla Diaz', 'David Lee',
  'Elena Park', 'Frank Wu', 'Grace Kim', 'Henry Ortiz',
]

/**
 * Sales transactions for Grouping demo. Aggregates: amount=sum, units=sum,
 * date=max (most recent sale per group via custom `aggregate` function).
 */
export function generateSales(n: number, seed = 0xc0ffee): DemoRow[] {
  const rng = mulberry32(seed)
  const out: DemoRow[] = []
  for (let i = 0; i < n; i++) {
    const units = randInt(rng, 1, 50)
    const unitPrice = Math.round((rng() * 480 + 20) * 100) / 100
    const amount = Math.round(units * unitPrice * 100) / 100
    const month = randInt(rng, 1, 12)
    const day = randInt(rng, 1, 28)
    out.push({
      id: `s-${i + 1}` as RowId,
      data: {
        id: i + 1,
        region: pick(rng, REGIONS),
        product: pick(rng, SALES_PRODUCTS),
        salesperson: pick(rng, SALESPEOPLE),
        amount,
        units,
        date: `2025-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      },
    })
  }
  return out
}

/* ── messages (VirtualDynamic demo) ──────────────────────────────────── */

const AUTHORS = [
  'alice', 'bob', 'carla', 'david', 'elena', 'frank',
  'grace', 'henry', 'ivy', 'jack', 'kate', 'leo',
  'mia', 'nick', 'olga', 'pavel', 'quinn', 'rita',
]

const SHORT_LINES = [
  'lgtm 👍',
  'on it',
  'will check tomorrow',
  'pushed a fix',
  'ack',
  'see PR #42',
  'agreed',
  'tests are green',
]

const LONG_TEMPLATE =
  'I traced this back to the table state hook — when `pageSize` changes ' +
  'and the engine is recreated from snapshot, persisted column widths get ' +
  'restored on the next microtask. Most of the time that is fine, but if ' +
  'the user is mid-resize the dragging delta is computed against a stale ' +
  'starting width. Patch keeps the snapshot map but skips restore while a ' +
  'resize handle is active. Will write a regression test once the spec ' +
  'lands. Let me know if you want me to backport this to the LTS branch.'

/**
 * Message log rows with mixed short/long content for dynamic-rowHeight
 * virtual scrolling. `long: true` rows render as multi-line previews.
 */
export function generateMessages(n: number, startId = 0, seed = 0x123456): DemoRow[] {
  const rng = mulberry32(seed + startId)
  const out: DemoRow[] = []
  for (let i = 0; i < n; i++) {
    const idx = startId + i
    const isLong = rng() < 0.18
    const author = AUTHORS[idx % AUTHORS.length]
    const minute = (idx * 7) % 60
    const hour = Math.floor((idx * 7) / 60) % 24
    const day = (Math.floor((idx * 7) / 60 / 24) % 28) + 1
    const preview = isLong
      ? `${LONG_TEMPLATE} (msg #${idx + 1})`
      : SHORT_LINES[idx % SHORT_LINES.length]
    out.push({
      id: `m-${idx + 1}` as RowId,
      data: {
        id: idx + 1,
        author,
        preview,
        long: isLong,
        timestamp: `2026-04-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      },
    })
  }
  return out
}

/* ── employees (LargeDataset demo) ───────────────────────────────────── */

const FIRST = ['Alice', 'Bob', 'Carla', 'David', 'Elena', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Kate', 'Leo', 'Mia', 'Nick', 'Olga', 'Pavel', 'Quinn', 'Rita', 'Sam', 'Tina']
const LAST = ['Adams', 'Brown', 'Chen', 'Davis', 'Evans', 'Foster', 'Garcia', 'Hill', 'Ito', 'Jones', 'Kim', 'Lopez', 'Miller', 'Novak', 'Ortiz', 'Park', 'Quintero', 'Rossi', 'Singh', 'Tanaka']
const DEPARTMENTS = ['Engineering', 'Design', 'Sales', 'Marketing', 'Support', 'Finance', 'HR', 'Ops']
const EMP_ROLES = ['Junior', 'Mid', 'Senior', 'Lead', 'Manager', 'Director']
const EMP_STATUS = ['active', 'on-leave', 'remote', 'terminated']

/**
 * Employee directory used by LargeDataset stress test. `n = 10_000` is the
 * default; reduce if you want a smoother dev cycle.
 */
export function generateEmployees(n: number, seed = 0xbeef00): DemoRow[] {
  const rng = mulberry32(seed)
  const out: DemoRow[] = []
  for (let i = 0; i < n; i++) {
    const name = `${pick(rng, FIRST)} ${pick(rng, LAST)}`
    out.push({
      id: `e-${i + 1}` as RowId,
      data: {
        id: i + 1,
        name,
        department: pick(rng, DEPARTMENTS),
        role: pick(rng, EMP_ROLES),
        status: pick(rng, EMP_STATUS),
        salary: randInt(rng, 40, 220) * 1000,
        rating: Math.round(rng() * 50) / 10,
        location: pick(rng, ['NYC', 'SFO', 'LON', 'BER', 'TYO', 'SGP', 'SYD']),
      },
    })
  }
  return out
}

/* ── tickers (Realtime demo) ─────────────────────────────────────────── */

const TICKERS = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'NFLX',
  'AMD', 'INTC', 'ORCL', 'CRM', 'ADBE', 'CSCO', 'IBM', 'PYPL',
  'QCOM', 'AVGO', 'TXN', 'ASML',
]

/**
 * Live-ish ticker rows used by Realtime demo. Generator only seeds the
 * initial dataset; the demo mutates rows in place via `setInterval`.
 */
export function generateTickers(n: number, seed = 0x5a1ad): DemoRow[] {
  const rng = mulberry32(seed)
  const out: DemoRow[] = []
  for (let i = 0; i < n; i++) {
    const ticker = TICKERS[i % TICKERS.length] + (i >= TICKERS.length ? `-${Math.floor(i / TICKERS.length)}` : '')
    out.push({
      id: `t-${i + 1}` as RowId,
      data: {
        id: i + 1,
        ticker,
        price: Math.round((rng() * 900 + 50) * 100) / 100,
        status: rng() < 0.7 ? 'active' : (rng() < 0.5 ? 'paused' : 'halted'),
        volume: randInt(rng, 100_000, 80_000_000),
      },
    })
  }
  return out
}
