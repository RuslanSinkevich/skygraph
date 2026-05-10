import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { BarChart as SkyBarChart } from '@skygraph/react'
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts'

import {
  formatMetric,
  nextFrames,
  readHeapMemory,
  runVariant,
  sleep,
  type BenchResult,
  type Runner,
} from './benchUtils'

/**
 * Sister benchmark to `LineChartBenchmark` — same harness, different
 * geometry. We mount a grouped bar chart with 10 000 bars (5 000
 * categories × 2 series), measure the initial mount, drive 30 data
 * updates with `flushSync` to capture per-frame layout cost, then probe
 * "hover" by dispatching synthetic pointermove over a chunk of bars and
 * timing the React commit that follows.
 *
 * Why a separate Chart benchmark on top of LineChart? Bar layout is a
 * different code path: the renderer walks `categories × series` and lays
 * out a rectangle per cell, while LineChart amortises into one path-d
 * string per series. Surprises hide in the bar path — extra DOM nodes
 * blow the cost up super-linearly.
 */
const POINTS = 5_000
const SERIES_COUNT = 2
const TOTAL_BARS = POINTS * SERIES_COUNT
const UPDATES = 30
const HOVER_SAMPLES = 30
const CHART_WIDTH = 900
const CHART_HEIGHT = 320

function genCategories(): string[] {
  const out: string[] = new Array(POINTS)
  for (let i = 0; i < POINTS; i++) out[i] = `t${i}`
  return out
}

function genValues(seed: number): number[] {
  const out: number[] = new Array(POINTS)
  let prev = 100 + (seed % 50)
  for (let i = 0; i < POINTS; i++) {
    prev += (Math.sin((i + seed) * 0.05) + Math.cos(seed * 0.1)) * 4
    out[i] = Math.max(0, prev)
  }
  return out
}

interface RechartsPoint {
  x: string
  visits: number
  orders: number
}

function genRechartsData(seed: number): RechartsPoint[] {
  const v = genValues(seed)
  const o = genValues(seed * 1.7)
  const out: RechartsPoint[] = new Array(POINTS)
  for (let i = 0; i < POINTS; i++) {
    out[i] = { x: `t${i}`, visits: v[i]!, orders: o[i]! }
  }
  return out
}

function buildRunner(variant: 'skygraph' | 'recharts'): Runner {
  return async ({ signal }) => {
    const host = document.createElement('div')
    host.style.position = 'fixed'
    host.style.left = '-10000px'
    host.style.top = '0'
    host.style.width = `${CHART_WIDTH}px`
    host.style.height = `${CHART_HEIGHT}px`
    document.body.appendChild(host)

    const root = createRoot(host)
    const cats = genCategories()
    const beforeHeap = readHeapMemory()

    const t0 = performance.now()
    flushSync(() => {
      if (variant === 'skygraph') {
        root.render(
          <SkyBarChart
            categories={cats}
            series={[
              { id: 'visits', label: 'Visits', values: genValues(0) },
              { id: 'orders', label: 'Orders', values: genValues(7) },
            ]}
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
            animate={false}
          />,
        )
      } else {
        root.render(
          <div style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={genRechartsData(0)}>
                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="visits" fill="#3b82f6" isAnimationActive={false} />
                <Bar dataKey="orders" fill="#f97316" isAnimationActive={false} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>,
        )
      }
    })
    await nextFrames(2)
    const mountMs = performance.now() - t0

    // Update pass: drive UPDATES re-renders with fresh data and capture
    // average frame time. This is the "live dashboard" cost — apps care
    // a lot about this number even if they don't realise.
    const frameTimes: number[] = []
    let last = performance.now()
    for (let i = 1; i <= UPDATES; i++) {
      if (signal.aborted) break
      flushSync(() => {
        if (variant === 'skygraph') {
          root.render(
            <SkyBarChart
              categories={cats}
              series={[
                { id: 'visits', label: 'Visits', values: genValues(i) },
                { id: 'orders', label: 'Orders', values: genValues(i * 1.7) },
              ]}
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              animate={false}
            />,
          )
        } else {
          root.render(
            <div style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={genRechartsData(i)}>
                  <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="visits" fill="#3b82f6" isAnimationActive={false} />
                  <Bar dataKey="orders" fill="#f97316" isAnimationActive={false} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>,
          )
        }
      })
      await new Promise<void>((r) => requestAnimationFrame(() => r()))
      const now = performance.now()
      frameTimes.push(now - last)
      last = now
    }
    const avgFrame = frameTimes.length
      ? frameTimes.reduce((s, x) => s + x, 0) / frameTimes.length
      : 16.7
    const fps = avgFrame > 0 ? 1000 / avgFrame : 0

    // Hover pass: dispatch synthetic pointermove events at HOVER_SAMPLES
    // X coordinates spread across the chart and time the round-trip from
    // event dispatch to the next paint. Captures the cost of the
    // tooltip/active-bar update path, which is the hottest interactive
    // path in dashboards. Pure dispatch — no real cursor motion needed,
    // both libraries hook on `pointermove`.
    let hoverMs = 0
    {
      const svg = host.querySelector('svg')
      if (svg) {
        const rect = svg.getBoundingClientRect()
        const t1 = performance.now()
        for (let i = 0; i < HOVER_SAMPLES; i++) {
          if (signal.aborted) break
          const x = rect.left + (rect.width * (i + 0.5)) / HOVER_SAMPLES
          const y = rect.top + rect.height / 2
          svg.dispatchEvent(
            new PointerEvent('pointermove', {
              clientX: x,
              clientY: y,
              bubbles: true,
              pointerType: 'mouse',
            }),
          )
          await new Promise<void>((r) => requestAnimationFrame(() => r()))
        }
        hoverMs = (performance.now() - t1) / HOVER_SAMPLES
      }
    }

    const afterHeap = readHeapMemory()

    flushSync(() => root.unmount())
    host.remove()
    await sleep(16)

    const extras: Record<string, number> = {
      mountMs,
      avgFrameMs: avgFrame,
      fps,
      hoverMs,
    }
    if (beforeHeap !== null && afterHeap !== null) {
      extras.heapDeltaBytes = Math.max(0, afterHeap - beforeHeap)
    }
    return { value: avgFrame, extras }
  }
}

