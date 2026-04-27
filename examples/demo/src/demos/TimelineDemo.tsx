import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicTimeline } from './timeline/Basic.demo'
import BasicSource from './timeline/Basic.demo?raw'
import { RightModeTimeline } from './timeline/RightMode.demo'
import RightModeSource from './timeline/RightMode.demo?raw'
import { AlternateTimeline } from './timeline/Alternate.demo'
import AlternateSource from './timeline/Alternate.demo?raw'
import { WithLabelTimeline } from './timeline/WithLabel.demo'
import WithLabelSource from './timeline/WithLabel.demo?raw'
import { PendingTimeline } from './timeline/Pending.demo'
import PendingSource from './timeline/Pending.demo?raw'
import { ReverseTimeline } from './timeline/Reverse.demo'
import ReverseSource from './timeline/Reverse.demo?raw'
import { CustomDotTimeline } from './timeline/CustomDot.demo'
import CustomDotSource from './timeline/CustomDot.demo?raw'
import { CustomColorTimeline } from './timeline/CustomColor.demo'
import CustomColorSource from './timeline/CustomColor.demo?raw'
import { TokensOverrideTimeline } from './timeline/TokensOverride.demo'
import TokensOverrideSource from './timeline/TokensOverride.demo?raw'
import { UnstyledTimeline } from './timeline/Unstyled.demo'
import UnstyledSource from './timeline/Unstyled.demo?raw'

const timelineProps: PropDef[] = [
  { name: 'items', description: 'Ordered timeline steps', type: 'TimelineItem[]' },
  { name: 'mode', description: 'Axis placement — fixed left / right, or alternating', type: "'left' | 'right' | 'alternate'", default: "'left'" },
  { name: 'pending', description: 'Append a muted pending row. Pass a node for custom copy, `true` for a placeholder', type: 'ReactNode | boolean' },
  { name: 'pendingDot', description: 'Marker for the synthetic pending row', type: 'ReactNode' },
  { name: 'reverse', description: 'Reverse the visual order (including pending)', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Extra class on the root `<ul>`', type: 'string' },
  { name: 'style', description: 'Inline style on the root `<ul>`', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop axis / connector — render a bare list', type: 'boolean', default: 'false' },
]

const timelineItemProps: PropDef[] = [
  { name: 'children', description: 'Row body content', type: 'ReactNode' },
  { name: 'color', description: 'CSS colour applied to the default ring (border + text)', type: 'string' },
  { name: 'dot', description: 'Replace the ring with any node (icon, emoji, letter badge)', type: 'ReactNode' },
  { name: 'label', description: 'Secondary label rendered beside the marker (alternate mode only)', type: 'ReactNode' },
  { name: 'position', description: 'Force left / right for this item (overrides the list `mode`)', type: "'left' | 'right'" },
]

const timelineCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: '#1677ff', description: 'Default ring colour (overridable per-item via `color`)' },
  { name: 'sg-color-bg', default: '#ffffff', description: 'Ring fill (shows inside the 2px border)' },
  { name: 'sg-color-border-secondary', default: '#f0f0f0', description: 'Connector between items' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Row body colour' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: '`label` column text' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Pending row body colour' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Pending row ring colour' },
  { name: 'sg-font-size', default: '14px', description: 'Body font size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Label column font size' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Font size for custom `dot` nodes' },
  { name: 'sg-line-height', default: '1.57', description: 'Content line-height' },
  { name: 'sg-padding-md', default: '12px', description: 'Horizontal padding between axis and content / label' },
  { name: 'sg-padding-xl', default: '24px', description: 'Vertical gap between items' },
  { name: 'sg-margin-xs', default: '4px', description: 'Top margin of the connector line' },
]

export function TimelineDemo() {
  return (
    <ComponentDoc
      title="Timeline"
      badge="Data Display"
      crumbs={['Data Display', 'Timeline']}
      description="Chronological vertical list with axis, dots, optional labels and a pending tail."
      whenToUse={[
        'When a series of events needs to be ordered in time (audit logs, changelogs, delivery tracking).',
        'When you want to connect events visually rather than stacking them as a plain list.',
      ]}
    >
      <DemoBox title="Basic" description="Default left axis with per-item colour tint." code={BasicSource}>
        <BasicTimeline />
      </DemoBox>

      <DemoBox
        title="Right mode"
        description="Push the axis to the right side of the container."
        code={RightModeSource}
      >
        <RightModeTimeline />
      </DemoBox>

      <DemoBox
        title="Alternate"
        description="Events alternate on either side of a central axis."
        code={AlternateSource}
      >
        <AlternateTimeline />
      </DemoBox>

      <DemoBox
        title="With label"
        description="Label column renders in `alternate` mode."
        code={WithLabelSource}
      >
        <WithLabelTimeline />
      </DemoBox>

      <DemoBox
        title="Pending"
        description="Append a muted tail for work still in flight."
        code={PendingSource}
      >
        <PendingTimeline />
      </DemoBox>

      <DemoBox
        title="Reverse"
        description="Flip the order without touching the source array."
        code={ReverseSource}
      >
        <ReverseTimeline />
      </DemoBox>

      <DemoBox
        title="Custom dot"
        description="Replace the ring with any icon or emoji."
        code={CustomDotSource}
      >
        <CustomDotTimeline />
      </DemoBox>

      <DemoBox
        title="Custom colour"
        description="Tint the default ring via the `color` prop."
        code={CustomColorSource}
      >
        <CustomColorTimeline />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Rebrand the axis / connector via scoped CSS variables."
        code={TokensOverrideSource}
      >
        <TokensOverrideTimeline />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Bare `<ul>` — bring your own CSS."
        code={UnstyledSource}
      >
        <UnstyledTimeline />
      </DemoBox>

      <PropsTable title="Timeline API" data={timelineProps} />
      <PropsTable title="TimelineItem" data={timelineItemProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Timeline has no component-local tokens. Rebrand via the global palette: `--sg-color-primary` (rings), `--sg-color-border-secondary` (connector), and the `--sg-color-text*` family (body / label)."
        data={timelineCssVars}
      />
    </ComponentDoc>
  )
}
