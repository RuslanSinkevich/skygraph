import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { Tree as SkyTree } from '@skygraph/react'
import type { TreeNodeData } from '@skygraph/react'
import { Tree as AntTree, ConfigProvider as AntConfigProvider } from 'antd'
import type { DataNode as AntDataNode } from 'antd/es/tree'

import {
  formatMetric,
  nextFrames,
  readHeapMemory,
  runVariant,
  sleep,
  type BenchResult,
  type Runner,
} from './benchUtils'

// 100 roots × 100 children = ~10 100 nodes. Big enough that a non-windowed
// renderer cannot keep up but small enough that the test fits in a few
// hundred ms per iteration on a mid-range laptop.
const ROOT_COUNT = 100
const CHILDREN_PER_ROOT = 100
const TOTAL_NODES = ROOT_COUNT * (CHILDREN_PER_ROOT + 1)
const VISIBLE_HEIGHT = 480
const SCROLL_FRAMES = 60
const SCROLL_PIXELS_PER_FRAME = 24
const EXPAND_TOGGLES = 8

interface TreeData {
  sky: TreeNodeData[]
  antd: AntDataNode[]
  rootKeys: string[]
}

function buildTree(): TreeData {
  const sky: TreeNodeData[] = new Array(ROOT_COUNT)
  const antd: AntDataNode[] = new Array(ROOT_COUNT)
  const rootKeys: string[] = new Array(ROOT_COUNT)
  for (let i = 0; i < ROOT_COUNT; i++) {
    const rootKey = `r-${i}`
    rootKeys[i] = rootKey
    const skyChildren: TreeNodeData[] = new Array(CHILDREN_PER_ROOT)
    const antdChildren: AntDataNode[] = new Array(CHILDREN_PER_ROOT)
    for (let j = 0; j < CHILDREN_PER_ROOT; j++) {
      const childKey = `${rootKey}-c${j}`
      const title = `Item ${i + 1}.${j + 1}`
      skyChildren[j] = { key: childKey, title, isLeaf: true }
      antdChildren[j] = { key: childKey, title, isLeaf: true }
    }
    sky[i] = { key: rootKey, title: `Root ${i + 1}`, children: skyChildren }
    antd[i] = { key: rootKey, title: `Root ${i + 1}`, children: antdChildren }
  }
  return { sky, antd, rootKeys }
}

interface RunOutput {
  mountMs: number
  expandMs: number
  scrollFps: number
}

/**
 * Mount a tree into a detached DOM root, measure mount time, toggle
 * expand state on a handful of root nodes (this re-flattens the visible
 * window, which is the most expensive Tree update path), then scroll the
 * virtual list and measure FPS.
 *
 * Both libraries get the same dataset, the same viewport height, and the
 * same `defaultExpandAll` so we compare apples to apples — windowed
 * rendering of a fully-expanded 10k-node tree.
 */
