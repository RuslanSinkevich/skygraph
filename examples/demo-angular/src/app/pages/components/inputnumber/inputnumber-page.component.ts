import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgInputNumberComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<span sg-input-number [(value)]="value"></span>
<span style="font-size:12px;color:var(--sg-color-text-secondary)">
  value: {{ value === null ? 'null' : value }}
</span>`

const MIN_MAX_STEP_SOURCE = `<label>
  <span>0 – 10, step 1</span>
  <span sg-input-number [defaultValue]="5" [min]="0" [max]="10"></span>
</label>
<label>
  <span>step 5</span>
  <span sg-input-number [defaultValue]="25" [step]="5"></span>
</label>
<label>
  <span>negative allowed</span>
  <span sg-input-number [defaultValue]="-3" [min]="-10" [max]="10"></span>
</label>`

const PRECISION_SOURCE = `<label>
  <span>precision = 0</span>
  <span sg-input-number [defaultValue]="10" [step]="0.5" [precision]="0"></span>
</label>
<label>
  <span>precision = 2</span>
  <span sg-input-number [defaultValue]="1.25" [step]="0.05" [precision]="2"></span>
</label>
<label>
  <span>precision = 4</span>
  <span sg-input-number [defaultValue]="0.1234" [step]="0.0001" [precision]="4"></span>
</label>`

const SIZES_SOURCE = `<span sg-input-number size="small" [defaultValue]="1"></span>
<span sg-input-number [defaultValue]="2"></span>
<span sg-input-number size="large" [defaultValue]="3"></span>`

const STATES_SOURCE = `<span sg-input-number [disabled]="true" [defaultValue]="5"></span>
<span sg-input-number [disabled]="true" placeholder="no value"></span>
<span sg-input-number [loading]="true" [defaultValue]="42"></span>
<span sg-input-number [loading]="true" placeholder="fetching…"></span>`

const TOKENS_SOURCE = `<style>
  .scoped {
    --sg-color-border: #6366f1;
    --sg-border-radius: 10px;
    --sg-color-bg-secondary: #eef2ff;
    --sg-color-bg-hover: #e0e7ff;
    --sg-color-text: #312e81;
    display: flex;
    gap: 16px;
    align-items: center;
  }
</style>
<div class="scoped">
  <span sg-input-number [defaultValue]="7" [min]="0" [max]="20"></span>
  <span sg-input-number size="large" [defaultValue]="1.25" [step]="0.25" [precision]="2"></span>
