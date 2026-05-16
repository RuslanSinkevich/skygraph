import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { I18nService } from '../../i18n'
import { ABOUT_STYLES } from './about.styles'

const GITHUB_URL = 'https://github.com/RuslanSinkevich/skygraph'
const ARCHITECTURE_URL = `${GITHUB_URL}/blob/master/ARCHITECTURE.md`
const LICENSE_URL = `${GITHUB_URL}/blob/master/LICENSE`
const VERSION_LABEL = 'v0.5.0'

/**
 * About — Angular port of `examples/demo/src/pages/About/About.tsx` /
 * `examples/demo-vue/src/pages/About.vue`. Pure i18n + static layout;
 * no interactive elements (all hrefs are external GitHub links).
 */
@Component({
  selector: 'sg-about-page',
  standalone: true,
  template: `
    <div class="about">
      <header class="about-header">
        <h1 class="about-title">{{ i18n.t().about.title }}</h1>
        <div class="about-meta-row">
          <span class="about-meta">
            <span class="about-meta-label">{{ i18n.t().about.versionLabel }}:</span>
            <span class="about-meta-value">{{ versionLabel }}</span>
          </span>
          <span class="about-meta">
            <span class="about-meta-label">{{ i18n.t().about.licenseLabel }}:</span>
            <a
              [href]="licenseUrl"
              target="_blank"
              rel="noreferrer noopener"
              class="about-meta-link"
            >
              {{ i18n.t().about.licenseValue }}
            </a>
          </span>
          <a
            class="about-meta-link"
            [href]="architectureUrl"
            target="_blank"
            rel="noreferrer noopener"
          >
            {{ i18n.t().about.architectureLink }}
          </a>
        </div>
      </header>

      <section class="about-lead">
        <p>{{ i18n.t().about.lead1 }}</p>
        <p>{{ i18n.t().about.lead2 }}</p>
        <p>{{ i18n.t().about.lead3 }}</p>
      </section>

      <section>
        <h2 class="about-section-title">{{ i18n.t().about.skyPlatformTitle }}</h2>
        <p class="about-section-sub">{{ i18n.t().about.skyPlatformLead }}</p>
        <div class="about-platform">
          <article class="about-platform-card">
            <div class="about-platform-card-title">
              <span class="about-platform-card-mark" aria-hidden="true"></span>
              <a
                href="https://gitbor.ru/"
                target="_blank"
                rel="noopener noreferrer"
                class="about-platform-card-link"
              >
                {{ i18n.t().about.gitborTitle }}
              </a>
            </div>
            <div class="about-platform-card-desc">{{ i18n.t().about.gitborDesc }}</div>
            <div class="about-platform-card-tag">Git client</div>
          </article>
          <article class="about-platform-card about-platform-card--current">
            <div class="about-platform-card-title">
              <span class="about-platform-card-mark" aria-hidden="true"></span>
              {{ i18n.t().about.skygraphTitle }}
            </div>
            <div class="about-platform-card-desc">{{ i18n.t().about.skygraphDesc }}</div>
            <div class="about-platform-card-tag">UI library — you are here</div>
          </article>
          <article class="about-platform-card">
            <div class="about-platform-card-title">
              <span class="about-platform-card-mark" aria-hidden="true"></span>
              <a
                href="https://github.com/RuslanSinkevich/skycode"
                target="_blank"
                rel="noopener noreferrer"
                class="about-platform-card-link"
              >
                {{ i18n.t().about.skycodeTitle }}
              </a>
            </div>
            <div class="about-platform-card-desc">{{ i18n.t().about.skycodeDesc }}</div>
            <div class="about-platform-card-tag">IDE</div>
          </article>
        </div>
      </section>

      <section class="about-mf">
        <h2 class="about-section-title">{{ i18n.t().about.multiFrameworkTitle }}</h2>
        <p class="about-section-sub">{{ i18n.t().about.multiFrameworkLead }}</p>
        <ul>
          <li>{{ i18n.t().about.multiFrameworkReact }}</li>
          <li>{{ i18n.t().about.multiFrameworkVue }}</li>
        </ul>
      </section>
    </div>
  `,
  styles: [ABOUT_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  protected readonly i18n = inject(I18nService)
  protected readonly versionLabel = VERSION_LABEL
  protected readonly licenseUrl = LICENSE_URL
  protected readonly architectureUrl = ARCHITECTURE_URL
}
