import { useMemo, useState } from 'react'
import { TableBenchmark } from '../../demos/benchmarks/TableBenchmark'
import { FormBenchmark } from '../../demos/benchmarks/FormBenchmark'
import { LineChartBenchmark } from '../../demos/benchmarks/LineChartBenchmark'
import { useI18n } from '../../i18n/I18nContext'
import './benchmarks.css'

type TabKey = 'table' | 'form' | 'chart'

interface TabDef {
  key: TabKey
  label: string
  subtitle: string
  competitor: string
}

export function BenchmarksPage() {
  const { t } = useI18n()
  const b = t.benchmarks
  const [active, setActive] = useState<TabKey>('table')

  const tabs: TabDef[] = useMemo(
    () => [
      {
        key: 'table',
        label: b.tabTableLabel,
        subtitle: b.tabTableSubtitle,
        competitor: b.tabTableVs,
      },
      { key: 'form', label: b.tabFormLabel, subtitle: b.tabFormSubtitle, competitor: b.tabFormVs },
      {
        key: 'chart',
        label: b.tabChartLabel,
        subtitle: b.tabChartSubtitle,
        competitor: b.tabChartVs,
      },
    ],
    [b],
  )

  return (
    <div className="bench-page">
      <header className="bench-header">
        <h1 className="bench-title">{b.pageTitle}</h1>
        <p className="bench-lead">
          {b.pageLead1} <code>performance.now()</code> {b.pageLead2}{' '}
          <code>requestAnimationFrame</code>
          {b.pageLead3}
        </p>
        <div className="bench-disclaimers">
          <div>
            <strong>{b.disclaimerHonestTitle}</strong> {b.disclaimerHonestBody}
          </div>
          <div>
            <strong>{b.disclaimerBrowserTitle}</strong> {b.disclaimerBrowserBody}
          </div>
          <div>
            <strong>{b.disclaimerTriggerTitle}</strong> {b.disclaimerTriggerBeforeRun}
            <em>{b.runWord}</em>
            {b.disclaimerTriggerAfterRun}
          </div>
        </div>
      </header>

      <nav className="bench-tabs" role="tablist">
        {tabs.map((tab) => {
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
        <h2>{b.howToReadTitle}</h2>
        <ul>
          <li>
            <strong>{b.howToRead1Strong}</strong> {b.howToRead1Rest}
          </li>
          <li>
            <strong>{b.howToRead2Strong}</strong> {b.howToRead2Rest}
          </li>
          <li>
            <strong>{b.howToRead3Strong}</strong> {b.howToRead3Rest}
          </li>
          <li>
            <strong>
              {b.howToRead4Strong}
              <code>flushSync</code>
              {b.howToRead4BeforeCode}
            </strong>
            {b.howToRead4AfterCode}
          </li>
        </ul>
      </section>
    </div>
  )
}
