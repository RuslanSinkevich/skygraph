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

import { useI18n } from '../../i18n/I18nContext'
import {
  benchFill,
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

function buildRunner(
  variant: 'skygraph' | 'recharts',
  series: { visits: string; orders: string },
): Runner {
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
              { id: 'visits', label: series.visits, values: genValues(0) },
              { id: 'orders', label: series.orders, values: genValues(7) },
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
                { id: 'visits', label: series.visits, values: genValues(i) },
                { id: 'orders', label: series.orders, values: genValues(i * 1.7) },
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
  const { t } = useI18n()
  const b = t.benchmarks
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState('')
  const [results, setResults] = useState<BenchResult[]>([])
  const [previewVariant, setPreviewVariant] = useState<'skygraph' | 'recharts'>('skygraph')
  const [previewSeed, setPreviewSeed] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  const seriesLabels = { visits: b.chartVisits, orders: b.chartOrders }

  useEffect(() => () => abortRef.current?.abort(), [])

  const run = async () => {
    if (running) return
    setRunning(true)
    setResults([])
    setProgress(b.warmingUp)
    abortRef.current = new AbortController()
    const signal = abortRef.current.signal
    try {
      const variants: Array<{ id: string; label: string; runner: Runner }> = [
        {
          id: 'skygraph',
          label: b.labelSkyChart,
          runner: buildRunner('skygraph', seriesLabels),
        },
        {
          id: 'recharts',
          label: b.labelRechartsChart,
          runner: buildRunner('recharts', seriesLabels),
        },
      ]
      const out: BenchResult[] = []
      for (const v of variants) {
        if (signal.aborted) throw new Error('aborted')
        setProgress(benchFill(b.runningWithLabel, { label: v.label }))
        const r = await runVariant(
          v.id,
          v.label,
          'ms',
          v.runner,
          { iterations: 3, warmup: 1, sleepMs: 64 },
          signal,
        )
        out.push(r)
        setResults([...out])
      }
      setProgress(b.done)
    } catch (err) {
      setProgress(benchFill(b.errorWithMessage, { message: (err as Error).message }))
    } finally {
      setRunning(false)
    }
  }

  const stop = () => {
    abortRef.current?.abort()
    setRunning(false)
    setProgress(b.stopped)
  }

  const methodText = benchFill(b.chartMethod, {
    points: POINTS,
    updates: UPDATES,
  })

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
            ? b.runningEllipsis
            : benchFill(b.chartRunIdle, { points: POINTS, updates: UPDATES })}
        </button>
        <button className="bench-btn" type="button" onClick={stop} disabled={!running}>
          {b.stop}
        </button>
        {progress && <span className="bench-progress">{progress}</span>}
      </div>

      <div className="bench-method">
        <strong>{b.methodStrong}</strong> {methodText}
      </div>

      <ResultsTable
        variantColumn={b.variantColumn}
        emptyLabel={b.pressRunEmpty}
        results={results}
        columns={[
          { key: 'frame', label: b.colMedianFrame, extract: (r) => formatMetric(r.median, 'ms') },
          {
            key: 'fps',
            label: b.colAvgFps,
            extract: (r) => (r.extras?.fps ? formatMetric(r.extras.fps, 'fps') : '—'),
          },
          {
            key: 'mount',
            label: b.colMount,
            extract: (r) => (r.extras?.mountMs ? formatMetric(r.extras.mountMs, 'ms') : '—'),
          },
          { key: 'min', label: b.colMinFrame, extract: (r) => formatMetric(r.min, 'ms') },
          { key: 'max', label: b.colMaxFrame, extract: (r) => formatMetric(r.max, 'ms') },
        ]}
      />

      <div className="bench-preview">
        <div className="bench-preview-head">
          <strong>{b.livePreview}</strong>
          <div className="bench-preview-controls">
            <button
              className="bench-btn"
              type="button"
              onClick={() => setPreviewSeed((s) => s + 1)}
              disabled={running}
            >
              {b.tick}
            </button>
            <label>
              {b.library}
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
                { id: 'visits', label: seriesLabels.visits, values: genValues(previewSeed) },
                { id: 'orders', label: seriesLabels.orders, values: genValues(previewSeed * 1.7) },
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

function ResultsTable({
  results,
  columns,
  variantColumn,
  emptyLabel,
}: {
  results: BenchResult[]
  columns: ColumnDef[]
  variantColumn: string
  emptyLabel: string
}) {
  if (results.length === 0) {
    return <div className="bench-empty">{emptyLabel}</div>
  }
  return (
    <div className="bench-results">
      <table className="bench-table">
        <thead>
          <tr>
            <th>{variantColumn}</th>
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
