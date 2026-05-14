import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgSelectComponent, type SgSelectOption } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const CITY_OPTIONS: SgSelectOption[] = [
  { label: 'Moscow', value: 'moscow' },
  { label: 'Berlin', value: 'berlin' },
  { label: 'Tokyo', value: 'tokyo' },
  { label: 'New York', value: 'ny' },
  { label: 'São Paulo', value: 'sp' },
]

const PRIORITY_OPTIONS: SgSelectOption[] = [
  { label: 'Critical', value: 'p0' },
  { label: 'High', value: 'p1' },
  { label: 'Normal', value: 'p2' },
  { label: 'Low', value: 'p3' },
]

const NUMBER_OPTIONS: SgSelectOption[] = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: 3 },
]

const FRUIT_OPTIONS: SgSelectOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Pear', value: 'pear' },
  { label: 'Mango', value: 'mango' },
  { label: 'Kiwi', value: 'kiwi' },
]

const BASIC_SOURCE = `<div
  sg-select
  placeholder="Choose a city"
  [options]="cityOptions"
  [(value)]="value"
></div>`

const UNCONTROLLED_SOURCE = `<div
  sg-select
  [defaultValue]="'p2'"
  [options]="priorityOptions"
  (valueChange)="log($event)"
></div>`

const SIZES_SOURCE = `<div sg-select size="small" placeholder="Small" [options]="numberOptions"></div>
<div sg-select placeholder="Default" [options]="numberOptions"></div>
<div sg-select size="large" placeholder="Large" [options]="numberOptions"></div>`

const DISABLED_SOURCE = `<div sg-select [disabled]="true" [defaultValue]="'moscow'" [options]="cityOptions"></div>
<div sg-select placeholder="One option disabled" [options]="withDisabledRow"></div>`

const LOADING_SOURCE = `<div sg-select [loading]="true" placeholder="Fetching options…" [options]="[]"></div>
<div sg-select placeholder="Pick a worker" [options]="workerOptions"></div>`

const NUMERIC_SOURCE = `<div sg-select [(value)]="numericValue" [options]="numberOptions"></div>
<span>value: <code>{{ numericValue | json }}</code> (typeof <code>{{ typeofValue }}</code>)</span>`

const TOKENS_SOURCE = `<style>
  .scope-tall { --sg-input-height: 44px; --sg-input-radius: 14px; }
  .scope-green {
    --sg-color-primary: #059669;
    --sg-color-primary-bg: #d1fae5;
    --sg-color-primary-hover: #047857;
  }
  .scope-dark {
    --sg-input-bg: #0f172a;
    --sg-input-color: #e2e8f0;
    --sg-input-border: #1e293b;
    --sg-color-text-placeholder: #64748b;
  }
</style>
<div class="scope-tall"><div sg-select placeholder="Tall & rounded" [options]="fruits"></div></div>
<div class="scope-green"><div sg-select placeholder="Branded green" [options]="fruits"></div></div>
<div class="scope-dark"><div sg-select placeholder="Dark input" [options]="fruits"></div></div>`

const UNSTYLED_SOURCE = `<div
  sg-select
  [unstyled]="true"
  placeholder="Native select"
  [defaultValue]="'berlin'"
  [options]="cityOptions"
  style="padding:6px 10px;border-radius:4px"
></div>`

const SELECT_PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled value', type: 'string | number' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'string | number' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires when the user picks an option',
    type: 'EventEmitter<string | number>',
  },
  { name: '(sgBlur)', description: 'Blur event', type: 'EventEmitter<void>' },
  { name: 'options', description: 'List of selectable rows', type: 'SgSelectOption[]' },
  { name: 'placeholder', description: 'Empty-state text', type: 'string', default: "'Select...'" },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'disabled',
    description: 'Disable the whole control',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'loading',
    description: 'Show a spinner and disable input — useful while fetching options',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'multiple',
    description: 'Multi-select — value becomes an array (Angular extension)',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: 'Render a native <select> with no SkyGraph styling',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const OPTION_PROPS: PropDef[] = [
  { name: 'label', description: 'Display text', type: 'string' },
  { name: 'value', description: 'Stable id — emitted via valueChange', type: 'string | number' },
  {
    name: 'disabled',
    description: 'Visible but not selectable',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'loading',
    description: 'Mark the row as "still syncing" — does not block selection',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-input-height', default: 'var(--sg-height-md)', description: 'Selector height' },
  {
    name: 'sg-input-padding',
    default: 'var(--sg-padding-xs) var(--sg-padding-md)',
    description: 'Inner padding',
  },
  { name: 'sg-input-bg', default: 'var(--sg-color-bg-container)', description: 'Background' },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Border colour' },
  { name: 'sg-input-radius', default: 'var(--sg-border-radius)', description: 'Corner radius' },
  { name: 'sg-input-color', default: 'var(--sg-color-text)', description: 'Text colour' },
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Focus ring colour' },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: 'Active option background',
  },
  {
    name: 'sg-color-bg-elevated',
    default: 'var(--sg-gray-1)',
    description: 'Dropdown background',
  },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.12)',
    description: 'Dropdown shadow',
  },
  {
    name: 'sg-color-text-placeholder',
    default: 'rgba(0, 0, 0, 0.25)',
    description: 'Placeholder colour',
  },
  {
    name: 'sg-spin-color',
    default: 'var(--sg-color-text-tertiary)',
    description: 'Inline spinner colour',
  },
]

