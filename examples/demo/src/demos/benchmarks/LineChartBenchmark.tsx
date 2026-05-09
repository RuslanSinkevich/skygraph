import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { LineChart as SkyLineChart } from '@skygraph/react'
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts'

import {
  formatMetric,
  nextFrames,
  runVariant,
  sleep,
  type BenchResult,
  type Runner,
} from './benchUtils'

const POINTS = 1_000
const UPDATES = 60
const CHART_WIDTH = 800
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

    const initialMount = performance.now()
    flushSync(() => {
      if (variant === 'skygraph') {
        root.render(
          <SkyLineChart
            categories={cats}
            series={[
              { id: 'visits', label: 'Visits', values: genValues(0) },
              { id: 'orders', label: 'Orders', values: genValues(7) },
            ]}
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
            animate={false}
            markers={false}
          />,
        )
      } else {
        root.render(
          <div style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={genRechartsData(0)}>
                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="visits" stroke="#3b82f6" dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="orders" stroke="#f97316" dot={false} isAnimationActive={false} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>,
        )
      }
    })
    await nextFrames(2)
    const mountMs = performance.now() - initialMount

    const frameTimes: number[] = []
    let last = performance.now()
    for (let i = 1; i <= UPDATES; i++) {
      if (signal.aborted) break
      flushSync(() => {
        if (variant === 'skygraph') {
          root.render(
            <SkyLineChart
              categories={cats}
              series={[
                { id: 'visits', label: 'Visits', values: genValues(i) },
                { id: 'orders', label: 'Orders', values: genValues(i * 1.7) },
              ]}
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              animate={false}
              markers={false}
            />,
          )
        } else {
          root.render(
            <div style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={genRechartsData(i)}>
                  <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="visits" stroke="#3b82f6" dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="orders" stroke="#f97316" dot={false} isAnimationActive={false} />
                </RechartsLineChart>
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

    const avgFrame = frameTimes.length ? frameTimes.reduce((s, x) => s + x, 0) / frameTimes.length : 16.7

    flushSync(() => root.unmount())
    host.remove()
    await sleep(16)

    const fps = avgFrame > 0 ? 1000 / avgFrame : 0
    return {
      value: avgFrame,
      extras: { mountMs, fps, frames: frameTimes.length },
    }
  }
}

export function LineChartBenchmark() {
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
        { id: 'skygraph', label: 'SkyGraph <LineChart>', runner: buildRunner('skygraph') },
        { id: 'recharts', label: 'recharts <LineChart>', runner: buildRunner('recharts') },
      ]
      const out: BenchResult[] = []
      for (const v of variants) {
        if (signal.aborted) throw new Error('aborted')
        setProgress(`Running ${v.label}...`)
        const r = await runVariant(v.id, v.label, 'ms', v.runner, { iterations: 3, warmup: 1, sleepMs: 64 }, signal)
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
        <button className="bench-btn bench-btn--primary" type="button" onClick={run} disabled={running}>
          {running ? 'Running…' : `Run · ${POINTS} pts × ${UPDATES} updates × 4`}
        </button>
        <button className="bench-btn" type="button" onClick={stop} disabled={!running}>
          Stop
        </button>
        {progress && <span className="bench-progress">{progress}</span>}
      </div>

      <div className="bench-method">
        <strong>Method.</strong> A line chart with two series of {POINTS} points is mounted, then re-rendered{' '}
        {UPDATES} times with fresh data using <code>flushSync</code>. We measure the average frame time across the{' '}
        {UPDATES} update frames and convert to FPS. Both libraries have animations disabled and circular point
        markers off so we measure path layout + reconciliation, not tween work. We discard the warm-up run and report
        the median of 3 measured runs.
      </div>

      <ResultsTable
        results={results}
        columns={[
          { key: 'frame', label: 'Median frame', extract: (r) => formatMetric(r.median, 'ms') },
          {
            key: 'fps',
            label: 'Avg FPS',
            extract: (r) => (r.extras?.fps ? formatMetric(r.extras.fps, 'fps') : '—'),
          },
          {
            key: 'mount',
            label: 'Mount',
            extract: (r) => (r.extras?.mountMs ? formatMetric(r.extras.mountMs, 'ms') : '—'),
          },
          { key: 'min', label: 'Min frame', extract: (r) => formatMetric(r.min, 'ms') },
          { key: 'max', label: 'Max frame', extract: (r) => formatMetric(r.max, 'ms') },
        ]}
      />

      <div className="bench-preview">
        <div className="bench-preview-head">
          <strong>Live preview</strong>
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
            <SkyLineChart
              categories={genCategories()}
              series={[
                { id: 'visits', label: 'Visits', values: genValues(previewSeed) },
                { id: 'orders', label: 'Orders', values: genValues(previewSeed * 1.7) },
              ]}
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              animate={false}
              markers={false}
            />
          ) : (
            <div style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={genRechartsData(previewSeed)}>
                  <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#3b82f6"
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#f97316"
                    dot={false}
                    isAnimationActive={false}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  )
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
