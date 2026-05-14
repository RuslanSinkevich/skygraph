import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  SgButtonComponent,
  SgColorPickerComponent,
  SgInputComponent,
  type SgColorPickerPreset,
} from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<div sg-colorpicker [value]="color()" (valueChange)="color.set($event)" [showText]="true"></div>
<div [style.background]="color()" class="swatch"></div>`

const FORMATS_SOURCE = `<div sg-colorpicker defaultValue="#52c41a" format="hex" [showText]="true"></div>
<div sg-colorpicker defaultValue="#f5222d" format="rgb" [showText]="true"></div>`

const PRESETS_SOURCE = `<div
  sg-colorpicker
  defaultValue="#1677ff"
  [showText]="true"
  [presets]="presets"
></div>`

const SIZES_SOURCE = `<div sg-colorpicker size="small" defaultValue="#52c41a" [showText]="true"></div>
<div sg-colorpicker defaultValue="#1677ff" [showText]="true"></div>
<div sg-colorpicker size="large" defaultValue="#722ed1" [showText]="true"></div>`

const TRIGGER_SOURCE = `<div sg-colorpicker defaultValue="#1677ff" [showText]="true" trigger="click"></div>
<div sg-colorpicker defaultValue="#fa541c" [showText]="true" trigger="hover"></div>`

const DISABLED_SOURCE = `<div sg-colorpicker defaultValue="#1677ff" [disabled]="true" [showText]="true"></div>
<div sg-colorpicker defaultValue="#52c41a" [disabled]="true"></div>`

const THEME_SWAP_SOURCE = `<div [style.--sg-color-primary]="brand()" [style.--sg-color-primary-hover]="brand()">
  <div sg-colorpicker [value]="brand()" (valueChange)="brand.set($event)" [showText]="true"></div>
  <button sg-button type="primary">Primary button</button>
  <span sg-input placeholder="Focus me to see the new brand tint"></span>
</div>`

const TOKENS_SOURCE = `<style>
  .violet-scope {
    --sg-color-border: #c4b5fd;
    --sg-color-primary: #7c3aed;
    --sg-color-primary-hover: #a855f7;
    --sg-color-primary-bg: rgba(124, 58, 237, 0.15);
    --sg-border-radius: 10px;
    --sg-color-bg-elevated: #f5f3ff;
  }
</style>
<div class="violet-scope">
  <div sg-colorpicker defaultValue="#7c3aed" [showText]="true"></div>
</div>`

const UNSTYLED_SOURCE = `<div class="ng-colorpicker-dark">
  <div sg-colorpicker [unstyled]="true" defaultValue="#38bdf8" [showText]="true"></div>
</div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled colour string in the active format', type: 'string' },
  { name: 'defaultValue', description: 'Initial uncontrolled colour', type: 'string' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires whenever the colour commits',
    type: 'EventEmitter<string>',
  },
  {
    name: 'format',
    description: 'Output format — affects emitted value and trigger label',
    type: "'hex' | 'rgb'",
    default: "'hex'",
  },
  {
    name: 'trigger',
    description: 'How the panel opens',
    type: "'click' | 'hover'",
    default: "'click'",
  },
  {
    name: 'showText',
    description: 'Render the colour text next to the swatch in the trigger',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'presets',
    description: 'Grouped swatch rows under the main panel',
    type: 'ColorPickerPreset[]',
  },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'disabled',
    description: 'Disable the picker',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: 'Drop all SkyGraph classes — keeps the picker logic',
    type: 'boolean',
    default: 'false',
  },
  { name: 'aria-label', description: 'Accessible name for the trigger', type: 'string' },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const PRESET_PROPS: PropDef[] = [
  { name: 'label', description: 'Heading shown above the colour row', type: 'string' },
  { name: 'colors', description: 'Array of colour strings to render', type: 'string[]' },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-color-border',
    default: 'rgba(5, 5, 5, 0.06)',
    description: 'Trigger border + dropdown border',
  },
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'Focus ring on the trigger',
  },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: 'Focus ring glow' },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Dropdown background' },
  { name: 'sg-border-radius', default: '6px', description: 'Trigger + dropdown radius' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Preset swatch radius' },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.12)',
    description: 'Dropdown shadow',
  },
  { name: 'sg-height-md', default: '32px', description: 'Trigger height (middle)' },
]