@Component({
  selector: 'sg-select-page',
  standalone: true,
  imports: [
    SgSelectComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Select"
      [crumbs]="['Data Entry', 'Select']"
      description="Single-select combobox with keyboard navigation. Five visual sizes, disabled and loading states (both for the control and per option), numeric or string values, and headless mode."
      [whenToUse]="[
        'For picking one option from a short to medium list.',
        'For numeric IDs — value keeps its original type (string OR number).',
        'For richer cases use AutoComplete (free text), Cascader (nested) or TreeSelect (tree).',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Controlled select with two-way binding."
        [code]="basicSource"
      >
        <div
          sg-select
          placeholder="Choose a city"
          [options]="cityOptions"
          [value]="basicValue"
          (valueChange)="setBasic($event)"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="Uncontrolled"
        description="Provide defaultValue and read the current pick via (valueChange)."
        [code]="uncontrolledSource"
      >
        <div
          sg-select
          [defaultValue]="'p2'"
          [options]="priorityOptions"
          (valueChange)="log($event)"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes — match form/toolbar density."
        [code]="sizesSource"
      >
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
          <div sg-select size="small" placeholder="Small" [options]="numberOptions"></div>
          <div sg-select placeholder="Default" [options]="numberOptions"></div>
          <div sg-select size="large" placeholder="Large" [options]="numberOptions"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled"
        description="disabled on the wrapper turns off everything; per-option disabled keeps the row visible but unselectable."
        [code]="disabledSource"
      >
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <div sg-select [disabled]="true" [defaultValue]="'moscow'" [options]="cityOptions"></div>
          <div sg-select placeholder="One option disabled" [options]="withDisabledRow"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Loading"
        description="loading on the wrapper shows a spinner; per-option loading marks one row as syncing."
        [code]="loadingSource"
      >
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <div
            sg-select
            [loading]="true"
            placeholder="Fetching options…"
            [options]="emptyOpts"
          ></div>
          <div sg-select placeholder="Pick a worker" [options]="workerOptions"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Numeric values"
        description="value can be number OR string — the original type is preserved when emitted."
        [code]="numericSource"
      >
        <div style="display:flex;gap:12px;align-items:center">
          <div
            sg-select
            [value]="numericValue"
            (valueChange)="setNumeric($event)"
            [options]="numberOptions"
          ></div>
          <span style="font-size:13px;color:var(--sg-color-text-secondary)">
            value: <code>{{ numericValueJson() }}</code> (typeof <code>{{ numericType() }}</code
            >)
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Select shares --sg-input-* tokens with Input. Scope them on a wrapper to retheme."
        [code]="tokensSource"
      >
        <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
          <div class="ng-select-tall">
            <div sg-select placeholder="Tall & rounded" [options]="fruitOptions"></div>
          </div>
          <div class="ng-select-green">
            <div sg-select placeholder="Branded green" [options]="fruitOptions"></div>
          </div>
          <div class="ng-select-dark">
            <div sg-select placeholder="Dark input" [options]="fruitOptions"></div>
          </div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops all SkyGraph styling — bring your own CSS."
        [code]="unstyledSource"
      >
        <div
          sg-select
          [unstyled]="true"
          placeholder="Native select"
          [defaultValue]="'berlin'"
          [options]="cityOptions"
          style="padding:6px 10px;border-radius:4px;border:1px solid var(--sg-color-border)"
        ></div>
      </sg-demo-box>

      <sg-props-table title="Select API" [data]="selectProps"></sg-props-table>
      <sg-props-table title="SelectOption" [data]="optionProps"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Select shares the --sg-input-* token scope with Input. The dropdown uses --sg-color-bg-elevated + --sg-shadow-lg; per-option highlight uses --sg-color-primary-bg."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-select-tall {
        --sg-input-height: 44px;
        --sg-input-radius: 14px;
      }
      :host ::ng-deep .ng-select-green {
        --sg-color-primary: #059669;
        --sg-color-primary-bg: #d1fae5;
        --sg-color-primary-hover: #047857;
      }
      :host ::ng-deep .ng-select-dark {
        --sg-input-bg: #0f172a;
        --sg-input-color: #e2e8f0;
        --sg-input-border: #1e293b;
        --sg-color-text-placeholder: #64748b;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent {
  protected readonly cityOptions = CITY_OPTIONS
  protected readonly priorityOptions = PRIORITY_OPTIONS
  protected readonly numberOptions = NUMBER_OPTIONS
  protected readonly fruitOptions = FRUIT_OPTIONS
  protected readonly emptyOpts: SgSelectOption[] = []
  protected readonly withDisabledRow: SgSelectOption[] = [
    ...CITY_OPTIONS,
    { label: 'Unavailable', value: 'x', disabled: true },
  ]
  protected readonly workerOptions: SgSelectOption[] = [
    { label: 'worker-01 (ready)', value: 'w1' },
    { label: 'worker-02 (syncing…)', value: 'w2', loading: true },
    { label: 'worker-03 (offline)', value: 'w3', disabled: true },
  ]

  protected basicValue: string | number = ''
  protected numericValue: string | number = 2

  protected readonly basicSource = BASIC_SOURCE
  protected readonly uncontrolledSource = UNCONTROLLED_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly loadingSource = LOADING_SOURCE
  protected readonly numericSource = NUMERIC_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly selectProps = SELECT_PROPS
  protected readonly optionProps = OPTION_PROPS
  protected readonly cssVars = CSS_VARS

  protected numericValueJson(): string {
    return JSON.stringify(this.numericValue)
  }

  protected numericType(): string {
    return typeof this.numericValue
  }

  protected setBasic(v: string | number | (string | number)[]): void {
    this.basicValue = v as string | number
  }

  protected setNumeric(v: string | number | (string | number)[]): void {
    this.numericValue = v as string | number
  }

  protected log(v: string | number | (string | number)[]): void {
    console.log('picked', v)
  }
}
