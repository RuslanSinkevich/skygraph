import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicCheckbox } from './checkbox/Basic.demo'
import BasicSource from './checkbox/Basic.demo?raw'
import { StatesCheckbox } from './checkbox/States.demo'
import StatesSource from './checkbox/States.demo?raw'
import { CheckAllCheckbox } from './checkbox/CheckAll.demo'
import CheckAllSource from './checkbox/CheckAll.demo?raw'
import { RichLabelCheckbox } from './checkbox/RichLabel.demo'
import RichLabelSource from './checkbox/RichLabel.demo?raw'
import { InFormCheckbox } from './checkbox/InForm.demo'
import InFormSource from './checkbox/InForm.demo?raw'
import { TokensOverrideCheckbox } from './checkbox/TokensOverride.demo'
import TokensOverrideSource from './checkbox/TokensOverride.demo?raw'
import { UnstyledCheckbox } from './checkbox/Unstyled.demo'
import UnstyledSource from './checkbox/Unstyled.demo?raw'

const checkboxProps: PropDef[] = [
  { name: 'checked', description: 'Controlled checked state', type: 'boolean' },
  { name: 'defaultChecked', description: 'Initial state when uncontrolled', type: 'boolean', default: 'false' },
  { name: 'indeterminate', description: 'Native indeterminate visual', type: 'boolean', default: 'false' },
  { name: 'onChange', description: 'Fires with the new boolean', type: '(checked: boolean) => void' },
  { name: 'disabled', description: 'Block interaction (inherits ConfigProvider)', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Swap the input for an inline spinner', type: 'boolean', default: 'false' },
  { name: 'children', description: 'Label content (ReactNode)', type: 'ReactNode' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes — keep semantics', type: 'boolean', default: 'false' },
]

const checkboxCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Native accent-color (checked + indeterminate fill)' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Default label text color' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Label text color when disabled/loading' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Inline spinner color during loading' },
  { name: 'sg-font-size', default: '14px', description: 'Label font size' },
  { name: 'sg-line-height', default: '1.5714', description: 'Label line-height' },
  { name: 'sg-padding-sm', default: '12px', description: 'Gap between input and label' },
]

export function CheckboxDemo() {
  return (
    <ComponentDoc
      title="Checkbox"
      description="Binary toggle with optional indeterminate, disabled, loading states and rich labels. Works standalone or inside Form."
      whenToUse={[
        'Select one or more values from a list (news → release notes, beta flags).',
        'As a parent "check all" for bulk-select scenarios.',
        'For terms/privacy confirmations with validation.',
      ]}
    >
      <DemoBox title="Basic" description="Controlled checkbox with a label." code={BasicSource}>
        <BasicCheckbox />
      </DemoBox>

      <DemoBox title="States" description="All visual states in one column." code={StatesSource}>
        <StatesCheckbox />
      </DemoBox>

      <DemoBox title="Check all" description="Parent + children with indeterminate." code={CheckAllSource}>
        <CheckAllCheckbox />
      </DemoBox>

      <DemoBox title="Rich labels" description="ReactNode children — descriptions, links." code={RichLabelSource}>
        <RichLabelCheckbox />
      </DemoBox>

      <DemoBox title="Inside a Form" description="Wrap with Field + valuePropName='checked'." code={InFormSource}>
        <InFormCheckbox />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope global tokens on a wrapper to re-skin."
        code={TokensOverrideSource}
      >
        <TokensOverrideCheckbox />
      </DemoBox>

      <DemoBox title="Unstyled" description="Native input + label wrapper, no SkyGraph classes." code={UnstyledSource}>
        <UnstyledCheckbox />
      </DemoBox>

      <PropsTable data={checkboxProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Checkbox has no component-specific tokens. The checkmark colour is driven by the native `accent-color` which inherits `--sg-color-primary`. Override globals on a scoped wrapper to re-skin."
        data={checkboxCssVars}
      />
    </ComponentDoc>
  )
}
