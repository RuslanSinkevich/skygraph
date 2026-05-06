import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicSlider } from './slider/Basic.demo'
import BasicSource from './slider/Basic.demo?raw'
import { MinMaxStepSlider } from './slider/MinMaxStep.demo'
import MinMaxStepSource from './slider/MinMaxStep.demo?raw'
import { WithValueSlider } from './slider/WithValue.demo'
import WithValueSource from './slider/WithValue.demo?raw'
import { DisabledSlider } from './slider/Disabled.demo'
import DisabledSource from './slider/Disabled.demo?raw'
import { InFormSlider } from './slider/InForm.demo'
import InFormSource from './slider/InForm.demo?raw'
import { TokensOverrideSlider } from './slider/TokensOverride.demo'
import TokensOverrideSource from './slider/TokensOverride.demo?raw'
import { UnstyledSlider } from './slider/Unstyled.demo'
import UnstyledSource from './slider/Unstyled.demo?raw'

const sliderProps: PropDef[] = [
  { name: 'value', description: 'Controlled numeric value', type: 'number' },
  { name: 'defaultValue', description: 'Initial value when uncontrolled', type: 'number', default: '0' },
  { name: 'min', description: 'Lower bound', type: 'number', default: '0' },
  { name: 'max', description: 'Upper bound', type: 'number', default: '100' },
  { name: 'step', description: 'Increment between valid values (pointer + keyboard)', type: 'number', default: '1' },
  { name: 'onChange', description: 'Fires on every committed value change', type: '(value: number) => void' },
  { name: 'disabled', description: 'Block pointer and keyboard input', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes (headless mode)', type: 'boolean', default: 'false' },
]

const sliderCssVars: CssVarDef[] = [
  {
    name: 'sg-slider-min-inline-size',
    default: 'calc(8 * var(--sg-font-size))',
    description: 'Minimum width (flex/grid); derived from `--sg-font-size`, override freely',
  },
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Fill color and handle border color' },
  { name: 'sg-color-primary-bg', default: 'rgba(22, 119, 255, 0.1)', description: 'Handle focus ring color' },
  { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: 'Track (rail) color' },
  { name: 'sg-color-white', default: '#ffffff', description: 'Handle background color' },
  { name: 'sg-padding-sm', default: '12px', description: 'Vertical padding above/below the rail (clickable area)' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Handle box-shadow transition on hover' },
]

export function SliderDemo() {
  return (
    <ComponentDoc
      title="Slider"
      description="Horizontal numeric slider with full keyboard support (arrow keys respect `step`). Emits a `number`, always within `[min, max]`."
      whenToUse={[
        'Pick a number where approximate is fine: volume, brightness, opacity.',
        'Any bounded setting with a visual "fill" that helps users feel the scale.',
        'Paired with an `InputNumber` when precise typing matters.',
      ]}
    >
      <DemoBox title="Basic" description="Controlled slider with live readout." code={BasicSource}>
        <BasicSlider />
      </DemoBox>

      <DemoBox title="Min / Max / Step" description="Custom ranges and step sizes." code={MinMaxStepSource}>
        <MinMaxStepSlider />
      </DemoBox>

      <DemoBox title="Slider + number input" description="Two controls sharing one state." code={WithValueSource}>
        <WithValueSlider />
      </DemoBox>

      <DemoBox title="Disabled" description="Greyed out, no interaction." code={DisabledSource}>
        <DisabledSlider />
      </DemoBox>

      <DemoBox title="Inside a Form" description="Slider plugged into `<Field>`." code={InFormSource}>
        <InFormSlider />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope global tokens on a wrapper to rebrand."
        code={TokensOverrideSource}
      >
        <TokensOverrideSlider />
      </DemoBox>

      <DemoBox title="Unstyled" description="DOM & ARIA stay; classes drop." code={UnstyledSource}>
        <UnstyledSlider />
      </DemoBox>

      <PropsTable title="Slider API" data={sliderProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="The root stretches with `width: 100%` and `--sg-slider-min-inline-size`. `--sg-color-primary` paints the fill and handle border; `--sg-color-border` the rail."
        data={sliderCssVars}
      />
    </ComponentDoc>
  )
}
