import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent, SgCalendarComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<div sg-calendar></div>`

const CONTROLLED_SOURCE = `<button sg-button size="small" (click)="setToday()">Today</button>
<button sg-button size="small" (click)="setJan2030()">Jan 1, 2030</button>
<div sg-calendar [fullscreen]="false" [value]="value()" (valueChange)="value.set($event)"></div>`

const CARD_SOURCE = `<div class="max-w-320">
  <div sg-calendar [fullscreen]="false"></div>
</div>`

const WEEK_NUMBERS_SOURCE = `<div sg-calendar [fullscreen]="false" [weekStartDay]="1"></div>`

const TOKENS_SOURCE = `<style>
  .green-scope {
    --sg-color-primary: var(--sg-green-6, #16a34a);
    --sg-color-primary-bg: var(--sg-green-1, #f6ffed);
    --sg-border-radius-lg: 16px;
    --sg-border-radius-sm: 999px;
  }
</style>
<div class="green-scope" style="max-width:320px">
  <div sg-calendar [fullscreen]="false"></div>
</div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled selected date', type: 'Date' },
  { name: 'defaultValue', description: 'Initial uncontrolled date', type: 'Date' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires when a day is picked',
    type: 'EventEmitter<Date>',
  },
  {
    name: 'fullscreen',
    description: 'Roomy desktop layout vs compact card',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'weekStartDay',
    description: 'First day of week (0 = Sunday, 1 = Monday, …)',
    type: 'number',
    default: '0',
  },
  {
    name: 'showWeekNumber',
    description: 'Render an ISO week column on the left',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'Selected cell background + Today highlight',
  },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: 'Hover background' },
  {
    name: 'sg-color-bg-container',
    default: '#ffffff',
    description: 'Header + day cell background',
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Day number colour' },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: 'Days outside current month',
  },
  { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: 'Grid dividers' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Card / fullscreen corner radius' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Selected day chip radius' },
]

@Component({
  selector: 'sg-calendar-page',
  standalone: true,
  imports: [
    SgCalendarComponent,
    SgButtonComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Calendar"
      [crumbs]="['Data Display', 'Calendar']"
      description="Full-screen or compact month-view calendar with month / year navigation, Today button, configurable week start, and optional ISO week column."
      [whenToUse]="[
        'For schedules, plans and analytics where the date IS the canvas.',
        'For sidebar / popover date widgets — use fullscreen=false.',
        'Year mode, range / multi selection, event markers and cellRender are deferred (F-Calendar-Limited).',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Full-screen uncontrolled calendar — header has month / year nav and Today."
        [code]="basicSource"
      >
        <div sg-calendar></div>
      </sg-demo-box>

      <sg-demo-box
        title="Controlled"
        description="Parent owns the selected date — onChange fires on every pick."
        [code]="controlledSource"
      >
        <div style="display:grid;gap:12px;max-width:340px">
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <span style="color:var(--sg-color-text-secondary)">
              Selected: <strong>{{ value()?.toLocaleDateString() }}</strong>
            </span>
            <button sg-button size="small" (click)="setToday()">Today</button>
            <button sg-button size="small" (click)="setJan2030()">Jan 1, 2030</button>
          </div>
          <div
            sg-calendar
            [fullscreen]="false"
            [value]="value()"
            (valueChange)="onPick($event)"
          ></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Compact card"
        description="fullscreen=false swaps the roomy layout for a sidebar widget."
        [code]="cardSource"
      >
        <div style="max-width:320px">
          <div sg-calendar [fullscreen]="false"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Week numbers / start day"
        description="weekStartDay rotates the columns; combine with custom week-numbering wrappers."
        [code]="weekNumbersSource"
      >
        <div style="max-width:320px">
          <div sg-calendar [fullscreen]="false" [weekStartDay]="1"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Calendar uses only global tokens — scope --sg-color-primary + --sg-border-radius-* to re-skin."
        [code]="tokensSource"
      >
        <div class="ng-cal-green">
          <div sg-calendar [fullscreen]="false"></div>
        </div>
      </sg-demo-box>

      <sg-props-table title="Calendar API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Calendar uses only global tokens. Year mode, range selection, event markers and cellRender are deferred (F-Calendar-Limited)."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-cal-green {
        --sg-color-primary: var(--sg-green-6, #16a34a);
        --sg-color-primary-bg: var(--sg-green-1, #f6ffed);
        --sg-border-radius-lg: 16px;
        --sg-border-radius-sm: 999px;
        max-width: 320px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {
  protected readonly value = signal<Date | null>(new Date())

  protected readonly basicSource = BASIC_SOURCE
  protected readonly controlledSource = CONTROLLED_SOURCE
  protected readonly cardSource = CARD_SOURCE
  protected readonly weekNumbersSource = WEEK_NUMBERS_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS

  protected setToday(): void {
    this.value.set(new Date())
  }

  protected setJan2030(): void {
    this.value.set(new Date(2030, 0, 1))
  }

  protected onPick(d: Date | null): void {
    this.value.set(d)
  }
}
