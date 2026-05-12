import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { Router } from '@angular/router'
import { I18nService } from '../../i18n'
import { LANDING_STYLES } from './landing.styles'

const COMPONENT_COUNT = 78
const TEST_COUNT = 1013
const ENGINE_COUNT = 6
const STANDALONE_COUNT = 51
const GITHUB_URL = 'https://github.com/RuslanSinkevich/skygraph'

const INSTALL_SNIPPET = `pnpm add @skygraph/angular @skygraph/styles
# or
npm install @skygraph/angular @skygraph/styles`

const MINIMAL_EXAMPLE = `import { bootstrapApplication } from '@angular/platform-browser'
import { provideSgConfig } from '@skygraph/angular'
import { AppComponent } from './app/app.component'
import '@skygraph/styles'

bootstrapApplication(AppComponent, {
  providers: [provideSgConfig({ size: 'middle' })],
})`

/**
 * Landing — Angular port of `examples/demo-vue/src/pages/Landing.vue`
 * (which itself trims the React-side Landing to the slice supported
 * outside React: Hero + Stats + Features + QuickInstall, no
 * WhatsNew / ShowcasesPreview).
 */
@Component({
  selector: 'sg-landing-page',
  standalone: true,
  template: `
    <div class="dv-landing">
      <section class="dv-landing-hero">
        <h1>{{ i18n.t().landing.title }}</h1>
        <p class="dv-landing-tagline">{{ i18n.t().app.tagline }}</p>
        <p class="dv-landing-sub">{{ i18n.t().app.heroSub }}</p>
        <div class="dv-landing-cta">
          <button type="button" class="dv-landing-cta-primary" (click)="browse()">
            {{ i18n.t().landing.ctaPrimary }} →
          </button>
          <a
            class="dv-landing-cta-secondary"
            [href]="githubUrl"
            target="_blank"
            rel="noreferrer noopener"
          >
            {{ i18n.t().landing.ctaSecondary }}
          </a>
        </div>
      </section>

      <section class="dv-landing-stats" role="list" aria-label="Project stats">
        <div class="dv-landing-stat" role="listitem">
          <span class="dv-landing-stat-num">{{ componentCount }}+</span>
          <span class="dv-landing-stat-label">{{ i18n.t().landing.statComponents }}</span>
        </div>
        <div class="dv-landing-stat" role="listitem">
          <span class="dv-landing-stat-num">{{ standaloneCount }}</span>
          <span class="dv-landing-stat-label">{{ i18n.t().landing.statComposables }}</span>
        </div>
        <div class="dv-landing-stat" role="listitem">
          <span class="dv-landing-stat-num">{{ engineCount }}</span>
          <span class="dv-landing-stat-label">{{ i18n.t().landing.statEngines }}</span>
        </div>
        <div class="dv-landing-stat" role="listitem">
          <span class="dv-landing-stat-num">{{ testCount }}+</span>
          <span class="dv-landing-stat-label">{{ i18n.t().landing.statTests }}</span>
        </div>
      </section>

      <section class="dv-landing-features">
        <article class="dv-landing-feature">
          <h3>{{ i18n.t().landing.featureReactiveTitle }}</h3>
          <p>{{ i18n.t().landing.featureReactiveDesc }}</p>
        </article>
        <article class="dv-landing-feature">
          <h3>{{ i18n.t().landing.featureZeroRuntimeTitle }}</h3>
          <p>{{ i18n.t().landing.featureZeroRuntimeDesc }}</p>
        </article>
        <article class="dv-landing-feature">
          <h3>{{ i18n.t().landing.featureA11yTitle }}</h3>
          <p>{{ i18n.t().landing.featureA11yDesc }}</p>
        </article>
        <article class="dv-landing-feature">
          <h3>{{ i18n.t().landing.featureMultiTitle }}</h3>
          <p>{{ i18n.t().landing.featureMultiDesc }}</p>
        </article>
      </section>

      <section class="dv-landing-install">
        <h2 class="dv-landing-section-title">{{ i18n.t().landing.quickInstallTitle }}</h2>
        <p class="dv-landing-section-sub">{{ i18n.t().landing.quickInstallDesc }}</p>
        <div class="dv-landing-install-grid">
          <div class="dv-landing-install-card">
            <div class="dv-landing-install-card-head">
              <h3 class="dv-landing-install-card-title">pnpm</h3>
              <button type="button" class="dv-landing-install-copy" (click)="copyInstall()">
                <span aria-hidden="true">{{ installCopied() ? '✓' : '⎘' }}</span>
                <span>
                  {{
                    installCopied()
                      ? i18n.t().landing.quickInstallCopied
                      : i18n.t().landing.quickInstallCopy
                  }}
                </span>
              </button>
            </div>
            <pre class="dv-landing-install-code"><code>{{ installSnippet }}</code></pre>
          </div>
          <div class="dv-landing-install-card">
            <div class="dv-landing-install-card-head">
              <h3 class="dv-landing-install-card-title">main.ts</h3>
            </div>
            <pre class="dv-landing-install-code"><code>{{ minimalExample }}</code></pre>
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

  protected readonly componentCount = COMPONENT_COUNT
  protected readonly testCount = TEST_COUNT
  protected readonly engineCount = ENGINE_COUNT
  protected readonly standaloneCount = STANDALONE_COUNT
  protected readonly githubUrl = GITHUB_URL
  protected readonly installSnippet = INSTALL_SNIPPET
  protected readonly minimalExample = MINIMAL_EXAMPLE

  protected readonly installCopied = signal(false)

  browse(): void {
    void this.router.navigate(['/components/button'])
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