</div>`

const PROPS: PropDef[] = [
  {
    name: 'value',
    description: 'Controlled numeric value (null when cleared)',
    type: 'number | null',
  },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'number | null' },
  { name: 'min', description: 'Lower bound — clamps on type and stepper', type: 'number' },
  { name: 'max', description: 'Upper bound — clamps on type and stepper', type: 'number' },
  { name: 'step', description: 'Increment for + / − buttons', type: 'number', default: '1' },
  { name: 'precision', description: 'Decimal places to round to after clamping', type: 'number' },
  { name: 'placeholder', description: 'Placeholder when value is null', type: 'string' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires on every commit',
    type: 'EventEmitter<number | null>',
  },
  { name: '(sgBlur)', description: 'Blur event', type: 'EventEmitter<void>' },
  { name: 'disabled', description: 'Disable input and stepper', type: 'boolean', default: 'false' },
  {
    name: 'loading',
    description: 'Inline spinner; blocks edits',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: 'Border colour' },
  { name: 'sg-border-radius', default: '6px', description: 'Corner radius' },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Input background' },
  {
    name: 'sg-color-bg-secondary',
    default: 'rgba(0, 0, 0, 0.02)',
    description: 'Stepper button background',
  },
  {
    name: 'sg-color-bg-hover',
    default: 'rgba(0, 0, 0, 0.04)',
    description: 'Stepper button hover background',
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Text colour' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled text' },
  { name: 'sg-font-size', default: '14px', description: 'Text size (middle)' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Text size (small)' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Text size (large)' },
  { name: 'sg-height-sm', default: '24px', description: 'Height (small)' },
  { name: 'sg-height-md', default: '32px', description: 'Height (middle)' },
  { name: 'sg-height-lg', default: '40px', description: 'Height (large)' },
  { name: 'sg-padding-xs', default: '8px', description: 'Stepper width / horizontal padding' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Hover / focus transition' },
]

@Component({
  selector: 'sg-inputnumber-page',
  standalone: true,
  imports: [
    SgInputNumberComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="InputNumber"
      [crumbs]="['Data Entry', 'InputNumber']"
      description="Numeric field with +/− stepper, clamping (min / max), step and precision. Reuses Input's height / radius tokens so it lines up with other form controls."
      [whenToUse]="[
        'For bounded numeric values — quantity, age, price.',
        'When a stepper is more natural than typing — small counters, ratings.',
        'Pair with Slider for very large ranges where the keyboard is impractical.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Controlled numeric input with a live readout. Clearing the field commits null."
        [code]="basicSource"
      >
        <div style="display:flex;gap:12px;align-items:center">
          <span sg-input-number [(value)]="value"></span>
          <span style="font-size:12px;color:var(--sg-color-text-secondary)">
            value: {{ value === null ? 'null' : value }}
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Min / max / step"
        description="min and max clamp on type and stepper; step controls the + / − increment."
        [code]="minMaxStepSource"
      >
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          <label style="display:grid;gap:4px">
            <span style="font-size:12px;color:var(--sg-color-text-secondary)">0 – 10, step 1</span>
            <span sg-input-number [defaultValue]="5" [min]="0" [max]="10"></span>
          </label>
          <label style="display:grid;gap:4px">
            <span style="font-size:12px;color:var(--sg-color-text-secondary)">step 5</span>
            <span sg-input-number [defaultValue]="25" [step]="5"></span>
          </label>
          <label style="display:grid;gap:4px">
            <span style="font-size:12px;color:var(--sg-color-text-secondary)"
              >negative allowed</span
            >
            <span sg-input-number [defaultValue]="-3" [min]="-10" [max]="10"></span>
          </label>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Precision"
        description="precision rounds to a fixed number of decimals after clamping — useful for currencies / percentages."
        [code]="precisionSource"
      >
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          <label style="display:grid;gap:4px">
            <span style="font-size:12px;color:var(--sg-color-text-secondary)">precision = 0</span>
            <span sg-input-number [defaultValue]="10" [step]="0.5" [precision]="0"></span>
          </label>
          <label style="display:grid;gap:4px">
            <span style="font-size:12px;color:var(--sg-color-text-secondary)">precision = 2</span>
            <span sg-input-number [defaultValue]="1.25" [step]="0.05" [precision]="2"></span>
          </label>
          <label style="display:grid;gap:4px">
            <span style="font-size:12px;color:var(--sg-color-text-secondary)">precision = 4</span>
            <span sg-input-number [defaultValue]="0.1234" [step]="0.0001" [precision]="4"></span>
          </label>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes scale height, stepper button width and input width."
        [code]="sizesSource"
      >
        <div style="display:flex;gap:16px;align-items:center">
          <span sg-input-number size="small" [defaultValue]="1"></span>
          <span sg-input-number [defaultValue]="2"></span>
          <span sg-input-number size="large" [defaultValue]="3"></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="States"
        description="Disabled blocks all interaction; loading adds an inline spinner and dims the control."
        [code]="statesSource"
      >
        <div style="display:grid;gap:12px">
          <div style="display:flex;gap:16px;align-items:center">
            <span sg-input-number [disabled]="true" [defaultValue]="5"></span>
            <span sg-input-number [disabled]="true" placeholder="no value"></span>
          </div>
          <div style="display:flex;gap:16px;align-items:center">
            <span sg-input-number [loading]="true" [defaultValue]="42"></span>
            <span sg-input-number [loading]="true" placeholder="fetching…"></span>
          </div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="InputNumber has no own tokens — it reuses --sg-color-border / --sg-border-radius / --sg-color-bg-* / --sg-color-text. Scope those on a wrapper to retheme."
        [code]="tokensSource"
      >
        <div class="ng-inputnum-scope">
          <span sg-input-number [defaultValue]="7" [min]="0" [max]="20"></span>
          <span
            sg-input-number
            size="large"
            [defaultValue]="1.25"
            [step]="0.25"
            [precision]="2"
          ></span>
        </div>
      </sg-demo-box>

      <sg-props-table title="InputNumber API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="InputNumber has no component-local tokens. Override the shared form tokens (--sg-color-border, --sg-border-radius, --sg-color-bg-*, --sg-color-text) on a scope to retheme."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-inputnum-scope {
        --sg-color-border: #6366f1;
        --sg-border-radius: 10px;
        --sg-color-bg-secondary: #eef2ff;
        --sg-color-bg-hover: #e0e7ff;
        --sg-color-text: #312e81;
        display: flex;
        gap: 16px;
        align-items: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberPageComponent {
  protected value: number | null = 3

  protected readonly basicSource = BASIC_SOURCE
  protected readonly minMaxStepSource = MIN_MAX_STEP_SOURCE
  protected readonly precisionSource = PRECISION_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly statesSource = STATES_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
