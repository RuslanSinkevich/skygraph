import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicInputNumber } from './inputnumber/Basic.demo'
import BasicSource from './inputnumber/Basic.demo?raw'
import { MinMaxStepInputNumber } from './inputnumber/MinMaxStep.demo'
import MinMaxStepSource from './inputnumber/MinMaxStep.demo?raw'
import { PrecisionInputNumber } from './inputnumber/Precision.demo'
import PrecisionSource from './inputnumber/Precision.demo?raw'
import { SizesInputNumber } from './inputnumber/Sizes.demo'
import SizesSource from './inputnumber/Sizes.demo?raw'
import { StatesInputNumber } from './inputnumber/States.demo'
import StatesSource from './inputnumber/States.demo?raw'
import { InFormInputNumber } from './inputnumber/InForm.demo'
import InFormSource from './inputnumber/InForm.demo?raw'
import { TokensOverrideInputNumber } from './inputnumber/TokensOverride.demo'
import TokensOverrideSource from './inputnumber/TokensOverride.demo?raw'
import { UnstyledInputNumber } from './inputnumber/Unstyled.demo'
import UnstyledSource from './inputnumber/Unstyled.demo?raw'

const inputNumberProps: PropDef[] = [
  { name: 'value', description: 'Controlled numeric value', type: 'number' },
  { name: 'defaultValue', description: 'Initial value when uncontrolled', type: 'number' },
  { name: 'min', description: 'Lower bound (clamps on type and via stepper)', type: 'number' },
  { name: 'max', description: 'Upper bound (clamps on type and via stepper)', type: 'number' },
  { name: 'step', description: 'Delta applied by the + / − buttons', type: 'number', default: '1' },
  { name: 'precision', description: 'Round to N decimal places after clamping', type: 'number' },
  { name: 'placeholder', description: 'Placeholder when the field is empty', type: 'string' },
  { name: 'onChange', description: 'Fires with the clamped number or null when cleared', type: '(value: number | null) => void' },
  { name: 'onBlur', description: 'Fires when the input loses focus', type: '() => void' },
  { name: 'disabled', description: 'Block interaction', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show inline spinner and block interaction', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Height / spacing preset', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes, keep stepper logic', type: 'boolean', default: 'false' },
]

const inputNumberCssVars: CssVarDef[] = [
  { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: 'Outer border of the control' },
  { name: 'sg-border-radius', default: '6px', description: 'Outer border radius' },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Input background' },
  { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.02)', description: 'Stepper button background' },
  { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: 'Stepper button background on hover' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Input & stepper text color' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Stepper text when min/max boundary is reached' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Inline spinner color during loading' },
  { name: 'sg-font-size', default: '14px', description: 'Default font size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Font size when size="small"' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Font size when size="large"' },
  { name: 'sg-height-sm', default: '24px', description: 'Control height when size="small"' },
  { name: 'sg-height-md', default: '32px', description: 'Control height at default size' },
  { name: 'sg-height-lg', default: '40px', description: 'Control height when size="large"' },
  { name: 'sg-padding-xs', default: '8px', description: 'Right-margin of the inline spinner' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Stepper button hover transition' },
]

export function InputNumberDemo() {
  return (
    <ComponentDoc
      title="InputNumber"
      description="Numeric field with built-in stepper, clamping and precision. Commits `number | null` — `null` means the user emptied the field."
      whenToUse={[
        'Numeric-only values where plain text is wrong (age, count, price).',
        'Bounded values that need the `+` / `−` buttons (quantities, ratings).',
        'Currencies or percentages where precision must be enforced.',
      ]}
    >
      <DemoBox title="Basic" description="Controlled value with live readout (including the cleared null)." code={BasicSource}>
        <BasicInputNumber />
      </DemoBox>

      <DemoBox title="Min / Max / Step" description="Clamping and stepper delta." code={MinMaxStepSource}>
        <MinMaxStepInputNumber />
      </DemoBox>

      <DemoBox title="Precision" description="Round to a fixed number of decimals." code={PrecisionSource}>
        <PrecisionInputNumber />
      </DemoBox>

      <DemoBox title="Sizes" description="small / middle / large presets." code={SizesSource}>
        <SizesInputNumber />
      </DemoBox>

      <DemoBox title="States" description="Disabled and loading." code={StatesSource}>
        <StatesInputNumber />
      </DemoBox>

      <DemoBox title="Inside a Form" description="Required + range validators on number fields." code={InFormSource}>
        <InFormInputNumber />
      </DemoBox>

      <DemoBox title="Tokens override" description="Scope globals to rebrand one instance." code={TokensOverrideSource}>
        <TokensOverrideInputNumber />
      </DemoBox>

      <DemoBox title="Unstyled" description="Stepper logic without SkyGraph classes." code={UnstyledSource}>
        <UnstyledInputNumber />
      </DemoBox>

      <PropsTable title="InputNumber API" data={inputNumberProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="InputNumber uses only global tokens. There are no --sg-input-number-* variables; to rebrand, scope the globals listed below on a wrapper."
        data={inputNumberCssVars}
      />
    </ComponentDoc>
  )
}
