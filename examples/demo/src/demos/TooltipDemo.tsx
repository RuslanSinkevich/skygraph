import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicTooltip } from './tooltip/Basic.demo'
import BasicSource from './tooltip/Basic.demo?raw'
import { PlacementTooltip } from './tooltip/Placement.demo'
import PlacementSource from './tooltip/Placement.demo?raw'
import { RichContentTooltip } from './tooltip/RichContent.demo'
import RichContentSource from './tooltip/RichContent.demo?raw'
import { OnDisabledTooltip } from './tooltip/OnDisabled.demo'
import OnDisabledSource from './tooltip/OnDisabled.demo?raw'
import { OnIconTooltip } from './tooltip/OnIcon.demo'
import OnIconSource from './tooltip/OnIcon.demo?raw'
import { TokensOverrideTooltip } from './tooltip/TokensOverride.demo'
import TokensOverrideSource from './tooltip/TokensOverride.demo?raw'
import { UnstyledTooltip } from './tooltip/Unstyled.demo'
import UnstyledSource from './tooltip/Unstyled.demo?raw'

const tooltipProps: PropDef[] = [
  { name: 'title', description: 'Tooltip content — string or ReactNode', type: 'ReactNode' },
  { name: 'placement', description: 'Side of the trigger to show the tip', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'" },
  { name: 'children', description: 'Single element the Tooltip wraps', type: 'ReactElement' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'unstyled', description: 'Drop sg-tooltip-* classes (headless mode)', type: 'boolean', default: 'false' },
]

const tooltipCssVars: CssVarDef[] = [
  { name: 'sg-color-tooltip-bg', default: 'rgba(0, 0, 0, 0.85)', description: 'Tip background + arrow fill' },
  { name: 'sg-color-tooltip-text', default: '#ffffff', description: 'Tip text colour' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Tip text size' },
  { name: 'sg-padding-xs', default: '4px', description: 'Tip vertical padding' },
  { name: 'sg-padding-sm', default: '8px', description: 'Tip horizontal padding' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Tip corner radius' },
  { name: 'sg-shadow', default: '0 6px 16px rgba(0,0,0,0.08)', description: 'Tip elevation' },
  { name: 'sg-z-tooltip', default: '1070', description: 'Stacking layer above dropdowns / popovers' },
]

export function TooltipDemo() {
  return (
    <ComponentDoc
      title="Tooltip"
      description="Hover-triggered help text with four placement options. Content is a full ReactNode; ARIA describedby is wired automatically."
      whenToUse={[
        'Explain an icon or a truncated label on hover.',
        'Surface the reason behind a disabled action.',
        'Show a keyboard shortcut or a full-text value that was clipped.',
      ]}
    >
      <DemoBox title="Basic" description="Hover a child to see the tip." code={BasicSource}>
        <BasicTooltip />
      </DemoBox>

      <DemoBox
        title="Placement"
        description="Four sides, no auto-flip — pick what fits your layout."
        code={PlacementSource}
      >
        <PlacementTooltip />
      </DemoBox>

      <DemoBox
        title="Rich content"
        description="title accepts any ReactNode — wrap wide content in a sized div to override the default nowrap."
        code={RichContentSource}
      >
        <RichContentTooltip />
      </DemoBox>

      <DemoBox
        title="On a disabled element"
        description="Tooltip listens on its wrapper, so disabled children still reveal the tip."
        code={OnDisabledSource}
      >
        <OnDisabledTooltip />
      </DemoBox>

      <DemoBox
        title="On an info icon"
        description="Classic '?' glyph pattern; set tabIndex so keyboard users can focus it."
        code={OnIconSource}
      >
        <OnIconTooltip />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="--sg-color-tooltip-bg and --sg-color-tooltip-text are the only two colour tokens you need."
        code={TokensOverrideSource}
      >
        <TokensOverrideTooltip />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Keep the behaviour + ARIA, swap all painting."
        code={UnstyledSource}
      >
        <UnstyledTooltip />
      </DemoBox>

      <PropsTable title="Tooltip API" data={tooltipProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Tooltip owns two dedicated tokens — `--sg-color-tooltip-bg` and `--sg-color-tooltip-text`. Everything else (padding, radius, shadow, z-index) comes from global tokens. Override them on a scoping wrapper to restyle without touching the global theme."
        data={tooltipCssVars}
      />
    </ComponentDoc>
  )
}
