import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent, SgCollapseComponent, type SgCollapseItem } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const SAMPLE_ITEMS: SgCollapseItem[] = [
  {
    key: '1',
    label: 'What is Skycode?',
    content:
      'A multi-framework UI kit with a shared CSS contract — React, Vue, and Angular speak the same DOM.',
  },
  {
    key: '2',
    label: 'When should I use it?',
    content:
      'When you ship the same product across frameworks or want consistent UI across micro-frontends.',
  },
  {
    key: '3',
    label: 'Where do I start?',
    content:
      'Pick the framework package, register provideSgConfig and import the components you need.',
  },
]

const BASIC_SOURCE = `<div sg-collapse [items]="sampleItems" [defaultActiveKey]="['1']"></div>`

const ACCORDION_SOURCE = `<div sg-collapse [items]="sampleItems" accordion defaultActiveKey="1"></div>`

const CONTROLLED_SOURCE = `<button sg-button size="small" (click)="expandAll()">Expand all</button>
<button sg-button size="small" (click)="collapseAll()">Collapse all</button>

<div sg-collapse [items]="sampleItems" [activeKey]="active()" (activeKeyChange)="active.set($event)"></div>`

const BORDERLESS_SOURCE = `<div sg-collapse [items]="sampleItems" [bordered]="false" [defaultActiveKey]="['1']"></div>`

const GHOST_SOURCE = `<div sg-collapse [items]="sampleItems" ghost [defaultActiveKey]="['2']"></div>`

const SIZES_SOURCE = `<div sg-collapse size="small" [items]="sampleItems" [defaultActiveKey]="['1']"></div>
<div sg-collapse [items]="sampleItems" [defaultActiveKey]="['1']"></div>
<div sg-collapse size="large" [items]="sampleItems" [defaultActiveKey]="['1']"></div>`

const NO_ARROW_SOURCE = `<div
  sg-collapse
  [defaultActiveKey]="['1']"
  [items]="[
    { key: '1', label: 'Spoiler-free header', showArrow: false, content: 'No chevron next to me.' },
    { key: '2', label: 'Regular header', content: 'Chevron visible on this one.' },
  ]"
></div>`

const ICON_POSITION_SOURCE = `<div
  sg-collapse
  [items]="sampleItems"
  expandIconPosition="end"
  [defaultActiveKey]="['1']"
></div>`

const DISABLED_SOURCE = `<div
  sg-collapse
  [defaultActiveKey]="['1']"
  [items]="[
    { key: '1', label: 'Open me', content: 'Regular panel.' },
    { key: '2', label: 'Locked — needs admin', content: 'Never visible.', disabled: true },
    { key: '3', label: 'Also open', content: 'Another regular panel.' },
  ]"
></div>`

const EXTRA_SOURCE = `<div
  sg-collapse
  [defaultActiveKey]="['billing']"
  [items]="extraItems"
></div>`

const TOKENS_SOURCE = `<style>
  .dark-scope {
    --sg-color-bg-container: #1f2937;
    --sg-color-bg-secondary: #111827;
    --sg-color-bg-hover: #374151;
    --sg-color-text: #f9fafb;
    --sg-color-text-secondary: #cbd5e1;
    --sg-color-border-secondary: #334155;
    --sg-border-radius-lg: 10px;
    padding: 16px;
    background: #0f172a;
    border-radius: 12px;
  }
</style>
<div class="dark-scope">
  <div sg-collapse [items]="sampleItems" [defaultActiveKey]="['1']"></div>
</div>`

const UNSTYLED_SOURCE = `<div sg-collapse unstyled className="my-collapse" [items]="sampleItems" [defaultActiveKey]="['1']"></div>

.my-collapse button {
  background: none;
  border: none;
  padding: 8px 12px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-top: 1px solid #e2e8f0;
}
.my-collapse button[aria-expanded='true'] {
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
}
.my-collapse button:first-of-type {
  border-top: none;
}
.my-collapse > div {
  padding: 8px 12px;
  color: #475569;
}`

