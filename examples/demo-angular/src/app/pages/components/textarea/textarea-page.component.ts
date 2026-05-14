import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgTextareaComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<div
  sg-textarea
  [(value)]="value"
  rows="3"
  placeholder="Leave a comment…"
  style="max-width:420px"
></div>`

const COUNT_SOURCE = `<div
  sg-textarea
  [(value)]="value"
  rows="4"
  [maxLength]="140"
  [showCount]="true"
  placeholder="Tweet-length update (max 140)"
  style="max-width:420px"
></div>`

const STATES_SOURCE = `<div
  sg-textarea
  [disabled]="true"
  defaultValue="This textarea is read-only for now."
  rows="2"
></div>
<div sg-textarea [loading]="true" placeholder="Generating summary…" rows="2"></div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled value', type: 'string' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'string' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires on every keystroke',
    type: 'EventEmitter<string>',
  },
  { name: '(sgBlur)', description: 'Blur event', type: 'EventEmitter<void>' },
  { name: '(sgFocus)', description: 'Focus event', type: 'EventEmitter<void>' },
  { name: 'rows', description: 'Initial visible rows', type: 'number', default: '4' },
  {
    name: 'maxLength',
    description: 'Cap on character count — enforced in the change handler',
    type: 'number',
  },
  {
    name: 'showCount',
    description: 'Renders a "N / max" counter below the field',
    type: 'boolean',
    default: 'false',
  },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'disabled',
    description: 'Disable the textarea',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'loading',
    description: 'Show an inline spinner in the top-right',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
  {
    name: 'unstyled',
    description: 'Drop sg-textarea-* classes (keeps semantics)',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-input-bg', default: 'var(--sg-color-bg-container)', description: 'Background' },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Border colour' },
  { name: 'sg-input-radius', default: 'var(--sg-border-radius)', description: 'Corner radius' },
  { name: 'sg-input-color', default: 'var(--sg-color-text)', description: 'Text colour' },
  { name: 'sg-input-font-size', default: 'var(--sg-font-size)', description: 'Text size' },
  {
    name: 'sg-input-padding',
    default: 'var(--sg-padding-xs) var(--sg-padding-md)',
    description: 'Inner padding',
  },
]

@Component({
  selector: 'sg-textarea-page',
  standalone: true,
  imports: [
    SgTextareaComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Textarea"
      [crumbs]="['Data Entry', 'Textarea']"
      description="Multi-line text input. Shares Input's height / radius tokens; adds rows, maxLength + showCount and a vertical resize handle."
      [whenToUse]="[
        'For multi-line free-form text — comments, descriptions, bios.',
        'When you need a character cap with visible counter (showCount + maxLength).',
        'Use Input for single-line text and Mentions for @-aware editors.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Multiline variant. rows sets the initial height; users can drag the corner to resize."
        [code]="basicSource"
      >
        <div
          sg-textarea
          [(value)]="basic"
          [rows]="3"
          placeholder="Leave a comment…"
          style="max-width:420px"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="Character count"
        description="showCount + maxLength display a live N / max counter and block typing past the cap."
        [code]="countSource"
      >
        <div
          sg-textarea
          [(value)]="bounded"
          [rows]="4"
          [maxLength]="140"
          [showCount]="true"
          placeholder="Tweet-length update (max 140)"
          style="max-width:420px"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="States"
        description="Disabled and loading mirror Input — loading puts a spinner in the top-right and blocks edits."
        [code]="statesSource"
      >
        <div style="display:grid;gap:12px;max-width:420px">
          <div
            sg-textarea
            [disabled]="true"
            defaultValue="This textarea is read-only for now."
            [rows]="2"
          ></div>
          <div sg-textarea [loading]="true" placeholder="Generating summary…" [rows]="2"></div>
        </div>
      </sg-demo-box>

      <sg-props-table title="Textarea API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Textarea shares the --sg-input-* token scope with Input. Override those for shape changes; the counter inherits --sg-font-size-sm."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaPageComponent {
  protected basic = ''
  protected bounded = ''

  protected readonly basicSource = BASIC_SOURCE
  protected readonly countSource = COUNT_SOURCE
  protected readonly statesSource = STATES_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
