import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicCollapse } from './collapse/Basic.demo'
import BasicSource from './collapse/Basic.demo?raw'
import { AccordionCollapse } from './collapse/Accordion.demo'
import AccordionSource from './collapse/Accordion.demo?raw'
import { BorderlessCollapse } from './collapse/Borderless.demo'
import BorderlessSource from './collapse/Borderless.demo?raw'
import { GhostCollapse } from './collapse/Ghost.demo'
import GhostSource from './collapse/Ghost.demo?raw'
import { IconPositionCollapse } from './collapse/IconPosition.demo'
import IconPositionSource from './collapse/IconPosition.demo?raw'
import { ExtraCollapse } from './collapse/Extra.demo'
import ExtraSource from './collapse/Extra.demo?raw'
import { DisabledCollapse } from './collapse/Disabled.demo'
import DisabledSource from './collapse/Disabled.demo?raw'
import { NoArrowCollapse } from './collapse/NoArrow.demo'
import NoArrowSource from './collapse/NoArrow.demo?raw'
import { SizesCollapse } from './collapse/Sizes.demo'
import SizesSource from './collapse/Sizes.demo?raw'
import { ControlledCollapse } from './collapse/Controlled.demo'
import ControlledSource from './collapse/Controlled.demo?raw'
import { TokensOverrideCollapse } from './collapse/TokensOverride.demo'
import TokensOverrideSource from './collapse/TokensOverride.demo?raw'
import { UnstyledCollapse } from './collapse/Unstyled.demo'
import UnstyledSource from './collapse/Unstyled.demo?raw'

const collapseProps: PropDef[] = [
  { name: 'items', description: 'Panels to render, each with a stable `key`', type: 'CollapseItem[]', required: true },
  { name: 'activeKey', description: 'Controlled open keys; overrides internal state', type: 'string | string[]' },
  { name: 'defaultActiveKey', description: 'Initial open keys when uncontrolled', type: 'string | string[]' },
  { name: 'onChange', description: 'Fires after the open set changes (array form)', type: '(activeKey: string[]) => void' },
  { name: 'accordion', description: 'Only one panel may be open at a time', type: 'boolean', default: 'false' },
  { name: 'bordered', description: 'Outer border + rounded container', type: 'boolean', default: 'true' },
  { name: 'expandIconPosition', description: 'Chevron placement relative to the header text', type: "'start' | 'end'", default: "'start'" },
  { name: 'ghost', description: 'Transparent style without panel backgrounds / borders', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Header padding / font scale (inherits from ConfigProvider)', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop every sg-collapse-* class (headless mode)', type: 'boolean', default: 'false' },
]

const collapseItemProps: PropDef[] = [
  { name: 'key', description: 'Unique id used for the open set and toggling', type: 'string', required: true },
  { name: 'label', description: 'Header content (text or ReactNode)', type: 'ReactNode', required: true },
  { name: 'children', description: 'Body content revealed when expanded', type: 'ReactNode', required: true },
  { name: 'extra', description: 'Slot rendered on the right edge of the header', type: 'ReactNode' },
  { name: 'showArrow', description: 'Hide the chevron for this panel when `false`', type: 'boolean', default: 'true' },
  { name: 'disabled', description: 'Prevent toggling and dim the header', type: 'boolean', default: 'false' },
]

