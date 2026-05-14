import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgInputComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<span sg-input placeholder="Type something…" [(value)]="value"></span>
<span class="meta">
  {{ value.length ? 'value: "' + value + '"' : 'empty' }}
</span>`

const SIZES_SOURCE = `<span sg-input size="small" placeholder="small"></span>
<span sg-input placeholder="middle (default)"></span>
<span sg-input size="large" placeholder="large"></span>`

const TYPES_SOURCE = `<span sg-input type="text" placeholder="Plain text"></span>
<span sg-input type="email" placeholder="name@example.com"></span>
<span sg-input type="password" placeholder="••••••••"></span>
<span sg-input type="number" placeholder="42"></span>`

const STATES_SOURCE = `<span sg-input [disabled]="true" placeholder="Disabled"></span>
<span sg-input [disabled]="true" defaultValue="Locked value"></span>
<span sg-input [loading]="true" placeholder="Validating…"></span>`

const VALIDATION_SOURCE = `<span
  sg-input
  [(value)]="email"
  [attr.aria-invalid]="invalid()"
  aria-required="true"
  placeholder="email"
></span>
@if (invalid()) {
  <span style="font-size:12px;color:var(--sg-color-error)">
    Please enter a valid email.
  </span>
}`

const TOKENS_SOURCE = `<style>
  .rounded-scope {
    --sg-input-height: 44px;
    --sg-input-radius: 14px;
    --sg-input-font-size: 16px;
    --sg-input-padding: 10px 16px;
  }
  .brand-scope {
    --sg-color-primary: #7c3aed;
    --sg-color-primary-hover: #8b5cf6;
    --sg-color-primary-bg: #f3e8ff;
    --sg-input-border: #c4b5fd;
  }
</style>
<div class="rounded-scope">
  <span sg-input placeholder="Rounded soft input"></span>
</div>
<div class="brand-scope">
  <span sg-input placeholder="Violet brand input"></span>
</div>`

const UNSTYLED_SOURCE = `<style>
  .demo-unstyled-input {
    width: 100%;
    border: 2px solid #94a3b8;
    border-radius: 6px;
    padding: 10px 14px;
    font-size: 14px;
    background: white;
  }
  .demo-unstyled-input:focus {
    outline: 2px solid #6366f1;
  }
