import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgInputNumberComponent, SgSliderComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<div sg-slider [value]="value()" (valueChange)="value.set($event)"></div>
<span>value: {{ value() }}</span>`

const MIN_MAX_STEP_SOURCE = `<label>
  <span>0 – 10, step 1</span>
  <div sg-slider [min]="0" [max]="10" [defaultValue]="4"></div>
</label>
<label>
  <span>−50 – 50, step 5</span>
  <div sg-slider [min]="-50" [max]="50" [step]="5" [defaultValue]="0"></div>
</label>
<label>
  <span>0 – 1, step 0.05</span>
  <div sg-slider [min]="0" [max]="1" [step]="0.05" [defaultValue]="0.25"></div>
</label>`

const WITH_VALUE_SOURCE = `<div sg-slider [value]="pair()" (valueChange)="pair.set($event)" [min]="0" [max]="100"></div>
<span sg-input-number [value]="pair()" (valueChange)="pair.set($event ?? 0)" [min]="0" [max]="100"></span>`

const DISABLED_SOURCE = `<div sg-slider [disabled]="true" [defaultValue]="30"></div>
<div sg-slider [disabled]="true" [defaultValue]="70"></div>`

const TOKENS_SOURCE = `<style>
  .orange-scope {
    --sg-color-primary: #f97316;
    --sg-color-primary-bg: rgba(249, 115, 22, 0.2);
    --sg-color-border: #fed7aa;
  }
</style>
<div class="orange-scope">
  <div sg-slider [defaultValue]="60"></div>
</div>`

const UNSTYLED_SOURCE = `<div class="ng-slider-frame">
  <div sg-slider [unstyled]="true" [defaultValue]="35"></div>
</div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled numeric value', type: 'number' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'number' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires on every drag / arrow keystroke',
    type: 'EventEmitter<number>',
  },
  { name: 'min', description: 'Lower bound', type: 'number', default: '0' },
  { name: 'max', description: 'Upper bound', type: 'number', default: '100' },
  { name: 'step', description: 'Quantises drags and arrow keys', type: 'number', default: '1' },
  {
    name: 'disabled',
    description: 'Block pointer + keyboard; keeps aria-disabled',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: 'Drop sg-slider-* classes (keeps role="slider")',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Fill + handle colour' },
  {
    name: 'sg-color-primary-bg',
    default: 'rgba(22, 119, 255, 0.1)',
    description: 'Handle focus ring',
  },
  { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: 'Track (rail) colour' },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Handle background' },
  { name: 'sg-shadow-sm', default: '0 2px 4px rgba(0, 0, 0, 0.16)', description: 'Handle shadow' },
  {
    name: 'sg-color-bg-disabled',
    default: 'rgba(0, 0, 0, 0.04)',
    description: 'Disabled fill colour',
  },
  { name: 'sg-transition-duration', default: '180ms', description: 'Handle / fill transition' },
]

@Component({
  selector: 'sg-slider-page',
  standalone: true,
  imports: [
    SgSliderComponent,
    SgInputNumberComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Slider"
      [crumbs]="['Data Entry', 'Slider']"
      description="Pick a number with pointer or arrow keys. min / max / step define the range; the handle is keyboard-accessible."
      [whenToUse]="[
        'For large numeric ranges where typing is impractical — volume, brightness, pricing.',
        'Pair with InputNumber for a slider + precise value combo.',
        'Use Rate for fixed-scale ratings (1–5 stars).',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Controlled slider — drag the handle or focus and arrow-key it; every change fires (valueChange)."
        [code]="basicSource"
      >
        <div style="display:grid;gap:12px;max-width:360px">
          <div sg-slider [value]="value()" (valueChange)="value.set($event)"></div>
          <span style="font-size:12px;color:var(--sg-color-text-secondary)">
            value: {{ value() }}
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Min / max / step"
        description="step quantises both pointer drags and arrow-key presses."
        [code]="minMaxStepSource"
      >
        <div style="display:grid;gap:24px;max-width:360px">
          <label style="display:grid;gap:4px">
            <span style="font-size:12px;color:var(--sg-color-text-secondary)">0 – 10, step 1</span>
            <div sg-slider [min]="0" [max]="10" [defaultValue]="4"></div>
          </label>
          <label style="display:grid;gap:4px">
            <span style="font-size:12px;color:var(--sg-color-text-secondary)"
              >−50 – 50, step 5</span
            >
            <div sg-slider [min]="-50" [max]="50" [step]="5" [defaultValue]="0"></div>
          </label>
          <label style="display:grid;gap:4px">
            <span style="font-size:12px;color:var(--sg-color-text-secondary)"
              >0 – 1, step 0.05</span
            >
            <div sg-slider [min]="0" [max]="1" [step]="0.05" [defaultValue]="0.25"></div>
          </label>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="With InputNumber"
        description="Pair Slider with InputNumber — both share the same signal so the bar, handle and number stay in sync."
        [code]="withValueSource"
      >
        <div style="display:grid;gap:16px;max-width:360px">
          <div
            sg-slider
            [value]="pair()"
            (valueChange)="pair.set($event)"
            [min]="0"
            [max]="100"
          ></div>
          <span
            sg-input-number
            [value]="pair()"
            (valueChange)="setPair($event)"
            [min]="0"
            [max]="100"
          ></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled"
        description="disabled dims the control and blocks pointer + keyboard interaction."
        [code]="disabledSource"
      >
        <div style="display:grid;gap:16px;max-width:360px">
          <div sg-slider [disabled]="true" [defaultValue]="30"></div>
          <div sg-slider [disabled]="true" [defaultValue]="70"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Scope --sg-color-primary + --sg-color-border to rebrand the rail / fill / handle."
        [code]="tokensSource"
      >
        <div class="ng-slider-orange">
          <div sg-slider [defaultValue]="60"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops SkyGraph classes — DOM structure stays for custom styling."
        [code]="unstyledSource"
      >
        <div class="ng-slider-frame">
          <div sg-slider [unstyled]="true" [defaultValue]="35"></div>
        </div>
      </sg-demo-box>

      <sg-props-table title="Slider API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Slider uses only global tokens — fill / handle follow --sg-color-primary, rail follows --sg-color-border."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-slider-orange {
        --sg-color-primary: #f97316;
        --sg-color-primary-bg: rgba(249, 115, 22, 0.2);
        --sg-color-border: #fed7aa;
        max-width: 360px;
      }
      :host ::ng-deep .ng-slider-frame {
        max-width: 360px;
        padding: 12px;
        border: 1px dashed var(--sg-color-border);
        border-radius: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderPageComponent {
  protected readonly value = signal(40)
  protected readonly pair = signal(32)

  protected readonly basicSource = BASIC_SOURCE
  protected readonly minMaxStepSource = MIN_MAX_STEP_SOURCE
  protected readonly withValueSource = WITH_VALUE_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS

  protected setPair(v: number | null | undefined): void {
    this.pair.set(v ?? 0)
  }
}
