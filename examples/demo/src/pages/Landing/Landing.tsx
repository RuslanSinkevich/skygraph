import { useMemo } from 'react'
import {
  parseChangelog,
  COMPONENT_COUNT,
  TEST_COUNT,
  ENGINE_COUNT,
  SHOWCASE_COUNT,
  SHOWCASES_URL,
} from '@skygraph-examples/shared'
import type { ChangelogRound, ChangelogSubsection } from '@skygraph-examples/shared'
import changelogMd from '../../../../../CHANGELOG.md?raw'
import { useI18n } from '../../i18n'
import './landing.css'

const SHOWCASE_PREVIEWS = [
  { key: 'crm', icon: '👥', titleKey: 'CRM Dashboard' },
  { key: 'dashboard', icon: '📈', titleKey: 'Operations Dashboard' },
  { key: 'workflow-editor', icon: '🔀', titleKey: 'Workflow Editor' },
  { key: 'analytics', icon: '📊', titleKey: 'Analytics Workbench' },
] as const

const MINIMAL_EXAMPLE = `import { Form, Field, Input, SubmitButton } from '@skygraph/react'
import '@skygraph/styles'

export function Login() {
  return (
    <Form initialValues={{ email: '' }} onSubmit={console.log}>
      <Field name="email" required>
        <Input placeholder="email@example.com" />
      </Field>
      <SubmitButton>Sign in</SubmitButton>
    </Form>
  )
}`

interface LandingProps {
  onNavigate: (key: string) => void
}

export function Landing({ onNavigate }: LandingProps) {
  const { t } = useI18n()

  const latestRound = useMemo(() => extractLatestRound(changelogMd), [])

  return (
    <div className="landing">
      <Hero onNavigate={onNavigate} />
      <StatsRow t={t} />
      <FeatureGrid t={t} onNavigate={onNavigate} />
      <WhatsNew t={t} round={latestRound} onNavigate={onNavigate} />
      <ShowcasesPreview t={t} />
      <QuickInstall t={t} />
    </div>
  )
}

// ---------------------------------------------------------------------------

