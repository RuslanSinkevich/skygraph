import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { I18nService } from '../../i18n'

const NPM_INSTALL = 'npm install @skygraph/core @skygraph/angular'
const PNPM_INSTALL = 'pnpm add @skygraph/core @skygraph/angular'
const IMPORT_STYLES = "@import '@skygraph/styles/index.css';"

const BOOTSTRAP_EXAMPLE = `import { bootstrapApplication } from '@angular/platform-browser'
import { provideSgConfig, en_US } from '@skygraph/angular'
import { AppComponent } from './app/app.component'

bootstrapApplication(AppComponent, {
  providers: [provideSgConfig({ size: 'middle', locale: en_US })],
})`

const INDIVIDUAL = `import { Component, signal } from '@angular/core'
import { SgButtonComponent, SgInputComponent, SgSwitchComponent } from '@skygraph/angular'

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [SgButtonComponent, SgInputComponent, SgSwitchComponent],
  template: \`
    <span sg-input value="hello"></span>
    <button sg-button type="primary">Click me</button>
    <button sg-switch [value]="checked()"></button>
  \`,
})
export class PageComponent {
  readonly checked = signal(false)
}`

/**
 * Guide → Getting Started — Angular port of
 * `examples/demo-vue/src/guide/GettingStarted.vue` /
 * `examples/demo/src/demos/GettingStartedPage.tsx`. Same `.doc-page`
 * markup so the global stylesheet (styles.css) covers it.
 */
@Component({
  selector: 'sg-getting-started-page',
  standalone: true,
  template: `
    <section class="doc-page">
      <h1>{{ i18n.t().gettingStarted.title }}</h1>
      <p class="doc-lead">{{ i18n.t().gettingStarted.lead }}</p>

      <h2 id="installation">{{ i18n.t().gettingStarted.installation }}</h2>
      <p>{{ i18n.t().gettingStarted.installLeadNpm }}</p>
      <pre class="doc-code"><code>{{ npmInstall }}</code></pre>
      <p>{{ i18n.t().gettingStarted.installLeadPnpm }}</p>
      <pre class="doc-code"><code>{{ pnpmInstall }}</code></pre>

      <h2 id="import-styles">{{ i18n.t().gettingStarted.importStyles }}</h2>
      <p>{{ i18n.t().gettingStarted.importStylesLead }}</p>
      <pre class="doc-code"><code>{{ importStyles }}</code></pre>
      <p>
        {{ i18n.t().gettingStarted.importStylesNote1 }}
        <a href="#/guide/theming" class="doc-link">{{
          i18n.t().gettingStarted.importStylesNote2Theming
        }}</a>
        ).
      </p>

      <h2 id="basic-form">{{ i18n.t().gettingStarted.basicForm }}</h2>
      <p>{{ i18n.t().gettingStarted.basicFormLead }}</p>
      <pre class="doc-code"><code>{{ bootstrapExample }}</code></pre>

      <h2 id="individual-components">{{ i18n.t().gettingStarted.individualComponents }}</h2>
      <p>{{ i18n.t().gettingStarted.individualComponentsLead }}</p>
      <pre class="doc-code"><code>{{ individual }}</code></pre>

      <h2 id="whats-next">{{ i18n.t().gettingStarted.whatsNext }}</h2>
      <div class="doc-card-row">
        <a href="#/guide/theming" class="doc-next-card">
          <strong>{{ i18n.t().gettingStarted.cardThemingTitle }}</strong>
          <span>{{ i18n.t().gettingStarted.cardThemingDesc }}</span>
        </a>
        <a href="#/guide/core-api" class="doc-next-card">
          <strong>{{ i18n.t().gettingStarted.cardCoreApiTitle }}</strong>
          <span>{{ i18n.t().gettingStarted.cardCoreApiDesc }}</span>
        </a>
        <a href="#/components/button" class="doc-next-card">
          <strong>{{ i18n.t().gettingStarted.cardComponentsTitle }}</strong>
          <span>{{ i18n.t().gettingStarted.cardComponentsDesc }}</span>
        </a>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedPageComponent {
  protected readonly i18n = inject(I18nService)
  protected readonly npmInstall = NPM_INSTALL
  protected readonly pnpmInstall = PNPM_INSTALL
  protected readonly importStyles = IMPORT_STYLES
  protected readonly bootstrapExample = BOOTSTRAP_EXAMPLE
  protected readonly individual = INDIVIDUAL
}
