import { GITHUB_URL } from '@skygraph-examples/shared'
import { useI18n } from '../../i18n'
import './about.css'

const ARCHITECTURE_URL = `${GITHUB_URL}/blob/master/ARCHITECTURE.md`
const LICENSE_URL = `${GITHUB_URL}/blob/master/LICENSE`

const VERSION_LABEL = 'v0.5.0'

export function About() {
  const { t } = useI18n()

  return (
    <div className="about">
      <header className="about-header">
        <h1 className="about-title">{t.about.title}</h1>
        <div className="about-meta-row">
          <span className="about-meta">
            <span className="about-meta-label">{t.about.versionLabel}:</span>
            <span className="about-meta-value">{VERSION_LABEL}</span>
          </span>
          <span className="about-meta">
            <span className="about-meta-label">{t.about.licenseLabel}:</span>
            <a
              href={LICENSE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="about-meta-link"
            >
              {t.about.licenseValue}
            </a>
          </span>
          <a
            className="about-meta-link"
            href={ARCHITECTURE_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            {t.about.architectureLink}
          </a>
        </div>
      </header>

      <section className="about-lead">
        <p>{t.about.lead1}</p>
        <p>{t.about.lead2}</p>
        <p>{t.about.lead3}</p>
      </section>

      <section>
        <h2 className="about-section-title">{t.about.skyPlatformTitle}</h2>
        <p className="about-section-sub">{t.about.skyPlatformLead}</p>
        <div className="about-platform">
          <article className="about-platform-card">
            <div className="about-platform-card-title">
              <span className="about-platform-card-mark" aria-hidden="true" />
              <a
                href="https://gitbor.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-platform-card-link"
              >
                {t.about.gitborTitle}
              </a>
            </div>
            <div className="about-platform-card-desc">{t.about.gitborDesc}</div>
            <div className="about-platform-card-tag">Git client</div>
          </article>
          <article className="about-platform-card about-platform-card--current">
            <div className="about-platform-card-title">
              <span className="about-platform-card-mark" aria-hidden="true" />
              {t.about.skygraphTitle}
            </div>
            <div className="about-platform-card-desc">{t.about.skygraphDesc}</div>
            <div className="about-platform-card-tag">UI library — you are here</div>
          </article>
          <article className="about-platform-card">
            <div className="about-platform-card-title">
              <span className="about-platform-card-mark" aria-hidden="true" />
              <a
                href="https://skycode-ai.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-platform-card-link"
              >
                {t.about.skycodeTitle}
              </a>
            </div>
            <div className="about-platform-card-desc">{t.about.skycodeDesc}</div>
            <div className="about-platform-card-tag">IDE</div>
          </article>
        </div>
      </section>

      <section className="about-mf">
        <h2 className="about-section-title">{t.about.multiFrameworkTitle}</h2>
        <p className="about-section-sub">{t.about.multiFrameworkLead}</p>
        <ul>
          <li>{t.about.multiFrameworkReact}</li>
          <li>{t.about.multiFrameworkVue}</li>
        </ul>
      </section>
    </div>
  )
}