function Hero({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { t } = useI18n()
  return (
    <section className="landing-hero" data-section="hero">
      <h1>SkyGraph</h1>
      <p className="landing-hero-tagline">{t.app.tagline}</p>
      <p className="landing-hero-sub">{t.app.heroSub}</p>
      <div className="landing-cta">
        <button
          type="button"
          className="landing-cta-primary"
          onClick={() => onNavigate('guide/getting-started')}
        >
          {t.landing.ctaPrimary} →
        </button>
        <a
          className="landing-cta-secondary"
          href={SHOWCASES_URL}
          target="_blank"
          rel="noreferrer noopener"
        >
          {t.landing.ctaSecondary}
        </a>
      </div>
      <div className="landing-hero-install">
        <span className="landing-hero-install-prompt">$</span>
        npm install @skygraph/core @skygraph/react @skygraph/styles
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------

function StatsRow({ t }: { t: ReturnType<typeof useI18n>['t'] }) {
  const stats = [
    { value: `${COMPONENT_COUNT}+`, label: t.landing.statComponents },
    { value: String(TEST_COUNT), label: t.landing.statTests },
    { value: String(ENGINE_COUNT), label: t.landing.statEngines },
    { value: String(SHOWCASE_COUNT), label: t.landing.statShowcases },
    { value: t.landing.statRuntimeCssValue, label: t.landing.statRuntimeCss },
  ]
  return (
    <div className="landing-stats" role="list" aria-label="Project stats">
      {stats.map((s) => (
        <div className="landing-stat" role="listitem" key={s.label}>
          <div className="landing-stat-value">{s.value}</div>
          <div className="landing-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------

function FeatureGrid({
  t,
  onNavigate,
}: {
  t: ReturnType<typeof useI18n>['t']
  onNavigate: (key: string) => void
}) {
  const features: Array<{ title: string; desc: string; href: string }> = [
    {
      title: t.landing.featureReactiveCoreTitle,
      desc: t.landing.featureReactiveCoreDesc,
      href: 'guide/core-api',
    },
    {
      title: t.landing.featureEnginesTitle,
      desc: t.landing.featureEnginesDesc,
      href: 'guide/core-api',
    },
    {
      title: t.landing.featurePrintTitle,
      desc: t.landing.featurePrintDesc,
      href: 'components/charts',
    },
    {
      title: t.landing.featureChartsTitle,
      desc: t.landing.featureChartsDesc,
      href: 'components/charts',
    },
    {
      title: t.landing.featureDiagramTitle,
      desc: t.landing.featureDiagramDesc,
      href: 'components/diagram',
    },
    {
      title: t.landing.featureStylingTitle,
      desc: t.landing.featureStylingDesc,
      href: 'guide/theming',
    },
  ]
  return (
    <div className="landing-features">
      {features.map((f) => (
        <button
          key={f.title}
          type="button"
          className="landing-feature"
          onClick={() => onNavigate(f.href)}
        >
          <span className="landing-feature-title">{f.title}</span>
          <span className="landing-feature-desc">{f.desc}</span>
        </button>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------

function WhatsNew({
  t,
  round,
  onNavigate,
}: {
  t: ReturnType<typeof useI18n>['t']
  round: ChangelogRound | null
  onNavigate: (key: string) => void
}) {
  if (!round) return null
  return (
    <section className="landing-block">
      <h2 className="landing-section-title">{t.landing.whatsNewTitle}</h2>
      <div className="landing-changelog">
        <h3 className="landing-changelog-title">{round.title}</h3>
        <div className="landing-changelog-meta">CHANGELOG.md · Unreleased</div>
        {round.body.length > 0 && (
          <div className="landing-changelog-body">{condenseLines(round.body)}</div>
        )}
        {round.subsections.length > 0 && (
          <div className="landing-changelog-subsections">
            {round.subsections.slice(0, 6).map((s) => (
              <SubsectionCard key={s.title} subsection={s} />
            ))}
          </div>
        )}
        <a
          className="landing-link"
          href="#/guide/changelog"
          onClick={(ev) => {
            ev.preventDefault()
            onNavigate('guide/changelog')
          }}
        >
          {t.landing.whatsNewLink}
        </a>
      </div>
    </section>
  )
}

function SubsectionCard({ subsection }: { subsection: ChangelogSubsection }) {
  const summary = useMemo(() => {
    const bullets = subsection.body.filter((l) => /^\s*[-*]/.test(l)).slice(0, 3)
    const fallback = subsection.body.filter((l) => l.trim().length > 0).slice(0, 3)
    const lines = bullets.length > 0 ? bullets : fallback
    return lines.map(stripInlineMarkdown).join('\n')
  }, [subsection])
  return (
    <div className="landing-changelog-sub">
      <div className="landing-changelog-sub-title">
        {stripInlineMarkdown(subsection.title)}
      </div>
      <div className="landing-changelog-sub-body">{summary}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------

function ShowcasesPreview({ t }: { t: ReturnType<typeof useI18n>['t'] }) {
  return (
    <section className="landing-block">
      <h2 className="landing-section-title">{t.landing.showcasesTitle}</h2>
      <p className="landing-section-sub">{t.landing.showcasesSub}</p>
      <div className="landing-showcases">
        {SHOWCASE_PREVIEWS.map((s) => (
          <a
            key={s.key}
            className="landing-showcase"
            href={`${SHOWCASES_URL}/src/showcases/${s.key}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="landing-showcase-icon">{s.icon}</span>
            <span className="landing-showcase-title">{s.titleKey}</span>
            <span className="landing-showcase-desc">{showcaseDescFor(s.key)}</span>
          </a>
        ))}
      </div>
      <a
        className="landing-link"
        href={SHOWCASES_URL}
        target="_blank"
        rel="noreferrer noopener"
      >
        {t.landing.showcasesLink}
      </a>
    </section>
  )
}

function showcaseDescFor(key: string): string {
  switch (key) {
    case 'crm':
      return 'Contacts table + drag-and-drop pipeline + activity timeline.'
    case 'dashboard':
      return 'Live KPI grid with mixed charts, service health, activity feed.'
    case 'workflow-editor':
      return 'Visio-like flowchart on top of GraphEngine.'
    case 'analytics':
      return 'Drill-down KPI tables, channels, products and alerts.'
    default:
      return ''
  }
}

// ---------------------------------------------------------------------------

function QuickInstall({ t }: { t: ReturnType<typeof useI18n>['t'] }) {
  return (
    <section className="landing-block">
      <h2 className="landing-section-title">{t.landing.quickInstallTitle}</h2>
      <p className="landing-section-sub">{t.landing.quickInstallSub}</p>
      <div className="landing-install">
        <div className="landing-install-card">
          <div className="landing-install-card-head">
            <h3 className="landing-install-card-title">npm</h3>
            <p className="landing-install-card-sub">{t.landing.quickInstallSub}</p>
          </div>
          <pre className="landing-install-code">
            <code>{`npm install @skygraph/core @skygraph/react @skygraph/styles
# or
pnpm add @skygraph/core @skygraph/react @skygraph/styles`}</code>
          </pre>
        </div>
        <div className="landing-install-card">
          <div className="landing-install-card-head">
            <h3 className="landing-install-card-title">{t.landing.minimalExampleTitle}</h3>
            <p className="landing-install-card-sub">{t.landing.minimalExampleSub}</p>
          </div>
          <pre className="landing-install-code">
            <code>{MINIMAL_EXAMPLE}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------

function extractLatestRound(md: string): ChangelogRound | null {
  const entries = parseChangelog(md)
  for (const entry of entries) {
    if (entry.rounds.length > 0) return entry.rounds[0]
  }
  return null
}

/**
 * Strip the heaviest markdown markers so prose flows nicely inside the
 * landing card without a full markdown renderer:
 *   `**bold**` → `bold`
 *   `` `code` `` → `code`
 *   `[label](url)` → `label`
 *   leading list bullets → · prefix
 */
function stripInlineMarkdown(line: string): string {
  return line
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^\s*[-*]\s+/, '· ')
    .trim()
}

/** Take up to ~3 lines of prose (no bullets) for the card lead. */
function condenseLines(lines: readonly string[]): string {
  const out: string[] = []
  for (const raw of lines) {
    const line = stripInlineMarkdown(raw)
    if (!line) continue
    if (line.startsWith('· ')) continue
    out.push(line)
    if (out.length >= 3) break
  }
  return out.join(' ')
}
