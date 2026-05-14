import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgTagInputComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<div sg-tag-input [defaultValue]="['angular', 'react']" style="width:360px"></div>`

const MAX_SOURCE = `<div
  sg-tag-input
  [defaultValue]="['vue']"
  [maxTags]="5"
  tagColor="success"
  style="width:360px"
></div>`

const COLORS_SOURCE = `<div sg-tag-input [defaultValue]="['ok']" tagColor="success" style="width:360px"></div>
<div sg-tag-input [defaultValue]="['warn']" tagColor="warning" style="width:360px"></div>
<div sg-tag-input [defaultValue]="['err']" tagColor="error" style="width:360px"></div>
<div sg-tag-input [defaultValue]="['busy']" tagColor="processing" style="width:360px"></div>`

const TWO_WAY_SOURCE = `<div sg-tag-input [(value)]="bound" style="width:360px"></div>
<span>{{ bound.length }} tag(s): {{ bound.join(', ') || '—' }}</span>`

const SIZES_SOURCE = `<div sg-tag-input size="small" [defaultValue]="['small']"></div>
<div sg-tag-input [defaultValue]="['middle']"></div>
<div sg-tag-input size="large" [defaultValue]="['large']"></div>`

const STATES_SOURCE = `<div sg-tag-input [defaultValue]="['locked']" [disabled]="true" style="width:360px"></div>
<div sg-tag-input [defaultValue]="['busy']" [loading]="true" style="width:360px"></div>`

const TOKENS_SOURCE = `<style>
  .pink-scope {
    --sg-color-primary: #db2777;
    --sg-color-primary-bg: #fce7f3;
    --sg-color-border: #fbcfe8;
    --sg-border-radius: 999px;
  }
</style>
<div class="pink-scope" style="max-width:380px">
  <div sg-tag-input [defaultValue]="['pink', 'lemonade']"></div>
</div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled tag list', type: 'string[]' },
  { name: 'defaultValue', description: 'Initial uncontrolled tag list', type: 'string[]' },
  {
    name: '(valueChange)',
    description: 'Fires when tags are added or removed',
    type: 'EventEmitter<string[]>',
  },
  {
    name: 'placeholder',
    description: 'Placeholder for the input',
    type: 'string',
    default: "'Add tag...'",
  },
  { name: 'maxTags', description: 'Cap on the total number of tags', type: 'number' },
  {
    name: 'allowDuplicates',
    description: 'Whether duplicates are accepted',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'removable',
    description: 'Show × on each chip',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'tagColor',
    description: 'Chip colour variant',
    type: "'default' | 'success' | 'error' | 'warning' | 'processing'",
    default: "'default'",
  },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: 'Disable the entire field', type: 'boolean', default: 'false' },
  {
    name: 'loading',
    description: 'Disable + apply loading visual',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-input-bg', default: 'var(--sg-color-bg-container)', description: 'Field background' },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Field border' },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: 'Chip background (default variant)',
  },
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'Chip text colour (default variant)',
  },
  { name: 'sg-color-text-tertiary', default: 'rgba(0,0,0,0.45)', description: 'Counter text' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Chip corner radius' },
]

@Component({
  selector: 'sg-taginput-page',
  standalone: true,
  imports: [
    SgTagInputComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="TagInput"
      [crumbs]="['Data Entry', 'TagInput']"
      description="Multi-value chip input. Enter / comma adds a tag, Backspace removes the last one, and paste splits on , ; ↵."
      [whenToUse]="[
        'For free-form tag lists — labels, categories, recipients.',
        'When you want to enforce a cap (maxTags) on the input.',
        'For domain-specific lists where each value is short and stand-alone.',
      ]"
    >
      <sg-demo-box title="Basic" description="Default uncontrolled tag input." [code]="basicSource">
        <div sg-tag-input [defaultValue]="['angular', 'react']" style="width:360px"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Max tags + colour"
        description="maxTags blocks further input; tagColor switches the chip palette."
        [code]="maxSource"
      >
        <div
          sg-tag-input
          [defaultValue]="['vue']"
          [maxTags]="5"
          tagColor="success"
          style="width:360px"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="Colours"
        description="Each tagColor variant shares the Tag palette."
        [code]="colorsSource"
      >
        <div style="display:grid;gap:8px;max-width:380px">
          <div sg-tag-input [defaultValue]="['ok']" tagColor="success"></div>
          <div sg-tag-input [defaultValue]="['warn']" tagColor="warning"></div>
          <div sg-tag-input [defaultValue]="['err']" tagColor="error"></div>
          <div sg-tag-input [defaultValue]="['busy']" tagColor="processing"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Two-way binding"
        description="Use [(value)] for a fully controlled list."
        [code]="twoWaySource"
      >
        <div sg-tag-input [(value)]="bound" style="width:360px"></div>
        <p style="font-size:12px;color:var(--sg-color-text-secondary);margin:8px 0 0">
          {{ bound.length }} tag(s): {{ bound.join(', ') || '—' }}
        </p>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes inherited from ConfigProvider."
        [code]="sizesSource"
      >
        <div style="display:grid;gap:8px;max-width:360px">
          <div sg-tag-input size="small" [defaultValue]="['small']"></div>
          <div sg-tag-input [defaultValue]="['middle']"></div>
          <div sg-tag-input size="large" [defaultValue]="['large']"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="States"
        description="Disabled and loading both block input. Loading shows a busy visual."
        [code]="statesSource"
      >
        <div style="display:grid;gap:8px;max-width:360px">
          <div sg-tag-input [defaultValue]="['locked']" [disabled]="true"></div>
          <div sg-tag-input [defaultValue]="['busy']" [loading]="true"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Rebrand chip palette via global primary + radius tokens."
        [code]="tokensSource"
      >
        <div class="ng-tag-pink">
          <div sg-tag-input [defaultValue]="['pink', 'lemonade']"></div>
        </div>
      </sg-demo-box>

      <sg-props-table title="TagInput API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="TagInput inherits Tag + Input tokens — chip colour follows --sg-color-primary*."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-tag-pink {
        --sg-color-primary: #db2777;
        --sg-color-primary-bg: #fce7f3;
        --sg-color-border: #fbcfe8;
        --sg-border-radius: 999px;
        max-width: 380px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagInputPageComponent {
  protected bound: string[] = []
  protected readonly basicSource = BASIC_SOURCE
  protected readonly maxSource = MAX_SOURCE
  protected readonly colorsSource = COLORS_SOURCE
  protected readonly twoWaySource = TWO_WAY_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly statesSource = STATES_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
