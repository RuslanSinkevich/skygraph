import { GITHUB_URL } from '@skygraph-examples/shared'
import { Button, Input, Progress, Switch, Table, Tag } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { useMemo, useState } from 'react'
import { useI18n } from '../../i18n'
import './landing.css'

interface LandingProps {
  onNavigate: (key: string) => void
}

const INSTALL_COMMAND = 'npm install skygraph-react'

const SHOWCASES: ReadonlyArray<{
  key: string
  titleKey:
    | 'showcaseCrmTitle'
    | 'showcaseDashboardTitle'
    | 'showcaseProjectTrackerTitle'
    | 'showcaseTableTitle'
  descKey:
    | 'showcaseCrmDesc'
    | 'showcaseDashboardDesc'
    | 'showcaseProjectTrackerDesc'
    | 'showcaseTableDesc'
}> = [
  {
    key: 'crm',
    titleKey: 'showcaseCrmTitle',
    descKey: 'showcaseCrmDesc',
  },
  {
    key: 'dashboard',
    titleKey: 'showcaseDashboardTitle',
    descKey: 'showcaseDashboardDesc',
  },
  {
    key: 'project-tracker',
    titleKey: 'showcaseProjectTrackerTitle',
    descKey: 'showcaseProjectTrackerDesc',
  },
  {
    key: 'table-kitchen-sink',
    titleKey: 'showcaseTableTitle',
    descKey: 'showcaseTableDesc',
  },
]

const COMPONENT_LINKS = [
  'Button',
  'Input',
  'Select',
  'Table',
  'Form',
  'Charts',
  'Dashboard',
  'Gantt',
  'Calendar',
  'Tree',
  'Modal',
  'Upload',
] as const