</style>
<span sg-input [unstyled]="true" className="demo-unstyled-input" placeholder="Native input + custom class"></span>`

const INPUT_PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled value', type: 'string' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'string' },
  {
    name: '(valueChange)',
    description: 'Two-way bound — fires on every keystroke',
    type: 'EventEmitter<string>',
  },
  { name: '(sgBlur)', description: 'Blur event', type: 'EventEmitter<void>' },
  { name: '(sgFocus)', description: 'Focus event', type: 'EventEmitter<void>' },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
  {
    name: 'type',
    description: 'Native input type (maps directly to the HTML attribute)',
    type: "'text' | 'email' | 'password' | 'number'",
    default: "'text'",
  },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'disabled',
    description: 'Disable the input (also inherits from ConfigProvider)',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'loading',
    description: 'Show an inline spinner on the right — blocks edits',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'readOnly',
    description: 'Marks the input read-only and styles it as such',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'aria-invalid',
    description: 'Toggles the error styling and tells AT',
    type: "boolean | 'false' | 'true' | 'grammar' | 'spelling'",
  },
  {
    name: 'aria-required',
    description: 'Marks the field as required for AT',
    type: "boolean | 'false' | 'true'",
  },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
  {
    name: 'unstyled',
    description: 'Drop all sg-input-* classes (keeps semantics)',
    type: 'boolean',
    default: 'false',
  },
]

const INPUT_CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-input-height',
    default: 'var(--sg-height-md)',
    description: 'Input height (per-size override below)',
  },
  {
    name: 'sg-input-padding',
    default: 'var(--sg-padding-xs) var(--sg-padding-md)',
    description: 'Inner padding',
  },
  {
    name: 'sg-input-font-size',
    default: 'var(--sg-font-size)',
    description: 'Text size',
  },
  {
    name: 'sg-input-color',
    default: 'var(--sg-color-text)',
    description: 'Text colour',
  },
  {
    name: 'sg-input-bg',
    default: 'var(--sg-color-bg-container)',
    description: 'Background',
  },
  {
    name: 'sg-input-border',
    default: 'var(--sg-color-border)',
    description: 'Border colour',
  },
  {
    name: 'sg-input-radius',
    default: 'var(--sg-border-radius)',
    description: 'Corner radius',
  },
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'Focus ring colour',
  },
  {
    name: 'sg-color-primary-hover',
    default: 'var(--sg-blue-5)',
    description: 'Hover border colour',
  },
  {
    name: 'sg-color-primary-bg',
    default: 'rgba(22, 119, 255, 0.1)',
    description: 'Focus ring glow',
  },
  {
    name: 'sg-color-bg-disabled',
    default: 'rgba(0, 0, 0, 0.04)',
    description: 'Disabled background',
  },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: 'Disabled text colour',
  },
  {
    name: 'sg-color-text-placeholder',
    default: 'rgba(0, 0, 0, 0.25)',
    description: 'Placeholder colour',
  },
  {
    name: 'sg-transition-duration',
    default: '180ms',
    description: 'Hover / focus transition',
  },
  {
    name: 'sg-transition-timing',
    default: 'cubic-bezier(.4,0,.2,1)',
    description: 'Shared easing',
  },
]

@Component({
  selector: 'sg-input-page',
  standalone: true,
  imports: [
    SgInputComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Input"
      [crumbs]="['Data Entry', 'Input']"
      description="Single-line text input. Three sizes, four HTML types, loading + disabled + read-only states, validation via aria-invalid, and a dense set of component-local tokens. See Textarea for the multi-line counterpart."
      [whenToUse]="[
        'For short free-form text — name, email, password, number.',
        'Pair with Form / Field for validation, error messages and submit flows.',
        'Use Textarea for multi-line input and Mentions / SearchInput for richer variants.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Two-way bound to a signal — onChange receives the raw string."
        [code]="basicSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <span sg-input placeholder="Type something…" [(value)]="basic"></span>
          <span style="font-size:12px;color:var(--sg-color-text-secondary)">
            {{ basic.length ? 'value: "' + basic + '"' : 'empty' }}
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes — share paddings/radius with Select/DatePicker so a mixed row aligns."
        [code]="sizesSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <span sg-input size="small" placeholder="small"></span>
          <span sg-input placeholder="middle (default)"></span>
          <span sg-input size="large" placeholder="large"></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Types"
        description="type maps directly to native HTML — keyboard, autofill and password managers do their jobs."
        [code]="typesSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <span sg-input type="text" placeholder="Plain text"></span>
          <span sg-input type="email" placeholder="name@example.com"></span>
          <span sg-input type="password" placeholder="••••••••"></span>
          <span sg-input type="number" placeholder="42"></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="States"
        description="Disabled greys out and blocks; loading shows an inline spinner and also blocks edits."
        [code]="statesSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <span sg-input [disabled]="true" placeholder="Disabled"></span>
          <span sg-input [disabled]="true" defaultValue="Locked value"></span>
          <span sg-input [loading]="true" placeholder="Validating…"></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Validation"
        description="aria-invalid flips the visual error state AND tells assistive tech — no separate status prop needed."
        [code]="validationSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <span
            sg-input
            [(value)]="email"
            [attr.aria-invalid]="emailInvalid()"
            aria-required="true"
            placeholder="email"
          ></span>
          @if (emailInvalid()) {
            <span style="font-size:12px;color:var(--sg-color-error)">
              Please enter a valid email.
            </span>
          }
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Component tokens"
        description="Scope --sg-input-* on a wrapper to reshape inputs without touching the rest of the form."
        [code]="tokensSource"
      >
        <div style="display:grid;gap:16px;max-width:360px">
          <div class="ng-input-rounded">
            <span sg-input placeholder="Rounded soft input"></span>
          </div>
          <div class="ng-input-brand">
            <span sg-input placeholder="Violet brand input"></span>
          </div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled strips every SkyGraph class — bring your own CSS."
        [code]="unstyledSource"
      >
        <div style="display:grid;gap:8px;max-width:360px">
          <span
            sg-input
            [unstyled]="true"
            className="ng-input-unstyled"
            placeholder="Native input + custom class"
          ></span>
        </div>
      </sg-demo-box>

      <sg-props-table title="Input API" [data]="inputProps"></sg-props-table>
      <sg-css-vars-table
        [data]="inputCssVars"
        hint="Input ships its own --sg-input-* scope (height / padding / radius / font-size / color / bg / border). Override those for shape changes; rebrand via the global --sg-color-primary* tokens."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-input-rounded {
        --sg-input-height: 44px;
        --sg-input-radius: 14px;
        --sg-input-font-size: 16px;
        --sg-input-padding: 10px 16px;
      }
      :host ::ng-deep .ng-input-brand {
        --sg-color-primary: #7c3aed;
        --sg-color-primary-hover: #8b5cf6;
        --sg-color-primary-bg: #f3e8ff;
        --sg-input-border: #c4b5fd;
      }
      :host ::ng-deep .ng-input-unstyled {
        width: 100%;
        border: 2px solid #94a3b8;
        border-radius: 6px;
        padding: 10px 14px;
        font-size: 14px;
        background: white;
      }
      :host ::ng-deep .ng-input-unstyled:focus {
        outline: 2px solid #6366f1;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPageComponent {
  protected basic = ''
  protected email = 'not-an-email'

  protected readonly basicSource = BASIC_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly typesSource = TYPES_SOURCE
  protected readonly statesSource = STATES_SOURCE
  protected readonly validationSource = VALIDATION_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly inputProps = INPUT_PROPS
  protected readonly inputCssVars = INPUT_CSS_VARS

  protected emailInvalid(): boolean {
    return !this.email.includes('@')
  }
}
