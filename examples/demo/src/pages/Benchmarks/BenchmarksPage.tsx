import { useState } from 'react'
import { TableBenchmark } from '../../demos/benchmarks/TableBenchmark'
import { FormBenchmark } from '../../demos/benchmarks/FormBenchmark'
import { LineChartBenchmark } from '../../demos/benchmarks/LineChartBenchmark'
import './benchmarks.css'

type TabKey = 'table' | 'form' | 'chart'

interface TabDef {
  key: TabKey
  label: string
  subtitle: string
  competitor: string
}

const TABS: TabDef[] = [
  {
    key: 'table',
    label: 'Table · 100k rows',
    subtitle: 'Mount + scroll FPS + heap delta',
    competitor: 'vs antd <Table virtual>',
  },
  {
    key: 'form',
    label: 'Form · 100 fields',
    subtitle: 'Mount + per-change + submit bytes',
    competitor: 'vs react-hook-form + plain inputs',
  },
  {
    key: 'chart',
    label: 'LineChart · 1k×60',
    subtitle: 'Median frame time + avg FPS',
    competitor: 'vs recharts <LineChart>',
  },
]

export function BenchmarksPage() {
  const [active, setActive] = useState<TabKey>('table')

  return (
    <div className="bench-page">
      <header className="bench-header">
        <h1 className="bench-title">SkyGraph runtime benchmarks</h1>
        <p className="bench-lead">
          Side-by-side comparisons against widely-used React libraries on the same data, in the same browser tab. No
          microbenchmarks: each test mounts a real component tree, measures with{' '}
          <code>performance.now()</code> + <code>requestAnimationFrame</code>, takes the median of multiple runs after a
          discarded warm-up.
        </p>
        <div className="bench-disclaimers">
          <div>
            <strong>Honest reporting.</strong> If SkyGraph is slower in a benchmark, that's what the table shows. We
            don't tweak methodology to win.
          </div>
          <div>
            <strong>Browser-only.</strong> Heap delta is reported only when{' '}
            <code>performance.memory</code> is exposed (Chromium).
          </div>
          <div>
            <strong>Trigger-based.</strong> Benchmarks never autorun. Use the <em>Run</em> button on each tab.
          </div>
        </div>
      </header>

      <nav className="bench-tabs" role="tablist">
        {TABS.map((tab) => {
          const isActive = tab.key === active
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`bench-tab${isActive ? ' bench-tab--active' : ''}`}
              onClick={() => setActive(tab.key)}
            >
              <span className="bench-tab-label">{tab.label}</span>
              <span className="bench-tab-sub">{tab.subtitle}</span>
              <span className="bench-tab-vs">{tab.competitor}</span>
            </button>
          )
        })}
      </nav>

      <div className="bench-body">
        {active === 'table' && <TableBenchmark />}
        {active === 'form' && <FormBenchmark />}
        {active === 'chart' && <LineChartBenchmark />}
      </div>

      <section className="bench-method-detail">
        <h2>How to read these numbers</h2>
        <ul>
          <li>
            <strong>Median, not mean.</strong> Browser GC and main-thread interruptions create heavy outliers. Median
            of N runs is what matters for steady-state UX.
          </li>
          <li>
            <strong>Same dataset, same dom host.</strong> Each variant renders into a detached DOM root that is
            unmounted between runs to release retained nodes.
          </li>
          <li>
            <strong>Single-threaded numbers.</strong> No Web Workers, no React Server Components. Both libraries are
            measured the way an app developer would actually use them.
          </li>
          <li>
            <strong>Mount uses <code>flushSync</code>.</strong> Both variants commit synchronously so the timestamp
            captures real layout work, not a deferred React 19 schedule.
          </li>
        </ul>
      </section>
    </div>
  )
}
