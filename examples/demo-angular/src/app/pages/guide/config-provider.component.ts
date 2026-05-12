import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { I18nService } from '../../i18n'

const PROVIDE_BASIC = `import { bootstrapApplication } from '@angular/platform-browser'
import { provideSgConfig, ru_RU } from '@skygraph/angular'
import { AppComponent } from './app/app.component'

bootstrapApplication(AppComponent, {
  providers: [
    provideSgConfig({
      size: 'large',
      direction: 'ltr',
      locale: ru_RU,
    }),
  ],
})`

const RUNTIME_UPDATE = `import { Component, inject } from '@angular/core'
import { SgConfigService, en_US, ru_RU } from '@skygraph/angular'

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  template: \`
    <button (click)="setEnglish()">EN</button>
    <button (click)="setRussian()">RU</button>
  \`,
})
export class LanguageToggleComponent {
  private readonly config = inject(SgConfigService)

  setEnglish(): void {
    this.config.update({ locale: en_US })
  }
  setRussian(): void {
    this.config.update({ locale: ru_RU })
  }
}`

const READ_CONFIG = `import { Component, inject } from '@angular/core'
import { SgConfigService } from '@skygraph/angular'

@Component({
  selector: 'app-status',
  standalone: true,
  template: \`
    <p>Size: {{ config.config().size }}</p>
    <p>Locale: {{ config.config().locale?.locale }}</p>
  \`,
})
export class StatusComponent {
  protected readonly config = inject(SgConfigService)
}`

const WRAPPER_COMPONENT = `<sg-config-provider [config]="{ size: 'small' }">
  <button sg-button type="primary">small</button>
  <span sg-input value="hello"></span>
</sg-config-provider>`

/**
 * Guide → ConfigProvider — Angular port of `examples/demo-vue/src/guide/ConfigProviderGuide.vue`,
 * adapted for Angular DI: in Angular, ConfigProvider is a service +
 * provider (`provideSgConfig` / `SgConfigService`), not a wrapper
 * component (though the wrapper exists for tests/demos).
 */
@Component({
  selector: 'sg-config-provider-page',
  standalone: true,
  template: `
    <section class="doc-page">
      <h1>{{ i18n.t().configProvider.title }}</h1>
      <p class="doc-lead">{{ i18n.t().configProvider.lead }}</p>

      <h2 id="basic">{{ i18n.t().configProvider.sectionBasic }}</h2>
      <p>{{ i18n.t().configProvider.sectionBasicLead }}</p>
      <pre class="doc-code"><code>{{ provideBasic }}</code></pre>

      <h2 id="runtime">{{ i18n.t().configProvider.sectionRuntime }}</h2>
      <p>{{ i18n.t().configProvider.sectionRuntimeLead }}</p>
      <pre class="doc-code"><code>{{ runtimeUpdate }}</code></pre>

      <h2 id="reading">{{ i18n.t().configProvider.sectionRead }}</h2>
      <p>{{ i18n.t().configProvider.sectionReadLead }}</p>
      <pre class="doc-code"><code>{{ readConfig }}</code></pre>

      <h2 id="wrapper">{{ i18n.t().configProvider.sectionWrapper }}</h2>
      <p>{{ i18n.t().configProvider.sectionWrapperLead }}</p>
      <pre class="doc-code"><code>{{ wrapper }}</code></pre>
      <p class="doc-notes">{{ i18n.t().configProvider.wrapperNote }}</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigProviderPageComponent {
  protected readonly i18n = inject(I18nService)
  protected readonly provideBasic = PROVIDE_BASIC
  protected readonly runtimeUpdate = RUNTIME_UPDATE
  protected readonly readConfig = READ_CONFIG
  protected readonly wrapper = WRAPPER_COMPONENT
}
