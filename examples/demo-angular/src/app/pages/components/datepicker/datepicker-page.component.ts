import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgDatePickerComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<div
  sg-date-picker
  [value]="value()"
  (valueChange)="value.set($event)"
  placeholder="Pick a date"
  [allowClear]="true"
></div>
<span>ISO: {{ value() ? value()!.toISOString() : 'null' }}</span>`

const FORMATS_SOURCE = `<div sg-date-picker placeholder="YYYY-MM-DD" [allowClear]="true"></div>
<div sg-date-picker format="DD.MM.YYYY" placeholder="DD.MM.YYYY" [allowClear]="true"></div>
<div sg-date-picker format="YYYY/MM/DD" placeholder="YYYY/MM/DD" [allowClear]="true"></div>`

const SIZES_SOURCE = `<div sg-date-picker size="small" placeholder="Small" [allowClear]="true"></div>
<div sg-date-picker placeholder="Default" [allowClear]="true"></div>
<div sg-date-picker size="large" placeholder="Large" [allowClear]="true"></div>`

const DISABLED_SOURCE = `<div sg-date-picker [disabled]="true" [value]="today" placeholder="Disabled"></div>`

const TOKENS_SOURCE = `<style>
  .red-scope {
    --sg-color-primary: #ef4444;
    --sg-color-primary-bg: #fee2e2;
    --sg-color-primary-hover: #dc2626;
  }
  .pill-scope { --sg-border-radius: 999px; }
  .dark-scope {
    --sg-color-bg-elevated: #1f2937;
    --sg-color-text: #e5e7eb;
    --sg-color-text-tertiary: #9ca3af;
  }
</style>
<div class="red-scope"><div sg-date-picker placeholder="Red accent" [allowClear]="true"></div></div>
<div class="pill-scope"><div sg-date-picker placeholder="Pill control" [allowClear]="true"></div></div>
<div class="dark-scope"><div sg-date-picker placeholder="Dark dropdown" [allowClear]="true"></div></div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled date value', type: 'Date | null' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'Date | null' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires when a date is committed',
    type: 'EventEmitter<Date | null>',
  },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
  {
    name: 'format',
    description: 'Display format — tokens YYYY / MM / DD',
    type: 'string',
    default: "'YYYY-MM-DD'",
  },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'allowClear',
    description: 'Show a × button when a date is selected',
    type: 'boolean',
    default: 'false',
  },
  { name: 'disabled', description: 'Disable the trigger', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'Selected day background + focus ring',
  },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: 'Hovered day background',
  },
  {
    name: 'sg-color-primary-hover',
    default: 'var(--sg-blue-5)',
    description: 'Today highlight border',
  },
  {
    name: 'sg-input-bg',
    default: 'var(--sg-color-bg-container)',
    description: 'Trigger background',
  },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Trigger border' },
  {
    name: 'sg-input-radius',
    default: 'var(--sg-border-radius)',
    description: 'Trigger corner radius',
  },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Dropdown background' },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.12)',
    description: 'Dropdown shadow',
  },
]

@Component({
  selector: 'sg-datepicker-page',
  standalone: true,
  imports: [
    SgDatePickerComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="DatePicker"
      [crumbs]="['Data Entry', 'DatePicker']"
      description="Single-date picker with month / year navigation, custom format, three sizes and Today highlight."
      [whenToUse]="[
        'For picking a single calendar day — birthday, deadline, due date.',
        'When the value must round-trip to a server in a stable format (YYYY-MM-DD).',
        'Range / time / presets / disabledDate are deferred (F-DatePicker-Limited).',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Controlled single date — onChange delivers the parsed Date."
        [code]="basicSource"
      >
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          <div
            sg-date-picker
            [value]="value()"
            (valueChange)="value.set($event)"
            placeholder="Pick a date"
            [allowClear]="true"
          ></div>
          <span style="font-size:13px;color:var(--sg-color-text-secondary)">
            ISO: <code>{{ value() ? value()!.toISOString() : 'null' }}</code>
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Formats"
        description="format controls both display and parsing — tokens YYYY / MM / DD; anything else is a literal separator."
        [code]="formatsSource"
      >
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <div sg-date-picker placeholder="YYYY-MM-DD" [allowClear]="true"></div>
          <div
            sg-date-picker
            format="DD.MM.YYYY"
            placeholder="DD.MM.YYYY"
            [allowClear]="true"
          ></div>
          <div
            sg-date-picker
            format="YYYY/MM/DD"
            placeholder="YYYY/MM/DD"
            [allowClear]="true"
          ></div>
        </div>
      </sg-demo-box>

      <sg-demo-box title="Sizes" description="Three sizes match form density." [code]="sizesSource">
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
          <div sg-date-picker size="small" placeholder="Small" [allowClear]="true"></div>
          <div sg-date-picker placeholder="Default" [allowClear]="true"></div>
          <div sg-date-picker size="large" placeholder="Large" [allowClear]="true"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled"
        description="Disabled greys the trigger and stops the panel from opening."
        [code]="disabledSource"
      >
        <div sg-date-picker [disabled]="true" [value]="today" placeholder="Disabled"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="DatePicker picks up --sg-color-primary for the selected day, --sg-input-* for the trigger, --sg-color-bg-elevated for the dropdown."
        [code]="tokensSource"
      >
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          <div class="ng-dp-red">
            <div sg-date-picker placeholder="Red accent" [allowClear]="true"></div>
          </div>
          <div class="ng-dp-pill">
            <div sg-date-picker placeholder="Pill control" [allowClear]="true"></div>
          </div>
          <div class="ng-dp-dark">
            <div sg-date-picker placeholder="Dark dropdown" [allowClear]="true"></div>
          </div>
        </div>
      </sg-demo-box>

      <sg-props-table title="DatePicker API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="DatePicker reuses --sg-input-* for the trigger and global tokens for the dropdown. RangePicker / showTime / presets / disabledDate are deferred (F-DatePicker-Limited)."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-dp-red {
        --sg-color-primary: #ef4444;
        --sg-color-primary-bg: #fee2e2;
        --sg-color-primary-hover: #dc2626;
      }
      :host ::ng-deep .ng-dp-pill {
        --sg-border-radius: 999px;
      }
      :host ::ng-deep .ng-dp-dark {
        --sg-color-bg-elevated: #1f2937;
        --sg-color-text: #e5e7eb;
        --sg-color-text-tertiary: #9ca3af;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerPageComponent {
  protected readonly value = signal<Date | null>(null)
  protected readonly today = new Date()

  protected readonly basicSource = BASIC_SOURCE
  protected readonly formatsSource = FORMATS_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
