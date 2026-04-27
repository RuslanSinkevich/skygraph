import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicTransfer } from './transfer/Basic.demo'
import BasicSource from './transfer/Basic.demo?raw'
import { SearchTransfer } from './transfer/Search.demo'
import SearchSource from './transfer/Search.demo?raw'
import { OneWayTransfer } from './transfer/OneWay.demo'
import OneWaySource from './transfer/OneWay.demo?raw'
import { TitlesTransfer } from './transfer/Titles.demo'
import TitlesSource from './transfer/Titles.demo?raw'
import { CustomRenderTransfer } from './transfer/CustomRender.demo'
import CustomRenderSource from './transfer/CustomRender.demo?raw'
import { DisabledTransfer } from './transfer/Disabled.demo'
import DisabledSource from './transfer/Disabled.demo?raw'
import { TokensOverrideTransfer } from './transfer/TokensOverride.demo'
import TokensOverrideSource from './transfer/TokensOverride.demo?raw'

const transferProps: PropDef[] = [
  { name: 'dataSource', description: 'All items — split between source / target via `targetKeys`', type: 'TransferItem[]' },
  { name: 'targetKeys', description: 'Controlled keys on the right-hand list', type: 'string[]' },
  { name: 'defaultTargetKeys', description: 'Initial target keys when uncontrolled', type: 'string[]' },
  { name: 'onChange', description: 'Fires after a move', type: '(targetKeys, direction, moveKeys) => void' },
  { name: 'onSelectChange', description: 'Fires when checkbox selection changes on either list', type: '(sourceSelected, targetSelected) => void' },
  { name: 'showSearch', description: 'Render a search input above each list (matches on `title`)', type: 'boolean', default: 'false' },
  { name: 'titles', description: 'Column headers for [source, target]', type: '[string, string]', default: "['Source', 'Target']" },
  { name: 'render', description: 'Custom label renderer (sits inside the per-row Checkbox)', type: '(item: TransferItem) => ReactNode' },
  { name: 'listStyle', description: 'Inline style applied to each list column', type: 'CSSProperties' },
  { name: 'oneWay', description: 'Hide the move-left button — items only flow to the target', type: 'boolean', default: 'false' },
  { name: 'disabled', description: 'Disable both lists (also inherits from ConfigProvider)', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Extra class on the root', type: 'string' },
  { name: 'style', description: 'Inline style on the root', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop every sg-transfer-* class', type: 'boolean', default: 'false' },
]

const transferItemProps: PropDef[] = [
  { name: 'key', description: 'Stable identifier — presence in `targetKeys` determines side', type: 'string' },
  { name: 'title', description: 'Primary label + default search text', type: 'string' },
  { name: 'description', description: 'Secondary line — rendered via custom `render` only', type: 'string' },
  { name: 'disabled', description: 'Exclude from selection / bulk move', type: 'boolean', default: 'false' },
]

const transferCssVars: CssVarDef[] = [
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'List panel background' },
  { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.04)', description: 'List header background' },
  { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: 'Row hover background' },
  { name: 'sg-color-primary-bg', default: '#e6f4ff', description: 'Selected-row background' },
  { name: 'sg-color-border', default: '#d9d9d9', description: 'Panel outline' },
  { name: 'sg-color-border-secondary', default: '#f0f0f0', description: 'Header / search / pagination dividers' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Body text' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Count / header meta colour' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: '"No data" empty text' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled row text' },
  { name: 'sg-border-radius', default: '6px', description: 'Panel outer radius' },
  { name: 'sg-font-size', default: '14px', description: 'Row font size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Header count + empty text size' },
  { name: 'sg-padding-xs', default: '4px', description: 'Row vertical padding' },
  { name: 'sg-padding-sm', default: '8px', description: 'Header vertical padding + operation button gap' },
  { name: 'sg-padding-md', default: '12px', description: 'Inter-panel gap + horizontal padding' },
  { name: 'sg-padding-xl', default: '24px', description: 'Empty-state padding' },
  { name: 'sg-height-md', default: '32px', description: 'Operation (move) button min width' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Row hover transition' },
]

export function TransferDemo() {
  return (
    <ComponentDoc
      title="Transfer"
      badge="Data Entry"
      crumbs={['Data Entry', 'Transfer']}
      description="Dual-list shuttle for picking a subset of items. Built-in search, select-all, disabled rows, one-way mode and custom row renderer."
      whenToUse={[
        'When you need to split a set into "available" and "selected" — e.g. role permissions, tag selection, audience targeting.',
        'When a multi-Select feels too crowded and reordering isn\'t important.',
      ]}
    >
      <DemoBox title="Basic" description="Controlled via `targetKeys`." code={BasicSource}>
        <BasicTransfer />
      </DemoBox>

      <DemoBox
        title="With search"
        description="Filter each list by title substring."
        code={SearchSource}
      >
        <SearchTransfer />
      </DemoBox>

      <DemoBox
        title="One-way"
        description="Hide the move-left button."
        code={OneWaySource}
      >
        <OneWayTransfer />
      </DemoBox>

      <DemoBox
        title="Titles"
        description="Custom column headers."
        code={TitlesSource}
      >
        <TitlesTransfer />
      </DemoBox>

      <DemoBox
        title="Custom render"
        description="Title + description via the `render` prop."
        code={CustomRenderSource}
      >
        <CustomRenderTransfer />
      </DemoBox>

      <DemoBox
        title="Disabled"
        description="Whole control + per-row `disabled`."
        code={DisabledSource}
      >
        <DisabledTransfer />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Rebrand panels via the global palette."
        code={TokensOverrideSource}
      >
        <TokensOverrideTransfer />
      </DemoBox>

      <PropsTable title="Transfer API" data={transferProps} />
      <PropsTable title="TransferItem" data={transferItemProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Transfer has no component-local tokens. Rebrand via the global palette — the panel chrome uses `--sg-color-border`, `--sg-color-bg-secondary` (header), `--sg-color-bg-hover` (row) and `--sg-color-primary-bg` (selected row)."
        data={transferCssVars}
      />
    </ComponentDoc>
  )
}
