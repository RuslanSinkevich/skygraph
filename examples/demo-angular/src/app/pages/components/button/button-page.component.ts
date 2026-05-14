import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const TYPES_SOURCE = `<button sg-button>Default</button>
<button sg-button type="primary">Primary</button>
<button sg-button type="dashed">Dashed</button>
<button sg-button type="text">Text</button>
<button sg-button type="link">Link</button>`

const SIZES_SOURCE = `<button sg-button size="small">Small</button>
<button sg-button type="primary" size="small">Small primary</button>
<button sg-button>Middle</button>
<button sg-button type="primary">Middle primary</button>
<button sg-button size="large">Large</button>
<button sg-button type="primary" size="large">Large primary</button>`

const LOADING_SOURCE = `<button sg-button [loading]="true">Default loading</button>
<button sg-button type="primary" [loading]="true">Primary loading</button>
<button sg-button type="dashed" [loading]="true">Dashed loading</button>

<!-- Controlled: submit pattern -->
<button
  sg-button
  type="primary"
  [loading]="saving()"
  (click)="save()"
>
  {{ saving() ? 'Saving…' : 'Click me' }}
</button>`

const DISABLED_SOURCE = `<button sg-button [disabled]="true">Default</button>
<button sg-button type="primary" [disabled]="true">Primary</button>
<button sg-button type="dashed" [disabled]="true">Dashed</button>
<button sg-button type="text" [disabled]="true">Text</button>
<button sg-button type="link" [disabled]="true">Link</button>`

const ICON_SOURCE = `<button sg-button type="primary">
  <span aria-hidden="true">＋</span>
  New project
</button>
<button sg-button>
  <span aria-hidden="true">⟳</span>
  Refresh
</button>
<button sg-button type="text">
  <span aria-hidden="true">⌫</span>
  Remove
</button>
<button sg-button size="small" aria-label="Search">
  <span aria-hidden="true">🔍</span>
</button>`

const TOKENS_SOURCE = `<style>
  .pill-scope {
    --sg-btn-height: 42px;
    --sg-btn-radius: 999px;
    --sg-btn-font-size: 14px;
    --sg-btn-padding: 0 22px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
</style>
<div class="pill-scope">
  <button sg-button type="primary">Pill primary</button>
  <button sg-button>Pill default</button>
  <button sg-button type="dashed">Pill dashed</button>
</div>`

const BRAND_SOURCE = `<style>
  .green-scope {
    --sg-color-primary: #16a34a;
    --sg-color-primary-hover: #15803d;
    --sg-color-primary-active: #14532d;
    --sg-color-primary-bg: #dcfce7;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
</style>
<div class="green-scope">
  <button sg-button type="primary">Primary (green)</button>
  <button sg-button>Default</button>
  <button sg-button type="link">Link</button>
</div>`

const UNSTYLED_SOURCE = `<style>
  .demo-pill-btn {
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    border-radius: 999px;
    padding: 10px 24px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
  .demo-pill-btn:hover { filter: brightness(1.1); }
  .demo-pill-btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
<button sg-button [unstyled]="true" className="demo-pill-btn">Custom pill</button>
<button sg-button [unstyled]="true" [disabled]="true" className="demo-pill-btn">Disabled pill</button>
<button sg-button [unstyled]="true" [loading]="true" className="demo-pill-btn">Loading pill</button>`

const BUTTON_PROPS: PropDef[] = [
  {
    name: 'type',
    description: 'Visual variant',
    type: "'default' | 'primary' | 'dashed' | 'text' | 'link'",
    default: "'default'",
  },
  {
    name: 'size',
    description: 'Button size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'disabled',
    description: 'Disable the button (also inherits from ConfigProvider)',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'loading',
    description: 'Show an inline Spin; sets aria-busy and blocks clicks',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'danger',
    description: 'Switches to the danger palette',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'block',
    description: 'Stretches the button to fill the parent width',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'htmlType',
    description: 'Native HTML button type attribute',
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
  },
  {
    name: '(click)',
    description: 'Click event',
    type: 'EventEmitter<MouseEvent>',
  },
  {
    name: 'className',
    description: 'Extra class on the root button element',
    type: 'string',
  },
  {
    name: 'unstyled',
    description: 'Drop all sg-button-* classes (keeps aria / disabled / loading semantics)',
    type: 'boolean',
    default: 'false',
  },
]

