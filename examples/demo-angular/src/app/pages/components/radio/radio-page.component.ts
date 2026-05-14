import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgRadioGroupComponent, type SgRadioOption } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const PLAN_OPTIONS: SgRadioOption[] = [
  { label: 'Economy', value: 'economy' },
  { label: 'Standard', value: 'standard' },
  { label: 'Premium', value: 'premium' },
]

const PAYMENT_OPTIONS: SgRadioOption[] = [
  { label: 'Pay by card', value: 'card' },
  { label: 'PayPal', value: 'paypal' },
  { label: 'Bank transfer', value: 'bank' },
  { label: 'Cash on delivery', value: 'cash' },
]

const SIZE_OPTIONS: SgRadioOption[] = [
  { label: 'Small', value: 'small' },
  { label: 'Medium (sold out)', value: 'medium', disabled: true },
  { label: 'Large', value: 'large' },
]

const YESNO_OPTIONS: SgRadioOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const AB_OPTIONS: SgRadioOption[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
]

const BRAND_OPTIONS: SgRadioOption[] = [
  { label: 'Brand A', value: 'a' },
  { label: 'Brand B', value: 'b' },
  { label: 'Brand C', value: 'c' },
]

const FIRST_OPTIONS: SgRadioOption[] = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Third', value: 'third' },
]

const BASIC_SOURCE = `<div
  sg-radio-group
  [value]="value"
  (valueChange)="setValue($event)"
  [options]="planOptions"
></div>
<span>Selected: {{ value }}</span>`

const VERTICAL_SOURCE = `<div
  sg-radio-group
  direction="vertical"
  [defaultValue]="'card'"
  [options]="paymentOptions"
></div>`

const DISABLED_SOURCE = `<div sg-radio-group [defaultValue]="'small'" [options]="sizeOptions"></div>
<div sg-radio-group [disabled]="true" [defaultValue]="'yes'" [options]="yesnoOptions"></div>
<div sg-radio-group [loading]="true" [defaultValue]="'a'" [options]="abOptions"></div>`

const TOKENS_SOURCE = `<style>
  .green-scope {
    --sg-color-primary: var(--sg-green-6);
    --sg-color-text: #0b4417;
    --sg-padding-md: 24px;
  }
</style>
<div class="green-scope">
  <div sg-radio-group [defaultValue]="'b'" [options]="brandOptions"></div>
</div>`

const UNSTYLED_SOURCE = `<div
  sg-radio-group
  [unstyled]="true"
  [defaultValue]="'first'"
  [options]="firstOptions"
></div>`

const PROPS: PropDef[] = [
  { name: 'options', description: 'List of selectable options', type: 'RadioOption[]' },
  { name: 'value', description: 'Controlled value', type: 'string | number' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'string | number' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires when the user picks an option',
    type: 'EventEmitter<string | number>',
  },
  {
    name: 'direction',
    description: 'Layout direction',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
  },
  {
    name: 'disabled',
    description: 'Disable the whole group',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'loading',
    description: 'Inline spinner next to the currently selected option',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: 'Drop sg-radio-* classes (keeps role="radiogroup")',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the root group', type: 'string' },
]

const OPTION_PROPS: PropDef[] = [
  { name: 'label', description: 'Display text', type: 'string' },
  { name: 'value', description: 'Stable id — emitted on selection', type: 'string | number' },
  {
    name: 'disabled',
    description: 'Visible but not selectable',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'Pinned to the native accent-color (checked dot)',
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Label text colour' },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: 'Disabled label colour',
  },
  {
    name: 'sg-padding-md',
    default: '16px',
    description: 'Gap between options (horizontal layout)',
  },
  { name: 'sg-padding-xs', default: '4px', description: 'Gap between input and label' },
  { name: 'sg-font-size', default: '14px', description: 'Label font size' },
]

@Component({
  selector: 'sg-radio-page',
  standalone: true,
  imports: [
    SgRadioGroupComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Radio"
      [crumbs]="['Data Entry', 'Radio']"
      description="Mutually exclusive choice — pick one. Horizontal or vertical layout, per-option disabled, loading and headless modes."
      [whenToUse]="[
        'For 2–5 short labels where all choices fit on screen.',
        'For settings screens where each row needs description text — direction=vertical.',
        'For 6+ options use Select; for free text use AutoComplete.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Controlled group — value flows to onChange so you can lift it into a store or form."
        [code]="basicSource"
      >
        <div style="display:grid;gap:8px">
          <div
            sg-radio-group
            [value]="value"
            (valueChange)="setValue($event)"
            [options]="planOptions"
          ></div>
          <span style="font-size:12px;color:var(--sg-color-text-secondary)">
            Selected: {{ value }}
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Vertical"
        description="direction=vertical stacks options — ideal for longer labels or settings."
        [code]="verticalSource"
      >
        <div
          sg-radio-group
          direction="vertical"
          [defaultValue]="'card'"
          [options]="paymentOptions"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled states"
        description="disabled on the group blocks everything; per-option disabled blocks just that row; loading shows an inline spinner."
        [code]="disabledSource"
      >
        <div style="display:grid;gap:12px">
          <div sg-radio-group [defaultValue]="'small'" [options]="sizeOptions"></div>
          <div
            sg-radio-group
            [disabled]="true"
            [defaultValue]="'yes'"
            [options]="yesnoOptions"
          ></div>
          <div sg-radio-group [loading]="true" [defaultValue]="'a'" [options]="abOptions"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Scope --sg-color-primary / --sg-color-text to retheme a single group."
        [code]="tokensSource"
      >
        <div class="ng-radio-green">
          <div sg-radio-group [defaultValue]="'b'" [options]="brandOptions"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled keeps role=radiogroup + native inputs and drops every SkyGraph class."
        [code]="unstyledSource"
      >
        <div
          sg-radio-group
          [unstyled]="true"
          [defaultValue]="'first'"
          [options]="firstOptions"
        ></div>
      </sg-demo-box>

      <sg-props-table title="RadioGroup API" [data]="props"></sg-props-table>
      <sg-props-table title="RadioOption" [data]="optionProps"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Radio has no component-local tokens — the checked dot is driven by accent-color pinned to --sg-color-primary."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-radio-green {
        --sg-color-primary: var(--sg-green-6, #16a34a);
        --sg-color-text: #0b4417;
        --sg-padding-md: 24px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioPageComponent {
  protected readonly planOptions = PLAN_OPTIONS
  protected readonly paymentOptions = PAYMENT_OPTIONS
  protected readonly sizeOptions = SIZE_OPTIONS
  protected readonly yesnoOptions = YESNO_OPTIONS
  protected readonly abOptions = AB_OPTIONS
  protected readonly brandOptions = BRAND_OPTIONS
  protected readonly firstOptions = FIRST_OPTIONS

  protected value: string | number = 'standard'

  protected readonly basicSource = BASIC_SOURCE
  protected readonly verticalSource = VERTICAL_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly optionProps = OPTION_PROPS
  protected readonly cssVars = CSS_VARS

  protected setValue(v: string | number): void {
    this.value = v
  }
}
