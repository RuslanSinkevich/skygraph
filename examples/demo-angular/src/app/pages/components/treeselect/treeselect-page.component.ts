import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgTreeSelectComponent, type SgTreeNode } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const ORG_TREE: SgTreeNode[] = [
  {
    key: 'eng',
    title: 'Engineering',
    children: [
      {
        key: 'eng-web',
        title: 'Web Platform',
        children: [
          { key: 'eng-web-frontend', title: 'Frontend' },
          { key: 'eng-web-backend', title: 'Backend' },
          { key: 'eng-web-devops', title: 'DevOps' },
        ],
      },
      {
        key: 'eng-mobile',
        title: 'Mobile',
        children: [
          { key: 'eng-mobile-ios', title: 'iOS' },
          { key: 'eng-mobile-android', title: 'Android' },
        ],
      },
      { key: 'eng-qa', title: 'QA' },
    ],
  },
  {
    key: 'design',
    title: 'Design',
    children: [
      { key: 'design-product', title: 'Product Design' },
      { key: 'design-research', title: 'UX Research' },
      { key: 'design-brand', title: 'Brand' },
    ],
  },
  {
    key: 'ops',
    title: 'Operations',
    children: [
      { key: 'ops-hr', title: 'HR' },
      { key: 'ops-finance', title: 'Finance', disabled: true },
      { key: 'ops-legal', title: 'Legal' },
    ],
  },
]

const BASIC_SOURCE = `<div
  sg-tree-select
  [treeData]="data"
  [value]="value()"
  (valueChange)="onChange($event)"
  placeholder="Pick a node"
  [treeDefaultExpandAll]="true"
></div>`

const DISABLED_NODES_SOURCE = `<!-- ops-finance has disabled: true — click does nothing -->
<div sg-tree-select [treeData]="data" placeholder="A node is disabled"></div>`

const SIZES_SOURCE = `<div sg-tree-select size="small" [treeData]="data" placeholder="small"></div>
<div sg-tree-select [treeData]="data" placeholder="middle (default)"></div>
<div sg-tree-select size="large" [treeData]="data" placeholder="large"></div>`

const TOKENS_SOURCE = `<style>
  .indigo-scope {
    --sg-color-primary: #4f46e5;
    --sg-color-primary-bg: #eef2ff;
    --sg-input-radius: 10px;
  }
</style>
<div class="indigo-scope">
  <div sg-tree-select [treeData]="data" placeholder="Indigo theme"></div>
</div>`

const PROPS: PropDef[] = [
  { name: 'treeData', description: 'Tree of nodes (recursive children)', type: 'TreeNodeData[]' },
  { name: 'value', description: 'Controlled selected key', type: 'TreeKey' },
  { name: 'defaultValue', description: 'Initial uncontrolled key', type: 'TreeKey' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires when the user picks a node',
    type: 'EventEmitter<TreeKey>',
  },
  {
    name: 'placeholder',
    description: 'Empty-state text',
    type: 'string',
    default: "'Please select'",
  },
  {
    name: 'treeDefaultExpandAll',
    description: 'Expand every branch on mount',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: 'Disable the whole control', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const NODE_PROPS: PropDef[] = [
  { name: 'key', description: 'Stable id — emitted on selection', type: 'string | number' },
  { name: 'title', description: 'Display text', type: 'string' },
  { name: 'children', description: 'Nested nodes (recursive)', type: 'TreeNodeData[]' },
  {
    name: 'disabled',
    description: 'Disables this node and its subtree',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Selected row colour' },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: 'Selected row background',
  },
  { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: 'Hover row colour' },
  {
    name: 'sg-input-bg',
    default: 'var(--sg-color-bg-container)',
    description: 'Selector background',
  },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Selector border' },
  {
    name: 'sg-input-radius',
    default: 'var(--sg-border-radius)',
    description: 'Selector + dropdown radius',
  },
  { name: 'sg-input-height', default: 'var(--sg-height-md)', description: 'Selector height' },
  { name: 'sg-color-bg-elevated', default: 'var(--sg-gray-1)', description: 'Dropdown background' },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.12)',
    description: 'Dropdown shadow',
  },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: 'Row hover background' },
]

@Component({
  selector: 'sg-tree-select-page',
  standalone: true,
  imports: [
    SgTreeSelectComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="TreeSelect"
      [crumbs]="['Data Entry', 'TreeSelect']"
      description="Single-select on a tree with expand/collapse rows. Pick a node, get its key. Per-node disabled blocks selection."
      [whenToUse]="[
        'For values that live on a tree but expand inline (folders, taxonomy, departments).',
        'When the whole tree fits in memory; use Cascader for strict left-to-right paths.',
        'For multi-select use checkable Tree directly until treeCheckable lands (deferred).',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Pick a node from a flat-rendered tree. treeDefaultExpandAll expands every branch on mount."
        [code]="basicSource"
      >
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div
            sg-tree-select
            [treeData]="data"
            [value]="value()"
            (valueChange)="onChange($event)"
            placeholder="Pick a node"
            [treeDefaultExpandAll]="true"
          ></div>
          <span style="font-size:13px;color:var(--sg-color-text-secondary)">
            value = <code>{{ value() ?? '∅' }}</code>
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled nodes"
        description="Per-node disabled keeps the row visible but unselectable. (ops-finance in the org tree.)"
        [code]="disabledNodesSource"
      >
        <div sg-tree-select [treeData]="data" placeholder="A node is disabled"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes scale the selector height (rows stay at one row-height)."
        [code]="sizesSource"
      >
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div sg-tree-select size="small" [treeData]="data" placeholder="small"></div>
          <div sg-tree-select [treeData]="data" placeholder="middle (default)"></div>
          <div sg-tree-select size="large" [treeData]="data" placeholder="large"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="TreeSelect reuses --sg-input-* + global primary tokens. Scope them on a wrapper to retheme."
        [code]="tokensSource"
      >
        <div class="ng-tree-indigo">
          <div sg-tree-select [treeData]="data" placeholder="Indigo theme"></div>
        </div>
      </sg-demo-box>

      <sg-props-table title="TreeSelect API" [data]="props"></sg-props-table>
      <sg-props-table title="TreeNodeData" [data]="nodeProps"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="TreeSelect inherits the --sg-input-* scope for the selector and global tokens for the dropdown. treeCheckable + showSearch are deferred (F-TreeSelect-Limited)."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-tree-indigo {
        --sg-color-primary: #4f46e5;
        --sg-color-primary-bg: #eef2ff;
        --sg-input-radius: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectPageComponent {
  protected readonly data = ORG_TREE
  protected readonly value = signal<string | number | undefined>(undefined)

  protected readonly basicSource = BASIC_SOURCE
  protected readonly disabledNodesSource = DISABLED_NODES_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly nodeProps = NODE_PROPS
  protected readonly cssVars = CSS_VARS

  protected onChange(v: string | number | undefined): void {
    this.value.set(v)
  }
}
