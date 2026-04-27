import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicRadio } from './radio/Basic.demo'
import BasicSource from './radio/Basic.demo?raw'
import { VerticalRadio } from './radio/Vertical.demo'
import VerticalSource from './radio/Vertical.demo?raw'
import { DisabledStatesRadio } from './radio/DisabledStates.demo'
import DisabledStatesSource from './radio/DisabledStates.demo?raw'
import { InFormRadio } from './radio/InForm.demo'
import InFormSource from './radio/InForm.demo?raw'
import { TokensOverrideRadio } from './radio/TokensOverride.demo'
import TokensOverrideSource from './radio/TokensOverride.demo?raw'
import { UnstyledRadio } from './radio/Unstyled.demo'
import UnstyledSource from './radio/Unstyled.demo?raw'

const radioGroupProps: PropDef[] = [
  { name: 'value', description: 'Controlled selected value', type: 'string | number' },
  { name: 'defaultValue', description: 'Initial value when uncontrolled', type: 'string | number' },
  { name: 'options', description: 'Radio options to render', type: 'RadioOption[]' },
  { name: 'direction', description: 'Layout direction', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
  { name: 'onChange', description: 'Fires when the selected value changes', type: '(value) => void' },
  { name: 'disabled', description: 'Disable the whole group', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show inline spinner next to the group', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes — native radios only', type: 'boolean', default: 'false' },
]

const radioOptionProps: PropDef[] = [
  { name: 'value', description: 'Value committed to onChange', type: 'string | number' },
  { name: 'label', description: 'Display label (ReactNode)', type: 'ReactNode' },
  { name: 'disabled', description: 'Disable this specific option', type: 'boolean' },
]

const radioCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Native accent-color (checked dot)' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Default label color' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Label color when option is disabled/loading' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Inline spinner color during loading' },
  { name: 'sg-font-size', default: '14px', description: 'Label font size' },
  { name: 'sg-padding-md', default: '16px', description: 'Gap between options in the group' },
  { name: 'sg-padding-xs', default: '8px', description: 'Gap between input and label' },
]

export function RadioDemo() {
  return (
    <ComponentDoc
      title="Radio"
      description="Single-choice group. Comes as `RadioGroup` that owns the selection; individual radios are not meant to be used outside of it."
      whenToUse={[
        'Select exactly one value from 2–6 choices (plan tier, delivery method).',
        'Inside a form where the radio is the primary answer.',
        'When users benefit from seeing every option at once (unlike Select).',
      ]}
    >
      <DemoBox title="Basic" description="Controlled RadioGroup with live value readout." code={BasicSource}>
        <BasicRadio />
      </DemoBox>

      <DemoBox title="Vertical" description="direction='vertical' for longer labels." code={VerticalSource}>
        <VerticalRadio />
      </DemoBox>

      <DemoBox title="States" description="Per-option disabled + group-level disabled / loading." code={DisabledStatesSource}>
        <DisabledStatesRadio />
      </DemoBox>

      <DemoBox title="Inside a Form" description="RadioGroup wrapped in Field with validation." code={InFormSource}>
        <InFormRadio />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope global tokens to rebrand a single group."
        code={TokensOverrideSource}
      >
        <TokensOverrideRadio />
      </DemoBox>

      <DemoBox title="Unstyled" description="Native radiogroup + inputs, no SkyGraph classes." code={UnstyledSource}>
        <UnstyledRadio />
      </DemoBox>

      <PropsTable title="RadioGroup API" data={radioGroupProps} />
      <PropsTable title="RadioOption" data={radioOptionProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Radio has no component-specific tokens. The checked dot is driven by `accent-color: var(--sg-color-primary)`. Override globals on a scoped wrapper to re-skin."
        data={radioCssVars}
      />
    </ComponentDoc>
  )
}