export function Landing({ onNavigate }: LandingProps) {
  const { t } = useI18n()

  return (
    <div className="landing">
      <Hero onNavigate={onNavigate} />
      <ComponentIndex onNavigate={onNavigate} />
      <Highlights />
      <Showcases onNavigate={onNavigate} />
      <FooterCta onNavigate={onNavigate} />
      <noscript>{t.landing.heroSub}</noscript>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────

function Hero({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { t } = useI18n()
  const [previewDark, setPreviewDark] = useState(false)
  const previewColumns = useMemo<TableColumn[]>(
    () => [
      { key: 'name', title: t.landing.previewColumnComponent, sortable: true },
      {
        key: 'status',
        title: t.landing.previewColumnStatus,
        render: (value) => (
          <Tag color={value === t.landing.previewStatusStable ? 'success' : 'processing'}>
            {String(value)}
          </Tag>
        ),
      },
      {
        key: 'coverage',
        title: t.landing.previewColumnCoverage,
        render: (value) => <Progress percent={Number(value)} size="small" />,
      },
    ],
    [t],
  )

  const previewRows = useMemo(
    () => [
      {
        id: 'table',
        data: {
          name: t.landing.previewRowTable,
          status: t.landing.previewStatusStable,
          coverage: 96,
        },
      },
      {
        id: 'form',
        data: {
          name: t.landing.previewRowForm,
          status: t.landing.previewStatusStable,
          coverage: 88,
        },
      },
      {
        id: 'charts',
        data: {
          name: t.landing.previewRowCharts,
          status: t.landing.previewStatusBeta,
          coverage: 72,
        },
      },
    ],
    [t],
  )

  return (
    <section className="landing-hero">
      <div className="landing-hero-text">
        <span className="landing-eyebrow">{t.landing.heroEyebrow}</span>
        <h1>{t.landing.heroTitle}</h1>
        <p className="landing-hero-sub">{t.landing.heroSub}</p>
        <pre className="landing-hero-install">
          <code>{INSTALL_COMMAND}</code>
        </pre>
        <div className="landing-cta">
          <Button type="primary" size="large" onClick={() => onNavigate('components/button')}>
            {t.landing.heroComponentsCta}
          </Button>
          <Button size="large" onClick={() => onNavigate('guide/getting-started')}>
            {t.landing.heroGettingStartedCta}
          </Button>
        </div>
      </div>
      <div
        className="landing-preview"
        aria-label={t.landing.previewLabel}
        data-sg-theme={previewDark ? 'dark' : 'light'}
      >
        <div className="landing-preview-topbar">
          <span>{t.landing.previewLabel}</span>
          <Tag color="processing">React</Tag>
        </div>
        <div className="landing-preview-metrics">
          <div>
            <span>{t.landing.previewMetricComponents}</span>
            <strong>{t.landing.previewMetricComponentsValue}</strong>
          </div>
          <div>
            <span>{t.landing.previewMetricTheme}</span>
            <strong>
              {previewDark ? t.landing.previewThemeDark : t.landing.previewThemeLight}
            </strong>
          </div>
          <div>
            <span>{t.landing.previewMetricData}</span>
            <strong>{t.landing.previewMetricDataValue}</strong>
          </div>
        </div>
        <div className="landing-preview-controls">
          <Input defaultValue="SkyGraph admin" placeholder={t.landing.previewInputPlaceholder} />
          <label className="landing-preview-theme-toggle">
            <Switch checked={previewDark} onChange={setPreviewDark} size="small" />
            <span>{previewDark ? t.landing.previewThemeDark : t.landing.previewThemeLight}</span>
          </label>
        </div>
        <Table columns={previewColumns} data={previewRows} showPagination={false} size="small" />
        <div className="landing-preview-code">
          <span>{t.landing.previewCodeLabel}</span>
          <code>{`import { Button, Table } from 'skygraph-react'`}</code>
        </div>
      </div>
    </section>
  )
}

function ComponentIndex({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { t } = useI18n()
  return (
    <section className="landing-components">
      <div>
        <h2 className="landing-section-title">{t.landing.componentIndexTitle}</h2>
        <p className="landing-section-sub">{t.landing.componentIndexSub}</p>
      </div>
      <div className="landing-component-grid">
        {COMPONENT_LINKS.map((name) => (
          <button
            key={name}
            type="button"
            className="landing-component-pill"
            onClick={() => onNavigate(`components/${name.toLowerCase()}`)}
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  )
}

// ───────────────────────────────────────────────────────────────────────

function Highlights() {
  const { t } = useI18n()
  const items = [
    { title: t.landing.highlight1Title, desc: t.landing.highlight1Desc },
    { title: t.landing.highlight2Title, desc: t.landing.highlight2Desc },
    { title: t.landing.highlight3Title, desc: t.landing.highlight3Desc },
    { title: t.landing.highlight4Title, desc: t.landing.highlight4Desc },
  ]
  return (
    <section>
      <h2 className="landing-section-title">{t.landing.highlightsTitle}</h2>
      <div className="landing-highlights">
        {items.map((item) => (
          <article className="landing-highlight" key={item.title}>
            <span className="landing-highlight-title">{item.title}</span>
            <span className="landing-highlight-desc">{item.desc}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

// ───────────────────────────────────────────────────────────────────────

function Showcases({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { t } = useI18n()
  return (
    <section>
      <h2 className="landing-section-title">{t.landing.showcasesTitle}</h2>
      <p className="landing-section-sub">{t.landing.showcasesSub}</p>
      <div className="landing-showcases">
        {SHOWCASES.map((s) => (
          <a
            key={s.key}
            className="landing-showcase"
            href={`#/showcases/${s.key}`}
            onClick={(ev) => {
              ev.preventDefault()
              onNavigate(`showcases/${s.key}`)
            }}
          >
            <div className="landing-showcase-body">
              <span className="landing-showcase-title">{t.landing[s.titleKey]}</span>
              <span className="landing-showcase-desc">{t.landing[s.descKey]}</span>
            </div>
          </a>
        ))}
      </div>
      <a
        className="landing-link"
        href="#/showcases"
        onClick={(ev) => {
          ev.preventDefault()
          onNavigate('showcases')
        }}
      >
        {t.landing.showcasesLink}
      </a>
    </section>
  )
}

// ───────────────────────────────────────────────────────────────────────

function FooterCta({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { t } = useI18n()
  return (
    <section className="landing-footer-cta">
      <h2 className="landing-footer-cta-title">{t.landing.footerCtaTitle}</h2>
      <p className="landing-footer-cta-body">{t.landing.footerCtaBody}</p>
      <button
        type="button"
        className="landing-footer-cta-button"
        onClick={() => onNavigate('showcases')}
      >
        {t.landing.footerCtaButton} →
      </button>
      <p className="landing-footer-cta-hint">
        {t.landing.footerDevHint}
        {' · '}
        <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
          GitHub
        </a>
      </p>
    </section>
  )
}
