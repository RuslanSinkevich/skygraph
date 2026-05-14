import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgDescriptionsComponent, type SgDescriptionsItem } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const USER_ITEMS: SgDescriptionsItem[] = [
  { label: 'Name', value: 'Jane Doe' },
  { label: 'Phone', value: '+1 555 0100' },
  { label: 'Email', value: 'jane@example.com' },
  { label: 'Role', value: 'Engineer' },
  { label: 'Joined', value: '2024-03-12', span: 2 },
]

const INVOICE_ITEMS: SgDescriptionsItem[] = [
  { label: 'Invoice #', value: 'INV-2026-04-0001' },
  { label: 'Issued', value: '2026-04-01' },
  { label: 'Due', value: '2026-04-15' },
  { label: 'Subtotal', value: '$1,950.00' },
  { label: 'Tax (10%)', value: '$195.00' },
  { label: 'Total', value: '$2,145.00', span: 2 },
]

const BASIC_SOURCE = `<div sg-descriptions title="User info" [items]="userItems"></div>`

const BORDERED_SOURCE = `<div sg-descriptions bordered title="User info" [items]="userItems"></div>`

const VERTICAL_SOURCE = `<div
  sg-descriptions
  layout="vertical"
  bordered
  title="Invoice"
  [items]="invoiceItems"
></div>`

const COLUMNS_SOURCE = `<div sg-descriptions [column]="1" bordered title="1 column" [items]="userItems"></div>
<div sg-descriptions [column]="2" bordered title="2 columns" [items]="userItems"></div>
<div sg-descriptions [column]="4" bordered title="4 columns" [items]="userItems"></div>`

const SIZES_SOURCE = `<div sg-descriptions size="small" bordered title="Small" [items]="userItems"></div>
<div sg-descriptions size="middle" bordered title="Middle" [items]="userItems"></div>`

const NO_COLON_SOURCE = `<div sg-descriptions [colon]="false" bordered title="User info" [items]="userItems"></div>`

const TOKENS_SOURCE = `<style>
  .desc-scope {
    padding: 12px;
    --sg-color-bg-secondary: #ede9fe;
    --sg-color-border-secondary: #c4b5fd;
    --sg-color-text-secondary: #5b21b6;
    --sg-border-radius: 12px;
  }
</style>
<div class="desc-scope">
  <div sg-descriptions bordered title="Rebranded" [items]="userItems"></div>
</div>`

const UNSTYLED_SOURCE = `<div
  sg-descriptions
  unstyled
  className="raw-desc"
  title="Raw descriptions"
  [items]="userItems"
></div>

.raw-desc { font-family: system-ui, sans-serif; }
.raw-desc > div:first-child { font-weight: 700; margin-bottom: 10px; }
.raw-desc table { border-collapse: collapse; width: 100%; }
.raw-desc th { text-align: left; padding: 6px 12px 6px 0; color: #475569; font-weight: 500; }
.raw-desc td { padding: 6px 0; }`

const PROPS: PropDef[] = [
  { name: 'items', description: 'Array of { label, value, span? }', type: 'SgDescriptionsItem[]' },
  { name: 'title', description: 'Optional table title', type: 'string' },
  {
    name: 'column',
    description: 'Number of label/value pairs per row',
    type: 'number',
    default: '3',
  },
  {
    name: 'layout',
    description: 'Side-by-side label/value (horizontal) or stacked (vertical)',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
  },
  {
    name: 'bordered',
    description: 'Wrap the table with a rounded border + dividers',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'colon',
    description: 'Append a trailing colon to each label',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'size',
    description: 'Two compact / default visual sizes',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'unstyled',
    description: 'Drop every sg-descriptions-* class — render a bare <table>',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const ITEM_PROPS: PropDef[] = [
  { name: 'label', description: 'Label string', type: 'string' },
  {
    name: 'value',
    description: 'Value string (rich content via TemplateRef is deferred)',
    type: 'string',
  },
  {
    name: 'span',
    description: 'How many columns this item should occupy',
    type: 'number',
    default: '1',
  },
  { name: 'key', description: 'Optional explicit track key', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-color-bg-secondary',
    default: 'var(--sg-gray-2)',
    description: 'Label column background (bordered)',
  },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: 'Row dividers + outer border',
  },
  { name: 'sg-color-text', default: 'rgba(0,0,0,0.88)', description: 'Value text colour' },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0,0,0,0.65)',
    description: 'Label text colour',
  },
  { name: 'sg-border-radius', default: '6px', description: 'Outer corner radius (bordered)' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Typography in size=small' },
]