const collapseCssVars: CssVarDef[] = [
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Panel background' },
  { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.02)', description: 'Idle header background' },
  { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: 'Hovered header background' },
  { name: 'sg-color-border-secondary', default: 'rgba(5, 5, 5, 0.06)', description: 'Outer frame + panel separators' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Header + body text' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: '`extra` slot text colour' },
  { name: 'sg-color-primary', default: '#1677ff', description: 'Header focus-visible outline' },
  { name: 'sg-font-size', default: '14px', description: 'Default header + body font size' },
  { name: 'sg-font-size-sm', default: '12px', description: '`size="small"` header font size' },
  { name: 'sg-font-size-lg', default: '16px', description: '`size="large"` header font size' },
  { name: 'sg-line-height', default: '1.5714', description: 'Paragraph line height inside the body' },
  { name: 'sg-height-sm', default: '24px', description: '`size="small"` min header height' },
  { name: 'sg-height-md', default: '32px', description: '`size="middle"` min header height' },
  { name: 'sg-height-lg', default: '40px', description: '`size="large"` min header height' },
  { name: 'sg-padding-xs', default: '4px', description: '`size="small"` header padding' },
  { name: 'sg-padding-sm', default: '8px', description: '`size="middle"` header v-padding + gap before chevron' },
  { name: 'sg-padding-md', default: '12px', description: '`size="large"` header v-padding' },
  { name: 'sg-padding-lg', default: '16px', description: '`size="middle"` header h-padding' },
  { name: 'sg-padding-xl', default: '20px', description: '`size="large"` header h-padding' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Bordered container corner radius' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Hover + chevron rotation duration' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Shared easing' },
]

export function CollapseDemo() {
  return (
    <ComponentDoc
      title="Collapse"
      description="Vertical accordion-style list of collapsible panels with controlled / accordion modes, per-item extras, and full keyboard support."
      whenToUse={[
        'FAQ pages and help centres — users only want one answer at a time.',
        'Long settings screens split into foldable sections.',
        'Summary rows (billing, team, API keys) with a peek-on-demand body.',
      ]}
    >
      <DemoBox title="Basic" description="Multiple panels open at once." code={BasicSource}>
        <BasicCollapse />
      </DemoBox>

      <DemoBox
        title="Accordion"
        description="Only one panel may be open at a time."
        code={AccordionSource}
      >
        <AccordionCollapse />
      </DemoBox>

      <DemoBox
        title="Borderless"
        description="Drop the outer frame — keep panel separators."
        code={BorderlessSource}
      >
        <BorderlessCollapse />
      </DemoBox>

      <DemoBox
        title="Ghost"
        description="Fully transparent style for overlays and cards."
        code={GhostSource}
      >
        <GhostCollapse />
      </DemoBox>

      <DemoBox
        title="Expand icon position"
        description="Flip the chevron to the end of the header."
        code={IconPositionSource}
      >
        <IconPositionCollapse />
      </DemoBox>

      <DemoBox
        title="Extra slot"
        description="Status tags or action buttons in the header's right edge."
        code={ExtraSource}
      >
        <ExtraCollapse />
      </DemoBox>

      <DemoBox
        title="Disabled items"
        description="Gate a section behind a permission or loading state."
        code={DisabledSource}
      >
        <DisabledCollapse />
      </DemoBox>

      <DemoBox
        title="No arrow"
        description="Per-item `showArrow: false` for headers that don't need a chevron."
        code={NoArrowSource}
      >
        <NoArrowCollapse />
      </DemoBox>

      <DemoBox title="Sizes" description="Small / middle / large." code={SizesSource}>
        <SizesCollapse />
      </DemoBox>

      <DemoBox
        title="Controlled"
        description="Own the open set yourself to add Expand all / Collapse all toolbars."
        code={ControlledSource}
      >
        <ControlledCollapse />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Rebrand via scoped CSS variables — dark panel example."
        code={TokensOverrideSource}
      >
        <TokensOverrideCollapse />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Keep aria + accordion logic, ship your own paint."
        code={UnstyledSource}
      >
        <UnstyledCollapse />
      </DemoBox>

      <PropsTable title="Collapse API" data={collapseProps} />
      <PropsTable title="CollapseItem" data={collapseItemProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Collapse has no component-private tokens. It composes the global surface palette (`--sg-color-bg-*`), border tokens (`--sg-color-border-secondary`), and size scales (`--sg-height-*`, `--sg-padding-*`, `--sg-font-size-*`). Scope those on a wrapper for local rebrands."
        data={collapseCssVars}
      />
    </ComponentDoc>
  )
}