function buildRunner(variant: 'skygraph' | 'antd', data: TreeData): Runner {
  return async ({ signal }) => {
    const host = document.createElement('div')
    host.style.position = 'fixed'
    host.style.left = '-10000px'
    host.style.top = '0'
    host.style.width = '600px'
    host.style.height = `${VISIBLE_HEIGHT}px`
    document.body.appendChild(host)

    const root = createRoot(host)
    const beforeHeap = readHeapMemory()
    const t0 = performance.now()

    if (variant === 'skygraph') {
      flushSync(() => {
        root.render(
          <SkyTree treeData={data.sky} defaultExpandAll height={VISIBLE_HEIGHT} virtual />,
        )
      })
    } else {
      flushSync(() => {
        root.render(
          <AntConfigProvider>
            <AntTree treeData={data.antd} defaultExpandAll height={VISIBLE_HEIGHT} blockNode />
          </AntConfigProvider>,
        )
      })
    }
    await nextFrames(2)
    const mountMs = performance.now() - t0

    // Expand/collapse pass. We toggle the first N roots: collapse, then
    // re-expand. This forces the flattener to recompute the visible
    // window twice per toggle, which is the hottest Tree path in apps.
    let expandMs = 0
    {
      const startKeys = data.rootKeys.slice()
      const toggledOff = data.rootKeys.slice(EXPAND_TOGGLES)
      const expandIters = 4
      const t1 = performance.now()
      for (let i = 0; i < expandIters; i++) {
        if (signal.aborted) break
        const useCollapsed = i % 2 === 0
        const keys = useCollapsed ? toggledOff : startKeys
        if (variant === 'skygraph') {
          flushSync(() => {
            root.render(
              <SkyTree treeData={data.sky} expandedKeys={keys} height={VISIBLE_HEIGHT} virtual />,
            )
          })
        } else {
          flushSync(() => {
            root.render(
              <AntConfigProvider>
                <AntTree
                  treeData={data.antd}
                  expandedKeys={keys}
                  height={VISIBLE_HEIGHT}
                  blockNode
                />
              </AntConfigProvider>,
            )
          })
        }
        await nextFrames(1)
      }
      expandMs = (performance.now() - t1) / expandIters
    }

    // Re-expand all before scroll measurement so both variants scroll the
    // same number of virtual rows.
    if (variant === 'skygraph') {
      flushSync(() => {
        root.render(
          <SkyTree treeData={data.sky} defaultExpandAll height={VISIBLE_HEIGHT} virtual />,
        )
      })
    } else {
      flushSync(() => {
        root.render(
          <AntConfigProvider>
            <AntTree treeData={data.antd} defaultExpandAll height={VISIBLE_HEIGHT} blockNode />
          </AntConfigProvider>,
        )
      })
    }
    await nextFrames(2)

    const scroller = host.querySelector<HTMLElement>(
      variant === 'skygraph'
        ? '.sg-tree-virtual-container, .sg-tree'
        : '.ant-tree-list-holder, .ant-tree-list',
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

    const out: RunOutput = { mountMs, expandMs, scrollFps }
    const extras: Record<string, number> = {
      expandMs: out.expandMs,
      scrollFps: out.scrollFps,
    }
    if (beforeHeap !== null && afterHeap !== null) {
      extras.heapDeltaBytes = Math.max(0, afterHeap - beforeHeap)
    }
    return { value: out.mountMs, extras }
  }
}

interface PreviewState {
  variant: 'skygraph' | 'antd'
}

export function TreeBenchmark() {
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState<string>('')
  const [results, setResults] = useState<BenchResult[]>([])
  const [preview, setPreview] = useState<PreviewState>({ variant: 'skygraph' })
  const abortRef = useRef<AbortController | null>(null)
  const dataRef = useRef<TreeData | null>(null)

  useEffect(() => () => abortRef.current?.abort(), [])

  // The preview tree is intentionally smaller than the benchmark dataset:
  // 20 × 50 = 1k nodes. Big enough to see virtualization in action,
  // small enough not to lag the page when both the benchmark and the
  // preview are mounted side by side.
  const previewData = useMemo<TreeData>(() => {
    const sky: TreeNodeData[] = []
    const antd: AntDataNode[] = []
    const rootKeys: string[] = []
    for (let i = 0; i < 20; i++) {
      const rootKey = `pr-${i}`
      rootKeys.push(rootKey)
      const skyChildren: TreeNodeData[] = []
      const antdChildren: AntDataNode[] = []
      for (let j = 0; j < 50; j++) {
        const childKey = `${rootKey}-c${j}`
        const title = `Item ${i + 1}.${j + 1}`
        skyChildren.push({ key: childKey, title, isLeaf: true })
        antdChildren.push({ key: childKey, title, isLeaf: true })
      }
      sky.push({ key: rootKey, title: `Root ${i + 1}`, children: skyChildren })
      antd.push({ key: rootKey, title: `Root ${i + 1}`, children: antdChildren })
    }
    return { sky, antd, rootKeys }
  }, [])

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
        dataRef.current = buildTree()
      }
      const data = dataRef.current
      const variants: Array<{ id: string; label: string; runner: Runner }> = [
        { id: 'skygraph', label: 'SkyGraph <Tree>', runner: buildRunner('skygraph', data) },
        { id: 'antd', label: 'antd <Tree height>', runner: buildRunner('antd', data) },
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
          {running ? 'Running…' : `Run · ${TOTAL_NODES.toLocaleString()} nodes × 4`}
        </button>
        <button className="bench-btn" type="button" onClick={stop} disabled={!running}>
          Stop
        </button>
        {progress && <span className="bench-progress">{progress}</span>}
      </div>

      <div className="bench-method">
        <strong>Method.</strong> {ROOT_COUNT} root nodes × {CHILDREN_PER_ROOT} children ={' '}
        {TOTAL_NODES.toLocaleString()} total, mounted into a detached host with a single{' '}
        <code>flushSync</code> and the full tree expanded. Expand-toggle time is measured by
        collapsing/re-expanding the first {EXPAND_TOGGLES} roots four times via{' '}
        <code>expandedKeys</code>. Scroll FPS comes from {SCROLL_FRAMES} frames at{' '}
        {SCROLL_PIXELS_PER_FRAME}px/frame against the virtual scroller. Median of 3 measured runs
        after one discarded warm-up. Heap delta is reported only on Chromium where{' '}
        <code>performance.memory</code> is exposed.
      </div>

      <ResultsTable
        results={results}
        columns={[
          { key: 'mount', label: 'Median mount', extract: (r) => formatMetric(r.median, 'ms') },
          {
            key: 'expand',
            label: 'Expand toggle',
            extract: (r) => (r.extras?.expandMs ? formatMetric(r.extras.expandMs, 'ms') : '—'),
          },
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
          <strong>Live preview · 1 000 nodes</strong>
          <div className="bench-preview-controls">
            <label>
              Library
              <select
                value={preview.variant}
                onChange={(e) => setPreview({ variant: e.target.value as 'skygraph' | 'antd' })}
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
            <SkyTree treeData={previewData.sky} defaultExpandAll height={VISIBLE_HEIGHT} virtual />
          ) : (
            <AntConfigProvider>
              <AntTree
                treeData={previewData.antd}
                defaultExpandAll
                height={VISIBLE_HEIGHT}
                blockNode
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
