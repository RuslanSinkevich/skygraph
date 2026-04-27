import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { TypesButton } from './button/Types.demo'
import TypesSource from './button/Types.demo?raw'
import { SizesButton } from './button/Sizes.demo'
import SizesSource from './button/Sizes.demo?raw'
import { LoadingButton } from './button/Loading.demo'
import LoadingSource from './button/Loading.demo?raw'
import { DisabledButton } from './button/Disabled.demo'
import DisabledSource from './button/Disabled.demo?raw'
import { WithIconButton } from './button/WithIcon.demo'
import WithIconSource from './button/WithIcon.demo?raw'
import { ComponentTokensButton } from './button/ComponentTokens.demo'
import ComponentTokensSource from './button/ComponentTokens.demo?raw'
import { ScopedBrandButton } from './button/ScopedBrand.demo'
import ScopedBrandSource from './button/ScopedBrand.demo?raw'
import { UnstyledButton } from './button/Unstyled.demo'
import UnstyledSource from './button/Unstyled.demo?raw'

const buttonProps: PropDef[] = [
  { name: 'type', description: 'Visual variant', type: "'default' | 'primary' | 'dashed' | 'text' | 'link'", default: "'default'" },
  { name: 'size', description: 'Button size (inherits from ConfigProvider)', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Disable the button (also inherits from ConfigProvider)', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show an inline Spin; sets aria-busy and blocks clicks', type: 'boolean', default: 'false' },
  { name: 'htmlType', description: 'Native HTML button type attribute', type: "'button' | 'submit' | 'reset'", default: "'button'" },
  { name: 'onClick', description: 'Click handler', type: '(e: MouseEvent<HTMLButtonElement>) => void' },
  { name: 'children', description: 'Button content — text, icon, or both', type: 'ReactNode' },
  { name: 'className', description: 'Extra class on the root button element', type: 'string' },
  { name: 'style', description: 'Inline style on the root button element', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop all sg-button-* classes (keeps aria / disabled / loading semantics)', type: 'boolean', default: 'false' },
]

const buttonCssVars: CssVarDef[] = [
  { name: 'sg-btn-height', default: 'var(--sg-height-md)', description: 'Button height (local token — falls back to the global size scale)' },
  { name: 'sg-btn-padding', default: '0 var(--sg-padding-md)', description: 'Horizontal padding' },
  { name: 'sg-btn-radius', default: 'var(--sg-border-radius)', description: 'Corner radius — bump to 999px for pill buttons' },
  { name: 'sg-btn-font-size', default: 'var(--sg-font-size)', description: 'Label font size' },
  { name: 'sg-btn-bg', default: 'transparent', description: 'Background (primary overrides to `--sg-color-primary`)' },
  { name: 'sg-btn-color', default: 'var(--sg-color-text)', description: 'Label colour' },
  { name: 'sg-btn-border', default: 'var(--sg-color-border)', description: 'Border colour' },
  { name: 'sg-color-primary', default: '#1677ff', description: '`type="primary" | "link"` base colour + focus ring' },
  { name: 'sg-color-primary-hover', default: '#4096ff', description: 'Hover colour for primary / link / default' },
  { name: 'sg-color-primary-active', default: '#0958d9', description: 'Active / pressed colour' },
  { name: 'sg-color-primary-bg', default: '#e6f4ff', description: 'Focus ring glow' },
  { name: 'sg-color-white', default: '#ffffff', description: 'Label colour on `type="primary"`' },
  { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: '`type="text"` hover background' },
  { name: 'sg-color-bg-disabled', default: 'rgba(0, 0, 0, 0.04)', description: 'Disabled background' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled label colour' },
  { name: 'sg-height-sm', default: '24px', description: '`size="small"` height (via `--sg-btn-height`)' },
  { name: 'sg-height-md', default: '32px', description: '`size="middle"` height' },
  { name: 'sg-height-lg', default: '40px', description: '`size="large"` height' },
  { name: 'sg-padding-xs', default: '4px', description: 'Gap between icon and label' },
  { name: 'sg-padding-sm', default: '8px', description: '`size="small"` horizontal padding' },
  { name: 'sg-padding-md', default: '12px', description: '`size="middle"` horizontal padding' },
  { name: 'sg-padding-lg', default: '16px', description: '`size="large"` horizontal padding' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Hover / focus transition' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Shared easing' },
]

export function ButtonDemo() {
  return (
    <ComponentDoc
      title="Button"
      badge="General"
      crumbs={['General', 'Button']}
      description="Trigger actions. Five visual types, three sizes, loading / disabled states, headless mode, and a dense set of component-local tokens."
      whenToUse={[
        'A button means an operation — clicking it triggers business logic.',
        'Use primary for the call to action, default for secondary, dashed for "add", text / link for inline toolbars.',
      ]}
    >
      <DemoBox title="Types" description="Default, primary, dashed, text, link." code={TypesSource}>
        <TypesButton />
      </DemoBox>

      <DemoBox title="Sizes" description="Small, middle, large." code={SizesSource}>
        <SizesButton />
      </DemoBox>

      <DemoBox
        title="Loading"
        description="Inline Spin + aria-busy + blocked clicks."
        code={LoadingSource}
      >
        <LoadingButton />
      </DemoBox>

      <DemoBox
        title="Disabled"
        description="Dim + aria-disabled across every variant."
        code={DisabledSource}
      >
        <DisabledButton />
      </DemoBox>

      <DemoBox
        title="With icon"
        description="Flex gap keeps icon + label aligned at every size."
        code={WithIconSource}
      >
        <WithIconButton />
      </DemoBox>

      <DemoBox
        title="Component tokens"
        description="Scope --sg-btn-* for a local reshape (pills, chunky, compact)."
        code={ComponentTokensSource}
      >
        <ComponentTokensButton />
      </DemoBox>

      <DemoBox
        title="Scoped brand"
        description="Override --sg-color-primary* to rebrand a subtree."
        code={ScopedBrandSource}
      >
        <ScopedBrandButton />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Drop all CSS, keep the button semantics."
        code={UnstyledSource}
      >
        <UnstyledButton />
      </DemoBox>

      <PropsTable title="Button API" data={buttonProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Button defines its own `--sg-btn-*` scope (height / padding / radius / font-size / bg / color / border) — override those on a wrapper for shape changes. The colour palette is pulled from the global `--sg-color-primary*` + `--sg-color-text*` tokens, so rebrand via the primary palette."
        data={buttonCssVars}
      />
    </ComponentDoc>
  )
}
