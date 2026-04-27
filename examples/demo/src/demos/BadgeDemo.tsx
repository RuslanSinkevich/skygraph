import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicBadge } from './badge/Basic.demo'
import BasicSource from './badge/Basic.demo?raw'
import { OverflowBadge } from './badge/Overflow.demo'
import OverflowSource from './badge/Overflow.demo?raw'
import { DotBadge } from './badge/Dot.demo'
import DotSource from './badge/Dot.demo?raw'
import { StatusBadge } from './badge/Status.demo'
import StatusSource from './badge/Status.demo?raw'
import { CustomColorBadge } from './badge/CustomColor.demo'
import CustomColorSource from './badge/CustomColor.demo?raw'
import { OffsetBadge } from './badge/Offset.demo'
import OffsetSource from './badge/Offset.demo?raw'
import { TokensOverrideBadge } from './badge/TokensOverride.demo'
import TokensOverrideSource from './badge/TokensOverride.demo?raw'
import { UnstyledBadge } from './badge/Unstyled.demo'
import UnstyledSource from './badge/Unstyled.demo?raw'

const badgeProps: PropDef[] = [
  { name: 'count', description: 'Number to show; hidden when 0 unless showZero is set', type: 'number' },
  { name: 'dot', description: 'Render a pill-less dot instead of the count', type: 'boolean', default: 'false' },
  { name: 'overflowCount', description: 'Cap at which count becomes "{N}+"', type: 'number', default: '99' },
  { name: 'showZero', description: 'Keep the badge visible when count is 0', type: 'boolean', default: 'false' },
  { name: 'color', description: 'Custom background for the count / dot (any CSS colour)', type: 'string' },
  { name: 'status', description: 'Renders a standalone status dot + text row', type: "'success' | 'error' | 'warning' | 'processing' | 'default'" },
  { name: 'text', description: 'Label shown next to the status dot', type: 'ReactNode' },
  { name: 'offset', description: 'Pixel offset [right, top] applied as right + marginTop', type: '[number, number]' },
  { name: 'children', description: 'Element to pin the badge onto', type: 'ReactNode' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop sg-badge classes (headless mode)', type: 'boolean', default: 'false' },
]

const badgeCssVars: CssVarDef[] = [
  { name: 'sg-color-error', default: '#ff4d4f', description: 'Default count + dot background' },
  { name: 'sg-color-white', default: '#ffffff', description: 'Count text colour' },
  { name: 'sg-color-bg', default: '#ffffff', description: 'Tiny outline around the pinned count / dot' },
  { name: 'sg-color-success', default: '#52c41a', description: 'status="success" dot colour' },
  { name: 'sg-color-warning', default: '#faad14', description: 'status="warning" dot colour' },
  { name: 'sg-color-primary', default: '#1677ff', description: 'status="processing" dot colour (pulses)' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'status="default" dot colour' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Status text colour' },
  { name: 'sg-font-size', default: '14px', description: 'Status text size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Count number size' },
  { name: 'sg-padding-sm', default: '8px', description: 'Gap between status dot and text' },
  { name: 'sg-line-height', default: '1.5714', description: 'Status row line-height' },
  { name: 'sg-z-base', default: '1', description: 'Stacking layer of the pinned count / dot' },
]

export function BadgeDemo() {
  return (
    <ComponentDoc
      title="Badge"
      description="Small numerical counter or status indicator. Pins to a child, or renders as a standalone status row."
      whenToUse={[
        'Show unread / new / pending counts on icons, avatars, menu items.',
        'Display a live process status (connecting, syncing, failed) in a compact row.',
        'Signal "has activity" with a tiny dot when the exact number is not important.',
      ]}
    >
      <DemoBox title="Basic" description="Pin a count onto any element; 0 is hidden unless showZero." code={BasicSource}>
        <BasicBadge />
      </DemoBox>

      <DemoBox
        title="Overflow"
        description="Numbers above overflowCount collapse to '{N}+'."
        code={OverflowSource}
      >
        <OverflowBadge />
      </DemoBox>

      <DemoBox title="Dot" description="Pill-less indicator for 'has activity' signals." code={DotSource}>
        <DotBadge />
      </DemoBox>

      <DemoBox
        title="Status row"
        description="Standalone dot + label; processing pulses."
        code={StatusSource}
      >
        <StatusBadge />
      </DemoBox>

      <DemoBox
        title="Custom colour"
        description="Pass a token reference to stay theme-aware, or a raw hex."
        code={CustomColorSource}
      >
        <CustomColorBadge />
      </DemoBox>

      <DemoBox
        title="Offset"
        description="Nudge the pinned count by [right, top] pixels."
        code={OffsetSource}
      >
        <OffsetBadge />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Swap --sg-color-error to rebrand every count and dot at once."
        code={TokensOverrideSource}
      >
        <TokensOverrideBadge />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Drop every sg-badge class — you own the painting."
        code={UnstyledSource}
      >
        <UnstyledBadge />
      </DemoBox>

      <PropsTable title="Badge API" data={badgeProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Badge composes palette tokens — the count background is `--sg-color-error` by default, status dots follow `--sg-color-{preset}`. Override `color` prop for per-instance colours, or scope the palette tokens on a wrapper for a theme-wide change."
        data={badgeCssVars}
      />
    </ComponentDoc>
  )
}
