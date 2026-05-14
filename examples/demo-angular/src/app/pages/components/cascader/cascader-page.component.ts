import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgCascaderComponent, type SgCascaderOption } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const REGION_OPTIONS: SgCascaderOption[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake' },
          { value: 'xiasha', label: 'Xiasha' },
          { value: 'binjiang', label: 'Binjiang' },
        ],
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        children: [
          { value: 'dongqian', label: 'Dongqian Lake' },
          { value: 'yinzhou', label: 'Yinzhou' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          { value: 'zhonghua', label: 'Zhong Hua Men' },
          { value: 'xuanwu', label: 'Xuanwu Lake' },
        ],
      },
      {
        value: 'suzhou',
        label: 'Suzhou',
        children: [
          { value: 'humble', label: 'Humble Administrator Garden' },
          { value: 'tiger', label: 'Tiger Hill' },
        ],
      },
    ],
  },
  {
    value: 'sichuan',
    label: 'Sichuan',
    disabled: true,
    children: [
      {
        value: 'chengdu',
        label: 'Chengdu',
        children: [{ value: 'kuanzhai', label: 'Kuanzhai Alley' }],
      },
    ],
  },
]

const BASIC_SOURCE = `<div
  sg-cascader
  [options]="regions"
  [value]="value()"
  (valueChange)="value.set($event)"
  placeholder="Please select"
></div>`

const DEFAULT_VALUE_SOURCE = `<div
  sg-cascader
  [options]="regions"
  [defaultValue]="['zhejiang', 'hangzhou', 'xihu']"
  placeholder="Has default"
></div>`

const SIZES_SOURCE = `<div sg-cascader size="small" [options]="regions" placeholder="small"></div>
<div sg-cascader [options]="regions" placeholder="middle (default)"></div>
<div sg-cascader size="large" [options]="regions" placeholder="large"></div>`

const DISABLED_SOURCE = `<div
  sg-cascader
  [options]="regions"
  [disabled]="true"
  [defaultValue]="['zhejiang', 'hangzhou', 'xihu']"
></div>
<!-- A disabled option ('Sichuan') is in the data — clicking it does nothing -->
<div sg-cascader [options]="regions" placeholder="Sichuan branch disabled"></div>`

const TOKENS_SOURCE = `<style>
  .lush {
    --sg-color-primary: #16a34a;
    --sg-color-primary-bg: #dcfce7;
    --sg-color-border: #86efac;
    --sg-border-radius: 12px;
  }
</style>
<div class="lush">
  <div sg-cascader [options]="regions" placeholder="Lush green theme"></div>
</div>`

const PROPS: PropDef[] = [
  { name: 'options', description: 'Tree of options (nested children)', type: 'CascaderOption[]' },
  {
    name: 'value',
    description: 'Controlled selection path (array of values)',
    type: '(string | number)[]',
  },
  { name: 'defaultValue', description: 'Initial uncontrolled path', type: '(string | number)[]' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires when the user picks a leaf',
    type: 'EventEmitter<(string | number)[]>',
  },
  {
    name: 'placeholder',
    description: 'Empty-state text',
    type: 'string',
    default: "'Please select'",
  },
  {
    name: 'allowClear',
    description: 'Show the × button when a path is selected',
    type: 'boolean',
    default: 'false',
  },
  { name: 'disabled', description: 'Disable the whole control', type: 'boolean', default: 'false' },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const OPTION_PROPS: PropDef[] = [
  {
    name: 'value',
    description: 'Stable id — appears in the emitted path',
    type: 'string | number',
  },
  { name: 'label', description: 'Display text', type: 'string' },
  { name: 'children', description: 'Nested options (recursive)', type: 'CascaderOption[]' },
  { name: 'disabled', description: 'Disables this option and its subtree', type: 'boolean' },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'Active column highlight + focus ring',
  },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: 'Selected option background',
  },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Dropdown background' },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: 'Row hover background' },
  {
    name: 'sg-color-border',
    default: 'var(--sg-gray-5)',
    description: 'Column dividers + selector border',
  },
  {
    name: 'sg-color-text-placeholder',
    default: 'rgba(0, 0, 0, 0.45)',
    description: 'Placeholder colour',
  },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: 'Disabled row colour',
  },
  { name: 'sg-border-radius', default: '6px', description: 'Selector + dropdown corner radius' },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.08)',
    description: 'Dropdown shadow',
  },
  { name: 'sg-height-md', default: '32px', description: 'Selector height (middle)' },
  { name: 'sg-padding-md', default: '16px', description: 'Row horizontal padding' },
  { name: 'sg-transition-duration', default: '0.2s', description: 'Hover / focus transition' },
]

