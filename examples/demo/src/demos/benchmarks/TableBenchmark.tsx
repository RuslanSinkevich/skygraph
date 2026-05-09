import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { Table as SkyTable } from '@skygraph/react'
import type { TableColumn, RowId } from '@skygraph/react'
import { Table as AntTable, ConfigProvider as AntConfigProvider } from 'antd'

import {
  formatMetric,
  nextFrames,
  readHeapMemory,
  runVariant,
  sleep,
  type BenchResult,
  type Runner,
} from './benchUtils'

const ROW_COUNT = 100_000
const VISIBLE_HEIGHT = 480
const SCROLL_FRAMES = 60
const SCROLL_PIXELS_PER_FRAME = 24

interface Row {
  id: RowId
  data: {
    id: number
    name: string
    department: string
    role: string
    salary: number
    status: string
    hiredAt: string
  }
}

interface RowFlat {
  id: number
  name: string
  department: string
  role: string
  salary: number
  status: string
  hiredAt: string
}

const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Ops']
const roles = ['Developer', 'Manager', 'Analyst', 'Director', 'Lead']
const statuses = ['Active', 'On Leave', 'Terminated']

function makeData(): { sky: Row[]; antd: RowFlat[] } {
  const sky: Row[] = new Array(ROW_COUNT)
  const antd: RowFlat[] = new Array(ROW_COUNT)
  for (let i = 0; i < ROW_COUNT; i++) {
    const flat: RowFlat = {
      id: i + 1,
      name: `Employee ${i + 1}`,
      department: departments[i % departments.length]!,
      role: roles[i % roles.length]!,
      salary: 50_000 + (i * 137) % 250_000,
      status: statuses[i % statuses.length]!,
      hiredAt: `${2010 + (i % 15)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
    }
    sky[i] = { id: `r-${i}` as RowId, data: flat }
    antd[i] = flat
  }
  return { sky, antd }
}

const skyColumns: TableColumn[] = [
  { key: 'id', title: 'ID', width: 80, sortable: true },
  { key: 'name', title: 'Name', width: 180, sortable: true, fixed: 'left' },
  { key: 'department', title: 'Department', width: 140, sortable: true },
  { key: 'role', title: 'Role', width: 140, sortable: true },
  {
    key: 'salary',
    title: 'Salary',
    width: 120,
    sortable: true,
    align: 'right',
    render: (v) => `$${Number(v).toLocaleString()}`,
  },
  { key: 'status', title: 'Status', width: 120 },
  { key: 'hiredAt', title: 'Hired', width: 120 },
]

const antColumns = [
  { key: 'id', title: 'ID', dataIndex: 'id', width: 80, sorter: (a: RowFlat, b: RowFlat) => a.id - b.id },
  { key: 'name', title: 'Name', dataIndex: 'name', width: 180, fixed: 'left' as const, sorter: (a: RowFlat, b: RowFlat) => a.name.localeCompare(b.name) },
  { key: 'department', title: 'Department', dataIndex: 'department', width: 140, sorter: (a: RowFlat, b: RowFlat) => a.department.localeCompare(b.department) },
  { key: 'role', title: 'Role', dataIndex: 'role', width: 140 },
  {
    key: 'salary',
    title: 'Salary',
    dataIndex: 'salary',
    width: 120,
    align: 'right' as const,
    sorter: (a: RowFlat, b: RowFlat) => a.salary - b.salary,
    render: (v: number) => `$${v.toLocaleString()}`,
  },
  { key: 'status', title: 'Status', dataIndex: 'status', width: 120 },
  { key: 'hiredAt', title: 'Hired', dataIndex: 'hiredAt', width: 120 },
]

/**
 * Mount a tree into a detached DOM root, measure mount time, scroll the
 * virtual list 60 frames and measure FPS, then optionally read heap.
 *
 * Both SkyGraph and antd ship a virtual scroller; for SkyGraph we use the
 * library's built-in virtualization, for antd we use `virtual: true`. This is
 * the apples-to-apples shape — both render only visible rows.
 */
function buildRunner(variant: 'skygraph' | 'antd', data: { sky: Row[]; antd: RowFlat[] }): Runner {
  return async ({ signal }) => {
    const host = document.createElement('div')
    host.style.position = 'fixed'
    host.style.left = '-10000px'
    host.style.top = '0'
    host.style.width = '900px'
    host.style.height = `${VISIBLE_HEIGHT}px`
    document.body.appendChild(host)

    const root = createRoot(host)
    const beforeHeap = readHeapMemory()
    const t0 = performance.now()

    if (variant === 'skygraph') {
      flushSync(() => {
        root.render(
          <SkyTable
            columns={skyColumns}
            data={data.sky}
            pageSize={data.sky.length}
            showPagination={false}
            virtual={{ rowHeight: 40, overscan: 8 }}
            scroll={{ y: VISIBLE_HEIGHT }}
            bordered
          />,
        )
      })
    } else {
      flushSync(() => {
        root.render(
          <AntConfigProvider>
            <AntTable
              columns={antColumns}
              dataSource={data.antd}
              rowKey="id"
              pagination={false}
              virtual
              scroll={{ y: VISIBLE_HEIGHT, x: 1000 }}
              bordered
            />
          </AntConfigProvider>,
        )
      })
    }
    await nextFrames(2)
    const mountMs = performance.now() - t0

    const scroller = host.querySelector<HTMLElement>(
      variant === 'skygraph'
        ? '[data-sg-table-scroll], .sg-table-virtual, .sg-table-body, .sg-table'
        : '.ant-table-body, .ant-table-tbody-virtual-holder',
    )
    let scrollFps = 0
    if (scroller) {
      const frameTimes: number[] = []
      let last = performance.now()
      let scrollTop = 0
      for (let i = 0; i < SCROLL_FRAMES; i++) {
        if (signal.aborted) break
        scrollTop += SCROLL_PIXELS_PER_FRAME
        scroller.scrollTop = scrollTop
        await new Promise<void>((r) => requestAnimationFrame(() => r()))
        const now = performance.now()
        frameTimes.push(now - last)
        last = now
      }
      const avgFrame = frameTimes.length
        ? frameTimes.reduce((s, x) => s + x, 0) / frameTimes.length
        : 16.7
      scrollFps = avgFrame > 0 ? 1000 / avgFrame : 0
    }

    const afterHeap = readHeapMemory()

    flushSync(() => root.unmount())
    host.remove()
    await sleep(16)

    const extras: Record<string, number> = {
      scrollFps,
    }
    if (beforeHeap !== null && afterHeap !== null) {
      extras.heapDeltaBytes = Math.max(0, afterHeap - beforeHeap)
    }
    return { value: mountMs, extras }
  }
}

interface PreviewState {
  variant: 'skygraph' | 'antd'
}

export function TableBenchmark() {
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState<string>('')
  const [results, setResults] = useState<BenchResult[]>([])
  const [preview, setPreview] = useState<PreviewState>({ variant: 'skygraph' })
  const [previewRows, setPreviewRows] = useState(2_000)
  const abortRef = useRef<AbortController | null>(null)
  const dataRef = useRef<{ sky: Row[]; antd: RowFlat[] } | null>(null)

  useEffect(() => () => abortRef.current?.abort(), [])

  const previewData = useMemo(() => {
    const sky: Row[] = []
    const antd: RowFlat[] = []
    for (let i = 0; i < previewRows; i++) {
      const flat: RowFlat = {
        id: i + 1,
        name: `Employee ${i + 1}`,
        department: departments[i % departments.length]!,
        role: roles[i % roles.length]!,
        salary: 50_000 + (i * 137) % 250_000,
        status: statuses[i % statuses.length]!,
        hiredAt: `${2010 + (i % 15)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
      }
      sky.push({ id: `pr-${i}` as RowId, data: flat })
      antd.push(flat)
    }
    return { sky, antd }
  }, [previewRows])

  const run = async () => {
    if (running) return
    setRunning(true)
    setResults([])
    setProgress('Generating dataset...')
    abortRef.current = new AbortController()
    const signal = abortRef.current.signal
    try {
      if (!dataRef.current) {
        await sleep(0)
        dataRef.current = makeData()
      }
      const data = dataRef.current
      const variants: Array<{ id: string; label: string; runner: Runner }> = [
        { id: 'skygraph', label: 'SkyGraph <Table>', runner: buildRunner('skygraph', data) },
        { id: 'antd', label: 'antd <Table virtual>', runner: buildRunner('antd', data) },
      ]
      const out: BenchResult[] = []
      for (const v of variants) {
        if (signal.aborted) throw new Error('aborted')
        setProgress(`Running ${v.label}...`)
        const r = await runVariant(v.id, v.label, 'ms', v.runner, { iterations: 3, warmup: 1, sleepMs: 80 }, signal)
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
          {running ? 'Running…' : `Run · ${ROW_COUNT.toLocaleString()} rows × 4`}
        </button>
        <button className="bench-btn" type="button" onClick={stop} disabled={!running}>
          Stop
        </button>
        {progress && <span className="bench-progress">{progress}</span>}
      </div>

      <div className="bench-method">
        <strong>Method.</strong> {ROW_COUNT.toLocaleString()} rows, 7 columns, virtualized scroll container 480px tall.
        Each variant is mounted into a detached host with a single <code>flushSync</code>, mount time is measured to
        the next two paint frames. Then the scroller is scrolled {SCROLL_FRAMES} frames at{' '}
        {SCROLL_PIXELS_PER_FRAME}px/frame and average frame time → FPS is computed. We discard the warm-up run and
        report the median of 3 measured runs. Heap delta is reported only on Chromium where{' '}
        <code>performance.memory</code> is exposed.
      </div>

      <ResultsTable
        results={results}
        columns={[
          { key: 'mount', label: 'Median mount', extract: (r) => formatMetric(r.median, 'ms') },
          {
            key: 'fps',
            label: 'Scroll FPS',
            extract: (r) => (r.extras?.scrollFps ? formatMetric(r.extras.scrollFps, 'fps') : '—'),
          },
          {
            key: 'heap',
            label: 'Heap Δ',
            extract: (r) =>
              r.extras?.heapDeltaBytes ? formatMetric(r.extras.heapDeltaBytes, 'bytes') : 'n/a',
          },
          { key: 'min', label: 'Min mount', extract: (r) => formatMetric(r.min, 'ms') },
          { key: 'max', label: 'Max mount', extract: (r) => formatMetric(r.max, 'ms') },
        ]}
      />

      <div className="bench-preview">
        <div className="bench-preview-head">
          <strong>Live preview</strong>
          <div className="bench-preview-controls">
            <label>
              Rows
              <select
                value={previewRows}
                onChange={(e) => setPreviewRows(Number(e.target.value))}
                disabled={running}
              >
                <option value={500}>500</option>
                <option value={2_000}>2 000</option>
                <option value={10_000}>10 000</option>
              </select>
            </label>
            <label>
              Library
              <select
                value={preview.variant}
                onChange={(e) =>
                  setPreview({ variant: e.target.value as 'skygraph' | 'antd' })
                }
                disabled={running}
              >
                <option value="skygraph">SkyGraph</option>
                <option value="antd">antd</option>
              </select>
            </label>
          </div>
        </div>
        <div className="bench-preview-frame" style={{ height: VISIBLE_HEIGHT + 8 }}>
          {preview.variant === 'skygraph' ? (
            <SkyTable
              columns={skyColumns}
              data={previewData.sky}
              pageSize={previewData.sky.length}
              showPagination={false}
              virtual={{ rowHeight: 40, overscan: 6 }}
              scroll={{ y: VISIBLE_HEIGHT }}
              bordered
            />
          ) : (
            <AntConfigProvider>
              <AntTable
                columns={antColumns}
                dataSource={previewData.antd}
                rowKey="id"
                pagination={false}
                virtual
                scroll={{ y: VISIBLE_HEIGHT, x: 1000 }}
                bordered
              />
            </AntConfigProvider>
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
