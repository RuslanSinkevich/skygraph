import { GITHUB_URL } from '@skygraph-examples/shared'
import { useI18n } from '../../i18n'
import { ImagePlaceholder } from './ImagePlaceholder'
import './landing.css'

interface LandingProps {
  onNavigate: (key: string) => void
}

const INSTALL_COMMAND = 'npm install @skygraph/core @skygraph/react @skygraph/styles'

const SHOWCASES: ReadonlyArray<{
  key: string
  titleKey:
    | 'showcaseCrmTitle'
    | 'showcaseDashboardTitle'
    | 'showcaseWorkflowTitle'
    | 'showcaseTableTitle'
  descKey:
    | 'showcaseCrmDesc'
    | 'showcaseDashboardDesc'
    | 'showcaseWorkflowDesc'
    | 'showcaseTableDesc'
  image: string
  imageDesc: string
}> = [
  {
    key: 'crm',
    titleKey: 'showcaseCrmTitle',
    descKey: 'showcaseCrmDesc',
    image: 'crm.png',
    imageDesc:
      'CRM showcase: contacts table on the left, deals pipeline board on the right, activity timeline at the bottom. Light theme.',
  },
  {
    key: 'dashboard',
    titleKey: 'showcaseDashboardTitle',
    descKey: 'showcaseDashboardDesc',
    image: 'dashboard.png',
    imageDesc:
      'Operations dashboard: 4 KPI cards on top, mixed line/bar chart in the middle, breakdown table at the bottom. Dark theme.',
  },
  {
    key: 'workflow-editor',
    titleKey: 'showcaseWorkflowTitle',
    descKey: 'showcaseWorkflowDesc',
    image: 'workflow.png',
    imageDesc:
      'Workflow editor: orthogonal flowchart with start/end blocks and a couple of decision diamonds, inspector panel on the right. Light theme.',
  },
  {
    key: 'table-kitchen-sink',
    titleKey: 'showcaseTableTitle',
    descKey: 'showcaseTableDesc',
    image: 'table.png',
    imageDesc:
      'Kitchen-sink table: filter chips above, virtual-scroll grid with grouped rows, totals row at the bottom. Light theme.',
  },
]

export function Landing({ onNavigate }: LandingProps) {
  const { t } = useI18n()

  return (
    <div className="landing">
      <Hero onNavigate={onNavigate} />
      <Highlights />
      <Showcases onNavigate={onNavigate} />
      <Spots />
      <Install onNavigate={onNavigate} />
      <FooterCta onNavigate={onNavigate} />
      <noscript>{t.landing.heroSub}</noscript>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────

function Hero({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { t } = useI18n()
  return (
    <section className="landing-hero">
      <div className="landing-hero-text">
        <h1>{t.landing.heroTitle}</h1>
        <p className="landing-hero-sub">{t.landing.heroSub}</p>
        <div className="landing-cta">
          <button
            type="button"
            className="landing-cta-primary"
            onClick={() => onNavigate('showcases')}
          >
            {t.landing.ctaPrimary} →
          </button>
          <button
            type="button"
            className="landing-cta-secondary"
            onClick={() => onNavigate('components/button')}
          >
            {t.landing.ctaSecondary}
          </button>
        </div>
      </div>
      {/* PLACEHOLDER
          File: examples/demo/public/landing/hero.png
          Size: 1280×960 (4:3), 2x retina recommended
          Content: hero shot — composite screenshot of the SkyGraph CRM
                   showcase in light theme: sidebar + contacts table +
                   filters on the right.
      */}
      <ImagePlaceholder variant="hero" name="hero.png" description={t.landing.heroImageAlt} />
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
            {/* PLACEHOLDER
                File: examples/demo/public/landing/<image>
                Size: 1280×720 (16:9), 2x retina
                Content: see imageDesc above. Cropped tightly so the UI
                         fills the frame; no browser chrome.
            */}
            <ImagePlaceholder variant="showcase" name={s.image} description={s.imageDesc} />
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

function Spots() {
  const { t } = useI18n()
  const spots = [
    {
      title: t.landing.spotThemingTitle,
      desc: t.landing.spotThemingDesc,
      image: 'spot-theming.png',
      imageDesc:
        'Side-by-side: same dashboard in light theme on the left and dark theme on the right; theme toggle highlighted between them.',
      reverse: false,
    },
    {
      title: t.landing.spotChartsTitle,
      desc: t.landing.spotChartsDesc,
      image: 'spot-charts.png',
      imageDesc:
        'Composite of two visuals: a responsive area chart with crosshair and tooltip + a small flowchart fragment with a hover toolbar.',
      reverse: true,
    },
    {
      title: t.landing.spotFormsTitle,
      desc: t.landing.spotFormsDesc,
      image: 'spot-forms.png',
      imageDesc:
        'Profile form: required-field hint shown next to an input, dependent country/city fields, validation error inline.',
      reverse: false,
    },
  ]
  return (
    <section>
      <h2 className="landing-section-title">{t.landing.spotsTitle}</h2>
      <div className="landing-spots">
        {spots.map((spot) => (
          <div
            key={spot.title}
            className={`landing-spot${spot.reverse ? ' landing-spot--reverse' : ''}`}
          >
            <div className="landing-spot-text">
              <h3 className="landing-spot-title">{spot.title}</h3>
              <p className="landing-spot-desc">{spot.desc}</p>
            </div>
            {/* PLACEHOLDER
                File: examples/demo/public/landing/<image>
                Size: 1280×960 (4:3), 2x retina
                Content: see imageDesc above. Plain background, no
                         browser chrome, focus on the relevant UI piece.
            */}
            <ImagePlaceholder variant="spot" name={spot.image} description={spot.imageDesc} />
          </div>
        ))}
      </div>
    </section>
  )
}

// ───────────────────────────────────────────────────────────────────────

function Install({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { t } = useI18n()
  return (
    <section className="landing-install">
      <h2 className="landing-install-title">{t.landing.installTitle}</h2>
      <p className="landing-install-lead">{t.landing.installLead}</p>
      <pre className="landing-install-code">
        <code>{INSTALL_COMMAND}</code>
      </pre>
      <a
        className="landing-install-link"
        href="#/guide/getting-started"
        onClick={(ev) => {
          ev.preventDefault()
          onNavigate('guide/getting-started')
        }}
      >
        {t.landing.installLearnMore}
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