export function ChartBenchmark() {
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState('')
  const [results, setResults] = useState<BenchResult[]>([])
  const [previewVariant, setPreviewVariant] = useState<'skygraph' | 'recharts'>('skygraph')
  const [previewSeed, setPreviewSeed] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => () => abortRef.current?.abort(), [])

  const run = async () => {
    if (running) return
    setRunning(true)
    setResults([])
    setProgress('Warming up...')
    abortRef.current = new AbortController()
    const signal = abortRef.current.signal
    try {
      const variants: Array<{ id: string; label: string; runner: Runner }> = [
        { id: 'skygraph', label: 'SkyGraph <BarChart>', runner: buildRunner('skygraph') },
        { id: 'recharts', label: 'recharts <BarChart>', runner: buildRunner('recharts') },
      ]
      const out: BenchResult[] = []
      for (const v of variants) {
        if (signal.aborted) throw new Error('aborted')
        setProgress(`Running ${v.label}...`)
        const r = await runVariant(
          v.id,
          v.label,
          'ms',
          v.runner,
          { iterations: 3, warmup: 1, sleepMs: 80 },
          signal,
        )
        out.push(r)
        setResults([...out])
      }
      setProgress('Done')
    } catch (err) {
      setProgress(`Error: ${(err as Error).message}`)
    } finally {
      setRunning(false)
    }
  }

  const stop = () => {
    abortRef.current?.abort()
    setRunning(false)
    setProgress('Stopped')
  }

  return (
    <div className="bench-section">
      <div className="bench-controls">
        <button
          className="bench-btn bench-btn--primary"
          type="button"
          onClick={run}
          disabled={running}
        >
          {running
            ? 'Running…'
            : `Run · ${TOTAL_BARS.toLocaleString()} bars × ${UPDATES} updates × 4`}
        </button>
        <button className="bench-btn" type="button" onClick={stop} disabled={!running}>
          Stop
        </button>
        {progress && <span className="bench-progress">{progress}</span>}
      </div>

      <div className="bench-method">
        <strong>Method.</strong> A grouped bar chart with {POINTS.toLocaleString()} categories ×{' '}
        {SERIES_COUNT} series ({TOTAL_BARS.toLocaleString()} bars total) is mounted into a detached
        host with one <code>flushSync</code>. Mount time is captured to the next two frames. Then{' '}
        {UPDATES} <em>data</em> updates run through <code>flushSync</code> to measure average frame
        time → FPS. Finally {HOVER_SAMPLES} synthetic <code>pointermove</code> events are dispatched
        evenly along the X axis to time the hover commit. Animations are off so we measure layout +
        reconciliation, not tweens. Median of 3 measured runs after one discarded warm-up.
      </div>

      <ResultsTable
        results={results}
        columns={[
          {
            key: 'mount',
            label: 'Mount',
            extract: (r) => (r.extras?.mountMs ? formatMetric(r.extras.mountMs, 'ms') : '—'),
          },
          { key: 'frame', label: 'Median frame', extract: (r) => formatMetric(r.median, 'ms') },
          {
            key: 'fps',
            label: 'Avg FPS',
            extract: (r) => (r.extras?.fps ? formatMetric(r.extras.fps, 'fps') : '—'),
          },
          {
            key: 'hover',
            label: 'Hover commit',
            extract: (r) => (r.extras?.hoverMs ? formatMetric(r.extras.hoverMs, 'ms') : '—'),
          },
          {
            key: 'heap',
            label: 'Heap Δ',
            extract: (r) =>
              r.extras?.heapDeltaBytes ? formatMetric(r.extras.heapDeltaBytes, 'bytes') : 'n/a',
          },
        ]}
      />

      <div className="bench-preview">
        <div className="bench-preview-head">
          <strong>Live preview · 200 bars</strong>
          <div className="bench-preview-controls">
            <button
              className="bench-btn"
              type="button"
              onClick={() => setPreviewSeed((s) => s + 1)}
              disabled={running}
            >
              Tick
            </button>
            <label>
              Library
              <select
                value={previewVariant}
                onChange={(e) => setPreviewVariant(e.target.value as 'skygraph' | 'recharts')}
                disabled={running}
              >
                <option value="skygraph">SkyGraph</option>
                <option value="recharts">recharts</option>
              </select>
            </label>
          </div>
        </div>
        <div className="bench-preview-frame" style={{ height: CHART_HEIGHT + 24, padding: 12 }}>
          {previewVariant === 'skygraph' ? (
            <SkyBarChart
              categories={genPreviewCategories()}
              series={[
                { id: 'visits', label: 'Visits', values: genPreviewValues(previewSeed) },
                { id: 'orders', label: 'Orders', values: genPreviewValues(previewSeed * 1.7) },
              ]}
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              animate={false}
            />
          ) : (
            <div style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={genPreviewRechartsData(previewSeed)}>
                  <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="visits" fill="#3b82f6" isAnimationActive={false} />
                  <Bar dataKey="orders" fill="#f97316" isAnimationActive={false} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const PREVIEW_POINTS = 100

function genPreviewCategories(): string[] {
  const out: string[] = new Array(PREVIEW_POINTS)
  for (let i = 0; i < PREVIEW_POINTS; i++) out[i] = `t${i}`
  return out
}

function genPreviewValues(seed: number): number[] {
  const out: number[] = new Array(PREVIEW_POINTS)
  let prev = 100 + (seed % 50)
  for (let i = 0; i < PREVIEW_POINTS; i++) {
    prev += (Math.sin((i + seed) * 0.1) + Math.cos(seed * 0.2)) * 6
    out[i] = Math.max(0, prev)
  }
  return out
}

function genPreviewRechartsData(seed: number): RechartsPoint[] {
  const v = genPreviewValues(seed)
  const o = genPreviewValues(seed * 1.7)
  const out: RechartsPoint[] = new Array(PREVIEW_POINTS)
  for (let i = 0; i < PREVIEW_POINTS; i++) {
    out[i] = { x: `t${i}`, visits: v[i]!, orders: o[i]! }
  }
  return out
}

interface ColumnDef {
  key: string
  label: string
  extract: (r: BenchResult) => string
}

function ResultsTable({ results, columns }: { results: BenchResult[]; columns: ColumnDef[] }) {
  if (results.length === 0) {
    return <div className="bench-empty">Press Run to collect numbers.</div>
  }
  return (
    <div className="bench-results">
      <table className="bench-table">
        <thead>
          <tr>
            <th>Variant</th>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id}>
              <td className="bench-table-label">
                <strong>{r.label}</strong>
              </td>
              {columns.map((c) => (
                <td key={c.key}>{c.extract(r)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