@Component({
  selector: 'sg-cascader-page',
  standalone: true,
  imports: [
    SgCascaderComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Cascader"
      [crumbs]="['Data Entry', 'Cascader']"
      description="Hierarchical single-select with click-to-expand columns. Pick a category → subcategory → leaf path. Per-option disabled disables the subtree."
      [whenToUse]="[
        'For values defined by a tree path — region/country/city, department/team/role.',
        'When the whole tree is known up front; for huge / async trees see (deferred) loadData.',
        'Use TreeSelect for searchable multi-select on a tree, Select for flat lists.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Three-level region picker. Click a row to drill down; click a leaf to commit."
        [code]="basicSource"
      >
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div
            sg-cascader
            [options]="regions"
            [value]="value()"
            (valueChange)="value.set($event)"
            placeholder="Please select"
          ></div>
          <span style="font-size:13px;color:var(--sg-color-text-secondary)">
            value = <code>[{{ value().join(', ') || '∅' }}]</code>
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Default value"
        description="Provide defaultValue to start at a pre-filled path."
        [code]="defaultValueSource"
      >
        <div
          sg-cascader
          [options]="regions"
          [defaultValue]="['zhejiang', 'hangzhou', 'xihu']"
          placeholder="Has default"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes scale the selector height (the dropdown column is fixed)."
        [code]="sizesSource"
      >
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div sg-cascader size="small" [options]="regions" placeholder="small"></div>
          <div sg-cascader [options]="regions" placeholder="middle (default)"></div>
          <div sg-cascader size="large" [options]="regions" placeholder="large"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled"
        description="disabled on the wrapper turns off everything; per-option disabled (Sichuan) blocks just that branch."
        [code]="disabledSource"
      >
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div
            sg-cascader
            [options]="regions"
            [disabled]="true"
            [defaultValue]="['zhejiang', 'hangzhou', 'xihu']"
          ></div>
          <div sg-cascader [options]="regions" placeholder="Sichuan branch disabled"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Cascader inherits global tokens. Scope them on a wrapper to retheme without touching styles."
        [code]="tokensSource"
      >
        <div class="ng-cascader-lush">
          <div sg-cascader [options]="regions" placeholder="Lush green theme"></div>
        </div>
      </sg-demo-box>

      <sg-props-table title="Cascader API" [data]="props"></sg-props-table>
      <sg-props-table title="CascaderOption" [data]="optionProps"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Cascader reuses global tokens for the selector + dropdown. Multi-select, async loadData, search and changeOnSelect are deferred (F-Cascader-Limited)."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-cascader-lush {
        --sg-color-primary: #16a34a;
        --sg-color-primary-bg: #dcfce7;
        --sg-color-border: #86efac;
        --sg-border-radius: 12px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CascaderPageComponent {
  protected readonly regions = REGION_OPTIONS
  protected readonly value = signal<(string | number)[]>([])

  protected readonly basicSource = BASIC_SOURCE
  protected readonly defaultValueSource = DEFAULT_VALUE_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly optionProps = OPTION_PROPS
  protected readonly cssVars = CSS_VARS
}