@Component({
  selector: 'sg-colorpicker-page',
  standalone: true,
  imports: [
    SgColorPickerComponent,
    SgButtonComponent,
    SgInputComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="ColorPicker"
      [crumbs]="['Data Entry', 'ColorPicker']"
      description="Saturation/value square + hue strip + text input. Hex / RGB output, presets, hover or click trigger, and seamless wiring to --sg-color-primary."
      [whenToUse]="[
        'For colour fields in forms — theme builders, document editors.',
        'For toolbars where speed matters — set trigger=hover.',
        'Pair with --sg-color-primary scope to live-preview a brand.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Controlled picker — value is a hex string by default; preview the colour next to the swatch."
        [code]="basicSource"
      >
        <div style="display:flex;gap:16px;align-items:center">
          <div
            sg-colorpicker
            [value]="basicColor()"
            (valueChange)="basicColor.set($event)"
            [showText]="true"
          ></div>
          <div
            aria-hidden="true"
            [style.background]="basicColor()"
            style="width:120px;height:36px;border-radius:8px;border:1px solid var(--sg-color-border)"
          ></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Formats"
        description="format=hex emits '#rrggbb'; format=rgb emits 'rgb(r, g, b)'. Internal HSV math is shared."
        [code]="formatsSource"
      >
        <div style="display:flex;gap:16px;align-items:center">
          <div sg-colorpicker defaultValue="#52c41a" format="hex" [showText]="true"></div>
          <div sg-colorpicker defaultValue="#f5222d" format="rgb" [showText]="true"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Presets"
        description="Grouped swatches under the main panel — brand-approved palettes."
        [code]="presetsSource"
      >
        <div sg-colorpicker defaultValue="#1677ff" [showText]="true" [presets]="presets"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes change trigger height and swatch size."
        [code]="sizesSource"
      >
        <div style="display:flex;gap:16px;align-items:center">
          <div sg-colorpicker size="small" defaultValue="#52c41a" [showText]="true"></div>
          <div sg-colorpicker defaultValue="#1677ff" [showText]="true"></div>
          <div sg-colorpicker size="large" defaultValue="#722ed1" [showText]="true"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Trigger"
        description="trigger=hover opens on mouse enter; keyboard users can still use Enter / Space."
        [code]="triggerSource"
      >
        <div style="display:flex;gap:16px;align-items:center">
          <div sg-colorpicker defaultValue="#1677ff" [showText]="true" trigger="click"></div>
          <div sg-colorpicker defaultValue="#fa541c" [showText]="true" trigger="hover"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled"
        description="Disabled greys out the trigger and stops the panel from opening."
        [code]="disabledSource"
      >
        <div style="display:flex;gap:12px;align-items:center">
          <div sg-colorpicker defaultValue="#1677ff" [disabled]="true" [showText]="true"></div>
          <div sg-colorpicker defaultValue="#52c41a" [disabled]="true"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Theme swap"
        description="Wire the picker straight into --sg-color-primary; every component in the scope inherits the new brand."
        [code]="themeSwapSource"
      >
        <div
          [style.--sg-color-primary]="brand()"
          [style.--sg-color-primary-hover]="brand()"
          [style.--sg-color-primary-bg]="brand() + '20'"
          style="display:grid;gap:12px;max-width:320px"
        >
          <div style="display:flex;gap:12px;align-items:center">
            <div
              sg-colorpicker
              [value]="brand()"
              (valueChange)="brand.set($event)"
              [showText]="true"
            ></div>
            <span style="font-size:12px;color:var(--sg-color-text-secondary)">
              drives --sg-color-primary
            </span>
          </div>
          <button sg-button type="primary">Primary button</button>
          <span sg-input placeholder="Focus me to see the new brand tint"></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Scope the global --sg-color-* + --sg-border-radius* to rebrand the picker alone."
        [code]="tokensSource"
      >
        <div class="ng-colorpicker-violet">
          <div sg-colorpicker defaultValue="#7c3aed" [showText]="true"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled strips every SkyGraph class; HSV math, drag and keyboard handling stay."
        [code]="unstyledSource"
      >
        <div class="ng-colorpicker-dark">
          <div sg-colorpicker [unstyled]="true" defaultValue="#38bdf8" [showText]="true"></div>
        </div>
      </sg-demo-box>

      <sg-props-table title="ColorPicker API" [data]="props"></sg-props-table>
      <sg-props-table title="ColorPickerPreset" [data]="presetProps"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="ColorPicker has no component-specific tokens. Scope the global form / surface tokens on a wrapper to retheme."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-colorpicker-violet {
        --sg-color-border: #c4b5fd;
        --sg-color-primary: #7c3aed;
        --sg-color-primary-hover: #a855f7;
        --sg-color-primary-bg: rgba(124, 58, 237, 0.15);
        --sg-border-radius: 10px;
        --sg-border-radius-sm: 6px;
        --sg-color-bg-elevated: #f5f3ff;
      }
      :host ::ng-deep .ng-colorpicker-dark {
        padding: 12px;
        background: #0f172a;
        color: #e2e8f0;
        border-radius: 8px;
        width: fit-content;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerPageComponent {
  protected readonly basicColor = signal('#1677ff')
  protected readonly brand = signal('#1677ff')

  protected readonly presets: SgColorPickerPreset[] = [
    {
      label: 'Brand',
      colors: ['#1677ff', '#722ed1', '#eb2f96', '#f5222d', '#fa8c16', '#52c41a'],
    },
    {
      label: 'Neutrals',
      colors: ['#000000', '#434343', '#8c8c8c', '#bfbfbf', '#f0f0f0', '#ffffff'],
    },
  ]

  protected readonly basicSource = BASIC_SOURCE
  protected readonly formatsSource = FORMATS_SOURCE
  protected readonly presetsSource = PRESETS_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly triggerSource = TRIGGER_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly themeSwapSource = THEME_SWAP_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly presetProps = PRESET_PROPS
  protected readonly cssVars = CSS_VARS
}
