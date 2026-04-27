import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicSegmented } from './segmented/Basic.demo'
import BasicSource from './segmented/Basic.demo?raw'
import { ControlledSegmented } from './segmented/Controlled.demo'
import ControlledSource from './segmented/Controlled.demo?raw'
import { WithIconsSegmented } from './segmented/WithIcons.demo'
import WithIconsSource from './segmented/WithIcons.demo?raw'
import { BlockSegmented } from './segmented/Block.demo'
import BlockSource from './segmented/Block.demo?raw'
import { DisabledSegmented } from './segmented/Disabled.demo'
import DisabledSource from './segmented/Disabled.demo?raw'
import { SizesSegmented } from './segmented/Sizes.demo'
import SizesSource from './segmented/Sizes.demo?raw'
import { TokensOverrideSegmented } from './segmented/TokensOverride.demo'
import TokensOverrideSource from './segmented/TokensOverride.demo?raw'
import { UnstyledSegmented } from './segmented/Unstyled.demo'
import UnstyledSource from './segmented/Unstyled.demo?raw'

const segmentedProps: PropDef[] = [
  { name: 'options', description: 'Segment definitions — plain strings or objects with label/value/icon/disabled', type: "string[] | { label, value, icon?, disabled? }[]" },
  { name: 'value', description: 'Controlled selected value', type: 'string' },
  { name: 'defaultValue', description: 'Uncontrolled initial value (falls back to first option)', type: 'string' },
  { name: 'onChange', description: 'Fired when the selection changes', type: '(value: string) => void' },
  { name: 'block', description: 'Stretch to the full width of the container', type: 'boolean', default: 'false' },
  { name: 'disabled', description: 'Disable the entire control (also inherits from ConfigProvider)', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Height / padding / font-size preset (also inherits from ConfigProvider)', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'className', description: 'Extra class on the root element', type: 'string' },
  { name: 'style', description: 'Inline style on the root element', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop all sg-segmented-* styles and render a native radio group', type: 'boolean', default: 'false' },
]

const segmentedCssVars: CssVarDef[] = [
  { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.04)', description: 'Track background (the rail under the segments)' },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Selected segment "thumb" background' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Selected / hovered label colour' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Idle label colour' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled label colour' },
  { name: 'sg-border-radius', default: '6px', description: 'Outer track radius' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Per-segment radius (inner thumb)' },
  { name: 'sg-shadow-sm', default: '0 1px 2px rgba(0,0,0,0.06)', description: 'Lift for the selected thumb' },
  { name: 'sg-height-sm', default: '24px', description: '`size="small"` segment height' },
  { name: 'sg-height-md', default: '32px', description: '`size="middle"` segment height' },
  { name: 'sg-height-lg', default: '40px', description: '`size="large"` segment height' },
  { name: 'sg-padding-xs', default: '4px', description: 'Gap between icon and label inside a segment' },
  { name: 'sg-padding-sm', default: '8px', description: '`size="small"` horizontal padding' },
  { name: 'sg-padding-md', default: '12px', description: '`size="middle"` horizontal padding' },
  { name: 'sg-padding-lg', default: '16px', description: '`size="large"` horizontal padding' },
  { name: 'sg-font-size-sm', default: '12px', description: '`size="small"` label size' },
  { name: 'sg-font-size', default: '14px', description: '`size="middle"` label size' },
  { name: 'sg-font-size-lg', default: '16px', description: '`size="large"` label size' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Hover / selection transition duration' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Shared easing' },
]

export function SegmentedDemo() {
  return (
    <ComponentDoc
      title="Segmented"
      badge="Data Entry"
      crumbs={['Data Entry', 'Segmented']}
      description="Mutually-exclusive option picker. Lighter than Tabs, richer than a Radio Group."
      whenToUse={[
        'Display a small, fixed set of mutually-exclusive views or modes.',
        'Use instead of Tabs when the options are short, flat, and shown inline (filters, view switchers).',
      ]}
    >
      <DemoBox title="Basic" description="Pass an array of strings and let Segmented do the rest." code={BasicSource}>
        <BasicSegmented />
      </DemoBox>

      <DemoBox
        title="Controlled"
        description="Drive the selection from state to integrate with URLs, reducers or forms."
        code={ControlledSource}
      >
        <ControlledSegmented />
      </DemoBox>

      <DemoBox
        title="With icons"
        description="Pass objects to mix icons and labels — or go icon-only."
        code={WithIconsSource}
      >
        <WithIconsSegmented />
      </DemoBox>

      <DemoBox
        title="Block"
        description="Stretch to container width for full-width toolbars."
        code={BlockSource}
      >
        <BlockSegmented />
      </DemoBox>

      <DemoBox
        title="Disabled"
        description="Disable the whole control or individual options."
        code={DisabledSource}
      >
        <DisabledSegmented />
      </DemoBox>

      <DemoBox title="Sizes" description="Small, middle, large." code={SizesSource}>
        <SizesSegmented />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope the track / thumb tokens to repaint the control."
        code={TokensOverrideSource}
      >
        <TokensOverrideSegmented />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Drop the built-in CSS; keep the radio-group semantics."
        code={UnstyledSource}
      >
        <UnstyledSegmented />
      </DemoBox>

      <PropsTable title="Segmented API" data={segmentedProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Segmented has no component-local tokens. The track uses `--sg-color-bg-secondary`, the selected thumb uses `--sg-color-bg-container` + `--sg-shadow-sm`. Rebrand by scoping those on any wrapper."
        data={segmentedCssVars}
      />
    </ComponentDoc>
  )
}
