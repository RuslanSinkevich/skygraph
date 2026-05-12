import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { I18nService } from '../../i18n'

const DARK_TOGGLE_DOM = "document.documentElement.setAttribute('data-sg-theme', 'dark')"

const DARK_ANGULAR_EXAMPLE = `// HTML approach
<html data-sg-theme="dark">
  ...
</html>

// Angular toggle (signal-based)
import { Component, effect, signal, inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { SgSwitchComponent } from '@skygraph/angular'

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [SgSwitchComponent],
  template: \`<button sg-switch [value]="dark()" (change)="dark.set($event)"></button>\`,
})
export class ThemeToggleComponent {
  readonly dark = signal(false)
  private readonly doc = inject(DOCUMENT)
  constructor() {
    effect(() => {
      this.doc.documentElement.setAttribute(
        'data-sg-theme',
        this.dark() ? 'dark' : 'light',
      )
    })
  }
}`

const CUSTOM_THEME_CSS = `:root {
  --sg-color-primary: #7c3aed;
  --sg-color-primary-hover: #6d28d9;
  --sg-color-primary-active: #5b21b6;
  --sg-color-primary-bg: rgba(124, 58, 237, 0.08);
}`

const COMPONENT_TOKENS_CSS = `/* Make buttons taller with rounded corners */
:root {
  --sg-btn-height: 40px;
  --sg-btn-border-radius: 20px;
  --sg-btn-font-size: 15px;
}

/* Larger inputs */
:root {
  --sg-input-height: 42px;
  --sg-input-radius: 8px;
}`

const HEADLESS_EXAMPLE = `<button sg-button [unstyled]="true" class="my-btn">
  Custom styled
</button>

<div sg-select [unstyled]="true" class="my-select" [options]="opts"></div>`

/**
 * Guide → Theming — Angular port of `examples/demo-vue/src/guide/Theming.vue`.
 */
@Component({
  selector: 'sg-theming-page',
  standalone: true,
  template: `
    <section class="doc-page">
      <h1>{{ i18n.t().theming.title }}</h1>
      <p class="doc-lead">{{ i18n.t().theming.lead }}</p>

      <h2 id="three-layers">{{ i18n.t().theming.threeLayersHeading }}</h2>
      <table class="doc-table">
        <thead>
          <tr>
            <th>{{ i18n.t().theming.colLayer }}</th>
            <th>{{ i18n.t().theming.colPrefix }}</th>
            <th>{{ i18n.t().theming.colPurpose }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>{{ i18n.t().theming.layerPalette }}</strong>
            </td>
            <td><code>--sg-palette-*</code></td>
            <td>{{ i18n.t().theming.layerPalettePurpose }}</td>
          </tr>
          <tr>
            <td>
              <strong>{{ i18n.t().theming.layerSemantic }}</strong>
            </td>
            <td><code>--sg-color-*</code></td>
            <td>{{ i18n.t().theming.layerSemanticPurpose }}</td>
          </tr>
          <tr>
            <td>
              <strong>{{ i18n.t().theming.layerComponent }}</strong>
            </td>
            <td><code>--sg-btn-*, --sg-input-*</code></td>
            <td>{{ i18n.t().theming.layerComponentPurpose }}</td>
          </tr>
        </tbody>
      </table>
      <p>{{ i18n.t().theming.layersFooter }}</p>

      <h2 id="dark-mode">{{ i18n.t().theming.darkModeHeading }}</h2>
      <p>{{ i18n.t().theming.darkModeLead }}</p>
      <pre class="doc-code"><code>{{ darkToggleDom }}</code></pre>
      <p>{{ i18n.t().theming.darkModeNote }}</p>
      <pre class="doc-code"><code>{{ darkAngularExample }}</code></pre>

      <h2 id="custom-theme">{{ i18n.t().theming.customThemeHeading }}</h2>
      <p>{{ i18n.t().theming.customThemeLead }}</p>
      <pre class="doc-code"><code>{{ customThemeCss }}</code></pre>
      <p>{{ i18n.t().theming.customThemeFooter }}</p>

      <h2 id="component-tokens">{{ i18n.t().theming.perComponentHeading }}</h2>
      <p>{{ i18n.t().theming.perComponentLead }}</p>
      <pre class="doc-code"><code>{{ componentTokensCss }}</code></pre>

      <h2 id="headless">{{ i18n.t().theming.headlessHeading }}</h2>
      <p>{{ i18n.t().theming.headlessLead }}</p>
      <pre class="doc-code"><code>{{ headlessExample }}</code></pre>
      <p>{{ i18n.t().theming.headlessFooter }}</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemingPageComponent {
  protected readonly i18n = inject(I18nService)
  protected readonly darkToggleDom = DARK_TOGGLE_DOM
  protected readonly darkAngularExample = DARK_ANGULAR_EXAMPLE
  protected readonly customThemeCss = CUSTOM_THEME_CSS
  protected readonly componentTokensCss = COMPONENT_TOKENS_CSS
  protected readonly headlessExample = HEADLESS_EXAMPLE
}
