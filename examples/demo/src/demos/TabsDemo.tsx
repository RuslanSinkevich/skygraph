import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicTabs } from './tabs/Basic.demo'
import BasicSource from './tabs/Basic.demo?raw'
import { ControlledTabs } from './tabs/Controlled.demo'
import ControlledSource from './tabs/Controlled.demo?raw'
import { SizesTabs } from './tabs/Sizes.demo'
import SizesSource from './tabs/Sizes.demo?raw'
import { RichLabelsTabs } from './tabs/RichLabels.demo'
import RichLabelsSource from './tabs/RichLabels.demo?raw'
import { StatesTabs } from './tabs/States.demo'
import StatesSource from './tabs/States.demo?raw'
import { TokensOverrideTabs } from './tabs/TokensOverride.demo'
import TokensOverrideSource from './tabs/TokensOverride.demo?raw'
import { LineTabs } from './tabs/Line.demo'
import LineSource from './tabs/Line.demo?raw'

const tabsProps: PropDef[] = [
  { name: 'items', description: 'Tab definitions', type: 'TabItem[]' },
  { name: 'activeKey', description: 'Controlled active key', type: 'string' },
  { name: 'defaultActiveKey', description: 'Initial active key (uncontrolled)', type: 'string' },
  { name: 'onChange', description: 'Fires after user interaction changes the active tab', type: '(key: string) => void' },
  {
    name: 'type',
    description: 'Visual style: `card` — bordered tabs attached to the panel; `line` — underline indicator only',
    type: "'card' | 'line'",
    default: "'card'",
  },
  { name: 'size', description: 'Tab list size (inherits from ConfigProvider)', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'className', description: 'Extra class on the root', type: 'string' },
  { name: 'style', description: 'Inline styles on the root', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Opt out of SkyGraph styling', type: 'boolean', default: 'false' },
]

const tabItemProps: PropDef[] = [
  { name: 'key', description: 'Unique identifier — used for active state and ARIA', type: 'string' },
  { name: 'label', description: 'Tab label (ReactNode — icons, badges allowed)', type: 'ReactNode' },
  { name: 'children', description: 'Panel body shown when this tab is active', type: 'ReactNode' },
  { name: 'disabled', description: 'Grey out and block activation', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show spinner, block activation', type: 'boolean', default: 'false' },
]

const tabsCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Active tab label; underline (`line`) or accent on `card`' },
  { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: 'Hovered (inactive) tab label' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Panel body text' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Inactive tab label' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled tab label' },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: '`line`: nav bottom rule; `card`: outer box + tab seams + panel top',
  },
  { name: 'sg-color-bg', default: 'var(--sg-gray-1)', description: '`card`: active tab + panel surface' },
  { name: 'sg-color-bg-secondary', default: 'var(--sg-gray-2)', description: '`card`: inactive tab strip background' },
  { name: 'sg-font-size', default: '14px', description: 'Tab label font size (sm/lg variants override)' },
  { name: 'sg-padding-sm', default: '8px', description: 'Vertical tab padding' },
  { name: 'sg-padding-lg', default: '16px', description: 'Horizontal tab padding' },
  { name: 'sg-padding-xs', default: '4px', description: 'Gap between label text and loading spinner' },
  { name: 'sg-margin-md', default: '16px', description: 'Space between tab list and panel body' },
  { name: 'sg-spin-color', default: 'var(--sg-color-primary) on active tab', description: 'Loading indicator color' },
]

export function TabsDemo() {
  return (
    <ComponentDoc
      title="Tabs"
      description="Switch between related views without leaving the page."
      whenToUse={[
        'When a single resource has multiple views that share context (details / activity / settings).',
        'When you want lightweight navigation that keeps the user on the current screen.',
        'For stepwise flows consider <Steps> instead — Tabs does not imply order.',
      ]}
    >
      <DemoBox title="Basic" description="Default tabs with three panels." code={BasicSource}>
        <BasicTabs />
      </DemoBox>

      <DemoBox
        title="Line"
        description='Underline-only strip — pass type="line" for the flatter look.'
        code={LineSource}
      >
        <LineTabs />
      </DemoBox>

      <DemoBox title="Controlled" description="Drive active key from outside (deep links, wizards)." code={ControlledSource}>
        <ControlledTabs />
      </DemoBox>

      <DemoBox title="Sizes" description="Three sizes for different densities." code={SizesSource}>
        <SizesTabs />
      </DemoBox>

      <DemoBox title="Rich labels" description="Mix badges, icons, and status dots into the label." code={RichLabelsSource}>
        <RichLabelsTabs />
      </DemoBox>

      <DemoBox title="Loading & disabled" description="Per-item flags gate activation." code={StatesSource}>
        <StatesTabs />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description='Scoped --sg-color-primary re-skins the active tab + card seams (default type="card").'
        code={TokensOverrideSource}
      >
        <TokensOverrideTabs />
      </DemoBox>

      <PropsTable title="Tabs API" data={tabsProps} />
      <PropsTable title="TabItem" data={tabItemProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Default `card` uses primary + surface tokens; `line` leans on primary for the underline and text tokens for labels."
        data={tabsCssVars}
      />
    </ComponentDoc>
  )
}
