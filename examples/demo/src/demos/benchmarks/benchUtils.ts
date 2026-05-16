/**
 * Shared helpers for benchmark runners. All measurements use
 * `performance.now()` for sub-millisecond resolution and
 * `requestAnimationFrame` to stay in sync with the browser's render loop.
 *
 * Runners always do a warm-up pass that gets discarded, then take the median
 * of N runs to dampen jitter. We surface raw runs plus median in the result
 * so consumers can show distribution.
 */

export interface BenchRun {
  /** Run index (0-based, after warm-up). */
  index: number
  /** Single metric value for this run (ms / fps / bytes / ...). */
  value: number
}

export interface BenchResult {
  /** Stable id of the benchmark variant ('skygraph' / 'antd' / ...). */
  id: string
  /** Human label for tables. */
  label: string
  /** Unit suffix for the median value. */
  unit: 'ms' | 'fps' | 'bytes' | 'count'
  /** Discrete runs (post-warmup). */
  runs: BenchRun[]
  /** Median of `runs[].value`. */
  median: number
  /** Min of `runs[].value`. */
  min: number
  /** Max of `runs[].value`. */
  max: number
  /** Optional secondary metric (e.g. memory, controlled-change time). */
  extras?: Record<string, number>
}

export interface RunnerCtx {
  signal: AbortSignal
}

export type Runner = (ctx: RunnerCtx) => Promise<{ value: number; extras?: Record<string, number> }>

export interface BenchOptions {
  /** Total iterations (warm-up + measured). */
  iterations: number
  /** Warm-up iterations (excluded from median). */
  warmup: number
  /** Sleep between iterations to let the browser settle. */
  sleepMs?: number
}

/** Sleep for `ms` milliseconds; resolves immediately if signal aborts. */
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    let done = false
    const finish = () => {
      if (done) return
      done = true
      resolve()
    }
    const id = setTimeout(finish, ms)
    if (signal) {
      const onAbort = () => {
        clearTimeout(id)
        finish()
      }
      if (signal.aborted) onAbort()
      else signal.addEventListener('abort', onAbort, { once: true })
    }
  })
}

/** Wait for the next frame using requestAnimationFrame. */
export function nextFrame(): Promise<number> {
  return new Promise((resolve) => requestAnimationFrame(resolve))
}

/** Wait for two consecutive frames (mount + paint). */
export async function nextFrames(n: number): Promise<void> {
  for (let i = 0; i < n; i++) await nextFrame()
}

/** Median of a numeric array (returns 0 for empty). */
export function median(values: readonly number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 1) return sorted[mid]!
  return (sorted[mid - 1]! + sorted[mid]!) / 2
}

/** Replace `{key}` placeholders in benchmark copy (locale templates). */
export function benchFill(template: string, vars: Record<string, string | number>): string {
  let out = template
  for (const [key, value] of Object.entries(vars)) {
    out = out.split(`{${key}}`).join(String(value))
  }
  return out
}

/** Format a numeric value with the given unit. */
export function formatMetric(value: number, unit: BenchResult['unit']): string {
  switch (unit) {
    case 'ms':
      return `${value.toFixed(2)} ms`
    case 'fps':
      return `${value.toFixed(1)} fps`
    case 'bytes':
      if (value > 1024 * 1024) return `${(value / 1024 / 1024).toFixed(2)} MB`
      if (value > 1024) return `${(value / 1024).toFixed(2)} KB`
      return `${value.toFixed(0)} B`
    case 'count':
      return value.toLocaleString()
  }
}

/**
 * Read `performance.memory.usedJSHeapSize` if exposed by the browser
 * (Chromium-only, gated behind `window.crossOriginIsolated` in some
 * builds). Returns `null` in Firefox / Safari.
 */
export function readHeapMemory(): number | null {
  const memApi = (
    performance as unknown as {
      memory?: { usedJSHeapSize?: number }
    }
  ).memory
  if (!memApi || typeof memApi.usedJSHeapSize !== 'number') return null
  return memApi.usedJSHeapSize
}

/**
 * Run a benchmark variant N times. Discards the first `opts.warmup`
 * iterations, sleeps between runs, returns the structured result.
 */
export async function runVariant(
  id: string,
  label: string,
  unit: BenchResult['unit'],
  runner: Runner,
  opts: BenchOptions,
  signal: AbortSignal,
): Promise<BenchResult> {
  const runs: BenchRun[] = []
  const total = opts.warmup + opts.iterations
  let extrasAcc: Record<string, number> | undefined

  for (let i = 0; i < total; i++) {
    if (signal.aborted) throw new Error('aborted')
    await sleep(opts.sleepMs ?? 32, signal)
    await nextFrames(2)
    const out = await runner({ signal })
    if (i >= opts.warmup) {
      runs.push({ index: i - opts.warmup, value: out.value })
      if (out.extras) {
        if (!extrasAcc) extrasAcc = {}
        for (const [k, v] of Object.entries(out.extras)) {
          extrasAcc[k] = (extrasAcc[k] ?? 0) + v
        }
      }
    }
  }

  if (extrasAcc) {
    for (const k of Object.keys(extrasAcc)) {
      extrasAcc[k] = extrasAcc[k]! / runs.length
    }
  }

  const values = runs.map((r) => r.value)
  return {
    id,
    label,
    unit,
    runs,
    median: median(values),
    min: values.length ? Math.min(...values) : 0,
    max: values.length ? Math.max(...values) : 0,
    extras: extrasAcc,
  }
}
