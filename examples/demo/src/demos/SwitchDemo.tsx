import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicSwitch } from './switch/Basic.demo'
import BasicSource from './switch/Basic.demo?raw'
import { TextIconSwitch } from './switch/TextIcon.demo'
import TextIconSource from './switch/TextIcon.demo?raw'
import { SizesSwitch } from './switch/Sizes.demo'
import SizesSource from './switch/Sizes.demo?raw'
import { StatesSwitch } from './switch/States.demo'
import StatesSource from './switch/States.demo?raw'
import { AsyncToggleSwitch } from './switch/AsyncToggle.demo'
import AsyncToggleSource from './switch/AsyncToggle.demo?raw'
import { InFormSwitch } from './switch/InForm.demo'
import InFormSource from './switch/InForm.demo?raw'
import { TokensOverrideSwitch } from './switch/TokensOverride.demo'
import TokensOverrideSource from './switch/TokensOverride.demo?raw'
import { UnstyledSwitch } from './switch/Unstyled.demo'
import UnstyledSource from './switch/Unstyled.demo?raw'

const switchProps: PropDef[] = [
  { name: 'checked', description: 'Controlled on state', type: 'boolean' },
  { name: 'defaultChecked', description: 'Initial on state when uncontrolled', type: 'boolean', default: 'false' },
  { name: 'onChange', description: 'Fires when the switch is toggled', type: '(checked: boolean) => void' },
  { name: 'disabled', description: 'Block interaction but keep visual state', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show inline spinner and block interaction', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Size preset (large currently renders like default)', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'checkedChildren', description: 'Content rendered inside the track when on', type: 'ReactNode' },
  { name: 'unCheckedChildren', description: 'Content rendered inside the track when off', type: 'ReactNode' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes — keep role/aria only', type: 'boolean', default: 'false' },
]

const switchCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Track background in the on state' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Track background in the off state' },
  { name: 'sg-color-white', default: '#ffffff', description: 'Thumb (handle) color and inner label color' },
  { name: 'sg-shadow-sm', default: '0 1px 2px rgba(0, 0, 0, 0.05)', description: 'Thumb drop-shadow' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Font size of the inner on/off label' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Thumb & background transition duration' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(.4,0,.2,1)', description: 'Thumb & background easing' },
]

export function SwitchDemo() {
  return (
    <ComponentDoc
      title="Switch"
      description="Boolean selector that commits immediately. Pair it with a label and — for slow networks — the `loading` state."
      whenToUse={[
        'Flip a single state that takes effect right away (dark mode, notifications, publish state).',
        'Inline in settings rows where a commit-on-click toggle is more natural than a form submit.',
        'Reach for Checkbox instead if the value is submitted later as part of a form.',
      ]}
    >
      <DemoBox title="Basic" description="Controlled on/off with live readout." code={BasicSource}>
        <BasicSwitch />
      </DemoBox>

      <DemoBox title="Text & icon" description="checkedChildren / unCheckedChildren render inside the track." code={TextIconSource}>
        <TextIconSwitch />
      </DemoBox>

      <DemoBox title="Sizes" description="small for compact toolbars; default for forms." code={SizesSource}>
        <SizesSwitch />
      </DemoBox>

      <DemoBox title="States" description="Disabled keeps the state; loading blocks interaction." code={StatesSource}>
        <StatesSwitch />
      </DemoBox>

      <DemoBox
        title="Optimistic async toggle"
        description="Flip first, show a spinner, roll back on error."
        code={AsyncToggleSource}
      >
        <AsyncToggleSwitch />
      </DemoBox>

      <DemoBox
        title="Inside a Form"
        description="Use valuePropName='checked' to bind Switch to a boolean field."
        code={InFormSource}
      >
        <InFormSwitch />
      </DemoBox>

      <DemoBox title="Tokens override" description="Scope global tokens to rebrand a group." code={TokensOverrideSource}>
        <TokensOverrideSwitch />
      </DemoBox>

      <DemoBox title="Unstyled" description="Semantics only — paint it yourself." code={UnstyledSource}>
        <UnstyledSwitch />
      </DemoBox>

      <PropsTable title="Switch API" data={switchProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Switch uses only global tokens. To rebrand, scope `--sg-color-primary` (on), `--sg-color-text-disabled` (off) and `--sg-color-white` (thumb) on a parent."
        data={switchCssVars}
      />
    </ComponentDoc>
  )
}