const BUTTON_CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-btn-height',
    default: 'var(--sg-height-md)',
    description: 'Button height (local token — falls back to the global size scale)',
  },
  {
    name: 'sg-btn-padding',
    default: '0 var(--sg-padding-md)',
    description: 'Horizontal padding',
  },
  {
    name: 'sg-btn-radius',
    default: 'var(--sg-border-radius)',
    description: 'Corner radius — bump to 999px for pill buttons',
  },
  {
    name: 'sg-btn-font-size',
    default: 'var(--sg-font-size)',
    description: 'Label font size',
  },
  {
    name: 'sg-btn-bg',
    default: 'transparent',
    description: 'Background (primary overrides to `--sg-color-primary`)',
  },
  {
    name: 'sg-btn-color',
    default: 'var(--sg-color-text)',
    description: 'Label colour',
  },
  {
    name: 'sg-btn-border',
    default: 'var(--sg-color-border)',
    description: 'Border colour',
  },
  {
    name: 'sg-color-primary',
    default: '#1677ff',
    description: '`type="primary" | "link"` base colour + focus ring',
  },
  {
    name: 'sg-color-primary-hover',
    default: '#4096ff',
    description: 'Hover colour for primary / link / default',
  },
  {
    name: 'sg-color-primary-active',
    default: '#0958d9',
    description: 'Active / pressed colour',
  },
  {
    name: 'sg-color-primary-bg',
    default: '#e6f4ff',
    description: 'Focus ring glow',
  },
  {
    name: 'sg-color-white',
    default: '#ffffff',
    description: 'Label colour on `type="primary"`',
  },
  {
    name: 'sg-color-bg-hover',
    default: 'rgba(0, 0, 0, 0.04)',
    description: '`type="text"` hover background',
  },
  {
    name: 'sg-color-bg-disabled',
    default: 'rgba(0, 0, 0, 0.04)',
    description: 'Disabled background',
  },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: 'Disabled label colour',
  },
  {
    name: 'sg-height-sm',
    default: '24px',
    description: '`size="small"` height (via `--sg-btn-height`)',
  },
  { name: 'sg-height-md', default: '32px', description: '`size="middle"` height' },
  { name: 'sg-height-lg', default: '40px', description: '`size="large"` height' },
  { name: 'sg-padding-xs', default: '4px', description: 'Gap between icon and label' },
  { name: 'sg-padding-sm', default: '8px', description: '`size="small"` horizontal padding' },
  { name: 'sg-padding-md', default: '12px', description: '`size="middle"` horizontal padding' },
  { name: 'sg-padding-lg', default: '16px', description: '`size="large"` horizontal padding' },
  {
    name: 'sg-transition-duration',
    default: '180ms',
    description: 'Hover / focus transition',
  },
  {
    name: 'sg-transition-timing',
    default: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    description: 'Shared easing',
  },
]

