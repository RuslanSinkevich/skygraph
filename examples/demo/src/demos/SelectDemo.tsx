import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicSelect } from './select/Basic.demo'
import BasicSource from './select/Basic.demo?raw'
import { UncontrolledSelect } from './select/Uncontrolled.demo'
import UncontrolledSource from './select/Uncontrolled.demo?raw'
import { SelectSizes } from './select/Sizes.demo'
import SizesSource from './select/Sizes.demo?raw'
import { DisabledSelect } from './select/Disabled.demo'
import DisabledSource from './select/Disabled.demo?raw'
import { LoadingSelect } from './select/Loading.demo'
import LoadingSource from './select/Loading.demo?raw'
import { NumericValuesSelect } from './select/NumericValues.demo'
import NumericValuesSource from './select/NumericValues.demo?raw'
import { TokensOverrideSelect } from './select/TokensOverride.demo'
import TokensOverrideSource from './select/TokensOverride.demo?raw'
import { UnstyledSelect } from './select/Unstyled.demo'
import UnstyledSource from './select/Unstyled.demo?raw'

const selectProps: PropDef[] = [
  { name: 'value', description: 'Currently selected value', type: 'string | number' },
  { name: 'defaultValue', description: 'Default selected value (uncontrolled)', type: 'string | number' },
  { name: 'onChange', description: 'Callback when selection changes', type: '(value: string | number) => void' },
  { name: 'onBlur', description: 'Called when the control loses focus', type: '() => void' },
  { name: 'options', description: 'Options list', type: 'SelectOption[]' },
  { name: 'placeholder', description: 'Placeholder shown when nothing is selected', type: 'string', default: "'Select...'" },
  { name: 'size', description: 'Control size (propagates from ConfigProvider)', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Disables the selector', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show a spinner and block input', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Render the native <select> with no styling', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Extra class on the control', type: 'string' },
  { name: 'style', description: 'Inline styles on the control', type: 'CSSProperties' },
]

const optionProps: PropDef[] = [
  { name: 'label', description: 'Display text', type: 'string' },
  { name: 'value', description: 'Value submitted on change', type: 'string | number' },
  { name: 'disabled', description: 'Make this option unselectable', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show per-option loading state', type: 'boolean', default: 'false' },
]

const selectCssVars: CssVarDef[] = [
  { name: 'sg-input-height', default: 'var(--sg-height-md)', description: 'Control height (shared with Input)' },
  { name: 'sg-input-padding', default: 'var(--sg-padding-xs) var(--sg-padding-md)', description: 'Inner padding' },
  { name: 'sg-input-bg', default: 'var(--sg-color-bg-container)', description: 'Control background' },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Border color (state-driven)' },
  { name: 'sg-input-radius', default: 'var(--sg-border-radius)', description: 'Corner radius' },
  { name: 'sg-input-color', default: 'var(--sg-color-text)', description: 'Value text color' },
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Open state border + focus ring' },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: 'Highlighted option background' },
  { name: 'sg-color-bg-elevated', default: 'var(--sg-gray-1)', description: 'Dropdown panel background' },
  { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0, 0, 0, 0.12)', description: 'Dropdown panel shadow' },
  { name: 'sg-color-text-placeholder', default: 'rgba(0, 0, 0, 0.25)', description: 'Placeholder color' },
  { name: 'sg-spin-color', default: 'var(--sg-color-text-tertiary)', description: 'Loading spinner inside the control' },
]

export function SelectDemo() {
  return (
    <ComponentDoc
      title="Select"
      description="Single-value selector with keyboard navigation, loading states, and native fallback."
      whenToUse={[
        'When a user picks one value from a small, predefined list.',
        'For long, searchable lists use AutoComplete instead.',
        'Inside forms — wrap with <Field> to get validation.',
      ]}
    >
      <DemoBox title="Basic" description="Controlled value with `value` / `onChange`." code={BasicSource}>
        <BasicSelect />
      </DemoBox>

      <DemoBox title="Uncontrolled" description="`defaultValue` seeds the initial choice; SkyGraph tracks the rest." code={UncontrolledSource}>
        <UncontrolledSelect />
      </DemoBox>

      <DemoBox title="Sizes" description="Small / middle / large — match your form density." code={SizesSource}>
        <SelectSizes />
      </DemoBox>

      <DemoBox title="Disabled" description="Disable the whole control or single options." code={DisabledSource}>
        <DisabledSelect />
      </DemoBox>

      <DemoBox title="Loading" description="Loading on the select vs. a single option." code={LoadingSource}>
        <LoadingSelect />
      </DemoBox>

      <DemoBox title="Numeric values" description="`value` preserves number types (important for IDs)." code={NumericValuesSource}>
        <NumericValuesSelect />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope one Select to different tokens — same component, different skin."
        code={TokensOverrideSource}
      >
        <TokensOverrideSelect />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Native <select> with no library styling — headless mode."
        code={UnstyledSource}
      >
        <UnstyledSelect />
      </DemoBox>

      <PropsTable title="Select API" data={selectProps} />
      <PropsTable title="SelectOption" data={optionProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Select inherits the Input tokens plus its own dropdown panel variables."
        data={selectCssVars}
      />
    </ComponentDoc>
  )
}
