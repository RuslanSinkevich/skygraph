import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgTransferComponent, type SgTransferItem } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const MOCK: SgTransferItem[] = Array.from({ length: 12 }, (_, i) => ({
  key: `${i}`,
  title: `Content ${i + 1}`,
  description: `Description for content ${i + 1}`,
}))

const ROLE_PERMISSIONS: SgTransferItem[] = [
  { key: 'users.read', title: 'Read users', description: 'View user profiles and lists' },
  { key: 'users.write', title: 'Write users', description: 'Create, edit, delete users' },
  { key: 'billing.read', title: 'Read billing', description: 'View invoices and plans' },
  {
    key: 'billing.write',
    title: 'Write billing',
    description: 'Change plan / payment methods',
    disabled: true,
  },
  { key: 'audit.read', title: 'Read audit log' },
  { key: 'audit.export', title: 'Export audit log' },
]

const BASIC_SOURCE = `<sg-transfer
  [dataSource]="data"
  [targetKeys]="targetKeys()"
  (targetKeysChange)="targetKeys.set($event)"
></sg-transfer>`

const TITLES_SOURCE = `<sg-transfer
  [titles]="['Available', 'Selected']"
  [dataSource]="data"
  [targetKeys]="titleKeys()"
  (targetKeysChange)="titleKeys.set($event)"
></sg-transfer>`

const DISABLED_SOURCE = `<sg-transfer
  [dataSource]="roles"
  [targetKeys]="roleKeys()"
  (targetKeysChange)="roleKeys.set($event)"
></sg-transfer>

<!-- Whole control disabled -->
<sg-transfer
  disabled
  [dataSource]="roles"
  [targetKeys]="roleKeys()"
></sg-transfer>`

const TOKENS_SOURCE = `<style>
  .slate-scope {
    --sg-color-border: #cbd5e1;
    --sg-color-border-secondary: #e2e8f0;
    --sg-color-bg-secondary: #f1f5f9;
    --sg-color-bg-hover: #e0f2fe;
    --sg-color-primary-bg: #bae6fd;
    --sg-border-radius: 10px;
  }
</style>
<div class="slate-scope">
  <sg-transfer
    [dataSource]="data"
    [targetKeys]="tokenKeys()"
    (targetKeysChange)="tokenKeys.set($event)"
  ></sg-transfer>
</div>`

const PROPS: PropDef[] = [
  {
    name: 'dataSource',
    description: 'Full item list — split into source / target based on targetKeys',
    type: 'SgTransferItem[]',
  },
  {
    name: 'targetKeys',
    description: 'Keys currently in the target (right) column',
    type: 'string[]',
  },
  {
    name: 'defaultTargetKeys',
    description: 'Initial uncontrolled target keys',
    type: 'string[]',
  },
  {
    name: '(targetKeysChange)',
    description: 'Emitted whenever items are shuttled between columns',
    type: 'EventEmitter<string[]>',
  },
  {
    name: 'titles',
    description: 'Custom [sourceTitle, targetTitle] header labels',
    type: '[string, string]',
  },
  {
    name: 'disabled',
    description: 'Disable both columns and arrows',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: 'Column borders' },
  { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: 'Row dividers' },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Column background' },
  {
    name: 'sg-color-bg-secondary',
    default: 'var(--sg-gray-2)',
    description: 'List header background',
  },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: 'Row hover background' },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: 'Selected row background',
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Row text colour' },
  { name: 'sg-border-radius', default: '6px', description: 'Column corner radius' },
]

@Component({
  selector: 'sg-transfer-page',
  standalone: true,
  imports: [
    SgTransferComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Transfer"
      [crumbs]="['Data Entry', 'Transfer']"
      description="Two-column shuttle for moving items between an Available and a Selected list with bulk select-all and arrow operations."
      [whenToUse]="[
        'Multi-select where order does not matter — role permissions, tag groups, batch enrollments.',
        'When users need to see both ends of a selection at a glance.',
        'Search, oneWay and custom render are deferred (F-Transfer-Limited).',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Controlled targetKeys — the list is split between source (left) and target (right)."
        [code]="basicSource"
      >
        <sg-transfer
          [dataSource]="data"
          [targetKeys]="targetKeys()"
          (targetKeysChange)="targetKeys.set($event)"
        ></sg-transfer>
        <p style="font-size:12px;color:var(--sg-color-text-secondary);margin-top:8px">
          target = <code>[{{ targetKeys().join(', ') }}]</code>
        </p>
      </sg-demo-box>

      <sg-demo-box
        title="Custom titles"
        description="Rename the two column headers — useful for domain language."
        [code]="titlesSource"
      >
        <sg-transfer
          [titles]="['Available', 'Selected']"
          [dataSource]="data"
          [targetKeys]="titleKeys()"
          (targetKeysChange)="titleKeys.set($event)"
        ></sg-transfer>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled"
        description="Whole control disabled vs per-item disabled on the data object."
        [code]="disabledSource"
      >
        <div style="display:flex;flex-direction:column;gap:24px">
          <sg-transfer
            [dataSource]="roles"
            [targetKeys]="roleKeys()"
            (targetKeysChange)="roleKeys.set($event)"
          ></sg-transfer>
          <sg-transfer disabled [dataSource]="roles" [targetKeys]="roleKeys()"></sg-transfer>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Transfer has no component-local tokens — rebrand via the global palette."
        [code]="tokensSource"
      >
        <div class="ng-tx-slate">
          <sg-transfer
            [dataSource]="data"
            [targetKeys]="tokenKeys()"
            (targetKeysChange)="tokenKeys.set($event)"
          ></sg-transfer>
        </div>
      </sg-demo-box>

      <sg-props-table title="Transfer API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Transfer has no component-local tokens. Rebrand via the global palette (--sg-color-border, --sg-color-bg-secondary, --sg-color-bg-hover, --sg-color-primary-bg). Search, oneWay and custom render are deferred (F-Transfer-Limited)."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-tx-slate {
        --sg-color-border: #cbd5e1;
        --sg-color-border-secondary: #e2e8f0;
        --sg-color-bg-secondary: #f1f5f9;
        --sg-color-bg-hover: #e0f2fe;
        --sg-color-primary-bg: #bae6fd;
        --sg-border-radius: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferPageComponent {
  protected readonly data = MOCK
  protected readonly roles = ROLE_PERMISSIONS

  protected readonly targetKeys = signal<string[]>(['1', '3', '5'])
  protected readonly titleKeys = signal<string[]>(['2', '4'])
  protected readonly roleKeys = signal<string[]>(['users.read', 'billing.write'])
  protected readonly tokenKeys = signal<string[]>(['1', '3'])

  protected readonly basicSource = BASIC_SOURCE
  protected readonly titlesSource = TITLES_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
