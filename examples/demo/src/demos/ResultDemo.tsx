import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { SuccessResult } from './result/Success.demo'
import SuccessSource from './result/Success.demo?raw'
import { ErrorResult } from './result/Error.demo'
import ErrorSource from './result/Error.demo?raw'
import { InfoWarningResult } from './result/InfoWarning.demo'
import InfoWarningSource from './result/InfoWarning.demo?raw'
import { HttpResult } from './result/Http.demo'
import HttpSource from './result/Http.demo?raw'
import { CustomIconResult } from './result/CustomIcon.demo'
import CustomIconSource from './result/CustomIcon.demo?raw'
import { WithContentResult } from './result/WithContent.demo'
import WithContentSource from './result/WithContent.demo?raw'
import { TokensOverrideResult } from './result/TokensOverride.demo'
import TokensOverrideSource from './result/TokensOverride.demo?raw'
import { UnstyledResult } from './result/Unstyled.demo'
import UnstyledSource from './result/Unstyled.demo?raw'

const resultProps: PropDef[] = [
  { name: 'status', description: 'Outcome preset — decides default icon and tint', type: "'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'", required: true },
  { name: 'title', description: 'Primary heading', type: 'ReactNode', required: true },
  { name: 'subTitle', description: 'Explanatory text under the title', type: 'ReactNode' },
  { name: 'icon', description: 'Override the preset icon — emoji / SVG / any node', type: 'ReactNode' },
  { name: 'extra', description: 'Action buttons row, centred under the subtitle', type: 'ReactNode' },
  { name: 'children', description: 'Optional content panel rendered below `extra`', type: 'ReactNode' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop every sg-result-* class (headless mode)', type: 'boolean', default: 'false' },
]

const resultCssVars: CssVarDef[] = [
  { name: 'sg-color-success', default: '#52c41a', description: 'Icon colour for `status="success"`' },
  { name: 'sg-color-error', default: '#ff4d4f', description: 'Icon colour for `status="error"`' },
  { name: 'sg-color-warning', default: '#faad14', description: 'Icon colour for `status="warning"`' },
  { name: 'sg-color-primary', default: '#1677ff', description: 'Icon colour for `status="info"`' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Icon colour for 404 / 403 / 500 and faded text' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Title colour' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Subtitle colour' },
  { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.02)', description: 'Background for the `children` content panel' },
  { name: 'sg-font-size', default: '14px', description: 'Subtitle size' },
  { name: 'sg-font-size-xl', default: '20px', description: 'Title size' },
  { name: 'sg-line-height', default: '1.5714', description: 'Paragraph line-height' },
  { name: 'sg-padding-lg', default: '16px', description: 'Wrapper h-padding + `children` panel padding' },
  { name: 'sg-padding-xl', default: '20px', description: 'Wrapper v-padding' },
  { name: 'sg-padding-sm', default: '8px', description: 'Gap between `extra` buttons' },
  { name: 'sg-margin-sm', default: '8px', description: 'Gap title → subtitle' },
  { name: 'sg-margin-lg', default: '16px', description: 'Gap icon / subtitle / extra blocks' },
  { name: 'sg-border-radius', default: '6px', description: '`children` panel corner radius' },
]

export function ResultDemo() {
  return (
    <ComponentDoc
      title="Result"
      description="Feedback page layout with preset icons for success / error / info / warning and the classic 404 / 403 / 500 screens."
      whenToUse={[
        'After a destructive or long-running action, when a toast is not enough.',
        'Full-screen error pages (404 / 403 / 500 etc.).',
        'Guided flows (checkout, onboarding) that finish with a confirmation screen.',
      ]}
    >
      <DemoBox title="Success" description="The happy path with a primary CTA." code={SuccessSource}>
        <SuccessResult />
      </DemoBox>

      <DemoBox
        title="Error"
        description="Negative outcome with a recovery CTA."
        code={ErrorSource}
      >
        <ErrorResult />
      </DemoBox>

      <DemoBox
        title="Info & warning"
        description="Softer variants for neutral or attention-needed states."
        code={InfoWarningSource}
      >
        <InfoWarningResult />
      </DemoBox>

      <DemoBox
        title="HTTP errors"
        description="Built-in 404 / 403 / 500 artwork."
        code={HttpSource}
      >
        <HttpResult />
      </DemoBox>

      <DemoBox
        title="Custom icon"
        description="Swap the preset artwork for emoji / SVG / library icon."
        code={CustomIconSource}
      >
        <CustomIconResult />
      </DemoBox>

      <DemoBox
        title="With content"
        description="`children` render inside a soft panel for diagnostics."
        code={WithContentSource}
      >
        <WithContentResult />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Rebrand via CSS variables — status tints + content panel."
        code={TokensOverrideSource}
      >
        <TokensOverrideResult />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Keep aria + structure, bring your own paint."
        code={UnstyledSource}
      >
        <UnstyledResult />
      </DemoBox>

      <PropsTable title="Result API" data={resultProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Result has no component-private tokens — it reads the global status palette (`--sg-color-success/error/warning/primary`) for icon tints and the standard text + spacing tokens for the layout. Scope those on a wrapper to rebrand locally."
        data={resultCssVars}
      />
    </ComponentDoc>
  )
}