@Component({
  selector: 'sg-button-page',
  standalone: true,
  imports: [
    SgButtonComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Button"
      badge="General"
      [crumbs]="['General', 'Button']"
      description="Trigger actions. Five visual types, three sizes, loading / disabled states, headless mode, and a dense set of component-local tokens."
      [whenToUse]="[
        'A button means an operation — clicking it triggers business logic.',
        'Use primary for the call to action, default for secondary, dashed for &quot;add&quot;, text / link for inline toolbars.',
      ]"
    >
      <sg-demo-box
        title="Types"
        description="Default, primary, dashed, text, link."
        [code]="typesSource"
      >
        <button sg-button>Default</button>
        <button sg-button type="primary">Primary</button>
        <button sg-button type="dashed">Dashed</button>
        <button sg-button type="text">Text</button>
        <button sg-button type="link">Link</button>
      </sg-demo-box>

      <sg-demo-box title="Sizes" description="Small, middle, large." [code]="sizesSource">
        <button sg-button size="small">Small</button>
        <button sg-button type="primary" size="small">Small primary</button>
        <button sg-button>Middle</button>
        <button sg-button type="primary">Middle primary</button>
        <button sg-button size="large">Large</button>
        <button sg-button type="primary" size="large">Large primary</button>
      </sg-demo-box>

      <sg-demo-box
        title="Loading"
        description="Inline Spin + aria-busy + blocked clicks."
        [code]="loadingSource"
      >
        <button sg-button [loading]="true">Default loading</button>
        <button sg-button type="primary" [loading]="true">Primary loading</button>
        <button sg-button type="dashed" [loading]="true">Dashed loading</button>
        <button sg-button type="primary" [loading]="saving()" (click)="save()">
          {{ saving() ? 'Saving…' : 'Click me' }}
        </button>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled"
        description="Dim + aria-disabled across every variant."
        [code]="disabledSource"
      >
        <button sg-button [disabled]="true">Default</button>
        <button sg-button type="primary" [disabled]="true">Primary</button>
        <button sg-button type="dashed" [disabled]="true">Dashed</button>
        <button sg-button type="text" [disabled]="true">Text</button>
        <button sg-button type="link" [disabled]="true">Link</button>
      </sg-demo-box>

      <sg-demo-box
        title="With icon"
        description="Flex gap keeps icon + label aligned at every size."
        [code]="iconSource"
      >
        <button sg-button type="primary">
          <span aria-hidden="true">＋</span>
          New project
        </button>
        <button sg-button>
          <span aria-hidden="true">⟳</span>
          Refresh
        </button>
        <button sg-button type="text">
          <span aria-hidden="true">⌫</span>
          Remove
        </button>
        <button sg-button size="small" aria-label="Search">
          <span aria-hidden="true">🔍</span>
        </button>
      </sg-demo-box>

      <sg-demo-box
        title="Component tokens"
        description="Scope --sg-btn-* for a local reshape (pills, chunky, compact)."
        [code]="tokensSource"
      >
        <div class="pill-scope">
          <button sg-button type="primary">Pill primary</button>
          <button sg-button>Pill default</button>
          <button sg-button type="dashed">Pill dashed</button>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Scoped brand"
        description="Override --sg-color-primary* to rebrand a subtree."
        [code]="brandSource"
      >
        <div class="green-scope">
          <button sg-button type="primary">Primary (green)</button>
          <button sg-button>Default</button>
          <button sg-button type="link">Link</button>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="Drop all CSS, keep the button semantics."
        [code]="unstyledSource"
      >
        <button sg-button [unstyled]="true" className="demo-pill-btn">Custom pill</button>
        <button sg-button [unstyled]="true" [disabled]="true" className="demo-pill-btn">
          Disabled pill
        </button>
        <button sg-button [unstyled]="true" [loading]="true" className="demo-pill-btn">
          Loading pill
        </button>
      </sg-demo-box>

      <sg-props-table title="Button API" [data]="buttonProps"></sg-props-table>
      <sg-css-vars-table
        [data]="buttonCssVars"
        hint="Button defines its own --sg-btn-* scope (height / padding / radius / font-size / bg / color / border) — override those on a wrapper for shape changes. The colour palette is pulled from the global --sg-color-primary* + --sg-color-text* tokens, so rebrand via the primary palette."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .pill-scope {
        --sg-btn-height: 42px;
        --sg-btn-radius: 999px;
        --sg-btn-font-size: 14px;
        --sg-btn-padding: 0 22px;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      :host ::ng-deep .green-scope {
        --sg-color-primary: #16a34a;
        --sg-color-primary-hover: #15803d;
        --sg-color-primary-active: #14532d;
        --sg-color-primary-bg: #dcfce7;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      :host ::ng-deep .demo-pill-btn {
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 999px;
        padding: 10px 24px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
      }
      :host ::ng-deep .demo-pill-btn:hover {
        filter: brightness(1.1);
      }
      :host ::ng-deep .demo-pill-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPageComponent {
  protected readonly saving = signal(false)

  protected readonly typesSource = TYPES_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly loadingSource = LOADING_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly iconSource = ICON_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly brandSource = BRAND_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly buttonProps = BUTTON_PROPS
  protected readonly buttonCssVars = BUTTON_CSS_VARS

  protected save(): void {
    this.saving.set(true)
    setTimeout(() => this.saving.set(false), 1500)
  }
}
