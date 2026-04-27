import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicSteps } from './steps/Basic.demo'
import BasicSource from './steps/Basic.demo?raw'
import { ClickableSteps } from './steps/Clickable.demo'
import ClickableSource from './steps/Clickable.demo?raw'
import { VerticalSteps } from './steps/Vertical.demo'
import VerticalSource from './steps/Vertical.demo?raw'
import { ErrorStatusSteps } from './steps/ErrorStatus.demo'
import ErrorStatusSource from './steps/ErrorStatus.demo?raw'
import { CustomIconSteps } from './steps/CustomIcon.demo'
import CustomIconSource from './steps/CustomIcon.demo?raw'
import { SizesSteps } from './steps/Sizes.demo'
import SizesSource from './steps/Sizes.demo?raw'
import { NavigationSteps } from './steps/Navigation.demo'
import NavigationSource from './steps/Navigation.demo?raw'
import { TokensOverrideSteps } from './steps/TokensOverride.demo'
import TokensOverrideSource from './steps/TokensOverride.demo?raw'
import { UnstyledSteps } from './steps/Unstyled.demo'
import UnstyledSource from './steps/Unstyled.demo?raw'

const stepsProps: PropDef[] = [
  { name: 'current', description: 'Zero-based index of the active step', type: 'number' },
  { name: 'items', description: 'Ordered steps', type: 'StepItem[]' },
  { name: 'direction', description: 'Layout direction', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
  { name: 'onChange', description: 'Fires when a step is clicked. Presence of the prop also marks steps as clickable', type: '(current: number) => void' },
  { name: 'type', description: 'Visual variant — default (numbered) or navigation (tab-like underline)', type: "'default' | 'navigation'", default: "'default'" },
  { name: 'size', description: 'Icon / font preset — inherits from ConfigProvider', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'className', description: 'Extra class on the root', type: 'string' },
  { name: 'style', description: 'Inline style on the root', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop all sg-steps-* styling; keep `data-status` on each row', type: 'boolean', default: 'false' },
]

const stepItemProps: PropDef[] = [
  { name: 'title', description: 'Primary step title', type: 'ReactNode' },
  { name: 'description', description: 'Secondary line below the title', type: 'ReactNode' },
  { name: 'icon', description: 'Custom icon (replaces number / check)', type: 'ReactNode' },
  { name: 'status', description: 'Force a status (overrides the one derived from `current`)', type: "'wait' | 'process' | 'finish' | 'error'" },
]

const stepsCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: '#1677ff', description: 'Fill for the current step + finished tail / ring colour' },
  { name: 'sg-color-error', default: '#ff4d4f', description: '`status="error"` ring, label, and navigation underline' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Default title colour' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: '`status="wait"` title + icon text' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Description text colour' },
  { name: 'sg-color-border', default: '#d9d9d9', description: 'Icon ring for `wait` / default step' },
  { name: 'sg-color-border-secondary', default: '#f0f0f0', description: 'Tail connector between steps' },
  { name: 'sg-color-white', default: '#ffffff', description: 'Label colour inside the filled `process` ring' },
  { name: 'sg-font-size', default: '14px', description: 'Title font size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Description + `size="small"` title size' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Custom-icon font size inside the ring' },
  { name: 'sg-padding-sm', default: '8px', description: 'Gap between icon and content' },
  { name: 'sg-padding-lg', default: '16px', description: 'Padding for vertical items + navigation-mode items' },
  { name: 'sg-margin-xs', default: '4px', description: 'Gap between title and description' },
  { name: 'sg-margin-sm', default: '8px', description: 'Horizontal tail outer margin' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Status transitions' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Shared easing' },
]

export function StepsDemo() {
  return (
    <ComponentDoc
      title="Steps"
      badge="Navigation"
      crumbs={['Navigation', 'Steps']}
      description="Guide the user through a linear sequence. Auto-derives `finish / process / wait` from the `current` index; each item can override with its own `status`."
      whenToUse={[
        'When a task is complex and breaks into ordered subtasks.',
        'When a long form should be split into navigable stages.',
      ]}
    >
      <DemoBox title="Basic" description="Horizontal steps with auto-derived statuses." code={BasicSource}>
        <BasicSteps />
      </DemoBox>

      <DemoBox
        title="Clickable"
        description="Passing `onChange` turns steps into buttons."
        code={ClickableSource}
      >
        <ClickableSteps />
      </DemoBox>

      <DemoBox
        title="Vertical"
        description="Stack for sidebars and tall wizards."
        code={VerticalSource}
      >
        <VerticalSteps />
      </DemoBox>

      <DemoBox
        title="Error status"
        description="Per-item `status` overrides `current`."
        code={ErrorStatusSource}
      >
        <ErrorStatusSteps />
      </DemoBox>

      <DemoBox
        title="Custom icon"
        description="Drop in any node; colour still follows the step status."
        code={CustomIconSource}
      >
        <CustomIconSteps />
      </DemoBox>

      <DemoBox title="Sizes" description="`small` and default icon rings." code={SizesSource}>
        <SizesSteps />
      </DemoBox>

      <DemoBox
        title="Navigation"
        description="Underlined-tab variant without icons."
        code={NavigationSource}
      >
        <NavigationSteps />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Finished / process colour follows `--sg-color-primary`."
        code={TokensOverrideSource}
      >
        <TokensOverrideSteps />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="No classes — only `data-status` + the items you provide."
        code={UnstyledSource}
      >
        <UnstyledSteps />
      </DemoBox>

      <PropsTable title="Steps API" data={stepsProps} />
      <PropsTable title="StepItem" data={stepItemProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Steps has no component-local tokens — everything is sourced from the global palette. Rebrand by scoping `--sg-color-primary` (finish / process) and `--sg-color-error` on a wrapper."
        data={stepsCssVars}
      />
    </ComponentDoc>
  )
}