const PROPS: PropDef[] = [
  { name: 'items', description: 'Array of panel descriptors', type: 'SgCollapseItem[]' },
  {
    name: 'activeKey',
    description: 'Controlled open keys',
    type: 'string | string[]',
  },
  {
    name: 'defaultActiveKey',
    description: 'Initial uncontrolled open keys',
    type: 'string | string[]',
  },
  {
    name: '(activeKeyChange)',
    description: 'Fires when the open set changes',
    type: 'EventEmitter<string[]>',
  },
  { name: 'accordion', description: 'Single-open mode', type: 'boolean', default: 'false' },
  {
    name: 'bordered',
    description: 'Outer border + panel dividers',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'ghost',
    description: 'Drop borders / panel backgrounds',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'expandIconPosition',
    description: 'Place the chevron at the leading or trailing edge',
    type: "'start' | 'end'",
    default: "'start'",
  },
  {
    name: 'size',
    description: 'Three preset sizes',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'unstyled',
    description: 'Drop every sg-collapse-* class — keep keyboard / aria plumbing only',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const ITEM_PROPS: PropDef[] = [
  { name: 'key', description: 'Stable identifier', type: 'string' },
  { name: 'label', description: 'Header text', type: 'string' },
  { name: 'content', description: 'Panel body (plain string in current build)', type: 'string' },
  { name: 'extra', description: 'Trailing slot — status tag, count, etc.', type: 'string' },
  {
    name: 'showArrow',
    description: 'Hide the chevron when false',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'disabled',
    description: 'Gate the panel — no toggle',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Panel background' },
  { name: 'sg-color-bg-secondary', default: 'var(--sg-gray-2)', description: 'Header background' },
  {
    name: 'sg-color-bg-hover',
    default: 'var(--sg-gray-3)',
    description: 'Header hover background',
  },
  { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: 'Panel divider' },
  { name: 'sg-color-text', default: 'rgba(0,0,0,0.88)', description: 'Body text colour' },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0,0,0,0.65)',
    description: 'Header text colour',
  },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Outer corner radius' },
]

@Component({
  selector: 'sg-collapse-page',
  standalone: true,
  imports: [
    SgCollapseComponent,
    SgButtonComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Collapse"
      [crumbs]="['Data Display', 'Collapse']"
      description="Stack of expandable panels. Multi-open by default; toggle accordion for single-open. Headers handle keyboard + ARIA."
      [whenToUse]="[
        'For FAQs, settings groups, optional configuration blocks.',
        'For revealing detail in dense lists without leaving the page.',
        'For grouped form sections — combine with the ghost variant inside cards.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Multi-open mode. defaultActiveKey seeds the open set."
        [code]="basicSource"
      >
        <div sg-collapse [items]="sampleItems" [defaultActiveKey]="['1']"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Accordion"
        description="accordion enforces single-open — click again to close."
        [code]="accordionSource"
      >
        <div sg-collapse [items]="sampleItems" accordion defaultActiveKey="1"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Controlled"
        description="Pass activeKey + (activeKeyChange) to own the open set."
        [code]="controlledSource"
      >
        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;gap:8px">
            <button sg-button size="small" (click)="expandAll()">Expand all</button>
            <button sg-button size="small" (click)="collapseAll()">Collapse all</button>
          </div>
          <div
            sg-collapse
            [items]="sampleItems"
            [activeKey]="active()"
            (activeKeyChange)="onActiveChange($event)"
          ></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Borderless"
        description="bordered=false drops the outer frame but keeps panel separators."
        [code]="borderlessSource"
      >
        <div sg-collapse [items]="sampleItems" [bordered]="false" [defaultActiveKey]="['1']"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Ghost"
        description="ghost drops borders + backgrounds — stealth FAQ list."
        [code]="ghostSource"
      >
        <div sg-collapse [items]="sampleItems" ghost [defaultActiveKey]="['2']"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes inherited from ConfigProvider."
        [code]="sizesSource"
      >
        <div style="display:flex;flex-direction:column;gap:16px">
          <div sg-collapse size="small" [items]="sampleItems" [defaultActiveKey]="['1']"></div>
          <div sg-collapse [items]="sampleItems" [defaultActiveKey]="['1']"></div>
          <div sg-collapse size="large" [items]="sampleItems" [defaultActiveKey]="['1']"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="No arrow"
        description="Per-item showArrow=false hides the chevron — useful for permanently-visible panels."
        [code]="noArrowSource"
      >
        <div sg-collapse [items]="noArrowItems" [defaultActiveKey]="['1']"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Icon position"
        description="expandIconPosition=end flips the chevron to the trailing edge (classic FAQ)."
        [code]="iconPositionSource"
      >
        <div
          sg-collapse
          [items]="sampleItems"
          expandIconPosition="end"
          [defaultActiveKey]="['1']"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled item"
        description="Per-item disabled greys the header and blocks toggling."
        [code]="disabledSource"
      >
        <div sg-collapse [items]="disabledItems" [defaultActiveKey]="['1']"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Extra slot"
        description="Each item.extra renders to the right of the header (string only in current build)."
        [code]="extraSource"
      >
        <div sg-collapse [items]="extraItems" [defaultActiveKey]="['billing']"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Collapse has no component tokens — re-skin via global surface + border tokens."
        [code]="tokensSource"
      >
        <div class="ng-collapse-dark">
          <div sg-collapse [items]="sampleItems" [defaultActiveKey]="['1']"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops every class but keeps the keyboard / aria plumbing and accordion logic."
        [code]="unstyledSource"
      >
        <div class="ng-collapse-headless">
          <div
            sg-collapse
            unstyled
            className=""
            [items]="sampleItems"
            [defaultActiveKey]="['1']"
          ></div>
        </div>
      </sg-demo-box>

      <sg-props-table title="Collapse API" [data]="props"></sg-props-table>
      <sg-props-table title="SgCollapseItem" [data]="itemProps"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Collapse inherits the surface palette. Rich content (D2) — content is a string in current build."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-collapse-dark {
        --sg-color-bg-container: #1f2937;
        --sg-color-bg-secondary: #111827;
        --sg-color-bg-hover: #374151;
        --sg-color-text: #f9fafb;
        --sg-color-text-secondary: #cbd5e1;
        --sg-color-border-secondary: #334155;
        --sg-border-radius-lg: 10px;
        padding: 16px;
        background: #0f172a;
        border-radius: 12px;
      }
      :host ::ng-deep .ng-collapse-headless {
        font-family: monospace;
        font-size: 13px;
      }
      :host ::ng-deep .ng-collapse-headless button {
        background: none;
        border: none;
        padding: 8px 12px;
        width: 100%;
        text-align: left;
        cursor: pointer;
        border-top: 1px solid #e2e8f0;
      }
      :host ::ng-deep .ng-collapse-headless button[aria-expanded='true'] {
        background: #eff6ff;
        color: #1d4ed8;
        font-weight: 600;
      }
      :host ::ng-deep .ng-collapse-headless button:first-of-type {
        border-top: none;
      }
      :host ::ng-deep .ng-collapse-headless > div > div {
        padding: 8px 12px;
        color: #475569;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsePageComponent {
  protected readonly sampleItems = SAMPLE_ITEMS

  protected readonly noArrowItems: SgCollapseItem[] = [
    { key: '1', label: 'Spoiler-free header', showArrow: false, content: 'No chevron next to me.' },
    { key: '2', label: 'Regular header', content: 'Chevron visible on this one.' },
  ]

  protected readonly disabledItems: SgCollapseItem[] = [
    { key: '1', label: 'Open me', content: 'Regular panel.' },
    { key: '2', label: 'Locked — needs admin', content: 'Never visible.', disabled: true },
    { key: '3', label: 'Also open', content: 'Another regular panel.' },
  ]

  protected readonly extraItems: SgCollapseItem[] = [
    {
      key: 'billing',
      label: 'Billing information',
      extra: 'Up to date',
      content: 'Visa •••• 4242 — next invoice 1 May.',
    },
    {
      key: 'team',
      label: 'Team members',
      extra: '3 pending',
      content: 'Alice, Bob, Charlie — invites sent 3 days ago.',
    },
    {
      key: 'danger',
      label: 'Danger zone',
      extra: 'Reset',
      content: 'Reset API keys and invalidate every session.',
    },
  ]

  protected readonly active = signal<string[]>(['1'])

  protected readonly basicSource = BASIC_SOURCE
  protected readonly accordionSource = ACCORDION_SOURCE
  protected readonly controlledSource = CONTROLLED_SOURCE
  protected readonly borderlessSource = BORDERLESS_SOURCE
  protected readonly ghostSource = GHOST_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly noArrowSource = NO_ARROW_SOURCE
  protected readonly iconPositionSource = ICON_POSITION_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly extraSource = EXTRA_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly itemProps = ITEM_PROPS
  protected readonly cssVars = CSS_VARS

  protected expandAll(): void {
    this.active.set(this.sampleItems.map((i) => i.key))
  }
  protected collapseAll(): void {
    this.active.set([])
  }
  protected onActiveChange(keys: string[]): void {
    this.active.set(keys)
  }
}
