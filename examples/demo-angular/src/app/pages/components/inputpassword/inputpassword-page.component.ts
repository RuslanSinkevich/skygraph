import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgInputPasswordComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<div sg-input-password placeholder="Password" [(value)]="pwd"></div>
<span>length: {{ pwd.length }}</span>`

const STRENGTH_SOURCE = `<div sg-input-password [showStrength]="true" placeholder="Try Aa1!secure"></div>`

const NO_TOGGLE_SOURCE = `<div sg-input-password [visibilityToggle]="false" defaultValue="hidden"></div>`

const SIZES_SOURCE = `<div sg-input-password size="small" placeholder="small"></div>
<div sg-input-password placeholder="middle (default)"></div>
<div sg-input-password size="large" placeholder="large"></div>`

const DISABLED_SOURCE = `<div sg-input-password [disabled]="true" defaultValue="locked"></div>
<div sg-input-password [loading]="true" placeholder="Verifying…"></div>`

const TOKENS_SOURCE = `<style>
  .indigo-scope {
    --sg-color-primary: #4f46e5;
    --sg-color-success: #10b981;
    --sg-color-error: #ef4444;
    --sg-color-warning: #f59e0b;
    --sg-border-radius: 10px;
  }
</style>
<div class="indigo-scope">
  <div sg-input-password [showStrength]="true" defaultValue="Aa1!secure"></div>
</div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled value', type: 'string' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'string' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires on every keystroke',
    type: 'EventEmitter<string>',
  },
  {
    name: 'visibilityToggle',
    description: 'Show the eye button — flip between password / text mode',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'showStrength',
    description: 'Render the strength meter below the input',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'strengthLabels',
    description: 'Custom labels for weak / medium / strong / very-strong',
    type: 'Partial<Record<SgPasswordStrength, string>>',
  },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: 'Disable the field', type: 'boolean', default: 'false' },
  {
    name: 'loading',
    description: 'Inline spinner; locks interaction',
    type: 'boolean',
    default: 'false',
  },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-input-bg', default: 'var(--sg-color-bg-container)', description: 'Field background' },
  {
    name: 'sg-input-border',
    default: 'var(--sg-color-border)',
    description: 'Field border colour',
  },
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'Toggle hover / focus ring',
  },
  { name: 'sg-color-error', default: 'var(--sg-red-5)', description: 'Weak strength colour' },
  { name: 'sg-color-warning', default: 'var(--sg-gold-6)', description: 'Medium strength colour' },
  {
    name: 'sg-color-success',
    default: 'var(--sg-green-6)',
    description: 'Strong / very-strong colour',
  },
  { name: 'sg-border-radius', default: '6px', description: 'Field corner radius' },
]

@Component({
  selector: 'sg-inputpassword-page',
  standalone: true,
  imports: [
    SgInputPasswordComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="InputPassword"
      [crumbs]="['Data Entry', 'InputPassword']"
      description="Password field with an optional visibility toggle and a real-time strength meter."
      [whenToUse]="[
        'For sign-up and password-change flows — show strength to encourage stronger choices.',
        'For sensitive value entry where the user must verify what they typed without exposing it.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Controlled value with eye toggle. The valueChange event fires on every keystroke."
        [code]="basicSource"
      >
        <div sg-input-password placeholder="Password" [(value)]="pwd"></div>
        <p style="font-size:12px;color:var(--sg-color-text-secondary);margin:8px 0 0">
          length: {{ pwd.length }}
        </p>
      </sg-demo-box>

      <sg-demo-box
        title="Strength meter"
        description="showStrength renders a coloured bar + label that updates as the user types."
        [code]="strengthSource"
      >
        <div sg-input-password [showStrength]="true" placeholder="Try Aa1!secure"></div>
      </sg-demo-box>

      <sg-demo-box
        title="No toggle"
        description="Hide the eye button for fully read-only / masked-only fields."
        [code]="noToggleSource"
      >
        <div sg-input-password [visibilityToggle]="false" defaultValue="hidden"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes inherited from ConfigProvider."
        [code]="sizesSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <div sg-input-password size="small" placeholder="small"></div>
          <div sg-input-password placeholder="middle (default)"></div>
          <div sg-input-password size="large" placeholder="large"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled / loading"
        description="Disabled blocks the field; loading shows a spinner in place of the eye."
        [code]="disabledSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <div sg-input-password [disabled]="true" defaultValue="locked"></div>
          <div sg-input-password [loading]="true" placeholder="Verifying…"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Rebrand the strength colours via the standard palette tokens."
        [code]="tokensSource"
      >
        <div class="ng-pwd-indigo">
          <div sg-input-password [showStrength]="true" defaultValue="Aa1!secure"></div>
        </div>
      </sg-demo-box>

      <sg-props-table title="InputPassword API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="InputPassword has no component-local tokens — the strength meter borrows --sg-color-error / --sg-color-warning / --sg-color-success."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-pwd-indigo {
        --sg-color-primary: #4f46e5;
        --sg-color-success: #10b981;
        --sg-color-error: #ef4444;
        --sg-color-warning: #f59e0b;
        --sg-border-radius: 10px;
        max-width: 320px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordPageComponent {
  protected pwd = ''
  protected readonly basicSource = BASIC_SOURCE
  protected readonly strengthSource = STRENGTH_SOURCE
  protected readonly noToggleSource = NO_TOGGLE_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
