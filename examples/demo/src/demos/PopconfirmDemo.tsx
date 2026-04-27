import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicPopconfirm } from './popconfirm/Basic.demo'
import BasicSource from './popconfirm/Basic.demo?raw'
import { WithDescriptionPopconfirm } from './popconfirm/WithDescription.demo'
import WithDescriptionSource from './popconfirm/WithDescription.demo?raw'
import { PlacementPopconfirm } from './popconfirm/Placement.demo'
import PlacementSource from './popconfirm/Placement.demo?raw'
import { DisabledPopconfirm } from './popconfirm/Disabled.demo'
import DisabledSource from './popconfirm/Disabled.demo?raw'
import { InTablePopconfirm } from './popconfirm/InTable.demo'
import InTableSource from './popconfirm/InTable.demo?raw'
import { TokensOverridePopconfirm } from './popconfirm/TokensOverride.demo'
import TokensOverrideSource from './popconfirm/TokensOverride.demo?raw'
import { UnstyledPopconfirm } from './popconfirm/Unstyled.demo'
import UnstyledSource from './popconfirm/Unstyled.demo?raw'

const popconfirmProps: PropDef[] = [
  { name: 'title', description: 'Main confirmation question — shown next to the ⚠ icon', type: 'ReactNode' },
  { name: 'description', description: 'Optional second line below the title', type: 'ReactNode' },
  { name: 'onConfirm', description: 'Fires when the OK button is pressed', type: '() => void' },
  { name: 'onCancel', description: 'Fires when the Cancel button is pressed', type: '() => void' },
  { name: 'okText', description: 'Label of the primary button', type: 'string', default: "'Yes'" },
  { name: 'cancelText', description: 'Label of the secondary button', type: 'string', default: "'No'" },
  { name: 'placement', description: 'Side of the trigger the bubble opens on', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'" },
  { name: 'disabled', description: 'Skip the confirm entirely; trigger fires its own onClick', type: 'boolean', default: 'false' },
  { name: 'children', description: 'Single element that opens the bubble on click', type: 'ReactElement' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'unstyled', description: 'Drop every sg-popconfirm-* class (headless mode)', type: 'boolean', default: 'false' },
]

const popconfirmCssVars: CssVarDef[] = [
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Bubble background + arrow fill' },
  { name: 'sg-color-border-secondary', default: 'rgba(5, 5, 5, 0.04)', description: 'Bubble border + arrow border' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Title colour' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Description colour' },
  { name: 'sg-color-warning', default: '#faad14', description: 'Warning icon colour next to the title' },
  { name: 'sg-color-primary', default: '#1677ff', description: 'Primary OK button — swap to restyle the confirm action' },
  { name: 'sg-font-size', default: '14px', description: 'Title font size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Description font size' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Warning icon size' },
  { name: 'sg-padding-sm', default: '8px', description: 'Icon ↔ title gap + button gap' },
  { name: 'sg-padding-md', default: '12px', description: 'Bubble padding' },
  { name: 'sg-margin-xs', default: '4px', description: 'Title ↔ description gap' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Bubble corner radius' },
  { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0,0,0,0.08)', description: 'Bubble elevation' },
]

export function PopconfirmDemo() {
  return (
    <ComponentDoc
      title="Popconfirm"
      description="Compact confirm dialog anchored to a trigger. Lighter than Modal, more visible than a Tooltip, locked with a focus trap while open."
      whenToUse={[
        'Row-level destructive actions in tables / lists (delete, archive).',
        'Toolbar actions that need a last-chance confirmation but not a modal.',
        'Anywhere you want "Are you sure?" without breaking the flow of the page.',
      ]}
    >
      <DemoBox title="Basic" description="Confirm / cancel callbacks and an inline status line." code={BasicSource}>
        <BasicPopconfirm />
      </DemoBox>

      <DemoBox
        title="Title + description"
        description="Second line under the title, beside the warning icon."
        code={WithDescriptionSource}
      >
        <WithDescriptionPopconfirm />
      </DemoBox>

      <DemoBox
        title="Placement"
        description="Four sides, no auto-flip."
        code={PlacementSource}
      >
        <PlacementPopconfirm />
      </DemoBox>

      <DemoBox
        title="Disabled = pass-through"
        description="With disabled, the trigger's own onClick fires without a bubble."
        code={DisabledSource}
      >
        <DisabledPopconfirm />
      </DemoBox>

      <DemoBox
        title="Row-level delete"
        description="Canonical table usage — placement='left' keeps the bubble inside the body."
        code={InTableSource}
      >
        <InTablePopconfirm />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Retint every surface with --sg-color-bg-elevated, --sg-color-warning, and --sg-color-primary."
        code={TokensOverrideSource}
      >
        <TokensOverridePopconfirm />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Behaviour + focus trap + ARIA; painting is yours."
        code={UnstyledSource}
      >
        <UnstyledPopconfirm />
      </DemoBox>

      <PropsTable title="Popconfirm API" data={popconfirmProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Popconfirm has no dedicated tokens — it reuses the surface + text palette. Swap `--sg-color-warning` to change the icon, `--sg-color-primary` to rebrand the OK button. For pure cosmetic changes (shadow, radius), scope the `*-lg` globals."
        data={popconfirmCssVars}
      />
    </ComponentDoc>
  )
}
