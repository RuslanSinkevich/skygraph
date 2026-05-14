import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgPinInputComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<div sg-pin-input length="4" (complete)="onDone($event)"></div>
<span>last completed: "{{ done() }}"</span>`

const MASKED_SOURCE = `<div sg-pin-input length="6" mask="true"></div>`

const ALPHA_SOURCE = `<div sg-pin-input length="5" type="alphanumeric"></div>`

const SIZES_SOURCE = `<div sg-pin-input size="small" length="4"></div>
<div sg-pin-input length="4"></div>
<div sg-pin-input size="large" length="4"></div>`

const STATES_SOURCE = `<div sg-pin-input length="4" [disabled]="true" defaultValue="1234"></div>
<div sg-pin-input length="4" [loading]="true"></div>`

const TOKENS_SOURCE = `<style>
  .violet-scope {
    --sg-color-primary: #7c3aed;
    --sg-color-border: #c4b5fd;
    --sg-border-radius: 12px;
  }
</style>
<div class="violet-scope">
  <div sg-pin-input length="6"></div>
</div>`

const PROPS: PropDef[] = [
  { name: 'length', description: 'Number of cells', type: 'number', default: '6' },
  {
    name: 'type',
    description: 'Acceptable character class',
    type: "'numeric' | 'alphanumeric'",
    default: "'numeric'",
  },
  {
    name: 'mask',
    description: 'Mask the typed value (treat each cell as password)',
    type: 'boolean',
    default: 'false',
  },
  { name: 'value', description: 'Controlled value', type: 'string' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'string' },
  {
    name: '(valueChange)',
    description: 'Fires on every cell update',
    type: 'EventEmitter<string>',
  },
  {
    name: '(complete)',
    description: 'Fires when all cells are filled',
    type: 'EventEmitter<string>',
  },
  {
    name: 'placeholder',
    description: 'Placeholder for empty cells',
    type: 'string',
    default: "'○'",
  },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: 'Block all cells', type: 'boolean', default: 'false' },
  {
    name: 'loading',
    description: 'Disable + apply a loading visual',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-input-bg', default: 'var(--sg-color-bg-container)', description: 'Cell background' },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Cell border' },
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'Focused / filled cell accent',
  },
  { name: 'sg-color-text', default: 'rgba(0,0,0,0.88)', description: 'Cell text colour' },
  { name: 'sg-border-radius', default: '6px', description: 'Cell corner radius' },
]

@Component({
  selector: 'sg-pininput-page',
  standalone: true,
  imports: [
    SgPinInputComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="PinInput"
      [crumbs]="['Data Entry', 'PinInput']"
      description="Fixed-length code input with paste, arrow and backspace navigation. Ideal for one-time codes and PINs."
      [whenToUse]="[
        'For SMS / e-mail verification codes.',
        'For lock-screen PINs and 2FA prompts.',
        'For any fixed-length numeric / alphanumeric secret.',
      ]"
    >
      <sg-demo-box
        title="4-digit numeric"
        description="Default cell type. (complete) fires when all cells are filled."
        [code]="basicSource"
      >
        <div sg-pin-input length="4" (complete)="onDone($event)"></div>
        <p style="font-size:12px;color:var(--sg-color-text-secondary);margin:8px 0 0">
          last completed: "{{ done() }}"
        </p>
      </sg-demo-box>

      <sg-demo-box
        title="Masked"
        description="mask renders dots — for sensitive codes."
        [code]="maskedSource"
      >
        <div sg-pin-input length="6" mask="true"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Alphanumeric"
        description="type='alphanumeric' allows A-Z / 0-9 codes."
        [code]="alphaSource"
      >
        <div sg-pin-input length="5" type="alphanumeric"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes inherited from ConfigProvider."
        [code]="sizesSource"
      >
        <div style="display:grid;gap:12px">
          <div sg-pin-input size="small" length="4"></div>
          <div sg-pin-input length="4"></div>
          <div sg-pin-input size="large" length="4"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="States"
        description="Disabled blocks all cells; loading applies the locked visual."
        [code]="statesSource"
      >
        <div style="display:grid;gap:8px">
          <div sg-pin-input length="4" [disabled]="true" defaultValue="1234"></div>
          <div sg-pin-input length="4" [loading]="true"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Rebrand the cells via global primary + border + radius tokens."
        [code]="tokensSource"
      >
        <div class="ng-pin-violet">
          <div sg-pin-input length="6"></div>
        </div>
      </sg-demo-box>

      <sg-props-table title="PinInput API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="PinInput has no component-local tokens — borrows global input + primary tokens."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-pin-violet {
        --sg-color-primary: #7c3aed;
        --sg-color-border: #c4b5fd;
        --sg-border-radius: 12px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinInputPageComponent {
  protected readonly done = signal('')
  protected readonly basicSource = BASIC_SOURCE
  protected readonly maskedSource = MASKED_SOURCE
  protected readonly alphaSource = ALPHA_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly statesSource = STATES_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS

  protected onDone(v: string): void {
    this.done.set(v)
  }
}
