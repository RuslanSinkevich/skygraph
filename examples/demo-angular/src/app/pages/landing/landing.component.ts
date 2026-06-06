import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { Router } from '@angular/router'
import { I18nService } from '../../i18n'
import { LANDING_STYLES } from './landing.styles'

const TEST_COUNT = 1013
const ENGINE_COUNT = 6
const STANDALONE_COUNT = 51
const GITHUB_URL = 'https://github.com/RuslanSinkevich/skygraph-public'

const INSTALL_SNIPPET = `npm install @skygraph/core @skygraph/angular @skygraph/styles
# or
pnpm add @skygraph/core @skygraph/angular @skygraph/styles`

const MINIMAL_EXAMPLE = `import { bootstrapApplication } from '@angular/platform-browser'
import { provideSgConfig } from '@skygraph/angular'
import { AppComponent } from './app/app.component'
import '@skygraph/styles'

bootstrapApplication(AppComponent, {
  providers: [provideSgConfig({ size: 'middle' })],
})`

interface Feature {
  title: string
  desc: string
  href: string
}

/**
 * Landing — Angular port of `examples/demo/src/pages/Landing/Landing.tsx`.
 * Same `landing-*` class names, same DOM layout (Hero + 5 stats + 6
 * features + QuickInstall). The React-only WhatsNew + ShowcasesPreview
 * sections are intentionally omitted (per Wave 5.3 scope).
 */
@Component({
  selector: 'sg-landing-page',
  standalone: true,
  template: `
    <div class="landing">
      <section class="landing-hero" data-section="hero">
        <h1>SkyGraph</h1>
        <p class="landing-hero-tagline">{{ i18n.t().app.tagline }}</p>
        <p class="landing-hero-sub">{{ i18n.t().app.heroSub }}</p>
        <div class="landing-cta">
          <button type="button" class="landing-cta-primary" (click)="browse()">
            {{ i18n.t().landing.ctaPrimary }} →
          </button>
          <a
            class="landing-cta-secondary"
            [href]="githubUrl"
            target="_blank"
            rel="noreferrer noopener"
          >
            {{ i18n.t().landing.ctaSecondary }}
          </a>
        </div>
        <div class="landing-hero-install">
          <span class="landing-hero-install-prompt">$</span>
          {{ i18n.t().landing.heroInstall }}
        </div>
      </section>

      <div class="landing-stats" role="list" aria-label="Project stats">
        <div class="landing-stat" role="listitem">
          <div class="landing-stat-value">{{ i18n.t().landing.statComponentsValue }}</div>
          <div class="landing-stat-label">{{ i18n.t().landing.statComponents }}</div>
        </div>
        <div class="landing-stat" role="listitem">
          <div class="landing-stat-value">{{ testCount }}</div>
          <div class="landing-stat-label">{{ i18n.t().landing.statTests }}</div>
        </div>
        <div class="landing-stat" role="listitem">
          <div class="landing-stat-value">{{ engineCount }}</div>
          <div class="landing-stat-label">{{ i18n.t().landing.statEngines }}</div>
        </div>
        <div class="landing-stat" role="listitem">
          <div class="landing-stat-value">{{ standaloneCount }}</div>
          <div class="landing-stat-label">{{ i18n.t().landing.statComposables }}</div>
        </div>
        <div class="landing-stat" role="listitem">
          <div class="landing-stat-value">{{ i18n.t().landing.statRuntimeCssValue }}</div>
          <div class="landing-stat-label">{{ i18n.t().landing.statRuntimeCss }}</div>
        </div>
      </div>

      <div class="landing-features">
        @for (f of features(); track f.title) {
          <button type="button" class="landing-feature" (click)="goto(f.href)">
            <span class="landing-feature-title">{{ f.title }}</span>
            <span class="landing-feature-desc">{{ f.desc }}</span>
          </button>
        }
      </div>

      <section class="landing-block">
        <h2 class="landing-section-title">{{ i18n.t().landing.quickInstallTitle }}</h2>
        <p class="landing-section-sub">{{ i18n.t().landing.quickInstallDesc }}</p>
        <div class="landing-install">
          <div class="landing-install-card">
            <div class="landing-install-card-head">
              <div>
                <h3 class="landing-install-card-title">
                  {{ i18n.t().landing.quickInstallNpmTitle }}
                </h3>
                <p class="landing-install-card-sub">{{ i18n.t().landing.quickInstallSub }}</p>
              </div>
              <button type="button" class="landing-install-copy" (click)="copyInstall()">
                <span aria-hidden="true">{{ installCopied() ? '✓' : '⎘' }}</span>
                <span>{{
                  installCopied()
                    ? i18n.t().landing.quickInstallCopied
                    : i18n.t().landing.quickInstallCopy
                }}</span>
              </button>
            </div>
            <pre class="landing-install-code"><code>{{ installSnippet }}</code></pre>
          </div>
          <div class="landing-install-card">
            <div class="landing-install-card-head">
              <div>
                <h3 class="landing-install-card-title">
                  {{ i18n.t().landing.quickInstallMinimalTitle }}
                </h3>
                <p class="landing-install-card-sub">
                  {{ i18n.t().landing.quickInstallMinimalSub }}
                </p>
              </div>
            </div>
            <pre class="landing-install-code"><code>{{ minimalExample }}</code></pre>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [LANDING_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  protected readonly i18n = inject(I18nService)
  private readonly router = inject(Router)

  protected readonly testCount = TEST_COUNT
  protected readonly engineCount = ENGINE_COUNT
  protected readonly standaloneCount = STANDALONE_COUNT
  protected readonly githubUrl = GITHUB_URL
  protected readonly installSnippet = INSTALL_SNIPPET
  protected readonly minimalExample = MINIMAL_EXAMPLE

  protected readonly installCopied = signal(false)

  protected features(): Feature[] {
    const t = this.i18n.t()
    return [
      {
        title: t.landing.featureReactiveTitle,
        desc: t.landing.featureReactiveDesc,
        href: '/guide/core-api',
      },
      {
        title: t.landing.featureEnginesTitle,
        desc: t.landing.featureEnginesDesc,
        href: '/guide/core-api',
      },
      {
        title: t.landing.featureStandaloneTitle,
        desc: t.landing.featureStandaloneDesc,
        href: '/guide/getting-started',
      },
      {
        title: t.landing.featureA11yTitle,
        desc: t.landing.featureA11yDesc,
        href: '/components/button',
      },
      {
        title: t.landing.featureZeroRuntimeTitle,
        desc: t.landing.featureZeroRuntimeDesc,
        href: '/guide/theming',
      },
      {
        title: t.landing.featureMultiTitle,
        desc: t.landing.featureMultiDesc,
        href: '/about',
      },
    ]
  }

  protected browse(): void {
    void this.router.navigate(['/components/button'])
  }

  protected goto(href: string): void {
    void this.router.navigateByUrl(href)
  }

  async copyInstall(): Promise<void> {
    try {
      await navigator.clipboard.writeText(INSTALL_SNIPPET)
      this.installCopied.set(true)
      setTimeout(() => this.installCopied.set(false), 1600)
    } catch {
      // ignore — older browsers / insecure contexts
    }
  }
}
