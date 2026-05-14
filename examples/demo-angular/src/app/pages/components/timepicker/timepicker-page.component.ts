import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgTimePickerComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<div sg-time-picker [value]="value()" (valueChange)="value.set($event)"></div>
<span>{{ value() ? 'Committed: "' + value() + '"' : 'No value yet.' }}</span>`

const FORMAT_SOURCE = `<div sg-time-picker defaultValue="09:00:00" format="HH:mm:ss" placeholder="24h + seconds"></div>
<div sg-time-picker defaultValue="13:45" format="HH:mm" [showSecond]="false" placeholder="24h no seconds"></div>`

const STEPS_SOURCE = `<div sg-time-picker defaultValue="09:00" format="HH:mm" [minuteStep]="15" [showSecond]="false" placeholder="15-minute slots"></div>
<div sg-time-picker defaultValue="00:00" format="HH:mm" [hourStep]="2" [showSecond]="false" placeholder="Every 2 hours"></div>`

const SIZES_SOURCE = `<div sg-time-picker size="small" placeholder="small" format="HH:mm" [showSecond]="false"></div>
<div sg-time-picker placeholder="middle (default)" format="HH:mm" [showSecond]="false"></div>
<div sg-time-picker size="large" placeholder="large" format="HH:mm" [showSecond]="false"></div>`

const STATES_SOURCE = `<div sg-time-picker [disabled]="true" defaultValue="10:30:00"></div>
<div sg-time-picker [allowClear]="false" placeholder="No clear button"></div>`

const TOKENS_SOURCE = `<style>
  .mint-scope {
    --sg-color-primary: #10b981;
    --sg-color-primary-hover: #34d399;
    --sg-color-primary-bg: rgba(16, 185, 129, 0.15);
    --sg-color-border: #6ee7b7;
    --sg-border-radius: 10px;
  }
</style>
<div class="mint-scope">
  <div sg-time-picker defaultValue="09:30:00" placeholder="Mint theme"></div>
</div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled time string in the active format', type: 'string' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'string' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires when a value commits',
    type: 'EventEmitter<string>',
  },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
  {
    name: 'format',
    description: 'Display + parse format — tokens HH / mm / ss',
    type: 'string',
    default: "'HH:mm:ss'",
  },
  {
    name: 'showSecond',
    description: 'Show the seconds column (auto-hides if format omits ss)',
    type: 'boolean',
    default: 'true',
  },
  { name: 'hourStep', description: 'Stride for the hour column', type: 'number', default: '1' },
  { name: 'minuteStep', description: 'Stride for the minute column', type: 'number', default: '1' },
  { name: 'secondStep', description: 'Stride for the second column', type: 'number', default: '1' },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'allowClear',
    description: 'Show × button when a value is selected',
    type: 'boolean',
    default: 'true',
  },
  { name: 'disabled', description: 'Disable the trigger', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Selected row colour' },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: 'Hovered row background',
  },
  {
    name: 'sg-input-bg',
    default: 'var(--sg-color-bg-container)',
    description: 'Trigger background',
  },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Trigger border' },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Dropdown background' },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.12)',
    description: 'Dropdown shadow',
  },
  { name: 'sg-border-radius', default: '6px', description: 'Trigger + dropdown radius' },
]

@Component({
  selector: 'sg-timepicker-page',
  standalone: true,
  imports: [
    SgTimePickerComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="TimePicker"
      [crumbs]="['Data Entry', 'TimePicker']"
      description="24-hour time picker with hour / minute / second columns. Three sizes, step thinning, Now and Clear buttons; emits a string so it round-trips easily."
      [whenToUse]="[
        'For wall-clock times — meetings, deadlines, opening hours.',
        'For appointment slots — set minuteStep=15 to keep the grid clean.',
        '12-hour mode and disabled-slot predicates are deferred (F-TimePicker-Limited).',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Controlled TimePicker. Value is a string in the active format — easy to persist and diff."
        [code]="basicSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <div sg-time-picker [value]="value()" (valueChange)="value.set($event)"></div>
          <span style="font-size:12px;color:var(--sg-color-text-secondary)">
            {{ value() ? 'Committed value: "' + value() + '"' : 'No value yet.' }}
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Format"
        description="format decides display + emitted value. Omit ss to hide the seconds column automatically."
        [code]="formatSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <div
            sg-time-picker
            defaultValue="09:00:00"
            format="HH:mm:ss"
            placeholder="24h + seconds"
          ></div>
          <div
            sg-time-picker
            defaultValue="13:45"
            format="HH:mm"
            [showSecond]="false"
            placeholder="24h no seconds"
          ></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Step controls"
        description="hourStep / minuteStep thin out the column — perfect for appointment slots."
        [code]="stepsSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <div
            sg-time-picker
            defaultValue="09:00"
            format="HH:mm"
            [minuteStep]="15"
            [showSecond]="false"
            placeholder="15-minute slots"
          ></div>
          <div
            sg-time-picker
            defaultValue="00:00"
            format="HH:mm"
            [hourStep]="2"
            [showSecond]="false"
            placeholder="Every 2 hours"
          ></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes match Input / Select / DatePicker heights."
        [code]="sizesSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <div
            sg-time-picker
            size="small"
            placeholder="small"
            format="HH:mm"
            [showSecond]="false"
          ></div>
          <div
            sg-time-picker
            placeholder="middle (default)"
            format="HH:mm"
            [showSecond]="false"
          ></div>
          <div
            sg-time-picker
            size="large"
            placeholder="large"
            format="HH:mm"
            [showSecond]="false"
          ></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="States"
        description="Disabled blocks the dropdown; allowClear=false locks in the value."
        [code]="statesSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <div sg-time-picker [disabled]="true" defaultValue="10:30:00"></div>
          <div sg-time-picker [allowClear]="false" placeholder="No clear button"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="TimePicker has no own tokens; scope the global form / surface tokens to rebrand."
        [code]="tokensSource"
      >
        <div class="ng-tp-mint">
          <div sg-time-picker defaultValue="09:30:00" placeholder="Mint theme"></div>
        </div>
      </sg-demo-box>

      <sg-props-table title="TimePicker API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="TimePicker reuses --sg-input-* + global tokens. 12-hour mode and disabled-slot predicates are deferred (F-TimePicker-Limited)."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-tp-mint {
        --sg-color-primary: #10b981;
        --sg-color-primary-hover: #34d399;
        --sg-color-primary-bg: rgba(16, 185, 129, 0.15);
        --sg-color-border: #6ee7b7;
        --sg-border-radius: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerPageComponent {
  protected readonly value = signal<string>('')

  protected readonly basicSource = BASIC_SOURCE
  protected readonly formatSource = FORMAT_SOURCE
  protected readonly stepsSource = STEPS_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly statesSource = STATES_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
