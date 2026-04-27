import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { LineProgress } from './progress/Line.demo'
import LineSource from './progress/Line.demo?raw'
import { CircleProgress } from './progress/Circle.demo'
import CircleSource from './progress/Circle.demo?raw'
import { DynamicProgress } from './progress/Dynamic.demo'
import DynamicSource from './progress/Dynamic.demo?raw'
import { ActiveProgress } from './progress/Active.demo'
import ActiveSource from './progress/Active.demo?raw'
import { CustomColorProgress } from './progress/CustomColor.demo'
import CustomColorSource from './progress/CustomColor.demo?raw'
import { SizesProgress } from './progress/Sizes.demo'
import SizesSource from './progress/Sizes.demo?raw'
import { NoInfoProgress } from './progress/NoInfo.demo'
import NoInfoSource from './progress/NoInfo.demo?raw'
import { TokensOverrideProgress } from './progress/TokensOverride.demo'
import TokensOverrideSource from './progress/TokensOverride.demo?raw'
import { UnstyledProgress } from './progress/Unstyled.demo'
import UnstyledSource from './progress/Unstyled.demo?raw'

const progressProps: PropDef[] = [
  { name: 'percent', description: 'Completion value from 0–100 (clamped)', type: 'number', required: true },
  { name: 'type', description: 'Horizontal bar vs circular ring', type: "'line' | 'circle'", default: "'line'" },
  { name: 'status', description: 'Visual state — `normal` auto-flips to `success` at 100%', type: "'normal' | 'success' | 'error' | 'active'", default: "'normal'" },
  { name: 'showInfo', description: 'Render the percentage label', type: 'boolean', default: 'true' },
  { name: 'strokeWidth', description: 'Bar height (line) or ring thickness (circle), in px', type: 'number' },
  { name: 'strokeColor', description: 'Custom fill colour that overrides the status colour', type: 'string' },
  { name: 'width', description: 'SVG outer size for `type="circle"`', type: 'number', default: '120' },
  { name: 'size', description: 'Picks up size from ConfigProvider; `small` thins the line bar to 6px', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop every sg-progress-* class (headless mode)', type: 'boolean', default: 'false' },
]

const progressCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: '#1677ff', description: 'Filled bar / ring colour for `status="normal" | "active"`' },
  { name: 'sg-color-success', default: '#52c41a', description: 'Filled colour + label tint for `status="success"`' },
  { name: 'sg-color-error', default: '#ff4d4f', description: 'Filled colour + label tint for `status="error"`' },
  { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: 'Line track background + circle trail stroke' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Ring centre label colour' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Line percentage label colour' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Line percentage label size' },
  { name: 'sg-font-size-xl', default: '20px', description: 'Ring percentage label size' },
  { name: 'sg-padding-sm', default: '8px', description: 'Gap between bar and trailing label' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Fill width / stroke-dashoffset transition' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Shared easing' },
]

export function ProgressDemo() {
  return (
    <ComponentDoc
      title="Progress"
      description="Line or circular progress indicator with success/error/active states and a built-in shimmer animation for long-running operations."
      whenToUse={[
        'Uploads, file processing, syncs — any task with a measurable percentage.',
        'Dashboards that track KPI completion against a target.',
        'Wizards / onboarding flows that show how far the user has progressed.',
      ]}
    >
      <DemoBox title="Line" description="Standard horizontal bar with status colours." code={LineSource}>
        <LineProgress />
      </DemoBox>

      <DemoBox
        title="Circle"
        description="SVG ring for compact dashboards and cards."
        code={CircleSource}
      >
        <CircleProgress />
      </DemoBox>

      <DemoBox
        title="Active shimmer"
        description={'`status="active"` sweeps a highlight across the fill.'}
        code={ActiveSource}
      >
        <ActiveProgress />
      </DemoBox>

      <DemoBox
        title="Dynamic"
        description="Drive `percent` from React state; clamping is built-in."
        code={DynamicSource}
      >
        <DynamicProgress />
      </DemoBox>

      <DemoBox
        title="Custom color"
        description="`strokeColor` overrides the status-based theme colour."
        code={CustomColorSource}
      >
        <CustomColorProgress />
      </DemoBox>

      <DemoBox
        title="Sizes & strokeWidth"
        description={'`size="small"` thins the bar; `strokeWidth` wins if you need an exact pixel value.'}
        code={SizesSource}
      >
        <SizesProgress />
      </DemoBox>

      <DemoBox
        title="Hide label"
        description="`showInfo={false}` drops the trailing / inner percentage text."
        code={NoInfoSource}
      >
        <NoInfoProgress />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope the theme primitives to rebrand every bar inside a container."
        code={TokensOverrideSource}
      >
        <TokensOverrideProgress />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Keep clamping + aria, paint the track and fill yourself."
        code={UnstyledSource}
      >
        <UnstyledProgress />
      </DemoBox>

      <PropsTable title="Progress API" data={progressProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Progress has no component-private tokens. The fill follows `--sg-color-primary` / `--sg-color-success` / `--sg-color-error` depending on `status`; the track is `--sg-color-bg-hover`. Override those globals on a wrapper (or on `:root`) to rebrand."
        data={progressCssVars}
      />
    </ComponentDoc>
  )
}
