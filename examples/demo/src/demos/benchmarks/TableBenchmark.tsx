import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { Table as SkyTable } from '@skygraph/react'
import type { TableColumn, RowId } from '@skygraph/react'
import { SgTable } from '@skygraph/vue'
import type { TableColumn as VueTableColumn } from '@skygraph/vue'
import { Table as AntTable, ConfigProvider as AntConfigProvider } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { createApp, h, nextTick } from 'vue'

import { useI18n } from '../../i18n/I18nContext'
import type { DemoDict } from '../../i18n/types'
import {
  benchFill,
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

/** Shared SkyGraph DOM (React Table + Vue SgTable). */
const SG_TABLE_SCROLL_SELECTOR =
  '[data-sg-table-scroll], .sg-table-virtual, .sg-table-body, .sg-table'

type BenchStrings = DemoDict['benchmarks']

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

function makeData(employeePrefix: string): { sky: Row[]; antd: RowFlat[] } {
  const sky: Row[] = new Array(ROW_COUNT)
  const antd: RowFlat[] = new Array(ROW_COUNT)
  for (let i = 0; i < ROW_COUNT; i++) {
    const flat: RowFlat = {
      id: i + 1,
      name: `${employeePrefix}${i + 1}`,
      department: departments[i % departments.length]!,
      role: roles[i % roles.length]!,
      salary: 50_000 + ((i * 137) % 250_000),
      status: statuses[i % statuses.length]!,
      hiredAt: `${2010 + (i % 15)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
    }
    sky[i] = { id: `r-${i}` as RowId, data: flat }
    antd[i] = flat
  }
  return { sky, antd }
}

function buildSkyColumns(b: BenchStrings): TableColumn[] {
  return [
    { key: 'id', title: b.colId, width: 80, sortable: true },
    { key: 'name', title: b.colName, width: 180, sortable: true, fixed: 'left' },
    { key: 'department', title: b.colDepartment, width: 140, sortable: true },
    { key: 'role', title: b.colRole, width: 140, sortable: true },
    {
      key: 'salary',
      title: b.colSalary,
      width: 120,
      sortable: true,
      align: 'right',
      render: (v) => `$${Number(v).toLocaleString()}`,
    },
    { key: 'status', title: b.colStatus, width: 120 },
    { key: 'hiredAt', title: b.colHired, width: 120 },
  ]
}

function buildVueColumns(b: BenchStrings): VueTableColumn[] {
  return [
    { key: 'id', title: b.colId, width: 80, sortable: true },
    { key: 'name', title: b.colName, width: 180, sortable: true, fixed: 'left' },
    { key: 'department', title: b.colDepartment, width: 140, sortable: true },
    { key: 'role', title: b.colRole, width: 140, sortable: true },
    { key: 'salary', title: b.colSalary, width: 120, sortable: true, align: 'right' },
    { key: 'status', title: b.colStatus, width: 120 },
    { key: 'hiredAt', title: b.colHired, width: 120 },
  ]
}

function buildAntColumns(b: BenchStrings): ColumnsType<RowFlat> {
  return [
    { key: 'id', title: b.colId, dataIndex: 'id', width: 80, sorter: (a, x) => a.id - x.id },
    {
      key: 'name',
      title: b.colName,
      dataIndex: 'name',
      width: 180,
      fixed: 'left',
      sorter: (a, x) => a.name.localeCompare(x.name),
    },
    {
      key: 'department',
      title: b.colDepartment,
      dataIndex: 'department',
      width: 140,
      sorter: (a, x) => a.department.localeCompare(x.department),
    },
    { key: 'role', title: b.colRole, dataIndex: 'role', width: 140 },
    {
      key: 'salary',
      title: b.colSalary,
      dataIndex: 'salary',
      width: 120,
      align: 'right',
      sorter: (a, x) => a.salary - x.salary,
      render: (v: number) => `$${v.toLocaleString()}`,
    },
    { key: 'status', title: b.colStatus, dataIndex: 'status', width: 120 },
    { key: 'hiredAt', title: b.colHired, dataIndex: 'hiredAt', width: 120 },
  ]
}

function buildRunner(
  variant: 'skygraph' | 'antd',
  data: { sky: Row[]; antd: RowFlat[] },
  skyCols: TableColumn[],
  antCols: ColumnsType<RowFlat>,
): Runner {
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
            columns={skyCols}
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
            <AntTable<RowFlat>
              columns={antCols}
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
        ? SG_TABLE_SCROLL_SELECTOR
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

function vueSalaryCell(props: { column: VueTableColumn; value: unknown }) {
  if (props.column.key === 'salary') {
    return h('span', `$${Number(props.value).toLocaleString()}`)
  }
  return h('span', String(props.value ?? ''))
}

function buildVueRunner(data: { sky: Row[] }, vueCols: VueTableColumn[]): Runner {
  return async ({ signal }) => {
    const host = document.createElement('div')
    host.style.position = 'fixed'
    host.style.left = '-10000px'
    host.style.top = '0'
    host.style.width = '900px'
    host.style.height = `${VISIBLE_HEIGHT}px`
    document.body.appendChild(host)

    const beforeHeap = readHeapMemory()
    const t0 = performance.now()

    const app = createApp({
      render() {
        return h(
          SgTable,
          {
            columns: vueCols,
            data: data.sky,
            pageSize: data.sky.length,
            showPagination: false,
            virtual: { rowHeight: 40, overscan: 8 },
            scroll: { y: VISIBLE_HEIGHT },
            bordered: true,
          },
          {
            cell: (slotProps: { column: VueTableColumn; value: unknown }) =>
              vueSalaryCell(slotProps),
          },
        )
      },
    })
    app.mount(host)

    await nextTick()
    await nextFrames(2)
    const mountMs = performance.now() - t0

    const scroller = host.querySelector<HTMLElement>(SG_TABLE_SCROLL_SELECTOR)
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

    app.unmount()
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

type PreviewVariant = 'skygraph' | 'sky-vue' | 'antd'

interface PreviewState {
  variant: PreviewVariant
}

function VueTablePreview({ columns, rows }: { columns: VueTableColumn[]; rows: Row[] }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const app = createApp({
      render() {
        return h(
          SgTable,
          {
            columns,
            data: rows,
            pageSize: rows.length,
            showPagination: false,
            virtual: { rowHeight: 40, overscan: 6 },
            scroll: { y: VISIBLE_HEIGHT },
            bordered: true,
          },
          {
            cell: (slotProps: { column: VueTableColumn; value: unknown }) =>
              vueSalaryCell(slotProps),
          },
        )
      },
    })
    app.mount(host)
    return () => {
      app.unmount()
    }
  }, [columns, rows])

  return <div ref={hostRef} className="bench-vue-mount" style={{ minHeight: VISIBLE_HEIGHT + 8 }} />
}

export function TableBenchmark() {
  const { t } = useI18n()
  const b = t.benchmarks
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState<string>('')
  const [results, setResults] = useState<BenchResult[]>([])
  const [preview, setPreview] = useState<PreviewState>({ variant: 'skygraph' })
  const [previewRows, setPreviewRows] = useState(2_000)
  const abortRef = useRef<AbortController | null>(null)
  const dataRef = useRef<{ sky: Row[]; antd: RowFlat[] } | null>(null)

  const skyCols = useMemo(() => buildSkyColumns(b), [b])
  const vueCols = useMemo(() => buildVueColumns(b), [b])
  const antCols = useMemo(() => buildAntColumns(b), [b])

  useEffect(() => () => abortRef.current?.abort(), [])

  useEffect(() => {
    dataRef.current = null
  }, [b.employeePrefix])

  const previewData = useMemo(() => {
    const sky: Row[] = []
    const antd: RowFlat[] = []
    for (let i = 0; i < previewRows; i++) {
      const flat: RowFlat = {
        id: i + 1,
        name: `${b.employeePrefix}${i + 1}`,
        department: departments[i % departments.length]!,
        role: roles[i % roles.length]!,
        salary: 50_000 + ((i * 137) % 250_000),
        status: statuses[i % statuses.length]!,
        hiredAt: `${2010 + (i % 15)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
      }
      sky.push({ id: `pr-${i}` as RowId, data: flat })
      antd.push(flat)
    }
    return { sky, antd }
  }, [previewRows, b.employeePrefix])

  const run = async () => {
    if (running) return
    setRunning(true)
    setResults([])
    setProgress(b.generatingDataset)
    abortRef.current = new AbortController()
    const signal = abortRef.current.signal
    try {
      if (!dataRef.current) {
        await sleep(0)
        dataRef.current = makeData(b.employeePrefix)
      }
      const data = dataRef.current
      const variants: Array<{ id: string; label: string; runner: Runner }> = [
        {
          id: 'skygraph-react',
          label: b.labelSkyTable,
          runner: buildRunner('skygraph', data, skyCols, antCols),
        },
        {
          id: 'skygraph-vue',
          label: b.labelSkyVueTable,
          runner: buildVueRunner(data, vueCols),
        },
        {
          id: 'antd',
          label: b.labelAntdTable,
          runner: buildRunner('antd', data, skyCols, antCols),
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
          { iterations: 3, warmup: 1, sleepMs: 80 },
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

  const methodText = benchFill(b.tableMethod, {
    rows: ROW_COUNT.toLocaleString(),
    frames: SCROLL_FRAMES,
    pxPerFrame: SCROLL_PIXELS_PER_FRAME,
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
            : benchFill(b.tableRunIdle, { rows: ROW_COUNT.toLocaleString() })}
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
          { key: 'mount', label: b.colMedianMount, extract: (r) => formatMetric(r.median, 'ms') },
          {
            key: 'fps',
            label: b.colScrollFps,
            extract: (r) => (r.extras?.scrollFps ? formatMetric(r.extras.scrollFps, 'fps') : '—'),
          },
          {
            key: 'heap',
            label: b.colHeapDelta,
            extract: (r) =>
              r.extras?.heapDeltaBytes ? formatMetric(r.extras.heapDeltaBytes, 'bytes') : b.heapNa,
          },
          { key: 'min', label: b.colMinMount, extract: (r) => formatMetric(r.min, 'ms') },
          { key: 'max', label: b.colMaxMount, extract: (r) => formatMetric(r.max, 'ms') },
        ]}
      />

      <div className="bench-preview">
        <div className="bench-preview-head">
          <strong>{b.livePreview}</strong>
          <div className="bench-preview-controls">
            <label>
              {b.rows}
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
              {b.library}
              <select
                value={preview.variant}
                onChange={(e) => setPreview({ variant: e.target.value as PreviewVariant })}
                disabled={running}
              >
                <option value="skygraph">{b.previewSkyReact}</option>
                <option value="sky-vue">{b.previewSkyVue}</option>
                <option value="antd">{b.previewAntdBrand}</option>
              </select>
            </label>
          </div>
        </div>
        <div className="bench-preview-frame" style={{ height: VISIBLE_HEIGHT + 8 }}>
          {preview.variant === 'skygraph' && (
            <SkyTable
              columns={skyCols}
              data={previewData.sky}
              pageSize={previewData.sky.length}
              showPagination={false}
              virtual={{ rowHeight: 40, overscan: 6 }}
              scroll={{ y: VISIBLE_HEIGHT }}
              bordered
            />
          )}
          {preview.variant === 'sky-vue' && (
            <VueTablePreview columns={vueCols} rows={previewData.sky} />
          )}
          {preview.variant === 'antd' && (
            <AntConfigProvider>
              <AntTable<RowFlat>
                columns={antCols}
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