@Component({
  selector: 'sg-descriptions-page',
  standalone: true,
  imports: [
    SgDescriptionsComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Descriptions"
      [crumbs]="['Data Display', 'Descriptions']"
      description="Compact key-value table for read-only data summaries. Bordered or borderless; horizontal or vertical layout; per-item column spans."
      [whenToUse]="[
        'For profile sheets, invoice summaries, audit dumps.',
        'For consistent key-value blocks across pages — items become the source of truth.',
        'For dense layouts — combine with column for the grid density that fits the design.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Defaults to 3 columns horizontal layout, colon after each label."
        [code]="basicSource"
      >
        <div sg-descriptions title="User info" [items]="userItems"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Bordered"
        description="bordered wraps the table in a rounded border and tints the label column."
        [code]="borderedSource"
      >
        <div sg-descriptions bordered title="User info" [items]="userItems"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Vertical layout"
        description="layout=vertical stacks the label above the content — for long values."
        [code]="verticalSource"
      >
        <div
          sg-descriptions
          layout="vertical"
          bordered
          title="Invoice"
          [items]="invoiceItems"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="Columns"
        description="column sets how many label/value pairs fit per row; per-item span overrides."
        [code]="columnsSource"
      >
        <div style="display:flex;flex-direction:column;gap:24px">
          <div sg-descriptions [column]="1" bordered title="1 column" [items]="userItems"></div>
          <div sg-descriptions [column]="2" bordered title="2 columns" [items]="userItems"></div>
          <div sg-descriptions [column]="4" bordered title="4 columns" [items]="userItems"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Two visual sizes — small (compact) and default."
        [code]="sizesSource"
      >
        <div style="display:flex;flex-direction:column;gap:16px">
          <div sg-descriptions size="small" bordered title="Small" [items]="userItems"></div>
          <div sg-descriptions size="middle" bordered title="Middle" [items]="userItems"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="No colon"
        description="colon=false drops the trailing colon — pair with custom separators."
        [code]="noColonSource"
      >
        <div sg-descriptions [colon]="false" bordered title="User info" [items]="userItems"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Re-skin via --sg-color-bg-secondary, --sg-color-border-secondary, --sg-border-radius."
        [code]="tokensSource"
      >
        <div class="ng-desc-scope">
          <div sg-descriptions bordered title="Rebranded" [items]="userItems"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled renders a bare <table> — labels in <th>, values in <td>."
        [code]="unstyledSource"
      >
        <div
          sg-descriptions
          unstyled
          className="ng-raw-desc"
          title="Raw descriptions"
          [items]="userItems"
        ></div>
      </sg-demo-box>

      <sg-props-table title="Descriptions API" [data]="props"></sg-props-table>
      <sg-props-table title="SgDescriptionsItem" [data]="itemProps"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Descriptions has no component-local tokens. Rich content via TemplateRef is deferred (D2)."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-desc-scope {
        padding: 12px;
        --sg-color-bg-secondary: #ede9fe;
        --sg-color-border-secondary: #c4b5fd;
        --sg-color-text-secondary: #5b21b6;
        --sg-border-radius: 12px;
      }
      :host ::ng-deep .ng-raw-desc {
        font-family: system-ui, sans-serif;
      }
      :host ::ng-deep .ng-raw-desc > div:first-child {
        font-weight: 700;
        margin-bottom: 10px;
      }
      :host ::ng-deep .ng-raw-desc table {
        border-collapse: collapse;
        width: 100%;
      }
      :host ::ng-deep .ng-raw-desc th {
        text-align: left;
        padding: 6px 12px 6px 0;
        color: #475569;
        font-weight: 500;
      }
      :host ::ng-deep .ng-raw-desc td {
        padding: 6px 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionsPageComponent {
  protected readonly userItems = USER_ITEMS
  protected readonly invoiceItems = INVOICE_ITEMS

  protected readonly basicSource = BASIC_SOURCE
  protected readonly borderedSource = BORDERED_SOURCE
  protected readonly verticalSource = VERTICAL_SOURCE
  protected readonly columnsSource = COLUMNS_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly noColonSource = NO_COLON_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly itemProps = ITEM_PROPS
  protected readonly cssVars = CSS_VARS
}
