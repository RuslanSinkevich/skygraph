import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgSpinComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<span sg-spin></span>`

const SIZES_SOURCE = `<span sg-spin size="small"></span>
<span sg-spin></span>
<span sg-spin size="large"></span>`

const TIP_SOURCE = `<span sg-spin tip="Loading..."></span>`

const DELAY_SOURCE = `<!-- delay input is accepted for API parity (no-op in Wave 4.1). -->
<span sg-spin [spinning]="loading()" tip="Will appear after a delay"></span>`

const COLOR_SOURCE = `<style>
  .branded { --sg-spin-color: var(--sg-color-success); }
</style>
<span class="branded" sg-spin></span>`

const FULLSCREEN_SOURCE = `<!-- Button toggles a fullscreen overlay. -->
<button sg-button (click)="overlay.set(!overlay())">Toggle fullscreen</button>
@if (overlay()) {
  <div sg-spin [fullscreen]="true" tip="Loading..."></div>
}`

const TOKENS_SOURCE = `<style>
  .danger-scope {
    --sg-spin-color: var(--sg-color-error);
    --sg-spin-overlay-bg: rgba(255, 0, 0, 0.12);
  }
</style>
<span class="danger-scope" sg-spin></span>`

const UNSTYLED_SOURCE = `<span sg-spin [unstyled]="true" className="my-custom-loader"></span>`

const SPIN_PROPS: PropDef[] = [
  {
    name: 'spinning',
    description: 'Whether the loading state is shown.',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'size',
    description: 'Component size variant.',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'delay',
    description: 'Show the spinner only if loading takes longer than N ms (Wave 4.1: API-only).',
    type: 'number',
  },
  {
    name: 'tip',
    description: 'Optional text below the indicator (standalone / fullscreen modes).',
    type: 'string',
  },
  {
    name: 'fullscreen',
    description: 'Covers the viewport instead of inline.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: 'Drops the .sg-spin-* classes — bring your own CSS.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'className',
    description: 'Extra class names on the indicator element.',
    type: 'string',
  },
]

const SPIN_CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-spin-color',
    default: 'var(--sg-color-primary)',
    description: 'Indicator color.',
  },
  {
    name: 'sg-spin-overlay-bg',
    default: 'rgba(255, 255, 255, 0.65)',
    description: 'Fullscreen overlay background.',
  },
  {
    name: 'sg-color-primary',
    default: '#1677ff',
    description: 'Primary palette — default indicator color.',
  },
  {
    name: 'sg-font-size-sm',
    default: '12px',
    description: 'Tip font size.',
  },
  {
    name: 'sg-margin-sm',
    default: '8px',
    description: 'Tip → indicator spacing.',
  },
  {
    name: 'sg-border-radius',
    default: '6px',
    description: 'Reserved (kept for parity).',
  },
  {
    name: 'sg-z-loading',
    default: '900',
    description: 'Fullscreen overlay z-index.',
  },
  {
    name: 'sg-z-modal',
    default: '1000',
    description: 'Modal z-index (kept above the spinner).',
  },
]

@Component({
  selector: 'sg-spin-page',
  standalone: true,
  imports: [
    SgSpinComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Spin"
      description="Inline / fullscreen loading indicator. Same DOM contract as the React adapter — drop a 'sg-spin' attribute on any span or div."
      [crumbs]="['General', 'Spin']"
      [whenToUse]="[
        'For inline loading state — replace a value with a spinner while it loads.',
        'For full-page loading — set fullscreen and the spinner covers the viewport.',
        'For loading with a label — pair with tip to describe what is loading.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="The default inline spinner. Inherits 'size' from provideSgConfig() when not set."
        [code]="basicSource"
      >
        <span sg-spin></span>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes. Use 'small' inside buttons and lists, 'large' for full-page loading."
        [code]="sizesSource"
      >
        <span sg-spin size="small"></span>
        <span sg-spin></span>
        <span sg-spin size="large"></span>
      </sg-demo-box>

      <sg-demo-box
        title="Tip"
        description="Adds a text label below the indicator (standalone / fullscreen modes)."
        [code]="tipSource"
      >
        <span sg-spin tip="Loading..."></span>
      </sg-demo-box>

      <sg-demo-box
        title="Delay (API parity)"
        description="The 'delay' input is accepted for cross-framework parity. Wave 4.1 ships it as a no-op — see finding F2."
        [code]="delaySource"
      >
        <span sg-spin [delay]="300" tip="Spinner shows on mount"></span>
      </sg-demo-box>

      <sg-demo-box
        title="Custom color"
        description="Override --sg-spin-color in a scoped class to recolor the spinner without forking."
        [code]="colorSource"
      >
        <span class="ng-spin-success" sg-spin></span>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Multiple tokens can be overridden in the same scope — color and overlay color move together."
        [code]="tokensSource"
      >
        <span class="ng-spin-danger" sg-spin></span>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="Strip the .sg-spin-* classes and apply your own — keeps the ARIA wiring."
        [code]="unstyledSource"
      >
        <span sg-spin [unstyled]="true" className="ng-spin-custom"></span>
      </sg-demo-box>

      <sg-props-table [data]="spinProps"></sg-props-table>
      <sg-css-vars-table
        [data]="spinCssVars"
        hint="Override these tokens per scope to retheme the spinner without forking the component."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-spin-success {
        --sg-spin-color: var(--sg-color-success, #52c41a);
      }
      :host ::ng-deep .ng-spin-danger {
        --sg-spin-color: var(--sg-color-error, #ff4d4f);
        --sg-spin-overlay-bg: rgba(255, 0, 0, 0.12);
      }
      :host ::ng-deep .ng-spin-custom {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid var(--sg-color-primary);
        border-top-color: transparent;
        border-radius: 50%;
        animation: ng-spin-rotate 0.8s linear infinite;
      }
      @keyframes ng-spin-rotate {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinPageComponent {
  protected readonly basicSource = BASIC_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly tipSource = TIP_SOURCE
  protected readonly delaySource = DELAY_SOURCE
  protected readonly colorSource = COLOR_SOURCE
  protected readonly fullscreenSource = FULLSCREEN_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly spinProps = SPIN_PROPS
  protected readonly spinCssVars = SPIN_CSS_VARS
}
